import { JLPT_PATHS, COURSES } from '../data/courses'
import { useProgress } from '../lib/store'
import { Link } from '../lib/router'

export default function JlptPaths() {
  const p = useProgress()
  const hiraganaPct = Math.round((COURSES[0].lessons.filter((l) => l.id in p.completedLessons).length / COURSES[0].lessons.length) * 100)
  const katakanaPct = Math.round((COURSES[1].lessons.filter((l) => l.id in p.completedLessons).length / COURSES[1].lessons.length) * 100)
  return (
    <div className="jlpt-page">
      <h1>🗺️ JLPT Learning Paths</h1>
      <p className="muted">From N5 (beginner) to N1 (advanced). Pipinegro currently ships full interactive content for the N5 foundations; higher levels show your roadmap.</p>
      <div className="path-track">
        {JLPT_PATHS.map((path, i) => {
          const active = path.level === 'N5'
          const progress = path.level === 'N5' ? Math.round((hiraganaPct + katakanaPct) / 2) : 0
          return (
            <section key={path.level} className={`card level-card ${active ? 'unlocked' : 'future'}`}>
              <div className="level-head">
                <span className={`badge lvl-${path.level}`}>{path.level}</span>
                {i === 0 && <span className="you-are-here">← you are here</span>}
              </div>
              <h2>{path.blurb}</h2>
              {active && (
                <>
                  <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
                  <p className="muted">{progress}% of kana lessons complete</p>
                  <Link to="/courses" className="btn-primary">Start N5 lessons</Link>
                </>
              )}
              {!active && <p className="muted focus-list">Focus: {path.focus.join(' · ')}</p>}
            </section>
          )
        })}
      </div>
    </div>
  )
}
