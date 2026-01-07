import { DATASETS } from '../../data/agentDataLoader'

/**
 * Dataset Switcher Component
 * Allows selecting Atlas scopes or individual agent datasets
 * - Scopes: Only one viewable at a time (A.0 through A.6)
 * - Agents: Can combine multiple for comparison
 */
export function DatasetSwitcher({ selectedDatasets, onDatasetToggle, onScopeSelect }) {
  // Colors for visual distinction
  const SCOPE_COLOR = '#fbbf24'  // gold for scopes
  const AGENT_COLORS = {
    'spark': '#ef4444',        // red
    'grove': '#10b981',        // green
    'keel': '#3b82f6',         // blue
    'launch_agent_3': '#f59e0b',  // amber
    'obex': '#8b5cf6',         // purple
    'launch_agent_5': '#06b6d4',  // cyan
  }

  // Separate scopes from agents
  const scopeDatasets = Object.values(DATASETS).filter(d => d.isScope)
  const agentDatasets = Object.values(DATASETS).filter(d => !d.isScope)

  // Check if a scope is currently selected
  const selectedScope = selectedDatasets.find(id => id.startsWith('scope_'))
  const isScopeMode = !!selectedScope

  const handleScopeClick = (scopeId) => {
    if (onScopeSelect) {
      onScopeSelect(scopeId)
    }
  }

  return (
    <div className="dataset-switcher">
      {/* Atlas Scopes Row */}
      <div className="switcher-row">
        <div className="switcher-label">Scopes:</div>
        <div className="button-group">
          {scopeDatasets.map(dataset => {
            const isSelected = selectedDatasets.includes(dataset.id)

            return (
              <button
                key={dataset.id}
                className={`scope-button ${isSelected ? 'active' : ''}`}
                onClick={() => handleScopeClick(dataset.id)}
                title={dataset.name}
                style={isSelected ? {
                  background: `${SCOPE_COLOR}40`,
                  borderColor: SCOPE_COLOR,
                  color: SCOPE_COLOR,
                  boxShadow: `0 0 12px ${SCOPE_COLOR}50`,
                } : {}}
              >
                {dataset.name.split(' ')[0]}
              </button>
            )
          })}
        </div>
      </div>

      <div className="separator-horizontal" />

      {/* Individual Agents Row */}
      <div className="switcher-row">
        <div className="switcher-label">Agents:</div>
        <div className="button-group">
          {agentDatasets.map(dataset => {
            const isSelected = selectedDatasets.includes(dataset.id)
            const agentColor = AGENT_COLORS[dataset.id] || '#60a5fa'
            const isDisabled = isScopeMode

            return (
              <button
                key={dataset.id}
                className={`dataset-button ${isSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled && onDatasetToggle(dataset.id)}
                disabled={isDisabled}
                title={isDisabled ? 'Deselect scope to use agents' : dataset.name}
                style={isSelected && !isDisabled ? {
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
          flex-direction: column;
          gap: 10px;
        }

        .switcher-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .switcher-label {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 500;
          min-width: 55px;
        }

        .separator-horizontal {
          height: 1px;
          background: rgba(59, 130, 246, 0.3);
          margin: 2px 0;
        }

        .button-group {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .scope-button {
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          color: #fbbf24;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Monaco', 'Menlo', monospace;
        }

        .scope-button:hover {
          background: rgba(251, 191, 36, 0.2);
          border-color: rgba(251, 191, 36, 0.5);
        }

        .scope-button.active {
          background: rgba(251, 191, 36, 0.3);
          border-color: #fbbf24;
          color: #fef3c7;
        }

        .dataset-button {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #60a5fa;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Monaco', 'Menlo', monospace;
        }

        .dataset-button:hover:not(.disabled) {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .dataset-button.active {
          background: rgba(59, 130, 246, 0.3);
          border-color: #60a5fa;
          color: #93c5fd;
        }

        .dataset-button.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}
