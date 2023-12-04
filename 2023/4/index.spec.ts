import { expect, test, describe } from 'bun:test'

import {
  getCardScore,
  getNumberOfWinners,
  getParsedInput,
  part1,
  part2,
} from '.'

describe('day 4', () => {
  const input = [
    'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
    'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
    'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
    'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
    'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
    'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
  ]

  test('parsed input', () => {
    const testInput = [
      'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
      'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
    ]

    expect(getParsedInput(testInput)).toStrictEqual([
      {
        winningNumbers: [41, 48, 83, 86, 17],
        scratchedNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
      },
      {
        winningNumbers: [13, 32, 20, 16, 61],
        scratchedNumbers: [61, 30, 68, 82, 17, 32, 24, 19],
      },
    ])
  })

  test('get card score', () => {
    expect(
      getCardScore({
        winningNumbers: [41, 48, 83, 86, 17],
        scratchedNumbers: [83, 86, 6, 31, 17, 9, 48, 53],
      })
    ).toBe(8)

    expect(
      getCardScore({
        winningNumbers: [41, 48, 83, 86, 17],
        scratchedNumbers: [83, 86, 6, 31, 17, 41, 48, 53],
      })
    ).toBe(16)
  })

  test('get number of winners', () => {
    expect(getNumberOfWinners([43, 45], [45, 43])).toBe(2)
    expect(getNumberOfWinners([89, 23], [45, 43])).toBe(0)
  })

  test('part 1', () => {
    expect(part1(getParsedInput(input))).toEqual(13)
  })

  test('part 2', () => {
    expect(part2(getParsedInput(input))).toEqual(30)
  })
})
