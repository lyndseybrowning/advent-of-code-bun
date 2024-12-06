import { expect, test, describe } from 'bun:test'

import { part1, part2 } from '.'

describe('day4', () => {
  test('part 1', () => {
    expect(
      part1({
        grid: ['MMMSXXMASM'],
        word: 'XMAS',
      })
    ).toEqual(1)

    expect(
      part1({
        grid: ['X', 'M', 'A', 'S'],
        word: 'XMAS',
      })
    ).toEqual(1)

    expect(
      part1({
        grid: [
          'MMMSXXMASM',
          'MSAMXMSMSA',
          'AMXSXMAAMM',
          'MSAMASMSMX',
          'XMASAMXAMM',
          'XXAMMXXAMA',
          'SMSMSASXSS',
          'SAXAMASAAA',
          'MAMMMXMMMM',
          'MXMXAXMASX',
        ],
        word: 'XMAS',
      })
    ).toEqual(18)
  })

  test('part 2', () => {
    expect(
      part2({
        grid: [
          '.M.S......',
          '..A..MSMS.',
          '.M.S.MAA..',
          '..A.ASMSM.',
          '.M.S.M....',
          '..........',
          'S.S.S.S.S.',
          '.A.A.A.A..',
          'M.M.M.M.M.',
          '..........',
        ],
        word: 'MAS',
      })
    ).toEqual(9)
  })

  test('part 2 no matches', () => {
    expect(
      part2({
        grid: ['..M', '.A.', 'S.S'],
        word: 'MAS',
      })
    ).toEqual(0)
  })
})
