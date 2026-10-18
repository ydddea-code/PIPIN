import type { Lesson, Exercise } from '../types'
import { KATAKANA } from './kana'

const choice = (question: string, options: string[], answer: number): Exercise =>
  ({ kind: 'choice', prompt: 'Choose the correct answer', question, options, answer })
const listen = (audioText: string, options: string[], answer: number): Exercise =>
  ({ kind: 'listen', prompt: 'Listen and choose what you heard', audioText, options, answer })
const match = (pairs: [string, string][]): Exercise =>
  ({ kind: 'match', pairs: pairs.map(([a, b]) => ({ a, b })) })
const typeEx = (question: string, answer: string[]): Exercise =>
  ({ kind: 'type', prompt: 'Type your answer', question, answer })

const k = (r: string) => KATAKANA.find((x) => x.romaji === r)!.char

export const KATAKANA_LESSONS: Lesson[] = [
  {
    id: 'kt-1', title: 'Katakana vowels: ア イ ウ エ オ', subtitle: 'Angular cousins of あいうえお',
    icon: '📐', xp: 20, teaches: ['k-a', 'k-i', 'k-u', 'k-e', 'k-o'],
    exercises: [
      choice('Which katakana is "u"?', [k('u'), k('a'), k('o'), k('e')], 0),
      listen('エ', ['e', 'i', 'o', 'a'], 0),
      match([['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o']]),
      typeEx('Romaji for オ', ['o']),
      choice('アイスクリーム starts with…', ['a', 'i', 's', 'k'], 0),
      listen('ウ', ['u', 'o', 'a', 'mu'], 0),
    ],
  },
  {
    id: 'kt-2', title: 'K/S/T rows: カ キ ク ケ コ …', subtitle: 'Same sounds as hiragana, new shapes',
    icon: '✏️', xp: 20, teaches: ['k-ka', 'k-ki', 'k-ku', 'k-ke', 'k-ko', 'k-sa', 'k-shi', 'k-su', 'k-se', 'k-so', 'k-ta', 'k-chi', 'k-tsu', 'k-te', 'k-to'],
    exercises: [
      choice('Which is katakana "shi"?', [k('shi'), k('sa'), k('se'), k('so')], 0),
      match([['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko']]),
      listen('チ', ['chi', 'ti', 'ci', 'ki'], 0),
      typeEx('Romaji for ツ', ['tsu']),
      choice('アメリカ (America) contains which of these?', ['リ', 'ヌ', 'ふ'.toUpperCase() === 'X' ? 'X' : 'メ', 'ど'], 0),
      match([['サ', 'sa'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so']]),
      listen('テ', ['te', 'de', 'to', 'ce'], 0),
    ],
  },
  {
    id: 'kt-3', title: 'N/H/M rows + ャ ュ ョ', subtitle: 'ナ ニ ヌ ネ ノ … plus small combos',
    icon: '🎴', xp: 20, teaches: ['k-na', 'k-ni', 'k-nu', 'k-ne', 'k-no', 'k-ha', 'k-hi', 'k-fu', 'k-he', 'k-ho', 'k-ma', 'k-mi', 'k-mu', 'k-me', 'k-mo', 'k-ya', 'k-yu', 'k-yo'],
    exercises: [
      choice('Which is "no"?', [k('no'), k('nu'), k('na'), k('ni')], 0),
      match([['ハ', 'ha'], ['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho']]),
      listen('ミ', ['mi', 'ma', 'mu', 'me'], 0),
      typeEx('Romaji for ュ', ['yu']),
      choice('ニュース (newsyuu) uses シュ which is…', ['shu', 'syu', 'su', 'chu'], 0),
      match([['マ', 'ma'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo']]),
      listen('ヤ', ['ya', 'yu', 'ra', 'la'], 0),
    ],
  },
  {
    id: 'kt-4', title: 'R/W/N + dakuten: ラ … ン, ガ ザ ダ バ パ', subtitle: 'Finish the set',
    icon: '🔚', xp: 25, teaches: ['k-ra', 'k-ri', 'k-ru', 'k-re', 'k-ro', 'k-wa', 'k-wo', 'k-n', 'k-ga', 'k-za', 'k-ji', 'k-zu', 'k-da', 'k-de', 'k-do', 'k-ba', 'k-pa'],
    exercises: [
      choice('Which is "n" (final nasal)?', [k('n'), k('wa'), k('ro'), k('mu')], 0),
      match([['ラ', 'ra'], ['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro']]),
      listen('ン', ['n', 'ng', 'nn', 'm'], 0),
      typeEx('Romaji for バ', ['ba']),
      choice('コーヒー uses which long-vowel mark ー?', ['prolonged sound mark', 'small tsu', 'iteration mark', 'voiced mark'], 0),
      match([['ガ', 'ga'], ['ザ', 'za'], ['ダ', 'da'], ['パ', 'pa']]),
      listen('ジュース', ['juusu', 'zuusu', 'syuusu', 'dzyuusu'], 0),
    ],
  },
]
