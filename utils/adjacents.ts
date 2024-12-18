type AdjacentCollection = {
  northWest: number[]
  north: number[]
  northEast: number[]
  east: number[]
  southEast: number[]
  south: number[]
  southWest: number[]
  west: number[]
}

export const adjacents: AdjacentCollection = {
  northWest: [-1, -1],
  north: [-1, 0],
  northEast: [-1, 1],
  east: [0, 1],
  southEast: [1, 1],
  south: [1, 0],
  southWest: [1, -1],
  west: [0, -1],
} as const

export type Adjacent<T> = {
  value: T
  coordinate: string
}

/*
 * given a source array
 * get a list of adjacent values relative to the provided row and column indexes
 * returns the adjacent values and their coordinates in the source array
 */
export const getAdjacentValues = <T>(
  rowIndex: number,
  colIndex: number,
  source: Array<T>
): Array<Adjacent<T>> => {
  const rowLength = (source[0] as string).length
  const adjacentValues: Array<Adjacent<T>> = []

  for (const [row, col] of Object.values(adjacents)) {
    const adjacentRow: number = row < 0 ? rowIndex - 1 : rowIndex + row
    const adjacentCol: number = col < 0 ? colIndex - 1 : colIndex + col

    const isValidRow = adjacentRow >= 0 && adjacentRow < source.length
    const isValidCol = adjacentCol >= 0 && adjacentCol < rowLength

    if (!isValidRow || !isValidCol) {
      continue
    }

    // @ts-ignore
    const adjacent = source[adjacentRow][adjacentCol]

    adjacentValues.push({
      value: adjacent,
      coordinate: `${adjacentRow}.${adjacentCol}`,
    })
  }

  return adjacentValues
}
