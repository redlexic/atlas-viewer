import { useContext } from 'react'
import { SceneContext } from '../../context/SceneContext'

export function TopHUD() {
  const { planeColor, changePlaneColor, resetPlane, isOrthographic, toggleCameraType } = useContext(SceneContext)
  
  const colors = [
    { name: 'Blue', value: '#4f46e5' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Orange', value: '#ea580c' }
  ]
  
  return (
    <div className="hud-top">
      <div className="hud-content">
        <div className="color-controls">
          <label>Plane Color:</label>
          <div className="color-buttons">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`color-btn ${planeColor === color.value ? 'active' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => changePlaneColor(color.value)}
                title={color.name}
              />
            ))}
          </div>
        </div>
        <button 
          className={`camera-toggle-btn ${isOrthographic ? 'active' : ''}`}
          onClick={toggleCameraType}
        >
          {isOrthographic ? 'Orthographic' : 'Perspective'}
        </button>
        <button className="reset-btn" onClick={resetPlane}>
          Reset
        </button>
      </div>
    </div>
  )
}