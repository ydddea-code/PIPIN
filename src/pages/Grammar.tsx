import { GRAMMAR } from '../data/grammar'
import { speak } from '../lib/speech'

export default function Grammar() {
  return (
    <div className="grammar-page">
      <h1>📖 Grammar</h1>
      <p className="muted">Short, practical explanations with audio examples.</p>
      {GRAMMAR.map((g) => (
        <article key={g.id} className="card grammar-card">
          <header>
            <span className={`level-chip ${g.level}`}>{g.level}</span>
            <h2>{g.title}</h2>
          </header>
          <code className="pattern">{g.pattern}</code>
          <p>{g.explanation}</p>
          <ul className="examples">
            {g.examples.map((e) => (
              <li key={e.ja}>
                <button className="ex-audio" onClick={() => speak(e.ja.replace(/\s+/g, ''))}>🔊</button>
                <span className="ja example-ja">{e.ja}</span>
                <small className="furigana">{e.reading}</small>
                <small className="en">{e.en}</small>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
