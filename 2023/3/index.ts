import { Adjacent, getAdjacentValues } from '../../utils/adjacents'
import { getSumOfDigits } from '../../utils/getSumOfDigits'

type PartNumber = {
  number: number
  coordinate: string
}

/* A part number is a number that is adjacent to any of the provided symbols
 * this takes the given schematic input and produces a list of valid part numbers
 * and the coordinate of the matched symbol
 */
export const getPartNumbers = (
  schematic: string[],
  validSymbols = '/@$*-+=%&#'
): PartNumber[] => {
  const partNumbers: PartNumber[] = []

  for (const [row, line] of schematic.entries()) {
    const matches = line.matchAll(/\d{1,3}/g)

    for (const match of matches) {
      const start = match.index ?? 0
      const end = start + match[0].length
      const range = [...Array(end - start).keys()].map((i) => i + start)

      const adjacents = range.flatMap<Adjacent<string>>((column: number) => {
        return getAdjacentValues<string>(row, column, schematic)
      })

      const partNumber = adjacents.find(({ value }) =>
        validSymbols.includes(value)
      )

      if (partNumber) {
        partNumbers.push({
          number: Number(match),
          coordinate: partNumber.coordinate,
        })
      }
    }
  }

  return partNumbers
}

export const part1 = (input: string[]): number => {
  const partNumbers = getPartNumbers(input).map((p) => p.number)

  return getSumOfDigits(partNumbers)
}

export const part2 = (input: string[]): number => {
  // only find part numbers that are adjacent to '*'
  const partNumbers = getPartNumbers(input, '*')
  const gears = []

  while (partNumbers.length > 0) {
    const [{ number, coordinate }] = partNumbers

    /*
     * A gear exists when two numbers are adjacent to a * symbol
     * If another part number exists with this partNumber's coordinate
     * then it must be a gear
     */
    const gear = partNumbers
      .slice(1)
      .find((number) => number.coordinate === coordinate)

    if (gear) {
      gears.push(number * gear.number)
    }

    partNumbers.splice(0, 1)
  }

  return getSumOfDigits(gears)
}

const input = Bun.file('./2023/3/input.txt')

const textInput = await input.text()
const parsedInput = textInput.split('\n')

const p1 = part1(parsedInput)
const p2 = part2(parsedInput)

console.log({ p1, p2 })
