import { useEffect, useMemo, useContext } from 'react'
import { SceneContext } from '../context/SceneContext'
import { buildTree, flattenTree } from '../utils/treeParser'

/**
 * Keyboard navigation for tree nodes
 *
 * Navigation semantics:
 * - Right Arrow: Move to next node in depth-first order
 * - Left Arrow: Move to previous node in depth-first order
 * - Escape: Deselect current node
 *
 * Depth-first order example:
 *   A
 *   ├─ B
 *   │  ├─ D
 *   │  └─ E
 *   └─ C
 *      └─ F
 *
 * Order: A → B → D → E → C → F
 */
export function useKeyboardNavigation(nodes) {
  const { selectedTile, selectTile, updateNavigationState } = useContext(SceneContext)

  // Flatten tree into depth-first traversal order
  const flattenedNodes = useMemo(() => {
    if (!nodes || nodes.length === 0) return []

    // Build tree structure
    const tree = buildTree(nodes)

    // Flatten to depth-first order
    const flat = flattenTree(tree)

    return flat
  }, [nodes])

  // Find index of currently selected node
  const currentIndex = useMemo(() => {
    if (!selectedTile || flattenedNodes.length === 0) return -1

    return flattenedNodes.findIndex(node => node.doc_no === selectedTile.doc_no)
  }, [selectedTile, flattenedNodes])

  // Update navigation state in context
  useEffect(() => {
    updateNavigationState(currentIndex, flattenedNodes.length)
  }, [currentIndex, flattenedNodes.length, updateNavigationState])

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore if user is typing in an input/textarea
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return
      }

      // Ignore if no nodes available
      if (flattenedNodes.length === 0) return

      let newIndex = -1

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          // Move to next node
          if (currentIndex === -1) {
            // No selection, select first node
            newIndex = 0
          } else if (currentIndex < flattenedNodes.length - 1) {
            // Move to next node
            newIndex = currentIndex + 1
          } else {
            // At last node, wrap to first
            newIndex = 0
          }
          break

        case 'ArrowLeft':
          event.preventDefault()
          // Move to previous node
          if (currentIndex === -1) {
            // No selection, select last node
            newIndex = flattenedNodes.length - 1
          } else if (currentIndex > 0) {
            // Move to previous node
            newIndex = currentIndex - 1
          } else {
            // At first node, wrap to last
            newIndex = flattenedNodes.length - 1
          }
          break

        case 'Escape':
          event.preventDefault()
          // Deselect current node
          selectTile(null)
          return

        default:
          return
      }

      // Select the new node
      if (newIndex !== -1 && flattenedNodes[newIndex]) {
        const node = flattenedNodes[newIndex]

        // Add x, y coordinates if available from layout
        // The parent component should have this info
        selectTile(node)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [flattenedNodes, currentIndex, selectTile])

  // Return flattened nodes and current index for debugging
  return {
    flattenedNodes,
    currentIndex,
    totalNodes: flattenedNodes.length
  }
}
