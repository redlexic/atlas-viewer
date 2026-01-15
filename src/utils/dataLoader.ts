import type { AtlasNode } from '../types';
import { preprocessData, preprocessNode, findNodeByDocNo, getChildren } from './treeUtils';

/**
 * Data file paths
 */
export const DATA_FILES = {
  atlas: '/atlas-2025-12-11.json',
  atlasLatest: '/atlas-2026-01-14.json',
  skybaseChangeset: '/skybase/skybase-changeset-complete.json',
} as const;

/**
 * Changeset section structure
 */
export interface ChangesetSection {
  doc_no: string;
  name: string;
  content: string;
  type?: string;
}

/**
 * Changeset structure
 */
export interface Changeset {
  name: string;
  description: string;
  source_atlas: string;
  created: string;
  base_doc_no: string;
  section_count: number;
  sections: ChangesetSection[];
}

/**
 * Agent doc numbers in the main atlas
 */
export const AGENT_DOC_NUMBERS = {
  spark: 'A.6.1.1.1',
  grove: 'A.6.1.1.2',
  keel: 'A.6.1.1.3',
  launchAgent3: 'A.6.1.1.4',
  obex: 'A.6.1.1.5',
  launchAgent5: 'A.6.1.1.6',
} as const;

/**
 * Load the main atlas data
 */
export const loadAtlasData = async (): Promise<AtlasNode[]> => {
  const response = await fetch(DATA_FILES.atlas);
  const data = await response.json();
  return preprocessData(data);
};

/**
 * Load an agent JSON file
 */
export const loadAgentData = async (filename: string): Promise<AtlasNode> => {
  const response = await fetch(filename);
  const data = await response.json();
  preprocessNode(data);
  return data;
};

/**
 * Agent info structure
 */
export interface AgentInfo {
  name: string;
  node: AtlasNode;
}

/**
 * Load all comparison agents
 */
export const loadComparisonAgents = async (): Promise<AgentInfo[]> => {
  const atlasData = await loadAtlasData();

  const agents: AgentInfo[] = [];

  // Extract agents from main atlas
  const spark = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.spark);
  const grove = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.grove);
  const keel = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.keel);
  const launch3 = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.launchAgent3);
  const obex = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.obex);
  const launch5 = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.launchAgent5);

  if (spark) agents.push({ name: 'Spark', node: spark });
  if (grove) agents.push({ name: 'Grove', node: grove });
  if (keel) agents.push({ name: 'Keel', node: keel });
  if (launch3) agents.push({ name: 'Launch Agent 3', node: launch3 });
  if (obex) agents.push({ name: 'Obex', node: obex });
  if (launch5) agents.push({ name: 'Launch Agent 5', node: launch5 });

  return agents;
};

/**
 * Load the latest atlas data
 */
export const loadLatestAtlasData = async (): Promise<AtlasNode[]> => {
  const response = await fetch(DATA_FILES.atlasLatest);
  const data = await response.json();
  return preprocessData(data);
};

/**
 * Load a changeset file
 */
export const loadChangeset = async (path?: string): Promise<Changeset> => {
  const response = await fetch(path || DATA_FILES.skybaseChangeset);
  const data = await response.json();
  return data;
};

/**
 * Flatten an agent node into a map of doc_no -> section
 */
export const flattenAgentSections = (node: AtlasNode): Map<string, AtlasNode> => {
  const sections = new Map<string, AtlasNode>();

  const traverse = (n: AtlasNode) => {
    sections.set(n.doc_no, n);

    // Check all possible child arrays
    const childKeys = [
      'agent_scope_database',
      'sections_and_primary_docs',
      'articles',
      'annotations',
      'tenets',
      'active_data',
      'needed_research',
    ];

    for (const key of childKeys) {
      const children = n[key as keyof AtlasNode];
      if (Array.isArray(children)) {
        for (const child of children) {
          if (child && typeof child === 'object' && 'doc_no' in child) {
            traverse(child as AtlasNode);
          }
        }
      }
    }
  };

  traverse(node);
  return sections;
};

/**
 * Get a node and all its children as a flat map
 * Uses the generic getChildren function for broader compatibility
 */
export const getNodeWithAllChildren = (
  atlasData: AtlasNode[],
  docNo: string
): Map<string, AtlasNode> => {
  const sections = new Map<string, AtlasNode>();

  const node = findNodeByDocNo(atlasData, docNo);
  if (!node) return sections;

  const traverse = (n: AtlasNode) => {
    sections.set(n.doc_no, n);
    const children = getChildren(n);
    for (const child of children) {
      traverse(child);
    }
  };

  traverse(node);
  return sections;
};

/**
 * Search atlas sections by doc_no or name
 * Returns matching nodes with their hierarchy context
 */
export const searchAtlasSections = (
  atlasData: AtlasNode[],
  query: string,
  maxResults: number = 50
): AtlasNode[] => {
  if (!query.trim()) return [];

  const results: AtlasNode[] = [];
  const lowerQuery = query.toLowerCase();

  const traverse = (nodes: AtlasNode[]) => {
    for (const node of nodes) {
      if (results.length >= maxResults) return;

      // Match by doc_no or name
      const matchesDocNo = node.doc_no.toLowerCase().includes(lowerQuery);
      const matchesName = node.name.toLowerCase().includes(lowerQuery);

      if (matchesDocNo || matchesName) {
        results.push(node);
      }

      // Continue searching children
      const children = getChildren(node);
      if (children.length > 0) {
        traverse(children);
      }
    }
  };

  traverse(atlasData);
  return results;
};
