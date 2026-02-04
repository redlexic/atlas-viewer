# Core Governance Reward Primitive - Review & Comparison

**Date:** 2026-01-27
**Purpose:** Side-by-side comparison with Distribution Reward Primitive to inform feedback on draft

---

## Source Documents Defined

### "Whitepaper"
**File:** `docs/reference/code-agents-extracted/code-agents/active/whitepaper/appendix-b-agent-primitives.md`

The Sky Agent Framework Primitives specification. Part of a comprehensive whitepaper package extracted from `docs/reference/code-agents.zip`. This is the **authoritative design document** for how Sky's agent primitives are intended to work.

### "Draft"
**File:** `docs/drafts/core-governance.md`

A colleague's proposed Atlas edit for adding the Core Governance Reward Primitive. This is a **proposal under review** that adds operational details not present in the whitepaper.

### "Atlas"
**File:** `public/data/atlas/atlas-2026-01-26.json`

The current live Sky Atlas. Contains the existing (mostly empty) stub at A.2.2.10.1.

### Other Reference Files
- `atlas-synome-separation.md` - Treasury allocation breakdown
- `sky-tmf.md` - Treasury Management Function details

---

**Sources Used:**
- Atlas (A.2.2.8.1 - Distribution Reward Primitive)
- Atlas (A.2.2.10.1 - Core Governance Reward Primitive - stub)
- Whitepaper Appendix B: Agent Primitives
- Treasury Management Function
- Atlas Synome Separation

---

## 0. Authoritative Source: Whitepaper Definition

### Governance Access Reward (Whitepaper Appendix B, lines 519-530)

> **"Rewards for Primes providing compliant governance frontends."**

| Property | Value |
|----------|-------|
| **Pool** | 1% of Sky's yearly net revenue |
| **Recipient** | Primes with compliant SKY Staking and governance frontends |
| **Requirements** | Frontend meets Atlas and Synome specifications |
| **Distribution** | Split among eligible Primes based on SKY staked through each frontend |

> **Note:** Specific compliance requirements for frontends are TBD.

### Treasury Allocation (atlas-synome-separation.md, line 133)

```
Step 1: Security and Stability Maintenance
    - Core Executor Reward: up to 3%
    - Aligned Delegates: up to 1%
    - Governance Accessibility: 1%   ← THIS IS THE GOVERNANCE ACCESS REWARD
```

### Key Discrepancies: Whitepaper vs Draft

| Aspect | Whitepaper | Draft | Issue |
|--------|------------|-------|-------|
| **Name** | "Governance Access Reward" | "Core Governance Reward Primitive" | Different naming |
| **Recipient** | "Primes" only | Integrators (0.5%) + Prime Agents (0.5%) | Draft introduces split not in whitepaper |
| **Distribution** | "Split among eligible Primes based on SKY staked" | Pro rata to Integrators + Prime Agents separately | Draft adds complexity |
| **Pool** | 1% of yearly net revenue | 1% of Net Revenue (0.5% + 0.5%) | Matches but with added split |

**Critical Question:** Where does the 0.5%/0.5% Integrator/Prime Agent split come from? The whitepaper only mentions "Primes" as recipients.

---

## 0.1. Distribution Rewards - Whitepaper Definition (for comparison)

### Distribution Rewards (Whitepaper Appendix B, lines 395-454)

> **"Token rewards to incentivize USDS/sUSDS adoption through tagging."**

| Property | Value |
|----------|-------|
| **Recipient** | Stars (who then distribute at their discretion) |
| **Split** | No enforced split — each Star determines how to share with integrators |
| **Eligible Assets** | USDS and sUSDS (both count as adoption) |
| **Minimum Balance** | None |

### Distribution Reward Tiers (Whitepaper)

| Tier | Rate | Criteria |
|------|------|----------|
| **0** | No DR | Excluded/ineligible addresses |
| **1** | 0 bps | Untagged addresses (tracked but unpaid) |
| **2** | 10 bps | Unbranded complex products (<90% sUSDS backing) |
| **3** | 20 bps | Branded USDS products OR unbranded with ≥90% sUSDS backing |
| **4** | 50 bps | Direct USDS/sUSDS holding with clear Sky branding (Boosted DR) |

**Note:** The whitepaper has MORE detailed tier structure than current Atlas (which only shows 0.2% standard + 0.3% boosted).

### Key Structural Difference

