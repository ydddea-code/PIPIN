import { lazy, Suspense } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import { useHashRoute } from './lib/router'

// Route-level code splitting keeps the initial bundle tiny.
const Courses = lazy(() => import('./pages/Courses'))
const LessonRunner = lazy(() => import('./pages/LessonRunner'))
const KanjiPage = lazy(() => import('./pages/KanjiPage'))
const Flashcards = lazy(() => import('./pages/Flashcards'))
const Grammar = lazy(() => import('./pages/Grammar'))
const JlptPaths = lazy(() => import('./pages/JlptPaths'))
const Review = lazy(() => import('./pages/Review'))
const Profile = lazy(() => import('./pages/Profile'))

function Loading() {
  return <div className="card center-card"><span className="big-icon">🌱</span><p>Loading…</p></div>
}

function Page({ route }: { route: string }) {
  const parts = route.split('/').filter(Boolean)
  if (parts.length === 0) return <Dashboard />
  switch (parts[0]) {
    case 'courses': return <Courses />
    case 'lesson': return <LessonRunner courseId={parts[1] ?? ''} lessonId={parts[2] ?? ''} />
    case 'course': return <Courses />
    case 'kanji': return <KanjiPage />
    case 'flashcards': return <Flashcards />
    case 'grammar': return <Grammar />
    case 'jlpt': return <JlptPaths />
    case 'review': return <Review />
    case 'profile': return <Profile />
    default: return <Dashboard />
  }
}

export default function App() {
  const route = useHashRoute()
  const inLesson = route.startsWith('/lesson/')
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        {!inLesson && route !== '/' && null}
        <Page route={route} />
      </Suspense>
    </Layout>
  )
}
