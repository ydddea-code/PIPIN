import { useMemo, useState } from 'react'
import type { Exercise } from '../types'
import { speak } from '../lib/speech'

type Props = { ex: Exercise; onResult: (ok: boolean) => void; onNext: () => void }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ---------- Shared footer ----------
function CheckBar({ checked, correct, picked, onCheck, onNext, disabled }: {
  checked: boolean; correct: boolean; picked: boolean;
  onCheck: () => void; onNext: () => void; disabled?: boolean
}) {
  return (
    <div className={`footer-bar ${checked ? (correct ? 'success' : 'fail') : ''}`}>
      {checked ? (
        <>
          <span className="verdict">{correct ? '🎉 Correct! +XP' : '❌ Not quite — keep going!'}</span>
          <button className="btn-primary" onClick={onNext}>Continue</button>
        </>
      ) : (
        <button className="btn-primary" onClick={onCheck} disabled={!picked || disabled}>Check</button>
      )}
    </div>
  )
}

// ---------- Choice / Listen ----------
function ChoiceExercise({ ex, onResult, onNext }: Props & { ex: Extract<Exercise, { kind: 'choice' | 'listen' }> }) {
  const [picked, setPicked] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const correct = picked === ex.answer
  const check = () => { if (picked === null) return; setChecked(true); onResult(picked === ex.answer) }

  return (
    <div className="ex">
      <p className="ex-prompt">{ex.prompt}</p>
      {ex.kind === 'listen' ? (
        <button className="speaker" onClick={() => speak(ex.audioText)} aria-label="Play audio">🔊 Tap to play</button>
      ) : (
        <h2 className="ex-question ja">{ex.question}</h2>
      )}
      <div className="options-grid">
        {ex.options.map((o, i) => (
          <button
            key={i}
            className={`option ${checked && i === ex.answer ? 'correct' : ''} ${checked && picked === i && !correct ? 'wrong' : ''}`}
            disabled={checked}
            onClick={() => setPicked(i)}
          >
            <span className="opt-key">{i + 1}</span>
            <span className={/[\u3000-\u9fff]/.test(o) ? 'ja' : ''}>{o}</span>
          </button>
        ))}
      </div>
      <CheckBar checked={checked} correct={correct} picked={picked !== null} onCheck={check} onNext={onNext} />
    </div>
  )
}

// ---------- Type ----------
function TypeExercise({ ex, onResult, onNext }: Props & { ex: Extract<Exercise, { kind: 'type' }> }) {
  const [val, setVal] = useState('')
  const [checked, setChecked] = useState(false)
  const ok = ex.answer.some((a) => a.toLowerCase() === val.trim().toLowerCase())
  const check = () => { if (!val.trim()) return; setChecked(true); onResult(ok) }
  return (
    <div className="ex">
      <p className="ex-prompt">{ex.prompt}</p>
      <h2 className="ex-question ja">{ex.question}</h2>
      {ex.hint && <p className="ex-hint">{ex.hint}</p>}
      <input
        className="type-input"
        value={val}
        autoFocus
        placeholder="Type here…"
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') checked ? onNext() : check() }}
        disabled={checked}
      />
      {checked && !ok && <p className="answer-reveal ja">Answer: <b>{ex.answer[0]}</b></p>}
      <CheckBar checked={checked} correct={ok} picked={val.trim() !== ''} onCheck={check} onNext={onNext} />
    </div>
  )
}

