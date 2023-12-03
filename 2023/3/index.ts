import { Adjacent, getAdjacentValues } from '../../utils/adjacents'
import { getSumOfDigits } from '../../utils/getSumOfDigits'

type PartNumber = {
  number: number
  coordinate: string
}
/* a part number is a number that is adjacent to any symbol other than '.'
 * this takes the given schematic input and produces a list of valid part numbers
 * along with the co-ordinates of each matched symbol when specified
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

      const adjacentValues = range.reduce<Adjacent<string>[]>(
        (values: Adjacent<string>[], index: number) => {
          return [
            ...values,
            ...getAdjacentValues<string>(row, index, schematic),
          ]
        },
        []
      )

      const partNumber = adjacentValues.find((adjacent) =>
        validSymbols.includes(adjacent.value as string)
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

export const part2 = (input: string[]) => {
  const partNumbers = getPartNumbers(input)
  const gears = []

  while (partNumbers.length > 0) {
    const [{ number, coordinate }] = partNumbers
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
