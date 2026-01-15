import { useMemo, useContext, useState, useCallback } from 'react'
import { SceneContext } from '../../context/SceneContext'
import { buildTree } from '../../utils/treeParser'
import { getTreeStats } from '../../data/agentDataLoader'

/**
 * Display tree statistics in the HUD
 */
export function TreeStatsHUD() {
  const {
    treeNodes: nodes,
    treeLoading: isLoading,
    treeDataSource: dataSource,
    navigationIndex,
    navigationTotal,
    selectedTile,
    selectTile
  } = useContext(SceneContext)

  const [searchDocNo, setSearchDocNo] = useState('')
  const [searchError, setSearchError] = useState('')

  // Go to a specific doc_no
  const handleGoToDocNo = useCallback(() => {
    if (!searchDocNo.trim() || !nodes || nodes.length === 0) return

    const query = searchDocNo.trim().toUpperCase()

    // Try to find the node - check both doc_no and originalDocNo
    // Also try matching just the numeric part (e.g., "6.1.1.4" matches "A.6.1.1.4")
    const found = nodes.find(node => {
      const docNo = (node.doc_no || '').toUpperCase()
      const originalDocNo = (node.originalDocNo || '').toUpperCase()

      // Exact match
      if (docNo === query || originalDocNo === query) return true

      // Match without the "A." prefix
      if (docNo === 'A.' + query || originalDocNo === 'A.' + query) return true

      // Match the end (e.g., query "2.2.2" matches "A.6.1.1.4.2.2.2")
      if (docNo.endsWith('.' + query) || originalDocNo.endsWith('.' + query)) return true

      return false
    })

    if (found) {
      selectTile(found)
      setSearchError('')
      setSearchDocNo('')
    } else {
      setSearchError(`Not found: ${searchDocNo}`)
    }
  }, [searchDocNo, nodes, selectTile])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleGoToDocNo()
    }
    if (e.key === 'Escape') {
      setSearchDocNo('')
      setSearchError('')
    }
  }, [handleGoToDocNo])

  const stats = useMemo(() => {
    if (!nodes || nodes.length === 0) {
      return null
    }

    // Build tree to get accurate stats
    const tree = buildTree(nodes)
    return getTreeStats(tree[0] || nodes)
  }, [nodes])

  if (isLoading) {
    return (
      <div className="stats-hud">
        <div className="stats-content">
          <div className="stat-item">
            <span className="stat-label">Status:</span>
            <span className="stat-value loading">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="stats-hud">
      <div className="stats-content">
        {/* Always show search box */}
        <div className="goto-section" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
          <label className="goto-label">Go to doc_no:</label>
          <div className="goto-input-row">
            <input
              type="text"
              className="goto-input"
              placeholder="e.g., 6.1.1.4.2.2.2"
              value={searchDocNo}
              onChange={(e) => {
                setSearchDocNo(e.target.value)
                setSearchError('')
              }}
              onKeyDown={handleKeyDown}
            />
            <button className="goto-button" onClick={handleGoToDocNo}>Go</button>
          </div>
          {searchError && <div className="goto-error">{searchError}</div>}
        </div>

        {/* Show stats only when no tile selected */}
        {!selectedTile && stats && (
          <>
            <div className="stat-item" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <span className="stat-label">Data Source:</span>
              <span className="stat-value">{dataSource}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Nodes:</span>
              <span className="stat-value">{stats.totalNodes}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Max Depth:</span>
              <span className="stat-value">{stats.maxDepth}</span>
            </div>
            {navigationIndex >= 0 && navigationTotal > 0 && (
              <div className="stat-item navigation-indicator">
                <span className="stat-label">Position:</span>
                <span className="stat-value highlight">
                  {navigationIndex + 1} / {navigationTotal}
                </span>
              </div>
            )}
            <div className="stat-item">
              <span className="stat-label">Node Types:</span>
              <span className="stat-value">
                {Object.entries(stats.nodesByType)
                  .map(([type, count]) => `${type}: ${count}`)
                  .join(', ')}
              </span>
            </div>
          </>
        )}

        <div className="keyboard-hints">
          <div className="hint-item">
            <kbd>←</kbd><kbd>→</kbd> Navigate
          </div>
          <div className="hint-item">
            <kbd>Esc</kbd> Deselect
          </div>
        </div>
      </div>

      <style>{`
        .stats-hud {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid rgba(59, 130, 246, 0.5);
          border-radius: 8px;
          padding: 16px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 13px;
          color: #e5e7eb;
          backdrop-filter: blur(10px);
          z-index: 1000;
          min-width: 300px;
        }

        .stats-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .stat-label {
          color: #9ca3af;
          font-weight: 500;
        }

        .stat-value {
          color: #60a5fa;
          font-weight: 600;
        }

        .stat-value.loading {
          color: #f59e0b;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .navigation-indicator {
          background: rgba(59, 130, 246, 0.1);
          margin: 8px -16px;
          padding: 8px 16px;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        }

        .stat-value.highlight {
          color: #93c5fd;
          font-size: 15px;
          font-weight: 700;
        }

        .goto-section {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
        }

        .goto-label {
          display: block;
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 6px;
        }

        .goto-input-row {
          display: flex;
          gap: 8px;
        }

        .goto-input {
          flex: 1;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 4px;
          padding: 6px 10px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 12px;
          color: #e5e7eb;
          outline: none;
        }

        .goto-input:focus {
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .goto-input::placeholder {
          color: #6b7280;
        }

        .goto-button {
          background: rgba(59, 130, 246, 0.3);
          border: 1px solid rgba(59, 130, 246, 0.5);
          border-radius: 4px;
          padding: 6px 12px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 12px;
          color: #93c5fd;
          cursor: pointer;
          transition: background 0.2s;
        }

        .goto-button:hover {
          background: rgba(59, 130, 246, 0.5);
        }

        .goto-error {
          margin-top: 6px;
          font-size: 11px;
          color: #f87171;
        }

        .keyboard-hints {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .hint-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #9ca3af;
        }

        kbd {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 4px;
          padding: 2px 6px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 11px;
          color: #93c5fd;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
