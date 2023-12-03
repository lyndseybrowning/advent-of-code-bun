import { expect, test, describe } from 'bun:test'
import { getAdjacentValues } from './adjacents'

describe('getAdjacentValues', () => {
  test('it returns a valid list of adjacent values when given a list of strings', () => {
    const sourceInput = ['abc123', 'bd456k', '456kad']

    expect(getAdjacentValues<string>(0, 0, sourceInput)).toEqual([
      {
        value: 'b',
        coordinate: '0.1',
      },
      {
        value: 'd',
        coordinate: '1.1',
      },
      {
        value: 'b',
        coordinate: '1.0',
      },
    ])

    expect(getAdjacentValues<string>(2, 5, sourceInput)).toEqual([
      {
        value: '6',
        coordinate: '1.4',
      },
      {
        value: 'k',
        coordinate: '1.5',
      },
      {
        value: 'a',
        coordinate: '2.4',
      },
    ])

    expect(getAdjacentValues<string>(1, 2, sourceInput)).toEqual([
      {
        value: 'b',
        coordinate: '0.1',
      },
      {
        value: 'c',
        coordinate: '0.2',
      },
      {
        value: '1',
        coordinate: '0.3',
      },
      {
        value: '5',
        coordinate: '1.3',
      },
      {
        value: 'k',
        coordinate: '2.3',
      },
      {
        value: '6',
        coordinate: '2.2',
      },
      {
        value: '5',
        coordinate: '2.1',
      },
      {
        value: 'd',
        coordinate: '1.1',
      },
    ])
  })

  test('it returns a valid list of adjacent values when given a list of numbers', () => {
    const sourceInput = [
      [1, 2, 3, 4, 5, 6],
      [3, 4, 5, 6, 7, 8],
      [7, 8, 9, 1, 2, 3],
    ]

    expect(getAdjacentValues<number[]>(0, 0, sourceInput)).toEqual([
      { value: 2, coordinate: '0.1' },
      { value: 4, coordinate: '1.1' },
      { value: 3, coordinate: '1.0' },
    ])
  })
})
