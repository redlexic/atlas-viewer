import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Hook to implement zoom-toward-mouse behavior
 * - Scrolling zooms in/out toward wherever the mouse is pointing
 * - Camera always points straight down
 * - Smooth interpolation for fluid zooming
 */
export function useZoomToTile(selectedTile, controlsRef, isOrthographic) {
  const { gl, camera } = useThree()
  const zoomVelocity = useRef(0) // Accumulated zoom velocity for smooth movement
  const mouseWorldPos = useRef({ x: 0, y: 0 }) // Mouse position in world coordinates
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())

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

  // Smooth camera movement animation - zoom toward mouse
  useFrame((_state, delta) => {
    if (!controlsRef?.current) return

    const controls = controlsRef.current
    const camPos = camera.position

    const minZ = 0.5
    const maxZ = 100  // Allow zooming very far out to see entire tree

    // Only move camera when there's scroll velocity
    if (Math.abs(zoomVelocity.current) > 0.001) {
      const zMove = zoomVelocity.current * delta * 60
      let newZ = camPos.z + zMove

      // Clamp Z to bounds
      newZ = Math.max(minZ, Math.min(maxZ, newZ))

      // Zoom toward mouse position - scale camera offset from mouse point
      const mouseX = mouseWorldPos.current.x
      const mouseY = mouseWorldPos.current.y

      // Calculate new camera position to keep mouse point at same screen position
      const zoomFactor = newZ / camPos.z
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

    // Decay velocity for smooth stop
    zoomVelocity.current *= 0.92
  })

  // Custom wheel handler for zoom-toward-mouse
  useEffect(() => {
    if (!controlsRef?.current) return

    const controls = controlsRef.current

    const handleWheel = (event) => {
      event.preventDefault()
      event.stopPropagation()

      // Accumulate velocity for smooth zooming
      const zoomAcceleration = 0.075 // How much each wheel tick adds to velocity (lower = slower zoom)
      // Scroll toward you (up) = zoom in, scroll away (down) = zoom out
      const delta = Math.sign(event.deltaY) * zoomAcceleration

      // Add to velocity (will be applied smoothly in useFrame toward mouse position)
      zoomVelocity.current += delta

      // Cap maximum velocity
      const maxVelocity = 3.0
      zoomVelocity.current = Math.max(-maxVelocity, Math.min(maxVelocity, zoomVelocity.current))
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
  }, [controlsRef, gl])
}
