import { useContext } from 'react'
import { SceneContext } from '../../context/SceneContext'

/**
 * Tagged Nodes List Component
 * Shows a scrollable list of all nodes matching the selected tag.
 * Clicking a node selects it and pans the camera to it.
 */
export function TaggedNodesList() {
  const {
    selectedTag,
    tagIndex,
    activeSet,
    activeSetIndex,
    selectTile
  } = useContext(SceneContext)

  // Only show when a tag is selected
  if (!selectedTag || !tagIndex?.tagDefinitions?.[selectedTag]) {
    return null
  }

  const tagDef = tagIndex.tagDefinitions[selectedTag]

  // Tag colors (same as TagSelector)
  const TAG_COLORS = {
    skylink: '#3b82f6',
    keel: '#10b981',
    susds: '#f59e0b',
    erc4626: '#8b5cf6',
    bridging: '#ec4899',
    psm: '#ef4444',
    multichain: '#06b6d4',
  }
  const tagColor = TAG_COLORS[selectedTag] || '#60a5fa'

  const handleNodeClick = (node, index) => {
    selectTile(node)
  }

  return (
    <div className="tagged-nodes-list">
      <div className="list-header" style={{ borderColor: tagColor }}>
        <span className="tag-label" style={{ color: tagColor }}>{tagDef.name}</span>
        <span className="node-count">{activeSet.length} nodes</span>
      </div>

      <div className="nodes-scroll">
        {activeSet.map((node, index) => {
          const isSelected = index === activeSetIndex
          // Get the actual agent node info if available (has original doc_no)
          const agentNode = node.agents?.[0]?.node || node
          // Use originalDocNo if available, otherwise fall back to agent's doc_no
          const displayDocNo = node.originalDocNo || agentNode.doc_no || node.doc_no
          const displayName = agentNode.name || node.name

          return (
            <div
              key={node.doc_no}
              className={`node-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handleNodeClick(node, index)}
              style={isSelected ? {
                borderColor: tagColor,
                background: `${tagColor}20`
              } : {}}
            >
              <div className="node-index">{index + 1}</div>
              <div className="node-info">
                <div className="node-doc-no" style={isSelected ? { color: tagColor } : {}}>
                  {displayDocNo}
                </div>
                <div className="node-name">{displayName}</div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .tagged-nodes-list {
          position: fixed;
          left: 20px;
          top: 340px;
          width: 320px;
          max-height: calc(100vh - 380px);
          background: rgba(17, 24, 39, 0.95);
          border: 1px solid rgba(59, 130, 246, 0.5);
          border-radius: 8px;
          font-family: 'Monaco', 'Menlo', monospace;
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 2px solid;
          background: rgba(0, 0, 0, 0.3);
        }

        .tag-label {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .node-count {
          color: #9ca3af;
          font-size: 12px;
          font-weight: 500;
        }

        .nodes-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }

        .nodes-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .nodes-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .nodes-scroll::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 3px;
        }

        .nodes-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }

        .node-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 12px;
          border: 1px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
          margin-bottom: 4px;
        }

        .node-item:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .node-item.selected {
          border-width: 2px;
        }

        .node-index {
          min-width: 24px;
          height: 24px;
          background: rgba(59, 130, 246, 0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: #60a5fa;
        }

        .node-item.selected .node-index {
          background: rgba(59, 130, 246, 0.4);
          color: #93c5fd;
        }

        .node-info {
          flex: 1;
          min-width: 0;
        }

        .node-doc-no {
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 2px;
        }

        .node-name {
          font-size: 12px;
          color: #e5e7eb;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .node-item.selected .node-name {
          color: #f3f4f6;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}
