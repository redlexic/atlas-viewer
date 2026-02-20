# Synome Data Model Reference

Complete TypeScript schema definitions for the Synome data model.

## Core Node Interface

```typescript
interface SynomeNode {
  id: string;              // UUID from Atlas
  type: SynomeNodeType;
  doc_no: string;          // A.X.Y.Z format
  name: string;
  last_modified: string;
  parent_id: string | null;
  metadata: Record<string, unknown>;
}

type SynomeNodeType =
  | 'Agent'           // Prime/Halo/Executor artifacts
  | 'Primitive'       // Sky Primitive definitions
  | 'Instance'        // Deployment configurations
  | 'Config'          // BEAM parameters, rate limits
  | 'Algorithm'       // Formulas, calculations
  | 'State'           // Active data, modifiable state
  | 'Transaction'     // Historical actions, precedents
  | 'Budget';         // Rates, allocations
```

## Agent Node

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
    min_proposal_percentage: number;
    quorum_percentage: number;
    approval_threshold: number;
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

## Instance Node

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
  max_amount: string;       // bigint as string
  slope: string;            // per day, bigint as string
  current_value?: string;
  unit: 'USDS' | 'USDC' | 'ETH';
}
```

## Config Node (BEAM Parameters)

```typescript
interface ConfigNode extends SynomeNode {
  type: 'Config';
  config_type: 'BEAM' | 'RateLimit' | 'Penalty' | 'Settlement';

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
  tau_hours: number;
  last_updated: string;
}
```

## Algorithm Node

```typescript
interface AlgorithmNode extends SynomeNode {
  type: 'Algorithm';
  algorithm_type: 'PenaltySchedule' | 'SettlementFormula' | 'Waterfall' | 'RiskCalculation';

  penalty_schedule?: {
    severity: 'Low' | 'High';
    tiers: Array<{
      duration_start_min: number;
      duration_end_min: number;
      apy_on_shortfall: number;
    }>;
  };

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

## Transaction/Precedent Node

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

## Edge Types

```typescript
type SynomeEdgeType =
  | 'CHILD_OF'        // Parent-child hierarchy
  | 'REFERENCES'      // Cross-reference via UUID or doc_no
  | 'IMPLEMENTS'      // Primitive implementation reference
  | 'INSTANCE_OF'     // Instance to primitive relationship
  | 'HAS_STATUS'      // Node to status relationship
  | 'CONTROLLED_BY'   // Address control relationship
  | 'LOCATED_AT';     // ICD location reference
```

## Field Mapping: Atlas Content → Synome Schema

| Variable Type | Atlas Source | Synome Field |
|---------------|-------------|--------------|
| AGENT_NAME | `content` text | `AgentNode.identity.name` |
| TOKEN_SYMBOL | `content` text | `AgentNode.token.symbol` |
| ETH_ADDRESS | `content` regex | Various `.contracts`, `.address` fields |
| NUMERIC_VALUE | `content` context | Context-dependent (see below) |
| DOC_NO_REFERENCE | `content` regex | `SynomeNode.doc_no`, relationships |
| UUID_REFERENCE | `content` markdown links | `SynomeNode.id`, foreign keys |

### Numeric Value Subtype Mapping

| Subtype | Schema Field |
|---------|--------------|
| TOKEN_AMOUNT | `AgentNode.token.genesis_supply` |
| CURRENCY_AMOUNT | `RateLimitConfig.max_amount` |
| PERCENTAGE | `AgentNode.governance.*_percentage` |
| RATE_VALUE | `RateLimitConfig.slope` |
| MULTISIG_SIGNING_REQ | `MultisigConfig.signers_*` |
| CONTRACT_VERSION | `InstanceNode.metadata.version` |

## Node Classification Rules

From `src/synome/graphLoader.ts`:

| Condition | Classified As |
|-----------|---------------|
| `doc_no` matches `A.6.1.1.\d+` | `Agent` |
| Name contains "primitive hub document" | `PrimitiveHub` |
| Name contains "primitive" (not "hub") | `Primitive` |
| Name contains "instance configuration" | `Instance` |
| Name contains "directory" or "active instances" | `Directory` |
| Name contains "global activation status" | `Status` |
| Name contains "address" or "subproxy" or "multisig" | `Address` |
| Name contains "rate limit" or "parameter" or "config" | `Config` |
| Default | `Document` |

## Primitive Categories

```
genesis:     Agent Creation, Prime Transformation, Executor Transformation, Agent Token
operational: Executor Accord, Root Edit, Light Agent
economic:    Distribution Requirement, Market Cap Fee, Upkeep Rebate
skylink:     Token SkyLink
reward:      Distribution Reward, Integration Boost, Pioneer Chain
capital:     Allocation System, Junior Risk Capital Rental, Asset Liability Management Rental
governance:  Core Governance Reward
```

## Primitive Instance Structure

```
Primitive Root
├── Primitive Hub Document
│   ├── Global Activation Status (.2.X.1.1)
│   ├── Active Instances Directory (links)
│   ├── Completed Instances Directory
│   ├── In Progress Invocations Directory
│   └── Hub Data Repository
├── Active Instances (.2.X.2)
│   └── [Instance Name] Configuration Document
│       ├── Parameters (key-value configs)
│       ├── Operational Process Definition
│       └── Data Repository
├── Completed Instances
└── In Progress Invocations
```
