import { useState } from 'react'
import { COURSES } from '../data/courses'
import ExerciseView from '../components/ExerciseView'
import { store } from '../lib/store'
import { navigate } from '../lib/router'
import { speak } from '../lib/speech'

type Phase = 'intro' | 'quiz' | 'result'

export default function LessonRunner({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const course = COURSES.find((c) => c.id === courseId)
  const lesson = course?.lessons.find((l) => l.id === lessonId)

  const [phase, setPhase] = useState<Phase>('intro')
  const [idx, setIdx] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [lastXp, setLastXp] = useState(0)

  if (!lesson || !course) {
    return <div className="card"><h2>Lesson not found</h2><button className="btn-primary" onClick={() => navigate('/courses')}>Back to courses</button></div>
  }

  const total = lesson.exercises.length
  const ex = lesson.exercises[idx]

  const onResult = (ok: boolean) => {
    if (ok) setCorrectCount((c) => c + 1)
    else setMistakes((m) => m + 1)
    // feed spaced repetition for taught kana
    if (ok && lesson.teaches.length > 0 && idx % 2 === 0) {
      const key = lesson.teaches[idx % lesson.teaches.length]
      if (key.startsWith('h-') || key.startsWith('k-')) store.srsGrade(key, 1)
    }
  }

  const onNext = () => {
    if (idx + 1 >= total) {
      const scorePct = Math.round((correctCount / total) * 100)
      const isPerfect = mistakes === 0
      const xp = Math.max(5, Math.round(lesson.xp * (0.5 + 0.5 * (correctCount / total))))
      store.completeLesson(lesson.id, scorePct, xp, isPerfect)
      if (lesson.teaches.length > 0) store.markKanaKnown(lesson.teaches)
      setLastXp(xp)
      setPhase('result')
    } else setIdx(idx + 1)
  }

  if (phase === 'intro') {
    return (
      <div className="card lesson-intro">
        <span className="big-icon">{lesson.icon}</span>
        <h1>{lesson.title}</h1>
        <p>{lesson.subtitle}</p>
        {lesson.teaches.length > 0 && (
          <div className="teach-preview">
            {lesson.teaches.slice(0, 12).map((t) => {
              const ch = t.replace(/^h-/, '').replace(/^k-/, '')
              return <span key={t} className="teach-chip ja">{kanaChar(t)}<small>{ch}</small></span>
            })}
          </div>
        )}
        <div className="row-gap">
          <button className="btn-primary big" onClick={() => setPhase('quiz')}>Start lesson (+{lesson.xp} XP)</button>
          <button className="btn-ghost" onClick={() => navigate(`/course/${course.id}`)}>← Back</button>
        </div>
      </div>
    )
  }

  if (phase === 'result') {
    const scorePct = Math.round((correctCount / total) * 100)
    return (
      <div className="card result-card">
        <span className="big-icon">{scorePct >= 80 ? '🏆' : scorePct >= 50 ? '🌟' : '💪'}</span>
        <h1>Lesson complete!</h1>
        <div className="result-grid">
          <div><b>+{lastXp}</b><span>XP earned</span></div>
          <div><b>{correctCount}/{total}</b><span>correct</span></div>
          <div><b>{scorePct}%</b><span>score</span></div>
          <div><b>{mistakes === 0 ? '✨' : mistakes}</b><span>{mistakes === 0 ? 'perfect!' : 'mistakes'}</span></div>
        </div>
        <div className="row-gap">
          <button className="btn-primary big" onClick={() => navigate(`/course/${course.id}`)}>Continue</button>
          <button className="btn-ghost" onClick={() => { setIdx(0); setCorrectCount(0); setMistakes(0); setPhase('intro') }}>Retry lesson</button>
        </div>
      </div>
    )
  }

  return (
    <div className="runner">
      <div className="runner-top">
        <button className="btn-x" onClick={() => navigate(`/course/${course.id}`)} aria-label="Quit lesson">✕</button>
        <div className="progress-track"><div className="progress-fill" style={{ width: `${(idx / total) * 100}%` }} /></div>
        <span className="hearts" title={`${mistakes} mistake${mistakes === 1 ? '' : 's'}`}>{'❤️'.repeat(Math.max(0, 3 - Math.min(3, mistakes))) || '💔'}</span>
      </div>
      <ExerciseView key={`${lessonId}-${idx}`} ex={ex} onResult={onResult} onNext={onNext} />
    </div>
  )
}

function kanaChar(id: string): string {
  const r = id.replace(/^[hk]-/, '')
  const table = id.startsWith('k-') ? KATAKANA_CHARS : HIRAGANA_CHARS
  return table[r] ?? r
}

const HIRAGANA_CHARS: Record<string, string> = {
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  sa: 'さ', shi: 'し', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', chi: 'ち', tsu: 'つ', te: 'て', to: 'と',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', wo: 'を', n: 'ん',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  za: 'ざ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  da: 'だ', de: 'で', do: 'ど',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
}
const KATAKANA_CHARS: Record<string, string> = Object.fromEntries(
  Object.entries(HIRAGANA_CHARS).map(([r, h]) => {
    const src = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ'
    const dst = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ'
    const i = src.indexOf(h)
    return [r, i >= 0 ? dst[i] : h]
  }),
) as Record<string, string>

// keep speak import referenced for potential future use in runner header audio
void speak
