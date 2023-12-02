export const getSumOfDigits = (array: number[]) =>
  array.reduce<number>((sum, item) => sum + item, 0)
