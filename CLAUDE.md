# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atlas Viewer is an interactive web application for browsing, comparing, and manipulating hierarchical Sky Atlas documentation structures. It provides multiple views: tree browser with cherry-picking, side-by-side agent comparison with custom agent builder, 3D visualization, and changeset diff viewer.

## Tech Stack

- React 19, TypeScript 5.9 (strict mode), Vite 7
- Mantine UI 8 (dark theme), Tabler Icons
- React Three Fiber + Three.js (3D visualization in omnipanel/)
- React Router DOM 7

## Commands

```bash
npm run dev          # Start dev server
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint
npm run preview      # Preview production build
npm run update-atlas # Download latest atlas from sky-atlas.io if changed
```

## Architecture

### Directory Structure

- `src/pages/` - Four main views: AtlasViewerPage (tree browser), ComparisonPage (agent comparison), HierarchicalViewPage (3D), DiffPage (changeset diffs)
- `src/utils/` - Shared utilities: treeUtils (traversal), dataLoader (fetching), colorUtils, substitutionUtils (templating), exportUtils, diffUtils
- `src/config/dataPaths.ts` - Centralized data file path configuration
- `omnipanel/` - Separate sub-app for 3D visualization with own package.json and Vite config
  - `omnipanel/src/config/dataPaths.js` - Parallel config for omnipanel (keep in sync with main)
- `public/data/` - Static JSON data files organized by type
- `docs/` - Documentation organized by category:
  - `reports/` - Analysis reports (psm-whitelisting, variable-analysis, etc.)
  - `guides/` - How-to guides (variable-parameterization, tree-visualization-plan)
  - `agents/` - Agent documentation (launch-agent-6, obex-artifact, agent-template)
  - `reference/` - Reference docs (ethereum-addresses, robots)
  - `proposals/` - Atlas proposals
  - `exports/` - Generated markdown exports (skybase toggles, notion exports)
  - `assets/` - PDFs and other non-markdown assets
- `scripts/` - Utility scripts organized by purpose:
  - `analysis/` - Data analysis scripts
  - `export/` - Export generation scripts
  - `data/` - Data manipulation utilities

### Routes

```
/              → AtlasViewerPage (main tree browser + cherry picker)
/comparison    → ComparisonPage (side-by-side agent comparison + builder)
/hierarchical  → HierarchicalViewPage (3D visualization)
/diff          → DiffPage (changeset diff viewer)
```

### Core Data Structure (AtlasNode)

```typescript
{
  type: string;           // "Scope", "Article", "Section", "Core", etc.
  doc_no: string;         // e.g., "A.6.1.1.3"
  name: string;
  uuid: string;
  content: string;        // Markdown
  [key: string]: unknown; // Child arrays detected dynamically
}
```

### Key Patterns

**Dynamic child detection:** `getChildren()` in treeUtils finds children from any array field containing objects with `{type, doc_no, name, uuid}`. This enables schema flexibility.

**Preprocessing:** `preprocessData()` adds `childCount` to each node at load time for efficient rendering.

**Variable substitution:** `substituteVariablesWithHighlight()` returns HTML with green highlights; `substituteVariablesPlain()` returns plain text for export. Variables include agent names, token symbols, SubProxy accounts.

**State persistence:** Cherry picker selections, saved sets, and builder state persist to localStorage.

### Agent Doc Numbers

```
A.6.1.1.1 → Spark      (Lending/DeFi infrastructure)
A.6.1.1.2 → Grove      (RWA/Real World Assets)
A.6.1.1.3 → Keel       (Risk management)
A.6.1.1.4 → Skybase    (Sky.money frontend, voting portal)
A.6.1.1.5 → Obex       (Institutional services)
A.6.1.1.6 → Prysm      (TBD)
```

### Atlas Scope Structure (A.0 - A.6)

```
A.0 → Preamble
A.1 → Governance
A.2 → Support (includes Sky Primitives at A.2.2)
A.3 → Stability (Risk Capital at A.3.2)
A.4 → Protocol
A.5 → Accessibility
A.6 → Agent (all Stars/Agents live here)
```

### Sky Primitives Structure

Each agent implements primitives from A.2.2. The primitive hierarchy in an agent artifact:

