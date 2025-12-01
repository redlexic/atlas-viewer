import { useMemo, useContext, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { SceneContext } from '../context/SceneContext'
import { PLANE_CONFIG, TREE_CONFIG } from '../config/planeConfig'
import { MaterialFactory } from '../factories/MaterialFactory'
import { getNodeColor, SAMPLE_ATLAS_NODES } from '../data/sampleAtlasNodes'
import { calculateTreeLayout, getTreeBounds } from '../layouts/treeLayout'
import { TreeEdges } from './TreeEdges'
import { buildTree } from '../utils/treeParser'
import { DATASETS, getTreeStats } from '../data/agentDataLoader'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'

// Pulsing border component for highlighted nodes
function PulsingBorder({ position, width, height, thickness, color, emissiveColor, emissiveIntensity }) {
  const topRef = useRef()
  const bottomRef = useRef()
  const leftRef = useRef()
  const rightRef = useRef()

  // Pulse animation for highlighted borders
  useFrame((state) => {
    const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 1.0 // Oscillate between 0.7 and 1.3
    const refs = [topRef, bottomRef, leftRef, rightRef]
    refs.forEach(ref => {
      if (ref.current) {
        ref.current.emissiveIntensity = emissiveIntensity * pulse
      }
    })
  })

  return (
    <>
      {/* Top border */}
      <mesh position={[position.x, -position.y + height/2, -0.0015]}>
        <planeGeometry args={[width + thickness * 2, thickness]} />
        <meshStandardMaterial
          ref={topRef}
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Bottom border */}
      <mesh position={[position.x, -position.y - height/2, -0.0015]}>
        <planeGeometry args={[width + thickness * 2, thickness]} />
        <meshStandardMaterial
          ref={bottomRef}
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Left border */}
      <mesh position={[position.x - width/2, -position.y, -0.0015]}>
        <planeGeometry args={[thickness, height]} />
        <meshStandardMaterial
          ref={leftRef}
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Right border */}
      <mesh position={[position.x + width/2, -position.y, -0.0015]}>
        <planeGeometry args={[thickness, height]} />
        <meshStandardMaterial
          ref={rightRef}
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
    </>
  )
}

