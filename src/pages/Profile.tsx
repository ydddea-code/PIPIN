import { useState } from 'react'
import { ACHIEVEMENTS, store, useProgress, todayStr } from '../lib/store'

export default function Profile() {
  const p = useProgress()
  const [email, setEmail] = useState(p.account?.email ?? '')
  const [syncOn, setSyncOn] = useState(p.account?.syncEnabled ?? false)

  // Streak calendar: last 7 days activity markers (approximate from streak & lastStudyDay)
  const days = [...Array(7)].map((_, idx) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - idx))
    const ds = todayStr(d)
    const active = p.lastStudyDay !== null && ds <= p.lastStudyDay &&
      (() => { const diff = Math.round((new Date(p.lastStudyDay!).getTime() - d.getTime()) / 86_400_000); return diff >= 0 && diff < p.streak })()
    return { ds, active }
  })

  return (
    <div className="profile-page">
      <h1>🙂 Profile</h1>

      <section className="card">
        <h2>Weekly activity</h2>
        <div className="week-row">
          {days.map((d) => (
            <span key={d.ds} className={`day-dot ${d.active ? 'on' : ''}`} title={`${d.ds}${d.active ? ' · studied' : ''}`}>
              {['日', '月', '火', '水', '木', '金', '土'][new Date(d.ds + 'T00:00').getDay()]}
            </span>
          ))}
        </div>
        <label className="goal-select">Daily goal:
          <select value={p.dailyGoal} onChange={(e) => store.setDailyGoal(Number(e.target.value))}>
            {[10, 20, 30, 50, 100].map((g) => <option key={g} value={g}>{g} XP</option>)}
          </select>
        </label>
      </section>

      <section className="card">
        <h2>Achievements</h2>
        <div className="ach-grid">
          {ACHIEVEMENTS.map((a) => {
            const got = p.achievements.includes(a.id)
            return (
              <div key={a.id} className={`ach ${got ? 'got' : ''}`} title={a.desc}>
                <span className="ach-icon">{got ? a.icon : '🔒'}</span>
                <b>{a.name}</b>
                <small>{a.desc}</small>
              </div>
            )
          })}
        </div>
      </section>

      <section className="card">
        <h2>Account & sync</h2>
        {!p.account ? (
          <>
            <p className="muted">Optional: create a lightweight local account to prepare for cloud sync. Your progress always stays saved on this device.</p>
            <div className="row-gap wrap">
              <input className="type-input small" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn-primary" disabled={!email.includes('@')} onClick={() => store.setAccount(email, syncOn)}>Create account</button>
            </div>
          </>
        ) : (
          <>
            <p>Signed in as <b>{p.account.email}</b></p>
            <label className="row-gap wrap" style={{ alignItems: 'center' }}>
              <input type="checkbox" checked={p.account.syncEnabled} onChange={(e) => { setSyncOn(e.target.checked); store.setAccount(p.account!.email, e.target.checked) }} />
              Cloud sync (local stub — connect your backend endpoint in <code>src/lib/store.ts</code>)
            </label>
            <button className="btn-ghost" onClick={() => store.setAccount(null)}>Sign out</button>
          </>
        )}
      </section>

      <section className="card">
        <h2>Data</h2>
        <p className="muted">All progress is stored locally in your browser (localStorage). Export a backup anytime.</p>
        <div className="row-gap">
          <button className="btn-ghost" onClick={() => {
            const blob = new Blob([JSON.stringify(p)], { type: 'application/json' })
            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = 'pipinegro-progress.json'
            a.click()
          }}>⬇️ Export progress</button>
          <button className="btn-danger" onClick={() => { if (confirm('Reset all progress?')) store.reset() }}>Reset progress</button>
        </div>
      </section>
    </div>
  )
}
