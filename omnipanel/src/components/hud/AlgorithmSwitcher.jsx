import { useContext } from 'react'
import { SceneContext } from '../../context/SceneContext'

/**
 * Algorithm Switcher Component
 * Allows selecting between different tree layout algorithms
 */
export function AlgorithmSwitcher() {
  const { layoutAlgorithm, setLayoutAlgorithm } = useContext(SceneContext)

  const algorithms = [
    { id: 'walker', name: 'Walker', description: 'Current default - balanced centering' },
    { id: 'reingold-tilford', name: 'Reingold-Tilford', description: 'Compact classic layout' }
  ]

  return (
    <div className="algorithm-switcher">
      <div className="switcher-label">Layout:</div>
      <div className="button-group">
        {algorithms.map(algo => {
          const isSelected = layoutAlgorithm === algo.id

          return (
            <button
              key={algo.id}
              className={`algorithm-button ${isSelected ? 'active' : ''}`}
              onClick={() => setLayoutAlgorithm(algo.id)}
              title={algo.description}
            >
              {algo.name}
            </button>
          )
        })}
      </div>

      <style>{`
        .algorithm-switcher {
          position: fixed;
          top: 130px;
          left: 20px;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid rgba(59, 130, 246, 0.5);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: 'Monaco', 'Menlo', monospace;
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .algorithm-switcher .switcher-label {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 500;
        }

        .algorithm-switcher .button-group {
          display: flex;
          gap: 8px;
        }

        .algorithm-button {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #60a5fa;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Monaco', 'Menlo', monospace;
        }

        .algorithm-button:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .algorithm-button.active {
          background: rgba(59, 130, 246, 0.3);
          border-color: #60a5fa;
          color: #93c5fd;
        }
      `}</style>
    </div>
  )
}
