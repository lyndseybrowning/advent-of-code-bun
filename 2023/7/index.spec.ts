import { expect, test, describe } from 'bun:test'

import {
  Hand,
  getRankedHands,
  getHandScore,
  getParsedInput,
  part1,
  part2,
} from '.'

describe('day 7', () => {
  const input = ['32T3K 765', 'T55J5 684', 'KK677 28', 'KTJJT 220', 'QQQJA 483']

  test('parsed input', () => {
    const hands: Hand[] = [
      { hand: '32T3K', bid: 765 },
      { hand: 'T55J5', bid: 684 },
      { hand: 'KK677', bid: 28 },
      { hand: 'KTJJT', bid: 220 },
      { hand: 'QQQJA', bid: 483 },
    ]

    expect(getParsedInput(input)).toStrictEqual(hands)
  })

  test('get hand score', () => {
    expect(getHandScore('KKKKK')).toBe('five of a kind')
    expect(getHandScore('QQQQJ')).toBe('four of a kind')
    expect(getHandScore('T55T5')).toBe('full house')
    expect(getHandScore('T55J5')).toBe('three of a kind')
    expect(getHandScore('KTJJT')).toBe('two pair')
    expect(getHandScore('32T3K')).toBe('one pair')
    expect(getHandScore('QT5JA')).toBe('high card')
  })

  test('get hand score when a joker is present', () => {
    expect(getHandScore('T55J5', true)).toEqual('four of a kind')
    expect(getHandScore('TJ5J5', true)).toEqual('four of a kind')
    expect(getHandScore('QJJJJ', true)).toEqual('five of a kind')
    expect(getHandScore('T5TJ1', true)).toEqual('three of a kind')
  })

  test('rank different hands', () => {
    expect(
      getRankedHands([
        { hand: 'AT777', bid: 727 },
        { hand: '32T3K', bid: 765 },
      ])
    ).toStrictEqual([
      { hand: '32T3K', bid: 765 },
      { hand: 'AT777', bid: 727 },
    ])
  })

  test('ranked hands when both have the same score', () => {
    // hand 1 is stronger because its second card is stronger
    expect(
      getRankedHands([
        { hand: 'KK677', bid: 28 },
        { hand: 'KTJJT', bid: 220 },
      ])
    ).toStrictEqual([
      { hand: 'KTJJT', bid: 220 },
      { hand: 'KK677', bid: 28 },
    ])
  })

  test('rank input hands', () => {
    expect(getRankedHands(getParsedInput(input))).toStrictEqual([
      { hand: '32T3K', bid: 765 },
      { hand: 'KTJJT', bid: 220 },
      { hand: 'KK677', bid: 28 },
      { hand: 'T55J5', bid: 684 },
      { hand: 'QQQJA', bid: 483 },
    ])
  })

  test('part 1', () => {
    expect(part1(getParsedInput(input))).toEqual(6440)
  })

  test('part 2', () => {
    expect(part2(getParsedInput(input))).toEqual(5905)
  })
})
