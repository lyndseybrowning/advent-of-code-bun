import { expect, test, describe } from 'bun:test'

import { getPartNumbers, part1, part2 } from '.'

describe('day3', () => {
  const input = [
    '467..114..',
    '...*......',
    '..35..633.',
    '......#...',
    '617*......',
    '.....+.58.',
    '..592.....',
    '......755.',
    '...$.*....',
    '.664.598..',
  ]

  test('get part numbers', () => {
    expect(getPartNumbers(input)).toStrictEqual([
      {
        number: 467,
        coordinate: '1.3',
      },
      {
        number: 35,
        coordinate: '1.3',
      },
      {
        number: 633,
        coordinate: '3.6',
      },
      {
        number: 617,
        coordinate: '4.3',
      },
      {
        number: 592,
        coordinate: '5.5',
      },
      {
        number: 755,
        coordinate: '8.5',
      },
      {
        number: 664,
        coordinate: '8.3',
      },
      {
        number: 598,
        coordinate: '8.5',
      },
    ])
  })

  test('get part numbers when single digits are used', () => {
    const testInput = ['..5..', '..*..']

    expect(getPartNumbers(testInput)).toEqual([
      { number: 5, coordinate: '1.2' },
    ])
  })

  test('get part numbers with custom symbol matcher', () => {
    expect(getPartNumbers(input, '*')).toEqual([
      {
        number: 467,
        coordinate: '1.3',
      },
      {
        number: 35,
        coordinate: '1.3',
      },
      {
        number: 617,
        coordinate: '4.3',
      },
      {
        number: 755,
        coordinate: '8.5',
      },
      {
        number: 598,
        coordinate: '8.5',
      },
    ])
  })

  test('part 1', () => {
    expect(part1(input)).toBe(4361)
  })

  test('part 2', () => {
    expect(part2(input)).toBe(467835)
  })
})
