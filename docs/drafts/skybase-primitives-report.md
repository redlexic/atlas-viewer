# Skybase Primitive Usage Report

**Agent:** [Skybase (A.6.1.1.4)](https://sky-atlas.io/#A.6.1.1.4)
**Atlas Version:** 2026-01-28
**Generated:** 2026-01-29

---

## Overview

Per the [Skybase Introduction (A.6.1.1.4.1)](https://sky-atlas.io/#A.6.1.1.4.1), Skybase is an Agent specializing in creating accessible DeFi interfaces. It operates:
- **[Sky.money](https://sky.money)** - A non-custodial web application gateway to the Sky Protocol
- **[Sky Governance Voting Portal](https://vote.sky.money)** - Governance voting interface

Through its AI-powered interface, Sky.money makes digital asset interactions intuitive and accessible for users of all experience levels while ensuring users maintain complete control of their assets.

---

## Strategic Analysis

### Current Primitive Priorities

Skybase's 8 active primitives serve different strategic roles. The SKYBASE token does not yet exist on-chain, so token-dependent primitives are pre-configured but not yet operational.

- **Currently operational (3)** - driving growth today:
  - [Distribution Reward Primitive](#6-distribution-reward-primitive) - 9 active partner integrations earning rewards
  - [Integration Boost Primitive](#7-integration-boost-primitive) - Euler integration on Base receiving weekly payments
  - [Executor Accord Primitive](#2-executor-accord-primitive) - Ozone is actively serving as Operational Executor

- **Enabled but no instances yet (1):**
  - [Core Governance Reward Primitive](#8-core-governance-reward-primitive) - Per [A.2.2.10.1](https://sky-atlas.io/#A.2.2.10.1), rewards Sky pays to Prime Agents for providing SKY holders secure access to core governance features (e.g., vote.sky.money). Active but 0 instances defined. See [GAR Overview](https://www.notion.so/GAR-Overview-2f6d79b5de38801ebc6ac4697743faaf) for implementation details.

- **Token-dependent (4)** - pre-configured, pending TGE:
  - [Agent Token Primitive](#1-agent-token-primitive) - Token name (Skybase) and symbol (SKYBASE) defined; Genesis Supply, Token Address, and Token Admin are "TBD" per [A.6.1.1.4.2.1.4.2.1.1.3-5](https://sky-atlas.io/#A.6.1.1.4.2.1.4.2.1.1.3)
  - [Root Edit Primitive](#3-root-edit-primitive) - Defines 1% token threshold for proposals; governance process awaits token launch
  - [Distribution Requirement Primitive](#4-distribution-requirement-primitive) - Commits to 0.25%/year buyback; process "TBD" per [A.6.1.1.4.2.3.1.2.1.2.1.1](https://sky-atlas.io/#A.6.1.1.4.2.3.1.2.1.2.1.1)
  - [Upkeep Rebate Primitive](#5-upkeep-rebate-primitive) - Entitlement exists but cannot be exercised without tokens


### Primary Focus: User Acquisition Through Integrations

Skybase's primitive usage reveals a clear strategy focused on **ecosystem growth through partnerships**:

1. **[Distribution Reward Primitive](https://sky-atlas.io/#A.6.1.1.4.2.5.1) (9 active + 4 planning)** - The most heavily utilized primitive, with 13 total integration partnerships
2. **[Integration Boost Primitive](https://sky-atlas.io/#A.6.1.1.4.2.5.2) (1 active + 1 planning)** - Additional incentives for strategic partners (Euler on Base, Compound planned)

### Reward Code Structure

| Code Range | Usage |
|-------|----------------|
| `0-1` | Sky.money properties (App, Open Source Widgets) |
| `1001-1016` | Third-party partner integrations |
| `1050` | Gnosis Protocol |

### Notable Gaps

- **No Capital Primitives active** - All three (Allocation, Junior Risk, ALM) remain inactive, consistent with Skybase's focus as a frontend/interface agent rather than financial infrastructure
- **No cross-chain infrastructure** - Token SkyLink and Pioneer Chain primitives inactive; L2 engagement occurs through partnerships (Euler on Base) rather than direct token bridging

---

## Primitive Index

### Active (8)

| Primitive | Skybase Implementation | Spec Reference | Instances |
|-----------|------------------------|----------------|-----------|
| [Agent Token Primitive](#1-agent-token-primitive) | [A.6.1.1.4.2.1.4](https://sky-atlas.io/#A.6.1.1.4.2.1.4) | [A.2.2.4.4](https://sky-atlas.io/#A.2.2.4.4) | 1 active |
| [Executor Accord Primitive](#2-executor-accord-primitive) | [A.6.1.1.4.2.2.1](https://sky-atlas.io/#A.6.1.1.4.2.2.1) | [A.2.2.5.1](https://sky-atlas.io/#A.2.2.5.1) | 1 active |
| [Root Edit Primitive](#3-root-edit-primitive) | [A.6.1.1.4.2.2.2](https://sky-atlas.io/#A.6.1.1.4.2.2.2) | [A.2.2.5.2](https://sky-atlas.io/#A.2.2.5.2) | 1 active |
| [Distribution Requirement Primitive](#4-distribution-requirement-primitive) | [A.6.1.1.4.2.3.1](https://sky-atlas.io/#A.6.1.1.4.2.3.1) | [A.2.2.6.1](https://sky-atlas.io/#A.2.2.6.1) | 1 active |
| [Upkeep Rebate Primitive](#5-upkeep-rebate-primitive) | [A.6.1.1.4.2.3.3](https://sky-atlas.io/#A.6.1.1.4.2.3.3) | [A.2.2.6.3](https://sky-atlas.io/#A.2.2.6.3) | 1 active |
| [Distribution Reward Primitive](#6-distribution-reward-primitive) | [A.6.1.1.4.2.5.1](https://sky-atlas.io/#A.6.1.1.4.2.5.1) | [A.2.2.8.1](https://sky-atlas.io/#A.2.2.8.1) | 9 active, 4 planning |
| [Integration Boost Primitive](#7-integration-boost-primitive) | [A.6.1.1.4.2.5.2](https://sky-atlas.io/#A.6.1.1.4.2.5.2) | [A.2.2.8.2](https://sky-atlas.io/#A.2.2.8.2) | 1 active, 1 planning |
| [Core Governance Reward Primitive](#8-core-governance-reward-primitive) | [A.6.1.1.4.2.7.1](https://sky-atlas.io/#A.6.1.1.4.2.7.1) | [A.2.2.10.1](https://sky-atlas.io/#A.2.2.10.1) | 0 |

### Completed (2)

| Primitive | Skybase Implementation | Spec Reference | Instances |
|-----------|------------------------|----------------|-----------|
| [Agent Creation Primitive](#agent-creation-primitive) | [A.6.1.1.4.2.1.1](https://sky-atlas.io/#A.6.1.1.4.2.1.1) | [A.2.2.4.1](https://sky-atlas.io/#A.2.2.4.1) | 1 completed |
| [Prime Transformation Primitive](#prime-transformation-primitive) | [A.6.1.1.4.2.1.2](https://sky-atlas.io/#A.6.1.1.4.2.1.2) | [A.2.2.4.2](https://sky-atlas.io/#A.2.2.4.2) | 1 completed |

### Inactive (8)

| Primitive | Skybase Implementation | Spec Reference | Instances |
|-----------|------------------------|----------------|-----------|
| Executor Transformation Primitive | [A.6.1.1.4.2.1.3](https://sky-atlas.io/#A.6.1.1.4.2.1.3) | [A.2.2.4.3](https://sky-atlas.io/#A.2.2.4.3) | 0 |
| Light Agent Primitive | [A.6.1.1.4.2.2.3](https://sky-atlas.io/#A.6.1.1.4.2.2.3) | [A.2.2.5.3](https://sky-atlas.io/#A.2.2.5.3) | 0 |
| Market Cap Fee Primitive | [A.6.1.1.4.2.3.2](https://sky-atlas.io/#A.6.1.1.4.2.3.2) | [A.2.2.6.2](https://sky-atlas.io/#A.2.2.6.2) | 0 |
| Token SkyLink Primitive | [A.6.1.1.4.2.4.1](https://sky-atlas.io/#A.6.1.1.4.2.4.1) | [A.2.2.7.1](https://sky-atlas.io/#A.2.2.7.1) | 0 |
| Pioneer Chain Primitive | [A.6.1.1.4.2.5.3](https://sky-atlas.io/#A.6.1.1.4.2.5.3) | [A.2.2.8.3](https://sky-atlas.io/#A.2.2.8.3) | 0 |
| Allocation System Primitive | [A.6.1.1.4.2.6.1](https://sky-atlas.io/#A.6.1.1.4.2.6.1) | [A.2.2.9.1](https://sky-atlas.io/#A.2.2.9.1) | 0 |
| Junior Risk Capital Rental Primitive | [A.6.1.1.4.2.6.2](https://sky-atlas.io/#A.6.1.1.4.2.6.2) | [A.2.2.9.2](https://sky-atlas.io/#A.2.2.9.2) | 0 |
| Asset Liability Management Rental Primitive | [A.6.1.1.4.2.6.3](https://sky-atlas.io/#A.6.1.1.4.2.6.3) | [A.2.2.9.3](https://sky-atlas.io/#A.2.2.9.3) | 0 |

### Primitive Category Hierarchy

The 18 primitives are organized into 7 categories under [A.6.1.1.4.2 - Sky Primitives](https://sky-atlas.io/#A.6.1.1.4.2). 

Numbers in parenthesis indicate Active + Planned instances:

```
A.6.1.1.4.2 Sky Primitives
│
├── A.6.1.1.4.2.1 Genesis Primitives
│   ├── .1 Agent Creation Primitive ............ Completed
│   ├── .2 Prime Transformation Primitive ...... Completed
│   ├── .3 Executor Transformation Primitive ... Inactive
│   └── .4 Agent Token Primitive ............... Active (1)
│
├── A.6.1.1.4.2.2 Operational Primitives
│   ├── .1 Executor Accord Primitive ........... Active (1)
│   ├── .2 Root Edit Primitive ................. Active (1)
│   └── .3 Light Agent Primitive ............... Inactive
│
├── A.6.1.1.4.2.3 Ecosystem Upkeep Primitives
│   ├── .1 Distribution Requirement Primitive .. Active (1)
│   ├── .2 Market Cap Fee Primitive ............ Inactive
│   └── .3 Upkeep Rebate Primitive ............. Active (1)
│
├── A.6.1.1.4.2.4 SkyLink Primitives
│   └── .1 Token SkyLink Primitive ............. Inactive
│
├── A.6.1.1.4.2.5 Demand Side Stablecoin Primitives
│   ├── .1 Distribution Reward Primitive ....... Active (9+4)
│   ├── .2 Integration Boost Primitive ......... Active (1+1)
│   └── .3 Pioneer Chain Primitive ............. Inactive
│
├── A.6.1.1.4.2.6 Supply Side Stablecoin Primitives
│   ├── .1 Allocation System Primitive ......... Inactive
│   ├── .2 Junior Risk Capital Rental Primitive  Inactive
│   └── .3 ALM Rental Primitive ................ Inactive
│
└── A.6.1.1.4.2.7 Core Governance Primitives
    └── .1 Core Governance Reward Primitive .... Active (0)
```

**Category Summary:**

| Category | Doc No | Primitives | Active | Completed | Inactive |
|----------|--------|------------|--------|-----------|----------|
| Genesis Primitives | [A.6.1.1.4.2.1](https://sky-atlas.io/#A.6.1.1.4.2.1) | 4 | 1 | 2 | 1 |
| Operational Primitives | [A.6.1.1.4.2.2](https://sky-atlas.io/#A.6.1.1.4.2.2) | 3 | 2 | 0 | 1 |
| Ecosystem Upkeep Primitives | [A.6.1.1.4.2.3](https://sky-atlas.io/#A.6.1.1.4.2.3) | 3 | 2 | 0 | 1 |
| SkyLink Primitives | [A.6.1.1.4.2.4](https://sky-atlas.io/#A.6.1.1.4.2.4) | 1 | 0 | 0 | 1 |
| Demand Side Stablecoin Primitives | [A.6.1.1.4.2.5](https://sky-atlas.io/#A.6.1.1.4.2.5) | 3 | 2 | 0 | 1 |
| Supply Side Stablecoin Primitives | [A.6.1.1.4.2.6](https://sky-atlas.io/#A.6.1.1.4.2.6) | 3 | 0 | 0 | 3 |
| Core Governance Primitives | [A.6.1.1.4.2.7](https://sky-atlas.io/#A.6.1.1.4.2.7) | 1 | 1 | 0 | 0 |
| **Total** | | **18** | **8** | **2** | **8** |

---

## Active Primitives

### 1. Agent Token Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.1.4](https://sky-atlas.io/#A.6.1.1.4.2.1.4) |
| **Spec Reference** | [A.2.2.4.4 - Agent Token Primitive](https://sky-atlas.io/#A.2.2.4.4) |
| **Global Activation Status** | [Active](https://sky-atlas.io/#A.6.1.1.4.2.1.4.1.1) |

**Purpose:** Defines Skybase's native token for governance and ecosystem participation.

**Instance:** [Single Instance Configuration Document (A.6.1.1.4.2.1.4.2.1)](https://sky-atlas.io/#A.6.1.1.4.2.1.4.2.1)

| Parameter | Value | Source |
|-----------|-------|--------|
| Token Name | Skybase | [A.6.1.1.4.2.1.4.2.1.1.1](https://sky-atlas.io/#A.6.1.1.4.2.1.4.2.1.1.1) |
| Token Symbol | SKYBASE | [A.6.1.1.4.2.1.4.2.1.1.2](https://sky-atlas.io/#A.6.1.1.4.2.1.4.2.1.1.2) |
| Genesis Supply | TBD | [A.6.1.1.4.2.1.4.2.1.1.3](https://sky-atlas.io/#A.6.1.1.4.2.1.4.2.1.1.3) |
| Token Address | TBD | [A.6.1.1.4.2.1.4.2.1.1.4](https://sky-atlas.io/#A.6.1.1.4.2.1.4.2.1.1.4) |
| Token Admin | TBD | [A.6.1.1.4.2.1.4.2.1.1.5](https://sky-atlas.io/#A.6.1.1.4.2.1.4.2.1.1.5) |
| Token Emissions | Permanently disabled beyond Genesis Supply | [A.6.1.1.4.2.1.4.2.1.1.6](https://sky-atlas.io/#A.6.1.1.4.2.1.4.2.1.1.6) |

**Key Note:** Per [A.6.1.1.4.2.1.4.2.1.1.6](https://sky-atlas.io/#A.6.1.1.4.2.1.4.2.1.1.6), token emissions beyond the Genesis Supply are permanently disabled and cannot be reverted by Skybase Governance. Sky Governance retains ability to revert only if [Risk Capital requirements (A.3.2)](https://sky-atlas.io/#A.3.2) are violated.

---

### 2. Executor Accord Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.2.1](https://sky-atlas.io/#A.6.1.1.4.2.2.1) |
| **Spec Reference** | [A.2.2.5.1 - Executor Accord Primitive](https://sky-atlas.io/#A.2.2.5.1) |
| **Global Activation Status** | [Active](https://sky-atlas.io/#A.6.1.1.4.2.2.1.1.1) |

**Purpose:** Establishes formal agreements with Operational Executor Agents who perform operational tasks for the agent.

**Instance:** [Ozone Instance Configuration Document (A.6.1.1.4.2.2.1.2.1)](https://sky-atlas.io/#A.6.1.1.4.2.2.1.2.1)

| Parameter | Value | Source |
|-----------|-------|--------|
| Operational Executor Agent | Ozone | [A.6.1.1.4.2.2.1.2.1.1.1](https://sky-atlas.io/#A.6.1.1.4.2.2.1.2.1.1.1) |
| Role | Operational GovOps + Operational Facilitator | [A.6.1.1.4.2.2.1.2.1.1.1](https://sky-atlas.io/#A.6.1.1.4.2.2.1.2.1.1.1) |

**Key Note:** Per [A.6.1.1.4.2.2.1.2.1.1.1](https://sky-atlas.io/#A.6.1.1.4.2.2.1.2.1.1.1), Ozone takes on the functions of an Operational Executor Agent in the near term, including both Operational GovOps and Operational Facilitator roles.

---

### 3. Root Edit Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.2.2](https://sky-atlas.io/#A.6.1.1.4.2.2.2) |
| **Spec Reference** | [A.2.2.5.2 - Root Edit Primitive](https://sky-atlas.io/#A.2.2.5.2) |
| **Global Activation Status** | [Active](https://sky-atlas.io/#A.6.1.1.4.2.2.2.1.1) |

**Purpose:** Enables authorized modifications to the agent's core artifact/documentation structure.

**Instance:** [Single Instance Configuration Document (A.6.1.1.4.2.2.2.2.1)](https://sky-atlas.io/#A.6.1.1.4.2.2.2.2.1)

#### Governance Process

**Proposal Submission Requirements:**
- SKYBASE token holder must hold at least **1% of circulating token supply** to submit a proposal
- Proposal submitted through Powerhouse system (or Sky Forum during transition)
- Must be posted on Sky Forum under "Skybase Prime" category
- Title must include "Skybase Artifact Edit Proposal" (for forum submissions during transition)
- Cryptographic proof of token ownership required (for forum submissions)

**Exception:** Per [A.6.1.1.4.2.2.2.2.1.2.1.1.1](https://sky-atlas.io/#A.6.1.1.4.2.2.2.2.1.2.1.1.1), for proposals involving solely buyback or grant of SKYBASE tokens, the 1% threshold is waived.

**Transitionary Measures:** Per [A.6.1.1.4.2.2.2.2.1.2.1.1.2](https://sky-atlas.io/#A.6.1.1.4.2.2.2.2.1.2.1.1.2), until Powerhouse supports Artifact Edit Proposals, submissions via Sky Forum with cryptographic proof are accepted.

---

### 4. Distribution Requirement Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.3.1](https://sky-atlas.io/#A.6.1.1.4.2.3.1) |
| **Spec Reference** | [A.2.2.6.1 - Distribution Requirement Primitive](https://sky-atlas.io/#A.2.2.6.1) |
| **Global Activation Status** | [Active](https://sky-atlas.io/#A.6.1.1.4.2.3.1.1.1) |

**Purpose:** Mandates token buyback and distribution to ecosystem participants.

**Instance:** [Single Instance Configuration Document (A.6.1.1.4.2.3.1.2.1)](https://sky-atlas.io/#A.6.1.1.4.2.3.1.2.1)

| Parameter | Value | Source |
|-----------|-------|--------|
| Terms | Buy back and distribute **0.25% of total token supply per year** | [A.6.1.1.4.2.3.1.2.1.1.1](https://sky-atlas.io/#A.6.1.1.4.2.3.1.2.1.1.1) |
| Process Definition | TBD (future iteration) | [A.6.1.1.4.2.3.1.2.1.2.1.1](https://sky-atlas.io/#A.6.1.1.4.2.3.1.2.1.2.1.1) |

---

### 5. Upkeep Rebate Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.3.3](https://sky-atlas.io/#A.6.1.1.4.2.3.3) |
| **Spec Reference** | [A.2.2.6.3 - Upkeep Rebate Primitive](https://sky-atlas.io/#A.2.2.6.3) |
| **Global Activation Status** | [Active](https://sky-atlas.io/#A.6.1.1.4.2.3.3.1.1) |

**Purpose:** Entitles Prime Agents to receive rebates for holding tokens of other Prime Agents.

**Instance:** [Single Instance Configuration Document (A.6.1.1.4.2.3.3.2.1)](https://sky-atlas.io/#A.6.1.1.4.2.3.3.2.1)

Per [A.6.1.1.4.2.3.3.2.1.1](https://sky-atlas.io/#A.6.1.1.4.2.3.3.2.1.1), every Prime Agent is entitled to the Upkeep Rebate Primitive for tokens of other Prime Agents that they hold. Because this right automatically applies, there are no configurable parameters.

---

### 6. Distribution Reward Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.5.1](https://sky-atlas.io/#A.6.1.1.4.2.5.1) |
| **Spec Reference** | [A.2.2.8.1 - Distribution Reward Primitive](https://sky-atlas.io/#A.2.2.8.1) |
| **Global Activation Status** | [Active](https://sky-atlas.io/#A.6.1.1.4.2.5.1.1.1) |

**Purpose:** Per [A.2.2.8.1.1.1](https://sky-atlas.io/#A.2.2.8.1.1.1), incentivizes Prime Agents and third-party integrators to drive USDS adoption by providing financial rewards for USDS and sUSDS balances attributable to them. Each integration receives a unique **Reward Code** for on-chain attribution tracking.

#### Active Instances (9)

Located at [A.6.1.1.4.2.5.1.2](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2)

| Integration | Reward Code | Instance Doc |
|------------|-------------|--------------|
| Sky.money App | `1` | [A.6.1.1.4.2.5.1.2.1](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.1) |
| Sky.money Open Source Widgets | `0` | [A.6.1.1.4.2.5.1.2.2](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.2) |
| Summer.fi | `1001` | [A.6.1.1.4.2.5.1.2.3](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.3) |
| DeFi Saver | `1002` | [A.6.1.1.4.2.5.1.2.4](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.4) |
| CoW Swap | `1003` | [A.6.1.1.4.2.5.1.2.5](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.5) |
| ParaSwap | `1004` | [A.6.1.1.4.2.5.1.2.6](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.6) |
| Yearn (Gimme) | `1007` | [A.6.1.1.4.2.5.1.2.7](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.7) |
| MOM | `1015` | [A.6.1.1.4.2.5.1.2.8](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.8) |
| Lazy Summer Protocol | `1016` | [A.6.1.1.4.2.5.1.2.9](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.9) |

**Note on Payment Records:** Each integration has a "List Of Distribution Reward Payments" section in the Atlas (e.g., [A.6.1.1.4.2.5.1.2.3.3.4.0.6.1](https://sky-atlas.io/#A.6.1.1.4.2.5.1.2.3.3.4.0.6.1) for Summer.fi). These are currently empty—if payments have been made, they should be reflected here.

#### In Progress Invocations (4)

Located at [A.6.1.1.4.2.5.1.1.4](https://sky-atlas.io/#A.6.1.1.4.2.5.1.1.4)

| Integration | Reward Code | Status | Instance Doc |
|------------|-------------|--------|--------------|
| MetaMask | `1005` | Planning | [A.6.1.1.4.2.5.1.4.1](https://sky-atlas.io/#A.6.1.1.4.2.5.1.4.1) |
| InstaDapp | `1006` | Planning | [A.6.1.1.4.2.5.1.4.2](https://sky-atlas.io/#A.6.1.1.4.2.5.1.4.2) |
| Gnosis Protocol | `1050` | Planning | [A.6.1.1.4.2.5.1.4.3](https://sky-atlas.io/#A.6.1.1.4.2.5.1.4.3) |
| Piku.co | `1010` | Planning | [A.6.1.1.4.2.5.1.4.4](https://sky-atlas.io/#A.6.1.1.4.2.5.1.4.4) |

**Tracking Methodology:** Tracking methodologies vary by instance. Most use [Ethereum Mainnet General Tracking Methodology (A.2.2.8.1.2.1.2.2.1)](https://sky-atlas.io/#A.2.2.8.1.2.1.2.2.1), with exceptions for CoW Swap ([A.2.2.8.1.2.1.2.2.2](https://sky-atlas.io/#A.2.2.8.1.2.1.2.2.2)) and MOM (adds Base methodology). See individual instance docs for details.

---

### 7. Integration Boost Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.5.2](https://sky-atlas.io/#A.6.1.1.4.2.5.2) |
| **Spec Reference** | [A.2.2.8.2 - Integration Boost Primitive](https://sky-atlas.io/#A.2.2.8.2) |
| **Global Activation Status** | [Active](https://sky-atlas.io/#A.6.1.1.4.2.5.2.1.1) |

**Purpose:** Provides enhanced incentives to specific integration partners beyond standard distribution rewards per [A.2.2.8.2](https://sky-atlas.io/#A.2.2.8.2).

#### Active Instance: Euler

[Euler Instance Configuration Document (A.6.1.1.4.2.5.2.2.1)](https://sky-atlas.io/#A.6.1.1.4.2.5.2.2.1)

| Parameter | Value | Source |
|-----------|-------|--------|
| Integration Partner Name | Euler | [A.6.1.1.4.2.5.2.2.1.1.1](https://sky-atlas.io/#A.6.1.1.4.2.5.2.2.1.1.1) |
| Reward Address | `0x33C71422B3E20ef2472Bc9aa9252220CAeAF207e` | [A.6.1.1.4.2.5.2.2.1.1.2](https://sky-atlas.io/#A.6.1.1.4.2.5.2.2.1.1.2) |
| Chain | Base | [A.6.1.1.4.2.5.2.2.1.1.3](https://sky-atlas.io/#A.6.1.1.4.2.5.2.2.1.1.3) |
| Payment Cadence | Weekly | [A.6.1.1.4.2.5.2.2.1.1.4](https://sky-atlas.io/#A.6.1.1.4.2.5.2.2.1.1.4) |
| Data Source | [info-sky.blockanalitica.com](https://info-sky.blockanalitica.com/api/v1/incentivized-pools/) | [A.6.1.1.4.2.5.2.2.1.1.5](https://sky-atlas.io/#A.6.1.1.4.2.5.2.2.1.1.5) |
| Data Responsible Actor | Core Council Risk Advisor | [A.6.1.1.4.2.5.2.2.1.1.6](https://sky-atlas.io/#A.6.1.1.4.2.5.2.2.1.1.6) |
| Rate Calculation | Per-block USDS values + Sky Savings Rate | [A.6.1.1.4.2.5.2.2.1.1.7](https://sky-atlas.io/#A.6.1.1.4.2.5.2.2.1.1.7) |

#### In Progress Invocations (1)

Located at [A.6.1.1.4.2.5.2.1.4](https://sky-atlas.io/#A.6.1.1.4.2.5.2.1.4)

| Integration | Status | Instance Doc |
|------------|--------|--------------|
| Compound | Planning | [A.6.1.1.4.2.5.2.4.1](https://sky-atlas.io/#A.6.1.1.4.2.5.2.4.1) |

---

### 8. Core Governance Reward Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.7.1](https://sky-atlas.io/#A.6.1.1.4.2.7.1) |
| **Spec Reference** | [A.2.2.10.1 - Core Governance Reward Primitive](https://sky-atlas.io/#A.2.2.10.1) |
| **Global Activation Status** | [Active](https://sky-atlas.io/#A.6.1.1.4.2.7.1.1.1) |

**Purpose:** Provides rewards for participation in core governance activities per [A.2.2.10.1](https://sky-atlas.io/#A.2.2.10.1).

**Instances:** None defined yet in [A.6.1.1.4.2.7.1.2](https://sky-atlas.io/#A.6.1.1.4.2.7.1.2)

**Status:** The primitive is activated, indicating Skybase intends to implement governance participation rewards. Specific instance configurations are pending.

---

## Completed Primitives

### Agent Creation Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.1.1](https://sky-atlas.io/#A.6.1.1.4.2.1.1) |
| **Spec Reference** | [A.2.2.4.1 - Agent Creation Primitive](https://sky-atlas.io/#A.2.2.4.1) |
| **Global Activation Status** | [Completed](https://sky-atlas.io/#A.6.1.1.4.2.1.1.1.1) |

One-time creation of Skybase as an agent. Per [A.2.2.4.1.1.2.1](https://sky-atlas.io/#A.2.2.4.1.1.2.1), "the Agent Creation Primitive is deployed solely to effect the one-time creation of the Agent." Per [A.6.1.1.4.2.1.1.1.4](https://sky-atlas.io/#A.6.1.1.4.2.1.1.1.4), no further instances can be invoked. The completed instance is documented at [A.6.1.1.4.2.1.1.3.1](https://sky-atlas.io/#A.6.1.1.4.2.1.1.3.1).

### Prime Transformation Primitive

| | |
|---|---|
| **Skybase Implementation** | [A.6.1.1.4.2.1.2](https://sky-atlas.io/#A.6.1.1.4.2.1.2) |
| **Spec Reference** | [A.2.2.4.2 - Prime Transformation Primitive](https://sky-atlas.io/#A.2.2.4.2) |
| **Global Activation Status** | [Completed](https://sky-atlas.io/#A.6.1.1.4.2.1.2.1.1) |

One-time transformation of Skybase to Prime Agent status. Per [A.6.1.1.4.2.1.2.1.4](https://sky-atlas.io/#A.6.1.1.4.2.1.2.1.4), "the Prime Transformation Primitive is deployed solely for the one-time transformation of the Agent" and no further instances can be invoked. The completed instance is documented at [A.6.1.1.4.2.1.2.3.1](https://sky-atlas.io/#A.6.1.1.4.2.1.2.3.1).

---

## Inactive Primitives

These primitives are defined in [Skybase's Sky Primitives section (A.6.1.1.4.2)](https://sky-atlas.io/#A.6.1.1.4.2) but not currently in use.

| Primitive | Skybase Doc | Spec | Purpose |
|-----------|-------------|------|---------|
| Executor Transformation | [A.6.1.1.4.2.1.3](https://sky-atlas.io/#A.6.1.1.4.2.1.3) | [A.2.2.4.3](https://sky-atlas.io/#A.2.2.4.3) | Transform executor status |
| Light Agent | [A.6.1.1.4.2.2.3](https://sky-atlas.io/#A.6.1.1.4.2.2.3) | [A.2.2.5.3](https://sky-atlas.io/#A.2.2.5.3) | Create lightweight sub-agents |
| Market Cap Fee | [A.6.1.1.4.2.3.2](https://sky-atlas.io/#A.6.1.1.4.2.3.2) | [A.2.2.6.2](https://sky-atlas.io/#A.2.2.6.2) | Fees based on market cap |
| Token SkyLink | [A.6.1.1.4.2.4.1](https://sky-atlas.io/#A.6.1.1.4.2.4.1) | [A.2.2.7.1](https://sky-atlas.io/#A.2.2.7.1) | Cross-chain token bridging |
| Pioneer Chain | [A.6.1.1.4.2.5.3](https://sky-atlas.io/#A.6.1.1.4.2.5.3) | [A.2.2.8.3](https://sky-atlas.io/#A.2.2.8.3) | New chain deployment incentives |
| Allocation System | [A.6.1.1.4.2.6.1](https://sky-atlas.io/#A.6.1.1.4.2.6.1) | [A.2.2.9.1](https://sky-atlas.io/#A.2.2.9.1) | Resource allocation |
| Junior Risk Capital Rental | [A.6.1.1.4.2.6.2](https://sky-atlas.io/#A.6.1.1.4.2.6.2) | [A.2.2.9.2](https://sky-atlas.io/#A.2.2.9.2) | Risk capital borrowing |
| ALM Rental | [A.6.1.1.4.2.6.3](https://sky-atlas.io/#A.6.1.1.4.2.6.3) | [A.2.2.9.3](https://sky-atlas.io/#A.2.2.9.3) | Asset Liability Management services |

---

*Report generated from Atlas version 2026-01-28. All doc_no references link to [sky-atlas.io](https://sky-atlas.io/).*
