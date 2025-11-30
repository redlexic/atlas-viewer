import { PLANE_CONFIG } from '../config/planeConfig'
import { MaterialFactory } from '../factories/MaterialFactory'

export function GoldenBorder() {
  const materialProps = MaterialFactory.createBorderMaterial();
  
  return (
    <mesh position={[0, 0, PLANE_CONFIG.layers.border]}>
      <planeGeometry args={[PLANE_CONFIG.borderPlaneWidth, PLANE_CONFIG.borderPlaneHeight]} />
      <meshStandardMaterial {...materialProps} />
    </mesh>
  )
}