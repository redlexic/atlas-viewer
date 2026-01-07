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
  const [selectedDatasets, setSelectedDatasets] = useState(['launch_agent_5'])
  const [camera, setCamera] = useState(null)

  // Get camera reference from controls
  useEffect(() => {
    if (controlsRef?.current) {
      setCamera(controlsRef.current.object)
    }
  }, [controlsRef.current])

  // Spacebar view mode toggling
  useViewModes(camera, controlsRef, treeBounds, selectedTile)

  // Initial pan to center of tree on load (no zoom, user controls zoom via scroll wheel)
  const hasInitializedRef = useRef(false)
  useEffect(() => {
    if (!treeBounds || !controlsRef?.current || !camera) return
    if (hasInitializedRef.current) {
      console.log('[Scene] Initial pan skipped (already initialized)')
      return // Only pan once on initial load
    }

    console.log('[Scene] Running initial pan to center tree (no zoom)')
    const { minX, maxX, minY, maxY } = treeBounds

    // Calculate center of tree
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    // Pan to center (keep initial zoom level from camera config)
    const controls = controlsRef.current
    camera.position.x = centerX
    camera.position.y = -centerY
    // camera.position.z stays at initial value (5)

    controls.target.x = centerX
    controls.target.y = -centerY
    controls.target.z = 0

    controls.update()
    hasInitializedRef.current = true
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
        return ['launch_agent_5']
      }
      // Otherwise, select only this scope
      return [scopeId]
    })
    // Reset initialization so camera re-centers on new data
    hasInitializedRef.current = false
  }

  return (
    <>
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
