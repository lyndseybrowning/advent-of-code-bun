import { expect, test, describe } from 'bun:test'

import { part1, part2 } from '.'

describe('day3', () => {
  test('part 1', () => {
    expect(
      part1(
        'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5)'
      )
    ).toEqual(161)
  })

  test('part 2', () => {
    expect(
      part2(
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
      )
    ).toEqual(48)
  })
})
