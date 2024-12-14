import { expect, test, describe } from 'bun:test'

import { part1, part2 } from '.'

describe('day8', () => {
  const parsedInput = [
    '............',
    '........0...',
    '.....0......',
    '.......0....',
    '....0.......',
    '......A.....',
    '............',
    '............',
    '........A...',
    '.........A..',
    '............',
    '............',
  ]

  test('part 1', () => {
    expect(part1(parsedInput)).toEqual(14)
  })

  test('part 2', () => {})
})
