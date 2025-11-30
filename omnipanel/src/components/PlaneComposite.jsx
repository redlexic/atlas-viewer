// import { GoldenBorder } from './GoldenBorder'
// import { GoldenPlane } from './GoldenPlane'
// import { GridOverlay } from './GridOverlay'
import { TreeView } from './TreeView'

export function PlaneComposite() {
  return (
    <group>
      {/* Background plane removed - just showing tree tiles */}
      <TreeView />
    </group>
  )
}