| Aspect | Distribution Reward | Governance Access Reward |
|--------|---------------------|--------------------------|
| **What's tracked** | USDS/sUSDS balances | Staked SKY amount |
| **Recipient** | "Stars" (Prime Agents) | "Primes" |
| **Split** | "No enforced split — each Star determines" | Whitepaper: none specified; Draft: 0.5%/0.5% |
| **Rate basis** | Tiers (0-50 bps) on tracked balances | 1% of Net Revenue, split by % SKY staked |

---

## 1. Location in Atlas Hierarchy

| Aspect | Distribution Reward | Core Governance Reward (Draft) |
|--------|---------------------|-------------------------------|
| **Current Location** | A.2.2.8.1 | A.2.2.10.1 |
| **Draft Uses** | — | A.2.4 ❌ |
| **Parent** | A.2.2.8 - Demand Side Stablecoin Primitives | A.2.2.10 - Core Governance Primitives |

**Reference:** The existing Core Governance Reward Primitive stub is at A.2.2.10.1:
> *"The Core Governance Reward Primitive is a reward that Sky pays to Prime Agents that provide SKY holders with secure access to the core Sky Governance features..."*

**Issue:** Draft uses `A.2.4` which doesn't match the existing Atlas structure.

---

## 2. Top-Level Structure Comparison

### Distribution Reward Primitive (A.2.2.8.1)

```
A.2.2.8.1 - Distribution Reward Primitive
├── A.2.2.8.1.1 - Introduction
│   └── A.2.2.8.1.1.1 - Purpose
└── A.2.2.8.1.2 - Global Specification
    ├── A.2.2.8.1.2.1 - Base Elements
    ├── A.2.2.8.1.2.2 - Global Activation
    ├── A.2.2.8.1.2.3 - Instance Invocation Protocol
    └── A.2.2.8.1.2.4 - Instance Management
```

### Core Governance Reward (Draft)

```
A.2.4 - Core Governance Reward Primitive [WRONG NUMBER]
├── Reward Pool
├── Eligible Recipients
│   └── Current Eligible Recipients
├── Compliance Requirements
│   ├── Security Standards
│   └── Information Standards
└── Distribution Mechanism
    ├── Integration With Treasury Management Function
    ├── Allocation Based On Staked SKY
    │   └── Tracking Via Reward Codes
    └── Distribution Through Prime Agents
```

### Gap Analysis

| Structure Element | Distribution Reward | Core Gov Draft | Atlas Reference |
|-------------------|:-------------------:|:--------------:|-----------------|
| Introduction section | ✅ | ❌ | A.2.2.8.1.1 |
| Purpose statement | ✅ | ❌ | A.2.2.8.1.1.1 |
| Global Specification wrapper | ✅ | ❌ | A.2.2.8.1.2 |
| Base Elements container | ✅ | ❌ | A.2.2.8.1.2.1 |
| Global Activation | ✅ | ❌ | A.2.2.8.1.2.2 |
| Instance Invocation Protocol | ✅ | ❌ | A.2.2.8.1.2.3 |
| Instance Management | ✅ | ❌ | A.2.2.8.1.2.4 |

---

## 3. Base Elements Comparison

### Distribution Reward Base Elements (A.2.2.8.1.2.1)

```
A.2.2.8.1.2.1 - Base Elements
├── A.2.2.8.1.2.1.1 - Integrator Program
├── A.2.2.8.1.2.1.2 - Reward Codes
├── A.2.2.8.1.2.1.3 - Distribution Reward Rate
│   └── A.2.2.8.1.2.1.3.1 - Boosted Distribution Reward Rate
├── A.2.2.8.1.2.1.4 - Rewards Distribution
│   ├── A.2.2.8.1.2.1.4.1 - Reward Cadence
│   ├── A.2.2.8.1.2.1.4.2 - Reward Payment
│   ├── A.2.2.8.1.2.1.4.3 - Treasury Management
│   └── A.2.2.8.1.2.1.4.4 - Payment Errors
├── A.2.2.8.1.2.1.5 - Current And Onboarding Integrators
└── A.2.2.8.1.2.1.6 - Distribution Reward Reimbursement
```

### Core Governance Reward Draft (Mapped)

| Distribution Reward Section | Equivalent in Draft | Notes |
|-----------------------------|---------------------|-------|
| Integrator Program | Eligible Recipients | Similar concept |
| Reward Codes | Tracking Via Reward Codes | Mentioned but not fully defined |
| Distribution Reward Rate | Reward Pool | Different structure (see below) |
| Boosted Rate | — | Not present |
| Reward Cadence | Integration With Treasury Management | "monthly" mentioned |
| Reward Payment | Allocation Based On Staked SKY | "pro rata" formula |
| Treasury Management | — | Not addressed |
| Payment Errors | — | Not addressed |
| Current Integrators | Current Eligible Recipients | Not structured as Active Data |
| Reimbursement | — | Not addressed |

