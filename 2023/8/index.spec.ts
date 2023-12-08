import { expect, test, describe } from 'bun:test'

import { NodeMap, getParsedInput, part1, part2 } from '.'

describe('day 8', () => {
  const input = [
    'RL',
    '',
    'AAA = (BBB, CCC)',
    'BBB = (DDD, EEE)',
    'CCC = (ZZZ, GGG)',
    'DDD = (DDD, DDD)',
    'EEE = (EEE, EEE)',
    'GGG = (GGG, GGG)',
    'ZZZ = (ZZZ, ZZZ)',
  ]

  test('getParsedInput', () => {
    const nodeMap: NodeMap = {
      steps: [1, 0],
      nodes: {
        AAA: ['BBB', 'CCC'],
        BBB: ['DDD', 'EEE'],
        CCC: ['ZZZ', 'GGG'],
        DDD: ['DDD'],
        EEE: ['EEE'],
        GGG: ['GGG'],
        ZZZ: ['ZZZ'],
      },
    }

    expect(getParsedInput(input)).toStrictEqual(nodeMap)
  })

  test('part 1', () => {
    expect(part1(getParsedInput(input))).toBe(2)
  })

  test('part 1 with repeated steps', () => {
    const input = [
      'LLR',
      '',
      'AAA = (BBB, BBB)',
      'BBB = (AAA, ZZZ)',
      'ZZZ = (ZZZ, ZZZ)',
    ]

    expect(part1(getParsedInput(input))).toEqual(6)
  })

  test('part 2', () => {
    const input = [
      'LR',
      '',
      '11A = (11B, XXX)',
      '11B = (XXX, 11Z)',
      '11Z = (11B, XXX)',
      '22A = (22B, XXX)',
      '22B = (22C, 22C)',
      '22C = (22Z, 22Z)',
      '22Z = (22B, 22B)',
      'XXX = (XXX, XXX)',
    ]

    expect(part2(getParsedInput(input))).toEqual(6)
  })
})
