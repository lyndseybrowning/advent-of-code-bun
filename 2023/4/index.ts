import { getSumOfDigits } from '../../utils/getSumOfDigits'

export type ScratchCard = {
  winningNumbers: number[]
  scratchedNumbers: number[]
}

export const getParsedInput = (input: string[]): ScratchCard[] => {
  return input.map((line) => {
    const [, numbers] = line.split(':')
    const [winners, scratched] = numbers.split('|')

    return {
      winningNumbers: winners.split(' ').filter(Boolean).map(Number),
      scratchedNumbers: scratched.split(' ').filter(Boolean).map(Number),
    }
  })
}

export const getNumberOfWinners = (
  scratchedNumbers: number[],
  winningNumbers: number[]
) => {
  return winningNumbers.filter((number) => scratchedNumbers.includes(number))
    .length
}

export const getCardScore = ({
  scratchedNumbers,
  winningNumbers,
}: ScratchCard): number => {
  const numberOfWinners = getNumberOfWinners(scratchedNumbers, winningNumbers)
  const range = [...Array(numberOfWinners).keys()]

  const cardScore = range.reduce(
    (score, _, index) => (index === 0 ? 1 : score + score),
    0
  )

  return cardScore
}

export const part1 = (scratchCards: ScratchCard[]) => {
  return getSumOfDigits(scratchCards.map(getCardScore))
}

export const part2 = (scratchCards: ScratchCard[]): number => {
  const cards: number[] = scratchCards.map((card) =>
    getNumberOfWinners(card.scratchedNumbers, card.winningNumbers)
  )

  const copies: number[] = Array(cards.length).fill(1)

  for (const [index, card] of cards.entries()) {
    let numberOfCopies = 0

    while (numberOfCopies < copies[index]) {
      numberOfCopies++

      let i = 1
      while (i <= card) {
        copies[index + i]++
        i++
      }
    }
  }

  return getSumOfDigits(copies)
}

const input = Bun.file('./2023/4/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

const p1 = part1(parsedInput)
const p2 = part2(parsedInput)

console.log({ p1, p2 })