```
A.6.1.1.X (Agent Root)
└── A.6.1.1.X.2 (Sky Primitives)
    ├── A.6.1.1.X.2.1 (Genesis Primitives)
    │   ├── Agent Creation Primitive
    │   ├── Prime Transformation Primitive
    │   ├── Executor Transformation Primitive
    │   └── Agent Token Primitive
    ├── A.6.1.1.X.2.2 (Operational Primitives)
    │   ├── Executor Accord Primitive
    │   ├── Root Edit Primitive
    │   └── Light Agent Primitive
    ├── A.6.1.1.X.2.3 (Economic Primitives)
    │   ├── Distribution Requirement Primitive
    │   ├── Market Cap Fee Primitive
    │   └── Upkeep Rebate Primitive
    ├── A.6.1.1.X.2.4 (SkyLink Primitives)
    │   └── Token SkyLink Primitive
    ├── A.6.1.1.X.2.5 (Reward Primitives)
    │   ├── Distribution Reward Primitive
    │   ├── Integration Boost Primitive
    │   └── Pioneer Chain Primitive
    ├── A.6.1.1.X.2.6 (Capital Primitives)
    │   ├── Allocation System Primitive
    │   ├── Junior Risk Capital Rental Primitive
    │   └── Asset Liability Management Rental Primitive
    └── A.6.1.1.X.2.7 (Governance Primitives)
        └── Core Governance Reward Primitive
```

### Primitive Status Values

Each primitive has a "Global Activation Status" at `.2.X.1.1`:
- `Active` - Currently in use, may have instances defined
- `Completed` - One-time primitive that has finished (e.g., Agent Creation)
- `Inactive` - Not currently used by this agent

### Primitive Instance Structure

Active primitives contain instances at `.2.X.2` (Active Instances):
```
Primitive Root
├── Primitive Hub Document
│   ├── Global Activation Status
│   ├── Active Instances Directory (links)
│   ├── Completed Instances Directory
│   ├── In Progress Invocations Directory
│   └── Hub Data Repository
├── Active Instances
│   └── [Instance Name] Configuration Document
│       ├── Parameters (key-value configs)
│       ├── Operational Process Definition
│       └── Data Repository
├── Completed Instances
└── In Progress Invocations
```

## Path Alias

`@omnipanel/*` resolves to `omnipanel/src/*`

## Data Files

All data paths are configured in `src/config/dataPaths.ts` (and mirrored in `omnipanel/src/config/dataPaths.js`).

```
public/data/
├── atlas/           # Atlas documentation JSON (versioned by date)
│   └── atlas-YYYY-MM-DD.json  # Run `npm run update-atlas` to fetch latest
├── agents/          # Agent-specific JSON files
├── skybase/         # Skybase changesets and drafts
└── tagging-model.json
```

When adding or moving data files, update both config files to keep paths centralized.

## Common Analysis Tasks

### IMPORTANT: Always Use Fresh Atlas Data

Before generating any report or analysis from Atlas data:
1. Run `npm run update-atlas` to check for updates
2. Extract fresh data from `public/data/atlas/atlas-YYYY-MM-DD.json` (check `dataPaths.ts` for current version)
3. Include the Atlas version date in any generated reports
4. Never rely on cached `/tmp/` extractions from previous sessions - always re-extract

### Extract Agent Data from Atlas

```bash
# First, ensure you have the latest atlas
npm run update-atlas

# Then extract specific agent (e.g., Skybase at A.6.1.1.4)
# Use the actual current filename from dataPaths.ts
cat public/data/atlas/atlas-2026-01-28.json | jq '.. | objects | select(.doc_no == "A.6.1.1.4")' > /tmp/agent.json
```

### Find All Primitive Statuses

Look for "Global Activation Status" nodes - their `content` field contains backtick-wrapped status (`Active`, `Inactive`, `Completed`).

### Generate Primitive Reports

Reports go in `docs/drafts/` or `docs/reports/`. Include:
- Primitive name, doc_no, and reference to A.2.2 spec
- Global Activation Status
- Active instances with their parameters
- Strategic analysis of why primitives are/aren't active

## External Resources

- **Sky Atlas:** https://sky-atlas.io/
- **Atlas API:** https://sky-atlas.io/api/atlas.json
- **Spark Address Registry:** github.com/sparkdotfi/spark-address-registry
- **Spark ALM Controller:** github.com/sparkdotfi/spark-alm-controller
- **Spark PSM:** github.com/sparkdotfi/spark-psm

## Key Contract References

### PSM Contracts
- **Mainnet LitePSM (MCD_LITE_PSM_USDC_A):** `0xf6e72Db5454dd049d0788e411b06CfAF16853042`
- **Base PSM3:** `0x1601843c5E9bC251A3272907010AFa41Fa18347E`
- **Arbitrum PSM3:** `0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266`

### Chainlog
- **Ethereum Mainnet:** `0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F`
