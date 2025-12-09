/**
 * Core Atlas node structure
 */
export interface AtlasNode {
  type: string;
  doc_no: string;
  name: string;
  uuid: string;
  last_modified: string;
  content: string;
  [key: string]: unknown; // Allow any other fields
  childCount?: number; // Preprocessed child count
}

/**
 * Props for the TreeNode component
 */
export interface TreeNodeProps {
  node: AtlasNode;
  level: number;
  expandedNodes: Set<string>;
  selectedNodeId: string | null;
  onToggle: (uuid: string) => void;
  onExpandAll: (uuid: string) => void;
  onSelect: (uuid: string) => void;
}

/**
 * Agent information for comparison views
 */
export interface AgentInfo {
  name: string;
  node: AtlasNode;
}

/**
 * Selected sections for the Builder
 */
export type SelectedSections = Record<string, { agentName: string; node: AtlasNode }>;

/**
 * Custom edits applied to Builder sections
 */
export type CustomEdits = Record<string, { name?: string; content?: string }>;

/**
 * Visibility state for agents in comparison view
 */
export type AgentVisibility = Record<string, boolean>;
