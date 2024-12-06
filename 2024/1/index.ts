interface ParsedInput {
  left: number[]
  right: number[]
}

export const getParsedInput = (input: string[]): ParsedInput => {
  const parsedInput: ParsedInput = { left: [], right: [] }

  input.forEach((locationIds) => {
    const [left, right] = locationIds.split('  ').map(Number)

    parsedInput.left.push(left)
    parsedInput.right.push(right)
  })

  return parsedInput
}

export const part1 = (input: ParsedInput): number => {
  const left = [...input.left]
  const right = [...input.right]

  let distance = 0
  let counter = left.length

  while (counter > 0) {
    const smallestLeft = Math.min(...left)
    const smallestRight = Math.min(...right)
    const difference = Math.abs(smallestLeft - smallestRight)

    left.splice(left.indexOf(smallestLeft), 1)
    right.splice(right.indexOf(smallestRight), 1)

    distance += difference
    counter -= 1
  }

  return distance
}

export const part1WithSort = (input: ParsedInput) => {
  const predicate = (a: number, b: number) => a - b
  const sortedLeft = [...input.left].sort(predicate)
  const sortedRight = [...input.right].sort(predicate)

  return sortedLeft.reduce((distance, locationId, index) => {
    const difference = Math.abs(locationId - sortedRight[index])
    return (distance += difference)
  }, 0)
}

export const part2 = (input: ParsedInput): number => {
  const { left, right } = input

  return left.reduce((similarityScore, locationId) => {
    const occurrences = right.filter((id) => id === locationId).length

    return (similarityScore += locationId * occurrences)
  }, 0)
}

const input = Bun.file('./2024/1/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

console.time('part1')
const p1 = part1(parsedInput)
console.timeEnd('part1')

console.time('part1WithSort')
const p1Sort = part1WithSort(parsedInput)
console.timeEnd('part1WithSort')

const p2 = part2(parsedInput)

console.log({ p1, p1Sort, p2 })
