import { expect, test, describe } from 'bun:test'

import { getParsedInput, getSafetyReport, part1, part2 } from '.'

describe('day2', () => {
  const parsedInput = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ]

  test('parsed input', () => {
    expect(
      getParsedInput([
        '7 6 4 2 1',
        '1 2 7 8 9',
        '9 7 6 2 1',
        '1 3 2 4 5',
        '8 6 4 4 1',
        '1 3 6 7 9',
      ])
    ).toEqual(parsedInput)
  })

  test('part 1', () => {
    expect(part1(parsedInput)).toEqual(2)
  })

  test('getSafetyReport', () => {
    expect(getSafetyReport([7, 6, 4, 2, 1])).toEqual({
      report: [7, 6, 4, 2, 1],
      isSafe: true,
    })

    expect(getSafetyReport([1, 3, 2, 4, 5, 9])).toEqual({
      report: [1, 3, 2, 4, 5, 9],
      isSafe: false,
    })
  })

  test('part 2', () => {
    expect(part2(parsedInput)).toEqual(4)
    expect(part2([[1, 2, 7, 8, 9]])).toEqual(0)
    expect(part2([[1, 3, 2, 4, 5]])).toEqual(1)
  })
})
