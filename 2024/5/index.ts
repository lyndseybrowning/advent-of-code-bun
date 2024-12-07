export interface PrintManual {
  /**
   * Page number and the pages that it must come before.
   */
  orderingRules: Record<number, number[]>
  pageNumbers: number[][]
}

export interface PrintReport {
  pages: number[]
  isInOrder: boolean
}

const getPrintReport = (printManual: PrintManual): PrintReport[] => {
  return printManual.pageNumbers.map((pages) => {
    const isInOrder = pages.every((page, index) => {
      const remainingPages = pages.slice(index + 1)

      if (remainingPages.length === 0) {
        return true
      }

      return remainingPages.every((p) =>
        printManual.orderingRules[page]?.includes(p)
      )
    })

    return {
      pages,
      isInOrder,
    }
  })
}

const getMiddleValue = (pages: number[]) => pages[Math.floor(pages.length / 2)]

export const getParsedInput = (input: string[]): PrintManual => {
  const printManual: PrintManual = {
    orderingRules: {},
    pageNumbers: [],
  }

  for (const line of input) {
    const [pageNumber1, pageNumber2] = line.split('|').map(Number)
    const pageNumbers: number[] = line.split(',').map(Number)

    if (line.includes('|')) {
      printManual.orderingRules[pageNumber1] ??= []
      printManual.orderingRules[pageNumber1].push(pageNumber2)
    } else if (line !== '') {
      printManual.pageNumbers.push(pageNumbers)
    }
  }

  return printManual
}

export const part1 = (printManual: PrintManual): number => {
  const printReport = getPrintReport(printManual)
  const orderedPages = printReport.filter((report) => report.isInOrder)

  return orderedPages.reduce((middlePageNumbers, report) => {
    return (middlePageNumbers += getMiddleValue(report.pages))
  }, 0)
}

export const part2 = (printManual: PrintManual) => {
  const printReport = getPrintReport(printManual)
  const unorderedReports = printReport.filter((report) => !report.isInOrder)

  const orderedPages = unorderedReports.map((report) => {
    return report.pages.sort((a: number, b: number) => {
      if (printManual.orderingRules[a]?.includes(b)) {
        return -1
      }
      return 1
    })
  })

  return orderedPages.reduce((middlePageNumbers, pages) => {
    return (middlePageNumbers += getMiddleValue(pages))
  }, 0)
}

const input = Bun.file('./2024/5/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

const p1 = part1(parsedInput)
const p2 = part2(parsedInput)

console.log({ p1, p2 })
