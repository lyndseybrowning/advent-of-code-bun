export interface WordSearch {
  grid: string[]
  word: string
}

export const wordSearch = ({ grid, word }: WordSearch) => {
  return function isMatchingWord(
    position: number[],
    direction: number[],
    letterIndex: number = 1
  ): boolean {
    if (letterIndex === word.length) {
      return true
    }

    const [row, col] = position
    const [rowDirection, colDirection] = direction

    const nextRow: number = rowDirection < 0 ? row - 1 : rowDirection + row
    const nextCol: number = colDirection < 0 ? col - 1 : colDirection + col

    const canKeepMoving =
      nextRow >= 0 &&
      nextRow < grid.length &&
      nextCol >= 0 &&
      nextCol < grid[0].length

    if (!canKeepMoving) {
      return false
    }

    const nextLetter = grid[nextRow][nextCol]

    if (nextLetter === word[letterIndex]) {
      return isMatchingWord([nextRow, nextCol], direction, letterIndex + 1)
    }

    return false
  }
}
