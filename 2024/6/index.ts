import { adjacents as directions } from '../../utils/adjacents'

type Movement = {
  fromPosition: [number, number]
  direction: 'north' | 'south' | 'east' | 'west'
  map: string[]
  visitedPositions?: Set<string>
}

const getNextDirection = (
  direction: Movement['direction']
): Movement['direction'] => {
  switch (direction) {
    case 'north':
      return 'east'
    case 'east':
      return 'south'
    case 'south':
      return 'west'
    case 'west':
      return 'north'
  }
}

const move = ({ map, fromPosition, direction, visitedPositions }: Movement) => {
  const [row, col] = fromPosition
  const [nextRow, nextCol] = directions[direction]

  const nextRowPosition = nextRow < 0 ? row - 1 : row + nextRow
  const nextColPosition = nextCol < 0 ? col - 1 : col + nextCol

  const isOutOfBounds =
    nextRowPosition < 0 ||
    nextRowPosition >= map.length ||
    nextColPosition < 0 ||
    nextColPosition >= map[0].length

  if (isOutOfBounds) {
    return
  }

  const nextPosition = map[nextRowPosition][nextColPosition]

  if (nextPosition !== '#') {
    visitedPositions?.add(`${nextRowPosition}.${nextColPosition}`)

    move({
      map,
      fromPosition: [nextRowPosition, nextColPosition],
      direction,
      visitedPositions,
    })
  } else if (nextPosition === '#') {
    move({
      map,
      fromPosition,
      direction: getNextDirection(direction),
      visitedPositions,
    })
  }
}

const getVisitedPositions = (map: string[]): Set<string> => {
  const visitedPositions = new Set<string>()

  map.forEach((row, rowIndex) => {
    Array.from(row).forEach((position, colIndex) => {
      if (position === '^') {
        visitedPositions.add(`${rowIndex}.${colIndex}`)
        move({
          map,
          fromPosition: [rowIndex, colIndex],
          direction: 'north',
          visitedPositions,
        })
      }
    })
  })

  return visitedPositions
}

export const part1 = (map: string[]): number => {
  const visitedPositions = getVisitedPositions(map)

  return visitedPositions.size
}

export const part2 = (input: string[]) => {
  const visitedPositions = getVisitedPositions(input)

  let numberOfLoops = 0

  /**
   * Don't include the start position
   */
  const positions = Array.from(visitedPositions).slice(1)

  positions.forEach((position: any) => {
    const [newRow, newCol] = position.split('.').map(Number)

    const adjustedMap = input.map((row, rowIndex) => {
      return Array.from(row)
        .map((col, colIndex) => {
          if (col === '^') {
            return col
          }

          if (rowIndex === newRow && colIndex === newCol) {
            return '#'
          }
          return col
        })
        .join('')
    })

    adjustedMap.forEach((row, rowIndex) => {
      Array.from(row).forEach((position, colIndex) => {
        if (position === '^') {
          /**
           * This is lazy and needs to be refactored!
           */
          try {
            move({
              map: adjustedMap,
              fromPosition: [rowIndex, colIndex],
              direction: 'north',
            })
          } catch {
            numberOfLoops += 1
          }
        }
      })
    })
  })

  return numberOfLoops
}

const input = Bun.file('./2024/6/input.txt')

const textInput = await input.text()
const parsedInput = textInput.split('\n')

console.time('part1')
const p1 = part1(parsedInput)
console.timeEnd('part1')

console.time('part2')
const p2 = part2(parsedInput)
console.timeEnd('part2')

console.log({ p1, p2 })
