import { useState, useCallback, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PLANE_CONFIG } from '../../config/planeConfig'
import { MaterialFactory } from '../../factories/MaterialFactory'
import { useContainerResponsiveCamera } from './hooks/useContainerResponsiveCamera'

function ClickableTile({ tile, clickedTiles, onTileClick }) {
  const meshRef = useRef()
  const isClicked = clickedTiles.has(tile.id)
  
  // Animate levitation
  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetZ = isClicked ? 0.05 : 0
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * delta * 5
    }
  })
  
  const materialProps = MaterialFactory.createClickableTileMaterial(tile.color, isClicked)
  
  return (
    <mesh 
      ref={meshRef}
      position={[tile.x, -tile.y, 0]} 
      onClick={(e) => {
        e.stopPropagation()
        onTileClick?.(tile.id, tile)
      }}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default'
      }}
    >
      <planeGeometry args={[tile.size * 0.95, tile.size * 0.95]} />
      <meshBasicMaterial {...materialProps} />
    </mesh>
  )
}

function GridLayer({ clickedTiles, onTileClick, tileColors }) {
  const gridData = useMemo(() => {
    const tiles = []
    for (let row = 0; row < PLANE_CONFIG.verticalTiles; row++) {
      for (let col = 0; col < PLANE_CONFIG.horizontalTiles; col++) {
        const x = (col * PLANE_CONFIG.tileSize) - (PLANE_CONFIG.baseWidth / 2) + (PLANE_CONFIG.tileSize / 2) + PLANE_CONFIG.gridOffsetX
        const y = (row * PLANE_CONFIG.tileSize) - (PLANE_CONFIG.planeHeight / 2) + (PLANE_CONFIG.tileSize / 2)
        
        const tileId = `${row}-${col}`
        const customColor = tileColors?.[tileId]
        
        // Default checkerboard or custom color
        const isEven = (row + col) % 2 === 0
        const defaultColor = isEven ? '#8b0000' : '#006400'
        const color = customColor || defaultColor
        
        tiles.push({
          id: tileId,
          x,
          y,
          row,
          col,
          size: PLANE_CONFIG.tileSize,
          color
        })
      }
    }
    
    return { tiles }
  }, [tileColors])
  
  return (
    <group position={[0, 0, PLANE_CONFIG.layers.grid]}>
      {gridData.tiles.map((tile) => (
        <ClickableTile 
          key={tile.id} 
          tile={tile} 
          clickedTiles={clickedTiles}
          onTileClick={onTileClick}
        />
      ))}
    </group>
  )
}

function BackgroundPlane({ planeRef }) {
  const materialProps = MaterialFactory.createPlaneMaterial()
  
  return (
    <mesh ref={planeRef} position={[0, 0, PLANE_CONFIG.layers.plane]}>
      <planeGeometry args={[PLANE_CONFIG.baseWidth, PLANE_CONFIG.planeHeight]} />
      <meshBasicMaterial {...materialProps} />
    </mesh>
  )
}

function BorderPlane({ showBorder = true }) {
  const materialProps = MaterialFactory.createBorderMaterial()
  
  if (!showBorder) return null
  
  return (
    <mesh position={[0, 0, PLANE_CONFIG.layers.border]}>
      <planeGeometry args={[PLANE_CONFIG.borderPlaneWidth, PLANE_CONFIG.borderPlaneHeight]} />
      <meshStandardMaterial {...materialProps} />
    </mesh>
  )
}

function SceneContent({ 
  clickedTiles, 
  onTileClick, 
  showBorder, 
  tileColors, 
  rotation = 0, 
  scale = 1,
  containerRef,
  isOrthographic = false
}) {
  const planeRef = useRef()
  
  // Use container-aware responsive camera
  useContainerResponsiveCamera(planeRef, containerRef, { rotation, scale, isOrthographic })
  
  return (
    <group>
      <BorderPlane showBorder={showBorder} />
      <BackgroundPlane planeRef={planeRef} />
      <GridLayer 
        clickedTiles={clickedTiles} 
        onTileClick={onTileClick}
        tileColors={tileColors}
      />
    </group>
  )
}

export function InteractiveGrid({
  width = 400,
  height = 300,
  orthographic = false,
  showBorder = true,
  tileColors = {},
  onTileClick,
  onTileHover,
  rotation = 0,
  scale = 1,
  style = {},
  className = '',
  ...props
}) {
  const [clickedTiles, setClickedTiles] = useState(new Set())
  const containerRef = useRef()
  
  const handleTileClick = useCallback((tileId, tile) => {
    setClickedTiles(prev => {
      const newSet = new Set(prev)
      const wasClicked = newSet.has(tileId)
      
      if (wasClicked) {
        newSet.delete(tileId)
      } else {
        newSet.add(tileId)
      }
      
      onTileClick?.(tileId, tile, !wasClicked)
      return newSet
    })
  }, [onTileClick])
  
  return (
    <div 
      ref={containerRef}
      style={{ 
        width, 
        height, 
        position: 'relative',
        flexShrink: 0, // Prevent container from shrinking
        ...style 
      }}
      className={className}
      {...props}
    >
      <Canvas
        key={orthographic ? 'ortho' : 'persp'}
        orthographic={orthographic}
        camera={{
          position: [0, 0, 5],
          fov: 75
        }}
        style={{ 
          width: '100%',
          height: '100%'
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SceneContent
          clickedTiles={clickedTiles}
          onTileClick={handleTileClick}
          showBorder={showBorder}
          tileColors={tileColors}
          rotation={rotation}
          scale={scale}
          containerRef={containerRef}
          isOrthographic={orthographic}
        />
      </Canvas>
    </div>
  )
}