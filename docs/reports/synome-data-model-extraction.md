# Synome Data Model Extraction Report

**Generated:** 2026-02-05
**Atlas Version:** 2026-01-28
**Purpose:** Consolidate existing data model extraction work to support the Synome project

---

## Executive Summary

This report consolidates findings from previous analysis work to support the Synome project's data model extraction effort. The Synome is envisioned as a machine-readable graph database containing all operational data extracted from the human-readable Sky Atlas.

**Key Finding:** Significant data model extraction work has already been completed, including:
- Variable pattern analysis across 6 agent artifacts (137 sections, 7 variable types)
- Numeric value hierarchical classification (127 sections across 5 categories)
- Atlas/Synome separation architecture specification
- Atlas scope summaries (A.0-A.6)
- Syno-telonomic paradigm documentation

---

## 1. Prior Work Summary

### 1.1 Variable Analysis (`docs/reports/variable-analysis.md`)

Identified 7 variable types across agent artifacts:

| Variable Type | Occurrences | Description |
|--------------|-------------|-------------|
| NUMERIC_VALUE | 127 | Numbers (amounts, percentages, versions) |
| AGENT_NAME | 100 | Agent names in content |
| UUID_REFERENCE | 26 | Cross-document UUID links |
| DOC_NO_REFERENCE | 25 | Internal doc numbers (A.X.Y.Z) |
| ETH_ADDRESS | 14 | Contract/wallet addresses |
| TOKEN_SYMBOL | 6 | Token tickers (PRM, SPK, GROVE) |
| URL | 1 | Agent-specific URLs |

### 1.2 Numeric Value Hierarchy (`docs/reports/numeric-value-hierarchy.md`)

Classified numeric values into domain categories:

| Category | Sections | Examples |
|----------|----------|----------|
| Token Economics | 10 | Genesis supply, distributions |
| Smart Contracts | 5 | Contract functions |
| Asset Liability Management | 19 | Rate limits, proxies |
| Governance | 14 | Multisig configs, thresholds |
| Operational Parameters | 10 | Debt ceilings, min sizes |
| Other | 69 | Various operational data |

### 1.3 Atlas/Synome Separation (`code-agents/active/governance-operations/atlas-synome-separation.md`)

Defines the architectural split:

**Atlas (Human Layer):**
- Spirit of the Atlas / Universal Alignment (A.0)
- Governance structure and decision processes (A.1)
- Sky Primitive definitions and lifecycle (A.2)
- Risk Capital Framework principles (A.3)
- Token architecture and BEAM pattern (A.4)
- Compliance philosophy (A.5)
- Agent type definitions (A.6 intro)

**Synome (Machine Layer):**
- Agent Artifacts (A.6.1-A.6.5)
- Instance Configuration Documents
- Active Data Documents
- Budget Documents
- BEAM parameter tables
- Penalty schedules and formulas
- Transaction logs and precedents

### 1.4 Atlas Scope Summaries (`code-agents/reference/atlas-summaries/`)

Extracted summaries focusing on Synome-eligible content:
- A0: Philosophy, definitions, actor types
- A1: Decision processes, emergency response, accountability
- A2: Sky Primitives, Monthly Settlement Cycle, Treasury waterfall
- A3: Risk Capital Framework (RRC/TRC/JRC/SRC), Encumbrance
- A4: BEAM pattern, stUSDS, deflationary tokenomics
- A5: Geographic filtering, compliance philosophy
- A6: Prime structure, Spark/SLL, Agent Artifacts

---

## 2. Proposed Synome Data Model

Based on the prior analysis, here is a proposed schema for the Synome:

### 2.1 Core Node Types

```typescript
// Base node interface (mirrors existing AtlasNode)
interface SynomeNode {
  id: string;              // UUID
  type: SynomeNodeType;
  doc_no: string;          // A.X.Y.Z format
  name: string;
  last_modified: string;
  parent_id: string | null;
  metadata: Record<string, unknown>;
}

type SynomeNodeType =
  | 'Atlas'           // Root constitutional document
  | 'Agent'           // Prime/Halo/Executor artifacts
  | 'Instance'        // Deployment configurations
  | 'Config'          // BEAM parameters, rate limits
  | 'Algorithm'       // Formulas, calculations
  | 'State'           // Active data, modifiable state
  | 'Transaction'     // Historical actions, precedents
  | 'Budget'          // Rates, allocations
  | 'Primitive';      // Sky Primitive definitions
```

