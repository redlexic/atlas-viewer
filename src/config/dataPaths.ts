/**
 * Centralized configuration for all data file paths
 *
 * All paths are relative to the public/ directory root.
 * Update these paths when data files are moved or renamed.
 */

/**
 * Atlas data files - main documentation tree
 */
export const ATLAS_FILES = {
  /** Current/latest atlas data */
  current: '/data/atlas/atlas-2026-02-10.json',
  /** Historical atlas versions */
  history: {
    '2026-02-10': '/data/atlas/atlas-2026-02-10.json',
    '2026-02-04': '/data/atlas/atlas-2026-02-04.json',
    '2026-01-28': '/data/atlas/atlas-2026-01-28.json',
    '2026-01-26': '/data/atlas/atlas-2026-01-26.json',
    '2026-01-23': '/data/atlas/atlas-2026-01-23.json',
    '2026-01-22': '/data/atlas/atlas-2026-01-22.json',
    '2026-01-14': '/data/atlas/atlas-2026-01-14.json',
    '2025-12-11': '/data/atlas/atlas-2025-12-11.json',
    '2025-11-20': '/data/atlas/atlas-2025-11-20.json',
  },
} as const;

/**
 * Agent-specific data files
 */
export const AGENT_FILES = {
  template: '/data/agents/agent-template.json',
  launchAgent6: '/data/agents/launch-agent-6.json',
} as const;

/**
 * Skybase changeset files
 */
export const SKYBASE_FILES = {
  changeset: '/data/skybase/skybase-changeset.json',
  changesetComplete: '/data/skybase/skybase-changeset-complete.json',
  draftV3: '/data/skybase/skybase-draft-v3.json',
  draft: '/data/skybase/skybase-draft.json',
  draftV2: '/data/skybase/skybase-draft-v2.json',
} as const;

/**
 * Other data files
 */
export const DATA_FILES = {
  taggingModel: '/data/tagging-model.json',
} as const;

/**
 * Combined paths for convenience
 * Maintains backwards compatibility with existing DATA_FILES usage
 */
export const ALL_DATA_PATHS = {
  atlas: ATLAS_FILES.current,
  atlasLatest: ATLAS_FILES.current,
  skybaseChangeset: SKYBASE_FILES.changesetComplete,
  taggingModel: DATA_FILES.taggingModel,
  agentTemplate: AGENT_FILES.template,
} as const;
