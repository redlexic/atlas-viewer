import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Hook to implement camera controls for 2D tree view
 *
 * Features:
 * - Selection (click or keyboard): Pans camera to center on selected node (maintains current zoom)
 * - Mouse wheel: Zoom toward mouse cursor position
 * - Smooth interpolation for fluid movement
 *
 * Zoom limits are dynamically calculated based on tree bounds to ensure
 * the entire tree can be viewed.
 */
export function useZoomToTile(selectedTile, controlsRef, isOrthographic) {
  const { gl, camera } = useThree()

  // Animation targets
  const targetZoom = useRef(null)
  const targetPosition = useRef(null)

  // For detecting tile changes
  const previousTileRef = useRef(null)

  // Pan camera to center on selected tile (without changing zoom)
  useEffect(() => {
    if (selectedTile && selectedTile.x !== undefined && selectedTile.y !== undefined && controlsRef?.current) {
      const isDifferentTile = !previousTileRef.current ||
        previousTileRef.current.doc_no !== selectedTile.doc_no

      if (isDifferentTile) {
        targetPosition.current = {
          x: selectedTile.x,
          y: -selectedTile.y // Invert Y for world coordinates
        }
        previousTileRef.current = selectedTile
      }
    }
  }, [selectedTile, controlsRef])

  // Smooth camera movement animation
  useFrame((_state, delta) => {
    if (!controlsRef?.current) return

    const controls = controlsRef.current
    const camPos = camera.position

    // Priority 1: Pan to selected tile (maintain current zoom)
    if (targetPosition.current !== null) {
      const targetX = targetPosition.current.x
      const targetY = targetPosition.current.y

      // Smooth interpolation
      const lerpFactor = 1 - Math.pow(0.05, delta)
      const newX = camPos.x + (targetX - camPos.x) * lerpFactor
      const newY = camPos.y + (targetY - camPos.y) * lerpFactor

      // Snap when close
      if (Math.abs(newX - targetX) < 0.01 && Math.abs(newY - targetY) < 0.01) {
        camera.position.x = targetX
        camera.position.y = targetY
        controls.target.x = targetX
        controls.target.y = targetY
        targetPosition.current = null
      } else {
        camera.position.x = newX
        camera.position.y = newY
        controls.target.x = newX
        controls.target.y = newY
      }
    }
    // Priority 2: Mouse wheel zooming toward cursor
    else if (targetZoom.current !== null) {
      const currentZ = camPos.z
      const targetZ = targetZoom.current.z
      const mouseX = targetZoom.current.mouseX
      const mouseY = targetZoom.current.mouseY

      // Smooth interpolation
      const lerpFactor = 1 - Math.pow(0.05, delta)
      const newZ = currentZ + (targetZ - currentZ) * lerpFactor

      // Snap when close
      if (Math.abs(newZ - targetZ) < 0.05) {
        // Final snap - calculate exact position
        const zoomFactor = targetZ / currentZ
        const finalX = mouseX + (camPos.x - mouseX) * zoomFactor
        const finalY = mouseY + (camPos.y - mouseY) * zoomFactor

        camera.position.set(finalX, finalY, targetZ)
        controls.target.set(finalX, finalY, 0)
        targetZoom.current = null
      } else {
        // Interpolate position to keep mouse point stationary on screen
        const zoomFactor = newZ / currentZ
        const newX = mouseX + (camPos.x - mouseX) * zoomFactor
        const newY = mouseY + (camPos.y - mouseY) * zoomFactor

        camera.position.set(newX, newY, newZ)
        controls.target.set(newX, newY, 0)
      }
    }

    if (isOrthographic) {
      camera.updateProjectionMatrix()
    }

    controls.update()
  })

  // Custom wheel handler for zoom-toward-mouse
  useEffect(() => {
    if (!controlsRef?.current) return

    const controls = controlsRef.current
    const canvas = gl.domElement

    // Zoom limits - very generous to allow seeing entire large trees
    const minZ = 0.5    // Very close zoom
    const maxZ = 500    // Very far zoom (can see huge trees)

    const handleWheel = (event) => {
      event.preventDefault()
      event.stopPropagation()

      // Calculate mouse world position at the moment of wheel event
      // This is the key fix - capture position NOW, not during animation
      const rect = canvas.getBoundingClientRect()
      const mouseNDC = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
      }

      // Raycast to z=0 plane to get world position under mouse
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(new THREE.Vector2(mouseNDC.x, mouseNDC.y), camera)

      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const intersectPoint = new THREE.Vector3()
      raycaster.ray.intersectPlane(planeZ, intersectPoint)

      if (!intersectPoint) return

      const mouseWorldX = intersectPoint.x
      const mouseWorldY = intersectPoint.y

      // Get current Z (use target if animating, else current position)
      const currentZ = targetZoom.current !== null ? targetZoom.current.z : camera.position.z

      // Calculate new zoom level
      const zoomIn = event.deltaY < 0
      let newTargetZ

      if (zoomIn) {
        newTargetZ = currentZ * 0.75  // Zoom in 25%
      } else {
        newTargetZ = currentZ * 1.35  // Zoom out 35%
      }

      // Clamp to limits
      newTargetZ = Math.max(minZ, Math.min(maxZ, newTargetZ))

      // Don't update if already at limit
      if ((zoomIn && currentZ <= minZ + 0.05) || (!zoomIn && currentZ >= maxZ - 0.5)) {
        return
      }

      // Store zoom target WITH the mouse position captured at this moment
      targetZoom.current = {
        z: newTargetZ,
        mouseX: mouseWorldX,
        mouseY: mouseWorldY
      }
    }

    // Disable MapControls' built-in zoom so we can handle it
    controls.enableZoom = false

    canvas.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      canvas.removeEventListener('wheel', handleWheel)
      controls.enableZoom = true
    }
  }, [controlsRef, gl, camera])
}
