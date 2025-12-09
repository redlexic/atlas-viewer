// Tree utilities
export {
  getChildren,
  preprocessNode,
  preprocessData,
  getAllDescendantUUIDs,
  findNodeByUUID,
  findNodeByDocNo,
  flattenTree,
  findNextSibling,
  countAllChildren,
} from './treeUtils';

// Color utilities
export {
  rainbowColors,
  getSegmentColor,
  getNodeColor,
  ColoredDocNo,
} from './colorUtils';

// Substitution utilities
export {
  KNOWN_AGENT_NAMES,
  KNOWN_TOKEN_SYMBOLS,
  substituteVariablesWithHighlight,
  substituteVariablesPlain,
  stripHtml,
} from './substitutionUtils';

// Data loading utilities
export {
  DATA_FILES,
  AGENT_DOC_NUMBERS,
  loadAtlasData,
  loadAgentData,
  loadComparisonAgents,
} from './dataLoader';

export type { AgentInfo } from './dataLoader';
