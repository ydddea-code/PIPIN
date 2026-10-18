import { COURSES } from '../data/courses'
import { Link } from '../lib/router'
import { useProgress } from '../lib/store'

export default function Courses() {
  const p = useProgress()
  return (
    <div className="courses-page">
      <h1>📚 Courses</h1>
      {COURSES.map((c) => {
        const doneCount = c.lessons.filter((l) => l.id in p.completedLessons).length
        return (
          <section key={c.id} className="card course-card">
            <div className="course-head" style={{ borderColor: c.color }}>
              <span className="course-badge" style={{ background: c.color }}>{c.title}</span>
              <p>{c.description}</p>
              <small>{doneCount}/{c.lessons.length} lessons complete</small>
            </div>
            <ol className="lesson-list">
              {c.lessons.map((l, idx) => {
                const best = p.completedLessons[l.id]
                const prevDone = idx === 0 || l.id in p.completedLessons || c.lessons[idx - 1].id in p.completedLessons
                const locked = !prevDone && best === undefined
                return (
                  <li key={l.id}>
                    {locked ? (
                      <span className="lesson-row locked">🔒 {l.icon} {l.title}</span>
                    ) : (
                      <Link to={`/lesson/${c.id}/${l.id}`} className={`lesson-row ${best !== undefined ? 'done' : ''}`}>
                        <span className="lesson-icon">{best !== undefined ? '✅' : l.icon}</span>
                        <span className="lesson-meta"><b>{l.title}</b><small>{l.subtitle}</small></span>
                        <span className="lesson-xp">+{l.xp} XP{best !== undefined ? ` · best ${best}%` : ''}</span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
