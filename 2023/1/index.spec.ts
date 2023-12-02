import { expect, test, describe } from 'bun:test'

import { part1, part2 } from '.'

describe('day1', () => {
  test('part 1', () => {
    const input = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']

    expect(part1(input)).toBe(142)
  })

  test('part 2', () => {
    const input = [
      'two1nine',
      'eightwothree',
      'abcone2threexyz',
      'xtwone3four',
      '4nineeightseven2',
      'zoneight234',
      '7pqrstsixteen',
    ]

    expect(part2(input)).toBe(281)
  })

  test('part 2 overlapping numbers', () => {
    const input = ['eighthree']

    expect(part2(input)).toBe(83)
  })

  test('part 2 single number', () => {
    const input = ['seven']

    expect(part2(input)).toBe(77)
  })

  test('part 2 number suffix', () => {
    const input = ['seven7']

    expect(part2(input)).toBe(77)
  })

  test('part 2 text number before digit', () => {
    const input = ['zclzlgcmkneightzskgbg62five']

    expect(part2(input)).toBe(85)
  })
})
