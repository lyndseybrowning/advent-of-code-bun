import { expect, test, describe } from 'bun:test'

import { part1, part2 } from '.'

describe('day6', () => {
  const parsedInput = [
    '....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...',
  ]

  test('part 1', () => {
    expect(part1(parsedInput)).toEqual(41)
  })

  test('part 2', () => {
    expect(part2(parsedInput)).toEqual(6)
  })
})
