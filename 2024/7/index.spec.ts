import { expect, test, describe } from 'bun:test'

import { EquationCollection, getParsedInput, part1, part2 } from '.'

describe('day7', () => {
  const parsedInput: EquationCollection = {
    190: [10, 19],
    3267: [81, 40, 27],
    83: [17, 5],
    156: [15, 6],
    7290: [6, 8, 6, 15],
    161011: [16, 10, 13],
    192: [17, 8, 14],
    21037: [9, 7, 18, 13],
    292: [11, 6, 16, 20],
  }

  test('parsed input', () => {
    expect(
      getParsedInput([
        '190: 10 19',
        '3267: 81 40 27',
        '83: 17 5',
        '156: 15 6',
        '7290: 6 8 6 15',
        '161011: 16 10 13',
        '192: 17 8 14',
        '21037: 9 7 18 13',
        '292: 11 6 16 20',
      ])
    ).toEqual(parsedInput)
  })

  test('part 1', () => {
    expect(part1({ 190: [10, 19] })).toEqual(190)
    expect(part1({ 3267: [81, 40, 27] })).toEqual(3267)
    expect(part1({ 5519591: [5, 519, 5078, 3] })).toEqual(0)
    expect(part1({ 2: [3, 1, 2] })).toEqual(0)
    expect(part1(parsedInput)).toEqual(3749)
  })

  test('part 2', () => {})
})
