import { useRef, useContext } from 'react'
import { useFrame } from '@react-three/fiber'
import { useResponsiveCamera } from '../hooks/useResponsiveCamera'
import { SceneContext } from '../context/SceneContext'
import { PLANE_CONFIG } from '../config/planeConfig'
import { MaterialFactory } from '../factories/MaterialFactory'

export function GoldenPlane() {
  const planeRef = useRef()
  const { planeColor, rotation, scale } = useContext(SceneContext)
  
  useResponsiveCamera(planeRef)
  
  const materialProps = MaterialFactory.createPlaneMaterial();
  
  useFrame((state, delta) => {
    if (planeRef.current) {
      // Plane never rotates or scales - it's always the same size and orientation
      // Only the camera moves to create the illusion of changes
    }
  })
  
  return (
    <mesh ref={planeRef} position={[0, 0, PLANE_CONFIG.layers.plane]}>
      <planeGeometry args={[PLANE_CONFIG.baseWidth, PLANE_CONFIG.planeHeight]} />
      <meshBasicMaterial {...materialProps} />
    </mesh>
  )
}