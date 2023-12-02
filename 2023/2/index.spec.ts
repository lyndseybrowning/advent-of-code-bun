import { expect, test, describe } from 'bun:test'

import { Game, getParsedInput, part1, part2 } from '.'

const testInput = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
]

describe('day2', () => {
  test('parsed input', () => {
    expect(getParsedInput([testInput[0]])).toStrictEqual([
      [
        { red: 4, green: 0, blue: 3 },
        { red: 1, green: 2, blue: 6 },
        { red: 0, green: 2, blue: 0 },
      ],
    ])
  })

  test('part 1', () => {
    expect(part1(getParsedInput(testInput))).toBe(8)
  })

  test('part 2', () => {
    expect(part2(getParsedInput(testInput))).toBe(2286)
  })
})