// ---------- Match pairs ----------
function MatchExercise({ ex, onResult, onNext }: Props & { ex: Extract<Exercise, { kind: 'match' }> }) {
  const left = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ v: p.a, id: i }))), [ex])
  const right = useMemo(() => shuffle(ex.pairs.map((p, i) => ({ v: p.b, id: i }))), [ex])
  const [selL, setSelL] = useState<number | null>(null)
  const [selR, setSelR] = useState<number | null>(null)
  const [done, setDone] = useState<Set<number>>(new Set())
  const [wrongFlash, setWrongFlash] = useState<string | null>(null)
  const [mistakes, setMistakes] = useState(0)
  const allDone = done.size === ex.pairs.length

  const tryMatch = (l: number | null, r: number | null) => {
    if (l === null || r === null) return
    if (l === r) {
      const nd = new Set(done); nd.add(l)
      setDone(nd)
      if (nd.size === ex.pairs.length) onResult(mistakes === 0)
    } else {
      setMistakes((m) => m + 1)
      setWrongFlash(`${l}-${r}`)
      setTimeout(() => setWrongFlash(null), 500)
    }
    setSelL(null); setSelR(null)
  }

  const clickL = (id: number) => { if (!done.has(id)) { setSelL(id); tryMatch(id, selR) } }
  const clickR = (id: number) => { if (!done.has(id)) { setSelR(id); tryMatch(selL, id) } }

  return (
    <div className="ex">
      <p className="ex-prompt">Tap the matching pairs</p>
      <div className="match-cols">
        <div className="match-col">
          {left.map(({ v, id }) => (
            <button key={id} disabled={done.has(id)}
              className={`match-btn ja ${selL === id ? 'sel' : ''} ${wrongFlash === `${id}-${selR}` ? 'flash-wrong' : ''} ${done.has(id) ? 'matched' : ''}`}
              onClick={() => clickL(id)}>{v}</button>
          ))}
        </div>
        <div className="match-col">
          {right.map(({ v, id }) => (
            <button key={id} disabled={done.has(id)}
              className={`match-btn ${selR === id ? 'sel' : ''} ${wrongFlash === `${selL}-${id}` ? 'flash-wrong' : ''} ${done.has(id) ? 'matched' : ''}`}
              onClick={() => clickR(id)}>{v}</button>
          ))}
        </div>
      </div>
      {allDone ? (
        <div className="footer-bar success"><span>✨ All matched!</span><button className="btn-primary" onClick={onNext}>Continue</button></div>
      ) : (
        <p className="ex-sub">{done.size}/{ex.pairs.length} matched{mistakes > 0 ? ` · ${mistakes} miss${mistakes > 1 ? 'es' : ''}` : ''}</p>
      )}
    </div>
  )
}

// ---------- Order sentence ----------
function OrderExercise({ ex, onResult, onNext }: Props & { ex: Extract<Exercise, { kind: 'order' }> }) {
  const bank = useMemo(() => shuffle(ex.tokens), [ex])
  const [built, setBuilt] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const words = built.map((i) => bank[i])
  const ok = words.join(' ') === ex.sentence.join(' ')

  const check = () => { setChecked(true); onResult(ok) }
  return (
    <div className="ex">
      <p className="ex-prompt">{ex.prompt}</p>
      <p className="ex-sub">{ex.translation}</p>
      <div className="order-answer-line">
        {built.length === 0 && <span className="placeholder">Tap the tiles below…</span>}
        {words.map((w, idx) => (
          <button key={`${idx}-${w}`} className="tile placed ja" disabled={checked}
            onClick={() => setBuilt(built.filter((_, i) => i !== idx))}>{w}</button>
        ))}
      </div>
      <div className="order-bank">
        {bank.map((w, i) => (
          <button key={i} className={`tile ja ${built.includes(i) ? 'used' : ''}`} disabled={checked || built.includes(i)}
            onClick={() => setBuilt([...built, i])}>{w}</button>
        ))}
      </div>
      {checked && !ok && <p className="answer-reveal ja">Correct order: <b>{ex.sentence.join(' ')}</b></p>}
      <CheckBar checked={checked} correct={ok} picked={built.length > 0} onCheck={check} onNext={onNext} disabled={built.length !== bank.length} />
    </div>
  )
}

export default function ExerciseView(props: Props) {
  switch (props.ex.kind) {
    case 'choice':
    case 'listen':
      return <ChoiceExercise {...props} ex={props.ex} />
    case 'type': return <TypeExercise {...props} ex={props.ex} />
    case 'match': return <MatchExercise {...props} ex={props.ex} />
    case 'order': return <OrderExercise {...props} ex={props.ex} />
  }
}
