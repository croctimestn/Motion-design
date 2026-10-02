#!/usr/bin/env python3
"""Horodatage réel des mots de la narration (reconnaissance vocale locale, français).

La synchro image/voix repose sur ces temps : timing.mjs cale chaque mot du script sur le mot
reconnu correspondant (au lieu d'estimer sa position d'après la longueur du texte).

Usage : python3 tools/words.py episodes/03-carte-fidelite   → episodes/<ep>/voice/words.json
Modèle : sherpa-onnx streaming zipformer FR (Apache-2.0), téléchargé une fois dans .cache/asr/.
Dépendances : pip install sherpa-onnx numpy
"""
import json
import os
import re
import subprocess
import sys
import tarfile
import urllib.request

import numpy as np
import sherpa_onnx

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAME = 'sherpa-onnx-streaming-zipformer-fr-2023-04-14'
URL = f'https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/{NAME}.tar.bz2'
MODEL = os.path.join(ROOT, '.cache', 'asr', NAME)
SR = 16000


def ensure_model():
    if os.path.isdir(MODEL):
        return
    os.makedirs(os.path.dirname(MODEL), exist_ok=True)
    tmp = MODEL + '.tar.bz2'
    print('téléchargement du modèle de reconnaissance vocale…', file=sys.stderr)
    urllib.request.urlretrieve(URL, tmp)
    with tarfile.open(tmp) as t:
        t.extractall(os.path.dirname(MODEL))
    os.remove(tmp)


def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def recognize(samples):
    f = lambda n: os.path.join(MODEL, f'{n}-epoch-29-avg-9-with-averaged-model.int8.onnx')
    rec = sherpa_onnx.OnlineRecognizer.from_transducer(
        tokens=os.path.join(MODEL, 'tokens.txt'), encoder=f('encoder'), decoder=f('decoder'), joiner=f('joiner'),
        num_threads=4, sample_rate=SR, feature_dim=80, decoding_method='greedy_search')
    s = rec.create_stream()
    s.accept_waveform(SR, samples)
    s.accept_waveform(SR, np.zeros(int(SR * 1.0), dtype=np.float32))
    s.input_finished()
    while rec.is_ready(s):
        rec.decode_stream(s)
    r = rec.get_result_all(s)
    return list(r.tokens), list(r.timestamps)


def to_words(tokens, stamps):
    words = []
    for tok, t in zip(tokens, stamps):
        if tok[:1] in (' ', '▁') or not words:
            words.append({'w': tok.lstrip(' ▁'), 't': round(float(t), 3)})
        else:
            words[-1]['w'] += tok
    return [w for w in words if w['w']]


def silence_ends(path, min_dur=0.12):
    err = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', path, '-af', f'silencedetect=n=-38dB:d={min_dur}', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return [float(x) for x in re.findall(r'silence_end: ([\d.]+)', err)]


def latency(words, ends):
    # le décodeur en flux émet chaque mot un peu après son début réel : on mesure ce retard sur les mots
    # qui suivent un silence (leur début réel = fin du silence)
    d = []
    for e in ends:
        nxt = next((w for w in words if w['t'] >= e - 0.05), None)
        if nxt and nxt['t'] - e < 0.6:
            d.append(nxt['t'] - e)
    return float(np.median(d)) if len(d) >= 3 else 0.25


def main():
    ep = sys.argv[1]
    script = json.load(open(os.path.join(ep, 'script.json'), encoding='utf8'))
    audio = os.path.join(ep, script['voice']['file'])
    ensure_model()
    words = to_words(*recognize(load(audio)))
    lat = latency(words, silence_ends(audio))
    for w in words:
        w['t'] = round(max(0.0, w['t'] - lat), 3)
    out = os.path.join(os.path.dirname(audio), 'words.json')
    json.dump({'source': os.path.basename(audio), 'model': NAME, 'latency': round(lat, 3), 'words': words}, open(out, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    print(f'{len(words)} mots, retard corrigé {lat:.2f} s → {out}')


if __name__ == '__main__':
    main()
