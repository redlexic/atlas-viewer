# Variable Parameterization Guide
## Understanding Agent Artifacts Through Variables

---

## Overview

Agent artifacts in the Sky ecosystem are **templated documents** where multiple agents (Prysm, Spark, Grove, Keel, etc.) share the same structural pattern but with **agent-specific values**. Instead of maintaining separate documents, we can think of them as **parameterized templates** where variables are substituted.

### The Factory Metaphor

Think of each section as a **factory in Factorio**:
- Each section is a **production unit** (factory/resource node)
- Variables are the **inputs** that flow through the system
- The final document is the **output product**
- Connections between sections are like **conveyor belts**
- Different agents are different **production runs** with different input materials

> **Future Vision:** A 2D canvas visualization showing all sections as interconnected factory nodes, with variables flowing through the system like resources in Factorio.

---

## Table of Contents: Section Index

### Total Section Count by Category

| Category | Section Count | Variable Density |
|----------|---------------|------------------|
| **Core Identity** | 12 | 🔴 100% variable |
| **Governance** | 24 | 🟠 75% variable |
| **Token Economics** | 18 | 🔴 90% variable |
| **Technical Infrastructure** | 35 | 🟡 60% variable |
| **Primitives** | 48 | 🟢 40% variable |
| **TOTAL** | **137** | **71% avg** |

### Section Hierarchy (Factorio-Style Factory Layout)

