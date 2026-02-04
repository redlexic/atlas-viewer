import { buildTree, traverseTree } from '../utils/treeParser'

/**
 * Calculate tree layout using Reingold-Tilford algorithm
 * Uses a compact variation of Walker with tighter margins
 *
 * @param {Array} nodes - Flat array of content nodes
 * @param {Object} config - Layout configuration
 * @returns {Map} Map of node.doc_no -> {x, y, size}
 */
function calculateReingoldTilfordLayout(nodes, config = {}) {
  // Use tighter margins for a more compact layout
  const compactConfig = {
    ...config,
    marginFactor: 1.1, // 10% margin (vs default 30%)
  }

  return calculateWalkerLayout(nodes, compactConfig)
}

/**
 * Walker algorithm implementation (extracted for reuse)
 */
function calculateWalkerLayout(nodes, config = {}) {
  const {
    verticalSpacing = 1.0,
    tileSize = 0.5,
    numAgentSlots = 1,  // Number of agent slots to allocate for each node
    marginFactor = 1.3, // Default 30% margin between nodes
  } = config

  const layout = new Map()
  const roots = buildTree(nodes)

  if (roots.length === 0) {
    return layout
  }

  /**
   * Calculate the visual width of a node based on number of agent slots
   * Must match the rendering calculation in TreeView.jsx
   *
   * Visual width formula (from TreeView.jsx):
   *   tileWidth = tileSize * 0.95
   *   tileSpacing = tileWidth * 1.1
   *   totalWidth = (numSlots - 1) * tileSpacing
   *   bgWidth = totalWidth + tileWidth + tileWidth * 0.3
   *         = tileWidth * ((numSlots - 1) * 1.1 + 1.3)
   */
  function getNodeWidth() {
    const tileWidth = tileSize * 0.95
    const visualWidth = tileWidth * ((numAgentSlots - 1) * 1.1 + 1.3)

    // Add margin between nodes to prevent overlap (default 30%)
    return visualWidth * marginFactor
  }

  const nodeWidth = getNodeWidth()
  let nextX = 0

  function assignPositions(node, depth = 0) {
    node._depth = depth

    if (node.children.length === 0) {
      // Leaf nodes: place at nextX, then advance by nodeWidth
      node._x = nextX
      nextX += nodeWidth
    } else {
      // Parent nodes: first layout children, then center over them
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
      // Get rightmost edge (center + half width) of previous tree
      const prevRightEdge = getRightmostX(prevRoot) + nodeWidth / 2
      // Get leftmost edge (center - half width) of current tree
      const currLeftEdge = getLeftmostX(root) - nodeWidth / 2
      // Add gap between trees
      const gap = nodeWidth * 0.5  // 50% of node width as gap between trees
      const shift = prevRightEdge - currLeftEdge + gap
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