### 2.2 Agent Node Schema

```typescript
interface AgentNode extends SynomeNode {
  type: 'Agent';
  agent_type: 'Prime' | 'Halo' | 'Executor';

  identity: {
    name: string;                    // "Spark", "Grove", etc.
    doc_prefix: string;              // "A.6.1.1.1", "A.6.1.1.2"
    subproxy_address: EthAddress;
    foundation_name: string;
    dev_company?: string;
  };

  token: {
    name: string;
    symbol: string;                  // "SPK", "GROVE", etc.
    genesis_supply: string;
    emissions_disabled: boolean;
    contract_address?: EthAddress;
  };

  governance: {
    forum_category: string;
    min_proposal_percentage: number; // e.g., 0.01 for 1%
    quorum_percentage: number;       // e.g., 0.10 for 10%
    approval_threshold: number;      // e.g., 0.50 for 50%
    review_period_days: number;
    voting_period_days: number;
  };

  multisigs: MultisigConfig[];
  primitives: PrimitiveInstance[];
  instances: InstanceNode[];
}

interface MultisigConfig {
  name: string;
  role: 'admin' | 'relayer' | 'freezer';
  address: EthAddress;
  signers_required: number;
  signers_total: number;
  network: NetworkId;
}
```

### 2.3 Instance Configuration Document Schema

```typescript
interface InstanceNode extends SynomeNode {
  type: 'Instance';
  status: 'Active' | 'Completed' | 'Inactive' | 'Suspended';
  protocol: string;
  network: NetworkId;

  contracts: {
    controller?: EthAddress;
    proxy?: EthAddress;
    rate_limits?: EthAddress;
    vault?: EthAddress;
    [key: string]: EthAddress | undefined;
  };

  rate_limits: RateLimitConfig[];
  operational_procedures: OperationalProcedure[];
}

interface RateLimitConfig {
  id: string;
  type: 'inflow' | 'outflow' | 'swap' | 'bridge';
  max_amount: bigint;
  slope: bigint;           // per day
  current_value?: bigint;
  unit: 'USDS' | 'USDC' | 'ETH';
}
```

### 2.4 Config Node Schema (BEAM Parameters)

```typescript
interface ConfigNode extends SynomeNode {
  type: 'Config';
  config_type: 'BEAM' | 'RateLimit' | 'Penalty' | 'Settlement';

  // For BEAM configs
  beam?: {
    level: 'pBEAM' | 'cBEAM' | 'aBEAM';
    controlled_parameters: BeamParameter[];
    authorized_operators: EthAddress[];
  };
}

interface BeamParameter {
  name: string;
  current_value: number;
  min: number;
  max: number;
  step: number;
  tau_hours: number;       // Minimum time between changes
  last_updated: string;
}
```

### 2.5 Algorithm Node Schema

```typescript
interface AlgorithmNode extends SynomeNode {
  type: 'Algorithm';
  algorithm_type: 'PenaltySchedule' | 'SettlementFormula' | 'Waterfall' | 'RiskCalculation';

  // Example: Penalty schedule
  penalty_schedule?: {
    severity: 'Low' | 'High';
    tiers: Array<{
      duration_start_min: number;
      duration_end_min: number;
      apy_on_shortfall: number;
    }>;
  };

  // Example: Treasury waterfall
  waterfall_steps?: Array<{
    step: number;
    name: string;
    percentage: number;
    sub_allocations?: Array<{
      name: string;
      max_percentage: number;
    }>;
  }>;
}
```

### 2.6 Transaction/Precedent Schema

```typescript
interface TransactionNode extends SynomeNode {
  type: 'Transaction';
  timestamp: string;
  sentinel: string;
  action_type: string;
  target_node_id: string;
  parameters: Record<string, unknown>;
  result: 'success' | 'failure' | 'pending';
  verification_hash: string;
}
```

---

## 3. Data Extraction Mapping

### 3.1 From Atlas to Synome

