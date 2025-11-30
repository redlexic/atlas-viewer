import { useContext, useState } from 'react'
import { SceneContext } from '../../context/SceneContext'

export function BottomHUD() {
  const { rotation, scale, rotatePlane, scalePlane } = useContext(SceneContext)
  const [rotationInput, setRotationInput] = useState(0)
  const [scaleInput, setScaleInput] = useState(1)
  
  const handleRotationChange = (e) => {
    const value = parseFloat(e.target.value)
    setRotationInput(value)
    rotatePlane(value * Math.PI / 180) // Convert to radians
  }
  
  const handleScaleChange = (e) => {
    const value = parseFloat(e.target.value)
    setScaleInput(value)
    scalePlane(value)
  }
  
  return (
    <div className="hud-bottom">
      <div className="hud-content">
        <div className="controls-row">
          <div className="control-group">
            <label htmlFor="rotation">Rotation (degrees):</label>
            <input
              id="rotation"
              type="range"
              min="-180"
              max="180"
              step="5"
              value={rotationInput}
              onChange={handleRotationChange}
            />
            <span className="value-display">{rotationInput}°</span>
          </div>
          
          <div className="control-group">
            <label htmlFor="scale">Scale:</label>
            <input
              id="scale"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={scaleInput}
              onChange={handleScaleChange}
            />
            <span className="value-display">{scaleInput}x</span>
          </div>
        </div>
        
        <div className="info">
          <p>Golden Ratio Plane Template • Responsive to all screen sizes</p>
        </div>
      </div>
    </div>
  )
}