// Japanese pronunciation via Web Speech API (offline-capable in many browsers).
// Falls back gracefully when unsupported.
let voice: SpeechSynthesisVoice | null | undefined

function findJaVoice(): SpeechSynthesisVoice | null {
  if (voice !== undefined) return voice
  if (!('speechSynthesis' in window)) { voice = null; return null }
  const voices = window.speechSynthesis.getVoices()
  voice = voices.find((v) => v.lang.startsWith('ja')) ?? null
  return voice
}

if ('speechSynthesis' in window) {
  // Voices may load asynchronously
  window.speechSynthesis.onvoiceschanged = () => { voice = undefined; findJaVoice() }
}

export function speak(text: string, rate = 0.9) {
  if (!('speechSynthesis' in window)) return false
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'ja-JP'
    const ja = findJaVoice()
    if (ja) u.voice = ja
    u.rate = rate
    u.pitch = 1
    window.speechSynthesis.speak(u)
    return true
  } catch {
    return false
  }
}

export function speechSupported(): boolean {
  return 'speechSynthesis' in window
}
