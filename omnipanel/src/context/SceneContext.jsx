import { createContext, useState, useCallback } from 'react'

export const SceneContext = createContext()

export function SceneProvider({ children }) {
  // 3D scene state
  const [planeColor, setPlaneColor] = useState('#4f46e5')
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [clickedTiles, setClickedTiles] = useState(new Set())
  const [isOrthographic, setIsOrthographic] = useState(false)
  const [selectedTile, setSelectedTile] = useState(null) // For zoom-to-tile feature

  // Tree data state
  const [treeNodes, setTreeNodes] = useState([])
  const [treeLoading, setTreeLoading] = useState(false)
  const [treeDataSource, setTreeDataSource] = useState('Sample Data')
  const [treeBounds, setTreeBounds] = useState(null)
  const [navigationIndex, setNavigationIndex] = useState(-1)
  const [navigationTotal, setNavigationTotal] = useState(0)
  const [layoutAlgorithm, setLayoutAlgorithm] = useState('reingold-tilford') // 'walker' or 'reingold-tilford'
  
  // HUD actions that affect the 3D scene
  const actions = {
    rotatePlane: useCallback((angle) => {
      setRotation(angle)
    }, []),
    
    scalePlane: useCallback((scaleValue) => {
      setScale(scaleValue)
    }, []),
    
    changePlaneColor: useCallback((color) => {
      setPlaneColor(color)
    }, []),
    
    toggleTile: useCallback((tileId) => {
      setClickedTiles(prev => {
        const newSet = new Set(prev)
        if (newSet.has(tileId)) {
          newSet.delete(tileId)
        } else {
          newSet.add(tileId)
        }
        return newSet
      })
    }, []),

    selectTile: useCallback((tile) => {
      setSelectedTile(tile)
    }, []),

    updateTreeData: useCallback((nodes, isLoading, dataSource, bounds) => {
      setTreeNodes(nodes)
      setTreeLoading(isLoading)
      setTreeDataSource(dataSource)
      setTreeBounds(bounds)
    }, []),

    updateNavigationState: useCallback((index, total) => {
      setNavigationIndex(index)
      setNavigationTotal(total)
    }, []),

    toggleCameraType: useCallback(() => {
      setIsOrthographic(prev => !prev)
    }, []),

    setLayoutAlgorithm: useCallback((algorithm) => {
      setLayoutAlgorithm(algorithm)
    }, []),
    
    resetPlane: useCallback(() => {
      setRotation(0)
      setScale(1)
      setPlaneColor('#4f46e5')
      setClickedTiles(new Set())
      setIsOrthographic(false)
    }, [])
  }
  
  const value = {
    // State
    planeColor,
    rotation,
    scale,
    clickedTiles,
    isOrthographic,
    selectedTile,
    // Tree data
    treeNodes,
    treeLoading,
    treeDataSource,
    treeBounds,
    navigationIndex,
    navigationTotal,
    layoutAlgorithm,
    // Actions
    ...actions
  }
  
  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  )
}