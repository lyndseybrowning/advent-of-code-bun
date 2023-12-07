export const cardScores: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
}

export const JOKER = 'J'

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

export const getHandScore = (
  hand: string,
  useJoker = false
): keyof WinningHands => {
  const scores: Map<string, number> = new Map()

  for (const char of hand) {
    scores.set(char, (scores.get(char) ?? 0) + 1)
  }

  // if there's a joker
  // count the number of jokers and add to the total value of the highest card
  if (useJoker) {
    const numberOfJokers = scores.get(JOKER) ?? 0

    let highestScore = -1
    let highestChar = ''

    for (const [char, score] of scores) {
      if (char !== JOKER && score >= highestScore) {
        highestScore = score
        highestChar = char
      }
    }

    scores.delete(JOKER)
    scores.set(highestChar, highestScore + numberOfJokers)
  }

  if (scores.size === 1) {
    return 'five of a kind'
  }

  if (scores.size === 2) {
    for (const [, score] of scores) {
      if (score === 1 || score === 4) {
        return 'four of a kind'
      }
    }
    return 'full house'
  }

  if (scores.size === 3) {
    for (const [, score] of scores) {
      if (score === 3) {
        return 'three of a kind'
      }
    }
    return 'two pair'
  }

  if (scores.size === 4) {
    return 'one pair'
  }

  return 'high card'
}

export const getCharScore = (
  char: keyof typeof cardScores,
  useJoker: boolean
) => {
  if (useJoker && char === JOKER) {
    return 1
  }
  return cardScores[char]
}

export const getRankedHands = (
  hands: Hand[],
  useJoker: boolean = false
): Hand[] => {
  const ranked = hands.sort((a: Hand, b: Hand) => {
    const handAScore = winningHands[getHandScore(a.hand, useJoker)]
    const handBScore = winningHands[getHandScore(b.hand, useJoker)]

    if (handAScore === handBScore) {
      for (const [index, char] of a.hand.split('').entries()) {
        if (char !== b.hand[index]) {
          const charAScore = getCharScore(char, useJoker)
          const charBScore = getCharScore(b.hand[index], useJoker)

          return charAScore < charBScore ? -1 : 0
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

export const part1 = (hands: Hand[], useJoker = false): number => {
  const rankedHands = getRankedHands(hands, useJoker)
  const totalWinnings = rankedHands.reduce((total, hand, index) => {
    return total + hand.bid * (index + 1)
  }, 0)

  return totalWinnings
}

export const part2 = (hands: Hand[]) => {
  return part1(hands, true)
}

const input = Bun.file('./2023/7/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

// 248113761
const p1 = part1(parsedInput)

// 246285222
const p2 = part2(parsedInput)

console.log({ p1, p2 })
