import { useContext, useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { MapControls } from '@react-three/drei'
import { PlaneComposite } from './PlaneComposite'
import { SceneContext } from '../context/SceneContext'
import { useZoomToTile } from '../hooks/useZoomToTile'
import { useViewModes } from '../hooks/useViewModes'
import { DatasetSwitcher } from './hud/DatasetSwitcher'
import { AlgorithmSwitcher } from './hud/AlgorithmSwitcher'
import { TagSelector } from './hud/TagSelector'
import { TaggedNodesList } from './hud/TaggedNodesList'

function SceneContent({ controlsRef, selectedDatasets }) {
  const { selectedTile, isOrthographic } = useContext(SceneContext)

  // Pan to selected tile (maintains zoom) + mouse wheel zoom control
  useZoomToTile(selectedTile, controlsRef, isOrthographic)

  return <PlaneComposite selectedDatasets={selectedDatasets} />
}

export function Scene() {
  const { isOrthographic, treeBounds, selectedTile } = useContext(SceneContext)
  const controlsRef = useRef()
  const [selectedDatasets, setSelectedDatasets] = useState(['prysm'])
  const [camera, setCamera] = useState(null)

  // Get camera reference from controls
  useEffect(() => {
    if (controlsRef?.current) {
      setCamera(controlsRef.current.object)
    }
  }, [controlsRef.current])

  // Spacebar view mode toggling
  useViewModes(camera, controlsRef, treeBounds, selectedTile)

  // Track previous tree bounds center to compensate for layout shifts
  const prevBoundsCenterRef = useRef(null)
  const hasInitializedRef = useRef(false)

  // Initial pan and zoom to fit tree on load
  // After initialization, compensate for layout shifts when adding agents
  useEffect(() => {
    if (!treeBounds || !controlsRef?.current || !camera) return

    const { minX, maxX, minY, maxY } = treeBounds
    const newCenterX = (minX + maxX) / 2
    const newCenterY = (minY + maxY) / 2

    // INITIAL SETUP: First time seeing valid bounds
    if (!hasInitializedRef.current) {
      console.log('[Scene] Initial camera setup - fitting tree in view')

      // Calculate tree dimensions
      const treeWidth = maxX - minX + 2 // Add padding
      const treeHeight = maxY - minY + 2

      // Calculate zoom to fit tree in view (orthographic)
      const aspectRatio = window.innerWidth / window.innerHeight
      const fitWidth = treeWidth / 2 / aspectRatio
      const fitHeight = treeHeight / 2
      const targetZ = Math.max(fitWidth, fitHeight, 5) // Minimum Z of 5

      const controls = controlsRef.current
      camera.position.x = newCenterX
      camera.position.y = -newCenterY
      camera.position.z = targetZ

      controls.target.x = newCenterX
      controls.target.y = -newCenterY
      controls.target.z = 0

      controls.update()
      console.log(`[Scene] Camera positioned at z=${targetZ.toFixed(1)} to fit tree ${treeWidth.toFixed(1)}x${treeHeight.toFixed(1)}`)

      prevBoundsCenterRef.current = { x: newCenterX, y: newCenterY }
      hasInitializedRef.current = true
      return
    }

    // SUBSEQUENT UPDATES: Compensate for layout shift when adding/removing agents
    if (prevBoundsCenterRef.current) {
      const prevCenter = prevBoundsCenterRef.current
      const deltaX = newCenterX - prevCenter.x
      const deltaY = newCenterY - prevCenter.y

      // Only adjust if there's a meaningful shift (> 0.1 units)
      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        const controls = controlsRef.current

        // Shift camera to compensate - keeps tree visually stable
        camera.position.x += deltaX
        camera.position.y -= deltaY // Y is inverted in world coords
        controls.target.x += deltaX
        controls.target.y -= deltaY

        controls.update()
        console.log(`[Scene] Compensated for layout shift: dx=${deltaX.toFixed(2)}, dy=${deltaY.toFixed(2)}`)
      }

      prevBoundsCenterRef.current = { x: newCenterX, y: newCenterY }
    }
  }, [treeBounds, camera])

  const handleDatasetToggle = (datasetId) => {
    setSelectedDatasets(prev => {
      // If a scope is currently selected, ignore agent toggles
      if (prev.some(id => id.startsWith('scope_'))) {
        return prev
      }

      if (prev.includes(datasetId)) {
        // Remove if already selected (but keep at least one)
        return prev.length > 1 ? prev.filter(id => id !== datasetId) : prev
      } else {
        // Add if not selected
        return [...prev, datasetId]
      }
    })
  }

  const handleScopeSelect = (scopeId) => {
    setSelectedDatasets(prev => {
      // If clicking the same scope, deselect and go back to default agent
      if (prev.includes(scopeId)) {
        return ['prysm']
      }
      // Otherwise, select only this scope
      return [scopeId]
    })
    // Reset initialization so camera re-centers on new data
    hasInitializedRef.current = false
  }

  return (
    <>
      {/* Left panel stack - properly stacked without overlap */}
      <div className="left-panel-stack">
        {/* Dataset switcher - rendered outside Canvas as DOM element */}
        <DatasetSwitcher
          selectedDatasets={selectedDatasets}
          onDatasetToggle={handleDatasetToggle}
          onScopeSelect={handleScopeSelect}
        />

        {/* Tag selector - filter and navigate by semantic tags */}
        <TagSelector />

        {/* Tagged nodes list - shows all nodes matching selected tag */}
        <TaggedNodesList />
      </div>

      <Canvas
        key={isOrthographic ? 'ortho' : 'persp'}
        orthographic={isOrthographic}
        camera={{
          position: [0, 0, 5],
          fov: 75,
          zoom: 1
        }}
        style={{
          pointerEvents: 'auto'
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* MapControls - designed for 2D/top-down views
            - Left-click drag to pan (like Miro/Illustrator hand tool)
            - Right-click drag also pans
            - Scroll wheel zooms (handled by custom hook for zoom-toward-mouse)
        */}
        <MapControls
          ref={controlsRef}
          enableRotate={false}    // Disable rotation for top-down view
          enablePan={true}        // Enable panning with left-click drag
          enableZoom={true}       // Will be overridden by custom handler
          enableDamping={false}   // Disable damping for immediate response
          panSpeed={1.5}          // Pan speed multiplier
          screenSpacePanning={true} // Pan in screen space (more intuitive)
        />

        <SceneContent controlsRef={controlsRef} selectedDatasets={selectedDatasets} />
      </Canvas>
    </>
  )
}