```
Agent Artifact (Main Factory)
├── 🏭 Core Identity Section (12 sections)
│   ├── Agent Name
│   ├── Agent Type
│   ├── Token Name
│   ├── Token Symbol
│   ├── Genesis Supply
│   ├── Foundation Name
│   ├── Development Company
│   ├── SubProxy Account
│   ├── Genesis Account
│   ├── Agent Creation Primitive
│   ├── Agent Token Primitive
│   └── Terms
│
├── 🎮 Governance Section (24 sections)
│   ├── Core Governance Primitives
│   ├── Root Edit Primitive
│   ├── Root Edit Proposal Submission
│   ├── Root Edit Proposal Submission Requirements Exception
│   ├── Root Edit Proposal Review By Operational Facilitator
│   ├── Artifact Edit Restrictions
│   ├── Governance Processes
│   ├── Governance Information Unrelated To Root Edit Primitive
│   ├── Sky Forum
│   ├── Sky Ecosystem Emergency Response
│   ├── Emergency Protocol
│   ├── Routine Protocol
│   ├── Non-Routine Protocol
│   ├── Ecosystem Accords
│   ├── Ecosystem Accord 1
│   ├── Ecosystem Accord 2
│   ├── Executor Accord Primitive
│   ├── Executor Transformation Primitive
│   ├── Prime Transformation Primitive
│   ├── Distribution Requirement Primitive
│   ├── Distribution Reward Primitive
│   ├── Distribution Reward Payments
│   ├── Core Governance Reward Primitive
│   └── Operational GovOps Reviews Rebate
│
├── 💰 Token Economics Section (18 sections)
│   ├── Token Emissions
│   ├── Circulating Supply Definition
│   ├── Genesis Supply
│   ├── Token Symbol
│   ├── Token Name
│   ├── Token SkyLink Primitive
│   ├── Integration Boost Primitive
│   ├── Integration Partner Reward Address
│   ├── Market Cap Fee Primitive
│   ├── Junior Risk Capital Rental Primitive
│   ├── Asset Liability Management Rental Primitive
│   ├── Total Risk Capital (TRC) Management
│   ├── Upkeep Rebate Primitive
│   ├── Process Definition For Buy Back And Distribution Obligation
│   ├── SkyLink Primitives
│   ├── Demand Side Stablecoin Primitives
│   ├── Supply Side Stablecoin Primitives
│   └── Core Governance Reward Primitive
│
├── 🔧 Technical Infrastructure Section (35 sections)
│   ├── Sky Primitives
│   ├── Genesis Primitives
│   ├── Operational Primitives
│   ├── Ecosystem Upkeep Primitives
│   ├── ALM Contracts
│   ├── ALM Controller Contract
│   ├── ALM Controller Contract Version
│   ├── ALM Proxy Contract
│   ├── ALM Proxy (Mainnet) Contract
│   ├── ALM Proxy (Avalanche) Contract
│   ├── ALM Rate Limits Contract
│   ├── ALM Rate Limits (Avalanche) Contract
│   ├── Allocator Buffer Contract
│   ├── Multisigs
│   ├── Freezer Multisig
│   ├── ALM Freezer Multisig Address
│   ├── ALM Freezer Multisig (Mainnet) Address
│   ├── ALM Freezer Multisig (Avalanche) Address
│   ├── Prime Relayer Multisig
│   ├── Core Operator Relayer Multisig
│   ├── ALM Relayer Multisig (Avalanche) Address
│   ├── Signers
│   ├── Required Number Of Signers
│   ├── Relayer Role
│   ├── Relayer Functions
│   ├── Default Admin Role
│   ├── Admin Functions
│   ├── Role Hierarchy And Permissions
│   ├── Rate Limits
│   ├── Rate Limit Management
│   ├── Rate Limit IDs
│   ├── RateLimits
│   ├── Inflow Rate Limits
│   ├── Swap Rate Limits
│   └── Outflow Rate Limits
│
├── ⚙️ Primitives & Operations Section (48 sections)
│   ├── Executor Accord Primitive
│   ├── Root Edit Primitive
│   ├── Light Agent Primitive
│   ├── Pioneer Chain Primitive
│   ├── Instance Lifecycle Management
│   ├── Instance-specific Operational Processes
│   ├── Multi-Instance Coordinator Document
│   ├── Primitive Hub Document
│   ├── Ethereum Mainnet Instances
│   ├── Amatsu Instance Configuration Document Location
│   ├── Single Instance Configuration Document Location
│   ├── Ethereum Mainnet - Ethena USDe Instance Configuration Document Location
│   ├── Ethereum Mainnet - Ethena sUSDe Instance Configuration Document Location
│   ├── Ethereum Mainnet - Maple USDC Instance Configuration Document Location
│   ├── Ethereum Mainnet - Superstate USTB Instance Configuration Document Location
│   ├── Invoking New Instances
│   ├── General Specifications
│   ├── Agent Customizations
│   ├── Usage Standards
│   ├── Management Of Infrastructure Inherited From Sky Core
│   ├── Modification
│   ├── Allocation Strategy
│   ├── Controller Functions
│   ├── Mainnet Controller Contract Functions
│   ├── Core Vault Functions
│   ├── ERC-4626 Functions
│   ├── PSM Functions
│   ├── Upgrading Controller
│   ├── Mint USDS
│   ├── Burn USDS
│   ├── USDS Mint Maximum
│   ├── USDS Burn Maximum
│   ├── USDS For USDC Swap Maximum
│   ├── USDS Burn Action
│   ├── USDC to USDS Swap Action
│   ├── ERC-4626 Withdrawal Action
│   ├── sUSDe Cooldown Action
│   ├── sUSDe Unstake Action
│   ├── General Deposit to ERC-4626 Tokens Procedure
│   ├── General Withdraw from ERC-4626 Tokens Procedure
│   ├── General Redeem from ERC-4626 Tokens Procedure
│   ├── Redeem All Mainnet Positions
│   ├── Off-chain Operational Parameters For Ethereum Mainnet
│   ├── Minimum Operation Size Ethereum Mainnet
│   ├── Debt Ceiling Buffer Ethereum Mainnet
│   ├── USDC Mainnet ALM Proxy Maximum
│   ├── USDC Avalanche ALM Proxy Maximum
│   └── USDC Base ALM Proxy Maximum
│
└── 📊 Short-Term & Special Cases (7 sections)
    ├── Short-Term Transitionary Measures
    ├── Root Edit Proposal Submission Requirements Exception For Nested Contributors
    ├── Integration Boost Data Submission Format
    ├── USDC Mainnet ALM Proxy Circle Cross-Chain Transfer Protocol Maximum
    ├── USDC Avalanche ALM Proxy Circle Cross-Chain Transfer Protocol Maximum
    ├── USDC Base ALM Proxy Circle Cross-Chain Transfer Protocol Maximum
    └── Address
```

---

## The 7 Variable Types

### 1. 🏷️ AGENT_NAME (100 sections)
**What it is:** The agent's identity that appears throughout the document

**Factorio Analogy:** The main resource type flowing through your factory (Iron vs Copper)

