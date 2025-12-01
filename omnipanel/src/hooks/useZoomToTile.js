import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Hook to implement camera controls
 * - Selection (click or keyboard): Pans camera to center on selected node (maintains current zoom)
 * - Mouse wheel: Gradiated zoom in/out toward mouse position (each scroll moves halfway to limit)
 * - Camera always points straight down
 * - Smooth interpolation for fluid movement
 */
export function useZoomToTile(selectedTile, controlsRef, isOrthographic) {
  const { gl, camera } = useThree()
  const targetZoom = useRef(null) // Target zoom level for gradiated zooming
  const targetPosition = useRef(null) // Target X,Y position for panning to selected tile
  const mouseWorldPos = useRef({ x: 0, y: 0 }) // Mouse position in world coordinates
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const previousTileRef = useRef(null)

  // Pan camera to center on selected tile (without changing zoom)
  useEffect(() => {
    if (selectedTile && selectedTile.x !== undefined && selectedTile.y !== undefined && controlsRef?.current) {
      // Check if we're moving to a different tile
      const isDifferentTile = !previousTileRef.current ||
        previousTileRef.current.doc_no !== selectedTile.doc_no

      console.log('[useZoomToTile] Selected tile changed:', {
        doc_no: selectedTile.doc_no,
        x: selectedTile.x,
        y: selectedTile.y,
        isDifferentTile,
        previousTile: previousTileRef.current?.doc_no
      })

      if (isDifferentTile) {
        // Set target position to pan to (keep current Z)
        targetPosition.current = {
          x: selectedTile.x,
          y: -selectedTile.y // Invert Y for world coordinates
        }
        console.log('[useZoomToTile] Setting target position:', targetPosition.current)
        previousTileRef.current = selectedTile
      }
    }
  }, [selectedTile, controlsRef])

  // Track mouse position for zoom-toward-mouse
  useEffect(() => {
    const canvas = gl.domElement

    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      // Raycast to find world position at z=0 plane
      raycaster.current.setFromCamera(mouse.current, camera)

      // Intersect with z=0 plane
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const intersectPoint = new THREE.Vector3()
      raycaster.current.ray.intersectPlane(planeZ, intersectPoint)

      if (intersectPoint) {
        mouseWorldPos.current.x = intersectPoint.x
        mouseWorldPos.current.y = intersectPoint.y
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    return () => canvas.removeEventListener('mousemove', handleMouseMove)
  }, [gl, camera])

  // Smooth camera movement animation - panning to selected tile and mouse wheel zoom
  useFrame((_state, delta) => {
    if (!controlsRef?.current) return

    const controls = controlsRef.current
    const camPos = camera.position

    // Priority 1: Pan to selected tile (maintain current zoom)
    if (targetPosition.current !== null) {
      const targetX = targetPosition.current.x
      const targetY = targetPosition.current.y

      // Smooth interpolation to target position
      const lerpFactor = 1 - Math.pow(0.05, delta)
      const newX = camPos.x + (targetX - camPos.x) * lerpFactor
      const newY = camPos.y + (targetY - camPos.y) * lerpFactor

      // If very close to target, snap to it and clear target
      if (Math.abs(newX - targetX) < 0.01 && Math.abs(newY - targetY) < 0.01) {
        camera.position.x = targetX
        camera.position.y = targetY
        controls.target.x = targetX
        controls.target.y = targetY
        targetPosition.current = null
      } else {
        // Update camera position (keep Z unchanged)
        camera.position.x = newX
        camera.position.y = newY
        controls.target.x = newX
        controls.target.y = newY
      }
    }
    // Priority 2: Mouse wheel zooming - gradiated approach
    else if (targetZoom.current !== null) {
      const currentZ = camPos.z
      const targetZ = targetZoom.current

      // Interpolate halfway to target each frame (adjusted for delta time)
      const lerpFactor = 1 - Math.pow(0.05, delta) // Smooth interpolation
      const newZ = currentZ + (targetZ - currentZ) * lerpFactor

      // If very close to target, snap to it and clear target
      if (Math.abs(newZ - targetZ) < 0.01) {
        targetZoom.current = null
      }

      // Zoom toward mouse position - scale camera offset from mouse point
      const mouseX = mouseWorldPos.current.x
      const mouseY = mouseWorldPos.current.y

      // Calculate new camera position to keep mouse point at same screen position
      const zoomFactor = newZ / currentZ
      const newX = mouseX + (camPos.x - mouseX) * zoomFactor
      const newY = mouseY + (camPos.y - mouseY) * zoomFactor

      // Update camera position
      camera.position.set(newX, newY, newZ)
      controls.target.set(newX, newY, 0)
    }

    if (isOrthographic) {
      camera.updateProjectionMatrix()
    }

    controls.update()
  })

  // Custom wheel handler for gradiated zoom-toward-mouse
  useEffect(() => {
    if (!controlsRef?.current) return

    const controls = controlsRef.current
    const minZ = 1.5  // Increased to prevent getting too close
    const maxZ = 100

    const handleWheel = (event) => {
      event.preventDefault()
      event.stopPropagation()

      const currentZ = targetZoom.current !== null ? targetZoom.current : camera.position.z

      // Determine zoom direction and calculate new target
      const zoomIn = event.deltaY < 0
      let newTarget

      if (zoomIn) {
        // Zoom in: multiply by factor for consistent speed
        newTarget = currentZ * 0.7
      } else {
        // Zoom out: multiply by factor for consistent speed
        newTarget = currentZ * 1.3
      }

      // Clamp to limits
      newTarget = Math.max(minZ, Math.min(maxZ, newTarget))

      // If we're already at the limit, don't update target
      if ((zoomIn && currentZ <= minZ + 0.1) || (!zoomIn && currentZ >= maxZ - 0.1)) {
        return
      }

      targetZoom.current = newTarget
    }

    // Disable OrbitControls' built-in zoom
    controls.enableZoom = false

    // Add custom wheel listener to canvas
    const canvas = gl.domElement
    canvas.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      canvas.removeEventListener('wheel', handleWheel)
      controls.enableZoom = true
    }
  }, [controlsRef, gl, camera])
}
