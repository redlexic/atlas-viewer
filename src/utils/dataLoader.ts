import type { AtlasNode } from '../types';
import { preprocessData, preprocessNode, findNodeByDocNo } from './treeUtils';

/**
 * Data file paths
 */
export const DATA_FILES = {
  atlas: '/atlas-2025-11-20.json',
  launchAgent6: '/launch_agent_6_agent.json',
} as const;

/**
 * Agent doc numbers in the main atlas
 */
export const AGENT_DOC_NUMBERS = {
  spark: 'A.6.1.1.1',
  grove: 'A.6.1.1.2',
  keel: 'A.6.1.1.3',
  launchAgent3: 'A.6.1.1.4',
  launchAgent4: 'A.6.1.1.5',
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
  const [atlasData, launch6Data] = await Promise.all([
    loadAtlasData(),
    loadAgentData(DATA_FILES.launchAgent6),
  ]);

  const agents: AgentInfo[] = [];

  // Extract agents from main atlas
  const spark = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.spark);
  const grove = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.grove);
  const keel = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.keel);
  const launch3 = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.launchAgent3);
  const launch4 = findNodeByDocNo(atlasData, AGENT_DOC_NUMBERS.launchAgent4);

  if (spark) agents.push({ name: 'Spark', node: spark });
  if (grove) agents.push({ name: 'Grove', node: grove });
  if (keel) agents.push({ name: 'Keel', node: keel });
  if (launch3) agents.push({ name: 'Launch Agent 3', node: launch3 });
  if (launch4) agents.push({ name: 'Launch Agent 4', node: launch4 });

  // Add external agents
  agents.push({ name: 'Launch Agent 6', node: launch6Data });

  return agents;
};
