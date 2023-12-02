import { getSumOfDigits } from '../../utils/getSumOfDigits'

const MAX_RED_CUBES = 12
const MAX_GREEN_CUBES = 13
const MAX_BLUE_CUBES = 14

export type Draw = {
  red?: number
  green?: number
  blue?: number
}
export type Game = Draw[]

export const part1 = (games: Game[]): number => {
  const possibleGames: number[] = []

  games.forEach((game, index) => {
    const isImpossibleGame = game.some(
      ({ red = 0, green = 0, blue = 0 }) =>
        red > MAX_RED_CUBES || green > MAX_GREEN_CUBES || blue > MAX_BLUE_CUBES
    )

    if (!isImpossibleGame) {
      possibleGames.push(index + 1)
    }
  })

  return getSumOfDigits(possibleGames)
}

export const part2 = (games: Game[]) => {
  const powers = games.map((game) => {
    const fewestRed = Math.max(...game.map((draw) => draw.red ?? 0))
    const fewestGreen = Math.max(...game.map((draw) => draw.green ?? 0))
    const fewestBlue = Math.max(...game.map((draw) => draw.blue ?? 0))

    return fewestRed * fewestGreen * fewestBlue
  })

  return getSumOfDigits(powers)
}

export const getParsedInput = (input: string[]): Game[] => {
  return input.map((gameLine) => {
    const [, games] = gameLine.split(':')
    const draws = games.split(';')

    return draws.map<Draw>((game) => {
      const draw = game.split(',')
      const getDrawCount = (color: string) => {
        const match = draw.find((item) => item.includes(color))

        if (!match) {
          return 0
        }

        return Number(match.replace(/[a-z\s]/g, ''))
      }

      return {
        red: getDrawCount('red'),
        green: getDrawCount('green'),
        blue: getDrawCount('blue'),
      }
    })
  })
}

const input = Bun.file('./2023/2/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

const p1 = part1(parsedInput)
const p2 = part2(parsedInput)

console.log({ p1, p2 })
