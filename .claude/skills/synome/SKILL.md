---
name: synome
description: Extract structured machine-readable data from Sky Atlas agent artifacts. Use for extracting agent identities, primitive statuses, instance configurations, rate limits, addresses, BEAM parameters, and governance data from the Atlas JSON.
disable-model-invocation: true
argument-hint: [command] [agent-name]
allowed-tools: Bash(jq *), Bash(npm run update-atlas*), Bash(cat *), Bash(ls *), Read, Grep, Glob, Write, Edit
---

# Synome Data Extraction Skill

Extract structured, machine-readable data from the Sky Atlas into Synome-format JSON.

## Commands

Usage: `/synome <command> [agent-name]`

| Command | Description | Example |
|---------|-------------|---------|
| `extract <agent>` | Full extraction for one agent | `/synome extract spark` |
| `extract all` | Full extraction for all agents | `/synome extract all` |
| `primitives <agent>` | Primitive status report | `/synome primitives skybase` |
| `instances <agent>` | Instance inventory | `/synome instances spark` |
| `addresses <agent>` | Address registry | `/synome addresses keel` |
| `report <agent>` | Human-readable analysis report | `/synome report obex` |
| `diff <agent>` | Compare latest vs previous atlas version | `/synome diff spark` |

Agent names: `spark`, `grove`, `keel`, `skybase`, `obex`, `prysm` (case-insensitive).

## Pre-Extraction Steps (MANDATORY)

Before any extraction:

1. **Check for atlas updates:**
   ```bash
   npm run update-atlas
   ```

2. **Get current atlas version from `src/config/dataPaths.ts`:**
   - Read the file and find `ATLAS_FILES.current` to get the filename
   - Use that filename for all extraction (NOT a hardcoded path)

3. **Verify the atlas file exists:**
   ```bash
   ls public/data/atlas/atlas-*.json
   ```

4. **Include the atlas version date in all output files and reports.**

## Agent Doc Number Mapping

```
spark    → A.6.1.1.1
grove    → A.6.1.1.2
keel     → A.6.1.1.3
skybase  → A.6.1.1.4
obex     → A.6.1.1.5
prysm    → A.6.1.1.6
```

## Extraction Workflow

### Phase 1: Structural Extraction

Extract the agent subtree from the atlas:

```bash
cat public/data/atlas/<atlas-file>.json | jq '.. | objects | select(.doc_no == "<DOC_NO>")' > /tmp/synome-<agent>.json
```

### Phase 2: Content Parsing

Parse the extracted JSON to pull structured data. Use these regex patterns on `content` fields:

| Data Type | Pattern | Target Schema Field |
|-----------|---------|---------------------|
| Ethereum address | `0x[a-fA-F0-9]{40}` | `addresses[]` |
| Doc reference | `A\.\d+(\.\d+)+` | `references[]` |
| UUID reference | `[0-9a-f]{8}-...-[0-9a-f]{12}` | `uuidReferences[]` |
| Status | `` `Active` `` / `` `Completed` `` / `` `Inactive` `` | `status` |
| Percentage | `\d+(\.\d+)?%` | context-dependent |
| Rate limit | `maxAmount.*?(\d[\d,]*)` / `slope.*?(\d[\d,]*)` | `rateLimits[]` |

For full pattern details, see [extraction-patterns.md](extraction-patterns.md).

### Phase 3: Schema Mapping

Map extracted data to the Synome schema. For the full type definitions, see [data-model.md](data-model.md).

Core node types: `Agent`, `Primitive`, `Instance`, `Config`, `Algorithm`, `State`, `Transaction`, `Budget`.

### Phase 4: Output

For `extract` commands, write structured JSON to:
```
/tmp/synome-<agent>-<atlas-version>.json
```

For `report` commands, write markdown to:
```
docs/reports/synome-<agent>-report.md
```

## Output Format (extract command)

```json
{
  "metadata": {
    "extractedAt": "<ISO timestamp>",
    "atlasVersion": "<date from filename>",
    "agent": "<agent-name>",
    "docPrefix": "<A.6.1.1.X>"
  },
  "identity": {
    "name": "",
    "doc_prefix": "",
    "agent_type": "Prime|Halo|Executor",
    "subproxy_address": "",
    "foundation_name": "",
    "token": { "symbol": "", "genesis_supply": "" }
  },
  "primitives": [
    {
      "name": "",
      "doc_no": "",
      "category": "",
      "status": "Active|Completed|Inactive",
      "activeInstances": [],
      "completedInstances": []
    }
  ],
  "instances": [
    {
      "name": "",
      "doc_no": "",
      "status": "",
      "addresses": [],
      "parameters": {},
      "rateLimits": []
    }
  ],
  "addresses": [
    { "address": "", "context": "", "doc_no": "" }
  ],
  "governance": {
    "forum_category": "",
    "multisigs": []
  },
  "stats": {
    "totalNodes": 0,
    "primitiveCount": 0,
    "activePrimitives": 0,
    "instanceCount": 0,
    "addressCount": 0
  }
}
```

For sample extractions showing expected output, see [examples.md](examples.md).

## Report Format (report command)

When generating a report, include:

1. **Header:** Agent name, doc_no, atlas version date
2. **Identity Summary:** Name, type, foundation, token, SubProxy address
3. **Primitive Status Matrix:** Table of all primitives with status, instance counts
4. **Active Instances Detail:** For each active primitive instance: name, doc_no, addresses, parameters
5. **Address Registry:** All extracted Ethereum addresses with context
6. **Governance Config:** Multisig configurations, voting parameters
7. **Statistics:** Node counts, depth, coverage metrics

## Existing Codebase References

The `src/synome/` module already implements much of this extraction logic in TypeScript:
- `src/synome/types.ts` — Synome node/edge type definitions, primitive categories
- `src/synome/graphLoader.ts` — Graph construction, content extraction patterns, node classification
- `src/synome/SynomeViewer.tsx` — React dashboard with primitive/instance extraction functions

Use these as reference for extraction logic and classification rules.

## Related Reports

- `docs/reports/synome-data-model-extraction.md` — Full data model specification
- `docs/reports/variable-analysis.md` — Variable type analysis across agents
- `docs/reports/numeric-value-hierarchy.md` — Numeric value classification
