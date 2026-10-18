import type { Course } from '../types'
import { HIRAGANA_LESSONS } from './hiraganaLessons'
import { KATAKANA_LESSONS } from './katakanaLessons'

export const COURSES: Course[] = [
  {
    id: 'hiragana', title: 'Hiragana', level: 'Beginner', color: '#2e9e5b',
    description: 'Master the 46+ base Japanese syllabary through 10 gamified lessons.',
    lessons: HIRAGANA_LESSONS,
  },
  {
    id: 'katakana', title: 'Katakana', level: 'Beginner', color: '#3a86c8',
    description: 'Learn the angular alphabet used for foreign words and names.',
    lessons: KATAKANA_LESSONS,
  },
]

export const JLPT_PATHS: { level: string; blurb: string; focus: string[] }[] = [
  { level: 'N5', blurb: 'Basics: kana, ~100 kanji, ~800 words, simple grammar.', focus: ['hiragana', 'katakana', 'kanji-n5', 'vocab-n5', 'grammar-n5'] },
  { level: 'N4', blurb: 'Elementary: ~300 kanji, ~1500 words, te-form & compounds.', focus: ['kanji-n4', 'vocab-n4', 'grammar-n4'] },
  { level: 'N3', blurb: 'Intermediate threshold: ~650 kanji, ~3750 words.', focus: ['kanji-n3', 'vocab-n3', 'grammar-n3'] },
  { level: 'N2', blurb: 'Upper-intermediate: ~1000 kanji, ~6000 words.', focus: ['kanji-n2', 'vocab-n2', 'grammar-n2'] },
  { level: 'N1', blurb: 'Advanced fluency: ~2000+ kanji, ~10,000 words.', focus: ['kanji-n1', 'vocab-n1', 'grammar-n1'] },
]
