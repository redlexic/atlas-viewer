/**
 * Synome Graph Types
 *
 * Core types for representing Atlas data as a graph database structure.
 * Designed to be exportable to Neo4j, SurrealDB, or other graph databases.
 */

// =============================================================================
// Node Types
// =============================================================================

export type SynomeNodeType =
  | 'Agent'           // Prime/Halo/Executor (e.g., Skybase, Spark)
  | 'Primitive'       // Sky Primitive instance (e.g., Agent Creation Primitive)
  | 'PrimitiveHub'    // Hub document organizing primitive info
  | 'Instance'        // Active/Completed instance of a primitive
  | 'Directory'       // Directory node (Active/Completed/In Progress)
  | 'Config'          // Configuration document (rate limits, BEAM params)
  | 'Document'        // Generic document node
  | 'Status'          // Status node (Active, Completed, Inactive)
  | 'Address'         // Ethereum address node
  | 'Parameter';      // Parameter value node

export interface SynomeNodeAttributes {
  // Required fields (from Atlas)
  uuid: string;
  doc_no: string;
  name: string;
  atlasType: string;         // Original Atlas type (Core, Section, Article, etc.)
  nodeType: SynomeNodeType;  // Synome classification

  // Content
  content: string;
  last_modified: string;

  // Extracted data
  status?: 'Active' | 'Completed' | 'Inactive' | 'Suspended';
  addresses?: string[];      // Extracted Ethereum addresses
  references?: string[];     // Extracted doc_no references
  uuidReferences?: string[]; // Extracted UUID references

  // Visualization
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  label?: string;

  // Hierarchy
  depth: number;
  childCount: number;
}

// =============================================================================
// Edge Types
// =============================================================================

export type SynomeEdgeType =
  | 'CHILD_OF'        // Parent-child hierarchy
  | 'REFERENCES'      // Cross-reference via UUID or doc_no
  | 'IMPLEMENTS'      // Primitive implementation reference
  | 'INSTANCE_OF'     // Instance to primitive relationship
  | 'HAS_STATUS'      // Node to status relationship
  | 'CONTROLLED_BY'   // Address control relationship
  | 'LOCATED_AT';     // ICD location reference

export interface SynomeEdgeAttributes {
  edgeType: SynomeEdgeType;
  weight?: number;
  label?: string;
}

// =============================================================================
// Graph Export Format (for Neo4j/SurrealDB migration)
// =============================================================================

export interface GraphExport {
  nodes: Array<{
    id: string;
    labels: string[];
    properties: Record<string, unknown>;
  }>;
  edges: Array<{
    source: string;
    target: string;
    type: string;
    properties: Record<string, unknown>;
  }>;
  metadata: {
    exportedAt: string;
    sourceAtlasVersion: string;
    nodeCount: number;
    edgeCount: number;
  };
}

// =============================================================================
// Atlas Node (input format)
// =============================================================================

export interface AtlasNode {
  type: string;
  doc_no: string;
  name: string;
  uuid: string;
  last_modified: string;
  content: string;
  [key: string]: unknown;
}

// =============================================================================
// Node Color Scheme
// =============================================================================

export const NODE_COLORS: Record<SynomeNodeType, string> = {
  Agent: '#4CAF50',         // Green
  Primitive: '#2196F3',     // Blue
  PrimitiveHub: '#03A9F4',  // Light Blue
  Instance: '#FF9800',      // Orange
  Directory: '#9E9E9E',     // Gray
  Config: '#9C27B0',        // Purple
  Document: '#607D8B',      // Blue Gray
  Status: '#FFEB3B',        // Yellow
  Address: '#E91E63',       // Pink
  Parameter: '#00BCD4',     // Cyan
};

// =============================================================================
// Primitive Categories
// =============================================================================

export const PRIMITIVE_CATEGORIES = {
  genesis: ['Agent Creation', 'Prime Transformation', 'Executor Transformation', 'Agent Token'],
  operational: ['Executor Accord', 'Root Edit', 'Light Agent'],
  economic: ['Distribution Requirement', 'Market Cap Fee', 'Upkeep Rebate'],
  skylink: ['Token SkyLink'],
  reward: ['Distribution Reward', 'Integration Boost', 'Pioneer Chain'],
  capital: ['Allocation System', 'Junior Risk Capital Rental', 'Asset Liability Management Rental'],
  governance: ['Core Governance Reward'],
} as const;
