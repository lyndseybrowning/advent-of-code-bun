/**
 * Retrieve a list of file blocks based on a disk map.
 * The disk map alternates between the length of a file and the amount of free space.
 * Each file has an ID number based on the order they appear.
 * @param diskMap e.g. [2, 3, 3, 3, 1]
 * @returns A list of file blocks with empty spaces denoted by -1
 * e.g. [2, 3, 3, 3, 1] = [0,0,-1,-,1,-1,1,1,1,-1,-1,-1,2]
 */
export const getFileBlocks = (diskMap: number[]): number[] => {
  return diskMap.reduce((fileBlocks: number[], block, index) => {
    const fileId = index === 0 ? 0 : index / 2
    const blocks = Array(block).fill(index % 2 === 0 ? fileId : -1)
    fileBlocks.push(...blocks)
    return fileBlocks
  }, [])
}

/**
 * Move files one by one from the end of the disk to the leftmost free space
 * until there are no gaps remaining between file blocks.
 * @param fileBlocks A list of file blocks where -1 is free space
 * e.g. [0,0,-1,-,1,-1,1,1,1,-1,-1,-1,2]
 */
export const moveFileBlocks = (blocks: number[]): number[] => {
  const fileBlocks = blocks.filter((n) => n > -1)
  const blocksToMove = [...fileBlocks].reverse()
  const moved: number[] = []

  let counter = 0

  while (counter < fileBlocks.length) {
    const num = blocks[counter]

    if (num === -1) {
      const newNum = blocksToMove.splice(0, 1)
      moved.push(...newNum)
    } else {
      moved.push(num)
    }
    counter++
  }

  return moved
}

export const part1 = (input: number[]) => {
  const blocks = moveFileBlocks(getFileBlocks(input))
  const checksum = blocks.reduce((sum, block, index) => {
    return sum + index * block
  }, 0)

  return checksum
}

export const part2 = () => {}

const input = Bun.file('./2024/9/input.txt')

const textInput = await input.text()
const parsedInput = textInput.split('').map(Number)

console.time('part1')
const p1 = part1(parsedInput)
console.timeEnd('part1')

const p2 = part2()

console.log({ p1, p2 })
