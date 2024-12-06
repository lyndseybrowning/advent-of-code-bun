type Reports = number[][]

interface SafetyReport {
  report: number[]
  isSafe: boolean
}

export const getParsedInput = (input: string[]): Reports => {
  return input.map((report) => report.split(' ').map(Number))
}

export const getSafetyReport = (report: number[]): SafetyReport => {
  const MIN_STEP_ALLOWED = 1
  const MAX_STEP_ALLOWED = 3

  const safetyReport: SafetyReport = {
    report,
    isSafe: true,
  }

  const [currentLevel, ...remainingReport] = report

  const reportStatus = {
    currentLevel,
    isIncreasing: false,
    isDecreasing: false,
  }

  for (const level of remainingReport) {
    const difference = Math.abs(level - reportStatus.currentLevel)

    if (difference < MIN_STEP_ALLOWED || difference > MAX_STEP_ALLOWED) {
      safetyReport.isSafe = false
      return safetyReport
    }

    if (level > reportStatus.currentLevel) {
      reportStatus.isIncreasing = true
    }

    if (level < reportStatus.currentLevel) {
      reportStatus.isDecreasing = true
    }

    reportStatus.currentLevel = level
  }

  if (reportStatus.isIncreasing && reportStatus.isDecreasing) {
    safetyReport.isSafe = false
  }

  return safetyReport
}

export const part1 = (reports: Reports): number => {
  const safetyReports = reports.map(getSafetyReport)
  const safeReports = safetyReports.filter((report) => report.isSafe)

  return safeReports.length
}

export const part2 = (reports: Reports) => {
  const safetyReports = reports.map(getSafetyReport)
  const safeReports = safetyReports.filter((report) => report.isSafe)
  const unsafeReports = safetyReports.filter((report) => !report.isSafe)

  const toleratedUnsafeReports = unsafeReports.filter(({ report }) => {
    let counter = 0

    while (counter <= report.length) {
      const remainingLevels = report.filter((_, index) => index !== counter)
      const updatedReport = getSafetyReport(remainingLevels)

      if (updatedReport.isSafe) {
        return true
      }

      counter += 1
    }

    return false
  })

  return safeReports.length + toleratedUnsafeReports.length
}

const input = Bun.file('./2024/2/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

const p1 = part1(parsedInput)
const p2 = part2(parsedInput)

console.log({ p1, p2 })
