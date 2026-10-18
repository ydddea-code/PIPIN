// Lightweight SM-2 inspired spaced repetition scheduling stored locally.
export interface SRSCard {
  key: string        // e.g. "h-a", "v:ねこ"
  reps: number       // successful reviews in a row
  interval: number   // days until next review
  ease: number       // multiplier, starts at 2.5
  due: number        // timestamp (ms) when card should be reviewed
  lapses: number
}

const DAY = 86_400_000

export function newCard(key: string): SRSCard {
  return { key, reps: 0, interval: 0, ease: 2.5, due: Date.now(), lapses: 0 }
}

/** Update a card after review. grade: 0 = again, 1 = good, 2 = easy */
export function review(card: SRSCard, grade: 0 | 1 | 2): SRSCard {
  const c = { ...card }
  if (grade === 0) {
    c.reps = 0
    c.interval = 0
    c.lapses += 1
    c.ease = Math.max(1.3, c.ease - 0.2)
    c.due = Date.now() + 10 * 60_000 // re-show in ~10 min (same session)
    return c
  }
  c.reps += 1
  if (c.reps === 1) c.interval = grade === 2 ? 3 : 1
  else if (c.reps === 2) c.interval = grade === 2 ? 7 : 3
  else c.interval = Math.round(c.interval * c.ease * (grade === 2 ? 1.3 : 1))
  c.ease = Math.min(3.0, c.ease + (grade === 2 ? 0.1 : 0))
  c.due = Date.now() + c.interval * DAY
  return c
}

export function isDue(card: SRSCard, now = Date.now()): boolean {
  return card.due <= now
}
