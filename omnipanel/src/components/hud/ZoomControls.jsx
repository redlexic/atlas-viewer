import { useContext, useState, useEffect } from 'react'
import { SceneContext } from '../../context/SceneContext'

/**
 * Wrapper component that renders the zoom button outside Canvas
 */
export function ZoomToFitButtonWrapper({ controlsRef }) {
  const { treeBounds } = useContext(SceneContext)
  const [camera, setCamera] = useState(null)

  // Get camera reference from the controls
  useEffect(() => {
    if (controlsRef?.current) {
      setCamera(controlsRef.current.object)
    }
  }, [controlsRef])

  const handleZoomToFit = () => {
    if (!treeBounds || !controlsRef?.current || !camera) return

    const { minX, maxX, minY, maxY, width, height } = treeBounds

    // Calculate center of tree
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    // Calculate required camera distance to fit the tree
    // Add 20% padding
    const padding = 1.2
    const maxDimension = Math.max(width, height) * padding

    // Calculate optimal z distance
    const aspectRatio = camera.aspect || 1
    const optimalZ = Math.max(maxDimension / aspectRatio, maxDimension) * 0.6

    // Smoothly animate to new position
    const controls = controlsRef.current
    const duration = 800 // ms
    const startTime = Date.now()
    const startPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    }
    const startTarget = {
      x: controls.target.x,
      y: controls.target.y,
      z: controls.target.z
    }

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)

      // Interpolate position
      camera.position.x = startPos.x + (centerX - startPos.x) * eased
      camera.position.y = startPos.y + (-centerY - startPos.y) * eased
      camera.position.z = startPos.z + (optimalZ - startPos.z) * eased

      // Interpolate target
      controls.target.x = startTarget.x + (centerX - startTarget.x) * eased
      controls.target.y = startTarget.y + (-centerY - startTarget.y) * eased
      controls.target.z = startTarget.z + (0 - startTarget.z) * eased

      controls.update()

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  if (!treeBounds) return null

  return (
    <>
      <button
        className="zoom-to-fit-button"
        onClick={handleZoomToFit}
        title="Zoom to fit entire tree (View all nodes)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
        Zoom to Fit
      </button>

      <style>{`
        .zoom-to-fit-button {
          position: absolute;
          bottom: 80px;
          left: 20px;
          z-index: 100;
          background: rgba(59, 130, 246, 0.9);
          border: 2px solid rgba(96, 165, 250, 0.5);
          color: white;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(10px);
          transition: all 0.2s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        .zoom-to-fit-button:hover {
          background: rgba(96, 165, 250, 1);
          border-color: rgba(147, 197, 253, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        }

        .zoom-to-fit-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .zoom-to-fit-button svg {
          flex-shrink: 0;
        }
      `}</style>
    </>
  )
}