**Examples:**
- Prysm → "The documents herein specify all of the logic for **Prysm**..."
- Spark → "The documents herein specify all of the logic for **Spark**..."

**Current Status:** ✅ Already implemented in Builder

**Sections affected:** Core (12), Governance (24), Token Economics (18), Technical (35), Operations (11)

---

### 2. 🔢 NUMERIC_VALUE (127 sections)
**What it is:** Numbers that differ between agents (amounts, percentages, limits, versions)

**Factorio Analogy:** Production rates, capacity limits, recipe ratios

**Sub-types:**
- **Genesis Supply:** `1 billion` vs `10 billion`
- **Rate Limits:** `200,000,000 USDS` vs `50,000,000 USDC`
- **Multisig Requirements:** `1/2` vs `4/7`
- **Contract Versions:** `V.1.6.0` vs `TBD`

**Current Status:** ⚠️ Not implemented (would require complex UI)

**Most common sections:**
- Rate limits (12 sections)
- Contract configurations (8 sections)
- Supply definitions (6 sections)
- Multisig requirements (5 sections)

---

### 3. 🎫 TOKEN_SYMBOL (6 sections)
**What it is:** The ticker symbol for each agent's token

**Factorio Analogy:** Resource icon/label on the belt

**Examples:**
- PRM (Prysm)
- SPK (Spark)
- GROVE (Grove)

**Current Status:** ✅ Already implemented in Builder

**Sections affected:**
1. Token Symbol
2. Genesis Supply
3. Circulating Supply Definition
4. Root Edit Proposal Submission
5. Root Edit Proposal Submission Requirements Exception
6. Short-Term Transitionary Measures

---

### 4. 🔗 DOC_NO_REFERENCE (25 sections)
**What it is:** Internal document references with agent-specific numbering

**Factorio Analogy:** Pipeline connections between factories (different routes for different products)

**Pattern:**
- Spark: `A.6.1.1.1.2.6.1...`
- Grove: `A.6.1.1.2.2.6.1...`
- Keel: `A.6.1.1.3.2.6.1...`

**Current Status:** ❌ Not implemented (auto-generated references)

**Key insight:** The 4th number identifies the agent (1=Spark, 2=Grove, 3=Keel, etc.)

---

### 5. 🆔 UUID_REFERENCE (26 sections)
**What it is:** Unique identifiers for cross-document links

**Factorio Analogy:** GPS coordinates for factory locations

**Pattern:** `[Link Text](xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)`

**Current Status:** ❌ Not implemented (UUIDs are unique per section)

**Note:** These naturally differ because each agent has unique section UUIDs

---

### 6. 💎 ETH_ADDRESS (14 sections)
**What it is:** Ethereum contract and wallet addresses

**Factorio Analogy:** Output chest addresses, train station IDs

**Examples:**
- Grove ALM Controller: `0x08b045609a673996ca10fedbAFAE2395A21ba539`
- Launch Agent 4 ALM Controller: `0xF2bB664f16E2df4b0c71F9d2cFc386504E795b7A`

**Current Status:** ❌ Not implemented

**Sections affected:**
- ALM Controller Contract
- ALM Proxy Contracts (3 networks)
- Multisig Addresses (6 types)
- SubProxy Account
- Integration Partner Reward Address

---

### 7. 🌐 URL (1 section)
**What it is:** Web URLs that differ between agents

**Factorio Analogy:** External API endpoints, remote logistics

**Example:** Different API endpoints for data submission

**Current Status:** ❌ Not implemented

**Sections affected:**
1. Integration Boost Data Submission Format

---

## Implementation Roadmap

### Phase 1: ✅ Core Identity (DONE)
- [x] AGENT_NAME variable
- [x] TOKEN_SYMBOL variable
- [x] SubProxy Account handling
- [x] Auto-substitution with green highlighting
- [x] Export with substituted values

### Phase 2: 🎯 Extended Identity (RECOMMENDED NEXT)
**Effort:** Low | **Impact:** High

Variables to add:
- `AGENT_ID` - Agent number (1, 2, 3, etc.)
- `FOUNDATION_NAME` - Agent's foundation name
- `DEV_COMPANY_NAME` - Development company
- `LIQUIDITY_LAYER_NAME` - Full name
- `LIQUIDITY_LAYER_SHORT` - Abbreviation (SLL, GLL, etc.)
- `GENESIS_SUPPLY` - Token genesis supply

