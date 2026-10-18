export interface Kana {
  id: string
  char: string       // hiragana or katakana depending on set
  romaji: string
  type: 'vowel' | 'k' | 's' | 't' | 'n' | 'h' | 'm' | 'y' | 'r' | 'w' | 'g' | 'z' | 'd' | 'b' | 'p' | 'extra'
}

export interface VocabItem {
  ja: string
  reading: string
  en: string
  tags: string[]
}

export interface KanjiGlyph {
  char: string
  strokes: number
  onyomi: string[]
  kunyomi: string[]
  meaning: string
  words: VocabItem[]
}

export interface GrammarPoint {
  id: string
  title: string
  pattern: string
  explanation: string
  examples: { ja: string; reading: string; en: string }[]
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
}

export type Exercise =
  | { kind: 'choice'; prompt: string; question: string; options: string[]; answer: number }
  | { kind: 'match'; pairs: { a: string; b: string }[] }
  | { kind: 'type'; prompt: string; question: string; answer: string[]; hint?: string }
  | { kind: 'listen'; prompt: string; audioText: string; options: string[]; answer: number }
  | { kind: 'order'; prompt: string; sentence: string[]; tokens: string[]; translation: string }

export interface Lesson {
  id: string
  title: string
  subtitle: string
  icon: string
  xp: number
  teaches: string[]            // kana ids / vocab keys introduced
  exercises: Exercise[]
}

export interface Course {
  id: string
  title: string
  description: string
  level: string
  color: string
  lessons: Lesson[]
}
