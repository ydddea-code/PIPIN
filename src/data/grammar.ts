import type { GrammarPoint } from '../types'

export const GRAMMAR: GrammarPoint[] = [
  {
    id: 'g-wa', level: 'N5', title: 'Topic particle は (wa)', pattern: '[noun] は [comment]',
    explanation: 'は marks the topic of a sentence — what you are talking about. It is pronounced "wa" when used as a particle.',
    examples: [
      { ja: 'わたし は 学生 です。', reading: 'watashi wa gakusei desu', en: 'I am a student.' },
      { ja: 'ねこ が います。', reading: 'neko ga imasu', en: 'There is a cat. (contrast: は = topic, が = subject)' },
    ],
  },
  {
    id: 'g-desu', level: 'N5', title: 'です (desu) — to be', pattern: '[noun/adj] です',
    explanation: 'です is the polite copula, linking a subject to a noun or adjective. Past tense: でした.',
    examples: [
      { ja: 'これは ほんだいです。', reading: 'kore wa Honda desu', en: 'This is Mr. Honda.' },
      { ja: 'きのう は あつかったです。', reading: 'kinou wa atsukatta desu', en: 'Yesterday was hot.' },
    ],
  },
  {
    id: 'g-mo', level: 'N5', title: 'も (mo) — also / too', pattern: '[noun] も',
    explanation: 'も replaces は or が to mean "also".',
    examples: [{ ja: 'わたし も 学生 です。', reading: 'watashi mo gakusei desu', en: 'I am a student too.' }],
  },
  {
    id: 'g-no', level: 'N5', title: 'の (no) — possession / modifier', pattern: 'A の B = B belonging to / of A',
    explanation: 'の connects nouns: X の Y means "Y of X" or "X\'s Y".',
    examples: [{ ja: 'にほん の ごはん', reading: 'nihon no gohan', en: 'Japanese food / rice of Japan' }],
  },
  {
    id: 'g-o', level: 'N5', title: 'を (wo/o) — object marker', pattern: '[someone] が [thing] を [verb]',
    explanation: 'を marks the direct object of an action verb.',
    examples: [{ ja: 'りんご を たべます。', reading: 'ringo wo tabemasu', en: '(I) eat an apple.' }],
  },
  {
    id: 'g-ni-de', level: 'N5', title: 'に vs で — time/place', pattern: 'に = target/time; で = location of action',
    explanation: 'に marks existence targets, destinations and times; で marks where an action happens.',
    examples: [
      { ja: '学校 に 行きます。', reading: 'gakkou ni ikimasu', en: 'I go to school.' },
      { ja: '図書館 で 勉強します。', reading: 'tosyokan de benkyou shimasu', en: 'I study at the library.' },
    ],
  },
  {
    id: 'g-masu', level: 'N5', title: 'ます (masu) — polite verbs', pattern: 'verb-stem + ます／ました／ません',
    explanation: 'The ます-form makes verbs polite. Present/future: ます. Past: ました. Negative: ません.',
    examples: [{ ja: '毎朝 コーヒー を のみます。', reading: 'maiasa koohii wo nomimasu', en: 'Every morning I drink coffee.' }],
  },
  {
    id: 'g-teikei', level: 'N4', title: 'て-form basics', pattern: 'verb て-form for sequencing & requests',
    explanation: 'The て-form links actions ("do A, then do B") and forms requests (〜てください).',
    examples: [{ ja: '窓 を あけて ください。', reading: 'mado wo akete kudasai', en: 'Please open the window.' }],
  },
  {
    id: 'g-taikugoshi', level: 'N4', title: 'たい (want to)', pattern: 'verb-stem + たい',
    explanation: 'たい attaches to the dictionary stem to express one\'s own desire.',
    examples: [{ ja: '日本 へ 行き たいです。', reading: 'Nihon e ikitai desu', en: 'I want to go to Japan.' }],
  },
  {
    id: 'g-kara-node', level: 'N4', title: 'から／ので (because)', pattern: 'reason + から／ので + result',
    explanation: 'から is direct "because"; ので is softer, more objective.',
    examples: [{ ja: '雨 です から、いきません。', reading: 'ame desu kara, ikimasen', en: "Because it's raining, I won't go." }],
  },
]
