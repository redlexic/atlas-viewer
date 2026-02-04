# Distribution Reward Primitive - Structure Analysis

**Purpose:** Reference document for understanding how reward primitives are structured in the Atlas, to inform upcoming Core Governance Reward edits.

**Date:** 2026-01-27

---

## Executive Summary

The Distribution Reward Primitive follows a three-tier structure:

1. **Primitive Definition** (A.2.2.8.1) - Global rules, rates, and processes
2. **Agent Implementation** (A.6.1.1.X.2.5.1) - Per-Prime Agent activation and instances
3. **Contract Deployment** (A.4.4.1.4.2.1) - Deployed contract addresses and parameters

This pattern should be replicated for Core Governance Rewards.

---

## 1. Primitive Definition Level

### Location: A.2.2.8.1 - Distribution Reward Primitive

**Hierarchy:**

```
A.2.2.8.1 - Distribution Reward Primitive
├── A.2.2.8.1.1 - Introduction
│   └── A.2.2.8.1.1.1 - Purpose
├── A.2.2.8.1.2 - Global Specification
│   ├── A.2.2.8.1.2.1 - Base Elements
│   │   ├── A.2.2.8.1.2.1.1 - Integrator Program
│   │   ├── A.2.2.8.1.2.1.2 - Reward Codes
│   │   ├── A.2.2.8.1.2.1.3 - Distribution Reward Rate
│   │   │   └── A.2.2.8.1.2.1.3.1 - Boosted Distribution Reward Rate
│   │   ├── A.2.2.8.1.2.1.4 - Rewards Distribution
│   │   │   ├── A.2.2.8.1.2.1.4.1 - Reward Cadence
│   │   │   ├── A.2.2.8.1.2.1.4.2 - Reward Payment
│   │   │   ├── A.2.2.8.1.2.1.4.3 - Treasury Management
│   │   │   └── A.2.2.8.1.2.1.4.4 - Payment Errors
│   │   ├── A.2.2.8.1.2.1.5 - Current And Onboarding Integrators
│   │   └── A.2.2.8.1.2.1.6 - Distribution Reward Reimbursement
│   ├── A.2.2.8.1.2.2 - Global Activation
│   ├── A.2.2.8.1.2.3 - Instance Invocation Protocol
│   └── A.2.2.8.1.2.4 - Instance Management
```

### Key Values

| Parameter | Value | Section |
|-----------|-------|---------|
| Distribution Reward Rate | 0.2% annualized | A.2.2.8.1.2.1.3 |
| Boosted Distribution Reward Rate | +0.3% (total 0.5%) | A.2.2.8.1.2.1.3.1 |
| Reward Cadence | Monthly | A.2.2.8.1.2.1.4.1 |

### Reward Payment Formula (A.2.2.8.1.2.1.4.2)

> "The Distribution Reward payment for each month is equal to (1) the average balance over the month, times (2) the annual Distribution Reward Fee specified in A.2.2.8.1.2.1.3, divided by (3) twelve (12)."

### Purpose Statement (A.2.2.8.1.1.1)

> "The purpose of the Distribution Reward is to incentivize Prime Agents and third parties to drive USDS adoption by providing a financial reward to these actors for all USDS and sUSDS balances attributable to them."

---

## 2. Agent Implementation Level

### Location: A.6.1.1.1.2.5.1 - Spark's Distribution Reward Primitive

**Hierarchy:**

```
A.6.1.1.1.2.5.1 - Distribution Reward Primitive
├── A.6.1.1.1.2.5.1.1 - Primitive Hub Document
│   ├── A.6.1.1.1.2.5.1.1.1 - Global Activation Status
│   ├── A.6.1.1.1.2.5.1.1.2 - Active Instances Directory
│   ├── A.6.1.1.1.2.5.1.1.3 - Completed Instances Directory
│   ├── A.6.1.1.1.2.5.1.1.4 - In Progress Invocations Directory
│   └── A.6.1.1.1.2.5.1.1.5 - Hub Data Repository
├── A.6.1.1.1.2.5.1.2 - Active Instances
│   └── A.6.1.1.1.2.5.1.2.1 - SparkLend Instance Configuration Document
│       └── A.6.1.1.1.2.5.1.2.1.1 - Parameters
│           ├── A.6.1.1.1.2.5.1.2.1.1.1 - Reward Code
│           ├── A.6.1.1.1.2.5.1.2.1.1.2 - Tracking Methodology
│           └── A.6.1.1.1.2.5.1.2.1.1.3 - Custom Instance Parameters
├── A.6.1.1.1.2.5.1.3 - Completed Instances
└── A.6.1.1.1.2.5.1.4 - In Progress Invocations
```

