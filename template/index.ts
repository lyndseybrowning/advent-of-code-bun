export const getParsedInput = (input: string[]) => {}

export const part1 = () => {}

export const part2 = () => {}

const input = Bun.file('./2023/{day}/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

const p1 = part1()
const p2 = part2()

console.log({ p1, p2 })
