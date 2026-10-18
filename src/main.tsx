import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Register service worker for offline access to cached lessons/shell.
if ('serviceWorker' in navigator && !location.hostname.includes('localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { /* optional */ })
  })
} else if ('serviceWorker' in navigator) {
  // Also try on localhost during dev-preview builds
  window.addEventListener('load', () => {
    fetch('/sw.js')
      .then((r) => (r.ok ? navigator.serviceWorker.register('/sw.js') : undefined))
      .catch(() => {})
  })
}
