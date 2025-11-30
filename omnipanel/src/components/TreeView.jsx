import { useMemo, useContext, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { SceneContext } from '../context/SceneContext'
import { PLANE_CONFIG, TREE_CONFIG } from '../config/planeConfig'
import { MaterialFactory } from '../factories/MaterialFactory'
import { getNodeColor, SAMPLE_ATLAS_NODES } from '../data/sampleAtlasNodes'
import { calculateTreeLayout, getTreeBounds } from '../layouts/treeLayout'
import { TreeEdges } from './TreeEdges'
import { buildTree, flattenTree } from '../utils/treeParser'
import { loadLaunchAgent6, getTreeStats } from '../data/agentDataLoader'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'

// Reuse ClickableTile component
function ClickableTile({ node, position }) {
  const { clickedTiles, toggleTile, selectTile, selectedTile } = useContext(SceneContext)
  const groupRef = useRef()
  const isClicked = clickedTiles.has(node.doc_no)
  const isSelected = selectedTile?.doc_no === node.doc_no

  // Animate levitation and scale (selected tiles float higher and grow)
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetZ = isSelected ? 0.1 : (isClicked ? 0.05 : 0)
      const targetScale = isSelected ? 1.1 : 1.0

      // Smooth animations
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * delta * 5
      groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * delta * 8
      groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * delta * 8
      groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * delta * 8
    }
  })

  const color = getNodeColor(node.type)

  // Enhanced material for selection state
  const materialProps = isSelected
    ? { color: '#3b82f6', opacity: 0.95, transparent: true } // Bright blue for selection
    : MaterialFactory.createClickableTileMaterial(color, isClicked);

  // Calculate text size based on tile size
  const docNoFontSize = position.size * 0.15
  const nameFontSize = position.size * 0.1
  const typeFontSize = position.size * 0.08

  return (
    <group ref={groupRef} position={[position.x, -position.y, 0]}>
      {/* Background tile mesh */}
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          toggleTile(node.doc_no)
          // Combine node and position for zoom system
          selectTile(isSelected ? null : { ...node, x: position.x, y: position.y })
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <planeGeometry args={[position.size * 0.95, position.size * 0.95]} />
        <meshBasicMaterial {...materialProps} />
      </mesh>

      {/* Selection border - only visible when selected */}
      {isSelected && (
        <mesh position={[0, 0, -0.001]}>
          <planeGeometry args={[position.size * 1.05, position.size * 1.05]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Text layers */}
      {node.doc_no && (
        <>
          {/* Doc number - top */}
          <Text
            position={[0, position.size * 0.25, 0.01]}
            fontSize={docNoFontSize}
            color={isSelected ? '#3b82f6' : (isClicked ? '#60a5fa' : '#93c5fd')}
            anchorX="center"
            anchorY="middle"
            outlineWidth={docNoFontSize * 0.05}
            outlineColor="#000000"
          >
            {node.doc_no}
          </Text>

          {/* Node name - middle */}
          <Text
            position={[0, 0, 0.01]}
            fontSize={nameFontSize}
            color={isSelected ? '#ffffff' : (isClicked ? '#ffffff' : '#e5e7eb')}
            anchorX="center"
            anchorY="middle"
            maxWidth={position.size * 0.85}
            textAlign="center"
            outlineWidth={nameFontSize * 0.05}
            outlineColor="#000000"
          >
            {node.name}
          </Text>

          {/* Type badge - bottom */}
          <Text
            position={[0, -position.size * 0.3, 0.01]}
            fontSize={typeFontSize}
            color={isSelected ? '#f3f4f6' : (isClicked ? '#d1d5db' : '#9ca3af')}
            anchorX="center"
            anchorY="middle"
            outlineWidth={typeFontSize * 0.05}
            outlineColor="#000000"
          >
            {node.type}
          </Text>
        </>
      )}
    </group>
  )
}

export function TreeView() {
  const { updateTreeData } = useContext(SceneContext)
  const [agentData, setAgentData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [useSampleData, setUseSampleData] = useState(false)

  // Load Launch Agent 6 data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const data = await loadLaunchAgent6()
        setAgentData(data)

        // Log tree statistics
        const stats = getTreeStats(data)
        console.log('Launch Agent 6 loaded:', stats)
      } catch (err) {
        console.error('Failed to load Launch Agent 6, using sample data:', err)
        setUseSampleData(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Use sample data as fallback or when loading
  const nodes = useMemo(() => {
    if (isLoading || useSampleData || !agentData) {
      return SAMPLE_ATLAS_NODES
    }

    // Convert nested format to flat array for rendering
    // buildTree handles the nested format, then flatten for iteration
    const tree = buildTree(agentData)
    const flat = flattenTree(tree)
    console.log(`Loaded ${flat.length} nodes from Launch Agent 6`)
    return flat
  }, [agentData, isLoading, useSampleData])

  const layout = useMemo(() => {
    return calculateTreeLayout(nodes, TREE_CONFIG)
  }, [nodes])

  // Update context with current tree data and bounds
  useEffect(() => {
    const dataSource = useSampleData ? 'Sample Data (20 nodes)' : 'Launch Agent 6'
    const bounds = layout.size > 0 ? getTreeBounds(layout) : null
    updateTreeData(nodes, isLoading, dataSource, bounds)
  }, [nodes, isLoading, useSampleData, updateTreeData, layout])

  // Enable keyboard navigation (Left/Right arrows)
  const { currentIndex, totalNodes } = useKeyboardNavigation(nodes)

  // Show loading indicator
  if (isLoading) {
    return (
      <group position={[0, 0, PLANE_CONFIG.layers.grid]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.2}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
        >
          Loading Launch Agent 6...
        </Text>
      </group>
    )
  }

  return (
    <group position={[0, 0, PLANE_CONFIG.layers.grid]}>
      {/* Connection lines between parent and child nodes */}
      <TreeEdges nodes={nodes} layout={layout} />

      {/* Tiles */}
      {nodes.map((node) => {
        const position = layout.get(node.doc_no)
        // Skip if no position calculated
        if (!position) return null

        return (
          <ClickableTile
            key={node.doc_no}
            node={node}
            position={position}
          />
        )
      })}
    </group>
  )
}
