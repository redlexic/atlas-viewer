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