### Key Observations

1. **Global Activation Status** is a simple status field: `Active`

2. **Directories** organize instances by lifecycle status:
   - Active Instances Directory
   - Completed Instances Directory
   - In Progress Invocations Directory

3. **Instance Configuration Documents** contain:
   - Parameters section (with specific values)
   - Reference back to the directory location

4. **Spark's SparkLend Instance parameters:**
   - Reward Code: `128`
   - Tracking Methodology: References A.2.2.8.1.2.1.2.2.1

---

## 3. Contract Deployment Level

### Location: A.4.4.1.4.2.1 - Short Term SKY Staking Rewards Contracts

**Hierarchy:**

```
A.4.4.1.4.2.1 - Short Term SKY Staking Rewards Contracts
├── A.4.4.1.4.2.1.1 - Staking Rewards Contract
│   ├── A.4.4.1.4.2.1.1.1 - Staking Rewards Contract Address
│   └── A.4.4.1.4.2.1.1.2 - Staking Rewards Contract Parameters
│       ├── A.4.4.1.4.2.1.1.2.1 - Owner
│       └── A.4.4.1.4.2.1.1.2.2 - Rewards Distribution Contract Address
├── A.4.4.1.4.2.1.2 - Rewards Distribution Contract
│   ├── A.4.4.1.4.2.1.2.1 - Rewards Distribution Contract Address
│   └── A.4.4.1.4.2.1.2.2 - Rewards Distribution Contract Parameters
│       └── A.4.4.1.4.2.1.2.2.1 - Staking Rewards Contract Address
└── A.4.4.1.4.2.1.3 - Vesting Stream Contract
    └── ...
```

### Contract Addresses

| Contract | Address | Section |
|----------|---------|---------|
| Staking Rewards | `0xB44C2Fb4181D7Cb06bdFf34A46FdFe4a259B40Fc` | A.4.4.1.4.2.1.1.1 |
| Rewards Distribution | `0x675671A8756dDb69F7254AFB030865388Ef699Ee` | A.4.4.1.4.2.1.2.1 |

### Contract Descriptions

**Staking Rewards Contract (A.4.4.1.4.2.1.1):**
> "The Staking Rewards contract is the user facing contract that allows SKY stakers to stake their SKY to receive SKY rewards. It maintains the balance of staked SKY receiving SKY rewards for each user and the associated accumulated rewards balance."

**Rewards Distribution Contract (A.4.4.1.4.2.1.2):**
> "The Rewards Distribution contract is the contract that handles the regular transfer of reward tokens from the Vesting Stream contract to the Staking Rewards contract for distribution to end users."

**Vesting Stream Contract (A.4.4.1.4.2.1.3):**
> "The Vesting Stream contract manages various vesting streams that vest SKY Tokens from the Protocol Treasury. One of these vesting streams regularly vests SKY Tokens to the Staking Rewards contract."

---

## 4. Active Data Patterns

Active Data is used for values that change frequently and are managed by specific parties.

### Pattern

```
A.X.X.X.X - [Topic] (Active Data Controller)
├── content: "Description of what data is stored and how it's updated..."
│   • Responsible Party: [e.g., Core GovOps, Operational GovOps]
│   • Update Process: [e.g., Direct Edit]
└── active_data:
    └── A.X.X.X.X.0.6.1 - [Data Name] (Active Data)
        └── content: "The current values are: ..."
```

### Examples

**Current Integrators (A.2.2.8.1.2.1.5.1):**
- Responsible Party: Operational GovOps
- Update Process: Direct Edit
- Active Data: A.2.2.8.1.2.1.5.1.0.6.1 - List Of Current Integrators

**Distribution Reward Reimbursement (A.2.2.8.1.2.1.6.1):**
- Responsible Party: Core GovOps
- Update Process: Direct Edit
- Active Data: A.2.2.8.1.2.1.6.1.0.6.1 - Sky Core Distribution Reward Reimbursement Amounts

