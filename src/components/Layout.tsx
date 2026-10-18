import { Wordmark } from '../components/Logo'
import { Link } from '../lib/router'
import { useProgress, todayStr } from '../lib/store'

export default function Layout({ children }: { children: React.ReactNode }) {
  const p = useProgress()
  const goalPct = Math.min(100, Math.round((p.xpToday / p.dailyGoal) * 100))
  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand"><Wordmark size={30} /></Link>
        <nav className="stats" aria-label="Your progress">
          <span className={`stat ${p.streak > 0 && p.lastStudyDay === todayStr() ? 'hot' : ''}`} title="Day streak">🔥 {p.streak}</span>
          <span className="stat" title="Total XP">⚡ {p.xp} XP</span>
          <span className="stat goal" title="Daily goal progress">
            🎯 {p.xpToday}/{p.dailyGoal}
            <span className="goal-ring" style={{ ['--pct' as never]: `${goalPct}%` }} />
          </span>
        </nav>
      </header>
      <main className="page">{children}</main>
      <nav className="bottombar" aria-label="Main navigation">
        <Link to="/" className="tab">🏠<span>Home</span></Link>
        <Link to="/courses" className="tab">📚<span>Courses</span></Link>
        <Link to="/review" className="tab">🔁<span>Review</span></Link>
        <Link to="/profile" className="tab">🙂<span>Profile</span></Link>
      </nav>
    </div>
  )
}
