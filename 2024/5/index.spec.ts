import { expect, test, describe } from 'bun:test'

import { type PrintManual, getParsedInput, part1, part2 } from '.'

describe('day5', () => {
  const parsedInput: PrintManual = {
    orderingRules: {
      47: [53, 13, 61, 29],
      97: [13, 61, 47, 29, 53, 75],
      75: [29, 53, 47, 61, 13],
      61: [13, 53, 29],
      29: [13],
      53: [29, 13],
    },
    pageNumbers: [
      [75, 47, 61, 53, 29],
      [97, 61, 53, 29, 13],
      [75, 29, 13],
      [75, 97, 47, 61, 53],
      [61, 13, 29],
      [97, 13, 75, 29, 47],
    ],
  }

  test('parsed input', () => {
    expect(
      getParsedInput([
        '47|53',
        '97|13',
        '97|61',
        '97|47',
        '75|29',
        '61|13',
        '75|53',
        '29|13',
        '97|29',
        '53|29',
        '61|53',
        '97|53',
        '61|29',
        '47|13',
        '75|47',
        '97|75',
        '47|61',
        '75|61',
        '47|29',
        '75|13',
        '53|13',
        '',
        '75,47,61,53,29',
        '97,61,53,29,13',
        '75,29,13',
        '75,97,47,61,53',
        '61,13,29',
        '97,13,75,29,47',
      ])
    ).toEqual(parsedInput)
  })

  test('part 1', () => {
    expect(part1(parsedInput)).toEqual(143)
  })

  test('part 2', () => {
    expect(part2(parsedInput)).toEqual(123)
  })
})
