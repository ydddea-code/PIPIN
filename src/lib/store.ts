import { useSyncExternalStore } from 'react'
import type { SRSCard } from './srs'
import { newCard, review as srsReview } from './srs'

export interface Achievement {
  id: string
  name: string
  desc: string
  icon: string
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-lesson', name: 'First Steps', desc: 'Complete your first lesson', icon: '👣' },
  { id: 'streak-3', name: 'On Fire', desc: 'Keep a 3-day streak', icon: '🔥' },
  { id: 'streak-7', name: 'Week Warrior', desc: 'Keep a 7-day streak', icon: '⚡' },
  { id: 'xp-100', name: 'Century', desc: 'Earn 100 XP', icon: '💯' },
  { id: 'xp-500', name: 'Half Millennium', desc: 'Earn 500 XP', icon: '🏆' },
  { id: 'kana-20', name: 'Kana Collector', desc: 'Learn 20 kana', icon: '🈵' },
  { id: 'perfect', name: 'Flawless', desc: 'Finish a lesson without mistakes', icon: '✨' },
  { id: 'review-10', name: 'Reviewer', desc: 'Do 10 spaced-repetition reviews', icon: '🔁' },
]

export interface Progress {
  xp: number
  xpToday: number
  streak: number
  lastStudyDay: string | null   // YYYY-MM-DD
  completedLessons: Record<string, number> // lessonId -> best score %
  kanaKnown: string[]           // kana ids marked known
  srs: Record<string, SRSCard>
  reviewsDone: number
  achievements: string[]
  dailyGoal: number             // XP per day
  perfectLessons: number
  account: { email: string; syncEnabled: boolean } | null
}

const KEY = 'pipinegro-progress-v1'

export function todayStr(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function yesterdayStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return todayStr(d)
}

export const defaultProgress: Progress = {
  xp: 0, xpToday: 0, streak: 0, lastStudyDay: null,
  completedLessons: {}, kanaKnown: [], srs: {}, reviewsDone: 0,
  achievements: [], dailyGoal: 30, perfectLessons: 0, account: null,
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultProgress
    return { ...defaultProgress, ...(JSON.parse(raw) as Progress) }
  } catch {
    return defaultProgress
  }
}

let state: Progress = load()
const listeners = new Set<() => void>()

function emit() {
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage full/private mode */ }
  listeners.forEach((l) => l())
}

function setState(next: Progress) {
  state = next
  emit()
}

// ---- Achievements evaluation ----
function checkAchievements(p: Progress): string[] {
  const got = new Set(p.achievements)
  const done = Object.keys(p.completedLessons).length
  if (done >= 1) got.add('first-lesson')
  if (p.streak >= 3) got.add('streak-3')
  if (p.streak >= 7) got.add('streak-7')
  if (p.xp >= 100) got.add('xp-100')
  if (p.xp >= 500) got.add('xp-500')
  if (p.kanaKnown.length >= 20) got.add('kana-20')
  if (p.perfectLessons >= 1) got.add('perfect')
  if (p.reviewsDone >= 10) got.add('review-10')
  return [...got]
}

// ---- Public API ----
export const store = {
  get: () => state,
  subscribe(l: () => void) {
    listeners.add(l)
    return () => listeners.delete(l)
  },

  touchStreak() {
    const t = todayStr()
    if (state.lastStudyDay === t) return
    const cont = state.lastStudyDay === yesterdayStr()
    setState({ ...state, streak: cont ? state.streak + 1 : 1, lastStudyDay: t })
  },

  completeLesson(lessonId: string, scorePct: number, xpGained: number, isPerfect: boolean) {
    const prevBest = state.completedLessons[lessonId] ?? 0
    const lessons = { ...state.completedLessons, [lessonId]: Math.max(prevBest, scorePct) }
    let kana = state.kanaKnown
    const base: Progress = {
      ...state,
      xp: state.xp + xpGained,
      xpToday: state.xpToday + xpGained,
      completedLessons: lessons,
      perfectLessons: state.perfectLessons + (isPerfect ? 1 : 0),
      kanaKnown: kana,
    }
    const withStreak: Progress = (() => {
      const t = todayStr()
      if (base.lastStudyDay === t) return base
      const cont = base.lastStudyDay === yesterdayStr()
      return { ...base, streak: cont ? base.streak + 1 : 1, lastStudyDay: t }
    })()
    const achievements = checkAchievements(withStreak)
    setState({ ...withStreak, achievements })
  },

  markKanaKnown(ids: string[]) {
    const set = new Set([...state.kanaKnown, ...ids])
    const p = { ...state, kanaKnown: [...set] }
    setState({ ...p, achievements: checkAchievements(p) })
  },

  srsGrade(key: string, grade: 0 | 1 | 2) {
    const card = state.srs[key] ?? newCard(key)
    const updated = srsReview(card, grade)
    const p: Progress = {
      ...state,
      srs: { ...state.srs, [key]: updated },
      reviewsDone: state.reviewsDone + 1,
    }
    setState({ ...p, achievements: checkAchievements(p) })
  },

  setDailyGoal(goal: number) {
    setState({ ...state, dailyGoal: goal })
  },

  setAccount(email: string | null, syncEnabled = false) {
    setState({ ...state, account: email ? { email, syncEnabled } : null })
  },

  reset() {
    setState(defaultProgress)
  },
}

export function useProgress(): Progress {
  return useSyncExternalStore(store.subscribe, store.get, store.get)
}
