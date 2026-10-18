import type { Kana } from '../types'

const mk = (rows: [string, string][]): Kana[] =>
  rows.map(([char, romaji]) => ({ id: `h-${romaji}`, char, romaji, type: 'vowel' }))

// Full hiragana table (basic + dakuten + combos)
export const HIRAGANA: Kana[] = [
  ...mk([['あ','a'],['い','i'],['う','u'],['え','e'],['お','o']]),
  ...mk([['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko']]),
  ...mk([['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so']]),
  ...mk([['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to']]),
  ...mk([['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no']]),
  ...mk([['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho']]),
  ...mk([['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo']]),
  ...mk([['や','ya'],['ゆ','yu'],['よ','yo']]),
  ...mk([['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro']]),
  ...mk([['わ','wa'],['を','wo'],['ん','n']]),
  ...mk([['が','ga'],['ぎ','gi'],['ぐ','gu'],['げ','ge'],['ご','go']]),
  ...mk([['ざ','za'],['じ','ji'],['ず','zu'],['ぜ','ze'],['ぞ','zo']]),
  ...mk([['だ','da'],['ぢ','ji'],['づ','zu'],['で','de'],['ど','do']]),
  ...mk([['ば','ba'],['び','bi'],['ぶ','bu'],['べ','be'],['ぼ','bo']]),
  ...mk([['ぱ','pa'],['ぴ','pi'],['ぷ','pu'],['ぺ','pe'],['ぽ','po']]),
]

export const KATAKANA: Kana[] = HIRAGANA.map((k) => ({
  ...k,
  id: `k-${k.romaji === 'ji' && k.char === 'ぢ' ? 'ji2' : k.romaji}`,
  char: hToK(k.char),
}))

function hToK(h: string): string {
  const base = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ'
  const src = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ'
  const i = src.indexOf(h)
  return i >= 0 ? base[i] : h
}

export function kanaById(id: string): Kana | undefined {
  if (id.startsWith('h-')) return HIRAGANA.find((k) => k.id === id)
  if (id.startsWith('k-')) return KATAKANA.find((k) => k.id === id)
  return undefined
}
