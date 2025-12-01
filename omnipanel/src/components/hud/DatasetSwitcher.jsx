import { DATASETS } from '../../data/agentDataLoader'

/**
 * Dataset Switcher Component
 * Allows selecting multiple agent datasets for overlay comparison
 */
export function DatasetSwitcher({ selectedDatasets, onDatasetToggle }) {
  // Agent colors matching TreeView (high contrast for side-by-side comparison)
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
    <div className="dataset-switcher">
      <div className="switcher-label">Agents:</div>
      <div className="button-group">
        {Object.values(DATASETS).map(dataset => {
          const isSelected = selectedDatasets.includes(dataset.id)
          const agentColor = AGENT_COLORS[dataset.id] || '#60a5fa'

          return (
            <button
              key={dataset.id}
              className={`dataset-button ${isSelected ? 'active' : ''}`}
              onClick={() => onDatasetToggle(dataset.id)}
              style={isSelected ? {
                background: `${agentColor}40`,
                borderColor: agentColor,
                color: agentColor,
              } : {}}
            >
              {dataset.name}
            </button>
          )
        })}
      </div>

      <style>{`
        .dataset-switcher {
          position: fixed;
          top: 70px;
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

        .switcher-label {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 500;
        }

        .button-group {
          display: flex;
          gap: 8px;
        }

        .dataset-button {
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

        .dataset-button:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .dataset-button.active {
          background: rgba(59, 130, 246, 0.3);
          border-color: #60a5fa;
          color: #93c5fd;
        }
      `}</style>
    </div>
  )
}
