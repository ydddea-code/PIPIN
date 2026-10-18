import { useMemo, useState } from 'react'
import { VOCAB } from '../data/vocab'
import { speak } from '../lib/speech'
import { store, useProgress } from '../lib/store'

type Mode = 'ja-en' | 'en-ja'

export default function Flashcards() {
  const p = useProgress()
  const [mode, setMode] = useState<Mode>('ja-en')
  const [tag, setTag] = useState<string>('all')
  const [flipped, setFlipped] = useState(false)
  const tags = useMemo(() => ['all', ...Array.from(new Set(VOCAB.flatMap((v) => v.tags)))], [])
  const deck = useMemo(() => VOCAB.filter((v) => tag === 'all' || v.tags.includes(tag)), [tag])
  const [i, setI] = useState(0)
  const card = deck[i % deck.length]

  const grade = (g: 0 | 1 | 2) => {
    store.srsGrade(`v:${card.ja}`, g)
    setFlipped(false)
    setI((n) => n + 1)
  }

  const known = p.srs[`v:${card.ja}`]

  return (
    <div className="flash-page">
      <h1>🃏 Vocabulary flashcards</h1>
      <div className="row-gap wrap">
        <label>Filter:
          <select value={tag} onChange={(e) => { setTag(e.target.value); setI(0); setFlipped(false) }}>
            {tags.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <button className="btn-ghost" onClick={() => setMode(mode === 'ja-en' ? 'en-ja' : 'ja-en')}>
          ⇄ {mode === 'ja-en' ? 'See Japanese → recall English' : 'See English → recall Japanese'}
        </button>
      </div>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}>
        <div className="fc-front">
          {mode === 'ja-en'
            ? <span className="ja fc-word">{card.ja}</span>
            : <span className="fc-word">{card.en}</span>}
          <small className="muted">tap to flip</small>
        </div>
        <div className="fc-back">
          {mode === 'ja-en'
            ? <><span className="fc-word">{card.en}</span><small className="ja furigana">{card.reading}</small></>
            : <><span className="ja fc-word">{card.ja}</span><small className="furigana">{card.reading}</small></>}
        </div>
      </div>
      <div className="row-gap">
        <button className="btn-danger" onClick={() => grade(0)}>Again</button>
        <button className="speaker" onClick={(e) => { e.stopPropagation(); speak(card.ja) }}>🔊</button>
        <button className="btn-primary" onClick={() => grade(1)}>Good</button>
        <button className="btn-easy" onClick={() => grade(2)}>Easy</button>
      </div>
      <p className="muted center">
        Card {(i % deck.length) + 1}/{deck.length}
        {known ? ` · next review in ${Math.max(0, Math.round((known.due - Date.now()) / 86_400_000))} day(s)` : ' · new card'}
      </p>
    </div>
  )
}
