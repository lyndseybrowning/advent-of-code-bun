import { expect, test, describe } from 'bun:test'

import { getSumOfDigits } from './getSumOfDigits'

test('it returns a sum of many digits', () => {
  expect(getSumOfDigits([1, 2, 3])).toEqual(6)
  expect(getSumOfDigits([])).toEqual(0)
  expect(getSumOfDigits([10, 20, 66, 77])).toEqual(77 + 66 + 20 + 10)
})
