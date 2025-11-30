/**
 * Parse Atlas nodes into tree hierarchy
 *
 * Supports two formats:
 * 1. Nested format with agent_scope_database (preferred - from agent artifacts)
 * 2. Flat array with doc_no parsing (legacy - for simple data)
 */

/**
 * Get children from nested agent artifact format
 * Looks for any array field containing nodes (agent_scope_database, etc.)
 */
function getChildrenFromNode(node) {
  // First try agent_scope_database (standard field)
  if (node.agent_scope_database && Array.isArray(node.agent_scope_database)) {
    return node.agent_scope_database
  }

  // Otherwise look for any array field containing nodes
  for (const key in node) {
    const value = node[key]
    if (Array.isArray(value) && value.length > 0) {
      if (value[0] && typeof value[0] === 'object' && 'type' in value[0] && 'doc_no' in value[0]) {
        return value
      }
    }
  }

  return []
}

/**
 * Get parent doc_no from a child doc_no
 * @param {string} docNo - Document number (e.g., "A.1.2")
 * @returns {string|null} Parent doc_no (e.g., "A.1") or null if root
 */
export function getParentDocNo(docNo) {
  const parts = docNo.split('.')
  if (parts.length <= 1) {
    // Root node has no parent
    return null
  }
  // Remove last part to get parent
  return parts.slice(0, -1).join('.')
}

/**
 * Get depth level of a node (0 = root, 1 = first level, etc.)
 * @param {string} docNo - Document number
 * @returns {number} Depth level
 */
export function getNodeDepth(docNo) {
  return docNo.split('.').length - 1
}

/**
 * Build tree from nested agent artifact format
 * @param {Object} rootNode - Root node with agent_scope_database
 * @returns {Array} Array with single root (for consistency with buildTree)
 */
export function buildTreeFromNested(rootNode) {
  function processNode(node) {
    const children = getChildrenFromNode(node)
    return {
      ...node,
      children: children.map(child => processNode(child))
    }
  }

  return [processNode(rootNode)]
}

/**
 * Build tree structure from flat array of nodes (legacy format)
 * @param {Array} nodes - Flat array of Atlas nodes with doc_no
 * @returns {Array} Array of root nodes with children property
 */
export function buildTree(nodes) {
  // If nodes is a single object with agent_scope_database, use nested format
  if (!Array.isArray(nodes) && nodes.agent_scope_database) {
    return buildTreeFromNested(nodes)
  }

  // If nodes is an array with a single nested object, use nested format
  if (Array.isArray(nodes) && nodes.length === 1 && nodes[0].agent_scope_database) {
    return buildTreeFromNested(nodes[0])
  }

  // If nodes already have children property and appears to be a tree structure (not flattened)
  // A tree has few root nodes, a flattened array has all nodes
  if (Array.isArray(nodes) && nodes.length > 0 && nodes.length < 10 && nodes[0].children !== undefined) {
    // Check if this looks like a tree structure (roots with children)
    const hasValidTreeStructure = nodes.every(node =>
      Array.isArray(node.children) && (node.children.length > 0 || nodes.length === 1)
    )
    if (hasValidTreeStructure) {
      return nodes
    }
  }

  // Create a map for quick lookup
  const nodeMap = new Map()

  // First pass: create tree nodes and map them
  nodes.forEach(node => {
    nodeMap.set(node.doc_no, {
      ...node,
      children: []
    })
  })

  // Second pass: build parent-child relationships
  const roots = []

  nodes.forEach(node => {
    const treeNode = nodeMap.get(node.doc_no)
    const parentDocNo = getParentDocNo(node.doc_no)

    if (parentDocNo === null) {
      // This is a root node
      roots.push(treeNode)
    } else {
      // Find parent and add this node as child
      const parent = nodeMap.get(parentDocNo)
      if (parent) {
        parent.children.push(treeNode)
      } else {
        // Parent doesn't exist - treat as root
        console.warn(`Parent "${parentDocNo}" not found for node "${node.doc_no}"`)
        roots.push(treeNode)
      }
    }
  })

  return roots
}

/**
 * Traverse tree in depth-first order
 * @param {Array} roots - Array of root tree nodes
 * @param {Function} callback - Function called for each node (node, depth, parent)
 */
export function traverseTree(roots, callback, depth = 0, parent = null) {
  roots.forEach(node => {
    callback(node, depth, parent)
    if (node.children && node.children.length > 0) {
      traverseTree(node.children, callback, depth + 1, node)
    }
  })
}

/**
 * Get all nodes as flat array (useful for debugging)
 * @param {Array} roots - Array of root tree nodes
 * @returns {Array} Flat array of all nodes
 */
export function flattenTree(roots) {
  const flat = []
  traverseTree(roots, (node) => {
    flat.push(node)
  })
  return flat
}

/**
 * Get tree statistics
 * @param {Array} roots - Array of root tree nodes
 * @returns {Object} Statistics about the tree
 */
export function getTreeStats(roots) {
  let maxDepth = 0
  let nodeCount = 0
  const nodesPerLevel = []

  traverseTree(roots, (node, depth) => {
    nodeCount++
    maxDepth = Math.max(maxDepth, depth)

    if (!nodesPerLevel[depth]) {
      nodesPerLevel[depth] = 0
    }
    nodesPerLevel[depth]++
  })

  return {
    totalNodes: nodeCount,
    maxDepth,
    nodesPerLevel,
    rootCount: roots.length
  }
}
