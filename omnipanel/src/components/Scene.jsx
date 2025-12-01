import { useContext, useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { PlaneComposite } from './PlaneComposite'
import { SceneContext } from '../context/SceneContext'
import { useZoomToTile } from '../hooks/useZoomToTile'
import { useViewModes } from '../hooks/useViewModes'
import { DatasetSwitcher } from './hud/DatasetSwitcher'
import { AlgorithmSwitcher } from './hud/AlgorithmSwitcher'
import { HighlightControls } from './hud/HighlightControls'

function SceneContent({ controlsRef, selectedDatasets, highlightMode }) {
  const { selectedTile, isOrthographic } = useContext(SceneContext)

  // Pan to selected tile (maintains zoom) + mouse wheel zoom control
  useZoomToTile(selectedTile, controlsRef, isOrthographic)

  return <PlaneComposite selectedDatasets={selectedDatasets} highlightMode={highlightMode} />
}

export function Scene() {
  const { isOrthographic, treeBounds, selectedTile } = useContext(SceneContext)
  const controlsRef = useRef()
  const [selectedDatasets, setSelectedDatasets] = useState(['launch_agent_6'])
  const [camera, setCamera] = useState(null)
  const [highlightMode, setHighlightMode] = useState('none') // 'none', 'full', 'partial'

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
      if (prev.includes(datasetId)) {
        // Remove if already selected (but keep at least one)
        return prev.length > 1 ? prev.filter(id => id !== datasetId) : prev
      } else {
        // Add if not selected
        return [...prev, datasetId]
      }
    })
  }

  return (
    <>
      {/* Dataset switcher - rendered outside Canvas as DOM element */}
      <DatasetSwitcher selectedDatasets={selectedDatasets} onDatasetToggle={handleDatasetToggle} />

      {/* Algorithm switcher - switch between tree layout algorithms */}
      {/* <AlgorithmSwitcher /> */}

      {/* Highlight controls - highlight nodes by occupancy */}
      <HighlightControls highlightMode={highlightMode} onHighlightChange={setHighlightMode} />

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

        {/* Camera controls - wheel zoom, right-click pan */}
        <OrbitControls
          ref={controlsRef}
          enableRotate={false}  // Disable rotation for top-down view
          enablePan={true}      // Enable panning with right-click/drag
          enableZoom={true}     // Enable wheel zoom (handled by custom hook)
          enableDamping={false} // Disable damping for immediate response
          panSpeed={2.0}        // Increased for more responsive panning
          zoomSpeed={0.5}
          minZoom={0.1}         // Zoom out limit - allow very far zoom
          maxZoom={20}          // Zoom in limit - allow closer zoom
        />

        <SceneContent controlsRef={controlsRef} selectedDatasets={selectedDatasets} highlightMode={highlightMode} />
      </Canvas>
    </>
  )
}