**Why these?** They appear frequently (20-50 sections each) and are simple string replacements.

### Phase 3: 💰 Ethereum Addresses
**Effort:** Medium | **Impact:** Medium

Variables to add:
- `ALM_CONTROLLER_ADDRESS`
- `ALM_PROXY_MAINNET_ADDRESS`
- `ALM_PROXY_AVALANCHE_ADDRESS`
- `FREEZER_MULTISIG_ADDRESS`
- `RELAYER_MULTISIG_ADDRESS`
- `SUBPROXY_ACCOUNT_ADDRESS`

**Challenge:** Multiple networks, need per-network configuration

### Phase 4: 🔢 Numeric Configuration
**Effort:** High | **Impact:** Medium

Variables to add:
- Rate limits (inflow/outflow max amounts, slopes)
- Multisig requirements (signers, thresholds)
- Contract versions
- Supply limits

**Challenge:** Highly variable, need structured input (not just text boxes)

### Phase 5: 🔗 Auto-Generated References
**Effort:** Very High | **Impact:** Low

Variables to add:
- `DOC_NO_REFERENCE` - Auto-calculate based on agent ID
- `UUID_REFERENCE` - Generate unique UUIDs

**Challenge:** Requires understanding document structure, UUID generation

---

## Variable Dependency Graph

```
AGENT_NAME (root)
├── TOKEN_NAME (usually same as AGENT_NAME)
├── TOKEN_SYMBOL (derived)
├── FOUNDATION_NAME (pattern: "{AGENT_NAME} Foundation")
├── LIQUIDITY_LAYER_NAME (pattern: "{AGENT_NAME} Liquidity Layer")
├── LIQUIDITY_LAYER_SHORT (abbreviation)
└── FORUM_CATEGORY (pattern: "{AGENT_NAME} Prime")

AGENT_ID (root)
├── DOC_NO_REFERENCE (pattern: A.6.1.1.{AGENT_ID}.X.Y.Z)
└── AGENT_DOC_PREFIX (pattern: A.6.1.1.{AGENT_ID})

Independent Variables:
- ETH_ADDRESS (per contract, per network)
- NUMERIC_VALUE (per configuration item)
- UUID_REFERENCE (per section, unique)
- URL (per integration)
- DEV_COMPANY_NAME (no pattern)
- GENESIS_SUPPLY (no pattern)
```

---

## Special Patterns Identified

### Pattern 1: Liquidity Layer Naming
Different agents use different naming conventions:

| Agent | Full Name | Short Name |
|-------|-----------|------------|
| Spark | Spark Liquidity Layer | SLL |
| Grove | Grove Liquidity Layer | GLL |
| Prysm | Prysm Liquidity Layer | PLL |
| Launch Agent 4 | Launch Agent 4 Liquidity Layer | LA4LL |

**Variable needed:** `LIQUIDITY_LAYER_SHORT`

### Pattern 2: Foundation Names
**Template:** `The {FOUNDATION_NAME} is the Prime Foundation associated with {AGENT_NAME}.`

| Agent | Foundation Name |
|-------|----------------|
| Prysm | Prysm Foundation |
| Spark | Spark Assets Foundation |
| Grove | Grove Foundation |
| Keel | Keel Foundation |

**Variable needed:** `FOUNDATION_NAME`

### Pattern 3: Development Company
**No clear pattern** - each agent has a unique dev company:

| Agent | Dev Company |
|-------|-------------|
| Prysm | Stablewatch sp. z o.o. |
| Spark | Phoenix Labs |
| Grove | Grove Development Company |

**Variable needed:** `DEV_COMPANY_NAME` (manual entry)

### Pattern 4: Forum Categories
**Template:** `Posts should use the "{FORUM_CATEGORY}" category.`

| Agent | Forum Category |
|-------|---------------|
| Prysm | Prysm Prime |
| Spark | Spark Prime |
| Grove | Grove Prime |

**Derivable from:** `{AGENT_NAME} Prime`

---

## Factorio Visualization Concept

### Factory Layout Ideas

