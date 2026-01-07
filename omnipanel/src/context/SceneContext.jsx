import { createContext, useState, useCallback, useEffect, useMemo } from 'react'

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

  // Tag filtering state
  const [tagIndex, setTagIndex] = useState(null) // Full tag index from tagging-model.json
  const [selectedTag, setSelectedTag] = useState(null) // Currently selected tag name (e.g., 'skylink')
  const [taggedDocNos, setTaggedDocNos] = useState(new Set()) // Set of doc_no values for currently selected tag

  // Load tag index on mount
  useEffect(() => {
    fetch('/tagging-model.json')
      .then(res => res.json())
      .then(data => {
        setTagIndex(data)
        console.log('[SceneContext] Loaded tag index with', Object.keys(data.tagIndex || {}).length, 'tags')
      })
      .catch(err => {
        console.error('[SceneContext] Failed to load tagging model:', err)
      })
  }, [])

  // Update taggedDocNos when selectedTag changes
  useEffect(() => {
    if (!selectedTag || !tagIndex?.tagIndex?.[selectedTag]) {
      setTaggedDocNos(new Set())
      return
    }

    const taggedNodes = tagIndex.tagIndex[selectedTag]
    const docNos = new Set(taggedNodes.map(node => node.doc_no))
    setTaggedDocNos(docNos)
    console.log(`[SceneContext] Selected tag '${selectedTag}' with ${docNos.size} nodes`)
  }, [selectedTag, tagIndex])

  // Active set: filtered nodes when tag is selected, all nodes otherwise
  // This is the single source of truth for navigation
  const activeSet = useMemo(() => {
    if (!treeNodes || treeNodes.length === 0) {
      console.log('[SceneContext] activeSet: no treeNodes yet')
      return []
    }

    if (!selectedTag || taggedDocNos.size === 0) {
      // No filter - all nodes are active
      return treeNodes
    }

    // Filter to nodes that have at least one agent with a matching doc_no
    // The tree uses unified doc_nos (S, S.0, S.0.1) but original doc_nos are in:
    // - node.originalDocNo
    // - node.agents[].node.doc_no
    const filtered = treeNodes.filter(node => {
      // Check originalDocNo
      if (node.originalDocNo && taggedDocNos.has(node.originalDocNo)) {
        return true
      }
      // Check each agent's node doc_no
      if (node.agents) {
        return node.agents.some(agentData => {
          const agentDocNo = agentData.node?.doc_no
          return agentDocNo && taggedDocNos.has(agentDocNo)
        })
      }
      return false
    })

    console.log(`[SceneContext] activeSet: filtered ${filtered.length} nodes from ${treeNodes.length} for tag '${selectedTag}'`)
    return filtered
  }, [treeNodes, selectedTag, taggedDocNos])

  // Active set index (current position within active set)
  const activeSetIndex = useMemo(() => {
    if (!selectedTile || activeSet.length === 0) return -1
    return activeSet.findIndex(node => node.doc_no === selectedTile.doc_no)
  }, [selectedTile, activeSet])
  
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

    selectTag: useCallback((tagName) => {
      setSelectedTag(tagName)
    }, []),

    clearTag: useCallback(() => {
      setSelectedTag(null)
    }, []),

    // Navigate to next node in active set
    navigateNext: useCallback(() => {
      // This will be called from useKeyboardNavigation
    }, []),

    // Navigate to previous node in active set
    navigatePrev: useCallback(() => {
      // This will be called from useKeyboardNavigation
    }, []),

    resetPlane: useCallback(() => {
      setRotation(0)
      setScale(1)
      setPlaneColor('#4f46e5')
      setClickedTiles(new Set())
      setIsOrthographic(false)
      setSelectedTag(null)
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
    // Tag filtering
    tagIndex,
    selectedTag,
    taggedDocNos,
    // Active set (filtered or all nodes)
    activeSet,
    activeSetIndex,
    // Actions
    ...actions
  }
  
  return (
    <SceneContext.Provider value={value}>
      {children}
    </SceneContext.Provider>
  )
}