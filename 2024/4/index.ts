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
          if (isMatchingWord([rowIndex, colIndex], [...direction])) {
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
  const [startingLetter] = word

  let numberOfXmases = 0

  grid.forEach((row, rowIndex) => {
    ;[...row].forEach((letter, colIndex) => {
      if (letter === startingLetter) {
      }
    })
  })

  return numberOfXmases
}

const input = Bun.file('./2024/4/input.txt')

const textInput = await input.text()
const parsedInput = textInput.split('\n')

// const p1 = part1({
//   grid: parsedInput,
//   word: 'XMAS',
// })

// const p2 = part2({
//   grid: parsedInput,
//   word: 'MAS',
// })

// console.log({ p1, p2 })
