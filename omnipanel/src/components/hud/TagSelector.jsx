import { useContext, useEffect, useRef, useMemo } from 'react'
import { SceneContext } from '../../context/SceneContext'

/**
 * Tag Selector Component
 * Click tags to filter and highlight nodes in the tree view.
 * When a tag is selected:
 * - All matching nodes get highlighted
 * - First node is auto-selected and camera pans to it
 * - Arrow keys navigate only through tagged nodes
 *
 * Tag counts reflect only the currently loaded datasets.
 */
export function TagSelector() {
  const { tagIndex, selectedTag, selectTag, clearTag, taggedDocNos, activeSet, selectTile, treeNodes } = useContext(SceneContext)
  const prevTagRef = useRef(null)

  // Auto-select first node when tag changes and activeSet is populated
  useEffect(() => {
    // Only auto-select if:
    // 1. A tag is selected
    // 2. It's a new tag (not the same as before)
    // 3. activeSet has nodes (meaning treeNodes are loaded and filtering worked)
    if (selectedTag && selectedTag !== prevTagRef.current && activeSet.length > 0) {
      console.log(`[TagSelector] Auto-selecting first of ${activeSet.length} nodes for tag '${selectedTag}'`)
      selectTile(activeSet[0])
      prevTagRef.current = selectedTag
    } else if (!selectedTag) {
      prevTagRef.current = null
    }
  }, [selectedTag, activeSet, selectTile])

  // Compute tag counts based on currently loaded treeNodes
  // This ensures counts reflect only what's visible, not the entire atlas
  const tagCountsForLoadedData = useMemo(() => {
    if (!tagIndex?.tagIndex || !treeNodes || treeNodes.length === 0) {
      return {}
    }

    const counts = {}

    // For each tag, count how many treeNodes have matching doc_nos
    for (const [tagKey, taggedNodes] of Object.entries(tagIndex.tagIndex)) {
      const taggedDocNoSet = new Set(taggedNodes.map(n => n.doc_no))

      // Count treeNodes that have at least one agent with a matching doc_no
      let count = 0
      for (const node of treeNodes) {
        if (node.originalDocNo && taggedDocNoSet.has(node.originalDocNo)) {
          count++
          continue
        }
        if (node.agents) {
          const hasMatch = node.agents.some(agentData =>
            agentData.node?.doc_no && taggedDocNoSet.has(agentData.node.doc_no)
          )
          if (hasMatch) count++
        }
      }
      counts[tagKey] = count
    }

    return counts
  }, [tagIndex, treeNodes])

  if (!tagIndex?.tagDefinitions) {
    return null // Don't render until tag data is loaded
  }

  const tags = Object.entries(tagIndex.tagDefinitions)
  // Use computed counts for loaded data instead of global atlas counts
  const tagCounts = tagCountsForLoadedData

  // Tag colors for visual distinction
  const TAG_COLORS = {
    skylink: '#3b82f6',    // blue
    keel: '#10b981',       // green
    susds: '#f59e0b',      // amber
    erc4626: '#8b5cf6',    // purple
    bridging: '#ec4899',   // pink
    psm: '#ef4444',        // red
    multichain: '#06b6d4', // cyan
  }

  const handleTagClick = (tagKey) => {
    if (selectedTag === tagKey) {
      clearTag() // Deselect if clicking the same tag
      selectTile(null) // Also deselect the tile
    } else {
      selectTag(tagKey)
      // First node selection happens in useEffect above after activeSet updates
    }
  }

  return (
    <div className="tag-selector">
      <div className="tag-selector-header">
        <span className="switcher-label">Tags:</span>
        {selectedTag && (
          <span className="tag-count">
            {taggedDocNos.size} nodes
          </span>
        )}
      </div>
      <div className="tag-buttons">
        {tags.map(([tagKey, tagDef]) => {
          const isSelected = selectedTag === tagKey
          const tagColor = TAG_COLORS[tagKey] || '#60a5fa'
          const count = tagCounts[tagKey] || 0

          return (
            <button
              key={tagKey}
              className={`tag-button ${isSelected ? 'active' : ''}`}
              onClick={() => handleTagClick(tagKey)}
              title={`${tagDef.description} (${count} nodes)`}
              style={isSelected ? {
                background: `${tagColor}40`,
                borderColor: tagColor,
                color: tagColor,
                boxShadow: `0 0 10px ${tagColor}40`,
              } : {}}
            >
              <span className="tag-name">{tagDef.name}</span>
              <span className="tag-badge">{count}</span>
            </button>
          )
        })}
      </div>
      {selectedTag && (
        <div className="tag-hint">
          Use arrow keys to navigate tagged nodes
        </div>
      )}

      <style>{`
        .tag-selector {
          position: fixed;
          top: 165px;
          left: 20px;
          background: rgba(17, 24, 39, 0.9);
          border: 1px solid rgba(59, 130, 246, 0.5);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: 'Monaco', 'Menlo', monospace;
          backdrop-filter: blur(10px);
          z-index: 1000;
          max-width: 320px;
        }

        .tag-selector-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .tag-selector .switcher-label {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 500;
        }

        .tag-count {
          color: #fbbf24;
          font-size: 11px;
          font-weight: 600;
          background: rgba(251, 191, 36, 0.2);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .tag-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-button {
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
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tag-button:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .tag-button.active {
          background: rgba(59, 130, 246, 0.3);
          border-color: #60a5fa;
          color: #93c5fd;
        }

        .tag-name {
          font-weight: 600;
        }

        .tag-badge {
          background: rgba(0, 0, 0, 0.3);
          padding: 1px 5px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 500;
        }

        .tag-hint {
          margin-top: 10px;
          color: #6b7280;
          font-size: 10px;
          font-style: italic;
          text-align: center;
        }
      `}</style>
    </div>
  )
}
