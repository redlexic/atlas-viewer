import { PLANE_CONFIG } from '../config/planeConfig'

/**
 * Calculate grid layout positions for nodes
 * Pure function - takes nodes and config, returns position data
 *
 * @param {Array} nodes - Array of content nodes to position
 * @param {Object} config - Layout configuration (optional, defaults to PLANE_CONFIG)
 * @returns {Map} Map of node.doc_no -> {x, y, size}
 */
export function calculateGridLayout(nodes, config = PLANE_CONFIG) {
  const layout = new Map()

  let nodeIndex = 0

  for (let row = 0; row < config.verticalTiles; row++) {
    for (let col = 0; col < config.horizontalTiles; col++) {
      // Skip if we've run out of nodes
      if (nodeIndex >= nodes.length) break

      const node = nodes[nodeIndex]

      // Calculate position
      const x = (col * config.tileSize) - (config.baseWidth / 2) + (config.tileSize / 2) + config.gridOffsetX
      const y = (row * config.tileSize) - (config.planeHeight / 2) + (config.tileSize / 2)

      layout.set(node.doc_no, {
        x,
        y,
        size: config.tileSize
      })

      nodeIndex++
    }
  }

  return layout
}

/**
 * Get grid configuration info (useful for debugging/visualization)
 */
export function getGridInfo(config = PLANE_CONFIG) {
  return {
    totalTiles: config.verticalTiles * config.horizontalTiles,
    rows: config.verticalTiles,
    columns: config.horizontalTiles,
    tileSize: config.tileSize,
    bounds: {
      width: config.baseWidth,
      height: config.planeHeight
    }
  }
}
