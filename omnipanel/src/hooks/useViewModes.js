import { useEffect, useState, useCallback } from 'react'

/**
 * Hook to handle view mode toggling with spacebar
 * Cycles through: Full Tree -> Root Node -> Selected Node
 */
export function useViewModes(camera, controlsRef, treeBounds, selectedTile) {
  const [viewMode, setViewMode] = useState('full') // 'full', 'root', 'selected'

  // Toggle view mode on spacebar
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && event.target.tagName !== 'INPUT') {
        event.preventDefault()

        setViewMode(prev => {
          if (prev === 'full') return 'root'
          if (prev === 'root') return 'selected'
          return 'full'
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Apply view mode changes
  useEffect(() => {
    if (!camera || !controlsRef?.current) return

    const controls = controlsRef.current

    if (viewMode === 'full') {
      if (!treeBounds) {
        console.warn('[ViewModes] Full tree view requested but treeBounds not available')
        return
      }

      // Pan to center of tree (preserve current zoom level)
      const { minX, maxX, minY, maxY } = treeBounds
      const centerX = (minX + maxX) / 2
      const centerY = (minY + maxY) / 2

      console.log('[ViewModes] Full tree (pan only):', { centerX, centerY: -centerY, keepZ: camera.position.z })
      animateCameraPan(camera, controls, centerX, -centerY)
    }
    else if (viewMode === 'root') {
      if (!treeBounds) {
        console.warn('[ViewModes] Root view requested but treeBounds not available')
        return
      }

      // Pan to root node (preserve current zoom level)
      const { minX, maxX, minY } = treeBounds
      const rootX = (minX + maxX) / 2
      const rootY = minY // Root is at minimum Y (top of tree)

      console.log('[ViewModes] Root node (pan only):', { rootX, rootY: -rootY, keepZ: camera.position.z })
      animateCameraPan(camera, controls, rootX, -rootY)
    }
    else if (viewMode === 'selected') {
      if (!selectedTile) {
        console.warn('[ViewModes] Selected view requested but no tile selected, cycling to full')
        setViewMode('full')
        return
      }

      // Pan to selected node (preserve current zoom level)
      if (selectedTile.x !== undefined && selectedTile.y !== undefined) {
        console.log('[ViewModes] Selected node (pan only):', { x: selectedTile.x, y: -selectedTile.y, keepZ: camera.position.z })
        animateCameraPan(camera, controls, selectedTile.x, -selectedTile.y)
      } else {
        console.warn('[ViewModes] Selected tile missing position data:', selectedTile)
        setViewMode('full')
      }
    }
  }, [viewMode, camera, controlsRef, treeBounds])
  // Note: selectedTile is intentionally NOT a dependency - we only want to pan when viewMode changes,
  // not when selectedTile changes (that's handled by useZoomToTile)

  return viewMode
}

/**
 * Animate camera pan to target X,Y position (preserve current Z/zoom level)
 */
function animateCameraPan(camera, controls, targetX, targetY) {
  const duration = 800
  const startTime = Date.now()
  const startPos = {
    x: camera.position.x,
    y: camera.position.y
  }
  const startTarget = {
    x: controls.target.x,
    y: controls.target.y
  }

  // Preserve current Z (zoom level)
  const currentZ = camera.position.z

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // Ease out cubic

    // Only animate X and Y, keep Z unchanged
    camera.position.x = startPos.x + (targetX - startPos.x) * eased
    camera.position.y = startPos.y + (targetY - startPos.y) * eased
    camera.position.z = currentZ // Keep zoom level constant

    controls.target.x = startTarget.x + (targetX - startTarget.x) * eased
    controls.target.y = startTarget.y + (targetY - startTarget.y) * eased
    controls.target.z = 0 // Always look at z=0 plane

    controls.update()

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  animate()
}
