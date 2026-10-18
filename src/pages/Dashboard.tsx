import { COURSES } from '../data/courses'
import { KANJI } from '../data/kanji'
import { VOCAB } from '../data/vocab'
import { GRAMMAR } from '../data/grammar'
import { HIRAGANA } from '../data/kana'
import { Link } from '../lib/router'
import { useProgress, todayStr } from '../lib/store'

export default function Dashboard() {
  const p = useProgress()
  const done = Object.keys(p.completedLessons).length
  const totalLessons = COURSES.reduce((n, c) => n + c.lessons.length, 0)
  const goalMet = p.xpToday >= p.dailyGoal
  const nextLesson = (() => {
    for (const c of COURSES) {
      for (const l of c.lessons) {
        if (!(l.id in p.completedLessons)) return { course: c, lesson: l }
      }
    }
    return null
  })()

  return (
    <div className="dash">
      <section className="hero card">
        <h1>こんにちは！ <span className="wave">👋</span></h1>
        <p className="tagline">Learn Japanese, one step at a time.</p>
        <div className={`daily-banner ${goalMet ? 'met' : ''}`}>
          {goalMet
            ? <>🎉 Daily goal reached! Come back tomorrow to keep your <b>{p.streak}-day</b> streak alive.</>
            : <>🎯 Today: <b>{p.xpToday}/{p.dailyGoal} XP</b> — keep going!</>}
        </div>
        {nextLesson ? (
          <Link to={`/lesson/${nextLesson.course.id}/${nextLesson.lesson.id}`} className="btn-primary big">
            ▶ Continue: {nextLesson.course.title} · {nextLesson.lesson.title}
          </Link>
        ) : (
          <Link to="/courses" className="btn-primary big">🏯 All lessons complete — explore more!</Link>
        )}
      </section>

      <section className="cards-row">
        <div className="card kpi"><span className="kpi-num">⚡ {p.xp}</span><span className="kpi-lbl">total XP</span></div>
        <div className="card kpi"><span className="kpi-num">🔥 {p.streak}</span><span className="kpi-lbl">day streak{todayStr() === p.lastStudyDay ? ' · active' : ''}</span></div>
        <div className="card kpi"><span className="kpi-num">🈶 {p.kanaKnown.length}/{HIRAGANA.length}</span><span className="kpi-lbl">kana learned</span></div>
        <div className="card kpi"><span className="kpi-num">✅ {done}/{totalLessons}</span><span className="kpi-lbl">lessons done</span></div>
      </section>

      <section className="card path-card">
        <h2>Your courses</h2>
        {COURSES.map((c) => {
          const cd = c.lessons.filter((l) => l.id in p.completedLessons).length
          const pct = Math.round((cd / c.lessons.length) * 100)
          return (
            <Link key={c.id} to={`/course/${c.id}`} className="course-row">
              <span className="course-dot" style={{ background: c.color }} />
              <span className="course-info">
                <b>{c.title}</b> <small>{c.level}</small>
                <span className="progress-track"><span className="progress-fill" style={{ width: `${pct}%`, background: c.color }} /></span>
              </span>
              <span className="course-pct">{pct}%</span>
            </Link>
          )
        })}
      </section>

      <section className="card path-card">
        <h2>Explore</h2>
        <div className="explore-grid">
          <Link to="/kanji" className="explore-tile">🈵 Kanji <small>{KANJI.length} N5 glyphs</small></Link>
          <Link to="/flashcards" className="explore-tile">🃏 Flashcards <small>{VOCAB.length} words</small></Link>
          <Link to="/grammar" className="explore-tile">📖 Grammar <small>{GRAMMAR.length} points</small></Link>
          <Link to="/jlpt" className="explore-tile">🗺️ JLPT Paths <small>N5 → N1</small></Link>
          <Link to="/review" className="explore-tile">🔁 Review <small>spaced repetition</small></Link>
        </div>
      </section>
    </div>
  )
}
