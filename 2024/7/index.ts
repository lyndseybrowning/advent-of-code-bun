import { getSumOfDigits } from '../../utils/getSumOfDigits'

export type EquationCollection = Record<number, number[]>

type Operator = '*' | '+'

const operate = (firstValue: number, secondValue: number): number[] => {
  const operators: Operator[] = ['*', '+']
  const values: number[] = []

  operators.forEach((operator) => {
    switch (operator) {
      case '+':
        values.push(firstValue + secondValue)
        break
      case '*':
        values.push(firstValue * secondValue)
    }
  })

  return values
}

const computeTrueValue = (
  values: number[],
  trueValue: number,
  computedValues: number[] = []
): boolean => {
  const isTrueValue = computedValues.includes(trueValue)

  if (isTrueValue) {
    return true
  }

  if (values.length === 0) {
    return isTrueValue
  }

  if (computedValues.length === 0) {
    const [firstValue, secondValue] = values

    return computeTrueValue(
      values.slice(2),
      trueValue,
      operate(firstValue, secondValue)
    )
  }

  const nextComputedValues: number[] = computedValues.reduce(
    (nextValues: number[], computedValue: number) => {
      nextValues.push(...operate(computedValue, values[0]))
      return nextValues
    },
    []
  )

  return computeTrueValue(values.slice(1), trueValue, nextComputedValues)
}

export const getParsedInput = (input: string[]): EquationCollection => {
  return input.reduce((equations: EquationCollection, equation: string) => {
    const [testValue, numbers] = equation.split(':')
    const remainingNumbers = numbers.split(' ').map(Number).slice(1)

    equations[Number(testValue)] = remainingNumbers

    return equations
  }, {})
}

export const part1 = (equations: EquationCollection): number => {
  const trueValues: number[] = []

  for (const equation in equations) {
    const value = Number(equation)
    const isTrueValue = computeTrueValue(equations[equation], value)

    if (isTrueValue) {
      trueValues.push(value)
    }
  }

  const totalCalibrationResult = getSumOfDigits(trueValues)

  return totalCalibrationResult
}

export const part2 = () => {}

const input = Bun.file('./2024/7/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

console.time('part1')
const p1 = part1(parsedInput)
console.timeEnd('part1')

const p2 = part2()

console.log({ p1, p2 })
