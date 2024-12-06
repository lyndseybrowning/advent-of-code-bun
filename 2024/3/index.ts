import { getSumOfDigits } from '../../utils/getSumOfDigits'

const multiplyInstruction = (multiplier: string): number => {
  const [first, second] = multiplier
    .split(',')
    .map((text) => Number(text.replace(/[^0-9]{1,3}/g, '')))

  return first * second
}

export const part1 = (corruptedMemory: string): number => {
  /**
   * A real multiply instruction is one that is formatted as such:
   * mul(number,number) where a valid number can be between 1-3 digits
   */
  const realInstructions = corruptedMemory.match(
    /mul\([0-9]{1,3},[0-9]{1,3}\)/gm
  )

  if (!realInstructions) {
    return 0
  }

  const multipliedInstructions = realInstructions.map(multiplyInstruction)

  return getSumOfDigits(multipliedInstructions)
}

export const part2 = (corruptedMemory: string) => {
  /**
   * Find real multiply instructions in the format mul(number,number)
   * And conditional do() and don't() statements that tell the program whether to continue operating
   */
  const instructions = corruptedMemory.match(
    /(mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\))|don't\(\)/gm
  )

  if (!instructions) {
    return 0
  }

  let shouldOperate = true
  let sumOfMultipliers = 0

  for (const instruction of instructions) {
    if (instruction === "don't()") {
      shouldOperate = false
    } else if (instruction === 'do()') {
      shouldOperate = true
    } else if (shouldOperate) {
      sumOfMultipliers += multiplyInstruction(instruction)
    }
  }

  return sumOfMultipliers
}

const input = Bun.file('./2024/3/input.txt')

const textInput = await input.text()

const p1 = part1(textInput)
const p2 = part2(textInput)

console.log({ p1, p2 })
