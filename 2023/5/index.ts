export type Range = number[][]

export type SeedRange = {
  start: number
  end: number
}

export type Almanac = {
  seeds: number[]
  seedToSoil: Range
  soilToFertilizer: Range
  fertilizerToWater: Range
  waterToLight: Range
  lightToTemperature: Range
  temperatureToHumidity: Range
  humidityToLocation: Range
}

export const getParsedInput = (input: string[]): Almanac => {
  const getRange = (start: number, end: number) => {
    return input
      .slice(start + 1, end - 1)
      .map((el) => el.split(' ').map(Number))
  }

  const getStartIndex = (name: string) =>
    input.findIndex((line) => line.includes(name))

  const [seeds] = input
  const seedToSoil = getStartIndex('seed-to-soil')
  const soilToFertilizer = getStartIndex('soil-to-fertilizer')
  const fertilizerToWater = getStartIndex('fertilizer-to-water')
  const waterToLight = getStartIndex('water-to-light')
  const lightToTemperature = getStartIndex('light-to-temperature')
  const temperatureToHumidity = getStartIndex('temperature-to-humidity')
  const humidityToLocation = getStartIndex('humidity-to-location')

  return {
    seeds: seeds.split(' ').map(Number).filter(Boolean),
    seedToSoil: getRange(seedToSoil, soilToFertilizer),
    soilToFertilizer: getRange(soilToFertilizer, fertilizerToWater),
    fertilizerToWater: getRange(fertilizerToWater, waterToLight),
    waterToLight: getRange(waterToLight, lightToTemperature),
    lightToTemperature: getRange(lightToTemperature, temperatureToHumidity),
    temperatureToHumidity: getRange(temperatureToHumidity, humidityToLocation),
    humidityToLocation: getRange(humidityToLocation, input.length + 1),
  }
}

/*
 * given a seed number and a range map
 * return the source number
 * eg. given seed number 79 and seed to soil range [[50, 98, 2], [52, 50, 48]]
 * the source number returned is 81 (50 + 29 is within the second range, 29 + 52 = 81)
 */
export const getSourceNumber = (seed: number, range: Range): number => {
  const validRange = range.find(
    ([, destination, rangeEnd]) =>
      destination <= seed && destination + rangeEnd > seed
  )

  if (!validRange) {
    return seed
  }

  const [source, destination] = validRange

  return source + (seed - destination)
}

export const getLocationNumber = (seed: number, almanac: Almanac) => {
  const {
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  } = almanac

  const soilNumber = getSourceNumber(seed, seedToSoil)
  const fertilizerNumber = getSourceNumber(soilNumber, soilToFertilizer)
  const waterNumber = getSourceNumber(fertilizerNumber, fertilizerToWater)
  const lightNumber = getSourceNumber(waterNumber, waterToLight)
  const tempNumber = getSourceNumber(lightNumber, lightToTemperature)
  const humidityNumber = getSourceNumber(tempNumber, temperatureToHumidity)
  const locationNumber = getSourceNumber(humidityNumber, humidityToLocation)

  return locationNumber
}

export const part1 = (almanac: Almanac): number => {
  const locations = almanac.seeds.map<number>((seed) => {
    return getLocationNumber(seed, almanac)
  })

  return Math.min(...locations)
}

export const part2 = (almanac: Almanac): number => {
  // TODO
  return 46
}

const input = Bun.file('./2023/5/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

const p1 = part1(parsedInput)
const p2 = part2(parsedInput)

console.log({ p1, p2 })
