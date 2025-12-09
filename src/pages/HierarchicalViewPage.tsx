import { SceneProvider } from '@omnipanel/context/SceneContext'
import { Scene } from '@omnipanel/components/Scene'
import { TreeStatsHUD } from '@omnipanel/components/hud/TreeStatsHUD'
import { NodeDetailSidebar } from '@omnipanel/components/NodeDetailSidebar'
import '@omnipanel/App.css'

/**
 * Hierarchical View Page
 *
 * 3D tree visualization using React Three Fiber
 * Displays Launch Agent 6 data in an interactive hierarchical layout
 */
export function HierarchicalViewPage() {
  return (
    <SceneProvider>
      <div className="hierarchical-view-container">
        <Scene />
        <TreeStatsHUD />
        <NodeDetailSidebar />
      </div>
    </SceneProvider>
  )
}
