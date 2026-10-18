// Tiny hash-based router (~1KB) — no external dependency.
import { useEffect, useState } from 'react'

export function useHashRoute(): string {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/')
  useEffect(() => {
    const onChange = () => setRoute(window.location.hash.slice(1) || '/')
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function navigate(to: string) {
  window.location.hash = to
}

export function Link({ to, className, children, onClick }: {
  to: string; className?: string; children: React.ReactNode; onClick?: () => void
}) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={() => { onClick?.(); }}
    >
      {children}
    </a>
  )
}
