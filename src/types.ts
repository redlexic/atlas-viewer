export interface AtlasNode {
  type: string;
  doc_no: string;
  name: string;
  uuid: string;
  last_modified: string;
  content: string;
  [key: string]: any; // Allow any other fields
  childCount?: number; // Preprocessed child count
}

export interface TreeNodeProps {
  node: AtlasNode;
  level: number;
  expandedNodes: Set<string>;
  selectedNodeId: string | null;
  onToggle: (uuid: string) => void;
  onExpandAll: (uuid: string) => void;
  onSelect: (uuid: string) => void;
}