// Reuse ClickableTile component
function ClickableTile({ node, position, agentColor, unifiedDocNo }) {
  const { clickedTiles, toggleTile, selectTile, selectedTile } = useContext(SceneContext)
  const groupRef = useRef()
  const isClicked = clickedTiles.has(node.doc_no)
  const isSelected = selectedTile?.doc_no === unifiedDocNo

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

  // Use agent color for all states (selection shown via border instead)
  const materialProps = isClicked
    ? { color: agentColor || getNodeColor(node.type), opacity: 0.8, transparent: true }
    : { color: agentColor || getNodeColor(node.type), opacity: 0.6, transparent: true }

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
          // Combine node and position for zoom system, use unified doc_no for selection
          selectTile(isSelected ? null : { ...node, doc_no: unifiedDocNo, x: position.x, y: position.y })
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

      {/* Selection indication now handled by node border, not individual tile */}

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

export function TreeView({ selectedDatasets = ['launch_agent_6'], highlightMode = 'none' }) {
  const { updateTreeData, selectedTile, selectTile, layoutAlgorithm } = useContext(SceneContext)
  const [agentsData, setAgentsData] = useState({}) // Map of datasetId -> agent data
  const [isLoading, setIsLoading] = useState(true)
  const [useSampleData, setUseSampleData] = useState(false)

  // Load data when selected datasets change
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const loadedData = {}

        // Load all selected datasets
        for (const datasetId of selectedDatasets) {
          const dataset = DATASETS[datasetId.toUpperCase().replace(/-/g, '_')]
          if (dataset) {
            const data = await dataset.loader()
            loadedData[datasetId] = data

            // Log tree statistics
            const stats = getTreeStats(data)
            console.log(`${dataset.name} loaded:`, stats)
          }
        }

        setAgentsData(loadedData)
        setUseSampleData(false)
      } catch (err) {
        console.error(`Failed to load datasets:`, err)
        setUseSampleData(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedDatasets.join(',')])

  // Build structurally aligned multi-agent node structure
  const nodes = useMemo(() => {
    if (isLoading || useSampleData || Object.keys(agentsData).length === 0) {
      return SAMPLE_ATLAS_NODES.map(node => ({
        ...node,
        agentId: 'sample',
        agents: [{ agentId: 'sample', node }]
      }))
    }

    // Build tree structures for each agent
    const agentTrees = {}
    selectedDatasets.forEach(datasetId => {
      if (agentsData[datasetId]) {
        agentTrees[datasetId] = buildTree(agentsData[datasetId])
        console.log(`[TreeView] ${datasetId} tree built`)
      }
    })

    // Align trees by structure (depth and sibling position)
    const alignedNodes = []

    // Create unified doc_no for structurally aligned positions
    const unifiedDocNo = (path) => {
      if (path.length === 0) return 'S'
      return `S.${path.join('.')}`
    }

    function traverseTrees(agentNodes, path = []) {
      // Get max children count across all agents at this level
      const maxChildren = Math.max(
        ...Object.values(agentNodes).map(n => (n?.children?.length || 0))
      )

      if (maxChildren === 0) return // No children to traverse

      // Process each child position
      for (let i = 0; i < maxChildren; i++) {
        const childPath = [...path, i]
        const alignedChild = {
          agents: []
        }

        // Collect nodes at this structural position from each agent
        selectedDatasets.forEach(datasetId => {
          const parentNode = agentNodes[datasetId]
          const child = parentNode?.children?.[i]
          if (child) {
            alignedChild.agents.push({
              agentId: datasetId,
              node: child
            })
          }
        })

        if (alignedChild.agents.length > 0) {
          // Use first agent's node for shared properties
          const firstNode = alignedChild.agents[0].node
          alignedNodes.push({
            ...firstNode,
            doc_no: unifiedDocNo(childPath), // Unified doc_no for layout
            originalDocNo: firstNode.doc_no,
            agents: alignedChild.agents,
            isMultiAgent: alignedChild.agents.length > 1
          })

          // Recursively process children
          const childAgentNodes = {}
          alignedChild.agents.forEach(({ agentId, node }) => {
            childAgentNodes[agentId] = node
          })
          traverseTrees(childAgentNodes, childPath)
        }
      }
    }

    // Start traversal from root nodes
    const rootAgentNodes = {}
    selectedDatasets.forEach(datasetId => {
      rootAgentNodes[datasetId] = agentTrees[datasetId]?.[0]
    })

    // Add root nodes
    if (Object.keys(rootAgentNodes).length > 0) {
      const rootAligned = {
        agents: []
      }

      selectedDatasets.forEach(datasetId => {
        const rootNode = rootAgentNodes[datasetId]
        if (rootNode) {
          rootAligned.agents.push({
            agentId: datasetId,
            node: rootNode
          })
        }
      })

      if (rootAligned.agents.length > 0) {
        const firstNode = rootAligned.agents[0].node
        alignedNodes.push({
          ...firstNode,
          doc_no: unifiedDocNo([]), // Unified root doc_no
          originalDocNo: firstNode.doc_no,
          agents: rootAligned.agents,
          isMultiAgent: rootAligned.agents.length > 1
        })
      }

      traverseTrees(rootAgentNodes, [])
    }

    console.log(`[TreeView] Created ${alignedNodes.length} structurally aligned nodes from ${selectedDatasets.length} agents`)
    return alignedNodes
  }, [agentsData, isLoading, useSampleData, selectedDatasets])

  const layout = useMemo(() => {
    // Pass the number of selected datasets to layout for slot-based spacing
    const configWithSlots = {
      ...TREE_CONFIG,
      numAgentSlots: selectedDatasets.length
    }
    return calculateTreeLayout(nodes, configWithSlots, layoutAlgorithm)
  }, [nodes, layoutAlgorithm, selectedDatasets.length])

  // Update context with current tree data and bounds
  useEffect(() => {
    const datasetNames = selectedDatasets.map(id => {
      const ds = DATASETS[id.toUpperCase().replace(/-/g, '_')]
      return ds?.name || id
    }).join(' + ')
    const dataSource = useSampleData ? 'Sample Data (20 nodes)' : datasetNames
    const bounds = layout.size > 0 ? getTreeBounds(layout) : null
    updateTreeData(nodes, isLoading, dataSource, bounds)
  }, [nodes, isLoading, useSampleData, selectedDatasets, updateTreeData, layout])

  // Enable keyboard navigation (Left/Right arrows)
  useKeyboardNavigation(nodes)

  // Update selected tile with position info when selection changes
  useEffect(() => {
    if (selectedTile && layout.size > 0 && selectedTile.x === undefined) {
      const position = layout.get(selectedTile.doc_no)
      if (position) {
        // Add position info to selected tile for camera zoom
        selectTile({ ...selectedTile, x: position.x, y: position.y })
      }
    }
  }, [selectedTile, layout])

  // Show loading indicator
  if (isLoading) {
    const datasetNames = selectedDatasets.map(id => {
      const ds = DATASETS[id.toUpperCase().replace(/-/g, '_')]
      return ds?.name || id
    }).join(' + ')
    return (
      <group position={[0, 0, PLANE_CONFIG.layers.grid]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.2}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
        >
          Loading {datasetNames}...
        </Text>
      </group>
    )
  }

  // Agent colors for visual distinction (high contrast for side-by-side comparison)
  const AGENT_COLORS = {
    'spark': '#ef4444',    // red
    'grove': '#10b981',    // green
    'keel': '#3b82f6',     // blue
    'launch_agent_3': '#f59e0b',  // amber
    'launch_agent_4': '#8b5cf6',  // purple
    'prysm': '#ec4899',    // pink
    'launch_agent_6': '#06b6d4',  // cyan
    'la6_old': '#f97316',  // orange (high contrast with cyan)
  }

  return (
    <group position={[0, 0, PLANE_CONFIG.layers.grid]}>
      {/* Connection lines between parent and child nodes */}
      <TreeEdges nodes={nodes} layout={layout} />

      {/* Tiles - slot-based layout with borders showing space for all selected agents */}
      {nodes.map((node) => {
        const position = layout.get(node.doc_no)
        if (!position) return null

        const tileWidth = position.size * 0.95
        const tileSpacing = tileWidth * 1.1
        const numSlots = selectedDatasets.length
        const totalWidth = (numSlots - 1) * tileSpacing
        const startX = position.x - totalWidth / 2

        // Create a map of agentId -> agentData for quick lookup
        const agentMap = new Map()
        node.agents?.forEach(agentData => {
          agentMap.set(agentData.agentId, agentData)
        })

        // Check if this node is selected
        const isNodeSelected = selectedTile?.doc_no === node.doc_no

        return (
          <group key={node.doc_no}>
            {/* Blue background */}
            <mesh position={[position.x, -position.y, -0.002]}>
              <planeGeometry args={[totalWidth + tileWidth + tileWidth * 0.3, position.size * 1.15]} />
              <meshBasicMaterial
                color="#3b82f6"
                transparent
                opacity={0.15}
              />
            </mesh>

            {/* Border frame - gold when selected, silver otherwise, highlight colors for occupancy modes */}
            {(() => {
              const bgWidth = totalWidth + tileWidth + tileWidth * 0.3
              const bgHeight = position.size * 1.15

              // Determine border color and effects based on selection and highlight mode
              let borderColor = "#f3f4f6" // Default silver
              let borderThickness = 0.03
              let emissiveColor = "#000000"
              let emissiveIntensity = 0
              let shouldPulse = false

              if (isNodeSelected) {
                borderColor = "#fbbf24" // Gold when selected
                borderThickness = 0.05
                emissiveColor = "#fbbf24"
                emissiveIntensity = 0.8
              } else if (highlightMode === 'full' && node.agents.length === selectedDatasets.length) {
                borderColor = "#fbbf24" // Gold for all slots filled
                borderThickness = 0.06
                emissiveColor = "#fbbf24"
                emissiveIntensity = 1.5
                shouldPulse = true
              } else if (highlightMode === 'partial' && node.agents.length < selectedDatasets.length) {
                borderColor = "#fbbf24" // Gold for has empty slots
                borderThickness = 0.06
                emissiveColor = "#fbbf24"
                emissiveIntensity = 1.5
                shouldPulse = true
              }

              // Use pulsing border for highlights, static for others
              if (shouldPulse) {
                return (
                  <PulsingBorder
                    position={position}
                    width={bgWidth}
                    height={bgHeight}
                    thickness={borderThickness}
                    color={borderColor}
                    emissiveColor={emissiveColor}
                    emissiveIntensity={emissiveIntensity}
                  />
                )
              }

              return (
                <>
                  {/* Top border */}
                  <mesh position={[position.x, -position.y + bgHeight/2, -0.0015]}>
                    <planeGeometry args={[bgWidth + borderThickness * 2, borderThickness]} />
                    <meshStandardMaterial
                      color={borderColor}
                      emissive={emissiveColor}
                      emissiveIntensity={emissiveIntensity}
                    />
                  </mesh>
                  {/* Bottom border */}
                  <mesh position={[position.x, -position.y - bgHeight/2, -0.0015]}>
                    <planeGeometry args={[bgWidth + borderThickness * 2, borderThickness]} />
                    <meshStandardMaterial
                      color={borderColor}
                      emissive={emissiveColor}
                      emissiveIntensity={emissiveIntensity}
                    />
                  </mesh>
                  {/* Left border */}
                  <mesh position={[position.x - bgWidth/2, -position.y, -0.0015]}>
                    <planeGeometry args={[borderThickness, bgHeight]} />
                    <meshStandardMaterial
                      color={borderColor}
                      emissive={emissiveColor}
                      emissiveIntensity={emissiveIntensity}
                    />
                  </mesh>
                  {/* Right border */}
                  <mesh position={[position.x + bgWidth/2, -position.y, -0.0015]}>
                    <planeGeometry args={[borderThickness, bgHeight]} />
                    <meshStandardMaterial
                      color={borderColor}
                      emissive={emissiveColor}
                      emissiveIntensity={emissiveIntensity}
                    />
                  </mesh>
                </>
              )
            })()}

            {/* Render tiles in their fixed slot positions */}
            {selectedDatasets.map((datasetId, slotIndex) => {
              const agentData = agentMap.get(datasetId)
              const slotX = startX + slotIndex * tileSpacing

              if (!agentData) {
                // Empty slot - show subtle placeholder
                return (
                  <mesh
                    key={`${node.doc_no}-slot-${slotIndex}`}
                    position={[slotX, -position.y, 0]}
                  >
                    <planeGeometry args={[tileWidth, position.size * 0.95]} />
                    <meshBasicMaterial
                      color="#1f2937"
                      transparent
                      opacity={0.3}
                    />
                  </mesh>
                )
              }

              // Occupied slot - render tile
              return (
                <ClickableTile
                  key={`${node.doc_no}-${agentData.agentId}`}
                  node={agentData.node}
                  position={{ ...position, x: slotX }}
                  agentColor={AGENT_COLORS[agentData.agentId]}
                  unifiedDocNo={node.doc_no}
                />
              )
            })}
          </group>
        )
      })}
    </group>
  )
}
