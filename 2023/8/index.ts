import { lowestCommonMultiple } from '../../utils/lowestCommonMultiple'

export type Node = Record<string, string[]>

export type NodeMap = {
  steps: number[]
  nodes: Node
}

export const getParsedInput = (input: string[]): NodeMap => {
  const entries = input.slice(2).values()
  const nodes: Node = {}

  for (const line of entries) {
    const [element, next] = line.split('=')
    const nextNodes = next.split(',').map((el) => el.replace(/[- )(]/g, ''))
    const isCommonNode = nextNodes.every((n) => n === nextNodes[0])

    nodes[element.trim()] = isCommonNode ? nextNodes.slice(0, 1) : nextNodes
  }

  const nodeMap: NodeMap = {
    steps: input[0].split('').map((char) => (char === 'L' ? 0 : 1)),
    nodes,
  }

  return nodeMap
}

export const getStepCount = (
  currentNode: string,
  nodeMap: NodeMap,
  stepCount = 0,
  endNode = 'ZZZ'
): number => {
  for (const step of nodeMap.steps) {
    const node = nodeMap.nodes[currentNode]

    currentNode = node[step] ?? node[0]
    stepCount++

    if (currentNode.endsWith(endNode)) {
      return stepCount
    }
  }

  return getStepCount(currentNode, nodeMap, stepCount, endNode)
}

export const part1 = (nodeMap: NodeMap): number => {
  return getStepCount('AAA', nodeMap, 0)
}

export const part2 = (nodeMap: NodeMap): number => {
  const startNodes = Object.keys(nodeMap.nodes).filter((node) =>
    node.endsWith('A')
  )

  const allStepCounts: number[] = startNodes.map((node) =>
    getStepCount(node, nodeMap, 0, 'Z')
  )

  return lowestCommonMultiple(allStepCounts)
}

const input = Bun.file('./2023/8/input.txt')

const textInput = await input.text()
const parsedInput = getParsedInput(textInput.split('\n'))

// 24253
const p1 = part1(parsedInput)

// 12357789728873
const p2 = part2(parsedInput)

console.log({ p1, p2 })
