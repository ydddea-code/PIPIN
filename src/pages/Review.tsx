import { useMemo, useState } from 'react'
import { store, useProgress } from '../lib/store'
import { isDue } from '../lib/srs'
import { kanaById } from '../data/kana'
import { VOCAB } from '../data/vocab'
import { speak } from '../lib/speech'

interface QueueItem { key: string; front: string; back: string; hint?: string }

export default function Review() {
  const p = useProgress()
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [doneCount, setDoneCount] = useState(0)

  const queue = useMemo<QueueItem[]>(() => {
    const items: QueueItem[] = []
    for (const [key, card] of Object.entries(p.srs)) {
      if (!isDue(card)) continue
      if (key.startsWith('h-') || key.startsWith('k-')) {
        const k = kanaById(key)
        if (k) items.push({ key, front: k.char, back: k.romaji, hint: 'kana' })
      } else if (key.startsWith('v:')) {
        const ja = key.slice(2)
        const v = VOCAB.find((x) => x.ja === ja)
        if (v) items.push({ key, front: v.ja, back: `${v.reading} — ${v.en}`, hint: 'word' })
      }
    }
    return items
  }, [p.srs])

  const item = queue[i]

  const grade = (g: 0 | 1 | 2) => {
    if (!item) return
    store.srsGrade(item.key, g)
    setFlipped(false)
    setDoneCount((n) => n + 1)
    setI((n) => n + 1)
  }

  if (queue.length === 0 || i >= queue.length) {
    return (
      <div className="card center-card">
        <span className="big-icon">🎌</span>
        <h1>Review complete!</h1>
        <p className="muted">{doneCount > 0 ? `You reviewed ${doneCount} card${doneCount === 1 ? '' : 's'}. ` : ''}Nothing is due right now — spaced repetition will bring cards back at the perfect time.</p>
        <p className="muted">💡 Do a lesson or flip flashcards to add review cards.</p>
      </div>
    )
  }

  return (
    <div className="review-page">
      <h1>🔁 Spaced repetition</h1>
      <p className="muted">{queue.length - i} card(s) due · {doneCount} reviewed this session</p>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(true)} role="button" tabIndex={0}>
        <div className="fc-front"><span className="ja fc-word big-kanji">{item.front}</span><small className="muted">{item.hint} · tap to reveal</small></div>
        <div className="fc-back"><span className="fc-word">{item.back}</span></div>
      </div>
      {flipped && (
        <div className="row-gap">
          <button className="btn-danger" onClick={() => grade(0)}>Again</button>
          <button className="speaker" onClick={() => speak(item.front)}>🔊</button>
          <button className="btn-primary" onClick={() => grade(1)}>Good</button>
          <button className="btn-easy" onClick={() => grade(2)}>Easy</button>
        </div>
      )}
    </div>
  )
}

void store
