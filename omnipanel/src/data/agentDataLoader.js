/**
 * Agent data loading utilities
 * Handles fetching and parsing agent JSON files
 */

/**
 * Load agent data from a JSON file
 * @param {string} filename - JSON filename in /public directory
 * @returns {Promise<Object>} - Parsed agent data
 */
export async function loadAgentData(filename) {
  try {
    const response = await fetch(`/${filename}`)

    if (!response.ok) {
      throw new Error(`Failed to load ${filename}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading agent data:', error)
    throw error
  }
}

/**
 * Load Launch Agent 6 data
 * @returns {Promise<Object>} - Launch Agent 6 data
 */
export async function loadLaunchAgent6() {
  return loadAgentData('launch_agent_6_agent.json')
}

/**
 * Load Prysm Agent data
 * @returns {Promise<Object>} - Prysm Agent data
 */
export async function loadPrysm() {
  return loadAgentData('prysm-agent.json')
}

/**
 * Load full Atlas data
 * @returns {Promise<Array>} - Full Atlas data
 */
export async function loadAtlas() {
  return loadAgentData('atlas-2025-11-20.json')
}

/**
 * Helper function to find a node by doc_no in nested Atlas structure
 */
function findNodeByDocNo(nodes, targetDocNo) {
  if (!Array.isArray(nodes)) return null

  for (const node of nodes) {
    if (node.doc_no === targetDocNo) {
      return node
    }

    // Search in nested children arrays
    const childArrays = [
      node.articles,
      node.sections_and_primary_docs,
      node.agent_scope_database
    ]

    for (const children of childArrays) {
      if (children && Array.isArray(children)) {
        const found = findNodeByDocNo(children, targetDocNo)
        if (found) return found
      }
    }
  }

  return null
}

/**
 * Load Spark Agent data (extract from Full Atlas)
 * @returns {Promise<Array>} - Spark Agent subtree
 */
export async function loadSparkAgent() {
  const atlas = await loadAtlas()
  const sparkAgent = findNodeByDocNo(atlas, 'A.6.1.1.1')

  if (!sparkAgent) {
    throw new Error('Spark Agent (A.6.1.1.1) not found in Atlas data')
  }

  return [sparkAgent]
}

/**
 * Load Grove Agent data (extract from Full Atlas)
 * @returns {Promise<Array>} - Grove Agent subtree
 */
export async function loadGroveAgent() {
  const atlas = await loadAtlas()
  const groveAgent = findNodeByDocNo(atlas, 'A.6.1.1.2')

  if (!groveAgent) {
    throw new Error('Grove Agent (A.6.1.1.2) not found in Atlas data')
  }

  return [groveAgent]
}

/**
 * Load Keel Agent data (extract from Full Atlas)
 * @returns {Promise<Array>} - Keel Agent subtree
 */
export async function loadKeelAgent() {
  const atlas = await loadAtlas()
  const keelAgent = findNodeByDocNo(atlas, 'A.6.1.1.3')

  if (!keelAgent) {
    throw new Error('Keel Agent (A.6.1.1.3) not found in Atlas data')
  }

  return [keelAgent]
}

/**
 * Load Launch Agent 3 data (extract from Full Atlas)
 * @returns {Promise<Array>} - Launch Agent 3 subtree
 */
export async function loadLaunchAgent3() {
  const atlas = await loadAtlas()
  const agent = findNodeByDocNo(atlas, 'A.6.1.1.4')

  if (!agent) {
    throw new Error('Launch Agent 3 (A.6.1.1.4) not found in Atlas data')
  }

  return [agent]
}

/**
 * Load Launch Agent 4 data (extract from Full Atlas)
 * @returns {Promise<Array>} - Launch Agent 4 subtree
 */
export async function loadLaunchAgent4() {
  const atlas = await loadAtlas()
  const agent = findNodeByDocNo(atlas, 'A.6.1.1.5')

  if (!agent) {
    throw new Error('Launch Agent 4 (A.6.1.1.5) not found in Atlas data')
  }

  return [agent]
}

/**
 * Load Launch Agent 6 (old version) data
 * @returns {Promise<Array>} - Launch Agent 6 (old) data
 */
export async function loadLaunchAgent6Old() {
  const response = await fetch('/launch_agent_6_agent_old.json')
  if (!response.ok) {
    throw new Error('Failed to load Launch Agent 6 (old) data')
  }
  const data = await response.json()
  return [data]
}

/**
 * Available datasets (matching Agent Comparison order)
 */
export const DATASETS = {
  SPARK: { id: 'spark', name: 'Spark', loader: loadSparkAgent },
  GROVE: { id: 'grove', name: 'Grove', loader: loadGroveAgent },
  KEEL: { id: 'keel', name: 'Keel', loader: loadKeelAgent },
  LAUNCH_AGENT_3: { id: 'launch_agent_3', name: 'Launch Agent 3', loader: loadLaunchAgent3 },
  LAUNCH_AGENT_4: { id: 'launch_agent_4', name: 'Launch Agent 4', loader: loadLaunchAgent4 },
  PRYSM: { id: 'prysm', name: 'Prysm', loader: loadPrysm },
  LAUNCH_AGENT_6: { id: 'launch_agent_6', name: 'Launch Agent 6', loader: loadLaunchAgent6 },
  LA6_OLD: { id: 'la6_old', name: 'LA6_old', loader: loadLaunchAgent6Old },
}

/**
 * Get statistics about a tree structure
 * @param {Object|Array} data - Tree data (nested or flat)
 * @returns {Object} - Statistics
 */
export function getTreeStats(data) {
  const stats = {
    totalNodes: 0,
    maxDepth: 0,
    nodesByType: {},
  }

  // Handle flat array format
  if (Array.isArray(data)) {
    stats.totalNodes = data.length

    data.forEach(node => {
      // Count by type
      stats.nodesByType[node.type] = (stats.nodesByType[node.type] || 0) + 1

      // Calculate depth from doc_no
      if (node.doc_no) {
        const depth = node.doc_no.split('.').length - 1
        stats.maxDepth = Math.max(stats.maxDepth, depth)
      }
    })

    return stats
  }

  // Handle nested format - recursively count
  function traverse(node, depth = 0) {
    stats.totalNodes++
    stats.maxDepth = Math.max(stats.maxDepth, depth)

    // Count by type
    if (node.type) {
      stats.nodesByType[node.type] = (stats.nodesByType[node.type] || 0) + 1
    }

    // Find children in any array field
    for (const key in node) {
      const value = node[key]
      if (Array.isArray(value) && value.length > 0) {
        // Check if this array contains document nodes
        if (value[0] && typeof value[0] === 'object' &&
            'type' in value[0] && 'doc_no' in value[0]) {
          value.forEach(child => traverse(child, depth + 1))
        }
      }
    }
  }

  traverse(data)
  return stats
}
