export const lowestCommonMultiple = (items: number[]) => {
  const greatestCommonDenominator = (a: number, b: number): number =>
    a ? greatestCommonDenominator(b % a, a) : b
  const lowestCommon = (a: number, b: number) =>
    (a * b) / greatestCommonDenominator(a, b)

  return items.reduce(lowestCommon)
}