---

## 4. Reward Rate Structure

### Distribution Reward Rate (A.2.2.8.1.2.1.3)

> *"The standard Distribution Reward rate is set at 0.2%. The Distribution Reward rate is annualized on all USDS and sUSDS balances associated with the relevant Reward Code."*

**Sub-section:** A.2.2.8.1.2.1.3.1 - Boosted Distribution Reward Rate
> *"An additional 0.3% Boosted Distribution Reward rate will be available starting January 2026..."*

**Pattern:** Rate stated as percentage, applied to tracked balances.

### Core Governance Reward Pool (Draft)

> *"The total reward pool for the Core Governance Reward Primitive is 1% of the Net Revenue of Sky. Of this, 0.5% is paid to Integrators that maintain frontends that facilitate accessible governance, with the other 0.5% paid to the Prime Agents that manage the relationship with those Integrators."*

**Difference:**
- Distribution Reward: % of tracked balances
- Core Governance Reward: % of Net Revenue (split between two recipient types)

**Question:** Should there be separate rate sections?
- A.2.2.10.1.2.1.X - Integrator Reward Rate (0.5% of Net Revenue)
- A.2.2.10.1.2.1.X - Prime Agent Reward Rate (0.5% of Net Revenue)

---

## 5. Reward Codes Comparison

### Distribution Reward - Reward Codes (A.2.2.8.1.2.1.2)

Full section dedicated to:
- A.2.2.8.1.2.1.2.1 - General Reward Code Process
- A.2.2.8.1.2.1.2.2 - Tracking Methodologies
  - A.2.2.8.1.2.1.2.2.1 - Ethereum Mainnet General Tracking Methodology

**Reference from Skybase instance (A.6.1.1.4.2.5.1.2.1.1.2):**
> *"This Instance uses the Tracking Methodology specified in [A.2.2.8.1.2.1.2.2.1 - Ethereum Mainnet General Tracking Methodology]"*

### Core Governance Reward Draft

> *"The amount of SKY staked through each eligible frontend is tracked using Reward Codes. Eligible frontends pass a Reward Code identifying the Integrator and associated Prime Agent when users stake SKY. Each eligible Integrator is assigned a unique Reward Code by Operational GovOps..."*

**Gap:** No dedicated Reward Codes section. No Tracking Methodology defined.

**Recommendation:** Add:
- A.2.2.10.1.2.1.X - Reward Codes
  - A.2.2.10.1.2.1.X.1 - Reward Code Assignment Process
  - A.2.2.10.1.2.1.X.2 - Tracking Methodology for Staked SKY

---

## 6. Recipients / Integrator Lists

### Distribution Reward - Current Integrators (A.2.2.8.1.2.1.5.1)

**Type:** Active Data Controller

> *"Current Integrators are Integrators who have a Reward Code specified in an `Active` Instance of the Distribution Reward Primitive. The list of Current Integrators is defined as Active Data in [A.2.2.8.1.2.1.5.1.0.6.1 - List Of Current Integrators].*
>
> *The Active Data is updated as follows:*
> *• The Responsible Party is Operational GovOps.*
> *• The Update Process must follow the protocol for 'Direct Edit'."*

**Active Data child:** A.2.2.8.1.2.1.5.1.0.6.1 - List Of Current Integrators

### Core Governance Reward Draft

> *"The current eligible recipients for the Core Governance Reward Primitive are:*
> *- Launch Agent 3 (Skybase) - Skybase is eligible to receive the Core Governance Reward..."*

**Gap:** Not structured as Active Data. No Responsible Party. No Update Process.

**Recommendation:** Structure as:
```
A.2.2.10.1.2.1.X - Current Eligible Recipients (Active Data Controller)
├── content: "The current eligible recipients are defined as Active Data...
│   • Responsible Party: [Operational GovOps?]
│   • Update Process: Direct Edit"
└── active_data:
    └── A.2.2.10.1.2.1.X.0.6.1 - List Of Current Eligible Recipients
        └── content: "- Launch Agent 3 (Skybase)..."
```

---

## 7. Agent Artifact Structure

### Skybase Distribution Reward Implementation (A.6.1.1.4.2.5.1)

