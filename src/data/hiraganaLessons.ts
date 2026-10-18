import type { Lesson, Exercise } from '../types'
import { HIRAGANA } from './kana'

// Helpers to build exercises concisely
const choice = (question: string, options: string[], answer: number, prompt = 'Choose the correct answer'): Exercise =>
  ({ kind: 'choice', prompt, question, options, answer })
const listen = (audioText: string, options: string[], answer: number): Exercise =>
  ({ kind: 'listen', prompt: 'Listen and choose what you heard', audioText, options, answer })
const match = (pairs: [string, string][]): Exercise =>
  ({ kind: 'match', pairs: pairs.map(([a, b]) => ({ a, b })) })
const typeEx = (question: string, answer: string[], hint?: string, prompt = 'Type your answer'): Exercise =>
  ({ kind: 'type', prompt, question, answer, hint })
const order = (sentence: string[], tokens: string[], translation: string): Exercise =>
  ({ kind: 'order', prompt: 'Arrange the words into a sentence', sentence, tokens, translation })

const kanaOf = (romaji: string[]) =>
  romaji.map((r) => HIRAGANA.find((k) => k.romaji === r)!.char)

const h = (r: string) => HIRAGANA.find((k) => k.romaji === r)!.char

export const HIRAGANA_LESSONS: Lesson[] = [
  {
    id: 'hg-1', title: 'Vowels: あ い う え お', subtitle: 'The five sounds that start everything',
    icon: '🌱', xp: 20, teaches: ['h-a', 'h-i', 'h-u', 'h-e', 'h-o'],
    exercises: [
      choice('Which hiragana is "a"?', [...kanaOf(['a', 'i', 'u', 'e']), ...kanaOf(['o'])], 0),
      choice('Which hiragana is "ki"? — trick! Pick the vowel "i"', [h('i'), h('u'), h('e'), h('a')], 0),
      listen('う', ['u', 'o', 'a', 'e'], 0),
      match([['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']]),
      choice('"え" is pronounced…', ['e', 'a', 'o', 'i'], 0),
      typeEx('Write the romaji for: お', ['o']),
      listen('い', ['i', 'e', 'a', 'u'], 0),
      typeEx('Type the hiragana for "u" (use any input method)', ['う', 'u'], 'Hint: it looks like a small hill'),
      match([['あ', 'a'], ['う', 'u'], ['お', 'o']]),
      choice('Which word starts with "a"? あ + り + が + る = apple 🍎', ['ありがとう-ish… just kidding: あ', 'く', 'せ', 'と'], 0),
    ],
  },
  {
    id: 'hg-2', title: 'K-row: か き く け こ', subtitle: 'Add K before every vowel',
    icon: '🔑', xp: 20, teaches: ['h-ka', 'h-ki', 'h-ku', 'h-ke', 'h-ko'],
    exercises: [
      choice('Which is "ka"?', [h('ka'), h('ku'), h('ke'), h('ko')], 0),
      listen('き', ['ki', 'ka', 'ku', 'ko'], 0),
      match([['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko']]),
      typeEx('Romaji for く', ['ku']),
      choice('Which is "ke"?', [h('ke'), h('ko'), h('ka'), h('ki')], 0),
      listen('こ', ['ko', 'ku', 'ka', 'ke'], 0),
      match([['か', 'ka'], ['く', 'ku'], ['こ', 'ko']]),
      typeEx('Romaji for け', ['ke']),
      choice('"くち" (kuchi) means mouth. Which pair is right?', ['く = ku, ち = chi', 'く = ka, ち = ti', 'く = ku, ち = ki', 'く = ko, ち = cu'], 0),
    ],
  },
  {
    id: 'hg-3', title: 'S-row: さ し す せ そ', subtitle: 'Watch out: し is "shi", not "si"',
    icon: '⭐', xp: 20, teaches: ['h-sa', 'h-shi', 'h-su', 'h-se', 'h-so'],
    exercises: [
      choice('How do you read し?', ['shi', 'si', 'sxi', 'syi'], 0),
      listen('す', ['su', 'sa', 'se', 'so'], 0),
      match([['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so']]),
      typeEx('Romaji for せ', ['se']),
      choice('Which is "so"?', [h('so'), h('sa'), 'す'.replace('す', h('su')), h('se')], 0),
      listen('しゃ', ['sha', 'sya', 'sa', 'sia'], 0),
      match([['さ', 'sa'], ['す', 'su'], ['そ', 'so']]),
      typeEx('Romaji for し', ['shi', 'si']),
      choice('すし (sushi!) is written…', ['すし', 'しさ', 'すさ', 'しす'], 0),
    ],
  },
  {
    id: 'hg-4', title: 'T-row: た ち つ て と', subtitle: 'つ is "tsu" — the tricky one',
    icon: '🥁', xp: 20, teaches: ['h-ta', 'h-chi', 'h-tsu', 'h-te', 'h-to'],
    exercises: [
      choice('Which is "tsu"?', [h('tsu'), h('tu'), h('te'), h('to')].slice(0, 4), 0),
      listen('ち', ['chi', 'ti', 'cha', 'ci'], 0),
      match([['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to']]),
      typeEx('Romaji for て', ['te']),
      choice('つくえ (desk) starts with…', ['つ (tsu)', 'た (ta)', 'て (te)', 'と (to)'], 0),
      listen('と', ['to', 'do', 'te', 'tro'], 0),
      match([['た', 'ta'], ['つ', 'tsu'], ['て', 'te']]),
      typeEx('Romaji for ち', ['chi', 'ti']),
    ],
  },
  {
    id: 'hg-5', title: 'N-row: な に ぬ ね の', subtitle: 'Including the super useful の',
    icon: '📓', xp: 20, teaches: ['h-na', 'h-ni', 'h-nu', 'h-ne', 'h-no'],
    exercises: [
      choice('Which is "ni"?', [h('ni'), h('nu'), h('na'), h('no')], 0),
      listen('の', ['no', 'ne', 'nu', 'na'], 0),
      match([['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no']]),
      typeEx('Romaji for ぬ', ['nu']),
      choice('にほん (Japan) begins with…', ['に (ni)', 'な (na)', 'ぬ (nu)', 'ね (ne)'], 0),
      listen('ねこ', ['neko', 'neko', 'noko', 'nika'], 0),
      typeEx('Romaji for な', ['na']),
      match([['に', 'ni'], ['ね', 'ne'], ['の', 'no']]),
    ],
  },
  {
    id: 'hg-6', title: 'H-row: は ひ ふ へ ほ', subtitle: 'Note: ふ is "fu", not "hu"',
    icon: '🎈', xp: 20, teaches: ['h-ha', 'h-hi', 'h-fu', 'h-he', 'h-ho'],
    exercises: [
      choice('How is ふ usually romanized?', ['fu', 'hu', 'hoo', 'fuu'], 0),
      listen('へ', ['he', 'hi', 'ha', 'ho'], 0),
      match([['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho']]),
      typeEx('Romaji for ほ', ['ho']),
      choice('ふゆ (winter) starts with…', ['ふ (fu)', 'は (ha)', 'ひ (hi)', 'へ (he)'], 0),
      listen('ひと', ['hito', 'fito', 'hoto', 'hetu'], 0),
      match([['は', 'ha'], ['ふ', 'fu'], ['ほ', 'ho']]),
      typeEx('Romaji for ひ', ['hi']),
    ],
  },
  {
    id: 'hg-7', title: 'M-row: ま み む め も', subtitle: 'Round and easy — plus や ゆ よ',
    icon: '🌙', xp: 20, teaches: ['h-ma', 'h-mi', 'h-mu', 'h-me', 'h-mo', 'h-ya', 'h-yu', 'h-yo'],
    exercises: [
      choice('Which is "mu"?', [h('mu'), h('ma'), h('me'), h('mo')], 0),
      listen('や', ['ya', 'yu', 'yo', 'ye'], 0),
      match([['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo']]),
      typeEx('Romaji for よ', ['yo']),
      choice('やま (mountain) is…', ['yama', 'lama', 'yuma', 'yam'], 0),
      listen('みず', ['mizu', 'mitsu', 'muzu', 'miz'], 0),
      match([['ま', 'ma'], ['ゆ', 'yu'], ['も', 'mo']]),
      typeEx('Romaji for め', ['me']),
    ],
  },
  {
    id: 'hg-8', title: 'R-row & わ を ん', subtitle: 'らりるれろ + the finale',
    icon: '🚂', xp: 20, teaches: ['h-ra', 'h-ri', 'h-ru', 'h-re', 'h-ro', 'h-wa', 'h-wo', 'h-n'],
    exercises: [
      choice('Which is "ru"?', [h('ru'), h('ro'), h('ri'), h('ra')], 0),
      listen('ん', ['n', 'm', 'ng', 'nn'], 0),
      match([['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro']]),
      typeEx('Romaji for を (object particle)', ['wo', 'o']),
      choice('さくら (cherry blossom) ends with…', ['ら (ra)', 'ろ (ro)', 'り (ri)', 'る (ru)'], 0),
      listen('りんご', ['ringo', 'rinko', 'rilgo', 'rango'], 0),
      match([['わ', 'wa'], ['る', 'ru'], ['を', 'wo']]),
      typeEx('Romaji for ん', ['n']),
    ],
  },
  {
    id: 'hg-9', title: 'Dakuten: が ざ だ ば ぱ', subtitle: 'Voiced twins & little circles',
    icon: '🎭', xp: 25, teaches: ['h-ga', 'h-gi', 'h-gu', 'h-ge', 'h-go', 'h-za', 'h-ji', 'h-zu', 'h-ze', 'h-zo', 'h-da', 'h-de', 'h-do', 'h-ba', 'h-bi', 'h-bu', 'h-be', 'h-bo', 'h-pa', 'h-pi', 'h-pu', 'h-pe', 'h-po'],
    exercises: [
      choice('か + dakuten becomes…', ['が (ga)', 'ぎ (gi)', 'ぱ (pa)', 'ぐ (gu)'], 0),
      listen('ぱ', ['pa', 'ba', 'ha', 'ppa'], 0),
      match([['が', 'ga'], ['ざ', 'za'], ['だ', 'da'], ['ば', 'ba'], ['ぱ', 'pa']]),
      typeEx('Romaji for じ', ['ji']),
      choice('The small circle (゜) turns は行 into…', ['ぱ行 (p-sounds)', 'ば行 (b-sounds)', 'ま行 (m-sounds)', 'や行 (y-sounds)'], 0),
      listen('ぎん', ['gin', 'kin', 'jin', 'gien'], 0),
      match([['ば', 'ba'], ['ぶ', 'bu'], ['べ', 'be']]),
      typeEx('Romaji for ぷ', ['pu']),
      choice('ばん (evening/meals) uses which row?', ['ば (b)', 'ぱ (p)', 'は (h)', 'ま (m)'], 0),
    ],
  },
  {
    id: 'hg-10', title: 'Review: Read real words', subtitle: 'Mix everything together',
    icon: '🏯', xp: 30, teaches: [],
    exercises: [
      choice('ありがとう means…', ['thank you', 'hello', 'goodbye', 'sorry'], 0),
      listen('さようなら', ['sayounara', 'sakuranbo', 'sayonara-ish: so sa yo u na ra', 'konbanwa'], 0),
      typeEx('Romaji for ねこ', ['neko']),
      match([['あ', 'a'], ['か', 'ka'], ['さ', 'sa'], ['た', 'ta'], ['な', 'na']]),
      order(['わたし', 'は', 'ねこ', 'が', 'すき', 'です'], ['が', 'すき', 'ねこ', 'わたし', 'は', 'です'], 'I like cats.'),
      choice('"hanya / sushiya"… which reads 寿司? Hmm: すし is…', ['sushi', 'susi', 'shushi', 'sushishi'], 0),
      listen('つくえ', ['tsukue', 'tukae', 'chikue', 'tsukue'], 0),
      typeEx('Romaji for ひと', ['hito']),
      match([['ぬ', 'nu'], ['ふ', 'fu'], ['つ', 'tsu'], ['る', 'ru']]),
      order(['こんにちは'], ['こんにちは'], 'Hello!'),
    ],
  },
]

export const KATAKANA_LESSON_INTRO = {
  title: 'Katakana basics',
  blurb: 'Same sounds, different strokes — used for foreign words.',
}
