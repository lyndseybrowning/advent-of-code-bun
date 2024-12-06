import { expect, test, describe } from 'bun:test'

import { getParsedInput, part1, part1WithSort, part2 } from '.'

describe('day1', () => {
  const parsedInput = {
    left: [3, 4, 2, 1, 3, 3],
    right: [4, 3, 5, 3, 9, 3],
  }

  test('parsed input', () => {
    const input = ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3']

    expect(getParsedInput(input)).toEqual(parsedInput)
  })

  test('parsed input with larger numbers', () => {
    expect(getParsedInput(['23664   14847'])).toEqual({
      left: [23664],
      right: [14847],
    })
  })

  test('part 1', () => {
    expect(part1(parsedInput)).toEqual(11)
  })

  test('part 1 with sorting', () => {
    expect(part1WithSort(parsedInput)).toEqual(11)
  })

  test('part 2', () => {
    expect(part2(parsedInput)).toEqual(31)
  })
})