```
A.6.1.1.4.2.5.1 - Distribution Reward Primitive
├── A.6.1.1.4.2.5.1.1 - Primitive Hub Document
│   ├── A.6.1.1.4.2.5.1.1.1 - Global Activation Status: `Active`
│   ├── A.6.1.1.4.2.5.1.1.2 - Active Instances Directory
│   ├── A.6.1.1.4.2.5.1.1.3 - Completed Instances Directory
│   └── A.6.1.1.4.2.5.1.1.4 - In Progress Invocations Directory
├── A.6.1.1.4.2.5.1.2 - Active Instances
│   ├── A.6.1.1.4.2.5.1.2.1 - Sky.money App Instance
│   ├── A.6.1.1.4.2.5.1.2.2 - Sky.money Open Source Widgets Instance
│   ├── A.6.1.1.4.2.5.1.2.3 - Summer.fi Instance
│   ├── A.6.1.1.4.2.5.1.2.4 - DeFi Saver Instance
│   ├── A.6.1.1.4.2.5.1.2.5 - CoW Swap Instance
│   └── A.6.1.1.4.2.5.1.2.6 - ParaSwap Instance
├── A.6.1.1.4.2.5.1.3 - Completed Instances
└── A.6.1.1.4.2.5.1.4 - In Progress Invocations
```

### Instance Configuration Document Structure

**Reference:** A.6.1.1.4.2.5.1.2.1 - Sky.money App Instance Configuration Document

```
A.6.1.1.4.2.5.1.2.1 - Sky.money App Instance Configuration Document
└── A.6.1.1.4.2.5.1.2.1.1 - Parameters
    ├── A.6.1.1.4.2.5.1.2.1.1.1 - Reward Code: `1`
    ├── A.6.1.1.4.2.5.1.2.1.1.2 - Tracking Methodology
    └── A.6.1.1.4.2.5.1.2.1.1.3 - Custom Instance Parameters
```

### Required for Core Governance Reward

The draft mentions Reward Codes are stored in Agent Artifacts but doesn't define the structure.

**Proposed Skybase Core Governance Reward structure:**

```
A.6.1.1.4.2.10.1 - Core Governance Reward Primitive [NEW]
├── A.6.1.1.4.2.10.1.1 - Primitive Hub Document
│   ├── A.6.1.1.4.2.10.1.1.1 - Global Activation Status
│   └── A.6.1.1.4.2.10.1.1.2 - Active Instances Directory
├── A.6.1.1.4.2.10.1.2 - Active Instances
│   └── A.6.1.1.4.2.10.1.2.1 - Sky.money Instance Configuration Document
│       └── A.6.1.1.4.2.10.1.2.1.1 - Parameters
│           ├── Reward Code: `???`
│           ├── Frontend URL: https://sky.money/
│           ├── Role: Integrator and Prime Agent
│           └── Custom Instance Parameters
└── ...
```

**Question:** What parameters are needed per instance?
- Reward Code (required - matches Distribution Reward)
- Frontend URL (new - specific to governance frontends)
- Role (new - Integrator / Prime Agent / Both)
- Tracking Methodology (reference to primitive definition)

---

## 8. Reward Payment Comparison

### Distribution Reward Payment (A.2.2.8.1.2.1.4.2)

> *"The Distribution Reward payment for each month is equal to*
> *(1) the average balance over the month, times*
> *(2) the annual Distribution Reward Fee specified in [A.2.2.8.1.2.1.3 - Distribution Reward Rate], divided by*
> *(3) twelve (12)."*

### Core Governance Reward Draft

> *"Each distribution to Integrators is allocated pro rata between Integrators based on the percentage of SKY staked through eligible frontends maintained by each Integrator. Each distribution to Prime Agents is allocated pro rata between Prime Agents based on the percentage of SKY staked through eligible frontends maintained by Integrators managed by each Prime Agent."*

**Comparison:**

| Aspect | Distribution Reward | Core Governance Reward |
|--------|---------------------|------------------------|
| Basis | USDS/sUSDS balance | Staked SKY |
| Calculation | (avg balance × rate) / 12 | Pro rata of pool based on % staked |
| Pool source | Applied to balances | 1% of Net Revenue |
| Recipients | Integrators only | Integrators + Prime Agents (separate) |

---

## 9. Dual-Recipient Model

### Distribution Reward

Single recipient type: Integrators receive rewards directly.

### Core Governance Reward

Two recipient types with separate allocations:
- 0.5% of Net Revenue → Integrators
- 0.5% of Net Revenue → Prime Agents

