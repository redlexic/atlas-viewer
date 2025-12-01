import { buildTree, traverseTree } from '../utils/treeParser'

/**
 * Calculate tree layout using Reingold-Tilford algorithm
 * Uses a compact variation of Walker with tighter horizontal spacing
 *
 * @param {Array} nodes - Flat array of content nodes
 * @param {Object} config - Layout configuration
 * @returns {Map} Map of node.doc_no -> {x, y, size}
 */
function calculateReingoldTilfordLayout(nodes, config = {}) {
  // Use tighter horizontal spacing for a more compact layout
  const compactConfig = {
    ...config,
    horizontalSpacing: config.horizontalSpacing * 0.6, // 40% tighter
  }

  // For now, use the same Walker algorithm but with tighter spacing
  // This gives a compact layout without the complexity bugs
  return calculateWalkerLayout(nodes, compactConfig)
}

/**
 * Walker algorithm implementation (extracted for reuse)
 */
function calculateWalkerLayout(nodes, config = {}) {
  const {
    horizontalSpacing = 1.2,
    verticalSpacing = 1.0,
    tileSize = 0.5,
    numAgentSlots = 1,  // Number of agent slots to allocate for each node
  } = config

  const layout = new Map()
  const roots = buildTree(nodes)

  if (roots.length === 0) {
    return layout
  }

  /**
   * Get the width multiplier for a node based on number of agent slots
   * All nodes get the same width to maintain alignment in slot-based layout
   */
  function getNodeWidth() {
    if (numAgentSlots === 1) return 1.0

    // Each additional agent adds 1.1x tile width (tile + 10% gap)
    // For 2 slots: 1.0 + 1.1 = 2.1x width
    return 1.0 + (numAgentSlots - 1) * 1.1
  }

  const nodeWidth = getNodeWidth()
  let nextX = 0

  function assignPositions(node, depth = 0) {
    node._depth = depth

    if (node.children.length === 0) {
      node._x = nextX * horizontalSpacing
      nextX += nodeWidth  // Account for multi-agent width
    } else {
      node.children.forEach(child => assignPositions(child, depth + 1))

      const leftmost = node.children[0]._x
      const rightmost = node.children[node.children.length - 1]._x
      node._x = (leftmost + rightmost) / 2
    }

    node._y = depth * verticalSpacing
  }

  roots.forEach((root, index) => {
    nextX = 0
    assignPositions(root)

    if (index > 0) {
      const prevRoot = roots[index - 1]
      const prevRightmost = getRightmostX(prevRoot)
      const currLeftmost = getLeftmostX(root)
      const gap = horizontalSpacing * 3
      const shift = prevRightmost - currLeftmost + gap
      shiftTree(root, shift)
    }
  })

  function getLeftmostX(node) {
    let min = node._x
    node.children.forEach(child => {
      min = Math.min(min, getLeftmostX(child))
    })
    return min
  }

  function getRightmostX(node) {
    let max = node._x
    node.children.forEach(child => {
      max = Math.max(max, getRightmostX(child))
    })
    return max
  }

  function shiftTree(node, offset) {
    node._x += offset
    node.children.forEach(child => shiftTree(child, offset))
  }

  traverseTree(roots, (node) => {
    layout.set(node.doc_no, {
      x: node._x,
      y: node._y,
      size: tileSize
    })
  })

  return layout
}

/**
 * Calculate tree layout using a simplified Walker algorithm
 * Much more robust than previous implementation
 *
 * @param {Array} nodes - Flat array of content nodes
 * @param {Object} config - Layout configuration
 * @param {String} algorithm - Layout algorithm to use ('walker' or 'reingold-tilford')
 * @returns {Map} Map of node.doc_no -> {x, y, size}
 */
export function calculateTreeLayout(nodes, config = {}, algorithm = 'walker') {
  // Route to appropriate algorithm
  if (algorithm === 'reingold-tilford') {
    return calculateReingoldTilfordLayout(nodes, config)
  }

  // Default: Walker algorithm
  return calculateWalkerLayout(nodes, config)
}

/**
 * Get tree layout bounds
 * @param {Map} layout - Layout map from calculateTreeLayout
 * @returns {Object} Bounds {minX, maxX, minY, maxY, width, height}
 */
export function getTreeBounds(layout) {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  layout.forEach(({ x, y }) => {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  })

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY
  }
}
