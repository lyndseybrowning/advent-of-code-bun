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

    let currentLetter

    try {
      currentLetter = grid[row][col]

      if (currentLetter !== word[letterIndex - 1]) {
        return false
      }

      const [rowDirection, colDirection] = direction

      const nextRow: number = rowDirection < 0 ? row - 1 : rowDirection + row
      const nextCol: number = colDirection < 0 ? col - 1 : colDirection + col

      const nextLetter = grid[nextRow][nextCol]

      if (nextLetter === word[letterIndex]) {
        return isMatchingWord([nextRow, nextCol], direction, letterIndex + 1)
      }
    } catch {
      return false
    }

    return false
  }
}
