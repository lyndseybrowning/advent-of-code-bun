export const cardStrengths: string[] = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
]

export type WinningHands = {
  'five of a kind': number
  'four of a kind': number
  'full house': number
  'three of a kind': number
  'two pair': number
  'one pair': number
  'high card': number
}

export const winningHands: WinningHands = {
  'five of a kind': 7,
  'four of a kind': 6,
  'full house': 5,
  'three of a kind': 4,
  'two pair': 3,
  'one pair': 2,
  'high card': 1,
} as const

export type Hand = {
  hand: string
  bid: number
}

export type HandScore = typeof winningHands

export const getParsedInput = (input: string[]): Hand[] => {
  const hands = input.map((line) => {
    const [hand, bid] = line.split(' ')

    return {
      hand,
      bid: Number(bid),
    }
  })

  return hands
}

export const getHandScore = (hand: string): keyof WinningHands => {
  const scores: Record<string, number> = {}

  for (const char of hand) {
    scores[char] = scores[char] ?? 0
    scores[char] += 1
  }

  const values = Object.values(scores)

  if (values.includes(5)) {
    return 'five of a kind'
  }

  if (values.includes(4)) {
    return 'four of a kind'
  }

  if ([2, 3].every((num) => values.includes(num))) {
    return 'full house'
  }

  if (values.includes(3)) {
    return 'three of a kind'
  }

  if (values.filter((num) => num === 2).length === 2) {
    return 'two pair'
  }

  if (values.includes(2)) {
    return 'one pair'
  }

  return 'high card'
}

export const getHandRank = (hands: Hand[]): Hand[] => {
  const ranked = hands.sort((a: Hand, b: Hand) => {
    const handAScore = winningHands[getHandScore(a.hand)]
    const handBScore = winningHands[getHandScore(b.hand)]

    if (handAScore === handBScore) {
      for (const [index, char] of a.hand.split('').entries()) {
        if (char !== b.hand[index]) {
          const charAIndex = cardStrengths.findIndex((c) => c === char)
          const charBIndex = cardStrengths.findIndex((c) => c === b.hand[index])

          return charAIndex < charBIndex ? 0 : -1
        }
      }
    }

    if (handAScore < handBScore) {
      return -1
    }

    return 0
  })

  return ranked
}

export const part1 = (hands: Hand[]): number => {
  const rankedHands = getHandRank(hands)
  const totalWinnings = rankedHands.reduce((total, hand, index) => {
    return total + hand.bid * (index + 1)
  }, 0)

  return totalWinnings
}

export const part2 = (hands: Hand[]) => {}

const input = Bun.file('./2023/7/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

const p1 = part1(parsedInput)
// TODO
const p2 = 0

console.log({ p1, p2 })
