import { useState } from 'react'
import { KANJI } from '../data/kanji'
import { kanaById } from '../data/kana'
import { speak } from '../lib/speech'
import type { KanjiGlyph } from '../types'

export default function KanjiPage() {
  const [sel, setSel] = useState<KanjiGlyph | null>(null)
  return (
    <div className="kanji-page">
      <h1>🈵 Kanji — N5 starters</h1>
      <p className="muted">Tap a character to see readings, meanings and example words.</p>
      <div className="kanji-grid">
        {KANJI.map((k) => (
          <button key={k.char} className={`kanji-tile ${sel?.char === k.char ? 'active' : ''}`} onClick={() => setSel(k)}>
            <span className="ja big-kanji">{k.char}</span>
            <small>{k.strokes} strokes</small>
          </button>
        ))}
      </div>
      {sel && (
        <div className="card kanji-detail">
          <div className="kd-head">
            <span className="ja huge">{sel.char}</span>
            <div>
              <h2>{sel.meaning}</h2>
              <p className="muted">{sel.strokes} strokes · On'yomi: {sel.onyomi.join('、') || '—'} · Kun'yomi: {sel.kunyomi.join('、') || '—'}</p>
              <button className="btn-ghost" onClick={() => speak(sel.words[0]?.ja ?? sel.char)}>🔊 Hear example</button>
            </div>
          </div>
          <h3>Words</h3>
          <ul className="word-list">
            {sel.words.map((w) => (
              <li key={w.ja + w.reading}>
                <button className="word-row" onClick={() => speak(w.ja)}>
                  <span className="ja"><b>{w.ja}</b> <small className="furigana">{readingToKana(w.reading)}</small></span>
                  <span>{w.en}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Convert romaji reading like "にちよう" already-kana passthrough; if romaji, map pairs
function readingToKana(reading: string): string {
  if (/[\u3040-\u30ff]/.test(reading)) return reading
  const seq: [string, string][] = [
    ['sha', 'しゃ'], ['chi', 'ち'], ['tsu', 'つ'], ['shi', 'し'], ['kyu', 'きゅ'], ['shu', 'しゅ'],
    ['ka', 'か'], ['ki', 'き'], ['ku', 'く'], ['ke', 'け'], ['ko', 'こ'], ['sa', 'さ'], ['su', 'す'],
    ['se', 'せ'], ['so', 'そ'], ['ta', 'た'], ['te', 'て'], ['to', 'と'], ['na', 'な'], ['ni', 'に'],
    ['nu', 'ぬ'], ['ne', 'ね'], ['no', 'の'], ['ha', 'は'], ['hi', 'ひ'], ['fu', 'ふ'], ['he', 'へ'],
    ['ho', 'ほ'], ['ma', 'ま'], ['mi', 'み'], ['mu', 'む'], ['me', 'め'], ['mo', 'も'], ['ya', 'や'],
    ['yu', 'ゆ'], ['yo', 'よ'], ['ra', 'ら'], ['ri', 'り'], ['ru', 'る'], ['re', 'れ'], ['ro', 'ろ'],
    ['wa', 'わ'], ['wo', 'を'], ['n', 'ん'], ['ga', 'が'], ['gi', 'ぎ'], ['gu', 'ぐ'], ['ge', 'げ'],
    ['go', 'ご'], ['za', 'ざ'], ['ji', 'じ'], ['zu', 'ず'], ['ze', 'ぜ'], ['zo', 'ぞ'], ['da', 'だ'],
    ['de', 'で'], ['do', 'ど'], ['ba', 'ば'], ['bi', 'び'], ['bu', 'ぶ'], ['be', 'べ'], ['bo', 'ぼ'],
    ['pa', 'ぱ'], ['pi', 'ぴ'], ['pu', 'ぷ'], ['pe', 'ぺ'], ['po', 'ぽ'], ['yy', 'い'], ['ii', 'い'],
    ['ou', 'おう'], ['oo', 'おお'], ['aa', 'ああ'], ['a', 'あ'], ['i', 'い'], ['u', 'う'], ['e', 'え'], ['o', 'お'],
  ]
  let out = ''
  let s = reading.toLowerCase()
  outer: while (s.length > 0) {
    for (const [r, k] of seq) {
      if (s.startsWith(r)) { out += k; s = s.slice(r.length); continue outer }
    }
    out += s[0]; s = s.slice(1)
  }
  void kanaById
  return out
}
