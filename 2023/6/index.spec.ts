import { expect, test, describe } from 'bun:test'

import {
  Race,
  getParsedInput,
  getRaceOptions,
  getWaysToWin,
  part1,
  part2,
} from '.'

describe('day{day}', () => {
  const input = ['Time:      7  15   30', 'Distance:  9  40  200']

  test('parsed input', () => {
    const races: Race[] = [
      { time: 7, record: 9 },
      { time: 15, record: 40 },
      { time: 30, record: 200 },
    ]

    expect(getParsedInput(input)).toStrictEqual(races)
  })

  test('get race options', () => {
    expect(getRaceOptions(7)).toEqual([6, 10, 12, 12, 10, 6])
  })

  test('get number of ways to beat record', () => {
    expect(getWaysToWin(getRaceOptions(7), 9)).toEqual(4)
  })

  test('part 1', () => {
    expect(part1(getParsedInput(input))).toEqual(4 * 8 * 9)
  })

  test('part 2', () => {
    expect(part2({ time: 71530, record: 940200 })).toEqual(71503)
  })
})