| Current Atlas Location | Synome Node Type | Notes |
|------------------------|------------------|-------|
| A.6.1.1.X (Agent Artifacts) | `AgentNode` | One per Prime/Halo |
| Instance Configuration Docs | `InstanceNode` | Per-deployment configs |
| Active Data Documents (A.1) | `StateNode` | Modifiable outside governance |
| Budget Documents | `BudgetNode` | Rates, allocations |
| BEAM Parameters (A.4) | `ConfigNode` | min/max/step/tau |
| Penalty Schedules (A.3) | `AlgorithmNode` | Encumbrance penalties |
| Settlement Calculations | `AlgorithmNode` | P&L, waterfall logic |
| Precedents & Tenets | `TransactionNode` | Historical decisions |

### 3.2 Variable to Schema Field Mapping

| Variable Type | Schema Location |
|---------------|-----------------|
| AGENT_NAME | `AgentNode.identity.name` |
| TOKEN_SYMBOL | `AgentNode.token.symbol` |
| ETH_ADDRESS | Various `.contracts`, `.address` fields |
| NUMERIC_VALUE | Context-dependent (see 3.3) |
| DOC_NO_REFERENCE | `SynomeNode.doc_no`, relationships |
| UUID_REFERENCE | `SynomeNode.id`, foreign keys |

### 3.3 Numeric Value Type Mapping

| Numeric Subtype | Schema Field |
|-----------------|--------------|
| TOKEN_AMOUNT | `AgentNode.token.genesis_supply` |
| CURRENCY_AMOUNT | `RateLimitConfig.max_amount` |
| PERCENTAGE | `AgentNode.governance.*_percentage` |
| RATE_VALUE | `RateLimitConfig.slope` |
| MAX_AMOUNT | `RateLimitConfig.max_amount` |
| SLOPE | `RateLimitConfig.slope` |
| MULTISIG_SIGNING_REQUIREMENT | `MultisigConfig.signers_*` |
| CONTRACT_VERSION | `InstanceNode.metadata.version` |

---

## 4. Current Atlas Data Structure

The existing Atlas JSON follows this implicit schema (from `treeUtils.ts`):

```typescript
interface AtlasNode {
  type: string;           // "Scope", "Article", "Section", "Core", etc.
  doc_no: string;         // e.g., "A.6.1.1.3"
  name: string;
  uuid: string;
  last_modified: string;
  content: string;        // Markdown with embedded data
  [key: string]: unknown; // Child arrays detected dynamically
}
```

**Key Observation:** Children are stored in dynamically-named array fields (e.g., `Articles`, `Sections`, `Primitives`). The `getChildren()` function detects these by checking for arrays containing objects with `{type, doc_no, uuid}`.

---

## 5. Extraction Phases

### Phase 1: Structural Extraction
Extract the tree structure and node metadata:
- Parse hierarchical relationships
- Normalize node types
- Generate stable IDs

### Phase 2: Content Parsing
Extract machine data from Markdown content:
- Ethereum addresses (regex: `0x[a-fA-F0-9]{40}`)
- Rate limits (pattern: `maxAmount: X`, `slope: Y per day`)
- Percentages (pattern: `X%`)
- Doc references (pattern: `A.X.Y.Z`)

### Phase 3: Schema Validation
Validate extracted data against Synome schema:
- Type checking
- Relationship integrity
- Required field presence

### Phase 4: Graph Construction
Build the Synome graph:
- Create nodes with proper types
- Establish parent-child relationships
- Create cross-references

---

## 6. Recommended Next Steps

1. **Define Synome Graph Database Technology**
   - Options: Neo4j, ArangoDB, custom on-chain, hybrid

2. **Implement Content Parser**
   - Extract structured data from Markdown `content` fields
   - Handle tables, code blocks, inline values

3. **Build Extraction Pipeline**
   - Read from Atlas JSON
   - Transform to Synome schema
   - Validate and load

4. **Create Verification Layer**
   - Atlas assertions → Synome constraints
   - Automated checking by Sentinels

5. **Design Migration Path**
   - Parallel operation period
   - Gradual cutover
   - Rollback capability

---

## 7. Related Documents

### In This Repository

| Document | Path | Relevance |
|----------|------|-----------|
| Variable Analysis | `docs/reports/variable-analysis.md` | Variable types, patterns |
| Numeric Value Hierarchy | `docs/reports/numeric-value-hierarchy.md` | Numeric classification |
| CLAUDE.md | `/CLAUDE.md` | Atlas structure, primitive docs |

