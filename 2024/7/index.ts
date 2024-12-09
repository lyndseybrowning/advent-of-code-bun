import { getSumOfDigits } from '../../utils/getSumOfDigits'

export type EquationCollection = number[][]

type Operator = '*' | '+' | '||'

const operate = (
  firstValue: number,
  secondValue: number,
  operators: Operator[]
) => {
  const values: number[] = []

  operators.forEach((operator) => {
    switch (operator) {
      case '+':
        values.push(firstValue + secondValue)
        break
      case '*':
        values.push(firstValue * secondValue)
        break
      case '||':
        values.push(Number(`${firstValue}${secondValue}`))
        break
    }
  })

  return values
}

const computeTrueValue = (
  values: number[],
  trueValue: number,
  computedValues: number[],
  operators: Operator[]
): boolean => {
  if (values.length === 0) {
    return computedValues.includes(trueValue)
  }

  if (computedValues.length === 0) {
    const [firstValue, secondValue] = values

    return computeTrueValue(
      values.slice(2),
      trueValue,
      operate(firstValue, secondValue, operators),
      operators
    )
  }

  const nextComputedValues: number[] = computedValues.reduce(
    (nextValues: number[], computedValue: number) => {
      nextValues.push(...operate(computedValue, values[0], operators))
      return nextValues
    },
    []
  )

  return computeTrueValue(
    values.slice(1),
    trueValue,
    nextComputedValues,
    operators
  )
}

const getCalibratedResult = (
  equations: EquationCollection,
  operators: Operator[]
) => {
  const trueValues = equations.filter((equation) => {
    const [trueValue, ...numbers] = equation
    const isTrueValue = computeTrueValue(numbers, trueValue, [], operators)

    return isTrueValue
  })

  return getSumOfDigits(trueValues.map(([val]) => val))
}

export const getParsedInput = (input: string[]): EquationCollection => {
  return input.map((equation: string) => {
    const [testValue, numbers] = equation.split(':')
    const remainingNumbers = numbers.split(' ').map(Number).slice(1)

    return [Number(testValue), ...remainingNumbers]
  }, [])
}

export const part1 = (equations: EquationCollection): number => {
  return getCalibratedResult(equations, ['*', '+'])
}

export const part2 = (equations: EquationCollection): number => {
  return getCalibratedResult(equations, ['*', '+', '||'])
}

const input = Bun.file('./2024/7/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

console.time('part1')
const p1 = part1(parsedInput)
console.timeEnd('part1')

console.time('part2')
const p2 = part2(parsedInput)
console.timeEnd('part2')

console.log({ p1, p2 })