**Draft states:**
> *"All distributions to a Prime Agent and Integrators managed by it are paid to the Prime Agent. The Prime Agent is then responsible for paying the portion due to each Integrator it manages."*

**Implication for Instance structure:**

Each instance may need to track:
1. The Integrator receiving 0.5%
2. The Prime Agent receiving 0.5% (may be same entity)

**Reference from draft:**
> *"A single entity may serve as both the Integrator operating a frontend and the Prime Agent managing the relationship with that Integrator, in which case such entity is eligible to receive both the Integrator and Prime Agent rewards for that frontend."*

---

## 10. Compliance Requirements

### Distribution Reward

No compliance requirements mentioned in primitive definition. Eligibility is based on having a valid Reward Code.

**Reference (A.2.2.8.1.2.1.1.1.2):**
> *"Compliance With Local Laws And Regulations As A Condition Precedent To Integrators Receiving Distribution Rewards"*

### Core Governance Reward Draft

Explicit compliance section:
```
Compliance Requirements
├── Security Standards (TBD)
└── Information Standards (TBD)
```

**Difference:** Core Governance Reward has explicit compliance requirements as a condition for eligibility, not just legal compliance.

---

## 11. Treasury Management Integration

### Distribution Reward Reimbursement (A.2.2.8.1.2.1.6)

Separate section for reimbursement with Active Data for amounts.

### Core Governance Reward Draft

References Treasury Management (A.2.5) for:
- Step 1 Capital allocation (22% total, including 0.5% + 0.5% for this primitive)
- Implementation with specific amounts and dates

**Gap:** No reimbursement process defined. No error handling for overpayment/underpayment.

---

## 12. Summary of Required Additions

### Structural (to match Distribution Reward pattern)

| Section | Why Needed | Reference |
|---------|------------|-----------|
| Introduction / Purpose | Standard primitive pattern | A.2.2.8.1.1, A.2.2.8.1.1.1 |
| Global Specification | Container for all base elements | A.2.2.8.1.2 |
| Base Elements | Organizes core parameters | A.2.2.8.1.2.1 |
| Reward Codes section | Define assignment and tracking | A.2.2.8.1.2.1.2 |
| Global Activation | How Prime Agents opt-in | A.2.2.8.1.2.2 |
| Instance Invocation Protocol | How to create instances | A.2.2.8.1.2.3 |
| Instance Management | Lifecycle management | A.2.2.8.1.2.4 |

### Content

| Element | Issue | Reference |
|---------|-------|-----------|
| Current Eligible Recipients | Should be Active Data | A.2.2.8.1.2.1.5.1 |
| Instance Configuration Document template | Not defined | A.6.1.1.4.2.5.1.2.1.1 |
| Tracking Methodology | Not defined | A.2.2.8.1.2.1.2.2 |
| Payment Errors | Not addressed | A.2.2.8.1.2.1.4.4 |
| Responsible Party for lists | Not specified | A.2.2.8.1.2.1.5.1 |

---

## 13. Questions for Draft Author

1. **Doc number:** Should this be A.2.2.10.1.X (under existing primitive) or A.2.4 (new location)?

2. **Active Data:** Should "Current Eligible Recipients" be Active Data with a Responsible Party?

