/**
 * Highlight Controls Component
 * Buttons to highlight nodes based on agent slot occupancy
 */
export function HighlightControls({ highlightMode, onHighlightChange }) {
  return (
    <div className="highlight-controls">
      <div className="switcher-label">Highlight:</div>
      <div className="button-group">
        <button
          className={`highlight-button ${highlightMode === 'none' ? 'active' : ''}`}
          onClick={() => onHighlightChange('none')}
        >
          None
        </button>
        <button
          className={`highlight-button ${highlightMode === 'full' ? 'active' : ''}`}
          onClick={() => onHighlightChange('full')}
          title="Highlight nodes where all agent slots are filled"
        >
          All Filled
        </button>
        <button
          className={`highlight-button ${highlightMode === 'partial' ? 'active' : ''}`}
          onClick={() => onHighlightChange('partial')}
          title="Highlight nodes with at least one empty slot"
        >
          Has Empty
        </button>
      </div>

      <style>{`
        .highlight-controls {
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

        .highlight-controls .switcher-label {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 500;
        }

        .highlight-controls .button-group {
          display: flex;
          gap: 8px;
        }

        .highlight-button {
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

        .highlight-button:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .highlight-button.active {
          background: rgba(59, 130, 246, 0.3);
          border-color: #60a5fa;
          color: #93c5fd;
        }
      `}</style>
    </div>
  )
}
