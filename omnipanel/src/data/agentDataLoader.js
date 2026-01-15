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
 * Load full Atlas data (latest version)
 * @returns {Promise<Array>} - Full Atlas data
 */
export async function loadAtlas() {
  return loadAgentData('atlas-2026-01-14.json')
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
 * Load Obex Agent data (extract from Full Atlas)
 * @returns {Promise<Array>} - Obex Agent subtree
 */
export async function loadObexAgent() {
  const atlas = await loadAtlas()
  const agent = findNodeByDocNo(atlas, 'A.6.1.1.5')

  if (!agent) {
    throw new Error('Obex Agent (A.6.1.1.5) not found in Atlas data')
  }

  return [agent]
}

/**
 * Load Launch Agent 5 data (extract from Full Atlas)
 * @returns {Promise<Array>} - Launch Agent 5 subtree
 */
export async function loadLaunchAgent5() {
  const atlas = await loadAtlas()
  const agent = findNodeByDocNo(atlas, 'A.6.1.1.6')

  if (!agent) {
    throw new Error('Launch Agent 5 (A.6.1.1.6) not found in Atlas data')
  }

  return [agent]
}

/**
 * Load a specific Atlas scope by doc_no
 * @param {string} scopeDocNo - The scope doc_no (e.g., 'A.0', 'A.1')
 * @returns {Promise<Array>} - Scope data as array with single root
 */
async function loadScope(scopeDocNo) {
  const atlas = await loadAtlas()
  const scope = atlas.find(node => node.doc_no === scopeDocNo)
  if (!scope) {
    throw new Error(`Scope ${scopeDocNo} not found in Atlas`)
  }
  return [scope]
}

// Scope loader factories
export const loadScopeA0 = () => loadScope('A.0')
export const loadScopeA1 = () => loadScope('A.1')
export const loadScopeA2 = () => loadScope('A.2')
export const loadScopeA3 = () => loadScope('A.3')
export const loadScopeA4 = () => loadScope('A.4')
export const loadScopeA5 = () => loadScope('A.5')
export const loadScopeA6 = () => loadScope('A.6')

/**
 * Available datasets
 */
export const DATASETS = {
  // Atlas Scopes (A.0 through A.6) - only one viewable at a time
  SCOPE_A0: { id: 'scope_a0', name: 'A.0 Preamble', loader: loadScopeA0, isScope: true },
  SCOPE_A1: { id: 'scope_a1', name: 'A.1 Governance', loader: loadScopeA1, isScope: true },
  SCOPE_A2: { id: 'scope_a2', name: 'A.2 Support', loader: loadScopeA2, isScope: true },
  SCOPE_A3: { id: 'scope_a3', name: 'A.3 Stability', loader: loadScopeA3, isScope: true },
  SCOPE_A4: { id: 'scope_a4', name: 'A.4 Protocol', loader: loadScopeA4, isScope: true },
  SCOPE_A5: { id: 'scope_a5', name: 'A.5 Accessibility', loader: loadScopeA5, isScope: true },
  SCOPE_A6: { id: 'scope_a6', name: 'A.6 Agent', loader: loadScopeA6, isScope: true },
  // Individual agents (can be combined for comparison)
  SPARK: { id: 'spark', name: 'Spark', loader: loadSparkAgent },
  GROVE: { id: 'grove', name: 'Grove', loader: loadGroveAgent },
  KEEL: { id: 'keel', name: 'Keel', loader: loadKeelAgent },
  LAUNCH_AGENT_3: { id: 'launch_agent_3', name: 'Launch Agent 3', loader: loadLaunchAgent3 },
  OBEX: { id: 'obex', name: 'Obex', loader: loadObexAgent },
  LAUNCH_AGENT_5: { id: 'launch_agent_5', name: 'Launch Agent 5', loader: loadLaunchAgent5 },
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
