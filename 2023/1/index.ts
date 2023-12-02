import { getSumOfDigits } from '../../utils/getSumOfDigits'

const input = Bun.file('./2023/1/input.txt')

export const part1 = (input: string[]): number => {
  const calibrated = input.map((text) => text.replace(/[a-z]/g, ''))
  const digits = calibrated
    .map(([first, ...rest]) => {
      return [first, rest.at(-1) ?? first].join('')
    })
    .map(Number)

  return getSumOfDigits(digits)
}

export type Digits = Record<string, number>

export const part2 = (input: string[]) => {
  const validDigits: Digits = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }
  const matchNumber = (text: string) =>
    text.match(/(one|two|three|four|five|six|seven|eight|nine)/)?.at(0)

  const calibrated = input
    .map((line: string) => {
      const digits: number[] = []
      const reversedLine = line.split('').reverse()

      let prefix = ''
      let suffix = ''

      for (const char of line) {
        if (/[1-9]/.test(char)) {
          digits.push(Number(char))
          break
        }

        prefix += char

        const isValidPrefix = Object.keys(validDigits).some((key) =>
          prefix.includes(key)
        )

        if (isValidPrefix) {
          const digit = matchNumber(prefix)

          digits.push(validDigits[digit as keyof Digits])
          break
        }
      }

      for (const char of reversedLine) {
        if (/[1-9]/.test(char)) {
          digits.push(Number(char))
          break
        }

        suffix += char

        const reverseSuffix = suffix.split('').reverse().join('')
        const isValidReverseSuffix = Object.keys(validDigits).some((key) =>
          reverseSuffix.includes(key)
        )

        if (isValidReverseSuffix) {
          const digit = matchNumber(reverseSuffix)

          digits.push(validDigits[digit as keyof Digits])
          break
        }
      }

      return digits.join('')
    })
    .map(Number)

  return getSumOfDigits(calibrated)
}

const textInput = await input.text()
const parsedInput = textInput.split('\n')

const p1 = part1(parsedInput)
const p2 = part2(parsedInput)

console.log({ p1, p2 })
