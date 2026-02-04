# Governance Access Reward - Calculation Guide

**Purpose:** Quick reference for how Governance Access Rewards are calculated and distributed.

---

## Source Documents

This guide synthesizes information from two sources that don't always agree:

### 1. Whitepaper - Laniakea Docs
#### File: appendix-b-agent-primitives.md

**Governance Access Reward definition (lines 519-530):**
> "Rewards for Primes providing compliant governance frontends."
> - Pool: 1% of Sky's yearly net revenue
> - Recipient: Primes with compliant SKY Staking and governance frontends
> - Distribution: Split among eligible Primes based on SKY staked through each frontend

### 2. Adam's GAR Draft

**File:** [[SH]Build Out Basic Informatoin For Core Governance Reward Primitive](https://www.notion.so/atlas-axis/SH-Build-Out-Basic-Information-For-Core-Governance-Reward-Primitive-2e8f2ff08d73802ba4e2f89870f79b3d)

**What it is:** A colleague's draft for adding the Core Governance Reward Primitive to the Atlas. This is a proposal that hasn't been approved yet. It adds operational details not present in the whitepaper.

**Key draft additions (not in whitepaper):**
- Monthly cadence
- 0.5%/0.5% split between Integrators and Prime Agents
- Explicit "pro rata" allocation language
- Reward Code tracking mechanism

---

## Overview

| Property | Value | Source |
|----------|-------|--------|
| **Pool** | 1% of Sky's yearly Net Revenue | Whitepaper Appendix B |
| **Recipient** | Primes with compliant governance frontends | Whitepaper Appendix B |
| **Basis** | Pro rata by SKY staked through each eligible frontend | **Whitepaper**: "Split among eligible Primes based on SKY staked" -- **Draft**: Pro Rata mechanism |
| **Cadence** | Monthly (as part of Treasury Management Function) | Draft only (not in whitepaper) |

---

## Formula

### Whitepaper Model (1% to Primes)

```
Monthly Reward Pool = (Yearly Net Revenue × 1%) ÷ 12

Prime's Share = Monthly Reward Pool × (SKY Staked via Prime's Frontend ÷ Total SKY Staked via All Eligible Frontends)
```

### Draft Model (0.5% + 0.5% Split)

The draft splits the 1% into two separate pools:

```
Integrator Pool = (Yearly Net Revenue × 0.5%) ÷ 12
Prime Agent Pool = (Yearly Net Revenue × 0.5%) ÷ 12

Integrator's Share = Integrator Pool × (SKY Staked via Integrator's Frontend ÷ Total SKY Staked)
Prime Agent's Share = Prime Agent Pool × (SKY Staked via Managed Frontends ÷ Total SKY Staked)
```

---

## Example Scenarios

### Assumptions

| Parameter | Value |
|-----------|-------|
| Sky Yearly Net Revenue | 600,000,000 USDS |
| Governance Access Reward Pool (1%) | 6,000,000 USDS/year |
| Monthly Pool (1%) | 500,000 USDS |
| Monthly Integrator Pool (0.5%) | 250,000 USDS |
| Monthly Prime Agent Pool (0.5%) | 250,000 USDS |
| Total SKY Staked via Eligible Frontends | 100,000,000 SKY |

### Scenario 1: Single Frontend (Skybase as Both Roles)

**Situation:** Skybase operates sky.money AND manages the relationship (both Integrator and Prime Agent). No other eligible frontends exist.

| Actor | SKY Staked | % | Integrator (0.5%) | Prime Agent (0.5%) | Total |
|-------|------------|---|-------------------|--------------------| ------|
| Skybase | 100M SKY | 100% | 250,000 USDS | 250,000 USDS | **500,000 USDS** |
| **Total** | 100M SKY | 100% | 250,000 USDS | 250,000 USDS | **500,000 USDS** |

**Result:** Skybase receives the full 1% because they hold both roles.

---

### Scenario 2: Two Competing Frontends (Both as Integrator + Prime Agent)

**Situation:** Skybase and Spark both operate frontends AND manage their own relationships.

| Actor | SKY Staked | % | Integrator (0.5%) | Prime Agent (0.5%) | Total |
|-------|------------|---|-------------------|--------------------| ------|
| Skybase | 60M SKY | 60% | 150,000 USDS | 150,000 USDS | **300,000 USDS** |
| Spark | 40M SKY | 40% | 100,000 USDS | 100,000 USDS | **200,000 USDS** |
| **Total** | 100M SKY | 100% | 250,000 USDS | 250,000 USDS | **500,000 USDS** |

**Result:** Rewards split pro rata. Each actor gets full share of both pools because they hold both roles.

---

### Scenario 3: Split Roles (Integrator ≠ Prime Agent)

**Situation:** Roles are separated between actors:
- **Skybase** operates sky.money (Integrator) AND manages its own relationship (Prime Agent)
- **Summer.fi** operates a separate frontend (Integrator), but **Skybase** manages that relationship (Prime Agent)

| Actor | SKY Staked | % | Integrator (0.5%) | Prime Agent (0.5%) | Total |
|-------|------------|---|-------------------|--------------------| ------|
| Skybase (sky.money) | 60M SKY | 60% | 150,000 USDS | 150,000 USDS | 300,000 USDS |
| Skybase (as Summer.fi's PM) | — | — | — | 100,000 USDS | 100,000 USDS |
| Summer.fi | 40M SKY | 40% | 100,000 USDS | — | 100,000 USDS |
| **Skybase Total** | — | — | 150,000 USDS | 250,000 USDS | **400,000 USDS** |
| **Summer.fi Total** | — | — | 100,000 USDS | — | **100,000 USDS** |
| **Grand Total** | 100M SKY | 100% | 250,000 USDS | 250,000 USDS | **500,000 USDS** |

**Key insight:**
- Skybase gets 150K as Integrator (60%) + 250K as Prime Agent (100% - manages both relationships) = **400K USDS**
- Summer.fi only gets 100K as Integrator (40%) because Skybase is their Prime Agent

---

## Treasury Management Impact

The draft proposes moving 1% from Step 4 Capital to Step 1 Capital:

| Allocation | Before | After |
|------------|--------|-------|
| Step 1 Capital | 21% | **22%** |
| Step 4 Capital | 79% | **78%** |

This is a reallocation within the Treasury Management Function, not new spending.

---

## Eligibility Requirements

To receive Governance Access Rewards, a frontend must:

1. **Compliance** - Meet Atlas and Synome specifications
2. **SKY Staking** - Provide compliant SKY staking functionality
3. **Governance Access** - Enable users to participate in Sky Governance
4. **Tracking** - Use Reward Codes to track staked SKY attribution

---

## References & Source Attribution

| Claim | Source |
|-------|--------|
| Pool = 1% of Net Revenue | Whitepaper |
| Recipient = Primes | Whitepaper |
| Basis = SKY staked through frontend | Whitepaper |
| Cadence = Monthly | Draft |
| Pro rata allocation | Draft |
| 0.5%/0.5% Integrator/Prime split | Draft |
| Step 1/Step 4 Capital reallocation | Draft |
