type NodePosition = [number, number]
type Antenna = Record<string, NodePosition[]>

const isWithinBounds =
  (rowLength: number, colLength: number) =>
  (position: NodePosition): boolean => {
    const [x, y] = position
    return x >= 0 && x < rowLength && y >= 0 && y < colLength
  }

export const part1 = (map: string[]): number => {
  const antinodes = new Set<string>()
  const antennae: Antenna = {}
  const isInBoundary = isWithinBounds(map.length, map[0].length)

  map.forEach((row, x) => {
    ;[...row].forEach((node, y) => {
      if (node !== '.') {
        const antenna = (antennae[node] ??= [])

        for (const [posX, posY] of antenna) {
          const diffX = Math.abs(posX - x)
          const diffY = posY - y
          const posDiffY = Math.abs(diffY)

          const antinode1: NodePosition = [
            posX - diffX,
            diffY < 0 ? posY - posDiffY : posY + posDiffY,
          ]

          const antinode2: NodePosition = [
            x + diffX,
            diffY < 0 ? y + posDiffY : y - posDiffY,
          ]

          if (isInBoundary(antinode1)) {
            antinodes.add(`${antinode1[0]}.${antinode1[1]}`)
          }

          if (isInBoundary(antinode2)) {
            antinodes.add(`${antinode2[0]}.${antinode2[1]}`)
          }
        }
        antennae[node].push([x, y])
      }
    })
  })

  return antinodes.size
}

export const part2 = () => {}

const input = Bun.file('./2024/8/input.txt')

const textInput = await input.text()
const parsedInput = textInput.split('\n')

const p1 = part1(parsedInput)
const p2 = part2()

console.log({ p1, p2 })