---

## 5. Core Governance Reward Primitive - Current State

### Location: A.2.2.10.1

**Current content (minimal):**

```
A.2.2.10 - Core Governance Primitives
└── A.2.2.10.1 - Core Governance Reward Primitive
    └── content: "The Core Governance Reward Primitive is a reward that Sky
        pays to Prime Agents that provide SKY holders with secure access to
        the core Sky Governance features, ensuring that the Governance
        Security of Sky is maintained over time."
```

**Observation:** This primitive has only a single sentence. It needs to be expanded with:
- Introduction / Purpose section
- Global Specification
  - Base Elements (rates, cadence, payment formula)
  - Global Activation process
  - Instance Invocation Protocol
  - Instance Management
- Agent implementation sections in each Prime Agent's scope

---

## 6. Structural Patterns Summary

### Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Primitive Definition | `[Name] Primitive` | Distribution Reward Primitive |
| Introduction | `Introduction` then `Purpose` | A.2.2.8.1.1, A.2.2.8.1.1.1 |
| Global Specification | `Global Specification` | A.2.2.8.1.2 |
| Base Elements | `Base Elements` | A.2.2.8.1.2.1 |
| Rate | `[Name] Rate` | Distribution Reward Rate |
| Boosted Rate | `Boosted [Name] Rate` | Boosted Distribution Reward Rate |
| Contract | `[Name] Contract` | Staking Rewards Contract |
| Contract Address | `[Name] Contract Address` | Staking Rewards Contract Address |
| Contract Parameters | `[Name] Contract Parameters` | Staking Rewards Contract Parameters |
| Instance Config | `[Instance Name] Instance Configuration Document` | SparkLend Instance Configuration Document |
| Active Data | `[Topic]` (controller) + `[Data Name]` (data) | Current Integrators + List Of Current Integrators |

### Document Types

| Type | Usage |
|------|-------|
| `Core` | Standard documentation |
| `Section` | Major structural division |
| `Active Data Controller` | Container for frequently-updated data |
| `Active Data` | The actual dynamic data values |

### Content Patterns

**Simple value:** Just the value in backticks
```
content: "`128`."
content: "`Active`"
```

**Address:** Full sentence with backticks
```
content: "The address of the Staking Rewards contract on the Ethereum Mainnet is `0xB44C2Fb4181D7Cb06bdFf34A46FdFe4a259B40Fc`."
```

**Rate:** Narrative with percentage
```
content: "The standard Distribution Reward rate is set at 0.2%. The Distribution Reward rate is annualized on all USDS and sUSDS balances..."
```

**Formula:** Numbered list
```
content: "The Distribution Reward payment for each month is equal to \n\n(1) the average balance over the month, times \n(2) the annual Distribution Reward Fee..., divided by \n(3) twelve (12)."
```

**Active Data Controller:** Bullet list format
```
content: "The [data] is defined as Active Data in [link].\n \nThe Active Data is updated as follows:\n• The Responsible Party is [Party].\n• The Update Process must follow the protocol for '[Protocol]'."
```

---

## 7. Related Sections

| Section | Relevance |
|---------|-----------|
| A.2.2.8.2 - Integration Boost Primitive | Paired with Distribution Reward, shares Integrator Program |
| A.2.3.1.2.3 - Step 2: High Activity Staking Rewards | HASR uses similar reward mechanics |
| A.2.8.2.2.2.3 - Distribution Reward | Token rewards allocation context |
| A.3.2.2.4.2.4 - srUSDS Distribution Reward | Extension to srUSDS balances |
| A.4.4.1.4 - Short Term Transitionary Measures | Contract deployment for staking rewards |

---

## 8. Questions for Core Governance Reward Implementation

1. **Rate:** What is the Core Governance Reward rate? Is there a boosted tier?

2. **Cadence:** Monthly like Distribution Reward, or different?

3. **Eligibility criteria:** What defines "secure access to core Sky Governance features"?

4. **Contracts:** Are there dedicated contracts, or does it use existing infrastructure?

5. **Tracking:** How are qualifying Prime Agent frontends tracked? Reward codes?

6. **Active Data:** What lists/amounts need to be maintained as Active Data?
