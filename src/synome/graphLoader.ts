/**
 * Synome Graph Loader
 *
 * Converts Atlas JSON tree structure into a Graphology graph.
 * Extracts relationships, addresses, and cross-references.
 */

import Graph from 'graphology';
import type {
  AtlasNode,
  SynomeNodeAttributes,
  SynomeEdgeAttributes,
  SynomeNodeType,
  GraphExport,
} from './types';
import { NODE_COLORS, PRIMITIVE_CATEGORIES } from './types';

// =============================================================================
// Regex Patterns for Content Extraction
// =============================================================================

const PATTERNS = {
  // Ethereum address: 0x followed by 40 hex characters
  ethAddress: /0x[a-fA-F0-9]{40}/g,

  // Doc number reference: A.X.Y.Z format
  docNo: /A\.\d+(?:\.\d+)+/g,

  // UUID reference: standard UUID format
  uuid: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,

  // Status in backticks
  status: /`(Active|Completed|Inactive|Suspended)`/,

  // Markdown link with UUID: [Text](uuid)
  markdownLink: /\[([^\]]+)\]\(([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)/gi,
};

// =============================================================================
// Node Type Classification
// =============================================================================

function classifyNode(node: AtlasNode): SynomeNodeType {
  const name = node.name.toLowerCase();
  const docNo = node.doc_no;

  // Agent root node (e.g., A.6.1.1.4)
  if (/^A\.6\.1\.1\.\d+$/.test(docNo)) {
    return 'Agent';
  }

  // Primitive Hub Document
  if (name.includes('primitive hub document') || name.includes('hub document')) {
    return 'PrimitiveHub';
  }

  // Primitive (contains "primitive" in name)
  if (name.includes('primitive') && !name.includes('hub')) {
    return 'Primitive';
  }

  // Instance Configuration Document
  if (name.includes('instance configuration') || name.includes('configuration document')) {
    return 'Instance';
  }

  // Directory nodes
  if (
    name.includes('directory') ||
    name.includes('active instances') ||
    name.includes('completed instances') ||
    name.includes('in progress')
  ) {
    return 'Directory';
  }

  // Status nodes
  if (name.includes('global activation status')) {
    return 'Status';
  }

  // Address nodes
  if (name.includes('address') || name.includes('subproxy') || name.includes('multisig')) {
    return 'Address';
  }

  // Config nodes
  if (name.includes('rate limit') || name.includes('parameter') || name.includes('config')) {
    return 'Config';
  }

  return 'Document';
}

// =============================================================================
// Extract Data from Content
// =============================================================================

function extractAddresses(content: string): string[] {
  const matches = content.match(PATTERNS.ethAddress);
  return matches ? [...new Set(matches)] : [];
}

function extractDocReferences(content: string): string[] {
  const matches = content.match(PATTERNS.docNo);
  return matches ? [...new Set(matches)] : [];
}

function extractUuidReferences(content: string): string[] {
  const uuids: string[] = [];

  // Extract from markdown links
  let match;
  const linkPattern = new RegExp(PATTERNS.markdownLink.source, 'gi');
  while ((match = linkPattern.exec(content)) !== null) {
    uuids.push(match[2].toLowerCase());
  }

  return [...new Set(uuids)];
}

function extractStatus(content: string): SynomeNodeAttributes['status'] | undefined {
  const match = content.match(PATTERNS.status);
  if (match) {
    return match[1] as SynomeNodeAttributes['status'];
  }
  return undefined;
}

// =============================================================================
// Get Children from Atlas Node
// =============================================================================

function getAtlasChildren(node: AtlasNode): AtlasNode[] {
  const children: AtlasNode[] = [];

  for (const key in node) {
    const value = node[key];
    if (Array.isArray(value) && value.length > 0) {
      if (
        value[0] &&
        typeof value[0] === 'object' &&
        'type' in value[0] &&
        'doc_no' in value[0] &&
        'uuid' in value[0]
      ) {
        children.push(...(value as AtlasNode[]));
      }
    }
  }

  return children;
}

// =============================================================================
// Count Descendants
// =============================================================================

function countDescendants(node: AtlasNode): number {
  const children = getAtlasChildren(node);
  let count = children.length;
  for (const child of children) {
    count += countDescendants(child);
  }
  return count;
}

// =============================================================================
// Build Graph from Atlas Node
// =============================================================================

export function buildGraphFromAtlas(
  rootNode: AtlasNode,
  _atlasVersion?: string
): Graph<SynomeNodeAttributes, SynomeEdgeAttributes> {
  const graph = new Graph<SynomeNodeAttributes, SynomeEdgeAttributes>({
    multi: true,
    allowSelfLoops: false,
  });

  const uuidToDocNo = new Map<string, string>();

  // First pass: add all nodes
  function addNodes(node: AtlasNode, depth: number) {
    const nodeType = classifyNode(node);
    const childCount = countDescendants(node);

    const attributes: SynomeNodeAttributes = {
      uuid: node.uuid,
      doc_no: node.doc_no,
      name: node.name,
      atlasType: node.type,
      nodeType,
      content: node.content,
      last_modified: node.last_modified,
      status: extractStatus(node.content),
      addresses: extractAddresses(node.content),
      references: extractDocReferences(node.content),
      uuidReferences: extractUuidReferences(node.content),
      depth,
      childCount,
      size: Math.max(5, Math.min(20, 5 + Math.log(childCount + 1) * 3)),
      color: NODE_COLORS[nodeType],
      label: node.name,
    };

    graph.addNode(node.uuid, attributes);
    uuidToDocNo.set(node.uuid, node.doc_no);

    const children = getAtlasChildren(node);
    for (const child of children) {
      addNodes(child, depth + 1);
    }
  }

  addNodes(rootNode, 0);

  // Second pass: add edges
  function addEdges(node: AtlasNode, parentUuid?: string) {
    // Parent-child relationship
    if (parentUuid) {
      graph.addEdge(node.uuid, parentUuid, {
        edgeType: 'CHILD_OF',
        weight: 1,
      });
    }

    // Cross-references via UUID
    const attrs = graph.getNodeAttributes(node.uuid);
    if (attrs.uuidReferences) {
      for (const refUuid of attrs.uuidReferences) {
        if (graph.hasNode(refUuid) && refUuid !== node.uuid) {
          graph.addEdge(node.uuid, refUuid, {
            edgeType: 'REFERENCES',
            weight: 0.5,
          });
        }
      }
    }

    const children = getAtlasChildren(node);
    for (const child of children) {
      addEdges(child, node.uuid);
    }
  }

  addEdges(rootNode);

  return graph;
}

// =============================================================================
// Export Graph to Portable Format
// =============================================================================

export function exportGraph(
  graph: Graph<SynomeNodeAttributes, SynomeEdgeAttributes>,
  atlasVersion: string
): GraphExport {
  const nodes: GraphExport['nodes'] = [];
  const edges: GraphExport['edges'] = [];

  graph.forEachNode((nodeId, attributes) => {
    nodes.push({
      id: nodeId,
      labels: [attributes.nodeType, attributes.atlasType],
      properties: {
        doc_no: attributes.doc_no,
        name: attributes.name,
        content: attributes.content,
        status: attributes.status,
        addresses: attributes.addresses,
        depth: attributes.depth,
        childCount: attributes.childCount,
      },
    });
  });

  graph.forEachEdge((_edgeId, attributes, source, target) => {
    edges.push({
      source,
      target,
      type: attributes.edgeType,
      properties: {
        weight: attributes.weight,
        label: attributes.label,
      },
    });
  });

  return {
    nodes,
    edges,
    metadata: {
      exportedAt: new Date().toISOString(),
      sourceAtlasVersion: atlasVersion,
      nodeCount: nodes.length,
      edgeCount: edges.length,
    },
  };
}

// =============================================================================
// Get Graph Statistics
// =============================================================================

export interface GraphStats {
  nodeCount: number;
  edgeCount: number;
  nodesByType: Record<string, number>;
  maxDepth: number;
  totalAddresses: number;
  totalReferences: number;
  primitiveCount: number;
  instanceCount: number;
}

export function getGraphStats(
  graph: Graph<SynomeNodeAttributes, SynomeEdgeAttributes>
): GraphStats {
  const nodesByType: Record<string, number> = {};
  let maxDepth = 0;
  let totalAddresses = 0;
  let totalReferences = 0;
  let primitiveCount = 0;
  let instanceCount = 0;

  graph.forEachNode((_, attrs) => {
    // Count by type
    nodesByType[attrs.nodeType] = (nodesByType[attrs.nodeType] || 0) + 1;

    // Track max depth
    if (attrs.depth > maxDepth) {
      maxDepth = attrs.depth;
    }

    // Count addresses
    if (attrs.addresses) {
      totalAddresses += attrs.addresses.length;
    }

    // Count references
    if (attrs.references) {
      totalReferences += attrs.references.length;
    }

    // Count primitives and instances
    if (attrs.nodeType === 'Primitive') {
      primitiveCount++;
    }
    if (attrs.nodeType === 'Instance') {
      instanceCount++;
    }
  });

  return {
    nodeCount: graph.order,
    edgeCount: graph.size,
    nodesByType,
    maxDepth,
    totalAddresses,
    totalReferences,
    primitiveCount,
    instanceCount,
  };
}

// =============================================================================
// Filter Graph by Criteria
// =============================================================================

export function filterGraphByType(
  graph: Graph<SynomeNodeAttributes, SynomeEdgeAttributes>,
  types: SynomeNodeType[]
): Graph<SynomeNodeAttributes, SynomeEdgeAttributes> {
  const filtered = new Graph<SynomeNodeAttributes, SynomeEdgeAttributes>({
    multi: true,
    allowSelfLoops: false,
  });

  // Add matching nodes
  graph.forEachNode((nodeId, attrs) => {
    if (types.includes(attrs.nodeType)) {
      filtered.addNode(nodeId, { ...attrs });
    }
  });

  // Add edges between matching nodes
  graph.forEachEdge((_, attrs, source, target) => {
    if (filtered.hasNode(source) && filtered.hasNode(target)) {
      filtered.addEdge(source, target, { ...attrs });
    }
  });

  return filtered;
}

// =============================================================================
// Get Primitive Hierarchy
// =============================================================================

export interface PrimitiveInfo {
  uuid: string;
  doc_no: string;
  name: string;
  status?: string;
  category?: string;
  instanceCount: number;
  hasHub: boolean;
}

export function getPrimitiveHierarchy(
  graph: Graph<SynomeNodeAttributes, SynomeEdgeAttributes>
): PrimitiveInfo[] {
  const primitives: PrimitiveInfo[] = [];

  graph.forEachNode((nodeId, attrs) => {
    if (attrs.nodeType === 'Primitive') {
      // Determine category
      let category: string | undefined;
      for (const [cat, names] of Object.entries(PRIMITIVE_CATEGORIES)) {
        if (names.some((name) => attrs.name.toLowerCase().includes(name.toLowerCase()))) {
          category = cat;
          break;
        }
      }

      // Count instances (children that are Instance type)
      let instanceCount = 0;
      let hasHub = false;

      graph.forEachNeighbor(nodeId, (neighborId) => {
        const neighborAttrs = graph.getNodeAttributes(neighborId);
        if (neighborAttrs.nodeType === 'Instance') {
          instanceCount++;
        }
        if (neighborAttrs.nodeType === 'PrimitiveHub') {
          hasHub = true;
        }
      });

      primitives.push({
        uuid: attrs.uuid,
        doc_no: attrs.doc_no,
        name: attrs.name,
        status: attrs.status,
        category,
        instanceCount,
        hasHub,
      });
    }
  });

  // Sort by doc_no
  primitives.sort((a, b) => a.doc_no.localeCompare(b.doc_no, undefined, { numeric: true }));

  return primitives;
}