### In code-agents Repository

| Document | Path | Relevance |
|----------|------|-----------|
| Atlas/Synome Separation | `active/governance-operations/atlas-synome-separation.md` | Core architecture |
| Syno-Telonomic Paradigm | `reference/syno-teleonomic-paradigm.md` | Five-layer framework |
| Agent Master | `agent-master.md` | Laniakea system overview |
| Atlas Summaries | `reference/atlas-summaries/*.md` | Per-scope extraction |
| A6 Agent Summary | `reference/atlas-summaries/A6-agent-summary.md` | Agent structure details |

### Source Atlas Documents

| Scope | Lines | Key Content for Synome |
|-------|-------|------------------------|
| A.0 Preamble | 329 | Philosophy (stays in Atlas) |
| A.1 Governance | 5,945 | Active Data, decision processes |
| A.2 Support | 6,087 | Primitives, Settlement Cycle |
| A.3 Stability | 3,769 | Risk Capital, penalties |
| A.4 Protocol | 908 | BEAM parameters, tokens |
| A.5 Accessibility | 143 | Compliance (stays in Atlas) |
| A.6 Agent | 26,838 | **Primary extraction target** |

---

## 8. Appendix: Sample Extractions

### A. Agent Identity Extraction (from A.6)

```json
{
  "agents": [
    {
      "name": "Spark",
      "doc_prefix": "A.6.1.1.1",
      "subproxy_address": "0x3300f198988e4C9C63F75dF86De36421f06af8c4",
      "token_symbol": "SPK",
      "foundation": "Spark Assets Foundation"
    },
    {
      "name": "Grove",
      "doc_prefix": "A.6.1.1.2",
      "subproxy_address": "0x1369f7b2b38c76B6478c0f0E66D94923421891Ba",
      "token_symbol": "GROVE",
      "foundation": "Grove Foundation"
    },
    {
      "name": "Keel",
      "doc_prefix": "A.6.1.1.3",
      "subproxy_address": "0x355CD90Ecb1b409Fdf8b64c4473C3B858dA2c310",
      "token_symbol": "KEEL",
      "foundation": "Keel Foundation"
    },
    {
      "name": "Obex",
      "doc_prefix": "A.6.1.1.5",
      "subproxy_address": "0x8be042581f581E3620e29F213EA8b94afA1C8071",
      "token_symbol": "OBEX",
      "foundation": "Obex Foundation"
    }
  ]
}
```

### B. Rate Limit Extraction (from SLL Instance)

```json
{
  "rate_limits": [
    {
      "id": "LIMIT_USDS_MINT",
      "type": "outflow",
      "max_amount": "200000000",
      "slope": "400000000",
      "slope_unit": "per_day",
      "currency": "USDS"
    },
    {
      "id": "LIMIT_USDS_BURN",
      "type": "inflow",
      "max_amount": "unlimited",
      "slope": "unlimited",
      "currency": "USDS"
    }
  ]
}
```

### C. BEAM Parameter Extraction (from A.4)

```json
{
  "beam_config": {
    "stUSDS_rate": {
      "min_bp": 200,
      "max_bp": 5000,
      "step_bp": 500,
      "tau_hours": 16
    },
    "SKY_borrow_rate": {
      "min_bp": 210,
      "max_bp": 5000,
      "step_bp": 500,
      "tau_hours": 16
    }
  }
}
```

### D. Penalty Schedule Extraction (from A.3)

```json
{
  "penalty_schedules": {
    "low_severity": {
      "threshold": "100% <= ER < 103%",
      "tiers": [
        {"start_min": 0, "end_min": 30, "apy": 500},
        {"start_min": 30, "end_min": 60, "apy": 1000},
        {"start_min": 60, "end_min": null, "apy": 1500}
      ]
    },
    "high_severity": {
      "threshold": "ER >= 103%",
      "tiers": [
        {"start_min": 0, "end_min": 15, "apy": 1500},
        {"start_min": 15, "end_min": 30, "apy": 2000},
        {"start_min": 30, "end_min": 60, "apy": 2500},
        {"start_min": 60, "end_min": null, "apy": 3000}
      ]
    }
  }
}
```

---

*Report generated from atlas-viewer analysis tools and code-agents documentation.*