3. **Reward Codes:** Are Core Governance Reward Codes separate from Distribution Reward Codes? (Skybase has Distribution Reward Code `1` for sky.money - what's the Core Governance Reward Code?)

4. **Tracking Methodology:** How exactly is staked SKY tracked per frontend? Is there a technical mechanism similar to Distribution Reward's tracking?

5. **Instance parameters:** What parameters belong in each Instance Configuration Document?

6. **Global Activation:** Does a Prime Agent need to "activate" this primitive before creating instances?

7. **Compliance verification:** Who verifies Security Standards and Information Standards? What's the process?

8. **Payment errors:** What happens if calculations are wrong? (Distribution Reward has explicit error handling at A.2.2.8.1.2.1.4.4)

9. **Boosted tier:** Is there a "Boosted Core Governance Reward Rate" like Distribution Reward has?

10. **Treasury Management:** The draft modifies Step 1 Capital allocation - is this a permanent change or transitionary?

---

## 14. Findings from Whitepaper Reference

### Naming Discrepancy

The whitepaper calls this **"Governance Access Reward"**, not "Core Governance Reward Primitive".

**Source:** `appendix-b-agent-primitives.md` line 519

### Recipient Model Discrepancy

**Whitepaper states:**
> "Recipient: Primes with compliant SKY Staking and governance frontends"
> "Distribution: Split among eligible Primes based on SKY staked through each frontend"

**Draft states:**
> "0.5% is paid to Integrators... with the other 0.5% paid to the Prime Agents that manage the relationship with those Integrators"

**Issue:** The whitepaper doesn't mention Integrators as separate recipients. It only mentions "Primes". The 0.5%/0.5% split between Integrators and Prime Agents appears to be a NEW concept not present in the whitepaper.

**Possible interpretations:**
1. The draft is expanding/clarifying the whitepaper design
2. The draft is introducing a change that needs governance approval
3. The whitepaper assumed Primes would handle Integrator payments internally (like Distribution Rewards: "No enforced split — each Star determines how to share with integrators")

### Distribution Rewards Comparison

The whitepaper says for Distribution Rewards:
> "Split: No enforced split — each Star determines how to share with integrators"

This suggests the Governance Access Reward may have been intended to work similarly - Primes receive the reward and decide how to share with their Integrators. The draft's 0.5%/0.5% enforced split is a departure from this pattern.

### Compliance Requirements

**Whitepaper:** "Requirements: Frontend meets Atlas and Synome specifications"

**Draft:**
- Security Standards (TBD)
- Information Standards (TBD)

The whitepaper references "Synome specifications" which is a specific technical framework not mentioned in the draft.

### Tiers

**Distribution Rewards has tiers (0-4)** with different rates based on branding and product structure.

**Governance Access Reward:** No tiers mentioned in whitepaper or draft. Single rate (1% of Net Revenue split by % SKY staked).

---

## 15. Recommendations Based on Whitepaper

### 1. Clarify Naming
- Is it "Governance Access Reward" (whitepaper) or "Core Governance Reward Primitive" (draft)?
- Suggest using whitepaper terminology for consistency

### 2. Justify the Integrator/Prime Agent Split
- The 0.5%/0.5% split is not in the whitepaper
- If this is an intentional design decision, document the rationale
- If following whitepaper, consider: "Primes receive reward and determine how to share with Integrators"

### 3. Reference Synome Specifications
- Whitepaper mentions "Atlas and Synome specifications" for compliance
- Draft only mentions "Security Standards" and "Information Standards"
- Add reference to Synome requirements or explain why omitted

### 4. Consider Tier Structure
- Distribution Rewards has 5 tiers (0-4) with different rates
- Should Governance Access Reward have tiers? (e.g., different rates for different levels of compliance or frontend quality?)

### 5. Structural Alignment with Distribution Reward Primitive
- Add Introduction / Purpose section
- Add Global Specification wrapper
- Add Global Activation process
- Add Instance Invocation Protocol
- Structure Current Eligible Recipients as Active Data

---

## 16. Summary Table: Whitepaper vs Draft vs Current Atlas

| Element | Whitepaper | Draft | Current Atlas (A.2.2.10.1) |
|---------|------------|-------|---------------------------|
| **Name** | Governance Access Reward | Core Governance Reward Primitive | Core Governance Reward Primitive |
| **Pool** | 1% of yearly net revenue | 1% of Net Revenue | Not specified |
| **Recipient** | Primes | Integrators + Prime Agents (split) | Prime Agents |
| **Split** | Not specified (implied: Prime decides) | 0.5% / 0.5% enforced | Not specified |
| **Distribution basis** | SKY staked through frontend | SKY staked through frontend | Not specified |
| **Compliance** | Atlas and Synome specs | Security + Info Standards (TBD) | Not specified |
| **Cadence** | Not specified | Monthly (Treasury Mgmt Function) | Not specified |
| **Tracking** | Not specified | Reward Codes | Not specified |
| **Structure** | Simple table | Detailed sections | Single paragraph |

---

## 17. Action Items for Draft Author

1. **Confirm naming:** "Governance Access Reward" vs "Core Governance Reward Primitive"

2. **Justify 0.5%/0.5% split:** Provide rationale for the Integrator/Prime Agent split that's not in the whitepaper

3. **Add Synome reference:** Whitepaper requires "Atlas and Synome specifications" - include or explain

4. **Add structural sections:**
   - Introduction / Purpose
   - Global Specification wrapper
   - Global Activation
   - Instance Invocation Protocol
   - Instance Management

5. **Structure Active Data:** Current Eligible Recipients should follow A.2.2.8.1.2.1.5.1 pattern

6. **Define Instance Configuration:** What parameters go in each Agent Artifact instance?

7. **Correct doc number:** Use A.2.2.10.1.X not A.2.4
