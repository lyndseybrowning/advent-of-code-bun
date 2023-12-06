export type Race = {
  time: number
  record: number
}

export const getParsedInput = (input: string[]): Race[] => {
  const times = input[0].split(' ').map(Number).filter(Boolean)
  const records = input[1].split(' ').map(Number).filter(Boolean)

  const races = times.map((time, index) => ({
    time,
    record: records[index],
  }))

  return races
}

/*
 * given a race time provide all available distances
 * based on holding the boat down for 1ms at a time
 */
export const getRaceOptions = (time: number): number[] => {
  const options: number[] = []

  let holdCount = 1

  while (holdCount < time) {
    options.push((time - holdCount) * holdCount)
    holdCount++
  }

  return options
}

export const getWaysToWin = (raceOptions: number[], record: number) => {
  return raceOptions.filter((distance) => distance > record).length
}

export const part1 = (races: Race[]) => {
  return races.reduce(
    (waysToWin, race) =>
      waysToWin * getWaysToWin(getRaceOptions(race.time), race.record),
    1
  )
}

export const part2 = (race: Race) =>
  getWaysToWin(getRaceOptions(race.time), race.record)

const input = Bun.file('./2023/6/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

const p1 = part1(parsedInput)
const p2 = part2({
  time: 47707566,
  record: 282107911471062,
})

console.log({ p1, p2 })
