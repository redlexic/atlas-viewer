/**
 * Agent data loading utilities
 * Handles fetching and parsing agent JSON files
 */

import { ATLAS_FILES } from '../config/dataPaths'

/**
 * Load agent data from a JSON file
 * @param {string} path - Full path to JSON file (relative to public/)
 * @returns {Promise<Object>} - Parsed agent data
 */
export async function loadAgentData(path) {
  try {
    const response = await fetch(path)

    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.statusText}`)
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
  return loadAgentData(ATLAS_FILES.current)
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
 * Load agent at A.6.1.1.4 (SkyBase, formerly Launch Agent 3)
 * @returns {Promise<Array>} - Agent subtree
 */
export async function loadAgent4() {
  const atlas = await loadAtlas()
  const agent = findNodeByDocNo(atlas, 'A.6.1.1.4')

  if (!agent) {
    throw new Error('Agent A.6.1.1.4 not found in Atlas data')
  }

  return [agent]
}

// Legacy alias for backwards compatibility
export const loadLaunchAgent3 = loadAgent4

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
 * Load agent at A.6.1.1.6 (formerly Launch Agent 5)
 * @returns {Promise<Array>} - Agent subtree
 */
export async function loadAgent6() {
  const atlas = await loadAtlas()
  const agent = findNodeByDocNo(atlas, 'A.6.1.1.6')

  if (!agent) {
    throw new Error('Agent A.6.1.1.6 not found in Atlas data')
  }

  return [agent]
}

// Legacy alias for backwards compatibility
export const loadLaunchAgent5 = loadAgent6

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
 * Note: Agent IDs must match keys used in color mappings (DatasetSwitcher.jsx, TreeView.jsx)
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
  // Individual agents - IDs match color keys in DatasetSwitcher/TreeView
  SPARK: { id: 'spark', name: 'Spark', docNo: 'A.6.1.1.1', loader: loadSparkAgent },
  GROVE: { id: 'grove', name: 'Grove', docNo: 'A.6.1.1.2', loader: loadGroveAgent },
  KEEL: { id: 'keel', name: 'Keel', docNo: 'A.6.1.1.3', loader: loadKeelAgent },
  SKYBASE: { id: 'skybase', name: 'SkyBase', docNo: 'A.6.1.1.4', loader: loadAgent4 },
  OBEX: { id: 'obex', name: 'Obex', docNo: 'A.6.1.1.5', loader: loadObexAgent },
  PRYSM: { id: 'prysm', name: 'Prysm', docNo: 'A.6.1.1.6', loader: loadAgent6 },
}

/**
 * Load an agent and return both data and its actual name from Atlas
 * @param {string} docNo - The agent doc_no (e.g., 'A.6.1.1.4')
 * @returns {Promise<{name: string, data: Array}>}
 */
export async function loadAgentWithName(docNo) {
  const atlas = await loadAtlas()
  const agent = findNodeByDocNo(atlas, docNo)

  if (!agent) {
    throw new Error(`Agent ${docNo} not found in Atlas data`)
  }

  return { name: agent.name, data: [agent] }
}

/**
 * Get all agents from A.6.1.1.X with their current names
 * @returns {Promise<Array<{id: string, docNo: string, name: string, loader: Function}>>}
 */
export async function getAllAgentsWithNames() {
  const atlas = await loadAtlas()
  const agents = []

  // Find all agents under A.6.1.1
  for (let i = 1; i <= 10; i++) {
    const docNo = `A.6.1.1.${i}`
    const agent = findNodeByDocNo(atlas, docNo)
    if (agent) {
      agents.push({
        id: `agent_${i}`,
        docNo,
        name: agent.name,
        loader: async () => [agent]
      })
    }
  }

  return agents
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
