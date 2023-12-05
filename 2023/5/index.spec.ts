import { expect, test, describe } from 'bun:test'

import { Almanac, getParsedInput, getSourceNumber, part1, part2 } from '.'

describe('day 5', () => {
  const input = [
    'seeds: 79 14 55 13',
    '',
    'seed-to-soil map:',
    '50 98 2',
    '52 50 48',
    '',
    'soil-to-fertilizer map:',
    '0 15 37',
    '37 52 2',
    '39 0 15',
    '',
    'fertilizer-to-water map:',
    '49 53 8',
    '0 11 42',
    '42 0 7',
    '57 7 4',
    '',
    'water-to-light map:',
    '88 18 7',
    '18 25 70',
    '',
    'light-to-temperature map:',
    '45 77 23',
    '81 45 19',
    '68 64 13',
    '',
    'temperature-to-humidity map:',
    '0 69 1',
    '1 0 69',
    '',
    'humidity-to-location map:',
    '60 56 37',
    '56 93 4',
  ]

  test('parsed input', () => {
    const expected: Almanac = {
      seeds: [79, 14, 55, 13],
      seedToSoil: [
        [50, 98, 2],
        [52, 50, 48],
      ],
      soilToFertilizer: [
        [0, 15, 37],
        [37, 52, 2],
        [39, 0, 15],
      ],
      fertilizerToWater: [
        [49, 53, 8],
        [0, 11, 42],
        [42, 0, 7],
        [57, 7, 4],
      ],
      waterToLight: [
        [88, 18, 7],
        [18, 25, 70],
      ],
      lightToTemperature: [
        [45, 77, 23],
        [81, 45, 19],
        [68, 64, 13],
      ],
      temperatureToHumidity: [
        [0, 69, 1],
        [1, 0, 69],
      ],
      humidityToLocation: [
        [60, 56, 37],
        [56, 93, 4],
      ],
    }

    expect(getParsedInput(input)).toStrictEqual(expected)
  })

  test('getSourceNumber returns the source number', () => {
    expect(
      getSourceNumber(79, [
        [50, 98, 2],
        [52, 50, 48],
      ])
    ).toBe(81)
  })

  test('getSourceNumber with an invalid range returns the seed number', () => {
    expect(getSourceNumber(79, [])).toBe(79)
    expect(getSourceNumber(79, [[52, 98, 2]])).toBe(79)
  })

  test('given seed 79 the location number should be 82', () => {
    const {
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    } = getParsedInput(input)

    const soilNumber = getSourceNumber(79, seedToSoil)
    const fertilizerNumber = getSourceNumber(soilNumber, soilToFertilizer)
    const waterNumber = getSourceNumber(fertilizerNumber, fertilizerToWater)
    const lightNumber = getSourceNumber(waterNumber, waterToLight)
    const tempNumber = getSourceNumber(lightNumber, lightToTemperature)
    const humidityNumber = getSourceNumber(tempNumber, temperatureToHumidity)
    const locationNumber = getSourceNumber(humidityNumber, humidityToLocation)

    expect(locationNumber).toBe(82)
  })

  test('part 1 lowest location number', () => {
    expect(part1(getParsedInput(input))).toBe(35)
  })

  test('part 2 range of seed numbers', () => {
    expect(part2(getParsedInput(input))).toBe(46)
  })
})
