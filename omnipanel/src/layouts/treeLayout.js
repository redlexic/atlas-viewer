import { buildTree, traverseTree } from '../utils/treeParser'

/**
 * Calculate tree layout using a simplified Walker algorithm
 * Much more robust than previous implementation
 *
 * @param {Array} nodes - Flat array of content nodes
 * @param {Object} config - Layout configuration
 * @returns {Map} Map of node.doc_no -> {x, y, size}
 */
export function calculateTreeLayout(nodes, config = {}) {
  const {
    horizontalSpacing = 1.2,
    verticalSpacing = 1.0,
    tileSize = 0.5,
  } = config

  const layout = new Map()

  // Build tree structure from flat nodes
  const roots = buildTree(nodes)

  if (roots.length === 0) {
    return layout
  }

  // Counter for assigning unique X positions to leaf nodes
  let nextX = 0

  /**
   * First pass: Assign X positions in post-order
   * - Leaf nodes get sequential X positions
   * - Parent nodes are centered over their children
   */
  function assignPositions(node, depth = 0) {
    node._depth = depth

    if (node.children.length === 0) {
      // Leaf node - assign next available X position
      node._x = nextX * horizontalSpacing
      nextX++
    } else {
      // Process all children first (post-order)
      node.children.forEach(child => assignPositions(child, depth + 1))

      // Position parent centered over children
      const leftmost = node.children[0]._x
      const rightmost = node.children[node.children.length - 1]._x
      node._x = (leftmost + rightmost) / 2
    }

    // Y position based on depth
    node._y = depth * verticalSpacing
  }

  // Process each root tree separately
  let rootOffset = 0
  roots.forEach((root, index) => {
    // Reset counter for each root tree
    nextX = 0
    assignPositions(root)

    // If multiple roots, space them apart
    if (index > 0) {
      const prevRoot = roots[index - 1]
      const prevRightmost = getRightmostX(prevRoot)
      const currLeftmost = getLeftmostX(root)
      const gap = horizontalSpacing * 3 // Extra space between root trees
      const shift = prevRightmost - currLeftmost + gap
      shiftTree(root, shift)
      rootOffset += shift
    }
  })

  /**
   * Get leftmost X position in subtree
   */
  function getLeftmostX(node) {
    let min = node._x
    node.children.forEach(child => {
      min = Math.min(min, getLeftmostX(child))
    })
    return min
  }

  /**
   * Get rightmost X position in subtree
   */
  function getRightmostX(node) {
    let max = node._x
    node.children.forEach(child => {
      max = Math.max(max, getRightmostX(child))
    })
    return max
  }

  /**
   * Shift entire subtree by offset
   */
  function shiftTree(node, offset) {
    node._x += offset
    node.children.forEach(child => shiftTree(child, offset))
  }

  // Convert tree positions to layout map
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
