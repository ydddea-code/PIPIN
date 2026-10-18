// Original Pipinegro wordmark: green circle + sprout stroke + sun dot.
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label="Pipinegro logo">
      <circle cx="16" cy="16" r="14" fill="#2e9e5b" />
      <path d="M16 24c0-5 1-8 4-11" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M16 24c0-6-2-9-5-11" stroke="#a5f0c4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="9" r="3" fill="#ffd54a" />
    </svg>
  )
}

export function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <span className="wordmark" style={{ fontSize: size * 0.62 }}>
      <LogoMark size={size} />
      <span className="wordmark-text">
        Pipine<span className="wordmark-gro">gro</span>
      </span>
    </span>
  )
}
