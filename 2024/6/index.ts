import { adjacents as directions } from '../../utils/adjacents'

type Direction = 'north' | 'south' | 'east' | 'west'
type VisitedPosition = Map<string, Direction>

type Movement = {
  fromPosition: [number, number]
  direction: Direction
  map: string[]
  visitedPositions: VisitedPosition
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

  /**
   * A loop is detected if going in the same direction from the same position for a second time
   */
  if (
    visitedPositions.get(`${nextRowPosition}.${nextColPosition}`) === direction
  ) {
    throw new Error('caught in a loop!')
  }

  const nextPosition = map[nextRowPosition][nextColPosition]

  if (nextPosition !== '#') {
    visitedPositions.set(`${nextRowPosition}.${nextColPosition}`, direction)

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

const getVisitedPositions = (map: string[]): VisitedPosition => {
  const visitedPositions = new Map()

  map.forEach((row, rowIndex) => {
    Array.from(row).forEach((position, colIndex) => {
      if (position === '^') {
        visitedPositions.set(`${rowIndex}.${colIndex}`, 'north')

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
  const positions = Array.from(visitedPositions.keys()).slice(1)

  positions.forEach((position: any) => {
    const [newRow, newCol] = position.split('.').map(Number)

    const mapWithBoundary = input.map((row, rowIndex) => {
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

    mapWithBoundary.forEach((row, rowIndex) => {
      Array.from(row).forEach((position, colIndex) => {
        if (position === '^') {
          try {
            move({
              map: mapWithBoundary,
              fromPosition: [rowIndex, colIndex],
              direction: 'north',
              visitedPositions: new Map(),
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
