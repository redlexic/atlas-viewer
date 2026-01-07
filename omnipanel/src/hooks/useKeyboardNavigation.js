import { useEffect, useContext } from 'react'
import { SceneContext } from '../context/SceneContext'

/**
 * Keyboard navigation through the active set of nodes
 *
 * The active set is determined by SceneContext:
 * - When no tag is selected: all nodes
 * - When a tag is selected: only nodes matching that tag
 *
 * Navigation:
 * - Right Arrow: Move to next node in active set
 * - Left Arrow: Move to previous node in active set
 * - Escape: Deselect current node and clear tag filter
 */
export function useKeyboardNavigation() {
  const {
    activeSet,
    activeSetIndex,
    selectTile,
    updateNavigationState,
    selectedTag,
    clearTag
  } = useContext(SceneContext)

  // Update navigation state in context (shows position in HUD)
  useEffect(() => {
    updateNavigationState(activeSetIndex, activeSet.length)
  }, [activeSetIndex, activeSet.length, updateNavigationState])

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore if user is typing in an input/textarea
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return
      }

      // Ignore if no nodes in active set
      if (activeSet.length === 0) return

      let newIndex = -1

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          // Move to next node in active set
          if (activeSetIndex === -1) {
            // No selection, select first node
            newIndex = 0
          } else if (activeSetIndex < activeSet.length - 1) {
            // Move to next node
            newIndex = activeSetIndex + 1
          } else {
            // At last node, wrap to first
            newIndex = 0
          }
          break

        case 'ArrowLeft':
          event.preventDefault()
          // Move to previous node in active set
          if (activeSetIndex === -1) {
            // No selection, select last node
            newIndex = activeSet.length - 1
          } else if (activeSetIndex > 0) {
            // Move to previous node
            newIndex = activeSetIndex - 1
          } else {
            // At first node, wrap to last
            newIndex = activeSet.length - 1
          }
          break

        case 'Escape':
          event.preventDefault()
          // Deselect current node and clear tag filter
          selectTile(null)
          if (selectedTag) {
            clearTag()
          }
          return

        default:
          return
      }

      // Select the new node
      if (newIndex !== -1 && activeSet[newIndex]) {
        const node = activeSet[newIndex]
        selectTile(node)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSet, activeSetIndex, selectTile, selectedTag, clearTag])

  // Return navigation info for debugging/display
  return {
    activeSet,
    activeSetIndex,
    totalInActiveSet: activeSet.length,
    isFiltered: selectedTag !== null
  }
}
