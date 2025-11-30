import { useContext, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { PlaneComposite } from './PlaneComposite'
import { SceneContext } from '../context/SceneContext'
import { useZoomToTile } from '../hooks/useZoomToTile'
import { ZoomToFitButtonWrapper } from './hud/ZoomControls'

function SceneContent({ controlsRef }) {
  const { selectedTile, isOrthographic } = useContext(SceneContext)

  // Animate camera to selected tile
  useZoomToTile(selectedTile, controlsRef, isOrthographic)

  return <PlaneComposite />
}

export function Scene() {
  const { isOrthographic } = useContext(SceneContext)
  const controlsRef = useRef()

  return (
    <>
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

        <SceneContent controlsRef={controlsRef} />
      </Canvas>

      {/* Zoom to fit button - rendered outside Canvas as DOM element */}
      <ZoomToFitButtonWrapper controlsRef={controlsRef} />
    </>
  )
}