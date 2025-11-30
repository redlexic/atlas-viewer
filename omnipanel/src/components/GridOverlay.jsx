import { useMemo, useContext, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { SceneContext } from '../context/SceneContext'
import { PLANE_CONFIG } from '../config/planeConfig'
import { MaterialFactory } from '../factories/MaterialFactory'
import { SAMPLE_ATLAS_NODES, getNodeColor } from '../data/sampleAtlasNodes'
import { calculateGridLayout } from '../layouts/gridLayout'

function ClickableTile({ node, position }) {
  const { clickedTiles, toggleTile, selectTile, selectedTile } = useContext(SceneContext)
  const groupRef = useRef()
  const isClicked = clickedTiles.has(node.doc_no)
  const isSelected = selectedTile?.doc_no === node.doc_no

  // Animate levitation (selected tiles float higher) - animate the whole group
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetZ = isSelected ? 0.1 : (isClicked ? 0.05 : 0)
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * delta * 5
    }
  })

  const color = getNodeColor(node.type)
  const materialProps = MaterialFactory.createClickableTileMaterial(color, isClicked);

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
          // Toggle selection (for multi-select)
          toggleTile(node.doc_no)
          // Select tile (for zoom-to-tile) - combine node and position
          selectTile(isSelected ? null : { ...node, x: position.x, y: position.y })
        }}
        onPointerOver={(e) => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = 'default'
        }}
      >
        <planeGeometry args={[position.size * 0.95, position.size * 0.95]} />
        <meshBasicMaterial {...materialProps} />
      </mesh>

      {/* Text layers (only if node data exists) */}
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

export function GridOverlay() {
  // Separate content data from layout data
  const nodes = SAMPLE_ATLAS_NODES

  const layout = useMemo(() => {
    return calculateGridLayout(nodes, PLANE_CONFIG)
  }, [nodes])

  return (
    <group position={[0, 0, PLANE_CONFIG.layers.grid]}>
      {nodes.map((node) => {
        const position = layout.get(node.doc_no)
        // Skip if no position calculated (shouldn't happen, but safety check)
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