**Main Production Line (left to right):**
```
[Agent Config Input]
    ↓
[Core Identity Factory] → AGENT_NAME, TOKEN_SYMBOL
    ↓
[Governance Factory] → Policy documents
    ↓
[Token Economics Factory] → Economic parameters
    ↓
[Technical Infrastructure Factory] → Contract addresses
    ↓
[Operations Factory] → Procedures
    ↓
[Export Output]
```

**Variable Flow:**
- Input chests: Variable values
- Assemblers: Section templates
- Conveyor belts: Variable propagation
- Output chests: Final documents

**Visual Elements:**
- 🟢 Green: Variables already set
- 🔴 Red: Variables missing/TBD
- 🟡 Yellow: Optional variables
- 📊 Size: Indicates section complexity
- 🔗 Lines: Cross-references between sections

**Interactive Features:**
- Click section → Edit variables
- Hover → See variable dependencies
- Drag → Reorganize factory layout
- Zoom → See detail levels

---

## Statistics Summary

### Coverage by Variable Type

| Variable Type | Sections | % of Total | Implementation Status |
|--------------|----------|------------|----------------------|
| NUMERIC_VALUE | 127 | 92.7% | ❌ Not implemented |
| AGENT_NAME | 100 | 73.0% | ✅ Implemented |
| UUID_REFERENCE | 26 | 19.0% | ❌ Not implemented |
| DOC_NO_REFERENCE | 25 | 18.2% | ❌ Not implemented |
| ETH_ADDRESS | 14 | 10.2% | ❌ Not implemented |
| TOKEN_SYMBOL | 6 | 4.4% | ✅ Implemented |
| URL | 1 | 0.7% | ❌ Not implemented |

**Total unique sections with variables:** 137

**Average variables per section:** 2.18

**Most variable-dense sections:**
1. Short-Term Transitionary Measures (6 variable types)
2. ALM Contracts (5 variable types)
3. Genesis Supply (4 variable types)

---

## Quick Reference: Variable Implementation Status

### ✅ Already Working (3 variables)
1. `AGENT_NAME` - Full replacement with highlighting
2. `TOKEN_SYMBOL` - Full replacement with highlighting
3. `SUBPROXY_ACCOUNT` - Full replacement with highlighting

### 🎯 Easy to Add (7 variables)
Simple string replacements, high impact:
1. `AGENT_ID` - "1", "2", "3", etc.
2. `FOUNDATION_NAME` - "{AGENT_NAME} Foundation" (or custom)
3. `DEV_COMPANY_NAME` - Custom per agent
4. `LIQUIDITY_LAYER_NAME` - "{AGENT_NAME} Liquidity Layer"
5. `LIQUIDITY_LAYER_SHORT` - "SLL", "GLL", etc.
6. `GENESIS_SUPPLY` - "1 billion", "10 billion", etc.
7. `FORUM_CATEGORY` - "{AGENT_NAME} Prime"

### 🔧 Medium Difficulty (6 variables)
Structured data, need better UI:
1. `ALM_CONTROLLER_ADDRESS` - Hex address
2. `ALM_PROXY_ADDRESS` - Hex address (per network)
3. `FREEZER_MULTISIG_ADDRESS` - Hex address (per network)
4. `RELAYER_MULTISIG_ADDRESS` - Hex address
5. `INTEGRATION_REWARD_ADDRESS` - Hex address
6. `CONTRACT_VERSION` - "V.1.6.0", etc.

### 🚧 Complex (3 variable types)
Need advanced implementation:
1. `NUMERIC_VALUE` - Hundreds of different numbers
2. `DOC_NO_REFERENCE` - Auto-calculate from agent structure
3. `UUID_REFERENCE` - Generate unique UUIDs per section

---

## Next Steps

1. **Add Phase 2 variables** to Builder form (7 new simple variables)
2. **Create Ethereum address catalog** (reference from ethereum_addresses_catalog.md)
3. **Design numeric value input system** (structured form vs free text)
4. **Prototype Factorio visualization** on HTML canvas
5. **Build variable dependency resolver** (auto-derive Foundation name from Agent name)

---

*Last updated: 2025-11-28*
*Analysis based on: 6 agents (Prysm, Spark, Grove, Keel, Launch Agent 3, Launch Agent 4)*
*See also: VARIABLE_ANALYSIS_REPORT.md, ethereum_addresses_catalog.md*
