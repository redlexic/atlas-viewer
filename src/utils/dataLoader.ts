import type { AtlasNode } from '../types';
import { preprocessData, preprocessNode, findNodeByDocNo } from './treeUtils';

/**
 * Data file paths
 */
export const DATA_FILES = {
  atlas: '/atlas-2025-12-11.json',
} as const;

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
