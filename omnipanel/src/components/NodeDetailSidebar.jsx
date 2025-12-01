import { useContext, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { SceneContext } from '../context/SceneContext'
import { getNodeColor } from '../data/sampleAtlasNodes'
import { getParentDocNo } from '../utils/treeParser'
import { buildTree } from '../utils/treeParser'
import { getTreeStats } from '../data/agentDataLoader'

/**
 * Sidebar that displays full node details when a node is selected
 */
export function NodeDetailSidebar() {
  const { selectedTile, selectTile, treeNodes, treeDataSource, navigationIndex, navigationTotal } = useContext(SceneContext)

  if (!selectedTile) {
    return null
  }

  const node = selectedTile
  const typeColor = getNodeColor(node.type)

  // Find parent node
  const parentNode = useMemo(() => {
    if (!node.doc_no || !treeNodes || treeNodes.length === 0) {
      return null
    }

    const parentDocNo = getParentDocNo(node.doc_no)
    if (!parentDocNo) {
      return null // Root node has no parent
    }

    // Search for parent in all nodes
    return treeNodes.find(n => n.doc_no === parentDocNo)
  }, [node.doc_no, treeNodes])

  // Helper to get count of array fields
  const getArrayCount = (field) => {
    return Array.isArray(node[field]) ? node[field].length : 0
  }

  // Calculate node depth from doc_no
  const getDepth = () => {
    if (!node.doc_no) return 0
    // Count dots and add 1 (e.g., "A" = 1, "A.1" = 2, "A.1.2" = 3)
    return node.doc_no.split('.').length
  }

  // Calculate tree stats
  const stats = useMemo(() => {
    if (!treeNodes || treeNodes.length === 0) {
      return null
    }
    const tree = buildTree(treeNodes)
    return getTreeStats(tree[0] || treeNodes)
  }, [treeNodes])

  const handleClose = () => {
    selectTile(null)
  }

  return (
    <>
      <div className="node-detail-sidebar">
        <div className="sidebar-header">
          <div className="header-content">
            <div className="doc-no" style={{ color: typeColor }}>
              {node.doc_no}
            </div>
            <div className="node-name">{node.name}</div>
            <div className="node-type-badge" style={{
              backgroundColor: typeColor + '20',
              borderColor: typeColor,
              color: typeColor
            }}>
              {node.type}
            </div>
          </div>
          <button className="close-button" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          {/* Metadata Section */}
          <div className="metadata-section">
            {node.last_modified && (
              <div className="metadata-item">
                <span className="metadata-label">Last Modified:</span>
                <span className="metadata-value">{node.last_modified || 'N/A'}</span>
              </div>
            )}

            {getArrayCount('annotations') > 0 && (
              <div className="metadata-item">
                <span className="metadata-label">Annotations:</span>
                <span className="metadata-value">{getArrayCount('annotations')}</span>
              </div>
            )}

            {getArrayCount('tenets') > 0 && (
              <div className="metadata-item">
                <span className="metadata-label">Tenets:</span>
                <span className="metadata-value">{getArrayCount('tenets')}</span>
              </div>
            )}

            {getArrayCount('active_data') > 0 && (
              <div className="metadata-item">
                <span className="metadata-label">Active Data:</span>
                <span className="metadata-value">{getArrayCount('active_data')}</span>
              </div>
            )}

            {getArrayCount('needed_research') > 0 && (
              <div className="metadata-item">
                <span className="metadata-label">Needed Research:</span>
                <span className="metadata-value">{getArrayCount('needed_research')}</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          {node.content && (
            <div className="content-section">
              <h3 className="section-title">Content</h3>
              <div className="markdown-content">
                <ReactMarkdown>{node.content}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Data Source Panel at bottom */}
        <div className="stats-panel">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Data Source:</span>
              <span className="stat-value">{treeDataSource}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Nodes:</span>
              <span className="stat-value">{stats?.totalNodes || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Max Depth:</span>
              <span className="stat-value">{stats?.maxDepth || 0}</span>
            </div>
            {navigationIndex >= 0 && navigationTotal > 0 && (
              <div className="stat-item">
                <span className="stat-label">Position:</span>
                <span className="stat-value highlight">
                  {navigationIndex + 1} / {navigationTotal}
                </span>
              </div>
            )}
            {parentNode && (
              <div className="stat-item">
                <span className="stat-label">Parent:</span>
                <span className="stat-value">{parentNode.doc_no}</span>
              </div>
            )}
            <div className="stat-item">
              <span className="stat-label">Depth:</span>
              <span className="stat-value">{getDepth()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Children:</span>
              <span className="stat-value">{getArrayCount('agent_scope_database')}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .node-detail-sidebar {
          position: fixed;
          right: 0;
          top: 0;
          width: 400px;
          height: 100vh;
          background: rgba(17, 24, 39, 0.98);
          border-left: 2px solid rgba(59, 130, 246, 0.3);
          backdrop-filter: blur(20px);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: rgba(0, 0, 0, 0.3);
        }

        .header-content {
          flex: 1;
        }

        .doc-no {
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }

        .node-name {
          font-size: 20px;
          font-weight: 700;
          color: #f3f4f6;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .node-type-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .close-button {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .close-button:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          transform: scale(1.05);
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .sidebar-content::-webkit-scrollbar {
          width: 8px;
        }

        .sidebar-content::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .sidebar-content::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 4px;
        }

        .sidebar-content::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }

        .metadata-section {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .metadata-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(59, 130, 246, 0.1);
        }

        .metadata-item:last-child {
          border-bottom: none;
        }

        .metadata-label {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 500;
        }

        .metadata-value {
          color: #60a5fa;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Monaco', 'Menlo', monospace;
        }

        .content-section {
          margin-top: 24px;
        }

        .section-title {
          color: #60a5fa;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid rgba(59, 130, 246, 0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .markdown-content {
          color: #e5e7eb;
          font-size: 14px;
          line-height: 1.7;
        }

        .markdown-content p {
          margin-bottom: 16px;
        }

        .markdown-content p:last-child {
          margin-bottom: 0;
        }

        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4 {
          color: #f3f4f6;
          margin-top: 24px;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .markdown-content h1 { font-size: 24px; }
        .markdown-content h2 { font-size: 20px; }
        .markdown-content h3 { font-size: 18px; }
        .markdown-content h4 { font-size: 16px; }

        .markdown-content ul,
        .markdown-content ol {
          margin-left: 20px;
          margin-bottom: 16px;
        }

        .markdown-content li {
          margin-bottom: 8px;
        }

        .markdown-content code {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 3px;
          padding: 2px 6px;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 13px;
          color: #93c5fd;
        }

        .markdown-content pre {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 6px;
          padding: 16px;
          overflow-x: auto;
          margin-bottom: 16px;
        }

        .markdown-content pre code {
          background: none;
          border: none;
          padding: 0;
        }

        .markdown-content blockquote {
          border-left: 4px solid rgba(59, 130, 246, 0.5);
          padding-left: 16px;
          margin-left: 0;
          margin-bottom: 16px;
          color: #d1d5db;
          font-style: italic;
        }

        .markdown-content a {
          color: #60a5fa;
          text-decoration: none;
          border-bottom: 1px solid rgba(96, 165, 250, 0.3);
          transition: all 0.2s;
        }

        .markdown-content a:hover {
          color: #93c5fd;
          border-bottom-color: rgba(147, 197, 253, 0.6);
        }

        .stats-panel {
          background: rgba(0, 0, 0, 0.4);
          border-top: 2px solid rgba(59, 130, 246, 0.3);
          padding: 16px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 16px;
        }

        .stats-grid .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stats-grid .stat-label {
          color: #9ca3af;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stats-grid .stat-value {
          color: #60a5fa;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Monaco', 'Menlo', monospace;
        }

        .stats-grid .stat-value.highlight {
          color: #93c5fd;
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .node-detail-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}
