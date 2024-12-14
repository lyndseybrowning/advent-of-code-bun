import { expect, test, describe } from 'bun:test'

import { getFileBlocks, moveFileBlocks, part1, part2 } from '.'

describe('day9', () => {
  const diskMap = [2, 3, 3, 3, 1, 3, 3, 1, 2, 1, 4, 1, 4, 1, 3, 1, 4, 0, 2]

  const fileBlocks = [
    0, 0, -1, -1, -1, 1, 1, 1, -1, -1, -1, 2, -1, -1, -1, 3, 3, 3, -1, 4, 4, -1,
    5, 5, 5, 5, -1, 6, 6, 6, 6, -1, 7, 7, 7, -1, 8, 8, 8, 8, 9, 9,
  ]

  const movedFileBlocks = [
    0, 0, 9, 9, 8, 1, 1, 1, 8, 8, 8, 2, 7, 7, 7, 3, 3, 3, 6, 4, 4, 6, 5, 5, 5,
    5, 6, 6,
  ]

  test('getFileBlocks', () => {
    expect(getFileBlocks(diskMap)).toEqual(fileBlocks)
  })

  test('getMovedFileBlocks', () => {
    expect(moveFileBlocks(fileBlocks)).toEqual(movedFileBlocks)
  })

  test('part 1', () => {
    expect(part1(diskMap)).toEqual(1928)
  })

  test('part 2', () => {})
})
