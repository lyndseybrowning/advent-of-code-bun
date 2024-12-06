import { adjacents as directions } from '../../utils/adjacents'
import { type WordSearch, wordSearch } from './WordSearch'

export const part1 = ({ grid, word }: WordSearch): number => {
  const isMatchingWord = wordSearch({ grid, word })
  const [startingLetter] = word

  let numberOfInstances = 0

  grid.forEach((row, rowIndex) => {
    ;[...row].forEach((letter, colIndex) => {
      if (letter === startingLetter) {
        Object.values(directions).forEach((direction) => {
          if (isMatchingWord([rowIndex, colIndex], direction)) {
            numberOfInstances += 1
          }
        })
      }
    })
  })

  return numberOfInstances
}

export const part2 = ({ grid, word }: WordSearch): number => {
  const isMatchingWord = wordSearch({ grid, word })

  let numberOfXmases = 0

  grid.forEach((row, rowIndex) => {
    ;[...row].forEach((letter, colIndex) => {
      if (letter === 'A') {
        const southEast = [rowIndex - 1, colIndex - 1]
        const southWest = [rowIndex - 1, colIndex + 1]
        const northEast = [rowIndex + 1, colIndex - 1]
        const northWest = [rowIndex + 1, colIndex + 1]

        const isMatchSouthEast = isMatchingWord(southEast, directions.southEast)
        const isMatchSouthWest = isMatchingWord(southWest, directions.southWest)
        const isMatchNorthEast = isMatchingWord(northEast, directions.northEast)
        const isMatchNorthWest = isMatchingWord(northWest, directions.northWest)

        if (
          (isMatchSouthEast && isMatchSouthWest) ||
          (isMatchSouthEast && isMatchNorthEast) ||
          (isMatchSouthWest && isMatchNorthWest) ||
          (isMatchNorthEast && isMatchNorthWest)
        ) {
          numberOfXmases += 1
        }
      }
    })
  })

  return numberOfXmases
}

const input = Bun.file('./2024/4/input.txt')

const textInput = await input.text()
const parsedInput = textInput.split('\n')

const p1 = part1({
  grid: parsedInput,
  word: 'XMAS',
})

const p2 = part2({
  grid: parsedInput,
  word: 'MAS',
})

console.log({ p1, p2 })
