# Atlas Report: SkyLink and Keel for Bridging sUSDS

**Generated:** 2025-12-10
**Query:** "Atlas contains content about SkyLink and Keel for bridging sUSDS"

## Executive Summary

This report compiles all Atlas sections related to:

- **SkyLink** - Cross-chain bridging infrastructure
- **Keel** - Agent responsible for bridging operations
- **sUSDS** - Sky USD Savings token
- **Bridging** - Cross-chain token transfer operations

The goal is to provide comprehensive information to support teams working on bridging sUSDS across chains.

---

## Key Statistics

| Tag              | Node Count |
| ---------------- | ---------- |
| skylink          | 129        |
| keel             | 74         |
| susds            | 112        |
| bridging         | 77         |
| **Total Unique** | 349        |
| **Multi-tag**    | 40         |

---

## 🔥 High Priority Sections (Multiple Tags)

These sections are tagged with multiple relevant categories, indicating they are central to the bridging sUSDS topic.

### A.2.3.7.1: Token SkyLink Primitive

**Type:** Core | **Tags:** `skylink` `susds` `bridging` | **Source:** atlas

The Token SkyLink Primitive allows users to bridge USDS, sUSDS, SKY, or an Agent token to new blockchains and enables other multichain features.

---

### A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.2: Bridge USDS / sUSDS Using OP Token Bridge

**Type:** Core | **Tags:** `skylink` `susds` `bridging` | **Source:** atlas

This document defines the process for an operator to bridge USDS or sUSDS using the OP Token Bridge. This process will be specified in a future iteration of the Spark Artifact.

---

### A.6.1.1.1.2.6.1.2.2.1.2.2.2.4.2: Bridge USDS / sUSDS using OP Token Bridge

**Type:** Core | **Tags:** `skylink` `susds` `bridging` | **Source:** atlas

The documents herein define the process to bridge USDS / sUSDS using the OP Token Bridge. This process will be specified in a future iteration of the Spark Artifact.

---

### A.0.1.1.33: Skylink

**Type:** Core | **Tags:** `skylink` `susds` | **Source:** atlas

Skylink is the Sky Ecosystem’s multichain solution, connecting USDS, SKY and other Sky Ecosystem tokens from the Ethereum Mainnet to other chains and L2 protocols. Skylink will make all core Sky features available on the chains and L2s it is deployed to, including Native USDS; Native Sky Savings Rate; Native Token Rewards and Native 1:1 conversion between USDC and USDS.

---

### A.1.9.4.1.1: Introduction

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The Solana LayerZero Bridge consists of both a Token Bridge that allows bridging USDS between Ethereum Mainnet and Solana as well as a Governance Bridge that allows exercising governance control for Sky-issued tokens on Solana. The Solana LayerZero Bridge replaces the existing Wormhole bridge, which will be deactivated following the first phase of deployment of the LayerZero bridge.

The Solana LayerZero bridge serves as the template for future bridges that will be deployed by the Sky Ecosystem across other blockchains.

---

### A.1.9.4.1.3.1.2.3: Solana LayerZero Freezer Multisig Signers

**Type:** Core | **Tags:** `keel` `bridging` | **Source:** atlas

The signers of the Solana LayerZero Freezer Multisig are two (2) addresses controlled by Amatsu and two (2) addresses controlled by Keel.

---

### A.1.9.4.1.3.1.2.5: Solana LayerZero Freezer Multisig Modification

**Type:** Core | **Tags:** `keel` `bridging` | **Source:** atlas

• Amatsu and Keel can change the signers of the Solana LayerZero Freezer Multisig so long as:

    ◦ there are four (4) signers;

    ◦ two (2) signers are required to execute transactions; and

    ◦ an equal number of signers are controlled by Amatsu and Keel.

---

### A.1.9.4.1.3.3.1: Token Bridge

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The documents herein specify the selection and configuration of validators for the Token Bridge component of the Solana LayerZero Bridge.

---

### A.1.9.4.1.3.3.1.1: Validators

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The validators for the Token Bridge are LayerZero and Nethermind.

---

### A.1.9.4.1.3.3.1.2: Quorum Requirement

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The quorum requirement for the Token Bridge is 2/2.

---

### A.1.9.4.1.3.3.2.2: Quorum Requirement

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The quorum requirement for the Token Bridge is 4/7.

---

### A.2.3.1.3.2.1: Active Instance Status

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The instance Status of `Active` indicates that an instance of a Primitive is fully operational and may be used for its intended purpose by the Agent and potentially other parties. For example, a Token SkyLink deployment is active and can be used to bridge tokens between blockchains.

---

### A.2.3.7.1.1.1.1.1: Token SkyLink Setup Target Chain Identification And Feasibility Analysis

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The Prime Agent researches potential target blockchains for token bridging, including evaluation of user base, DeFi ecosystem, and bridging security requirements. The Prime Agent confirms that the target chain supports LayerZero or can be integrated easily with the LayerZero Omnichain Fungible Token standard. The Prime Agent also estimates potential use of the token on the target chain to justify the bridge deployment and audit costs. The output of this step is a preliminary decision to proceed with deploying a bridge to the target chain including a scope of work for the bridge deployment and estimated audit costs.

---

### A.2.3.7.1.1.1.1.2: Token SkyLink Setup Initial Alignment With Operational GovOps

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The Prime Agent presents the bridging plan to Operational GovOps, including a technical summary, proposed timeline, and estimate of audit costs. The Prime Agent and Operational GovOps also discuss any guidelines in the Atlas or the Agent Artifact that may affect bridging. The Prime Agent receives early feedback on the plan and modifies it accordingly. The output of this step is an informal agreement to proceed with developing a bridge deployment along with any documented conditions or feedback from Operational GovOps.

---

### A.2.3.7.1.1.1.1.3: Token SkyLink Setup Audit Preparation And Proposal Of Costs

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The Prime Agent contacts a reputable third-party security audit firm for reviewing the bridge implementation. The Prime Agent negotiates audit scope, timeline, and fees with the audit firm. The Prime Agent documents the projected cost for the bridge, including development, audit, and deployment costs, for future reimbursement. The outcome of this step is a formal agreement with the audit firm and a detailed cost breakdown for bridge deployment and auditing.

---

### A.2.3.7.1.1.1.3.1: Token SkyLink Setup Bridge Deployment And Initial Audit

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The Prime Agent, through Operational GovOps, deploys the Token SkyLink contract on the target chain. The Prime Agent shares the Token SkyLink contract’s final address with the audit firm for verification. Operational GovOps confirms that the bridge contract address and references match the updated Prime Agent Artifact. The audit firm completes and updates the bridging audit registry with the results of the audit. The output of this step is a deployed bridge contract with audit results uploaded to the bridging audit registry.

---

### A.2.3.7.1.1.1.3.2: Token SkyLink Setup Activation On New Chain

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

Core GovOps formalizes the audit results with a Sky Core Executive Vote to fully activate bridging functionality. Operational GovOps updates the Prime Agent Reimbursement Module to begin counting any bridged tokens toward the incremental reward. The output of this step is fully enabled bridging on the target chain with the Prime Agent Reimbursement Module updated to track bridging based rewards.

---

### A.2.3.7.1.1.2.1: Token SkyLink Management Settlement Cycle

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

During each settlement cycle, the Prime Agent Reimbursement Module tallies the total token bridging volume on the new chain. The Prime Agent Reimbursement Module calculates the reimbursement due for bridge development costs as a percent of the token bridging volume, in addition to normal Distribution Rewards if applicable. Core GovOps executes a payment to the Prime Agent for the amount due for reimbursement of bridge development costs, to the extent that such costs have not already been fully reimbursed. Core GovOps updates the Powerhouse system to reflect the amount of bridge development costs that have been reimbursed.

---

### A.2.3.7.1.2.2: List of Active Token SkyLink Deployments

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The Token SkyLink Primitive must list each active Token SkyLink deployment. The listing must include the following information: (1), the token being bridged, (2) the target chain of the bridge, (3) the address of the bridge contract on the Ethereum Mainnet, (4) the address of the bridge contract on the target chain, (5) the audit of the bridge contract, (6) the bridge parameters, (7) the total bridge deployment and audit costs, and (8) the amount of bridge deployment and audit costs that have been reimbursed to date.

---

### A.2.3.8.3.1.3: Pioneer Prime Benefits

**Type:** Core | **Tags:** `susds` `bridging` | **Source:** atlas

Pioneer Primes gain benefits and responsibilities related to the general adoption of USDS on the Pioneer Chain, and this benefit comes in two forms.

First, during the Pioneer Phase, the Pioneer Prime counts as having tagged, for the purposes of calculating the Accessibility Reward, all USDS and sUSDS accounts and balances on the Pioneer Chain that have not been tagged by another Prime. At the end of the Pioneer Phase, all untagged USDS accounts and balances are one-time tagged by the Pioneer Prime, and this tag will remain normally for the following ten (10) years unless tagged by a different Prime, or retagged.

Second, during the Pioneer Phase, all Unrewarded USDS bridged to the Pioneer Chain counts towards Pioneer Incentive payments, see [A.2.3.8.3.1.4 - Pioneer Incentive Pool](04edac33-19d5-4a87-a8ab-945a0cd57771).

---

### A.2.3.9.1.1.3.2.1.2.2: Minimum Capabilities of Prime TRC Management Systems

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

A Prime Agent’s internal TRC management system should possess the following capabilities to meet the objectives outlined in [A.2.3.9.1.1.3.2.1.2.1 - Objective of Prime TRC Management](9a8120c4-0a5b-426f-97a5-283c708413f5).

1. Prime Agents’ internal TRC management systems should enable compliant sourcing and tracking of all TRC components, including Internal Junior Risk Capital (IJRC), Prime-External Junior Risk Capital (SEJRC), Tokenized External Junior Risk Capital (TEJRC), and Originated Senior Risk Capital (OSRC). Compliance in this context includes strict adherence to eligibility criteria and capital-sourcing ratios (e.g., External Per Internal, Senior Per Junior) as defined in the Atlas. See [A.3.2.1.2.3 - Total Risk Capital Sourcing Ratios](9e99b084-f15a-4f60-b831-d6c0bd9aec04).

The system must provide real-time or near real-time tracking of all held Total Risk Capital (TRC) components. This includes, for each TRC component:
◦ Accurate valuation of the assets comprising each component.
◦ Clear identification of the source of each component (e.g., Prime’s own SubProxy for IJRC, specific Ecosystem Accord references for rented SEJRC or OSRC, TEJRC encumbrance details, OSRC origination details).
◦ Verification of each TRC component’s eligibility status according to Atlas rules. This includes tracking whether capital is “enabled” or “active” for RRC coverage purposes (e.g., based on Ecosystem Accord status, compliance with sourcing ratios, etc.).
◦ Distinction between capital directly held by the Prime Agent and capital that is encumbered (e.g., SEJRC where the lending Prime retains custody but the capital is contractually committed).

2. Prime Agents’ internal TRC management systems should enable dynamic-state accounting. The system must account for TRC components that are in dynamic, pending, or off-chain states, as these can impact the true risk capital available to a Prime Agent. This includes:
   ◦ Pending transactions such as SEJRC or OSRC rental Ecosystem Accords that have been committed to by the parties, but not yet codified in the Atlas.
   ◦ Capital in transit, e.g., assets that are committed to be IJRC, but currently moving between chains via bridges or locked in Cross-Chain Transfer Protocol (CCTP) messages awaiting finality.
   ◦ Operational expenditures funded by TRC components (typically IJRC), such as blockchain transaction fees, oracle service fees, audit costs, and other operational overhead that reduces available risk capital. The system should track these expenditures in real-time or near real-time.
   ◦ Any off-chain factors that could impair the immediate deployability or availability of TRC components.
3. Prime Agents’ internal TRC management systems should enable continuous capital adequacy monitoring. The system must enable the near real-time comparison of the Prime Agent’s internally tracked and calculated TRC against its official Aggregate RRC, as obtained from the Sky Core RRC Dashboard/API. See [A.2.3.9.1.1.3.2.1.1 - Sky Core Required Risk Capital (RRC) Dashboard And API](4eac2c9e-2718-4881-a3f1-ed10fb3f4d13). This core functionality is essential for the Prime Agent to proactively monitor its capital adequacy, identify potential or actual TRC shortfalls, and make timely operational and capital management decisions to maintain compliance.
4. Prime Agents’ internal TRC management systems should define a RRC-incident (e.g., TRC shortfall) response protocol. The system should enable internal alerting mechanisms that detect when a Prime Agent’s TRC approaches predefined internal buffer thresholds relative to its Aggregate RRC. See [A.3.2.2.7.2.1.1.1 - Encumbrance Ratio](5435f680-aaaa-461a-bcae-4056bb8964d9). The system should also detect an actual shortfall where the Prime Agent’s held TRC falls below its Aggregate RRC.
   Furthermore, Prime Agent teams should establish and document internal processes for responding to such alerts. Such internal processes should include: 1) internal escalation and assessment of the shortfall’s cause and magnitude; 2) formulation of potential responses or corrective actions, which may include sourcing additional TRC, reducing risk-weighted exposures, or other measures; 3) internal decision-making framework for the evaluation of potential responses and selection of the most appropriate one; and 4) notifying any pertinent parties (Operational GovOps) as needed for the purpose of planning or implementing follow-up action.

Prime Agent teams’ internal decision-making framework may consider the economic trade-offs of various actions, including the strategic acceptance of penalties for a TRC shortfall where such an approach is determined to be economically advantageous compared to immediate rebalancing (e.g., avoiding excessive transaction costs or market impact).

---

### A.2.9.2.3.2.2: Pre-Pioneer Incentive Pool

**Type:** Core | **Tags:** `keel` `susds` | **Source:** atlas

Keel is eligible for a Pre-Pioneer Incentive Pool. See [A.2.3.8.3.1.4.1 - Pre-Pioneer Incentive Pool](15e14f25-8d56-4699-ac37-0cef4f0503c5).

The Pre-Pioneer Incentive Pool is calculated on a monthly basis as (1) the Sky Savings Rate multiplied by all USDS balances on Solana, less (2) all Integration Boost payments made to partners on Solana.
Payments are made on a monthly basis from the Integration Boost wallets specified in [A.2.3.8.2.2.1.3.2.1 - Near Term Process](4ab621b4-ef8e-4b01-a6aa-9296601033c5) to a Pre-Pioneer Incentive Pool wallet controlled by Keel’s Operational Executor Agent. The address of the Pre-Pioneer Incentive Pool wallet on Solana is `8JmDPG5BFQ6gpUPJV9xBixYJLqTKCSNotkXksTmNsQfj`.

Funds from the Pre-Pioneer Incentive Pool wallet may be used to incentivize partners on Solana to promote USDS adoption as directed by Keel. Funds from the Pre-Pioneer Incentive Pool may not be transferred to Keel’s SubProxy Account, Keel Foundation, or Matariki Labs.

---

### A.4.2.1: Multichain Support Native Mechanisms

**Type:** Section | **Tags:** `skylink` `susds` | **Source:** atlas

SkyLink deployments support features including the Savings Rate Mechanism (including sUSDS), the Token Rewards Mechanism and the SKY Staking Mechanism.

---

### A.6.1.1.1.2.6.1.2.1.1.3.1.4.1: USDC Mainnet ALM Proxy Circle Cross-Chain Transfer Protocol Maximum

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The maximum amount of USDC that can be bridged to Ethereum Mainnet ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_ETH`) is specified in the document herein.
• `maxAmount` (USDC): 200,000,000
• `slope` (USDC/ day): 500,000,000

---

### A.6.1.1.1.2.6.1.2.1.1.3.2.7.1: USDC Base ALM Proxy Circle Cross-Chain Transfer Protocol Maximum

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The maximum amount of USDC that can be bridged to Base ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_BASE`) is specified in the document herein.
• `maxAmount` (USDC): 200,000,000
• `slope` (USDC/ day): 500,000,000

---

### A.6.1.1.1.2.6.1.2.1.1.3.6.3.1: USDC Avalanche ALM Proxy Circle Cross-Chain Transfer Protocol Maximum

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The maximum amount of USDC that can be bridged to Avalanche ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_AVALANCHE`) is specified in the document herein.
• `maxAmount` (USDC): 100,000,000
• `slope` (USDC/ day): 50,000,000

---

### A.6.1.1.1.2.6.1.2.2.1.2: Controller Functions

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The documents herein describe the purpose and operational use of key functions within SLL `MainnetController` and `ForeignController` contracts: USDS management (mint/burn USDS), Asset Transfer Management (direct transfers, protocol deposits/withdrawals), Cross-chain Operations (CCTP bridging).

---

### A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.1: Bridge USDC Using Circle Cross-Chain Transfer Protocol

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The documents herein define the process to bridge USDC using the Circle Cross-Chain Transfer Protocol.

---

### A.6.1.1.1.2.6.1.2.2.1.2.2.2.4.1: Bridge USDC Using Circle Cross-Chain Transfer Protocol

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

This document defines the process to bridge USDC using the Circle Cross-Chain Transfer Protocol. The process for bridging USDC using CCTP through the `ForeignController` contract is the same as the one for bridging USDC using CCTP through the `MainnetController` contract; see [A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.1 - Bridge USDC Using Circle Cross-Chain Transfer Protocol](956f0941-5121-4dce-99d8-2fd1af00ffa6).

---

### A.6.1.1.1.2.6.1.2.2.3.3.1: USDC Bridging Action

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

In order to bridge USDC, the operator must execute the following action:

`foreignController.transferUSDCToCCTP(usdc.balanceOf(address(proxy)), 0);
`
For more detailed instructions on the code to execute this, see [A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.1 - Bridge USDC Using Circle Cross-Chain Transfer Protocol](956f0941-5121-4dce-99d8-2fd1af00ffa6).

---

### A.6.1.1.1.2.6.1.2.2.3.3.2: USDS and sUSDS Bridging Action

**Type:** Core | **Tags:** `susds` `bridging` | **Source:** atlas

The function to brigde USDS and sUSDS is currently actioned by an Executive Vote by Sky Governance. This process will be managed by the operator of the SLL in the future.

---

### A.6.1.1.2.2.6.1.2.1.1.3.1.5: USDC Mainnet ALM Proxy Circle Cross-Chain Transfer Protocol Maximum

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The maximum amount of USDC that can be bridged to Ethereum Mainnet ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_ETH`) is specified in the document herein.
• `maxAmount` (USDC): max
• `slope` (USDC/ day): 0

---

### A.6.1.1.2.2.6.1.2.1.1.3.2.2: USDC Avalanche ALM Proxy Circle Cross-Chain Transfer Protocol Maximum

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The maximum amount of USDC that can be bridged to Avalanche ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_Avalanche`) is specified in the document herein.
• `maxAmount` (USDC): 50,000,000
• `slope` (USDC/ day): 50,000,000

---

### A.6.1.1.2.2.6.1.2.1.1.3.2.3: USDC Ethereum Mainnet ALM Proxy Circle Cross-Chain Transfer Protocol Maximum

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The maximum amount of USDC that can be bridged to Ethereum Mainnet from the Avalanche ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_Ethereum`) is specified in the document herein.
• `maxAmount` (USDC): 50,000,000
• `slope` (USDC/ day): 50,000,000

---

### A.6.1.1.2.2.6.1.2.1.1.3.3.2: USDC Base ALM Proxy Circle Cross-Chain Transfer Protocol Maximum

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The maximum amount of USDC that can be bridged to Base ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_Base`) is specified in the document herein.

• `maxAmount`: 50,000,000 USDC
• `slope`: 50,000,000 USDC per day

---

### A.6.1.1.2.2.6.1.2.1.1.3.3.3: USDC Base ALM Proxy Circle Cross-Chain Transfer Protocol Maximum

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The maximum amount of USDC that can be bridged to Ethereum Mainnet from the Base ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_Ethereum`) is specified in the document herein.

• `maxAmount`: 50,000,000 USDC
• `slope`: 50,000,000 USDC per day

---

### A.6.1.1.2.2.6.1.2.2.1.2: Controller Functions

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The documents herein describe the purpose and operational use of key functions within the Grove Liquidity Layer `MainnetController` contracts: USDS management (mint/burn USDS), Asset Transfer Management (direct transfers, protocol deposits/withdrawals), Cross-chain Operations (CCTP bridging).

---

### A.6.1.1.3.1: Introduction

**Type:** Core | **Tags:** `keel` `susds` | **Source:** atlas

Keel is an Agent dedicated to expanding access to USDS, sUSDS, and other Sky benefits with an initial focus on the Solana ecosystem. Keel leverages strategic incentives and partnerships to foster adoption, deliver the Sky Savings Rate, and bring USDS liquidity to new markets. Keel also identifies and executes allocation opportunities to generate excess returns on assets in Sky’s collateral portfolio. Keel plans to develop a user-facing DeFi hub as well as other products that align naturally with Keel’s existing capabilities, including borrowing and lending solutions.

---

### A.6.1.1.5.2.6.1.2.1.1.3.1.3.1.1: USDC ALM Proxy Circle Cross-Chain Transfer Protocol Maximum

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The maximum amount of USDC that can be bridged to Ethereum Mainnet ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_ETH`) is specified in the document herein.

• `maxAmount`: This parameter will be specified in a future iteration of the Launch Agent 4 Artifact.
• `slope`: This parameter will be specified in a future iteration of the Launch Agent 4 Artifact.

---

### A.6.1.1.5.2.6.1.2.2.1.2: Controller Functions

**Type:** Core | **Tags:** `skylink` `bridging` | **Source:** atlas

The documents herein describe the purpose and operational use of key functions within the Launch Agent 4 Liquidity Layer `MainnetController` contracts: USDS management (mint/burn USDS), Asset Transfer Management (direct transfers, protocol deposits/withdrawals), Cross-chain Operations (CCTP bridging).

---

## Sections by Category

### SkyLink (83 sections)

> SkyLink bridging infrastructure and multichain token transfers

#### A.2.3.1.3.1: Primitive Instance Status Definition

**Type:** Core | **Source:** atlas

Each valid Invocation of a Primitive causes the Agent Artifact to be updated with a specific instance of a Primitive. For example, each Invocation of the Token SkyLink Primitive launches a SkyLink deployment to a specific blockchain. The Agent may manage each Primitive instance independently (e.g., Activate or suspend it as circumstances change). A Primitive instance thus has its own Status or life cycle that is independent of the Primitive’s Global Activation Status.

---

#### A.2.3.1.5.1: Current Primitives

**Type:** Core | **Source:** atlas

The current Sky Primitives are:

• Genesis Primitives
◦ Agent Creation Primitive
◦ Prime Transformation Primitive
◦ Executor Transformation Primitive
◦ Agent Token Primitive

• Operational Primitives
◦ Executor Accord Primitive
◦ Root Edit Primitive
◦ Light Agent Primitive

• Ecosystem Upkeep Primitives
◦ Distribution Requirement Primitive
◦ Market Cap Fee Primitive
◦ Upkeep Rebate Primitive

• SkyLink Primitives
◦ Token SkyLink Primitive

• Demand Side Stablecoin Primitives
◦ Distribution Reward Primitive
◦ Integration Boost Primitive
◦ Pioneer Chain Primitive

• Supply Side Stablecoin Primitives
◦ Allocation System Primitive
◦ Junior Risk Capital Rental Primitive
◦ Asset Liability Management Rental Primitive

• Core Governance Primitives
◦ Core Governance Reward Primitive

---

#### A.2.3.7: SkyLink Primitives

**Type:** Section | **Source:** atlas

SkyLink Primitives are Sky Primitives that are technical infrastructure that extends the Sky Protocol. SkyLink Primitives are built autonomously by Prime Agents, but owned by Sky Core and shared among all Prime Agents. Prime Agents are reimbursed for the cost of setting up SkyLink Primitives and given additional first-mover incentives.

---

#### A.2.3.7.1.1: Token SkyLink Process Definition

**Type:** Core | **Source:** atlas

The documents herein define the Process Definition for initial setup and ongoing management of the Token SkyLink Primitive.

---

#### A.2.3.7.1.1.1: Token SkyLink Setup Process Definition

**Type:** Core | **Source:** atlas

The documents herein define the process for setting up an Instance of the Token SkyLink Primitive.

---

#### A.2.3.7.1.1.1.1: Token SkyLink Setup Real World Agreements And Planning

**Type:** Core | **Source:** atlas

The documents herein define the preliminary, off-chain human coordination stage of setting up an Instance of the Token SkyLink Primitive.

---

#### A.2.3.7.1.1.1.2: Token SkyLink Setup Codification and Validation

**Type:** Core | **Source:** atlas

The documents herein define how agreements to setup an Instance of the Token SkyLink Primitive are codified and validated in the Powerhouse system and how governance votes happen.

---

#### A.2.3.7.1.1.1.2.1: Agent Inputs

**Type:** Core | **Source:** atlas

The Prime Agent drafts an update to the Prime Agent Artifact adding the Token SkyLink to the list of active Token SkyLink deployments and including the information specified in [A.2.3.7.1.2.2 - List of Active Token SkyLink Deployments](bf3ede73-bba3-4048-b105-a49400611fcb). The Prime Agent submits the draft to the Powerhouse system. The output of this step is a draft Prime Agent Artifact update in the Powerhouse system.

---

#### A.2.3.7.1.1.1.2.3: Official Update of Artifact

**Type:** Core | **Source:** atlas

If the Token SkyLink Invocation is successfully approved, the Operational Executor Facilitator finalizes and publishes the update to the Prime Agent Artifact, making it effective in the Atlas. The output of this step is an updated Prime Agent Artifact with the Token SkyLink Instance Activated.

---

#### A.2.3.7.1.1.1.3: Token SkyLink Setup Deployment

**Type:** Core | **Source:** atlas

The documents herein define how the deployment of an Instance of the Token SkyLink Primitive is executed on-chain.

---

#### A.2.3.7.1.1.2: Token SkyLink Ongoing Management

**Type:** Core | **Source:** atlas

The documents herein define the process for managing an Instance of the Token SkyLink Primitive.

---

#### A.2.3.7.1.2: Token SkyLink Input Requirements

**Type:** Core | **Source:** atlas

The documents herein define the required inputs for a valid Token SkyLink Primitive. If any input is noncompliant or omitted, the Primitive will be invalidated and the SkyLink deployment will not move forward.

---

#### A.2.3.7.1.2.1: Token SkyLink Activation Status

**Type:** Core | **Source:** atlas

The Token SkyLink Primitive must be Globally Activated.

---

#### A.2.4.1.2.1.3.4: Reimbursement Rewards

**Type:** Core | **Source:** atlas

Reimbursement Rewards are paid to Prime Agents to reimburse them for the costs of building common infrastructure used by the entire Sky Ecosystem, such as Token SkyLink deployments.

---

#### A.2.9.2.1.2.4.1: DeFi Opportunities Right of First Refusal Duration

**Type:** Core | **Source:** atlas

Grove provides the Spark Agent a right of first refusal for pursuing cross-chain bootstrapping opportunities, which lasts four weeks after notification by Grove. If Spark does not wish to deploy SparkLend or provide capital to the protocol in question, Grove retains the right to pursue the opportunity pending security and risk assessments of the target protocol. Upon written notification from Grove of a new DeFi opportunity via a communications channel mutually agreed by the parties, Spark has four weeks to decide whether it wants to deploy SparkLend or lend to the target chain and protocol. If Spark opts not to do so by the end of the four-week period, Grove is permitted to pursue the opportunity.

_Example:\_\_ A lending protocol (i.e. Aave, Euler, Morpho, etc) plans on deploying on blockchain X. Grove provides written notification to Spark about the potential new deployment. Spark evaluates the opportunity and decides there are better opportunities to pursue. The opportunity reverts to Grove after Spark’s refusal; or, if Spark does not issue a formal refusal, the opportunity reverts to Grove after four weeks._

---

#### A.2.9.2.1.2.4.2: DeFi Opportunities Complementary Deployments

**Type:** Core | **Source:** atlas

Grove and Spark may combine efforts if there is a large enough cross-chain opportunity. For example, Grove may deploy stablecoin liquidity on a target chain and Spark may deploy a SparkLend instance. In this case, complementary efforts are made to mutually benefit the cross-chain deployment, with significant economic benefits received by both parties. This chain would also serve as a new distribution channel for Spark, Grove, and Sky products.

---

#### A.4.2: SkyLink

**Type:** Article | **Source:** atlas

SkyLink is a multichain system that enables native crosschain transfer of Sky Ecosystem-related tokens to other blockchains, including Ethereum L2s and major L1s.

---

#### A.4.4.1: SKY Staking

**Type:** Section | **Source:** atlas

SKY holders can stake their tokens via the SKY Staking Mechanism available on Ethereum Mainnet and SkyLink Deployments. SKY stakers earn voting rewards sourced from the Sky Treasury Management Function. In lieu of USDS rewards and SKY rewards, SKY stakers can choose to earn Agent Token Rewards, including SPK and the tokens of other Prime Agents incubated by Sky. SKY stakers can also borrow USDS against their staked collateral using the SKY-backed borrowing mechanism defined herein.

---

#### A.6.1.1.1.2.4: SkyLink Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the SkyLink Primitives for Spark. See [A.2.3.7 - SkyLink Primitives](7b5d8965-a64c-4c44-b742-607f51f69d8f).

---

#### A.6.1.1.1.2.4.1: Token SkyLink Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Spark’s instances of the Token SkyLink Primitive. See [A.2.3.7.1 - Token SkyLink Primitive](4504d2d4-ee45-4a07-8c5b-9baf20b12e76).

---

#### A.6.1.1.1.2.4.1.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Spark’s usage of the Token SkyLink Primitive.

---

#### A.6.1.1.1.2.4.1.1.2: Active Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Active`.

---

#### A.6.1.1.1.2.4.1.1.3: Completed Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Completed`.

---

#### A.6.1.1.1.2.4.1.1.4: In Progress Invocations Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all prospective Instances of the Token SkyLink Primitive whose Invocation is currently in progress. Invocations that are completed successfully are moved to [A.6.1.1.1.2.4.1.1.2 - Active Instances Directory](144380dc-5a6c-48e1-9004-12e0ca96ed10), whereas failed Invocations are Archived in [A.6.1.1.1.2.4.1.1.5 - Hub Data Repository](f2c09f57-213c-4157-b336-949924d2aa26).

---

#### A.6.1.1.1.2.4.1.1.5.1: Archived Invocations/Instances

**Type:** Core | **Source:** atlas

The subtrees for archived Invocations and Instances of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.1.2.4.1.1.5.1.1: Failed Invocations

**Type:** Core | **Source:** atlas

The subtrees for failed Invocations of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.1.2.4.1.1.5.1.2: Suspended Instances

**Type:** Core | **Source:** atlas

The subtrees for Instances of the Token SkyLink Primitive with `Suspended` Status are stored here.

---

#### A.6.1.1.1.2.4.1.2: Active Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Active` Status are stored herein.

---

#### A.6.1.1.1.2.4.1.3: Completed Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Completed` Status are stored herein.

---

#### A.6.1.1.1.2.4.1.4: In Progress Invocations

**Type:** Core | **Source:** atlas

The in progress Invocations of the Token SkyLink Primitive are contained herein. Once an Invocation is successfully completed, its subtree will be moved to [A.6.1.1.1.2.4.1.2 - Active Instances](02016186-2953-489d-ae5d-aca30085c2b9).

---

#### A.6.1.1.1.2.6.1.2.2.1.2.1.1.1: Set The Mint Recipient

**Type:** Core | **Source:** atlas

The documents herein define the process to set the `mintRecipient` for a specific `destinationDomain`. This is used in cross-chain transfers to specify the address that will receive minted tokens on the target chain.

---

#### A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.1.5: Approve Contract Spend

**Type:** Core | **Source:** atlas

The operator must approve the CCTP to spend USDC on behalf of the `proxy`. This action is necessary for the CCTP contract to initiate the cross-chain transfer.

`proxy.doCall(
    address(usdc),
    abi.encodeCall(usdc.approve, (address(cctp), usdcAmount))
);`

---

#### A.6.1.1.1.2.6.1.2.2.1.2.2: Foreign Controller Contract Functions

**Type:** Core | **Source:** atlas

The documents herein define the functions controlled by the Controller contract for Spark Liquidity Layer cross-chain operations on a destination blockchain.

---

#### A.6.1.1.1.2.6.1.2.2.1.2.2.1.1: Set The Mint Recipient

**Type:** Core | **Source:** atlas

The documents herein define the process for an operator to set a `mintRecipient` for a specific `destinationDomain`. This is used in cross-chain transfers to specify the address that will receive minted tokens on the target chain.

---

#### A.6.1.1.2.2.4: SkyLink Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the SkyLink Primitives for Grove. See [A.2.3.7 - SkyLink Primitives](7b5d8965-a64c-4c44-b742-607f51f69d8f).

---

#### A.6.1.1.2.2.4.1: Token SkyLink Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Grove’s Instances of the Token SkyLink Primitive. See [A.2.3.7.1 - Token SkyLink Primitive](4504d2d4-ee45-4a07-8c5b-9baf20b12e76).

---

#### A.6.1.1.2.2.4.1.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Grove’s usage of the Token SkyLink Primitive.

---

#### A.6.1.1.2.2.4.1.1.2: Active Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Active`.

---

#### A.6.1.1.2.2.4.1.1.3: Completed Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Completed`.

---

#### A.6.1.1.2.2.4.1.1.4: In Progress Invocations Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all prospective Instances of the Token SkyLink Primitive whose Invocation is currently in progress. Invocations that are completed successfully are moved to [A.6.1.1.2.2.4.1.1.2 - Active Instances Directory](09e7789c-4644-4a12-aef9-72d86cc488f2), whereas failed Invocations are Archived in [A.6.1.1.2.2.4.1.1.5 - Hub Data Repository](7afcf75e-ab7c-4e1e-b856-cab87541d1e3).

---

#### A.6.1.1.2.2.4.1.1.5.1: Archived Invocations/Instances

**Type:** Core | **Source:** atlas

The subtrees for archived Invocations and Instances of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.2.2.4.1.1.5.1.1: Failed Invocations

**Type:** Core | **Source:** atlas

The subtrees for failed Invocations of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.2.2.4.1.1.5.1.2: Suspended Instances

**Type:** Core | **Source:** atlas

The subtrees for Instances of the Token SkyLink Primitive with `Suspended` Status are stored here.

---

#### A.6.1.1.2.2.4.1.2: Active Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Active` Status are stored herein.

---

#### A.6.1.1.2.2.4.1.3: Completed Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Completed` Status are stored herein.

---

#### A.6.1.1.2.2.4.1.4: In Progress Invocations

**Type:** Core | **Source:** atlas

The in progress Invocations of the Token SkyLink Primitive are contained herein. Once an Invocation is successfully completed, its subtree will be moved to [A.6.1.1.2.2.4.1.2 - Active Instances](da5c971b-7758-486d-bddb-fba2e1b5cdc5).

---

#### A.6.1.1.2.2.6.1.2.2.1.2.1.1.1: Set The Mint Recipient

**Type:** Core | **Source:** atlas

The documents herein define the process to set the `mintRecipient` for a specific `destinationDomain`. This is used in cross-chain transfers to specify the address that will receive minted tokens on the target chain.

---

#### A.6.1.1.3.2.4: SkyLink Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the SkyLink Primitives for Launch Agent 2. See [A.2.3.7 - SkyLink Primitives](7b5d8965-a64c-4c44-b742-607f51f69d8f).

---

#### A.6.1.1.3.2.4.1: Token SkyLink Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Launch Agent 2’s Instances of the Token SkyLink Primitive. See [A.2.3.7.1 - Token SkyLink Primitive](4504d2d4-ee45-4a07-8c5b-9baf20b12e76).

---

#### A.6.1.1.3.2.4.1.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Launch Agent 2’s usage of the Token SkyLink Primitive.

---

#### A.6.1.1.3.2.4.1.1.2: Active Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Active`.

---

#### A.6.1.1.3.2.4.1.1.3: Completed Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Completed`.

---

#### A.6.1.1.3.2.4.1.1.4: In Progress Invocations Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all prospective Instances of the Token SkyLink Primitive whose Invocation is currently in progress. Invocations that are completed successfully are moved to [A.6.1.1.3.2.4.1.2 - Active Instances](38756877-b767-4a71-9f38-630a96b50f5a), whereas failed Invocations are Archived in [A.6.1.1.3.2.4.1.1.5 - Hub Data Repository](99d73511-9bec-4479-a451-8196ce3ea877).

---

#### A.6.1.1.3.2.4.1.1.5.1: Archived Invocations/Instances

**Type:** Core | **Source:** atlas

The subtrees for archived Invocations and Instances of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.3.2.4.1.1.5.1.1: Failed Invocations

**Type:** Core | **Source:** atlas

The subtrees for failed Invocations of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.3.2.4.1.1.5.1.2: Suspended Instances

**Type:** Core | **Source:** atlas

The subtrees for Instances of the Token SkyLink Primitive with `Suspended` Status are stored here.

---

#### A.6.1.1.3.2.4.1.2: Active Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Active` Status are stored herein.

---

#### A.6.1.1.3.2.4.1.3: Completed Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Completed` Status are stored herein.

---

#### A.6.1.1.3.2.4.1.4: In Progress Invocations

**Type:** Core | **Source:** atlas

The in progress Invocations of the Token SkyLink Primitive are contained herein. Once an Invocation is successfully completed, its subtree will be moved to [A.6.1.1.3.2.4.1.2 - Active Instances](38756877-b767-4a71-9f38-630a96b50f5a).

---

#### A.6.1.1.4.2.4: SkyLink Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the SkyLink Primitives for Launch Agent 3. See [A.2.3.7 - SkyLink Primitives](7b5d8965-a64c-4c44-b742-607f51f69d8f).

---

#### A.6.1.1.4.2.4.1: Token SkyLink Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Launch Agent 3’s Instances of the Token SkyLink Primitive. See [A.2.3.7.1 - Token SkyLink Primitive](4504d2d4-ee45-4a07-8c5b-9baf20b12e76).

---

#### A.6.1.1.4.2.4.1.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Launch Agent 3’s usage of the Token SkyLink Primitive.

---

#### A.6.1.1.4.2.4.1.1.2: Active Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Active`.

---

#### A.6.1.1.4.2.4.1.1.3: Completed Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Completed`.

---

#### A.6.1.1.4.2.4.1.1.4: In Progress Invocations Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all prospective Instances of the Token SkyLink Primitive whose Invocation is currently in progress. Invocations that are completed successfully are moved to [A.6.1.1.4.2.4.1.1.2 - Active Instances Directory](a5aa1884-66a2-4fd0-b35d-f4291f0726f7), whereas failed Invocations are Archived in [A.6.1.1.4.2.4.1.1.5 - Hub Data Repository](1707675b-308e-4ac1-8e29-129b76ed430d).

---

#### A.6.1.1.4.2.4.1.1.5.1: Archived Invocations/Instances

**Type:** Core | **Source:** atlas

The subtrees for archived Invocations and Instances of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.4.2.4.1.1.5.1.1: Failed Invocations

**Type:** Core | **Source:** atlas

The subtrees for failed Invocations of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.4.2.4.1.1.5.1.2: Suspended Instances

**Type:** Core | **Source:** atlas

The subtrees for Instances of the Token SkyLink Primitive with `Suspended` Status are stored here.

---

#### A.6.1.1.4.2.4.1.2: Active Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Active` Status are stored herein.

---

#### A.6.1.1.4.2.4.1.3: Completed Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Completed` Status are stored herein.

---

#### A.6.1.1.4.2.4.1.4: In Progress Invocations

**Type:** Core | **Source:** atlas

The in progress Invocations of the Token SkyLink Primitive are contained herein. Once an Invocation is successfully completed, its subtree will be moved to [A.6.1.1.4.2.4.1.2 - Active Instances](e9afe0ee-b765-49e0-9268-636b386c8733).

---

#### A.6.1.1.5.2.4: SkyLink Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the SkyLink Primitives for Launch Agent 4. See [A.2.3.7 - SkyLink Primitives](7b5d8965-a64c-4c44-b742-607f51f69d8f).

---

#### A.6.1.1.5.2.4.1: Token SkyLink Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Launch Agent 4’s Instances of the Token SkyLink Primitive. See [A.2.3.7.1 - Token SkyLink Primitive](4504d2d4-ee45-4a07-8c5b-9baf20b12e76).

---

#### A.6.1.1.5.2.4.1.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Launch Agent 4’s usage of the Token SkyLink Primitive.

---

#### A.6.1.1.5.2.4.1.1.2: Active Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Active`.

---

#### A.6.1.1.5.2.4.1.1.3: Completed Instances Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all Instances of the Token SkyLink Primitive with Instance status of `Completed`.

---

#### A.6.1.1.5.2.4.1.1.4: In Progress Invocations Directory

**Type:** Core | **Source:** atlas

This document contains a Directory of all prospective Instances of the Token SkyLink Primitive whose Invocation is currently in progress. Invocations that are completed successfully are moved to [A.6.1.1.5.2.4.1.1.2 - Active Instances Directory](5c2fbcb7-e90b-44a5-854b-1616d9ad45a9), whereas failed Invocations are Archived in [A.6.1.1.5.2.4.1.1.5 - Hub Data Repository](930899b8-232d-4015-a594-317b682ca460).

---

#### A.6.1.1.5.2.4.1.1.5.1: Archived Invocations/Instances

**Type:** Core | **Source:** atlas

The subtrees for archived Invocations and Instances of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.5.2.4.1.1.5.1.1: Failed Invocations

**Type:** Core | **Source:** atlas

The subtrees for failed Invocations of the Token SkyLink Primitive are stored here.

---

#### A.6.1.1.5.2.4.1.1.5.1.2: Suspended Instances

**Type:** Core | **Source:** atlas

The subtrees for Instances of the Token SkyLink Primitive with `Suspended` Status are stored here.

---

#### A.6.1.1.5.2.4.1.2: Active Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Active` Status are stored herein.

---

#### A.6.1.1.5.2.4.1.3: Completed Instances

**Type:** Core | **Source:** atlas

The Instances of the Token SkyLink Primitive with `Completed` Status are stored herein.

---

#### A.6.1.1.5.2.4.1.4: In Progress Invocations

**Type:** Core | **Source:** atlas

The in progress Invocations of the Token SkyLink Primitive are contained herein. Once an Invocation is successfully completed, its subtree will be moved to [A.6.1.1.5.2.4.1.2 - Active Instances](e8a2afff-b4b0-4b47-8b7a-32119eca9091).

---

### Keel (69 sections)

> Keel agent and its responsibilities

#### A.2.9.2.3: Ecosystem Accord 3: Sky And Keel

**Type:** Core | **Source:** atlas

The subdocuments herein record the terms of agreement between Sky and Keel as agreed in Ecosystem Accord 3.

---

#### A.2.9.2.3.1.1: Parties To The Accord

**Type:** Core | **Source:** atlas

The parties to Ecosystem Accord 3 are Sky and Keel, as defined in the subdocuments herein.

---

#### A.2.9.2.3.1.1.2: Keel Details

**Type:** Core | **Source:** atlas

The party ‘Keel’ comprises the Keel Prime Agent, Keel Foundation, and Matariki Labs.

---

#### A.2.9.2.3.2.1: Transfer From Liquidity Bootstrapping Budget To Keel

**Type:** Core | **Source:** atlas

Sky has transferred 500,000 USDS from the Sky Ecosystem Liquidity Bootstrapping Budget to Keel to provide liquidity to decentralized finance protocols on Solana (see [A.5.5.1.1 - Sky Ecosystem Liquidity Bootstrapping](cd4ae79c-0e34-4388-8ac2-41d7677bd955)). This amount shall be treated as an advance against Keel’s Genesis Capital Allocation and deducted from Keel’s allocated capital funds at the time of the Capital Transfer.

The transfer must be made to a multisig controlled by Keel’s Operational Executor Agent and the multisig must have the ability to withdraw the liquidity provided to decentralized finance protocols at any time. The address of the multisig on Solana is `6cTVPDJ8WR1XGxdgnjzhpYKRqcv78T4Nqt95DY8dvMmn`.

---

#### A.2.9.2.3.2.1.1: Use Of Funds For Keel Development Expenses

**Type:** Core | **Source:** atlas

Keel may also use the funds specified in [A.2.9.2.3.2.1 - Transfer From Liquidity Bootstrapping Budget To Keel](a0b2e17d-1483-40d0-a771-f12c1b42a0a9) to fund development expenses at its discretion.

If Keel elects to use funds in this way, it shall notify its Operational Executor Agent of the amount to be used for development expenses. The Operational Executor Agent will then withdraw the liquidity from the decentralized finance protocols, if necessary, and transfer it to an account designated by Keel.

---

#### A.3.3.2.2.3: Near Term Exemption For Keel

**Type:** Core | **Source:** atlas

In the near term, due to limitations in the infrastructure on Solana, Keel is exempt from the requirement to maintain the Minimum Actively Stabilizing Collateral. This exemption will be removed in a future iteration of the Asset Liability Management Framework.

---

#### A.3.7.1.5.5: Genesis Agents

**Type:** Core | **Source:** atlas

Genesis Agents are Agents that receive capital contributions from Sky, including, without limitation:

◦ Spark  
◦ Grove  
◦ Keel  
◦ Launch Agent 3
◦ Launch Agent 4

---

#### A.6.1.1.3: Keel

**Type:** Core | **Source:** atlas

The documents herein specify all of the logic for Keel, including Keel’s strategy and how it uses the Sky Primitives to operationalize this strategy.

---

#### A.6.1.1.3.2: Sky Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the Sky Primitives for Keel. See [A.2.3 - Sky Primitives](fcde2604-a138-4c1b-9d9a-14895835c907).

---

#### A.6.1.1.3.2.1: Genesis Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the Genesis Primitives for Keel. See [A.2.3.4 - Genesis Primitives](3d5e3668-8333-4908-adcc-5784cfe7f6b5).

---

#### A.6.1.1.3.2.1.1: Agent Creation Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instance of the Agent Creation Primitive. See [A.2.3.4.1 - Agent Creation Primitive](82b95f6d-4883-4f08-ac3a-9d8189013fbe).

---

#### A.6.1.1.3.2.1.1.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Agent Creation Primitive.

---

#### A.6.1.1.3.2.1.1.3.1.1.1: Name

**Type:** Core | **Source:** atlas

The name of the Agent is Keel.

---

#### A.6.1.1.3.2.1.1.3.1.1.2: SubProxy Account

**Type:** Core | **Source:** atlas

The address of Keel's SubProxy Account on the Ethereum Mainnet is `0x355CD90Ecb1b409Fdf8b64c4473C3B858dA2c310`.

---

#### A.6.1.1.3.2.1.1.3.1.1.3: Genesis Account

**Type:** Core | **Source:** atlas

The address of Keel’s Genesis Account will be specified in a future iteration of the Keel Artifact.

---

#### A.6.1.1.3.2.1.2: Prime Transformation Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instance of the Prime Transformation Primitive. See [A.2.3.4.2 - Prime Transformation Primitive](81411106-fd6d-4f9c-b3ae-7af7b5e62482).

---

#### A.6.1.1.3.2.1.2.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Prime Transformation Primitive.

---

#### A.6.1.1.3.2.1.2.3.1.1.1: Agent Type

**Type:** Core | **Source:** atlas

Keel is a Prime Agent.

---

#### A.6.1.1.3.2.1.3: Executor Transformation Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instance of the Executor Transformation Primitive. See [A.2.3.4.3 - Executor Transformation Primitive](2f249be5-8edb-41e4-b429-734e1ba2cbc7).

---

#### A.6.1.1.3.2.1.3.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Executor Transformation Primitive.

---

#### A.6.1.1.3.2.1.4: Agent Token Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instance of the Agent Token Primitive. See [A.2.3.4.4 - Agent Token Primitive](2047c361-db28-4952-a70c-83d07b562064).

---

#### A.6.1.1.3.2.1.4.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Agent Token Primitive.

---

#### A.6.1.1.3.2.1.4.2.1.1.1: Token Name

**Type:** Core | **Source:** atlas

The name of Keel’s token is Keel.

---

#### A.6.1.1.3.2.1.4.2.1.1.2: Token Symbol

**Type:** Core | **Source:** atlas

The symbol of Keel’s token is KEEL.

---

#### A.6.1.1.3.2.1.4.2.1.1.3: Genesis Supply

**Type:** Core | **Source:** atlas

The Genesis Supply of KEEL will be specified in a future iteration of the Keel Artifact.

---

#### A.6.1.1.3.2.1.4.2.1.1.4: Token Address

**Type:** Core | **Source:** atlas

The address of KEEL will be specified in a future iteration of the Keel Artifact.

---

#### A.6.1.1.3.2.1.4.2.1.1.5: Token Admin

**Type:** Core | **Source:** atlas

The token Admin will be specified in a future iteration of the Keel Artifact.

---

#### A.6.1.1.3.2.1.4.2.1.1.6: Token Emissions

**Type:** Core | **Source:** atlas

Token emissions beyond the Genesis Supply are permanently disabled; this cannot be reverted by Keel Governance. Sky Governance retains the ability to revert where Keel is in violation of Risk Capital requirements and emissions are required by the Risk Framework. See [A.3.2 - Risk Capital](55999acf-75fe-4adf-8584-9746ef50d3e4).

---

#### A.6.1.1.3.2.1.4.2.1.2: Operational Process Definition

**Type:** Core | **Source:** atlas

The documents herein define the operational processes for minting and initial distribution of the tokens from the Genesis Supply.

- These processes will be defined in a future iteration of the Keel Artifact.

---

#### A.6.1.1.3.2.2: Operational Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the Operational Primitives for Keel. See [A.2.3.5 - Operational Primitives](0192ec95-9207-480e-8c51-88d2a1da95ad).

---

#### A.6.1.1.3.2.2.1: Executor Accord Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instances of the Executor Accord Primitive. See [A.2.3.5.1 - Executor Accord Primitive](88017877-3ec1-4c43-a035-6bebdf11d9bb).

---

#### A.6.1.1.3.2.2.1.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Executor Accord Primitive.

---

#### A.6.1.1.3.2.2.2: Root Edit Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instance of the Root Edit Primitive. See [A.2.3.5.2 - Root Edit Primitive](78488c6b-d77f-4344-b954-476e415a2c7d).

---

#### A.6.1.1.3.2.2.2.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Root Edit Primitive.

---

#### A.6.1.1.3.2.2.2.2.1.2: Operational Process Definition

**Type:** Core | **Source:** atlas

The documents herein define the process for using the Root Edit Primitive to update the Keel Agent Artifact. Information on Keel governance that is unrelated to the use of the Root Edit Primitive is located at [A.6.1.1.3.3.1 - Governance Information Unrelated To Root Edit Primitive](1889a2a0-7378-487a-a278-aabe3177efff).

---

#### A.6.1.1.3.2.2.2.2.1.2.1: Routine Protocol

**Type:** Core | **Source:** atlas

The documents herein define the process for using the Root Edit Primitive to update the Keel Agent Artifact in routine or normal conditions (i.e., non-emergency situations).

---

#### A.6.1.1.3.2.2.2.2.1.2.1.1: Root Edit Proposal Submission

**Type:** Core | **Source:** atlas

The Root Edit process begins with a KEEL token holder submitting a proposal through the Powerhouse system containing a draft Artifact Edit Proposal. A KEEL token holder must hold at least 1% of the circulating token supply to submit a proposal. The proposal must also be posted on the Sky Forum under the “Keel Prime” category.

---

#### A.6.1.1.3.2.2.2.2.1.2.1.1.2: Short-Term Transitionary Measures

**Type:** Core | **Source:** atlas

Until the Powerhouse system supports submitting Artifact Edit Proposals, KEEL token holders may submit Artifact Edit Proposals by posting them to the Sky Forum under the “Keel Prime” category. The title of the post must include the text “Keel Artifact Edit Proposal”. The post must include cryptographic proof that the author controls an account holding the required percentage of the total KEEL token supply specified in [A.6.1.1.3.2.2.2.2.1.2.1.1 - Root Edit Proposal Submission](98f59541-8896-4e64-8e99-2b25e7791bf0).

---

#### A.6.1.1.3.2.2.2.2.1.2.1.2: Root Edit Expert Advisor Review

**Type:** Core | **Source:** atlas

A future iteration of the Keel Artifact will specify guidelines for obtaining specialized review of proposals requiring advanced technical or financial analysis.

---

#### A.6.1.1.3.2.2.2.2.1.2.1.4: Root Edit Token Holder Vote

**Type:** Core | **Source:** atlas

Where their review of the proposal results in a finding of alignment with the Sky Core Atlas and Keel Artifact, the Operational Facilitator next triggers a Snapshot poll to allow token holders to vote on the proposal. The poll is open for three (3) days. A poll must have at least 10% of the circulating token supply participating and must have more than 50% of votes cast, excluding abstentions, in favor to be approved.

---

#### A.6.1.1.3.2.2.2.2.1.2.1.6: Artifact Edit Restrictions

**Type:** Core | **Source:** atlas

The Keel Artifact cannot be edited in any way that violates the Sky Core Atlas or its specifications of the Sky Primitives, or in any way that is otherwise misaligned. The Operational Facilitator must enforce this rule through their review of Artifact Edit Proposals.

---

#### A.6.1.1.3.2.2.2.2.1.2.2: Non-Routine Protocol

**Type:** Core | **Source:** atlas

The documents herein define the process for using the Root Edit Primitive to update the Keel Agent Artifact in non-routine conditions.

---

#### A.6.1.1.3.2.2.2.2.1.2.3: Emergency Protocol

**Type:** Core | **Source:** atlas

The documents herein define the process for using the Root Edit Primitive to update the Keel Agent Artifact in urgent or emergency situations.

---

#### A.6.1.1.3.2.2.2.2.1.2.3.1: Root Edit Voting Process in Urgent and Emergency Situations

**Type:** Core | **Source:** atlas

In an Urgent or Emergency Situation, as defined by the Sky Core Atlas in [A.1.8.1.1 - Definition Of Emergency Situations](5eafb29e-84a0-4a53-a798-3f958c880225), the Operational Facilitator may allow a Root Edit to occur more quickly than the timeline specified above. Where feasible, the Operational Facilitator should announce the decision to deploy the emergency Root Edit protocol and provide their reasoning via a public Sky Forum post (under the “Keel Prime” category), unless doing so would endanger Keel or its users.

---

#### A.6.1.1.3.2.2.3: Light Agent Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instances of the Light Agent Primitive. See [A.2.3.5.3 - Light Agent Primitive](44028423-2cd1-40cb-89ac-3f762b602b90).

---

#### A.6.1.1.3.2.2.3.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Light Agent Primitive.

---

#### A.6.1.1.3.2.3: Ecosystem Upkeep Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the Ecosystem Upkeep Primitives for Keel. See [A.2.3.6 - Ecosystem Upkeep Primitives](25673fd2-76cb-4c4d-8ec6-8c489207bcfc).

---

#### A.6.1.1.3.2.3.1: Distribution Requirement Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instance of the Distribution Requirement Primitive. See [A.2.3.6.1 - Distribution Requirement Primitive](0804ab13-d276-4ad9-a935-dc9f7fc2e350).

---

#### A.6.1.1.3.2.5.2.2.4.2.1: Routine Protocol

**Type:** Core | **Source:** atlas

This document defines the protocol for routine ongoing management of the Lifinity Instance. This Instance inherits the base class of operational logic defined in [A.2.3.8.2.2.4 - Instance Ongoing Management Protocol](805381e5-89e7-4fb9-bda7-a97e84b531ba), subject to the qualifications specified in [A.2.3.8.2.2.1.3.2.1 - Near Term Process](4ab621b4-ef8e-4b01-a6aa-9296601033c5).

Modifications to the base operational logic automatically propagate to this Instance. In future iterations of the Keel Artifact, a version of the full process definition customized to Keel will be included herein.

---

#### A.6.1.1.3.2.5.2.2.4.2.1.1: Agent Customizations

**Type:** Core | **Source:** atlas

The Keel Agent may define Instance-specific customization of the routine protocol to extend the baseline functionality defined in the Sky Core Atlas. This can include custom routines or processes layered on top of the inherited Sky Core logic. Any extensions must remain fully aligned with the requirements specified in the Sky Core Atlas. This document defines those customizations, if any.

[No customization presently.]

---

#### A.6.1.1.3.2.5.2.3.1.2.1: Routine Protocol

**Type:** Core | **Source:** atlas

This document defines the protocol for routine ongoing management of the MarginFi Instance. This Instance inherits the base class of operational logic defined in [A.2.3.8.2.2.4 - Instance Ongoing Management Protocol](805381e5-89e7-4fb9-bda7-a97e84b531ba), subject to the qualifications specified in [A.2.3.8.2.2.1.3.2.1 - Near Term Process](4ab621b4-ef8e-4b01-a6aa-9296601033c5).

Modifications to the base operational logic automatically propagate to this Instance. In future iterations of the Keel Artifact, a version of the full process definition customized to Keel will be included herein.

---

#### A.6.1.1.3.2.5.2.3.1.2.1.1: Agent Customizations

**Type:** Core | **Source:** atlas

The Keel Agent may define Instance-specific customization of the routine protocol to extend the baseline functionality defined in the Sky Core Atlas. This can include custom routines or processes layered on top of the inherited Sky Core logic. Any extensions must remain fully aligned with the requirements specified in the Sky Core Atlas. This document defines those customizations, if any.

[No customization presently.]

---

#### A.6.1.1.3.2.5.3: Pioneer Chain Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instances of the Pioneer Chain Primitive. See [A.2.3.8.3 - Pioneer Chain Primitive](4c7be4c6-44b5-407a-94ae-3d7ca7e8039c).

---

#### A.6.1.1.3.2.5.3.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Pioneer Chain Primitive.

---

#### A.6.1.1.3.2.6: Supply Side Stablecoin Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the Supply Side Stablecoin Primitives for Keel. See [A.2.3.9 - Supply Side Stablecoin Primitives](d1142876-33c2-4e21-9339-d8711525d46f).

---

#### A.6.1.1.3.2.6.1: Allocation System Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instances of the Allocation System Primitive. See [A.2.3.9.1 - Allocation System Primitive](9db14ab7-bb4b-4751-8084-843bd4359f2a).

---

#### A.6.1.1.3.2.6.1.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Allocation System Primitive.

---

#### A.6.1.1.3.2.6.2: Junior Risk Capital Rental Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instances of the Junior Risk Capital Rental Primitive. See [A.2.3.9.2 - Junior Risk Capital Rental Primitive](d8086dc0-7e77-4c6b-98c7-5fc41337a1ce).

---

#### A.6.1.1.3.2.6.2.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Junior Risk Capital Rental Primitive.

---

#### A.6.1.1.3.2.6.3: Asset Liability Management Rental Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instances of the Asset Liability Management Rental Primitive. See [A.2.3.9.3 - Asset Liability Management Rental Primitive](bd1f1ce5-6c31-42fc-a2aa-694acf5eb08c).

---

#### A.6.1.1.3.2.6.3.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Asset Liability Management Rental Primitive.

---

#### A.6.1.1.3.2.7: Core Governance Primitives

**Type:** Core | **Source:** atlas

The documents herein implement the Core Governance Primitives for Keel. See [A.2.3.10 - Core Governance Primitives](6fa54611-c744-4b9d-897d-b2a20e9cae5d).

---

#### A.6.1.1.3.2.7.1: Core Governance Reward Primitive

**Type:** Core | **Source:** atlas

The documents herein contain all data and specifications for Keel’s Instances of the Core Governance Reward Primitive. See [A.2.3.10.1 - Core Governance Reward Primitive](b22d1c08-042a-4466-94fe-9d28951e4d4a).

---

#### A.6.1.1.3.2.7.1.1: Primitive Hub Document

**Type:** Core | **Source:** atlas

The documents herein organize all base information relevant to Keel’s usage of the Core Governance Reward Primitive.

---

#### A.6.1.1.3.3.1.2: Sky Ecosystem Emergency Response

**Type:** Core | **Source:** atlas

The documents herein specify Keel’s emergency response protocol in situations that impact the entire Sky Ecosystem. This protocol will be specified in a future iteration of the Keel Artifact.

---

#### A.6.1.1.3.3.1.3: Agent-Specific Emergency Response

**Type:** Core | **Source:** atlas

The documents herein specify Keel’s emergency response protocol in situations solely impacting Keel versus the broader Sky Ecosystem. This protocol will be specified in a future iteration of the Keel Artifact.

---

#### A.6.1.1.3.3.2: Use Of Idle Funds

**Type:** Core | **Source:** atlas

In the short term prior to Launch Agent 2's implementation of the Allocation System Primitive, Keel may invest idle funds in low-risk decentralized finance opportunities, including providing liquidity to established lending protocols on Solana. These deployments will be subject to the approval of Operational GovOps.

---

#### A.6.1.1.3.3.3: Ecosystem Accords

**Type:** Core | **Source:** atlas

Keel has formally agreed to the Ecosystem Accords herein.

---

#### A.6.1.1.3.3.3.1: Ecosystem Accord 3

**Type:** Core | **Source:** atlas

Keel engaged in terms of agreement with Sky in Ecosystem Accord 3, located in [A.2.9.2.3 - Ecosystem Accord 3: Sky And Keel](63a88b08-e6cd-48bf-9cec-64ce7e42ae0e).

---

### sUSDS (100 sections)

> Sky USD Savings token and savings rate mechanism

#### A.0.1.1.37: Unrewarded USDS

**Type:** Core | **Source:** atlas

Unrewarded USDS are USDS balances that are not receiving the Sky Savings Rate, Integration Boost or USDS Token Rewards. USDS Token Rewards include both SKY and Agent token rewards.

---

#### A.2.3.8.1.1.1: Purpose

**Type:** Core | **Source:** atlas

The purpose of the Distribution Reward is to incentivize Prime Agents and third parties to drive USDS adoption by providing a financial reward to these actors for all USDS and sUSDS balances attributable to them.

---

#### A.2.3.8.1.2.1.2.2.1: Ethereum Mainnet General Tracking Methodology

**Type:** Core | **Source:** atlas

The general Tracking Methodology for Ethereum Mainnet is to specify the Reward Code as a parameter to depositing USDS into the Sky Savings Rate contract or Token Rewards contracts. This on-chain deposit data is then combined with withdrawal data. In the interim, this data is further processed by Ecosystem Actor Viridian Advisors to estimate net deposits associated with the Reward Code on a First In First Out (FIFO) basis. In the long term, Operational Executor Agents will wholly manage this process.

---

#### A.2.3.8.1.2.1.2.2.3: Base Tracking Methodology

**Type:** Core | **Source:** atlas

The Tracking Methodology for Base is to specify the Reward Code as a parameter in calls to the Base PSM contract. Conversions from USDS or USDC to sUSDS are considered “deposits” and net deposits are calculated using an approach similar to that on Ethereum Mainnet.

---

#### A.2.3.8.1.2.1.3: Distribution Reward Rate

**Type:** Core | **Source:** atlas

The standard Distribution Reward rate is set at 0.2%. The Distribution Reward rate is annualized on all USDS and sUSDS balances associated with the relevant Reward Code.

---

#### A.2.3.8.1.2.1.3.1.3: Limitations

**Type:** Core | **Source:** atlas

The Boosted Distribution Reward rate is not applicable to USDS and sUSDS balances held by the Prime Agent itself.

---

#### A.2.3.8.1.2.1.4.2: Reward Payment

**Type:** Core | **Source:** atlas

The Distribution Reward payment for each month is equal to

(1) the average balance over the month, times
(2) the annual Distribution Reward Fee specified in [A.2.3.8.1.2.1.3 - Distribution Reward Rate](57384c49-e499-4c69-b22c-8e1f1dd34759), divided by
(3) twelve (12).

The Distribution Reward Fee specified in [A.2.3.8.1.2.1.3 - Distribution Reward Rate](57384c49-e499-4c69-b22c-8e1f1dd34759) includes all of the following elements:

1. Fees for USDS and sUSDS Balances specified in [[Unknown]](9ba4f815-6fc7-4cfe-a5d6-b73ea7ff9f7e); and
2. the Prime Agent Management Fee specified in [[Unknown]](389ebf97-7ea6-4999-afd4-6419013a31af).

---

#### A.2.3.8.1.2.4.1.1.2: Process Flow

**Type:** Core | **Source:** atlas

The process flow is defined herein:

• Operational GovOps calculates the eligible USDS and sUSDS balances using the Tracking Methodology specified in the Primitive Instance.

• Operational GovOps calculates the Distribution Reward due based on the USDS and sUSDS balances and the Distribution Reward formula for each.

• Operational GovOps updates the Powerhouse system with both the underlying data and their calculations.

---

#### A.2.3.8.1.2.4.1.1.3: Required Primitive Inputs

**Type:** Core | **Source:** atlas

The required Primitive Inputs to this process are specified herein.

• Edit `Distribution Reward Payments` Document (Active Data)
◦ Updated fields
• Status
• New value: set to `In Progress`
• Underlying data
• New value: populate with underlying data used to calculate the eligible USDS and sUSDS balances
• Eligible USDS balance
• New value: populate with calculated value
• Eligible sUSDS balance
• New value: populate with calculated value
• Distribution Reward Due
• New value: populate with calculated value.
◦ Responsible party: Operational GovOps.
◦ Trigger-Process: [A.2.3.8.1.2.4.1.2 - Process Definition For Reward Issuance From Operational Executor Agent Buffer](ddd65b02-3a2b-4478-a435-989324c2f1b8).

---

#### A.2.3.8.2.1.1: Purpose

**Type:** Core | **Source:** atlas

The Integration Boost Primitive provides a low complexity version of the Sky Savings Rate to integration partners that hold USDS or lending markets that integrate USDS.

---

#### A.2.3.8.2.2.1.1: Integration Boost Partners

**Type:** Core | **Source:** atlas

The Integration Boost is provided to DeFi protocol partners that allow users to deposit USDS balances. Sky makes payments to Integration Boost partners equal to the Sky Savings Rate times the Unrewarded USDS balances in their protocol. The expectation is that the Integration Boost Partner will pass these Integration Boost Payments along to their users, thus providing USDS users with the equivalent of the Sky Savings Rate.

Integration Boost partners are part of the Integrator Program as defined in [A.2.3.8.1.2.1.1 - Integrator Program](37c38f07-b5a0-40df-939c-a54330ea3c7b).

Current and onboarding Integrators are recorded in [A.2.3.8.1.2.1.5 - Current And Onboarding Integrators](f3952cc5-cde2-46b9-b575-034dda83570b).

---

#### A.2.3.8.2.2.3.1.2: Process Flow

**Type:** Core | **Source:** atlas

The process flow is defined herein.

• The Prime Agent identifies a DeFi protocol or market where an Integration Boost would drive adoption. The Prime Agent estimates the potential earnings from the Distribution Reward associated with the incremental USDS usage versus the operational cost of funding the Sky Savings Rate payouts.

• The Prime Agent and the prospective Integration Boost partner discuss (1) the proposed Integration Boost cadence and (2) whether and how the protocol operator also receives a portion of the Accessibility Reward.

---

#### A.2.3.8.2.2.3.1.3: Required Primitive Inputs

**Type:** Core | **Source:** atlas

The required Primitive Inputs for this process are defined herein and organized in sequential stages.

• Drafting of Initial Planning Document

    ◦ Create `Initial Planning Document`
        • Updated fields
            • `Status`
                ◦ New value: set to `Drafting`
            • `Integration Partner Name`
                ◦ New Value: set to Integration Partner name
            • `Integration Partner Reward Address`
                ◦ New Value: set to Integration Partner reward address
            • `Integration Partner Chain`
                ◦ New Value: set to Integration Partner chain
            • `Integration Boost Cadence`
                ◦ New Value: set to Integration Boost cadence
            • `Integration Boost Data Submission Format`
                ◦ New Value: populate with details for format of data submission
            • `Integration Boost Data Submission Responsible Actor`
                ◦ New Value: set to Actor responsible for data submission
            • `Integration Boost Savings Rate Adjustment Strategy`
                ◦ New Value: populate with details for handling adjustments to Sky Savings Rate
            • `Custom Instance Parameters`
                ◦ New Value: populate with details for any custom parameters
        • Responsible Party: Prime Agent Team
        • Trigger - Required Output: After Prime Agent's `Initial planning document` Status is set to `Drafting`

• Initial Planning Document triggered for GovOps review

    ◦ Edit `Initial Planning Document`
        • Updated fields
            • `Integration Boost Savings Rate Adjustment Strategy`
                ◦ New value: updated content, as applicable
            • `Status`
                ◦ New value: set to `Ready for GovOps Review`
        • Responsible party: Prime Agent
        • Trigger - Required Output: After Prime Agent's `Initial planning document` Status is set to `Ready for GovOps review`.

---

#### A.2.3.8.2.2.3.2.2: Process Flow

**Type:** Core | **Source:** atlas

The process flow is defined herein:

• Operational GovOps reviews the `Initial Planning Document` to ensure:
◦ The submitted data can be verified using on-chain data;
◦ the Savings Rate Adjustment Strategy ensures that the payment on USDS balances equals the Sky Savings Rate, and
◦ the submitted data accurately reflects USDS deposits in the Integration Partner protocol and there is no possibility that rewards could be “double counted” (i.e. multiple actors being paid for the same USDS balance).

• Operational GovOps submits its feedback into the `Operational GovOps Review Document` (created at Create `Operational GovOps Review Document`) along with suggested changes, if any.

• The Prime Agent incorporates feedback from Operational GovOps and edits its `Initial Planning Document` as needed.

---

#### A.2.3.8.2.2.4.1.1.2: Process Flow

**Type:** Core | **Source:** atlas

The process flow is defined herein:

• At the end of each Integration Boost period, the data provider submits the net USDS deposit data to Powerhouse.

• Operational GovOps verifies this data by checking on-chain balances and confirms that there are no discrepancies.

• Operational GovOps then calculates the payout based on the net USDS deposit data and the Sky Savings Rate.

---

#### A.2.3.8.3.1.4: Pioneer Incentive Pool

**Type:** Core | **Source:** atlas

All Pioneer Incentive payments are paid through the Monthly Settlement Cycle. Each Monthly Settlement Cycle, an amount of funds equivalent to the Sky Savings Rate multiplied by the balance of Unrewarded USDS is paid into a separate account controlled by the Pioneer Prime (the “Pioneer Incentive Pool”). 80% of the funds going to the Pioneer Incentive Pool are not the property of the Pioneer Primes and must instead be used as incentives to promote general adoption of USDS on the Pioneer Chain. This must provide general benefit for the sake of growing USDS activity on the Pioneer Chain and cannot be biased towards benefiting the Pioneer Prime. The remaining 20% of the funds going to the Pioneer Incentive Pool may be retained by the Pioneer Prime as income.

---

#### A.2.4.1.2.1.3.1: Sky Savings Rate Paid To sUSDS Holders

**Type:** Core | **Source:** atlas

The Sky Savings Rate is the interest expense paid to sUSDS holders on their balances. It also includes interest paid to sDai holders on their balances.

---

#### A.2.4.1.2.1.3.2: Sky Savings Rate Paid Through Integration Boost

**Type:** Core | **Source:** atlas

The Integration Boost provides the equivalent of the Sky Savings Rate to users of decentralized finance protocols who hold USDS balances. See [A.2.3.8.2 - Integration Boost Primitive](73577399-62e4-4a83-ae11-64ef7e7b7f20).

---

#### A.2.5.1.1: Operational Processes

**Type:** Core | **Source:** atlas

The Monthly Settlement Cycle (MSC) synchronizes several key operational processes across the ecosystem, including:

1. Sky Protocol’s net revenue from the previous month is calculated and allocated through the steps of the Treasury Management Function. See [A.2.4 - Treasury Management](6c0af059-5d33-4e2b-90f1-1606957b8f85).
2. The monthly Senior Risk Capital (SRC) origination process is settled: the clearing price is established, costs are deducted from winning Prime Agents’ accounts, and their accounts are credited with Originated SRC (OSRC) for the upcoming month. See [A.3.2.2.4.3.5 - Settlement Of Origination](fff0112a-58dd-4041-97f9-7baf113b4e70).
3. Queued conversions between USDS and srUSDS within the SRC system are processed. See [A.3.2.2.4.2.2 - Deposit And Redemption Queues](38a99586-4a13-4ce3-8b2f-cee025e0c390).
4. Pioneer Incentive Pools are funded with an amount equivalent to the Sky Savings Rate multiplied by the balance of Unrewarded USDS. See [A.2.3.8.3 - Pioneer Chain Primitive](4c7be4c6-44b5-407a-94ae-3d7ca7e8039c).
5. The Smart Burn Buffer's burning operation occurs synchronously with each Monthly Settlement Cycle. At each cycle, the system calculates the appropriate Burn Rate based on current market conditions and executes the burn operation, if applicable, according to the formula specified in the Atlas. See [A.2.4.1.2.5.1.2 - Usage Of Smart Burn Buffer](7295761a-e72b-4b32-9345-b229b46566d1).
6. Critical Core GovOps functions related to the operationalization of Sky Primitives are executed, including payment/reimbursement processing, compliance monitoring, and the calculation and application of retroactive penalties.

---

#### A.2.5.1.2.2.1.1.1.1: Amount Due From Sky To Primes With Respect To Distribution Reward

**Type:** Core | **Source:** atlas

The amount due from Sky to a Prime in a month with respect to the Distribution Reward is the amount earned by the Prime with respect to all USDS and sUSDS balances marked with the Prime’s reward codes. See [A.2.3.8.1 - Distribution Reward Primitive](e632c38f-3e4e-4c7e-acfd-b6ec45a422e6). This includes any Bonus Distribution Reward. See [A.2.9.2.2.2.3.2 - 2025 Bonus](7ca440d3-03fb-4fba-81a8-d2118dc47aa6).

---

#### A.2.9.2.2.2.2.3: Base Rate

**Type:** Core | **Source:** atlas

The Base Rate will be dynamic and aligned with the SSR (Sky Savings Rate).

---

#### A.2.9.2.2.2.3.2.1: Bonus Limitation

**Type:** Core | **Source:** atlas

USDS and sUSDS balances held by the Prime itself are not eligible for the Distribution Reward bonus specified in [A.2.9.2.2.2.3.2 - 2025 Bonus](7ca440d3-03fb-4fba-81a8-d2118dc47aa6).

---

#### A.2.9.2.2.2.7.2.1: Base Rate Obligation

**Type:** Core | **Source:** atlas

Grove will be required to pay the Base Rate on all assets within the PSM. The Base Rate is dynamic and will align with the SSR (Sky Savings Rate), expected to fluctuate between the Aave and Ethena rates. See [A.2.9.2.2.2.2.3 - Base Rate](fd39df25-6093-49ae-be12-36df34754612).

---

#### A.3.1.2.2: Sky Savings Rate

**Type:** Core | **Source:** atlas

The Sky Savings Rate (”SSR”) is the rate USDS holders can earn on their USDS in the Sky Savings Rate smart contracts.

---

#### A.3.1.2.2.1: Relationship To Base Rate

**Type:** Core | **Source:** atlas

The Sky Savings Rate is 0.3% below the Base Rate. This difference is equal to the sum of (1) the 0.2% Distribution Reward Fee (see [A.2.3.8.1.2.1.3 - Distribution Reward Rate](57384c49-e499-4c69-b22c-8e1f1dd34759)) and (2) the 0.1% Sky Spread (see [A.3.2.2.4.2.3.3.1 - Sky Spread](c160f99c-c3d8-41e9-a3d1-cde514b7a2da)).

---

#### A.3.1.2.2.2: Sky Savings Rate Modification

**Type:** Core | **Source:** atlas

The Sky Savings Rate can be modified through either Executive Votes or the Stability Parameter Bounded External Access Module. See [A.3.7.1.2 - Stability Parameter Bounded External Access Module](47b8b035-8abd-42e6-86b8-33f852fa953a).

---

#### A.3.1.2.2.2.1: Sky Savings Rate Stability Parameter Bounded External Access Module Parameters

**Type:** Core | **Source:** atlas

The Stability Parameter Bounded External Access Module parameters for the Sky Savings Rate are:
• `max` - 3,000 basis points,
• `min` - 200 basis points,
• `step` - 400 basis points,
• `tau` - Globally defined in [A.3.7.1.2.1.4.1 - Tau Current Value](dd9472e5-9796-4aff-a2b1-7a847e008c9b).

---

#### A.3.1.2.3: Agent Rate

**Type:** Core | **Source:** atlas

The Agent Rate is the rate that Prime Agents earn on Unrewarded USDS, Dai, and sUSDS balances that they hold.

---

#### A.3.1.2.3.1: Relationship To Base Rate

**Type:** Core | **Source:** atlas

The Agent Rate is 0.1% below the Base Rate. This is equal to the Sky Savings Rate plus the 0.2% Distribution Reward Fee (see [A.2.3.8.1.2.1.3 - Distribution Reward Rate](57384c49-e499-4c69-b22c-8e1f1dd34759)).

---

#### A.3.1.2.3.3: Treatment Of sUSDS Balances

**Type:** Core | **Source:** atlas

Prime Agents receive the Agent Rate on sUSDS balances in a modified form. sUSDS balances already earn the Sky Savings Rate. In addition to this, sUSDS balances earn additional compensation of 0.20% to account for the 0.1% Distribution Reward Fee (see [[Unknown]](9ba4f815-6fc7-4cfe-a5d6-b73ea7ff9f7e)) and the 0.1% Prime Agent Management Fee (see [[Unknown]](389ebf97-7ea6-4999-afd4-6419013a31af)) that is paid through the Monthly Settlement Cycle, as specified in [A.3.1.2.3.6 - Settlement](eed3d922-7bb8-4cee-97a4-47e902a1c937).

---

#### A.3.1.2.3.4: Spark

**Type:** Core | **Source:** atlas

Spark is entitled to a higher Agent Rate equal to the Base Rate on USDS and sUSDS balances held in Peg Stability Modules. See [A.3.3.2.1.1 - Peg Stability Module](0082c12d-f1a7-46ff-a4aa-5fe42ece1a4d). The Agent Rate earned by Spark is still subject to the limitations set forth in [A.3.1.2.3.5 - Limitations For Prime Agents Receiving Subsidized Rate](7f6c1ab6-7674-41b0-9522-7e7e5a1cab3d).

---

#### A.3.1.2.3.6: Settlement

**Type:** Core | **Source:** atlas

Any compensation due to or from Prime Agents so that they earn the Agent Rate on USDS, Dai, and sUSDS balances is paid as part of the Monthly Settlement Cycle. See [A.2.5 - Sky Core Monthly Settlement Cycle](6f8d5065-d6ff-4add-9a28-eadeffa7ed1a).

---

#### A.3.2.1.2.2.1.1.3: Tokenized External Junior Risk Capital (TEJRC)

**Type:** Core | **Source:** atlas

Tokenized External Junior Risk Capital is capital provided by external capital providers depositing sUSDS into the Tokenized External Junior Risk Capital smart contract, from which Primes can encumber funds. The details of this contract will be specified in a future iteration of the Atlas.

---

#### A.3.2.2.1.1.1.6.1: Near-Term Treatment

**Type:** Core | **Source:** atlas

In the near term pending development of the implementation of the model for Cash Stablecoins, a 0% Instance Financial CRR will be applied to Cash Stablecoins. In the near term, only USDS, sUSDS, Dai, sDai, USDC, USDT, and pyUSD (either held directly or through decentralized exchanges such as Curve) will be eligible for investment under this provision.

---

#### A.3.2.2.4.2.3.3.1: Sky Spread

**Type:** Core | **Source:** atlas

Sky takes a spread equal to the Sky Spread on all ESRC balances. The Sky Spread is the difference between (1) the rate at which Prime Agents borrow from Sky and (2) the Sky Savings Rate plus the Distribution Reward Fee.

---

#### A.3.7.1.2: Stability Parameter Bounded External Access Module

**Type:** Core | **Source:** atlas

The Stability Parameter Bounded External Access Module (SP-BEAM) enables designated, Governance-whitelisted operators to adjust the Stability Fees of supported vault types, the Dai Savings Rate (DSR), and the Sky Savings Rate (SSR). Adjustments are governed by the SP-BEAM smart contract logic and specific parameters set by Sky Governance. SP-BEAM holds four parameters that can be set for each vault type or savings rate: (i) `min`, (ii) `max`, (iii) `step`, and (iv) `tau`.

---

#### A.4.1.1.1.1: Gnosis Payment

**Type:** Core | **Source:** atlas

Sky has agreed to compensate Gnosis for the difference between the Sky Savings Rate and the Dai Savings Rate on xDai balances for the period between March 1, 2025 and October 28, 2025.

The amount of this payment is 1,806,670 USDS and the recipient address on the Ethereum Mainnet is `0x849d52316331967b6ff1198e5e32a0eb168d039d`. This payment should be included in the next available Executive Vote as determined by the Core Facilitator and is authorized to proceed directly to an Executive Vote without a prior Governance Poll.

---

#### A.4.3: Savings Rate And Token Reward Mechanism

**Type:** Article | **Source:** atlas

This Article regulates the rewards benefitting Dai users and USDS users for holding each Stablecoin. DAI users can access the legacy DAI Savings Rate Mechanism. USDS users can access a built-in Savings Rate, as well as additional Token Reward Mechanisms including SKY and Agent tokens.

---

#### A.4.3.1: Savings Rates

**Type:** Section | **Source:** atlas

The Savings Rate Mechanism includes both the legacy Dai Savings Rate Mechanism and the Sky Savings Rate. The Sky Savings Rate includes a built-in sUSDS mechanism. The Savings Rate is governed by the Stability Scope.

---

#### A.4.3.2.1: SKY Token Rewards

**Type:** Core | **Source:** atlas

With each Executive Vote, the distribution of SKY token rewards to USDS holders is normalized to ensure the effective yield provided by these rewards equals the Sky Savings Rate (SSR) for the upcoming period. The effective yield is defined as: (Total Market Value of Distributed SKY Tokens / Total Eligible USDS Balance).

To achieve this normalization, the quantity of SKY token rewards to be distributed is determined through the following calculation, performed for each normalization period:

1. Determine Target Reward Value: Calculate the total US dollar value required to meet the SSR for the period: (Total Eligible USDS Balance \* SSR).
2. Determine SKY Token Quantity: Divide the Target Reward Value (from step 1) by the Current Market Price of SKY (determined at the time of the Executive Vote).

The Core Facilitator, on the recommendation of the Core Council Risk Advisor, may maintain the quantity of SKY token rewards to be distributed for a normalization period at its current level if they conclude that:

◦ the difference between the effective yield provided by SKY Tokens Rewards and the SSR is not material;

◦ the difference between the effective yield provided by SKY Token Rewards and the SSR is unlikely to persist due to other factors; or

◦ adjusting the quantity of SKY Token Rewards is otherwise inadvisable.

The recommendation of the Core Council Risk Advisor must be posted to the Sky Forum.

---

#### A.4.4.1.3.2: stUSDS Rate

**Type:** Core | **Source:** atlas

The variable yield earned by stUSDS holders is calculated using the formula:

`stUSDS Rate = Sky Savings Rate + (SKY Borrow Rate - SKY Borrow Minimum Rate) * Utilization - Rfactor * f(Utilization)`

---

#### A.4.4.1.3.2.1.1: Sky Savings Rate Definition

**Type:** Core | **Source:** atlas

`Sky Savings Rate` is the Sky Savings Rate defined in [A.3.1.2.2 - Sky Savings Rate](2674cccb-d779-4868-b83f-8cb86648c88a).

---

#### A.4.4.1.3.5.2: SKY Borrow Minimum Rate

**Type:** Core | **Source:** atlas

The SKY Borrow Minimum Rate is calculated according to the following formula:

`SKY Borrow Minimum Rate = Sky Savings Rate + stUSDS Accessibility Reward`

The formula ensures the SKY Borrow Minimum Rate covers the baseline cost of capital (Sky Savings Rate) plus the incentive cost (stUSDS Accessibility Reward), preventing value-draining arbitrage where users could borrow below the Sky Savings Rate.

---

#### A.4.4.1.3.5.2.1.1: Sky Savings Rate Definition

**Type:** Core | **Source:** atlas

`Sky Savings Rate` is defined in [A.3.1.2.2 - Sky Savings Rate](2674cccb-d779-4868-b83f-8cb86648c88a).

---

#### A.5.4.1.3.1: Restricted Features

**Type:** Core | **Source:** atlas

The features that must be restricted from being displayed or described to users flagged for Limited Filtering are:

• Staking Rewards

• Sky Savings Rate

• Any other feature related to yield or rewards.

---

#### A.6.1.1.1.1: Introduction

**Type:** Core | **Source:** atlas

Spark is an Agent focused on building on USDS in the Ethereum and adjacent DeFi ecosystem. This includes driving adoption of USDS and deploying collateral backing USDS at attractive risk-adjusted returns. Spark does this through the Spark Liquidity Layer, SparkLend, and Spark Savings.

- The Spark Liquidity Layer directly provides USDS, sUSDS, and USDC liquidity across networks and DeFi markets.
- SparkLend is a lending market focused on USDS borrowing, sourcing liquidity directly from Sky to provide the best borrow rates for USDS.
- Spark Savings enables stablecoin holders to earn the best risk-adjusted rate in DeFi, at large scale, with minimal liquidity constraints.

---

#### A.6.1.1.1.2.5.2.2.1.1.7: Integration Boost Savings Rate Adjustment Strategy

**Type:** Core | **Source:** atlas

The Integration Boost is calculated based on per block values for USDS in Aave and the Sky Savings Rate.

---

#### A.6.1.1.1.2.6.1.1.2.1.5.1: Ethereum Mainnet - Fluid sUSDS ERC4626 Vault Instance Configuration Document Location

**Type:** Core | **Source:** atlas

This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.6.1.3.1.5.1 - Ethereum Mainnet - Fluid sUSDS ERC4626 Vault Instance Configuration Document](8da18a0c-2d5a-4895-ac53-804578b00a5b).

---

#### A.6.1.1.1.2.6.1.1.2.1.9.1: Ethereum Mainnet - Curve sUSDS/USDT Pool Instance Configuration Document Location

**Type:** Core | **Source:** atlas

This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.6.1.3.1.7.1 - Ethereum Mainnet - Curve sUSDS/USDT Pool Instance Configuration Document](4e840dad-944c-4c45-9c5e-277dcb1830a8).

---

#### A.6.1.1.1.2.6.1.1.2.2.2.1: Base - Fluid sUSDS ERC4626 Vault Instance Configuration Document Location

**Type:** Core | **Source:** atlas

This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.6.1.3.2.2.1 - Base Mainnet - Fluid sUSDS ERC4626 Vault Instance Configuration Document](b955e881-1ad7-479f-9858-efebe8e23bdc).

---

#### A.6.1.1.1.2.6.1.1.2.3.1.1: Arbitrum - Fluid sUSDS ERC4626 Vault Instance Configuration Document Location

**Type:** Core | **Source:** atlas

This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.6.1.3.3.1.1 - Arbitrum - Fluid sUSDS ERC4626 Vault Instance Configuration Document](e6a55c76-91f7-4503-9349-b082c762ec76).

---

#### A.6.1.1.1.2.6.1.2.1.1.3.2.5: Base sUSDS Deposit Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be deposited into the PSM (`LIMIT_PSM_DEPOSIT_SUSDS`) is specified in the document herein.
• `maxAmount` (sUSDS): Unlimited
• `slope` (sUSDS/ day): Unlimited

---

#### A.6.1.1.1.2.6.1.2.1.1.3.2.6: Base sUSDS Withdrawal Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be withdrawn from the PSM (`LIMIT_PSM_WITHDRAW_SUSDS`) is specified in the document herein.
• `maxAmount` (sUSDS): max
• `slope` (sUSDS/ day): 0

---

#### A.6.1.1.1.2.6.1.2.1.1.3.3.5: Arbitrum sUSDS Deposit Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be deposited into the PSM (`LIMIT_PSM_DEPOSIT_SUSDS`) is specified in the document herein.
• `maxAmount` (USDS worth of sUSDS): 10,000,000
• `slope` (USDS worth of sUSDS): 5,000,000

---

#### A.6.1.1.1.2.6.1.2.1.1.3.3.6: Arbitrum sUSDS Withdrawal Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be withdrawn from the PSM (`LIMIT_PSM_WITHDRAW_SUSDS`) is specified in the document herein.
• `maxAmount` (sUSDS): Unlimited

---

#### A.6.1.1.1.2.6.1.2.1.1.3.4.5: Unichain sUSDS Deposit Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be deposited into the PSM (`LIMIT_PSM_DEPOSIT_SUSDS`) is specified in the document herein.
• `maxAmount` (USDS worth of sUSDS): Unlimited
• `slope` (USDS worth of sUSDS): Unlimited

---

#### A.6.1.1.1.2.6.1.2.1.1.3.4.6: Unichain sUSDS Withdrawal Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be withdrawn from the PSM (`LIMIT_PSM_WITHDRAW_SUSDS`) is specified in the document herein.
• `maxAmount` (sUSDS): Unlimited

---

#### A.6.1.1.1.2.6.1.2.1.1.3.5.5: Optimism sUSDS Deposit Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be deposited into the PSM (`LIMIT_PSM_DEPOSIT_SUSDS`) is specified in the document herein.
• `maxAmount` (USDS worth of sUSDS): Unlimited
• `slope` (USDS worth of sUSDS): Unlimited

---

#### A.6.1.1.1.2.6.1.2.1.1.3.5.6: Optimism sUSDS Withdrawal Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be withdrawn from the PSM (`LIMIT_PSM_WITHDRAW_SUSDS`) is specified in the document herein.
• `maxAmount` (sUSDS): Unlimited

---

#### A.6.1.1.1.2.6.1.3.1.5.1: Ethereum Mainnet - Fluid sUSDS ERC4626 Vault Instance Configuration Document

**Type:** Core | **Source:** atlas

The documents herein contain the Instance Configuration Document for the Fluid sUSDS ERC4626 Instance.

---

#### A.6.1.1.1.2.6.1.3.1.5.1.2: Parameters

**Type:** Core | **Source:** atlas

The documents herein define the parameters of the Fluid sUSDS ERC4626 Vault Instance of the Allocation System Primitive.

---

#### A.6.1.1.1.2.6.1.3.1.5.1.2.1.3: Asset Supplied By SLL

**Type:** Core | **Source:** atlas

sUSDS

---

#### A.6.1.1.1.2.6.1.3.1.5.1.2.1.4: Token

**Type:** Core | **Source:** atlas

fsUSDS

---

#### A.6.1.1.1.2.6.1.3.1.5.1.2.4.1: Inflow Rate Limits

**Type:** Core | **Source:** atlas

The inflow rate limits are:
• `maxAmount`: 10,000,000 sUSDS
• `slope`: 5,000,000 sUSDS per day

---

#### A.6.1.1.1.2.6.1.3.1.5.1.2.4.2: Outflow Rate Limits

**Type:** Core | **Source:** atlas

The outflow rate limits are:
• `maxAmount`: 10,000,000 fsUSDS
• `slope`: 5,000,000 fsUSDS per day

---

#### A.6.1.1.1.2.6.1.3.1.7.1: Ethereum Mainnet - Curve sUSDS/USDT Pool Instance Configuration Document

**Type:** Core | **Source:** atlas

The documents herein contain the Instance Configuration Document for the Curve sUSDS/USDT Pool Instance.

---

#### A.6.1.1.1.2.6.1.3.1.7.1.2: Parameters

**Type:** Core | **Source:** atlas

The documents herein define the parameters of the Curve sUSDS/USDT Pool Instance of the Allocation System Primitive.

---

#### A.6.1.1.1.2.6.1.3.1.7.1.2.1.4: Token

**Type:** Core | **Source:** atlas

sUSDSUSDT

---

#### A.6.1.1.1.2.6.1.3.2.2.1: Base Mainnet - Fluid sUSDS ERC4626 Vault Instance Configuration Document

**Type:** Core | **Source:** atlas

The documents herein contain the Instance Configuration Document for the Fluid sUSDS ERC4626 Instance.

---

#### A.6.1.1.1.2.6.1.3.2.2.1.2: Parameters

**Type:** Core | **Source:** atlas

The documents herein define the parameters of the Fluid sUSDS ERC4626 Vault Instance of the Allocation System Primitive.

---

#### A.6.1.1.1.2.6.1.3.2.2.1.2.1.3: Asset Supplied By SLL

**Type:** Core | **Source:** atlas

sUSDS

---

#### A.6.1.1.1.2.6.1.3.2.2.1.2.1.4: Token

**Type:** Core | **Source:** atlas

fsUSDS

---

#### A.6.1.1.1.2.6.1.3.2.2.1.2.4.2: Outflow Rate Limits

**Type:** Core | **Source:** atlas

The outflow rate limits are:
• `maxAmount`: 10,000,000 fsUSDS
• `slope`: 5,000,000 fsUSDS per day

---

#### A.6.1.1.1.2.6.1.3.3.1.1: Arbitrum - Fluid sUSDS ERC4626 Vault Instance Configuration Document

**Type:** Core | **Source:** atlas

The documents herein contain the Instance Configuration Document for the Fluid sUSDS ERC4626 Instance.

---

#### A.6.1.1.1.2.6.1.3.3.1.1.2: Parameters

**Type:** Core | **Source:** atlas

The documents herein define the parameters of the Fluid sUSDS ERC4626 Vault Instance of the Allocation System Primitive.

---

#### A.6.1.1.1.2.6.1.3.3.1.1.2.1.3: Asset Supplied By SLL

**Type:** Core | **Source:** atlas

sUSDS

---

#### A.6.1.1.1.2.6.1.3.3.1.1.2.1.4: Token

**Type:** Core | **Source:** atlas

fsUSDS

---

#### A.6.1.1.1.2.6.1.3.3.1.1.2.4.2: Outflow Rate Limits

**Type:** Core | **Source:** atlas

The outflow rate limits are:
• `maxAmount`: 10,000,000 fsUSDS
• `slope`: 5,000,000 fsUSDS per day

---

#### A.6.1.1.1.3.2.1.1.1.3: Interest Rate Model Definition

**Type:** Core | **Source:** atlas

The Interest Rate Model (”IRM”) is defined by four main parameters:

1. Base Rate - the starting rate at 0% utilization,

2. Variable Slope 1 - the rate at optimal utilization,

3. Variable Slope 2 - the rate at 100% utilization,

4. Utilization - the utilization itself.

The Base Rate, Slope 1, and Slope 2 parameters are further defined in: [A.6.1.1.1.3.2.1.1.1.13 - Base Rate Definition](9372deb9-5115-4010-bf72-34023b846525); [A.6.1.1.1.3.2.1.1.1.15 - Slope 1 Definition](c16b2b24-d663-4877-8bb3-cbd32e977360); and [A.6.1.1.1.3.2.1.1.1.17 - Slope 2 Definition](56bc7808-5ef8-42af-ba17-708b995194cc).

All markets except Dai use this IRM. The IRM for Dai is independent of utilization and is defined as a spread over the Sky Savings Rate set forth in [A.3.1.2.2 - Sky Savings Rate](2674cccb-d779-4868-b83f-8cb86648c88a). The spread is determined by the Stability Facilitators, in consultation with the Core Council Risk Advisor.

---

#### A.6.1.1.1.3.2.1.1.2.17: sUSDS Risk Parameters

**Type:** Core | **Source:** atlas

The current sUSDS risk parameters are:

• LTV: 79%

• Liquidation Threshold: 80%

• E-mode Category: USD

• Liquidation Bonus: 5%

• Reserve Factor: 10%

• Supply Cap: 50,000,000 sUSDS

• Borrow Cap: 0 sUSDS

• Optimal Utilization: 80%

• Isolated Debt Ceiling: N/A

• Base Rate: 0%

• Slope 1: 2%

• Slope 2: 300%

• Reserve State: Active

• Collateral: Yes

• Borrowing: No

• Isolated Collateral: No

• Isolated Borrowing: No

• Siloed Borrowing: No

---

#### A.6.1.1.1.3.2.1.1.2.2: Dai Risk Parameters

**Type:** Core | **Source:** atlas

The current Dai risk parameters are:

• LTV: 0%

• Liquidation Threshold: 0.01%

• E-mode Category: N/A

• Liquidation Bonus: 4.5%

• Reserve Factor: 10%

• Supply Cap: N/A

• Borrow Cap: N/A

• Optimal Utilization: 80%

• Isolated Debt Ceiling: N/A

• Base Rate: 0%

• Slope 1: SSR + 1.25%

• Slope 2: 15%

• Reserve State: Active

• Collateral: Yes

• Borrowing: Yes

• Isolated Collateral: No

• Isolated Borrowing: Yes

• Siloed Borrowing: No

• Flash Loan Enabled: Yes

The Dai Borrow Rate is set through the Interest Rate Model as a spread over the Sky Savings Rate. The spread is set directly by the Stability Facilitators in consultation with the Core Council Risk Advisor.

---

#### A.6.1.1.1.3.2.1.1.2.3: USDS Risk Parameters

**Type:** Core | **Source:** atlas

The current USDS risk parameters are:

• LTV: 0%

• Liquidation Threshold: 0%

• E-mode Category: N/A

• Liquidation Bonus: 0%

• Reserve Factor: 10%

• Supply Cap: Unlimited

• Borrow Cap: Unlimited

• Optimal Utilization: 80%

• Isolated Debt Ceiling: N/A

• Base Rate: 0%

• Slope 1: SSR + 1.25%

• Slope 2: 15%

• Reserve State: Active

• Collateral: Yes

• Borrowing: Yes

• Isolated Collateral: No

• Isolated Borrowing: Yes

• Siloed Borrowing: No

• Flash Loan Enabled: Yes.

The USDS Borrow Rate is set through the Interest Rate Model as a spread over the Sky Savings Rate. The spread is set directly by the Stability Facilitators in consultation with the Core Council Risk Advisor.

---

#### A.6.1.1.1.3.2.1.1.3.2.9: SparkLend Cap Automator sUSDS Parameters

**Type:** Core | **Source:** atlas

The current sUSDS cap automator parameters are:

• Supply cap

    ◦ `gap`: 50 millions sUSDS

    ◦ `ttl`: 12 hours

    ◦ `max`: 500 million sUSDS

• Borrow cap

    ◦ `gap`: N/A

    ◦ `ttl`: N/A

    ◦ `max`: N/A

---

#### A.6.1.1.1.3.2.2.1.1: Conditions For The Pre-launch Token Rewards

**Type:** Core | **Source:** atlas

Spark has a pre-launch token rewards program based on the usage of its lending platform. Users of the platform will receive an airdrop of SPK tokens, depending on how much and how long they have used the platform during the pre-launch token reward period. These rewards are only for users on Ethereum Mainnet.

There are two seasons of the Spark pre-launch token rewards: Season 1 and Season 2.

Season 1 of pre-launch token rewards was active from August 20 2023 and lasted for nine months, ending on May 20 2024. 130,434,783 SPK tokens were allocated in this period.

In Season 2 14,478,261 SPK will be rewarded per month to SparkLend users who qualify for the airdrop.

Season 2 is an additional pre-farming period, which runs until the Spark Agent launches as part of Sky Endgame launch season.

The monthly SPK rewards are allocated as follows:
◦ 80 % is allocated to users borrowing DAI and/or USDS
◦ 20 % is allocated to users supplying ETH

The proposed full anti-cheat SPK Airdrop for SparkLend is calculated using the following formula:

`Airdrop = 80% * (DAI Borrows + USDS Borrows - sDAI Supplies * sDAI Liquidation Threshold - sUSDS Supplies * sUSDS Liquidation Threshold) + 20% * (ETH Supplies - ETH Borrows / ETH Liquidation Threshold)`

All supplies and borrows are denominated in USD based on the on-chain oracle price at that block to determine the conversion.

---

#### A.6.1.1.1.3.5.3.2.1: Definition

**Type:** Core | **Source:** atlas

The Spark Savings Rewards Rate specifies the yield paid out to depositors on their supplied capital, expressed as an annual percentage rate. The Rewards Rate configuration for each vault may be set as a fixed value, or via reference to external benchmarks such as the Sky Savings Rate, Secured Overnight Funding Rate, SparkLend market supply rates, or other relevant measures.

---

#### A.6.1.1.1.3.5.3.2.3.1: Spark Savings USDC on Ethereum

**Type:** Core | **Source:** atlas

The Rewards Rate for Spark Savings USDC on Ethereum will be maintained to be equal to the Sky Savings Rate.

---

#### A.6.1.1.1.3.5.3.2.3.2: Spark Savings USDT on Ethereum

**Type:** Core | **Source:** atlas

The Rewards Rate for Spark Savings USDT on Ethereum will be maintained to be equal to the Sky Savings Rate.

---

#### A.6.1.1.1.3.5.3.2.3.4: Spark Savings USDC on Avalanche

**Type:** Core | **Source:** atlas

The Rewards Rate for Spark Savings USDC on Avalanche will be maintained to be equal to the Sky Savings Rate.

---

#### A.6.1.1.3.2.5.2.2.1.1.7: Integration Boost Savings Rate Adjustment Strategy

**Type:** Core | **Source:** atlas

The Integration Boost is calculated based on per block values for USDS in Kamino and the Sky Savings Rate.

---

#### A.6.1.1.3.2.5.2.2.2.1.7: Integration Boost Savings Rate Adjustment Strategy

**Type:** Core | **Source:** atlas

The Integration Boost is calculated based on per block values for USDS in Drift and the Sky Savings Rate.

---

#### A.6.1.1.3.2.5.2.2.3.1.7: Integration Boost Savings Rate Adjustment Strategy

**Type:** Core | **Source:** atlas

The Integration Boost is calculated based on per block values for USDS in Save and the Sky Savings Rate.

---

#### A.6.1.1.3.2.5.2.2.4.1.7: Integration Boost Savings Rate Adjustment Strategy

**Type:** Core | **Source:** atlas

The Integration Boost is calculated based on per block values for USDS in Lifinity and the Sky Savings Rate.

---

#### A.6.1.1.3.2.5.2.3.1.1.7: Integration Boost Savings Rate Adjustment Strategy

**Type:** Core | **Source:** atlas

The Integration Boost is calculated based on per block values for USDS in MarginFi and the Sky Savings Rate.

---

#### A.6.1.1.4.2.5.1.2.5.1.2: Tracking Methodology

**Type:** Core | **Source:** atlas

This Instance uses the Tracking Methodology specified in [A.2.3.8.1.2.1.2.2.2 - Ethereum Mainnet CoW Swap Tracking Methodology](1b5cc0ee-0ee8-467e-ab49-33c06ad417dc). Specifically, on-chain Settlement Events on the CoW Swap settlement contract ([https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41](https://etherscan.io/address/0x9008D19f58AAbD9eD0D60971565AA8510560ab41)) are checked for where they coincide perfectly with USDS deposit transactions into sUSDS.

---

#### A.6.1.1.4.2.5.2.2.1.1.7: Integration Boost Savings Rate Adjustment Strategy

**Type:** Core | **Source:** atlas

The Integration Boost is calculated based on per block values for USDS in Euler and the Sky Savings Rate.

---

#### A.6.1.1.4.2.5.2.4.1.2.7: Integration Boost Savings Rate Adjustment Strategy

**Type:** Core | **Source:** atlas

The Integration Boost is calculated based on per block values for USDS in Compound and the Sky Savings Rate.

---

#### A.6.1.1.4.3.2.2: Integration Boost Strategy

**Type:** Core | **Source:** atlas

Launch Agent 3’s strategy with respect to the Integration Boost Primitive is to deliver a “Sky Savings Rate” (or similar program) to USDS users across selected DeFi platforms. This approach aims to extend the reach of USDS by tapping into fresh communities and expanding its overall market presence. New collaborations should exhibit compatibility with Launch Agent 3’s accessibility ethos, showcase steady on-chain activity, and present clear opportunities to onboard broader user segments into the Launch Agent 3 ecosystem.

The guiding criteria are as follows:

- **Long-Term Viability: **Target platforms must exhibit strong on-chain activity and a track record of stability.
- **Aligned Incentives:** Collaborations should offer meaningful yield enhancements that support the broader Sky mission.
- **Growth Potential:** Partners must show clear prospects for sustainable scaling, ensuring that users can benefit from ongoing improvements.

---

#### A.6.1.1.5.2.6.1.2.1.1.3.1.2: Ethereum Mainnet sUSDS

**Type:** Core | **Source:** atlas

The maximum deposit and withdraw amounts for sUSDS on Ethereum Mainnet are located herein.

---

#### A.6.1.1.5.2.6.1.2.1.1.3.1.2.1: Ethereum Mainnet sUSDS Deposit Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be deposited (`LIMIT_4626_DEPOSIT`) is specified in the document herein.

• `maxAmount`: This parameter will be specified in a future iteration of the Launch Agent 4 Artifact.
• `slope`: This parameter will be specified in a future iteration of the Launch Agent 4 Artifact.

---

#### A.6.1.1.5.2.6.1.2.1.1.3.1.2.2: Ethereum Mainnet sUSDS Withdrawal Maximum

**Type:** Core | **Source:** atlas

The maximum amount of sUSDS that can be withdrawn (`LIMIT_4626_WITHDRAW`) is specified in the document herein.

• `maxAmount`: This parameter will be specified in a future iteration of the Launch Agent 4 Artifact.
• `slope`: This parameter will be specified in a future iteration of the Launch Agent 4 Artifact.

---

### Bridging (41 sections)

> Token bridging and cross-chain operations

#### A.1.13.3.4.1: Role Of Executor Agents

**Type:** Core | **Source:** atlas

In situations requiring interaction with the Sky Protocol, Prime Agents themselves do not carry out the tasks needed to implement the relevant strategies. Instead, Prime Agents rely on Executor Agents to operationalize these processes, including bridging capital, verifying on-chain data and generating reports, and preparing off-chain votes for Prime Agent token holders to update their Artifact.

---

#### A.1.9.3.2.14: Ethereum LayerZero Freezer Multisig

**Type:** Core | **Source:** atlas

The Ethereum LayerZero Freezer Multisig (see[A.1.9.4.1.3.1.1 - Ethereum LayerZero Freezer Multisig](21fa6749-6209-4280-9b5f-b2a73d400421)) can freeze LayerZero bridges deployed in the Sky Ecosystem without the need for inclusion in a Spell through the standard Executive Vote process.

Each action executed by the multisig, including any function calls and their parameters, must be reported to the Sky community within a reasonable time frame through a post on the Sky Forum. Such actions include activating or disabling the freeze function.

---

#### A.1.9.3.2.15: Solana LayerZero Freezer Multisig

**Type:** Core | **Source:** atlas

The Solana LayerZero Freezer Multisig (see[A.1.9.4.1.3.1.2 - Solana LayerZero Freezer Multisig](8e618196-257a-49d8-834d-665dba345fcd)) can freeze the Solana LayerZero bridge without the need for inclusion in a Spell through the standard Executive Vote process.

Each action executed by the multisig, including any function calls and their parameters, must be reported to the Sky community within a reasonable time frame through a post on the Sky Forum. Such actions include activating or disabling the freeze function.

---

#### A.1.9.4.1: Solana LayerZero Bridge

**Type:** Core | **Source:** atlas

Sky uses a LayerZero bridge to securely move assets between Ethereum Mainnet and Solana, as well as to provide governance controls for Sky-issued tokens on Solana. Additional details regarding the Solana LayerZero Bridge will be specified in a future iteration of the Atlas.

---

#### A.1.9.4.1.2: Deployment

**Type:** Core | **Source:** atlas

The Solana LayerZero Bridge will be deployed in two phases. The first phase will occur in the November 13th Executive Vote and the second phase will occur in a subsequent Out-Of-Schedule Executive Vote. The timing and contents of these phases may be modified by the Core Facilitator in consultation with relevant Ecosystem Actors.

---

#### A.1.9.4.1.3: Security Parameters

**Type:** Core | **Source:** atlas

The documents herein define the security parameters of the Solana LayerZero bridge.

---

#### A.1.9.4.1.3.1: Freezer Multisigs

**Type:** Core | **Source:** atlas

The documents herein define two freezer multisigs that have the ability to freeze the Solana LayerZero Bridge from either the Ethereum Mainnet or Solana sides, respectively.

---

#### A.1.9.4.1.3.1.1: Ethereum LayerZero Freezer Multisig

**Type:** Core | **Source:** atlas

The Ethereum LayerZero Freezer Multisig has the ability to freeze the Solana LayerZero Bridge from the Ethereum Mainnet.

---

#### A.1.9.4.1.3.1.1.1: Ethereum LayerZero Freezer Multisig Address

**Type:** Core | **Source:** atlas

The address of the Ethereum LayerZero Freezer Multisig on the Ethereum Mainnet is `0x38d1114b4cE3e079CC0f627df6aC2776B5887776`.

---

#### A.1.9.4.1.3.1.1.2: Ethereum LayerZero Freezer Multisig Required Number Of Signers

**Type:** Core | **Source:** atlas

The Ethereum LayerZero Freezer Multisig has a 2/4 signing requirement.

---

#### A.1.9.4.1.3.1.1.3: Ethereum LayerZero Freezer Multisig Signers

**Type:** Core | **Source:** atlas

The signers of the Ethereum LayerZero Freezer Multisig are two (2) addresses controlled by the Core Facilitator and two (2) addresses controlled by Core GovOps.

---

#### A.1.9.4.1.3.1.1.4: Ethereum LayerZero Freezer Multisig Usage Standards

**Type:** Core | **Source:** atlas

The Ethereum LayerZero Freezer Multisig can only be used in urgent or emergency situations (e.g., potential code exploits). Such situations are characterized by the fact that 1) they have the potential to harm the Sky Ecosystem or its users; and 2) the preparation time required for an Executive Vote would leave the ecosystem vulnerable to harm (e.g., an exploit).

The multisig should be used to prevent technical vulnerabilities; prevent unwanted functionality of the smart contracts or corresponding parts of the system (e.g., price oracles); or prevent unwanted usage of the smart contracts or corresponding parts of the system which deviates from intended behavior.

The Core Council must ensure that use of the multisig is generally aligned and specifically accords with these requirements.

---

#### A.1.9.4.1.3.1.1.5: Ethereum LayerZero Freezer Multisig Modification

**Type:** Core | **Source:** atlas

The Core Facilitator and Core GovOps can change the signers of the Ethereum LayerZero Freezer Multisig so long as:

    ◦ there are four (4) signers;

    ◦ two (2) signers are required to execute transactions; and

    ◦ an equal number of signers are controlled by the Core Facilitator and Core GovOps.

---

#### A.1.9.4.1.3.1.2: Solana LayerZero Freezer Multisig

**Type:** Core | **Source:** atlas

The Solana LayerZero Freezer Multisig will be specified in a future iteration of the Atlas.

---

#### A.1.9.4.1.3.1.2.1: Solana LayerZero Freezer Multisig Address

**Type:** Core | **Source:** atlas

The address of the Solana LayerZero Freezer Multisig on Solana is `5hARLsT1VA2AmuGL2AXUeSyyFG6o2Fcpb9S6aKXNsbeK`.

---

#### A.1.9.4.1.3.1.2.2: Solana LayerZero Freezer Multisig Required Number Of Signers

**Type:** Core | **Source:** atlas

The Solana LayerZero Freezer Multisig has a 2/4 signing requirement.

---

#### A.1.9.4.1.3.1.2.4: Solana LayerZero Freezer Multisig Usage Standards

**Type:** Core | **Source:** atlas

The Solana LayerZero Freezer Multisig can only be used in urgent or emergency situations (e.g., potential code exploits). Such situations are characterized by the fact that 1) they have the potential to harm the Sky Ecosystem or its users; and 2) the preparation time required for an Executive Vote would leave the ecosystem vulnerable to harm (e.g., an exploit).

The multisig should be used to prevent technical vulnerabilities; prevent unwanted functionality of the smart contracts or corresponding parts of the system (e.g., price oracles); or prevent unwanted usage of the smart contracts or corresponding parts of the system which deviates from intended behavior.

The Core Council must ensure that use of the multisig is generally aligned and specifically accords with these requirements.

---

#### A.1.9.4.1.3.2: Rate Limits

**Type:** Core | **Source:** atlas

The documents herein define the rate limits for the Solana LayerZero Bridge.

---

#### A.1.9.4.1.3.2.1: Rate Limit Accounting

**Type:** Core | **Source:** atlas

The Solana LayerZero Bridge uses net accounting.

Net accounting means that the rate limit applies to the net amount of tokens transferred from one side of the bridge to the other. For example, if 25,000,000 USDS were transferred from Ethereum Mainnet to Solana and 15,000,000 USDS were transferred from Solana to Ethereum Mainnet, the net amount transferred would be 10,000,000 USDS.

---

#### A.1.9.4.1.3.2.2: Rate Limit

**Type:** Core | **Source:** atlas

The Solana LayerZero Bridge currently has a rate limit of 10,000,000 USDS per day. This limit should be gradually increased over time as the bridge becomes more mature.

The rate limit for the Solana LayerZero Bridge may be modified by the Core Facilitator, in consultation with the Core Council Risk Advisor, through the Operational Weekly Cycle. Such modifications can be effected directly via an Executive Vote, without requiring a prior Governance Poll.

---

#### A.1.9.4.1.3.3: Validators

**Type:** Core | **Source:** atlas

The documents herein specify the selection and configuration of validators for the Solana LayerZero Bridge.

---

#### A.1.9.4.1.3.3.2: Governance Bridge

**Type:** Core | **Source:** atlas

The documents herein specify the selection and configuration of validators for the Governance Bridge component of the Solana LayerZero Bridge.

---

#### A.1.9.4.1.3.3.2.1: Validators

**Type:** Core | **Source:** atlas

The validators for the Governance Bridge are LayerZero, Nethermind, Canary, Deutsche Telekom, P2P, Horizon, and Luganodes.

---

#### A.2.3.9.1.1.2.1.1: Initial Concept And Feasibility Discussions

**Type:** Core | **Source:** atlas

The Prime Agent identifies a yield opportunity on a target chain that can exceed the Base Rate. The Prime Agent estimates Required Risk Capital (RRC) and Asset Liability Management requirements associated with the opportunity and evaluates options for fulfilling them. The Prime Agent also considers exchange and bridging costs, if applicable. Based on this, the Prime Agent develops a net yield target for the opportunity factoring in all of these costs. The output of this step is an internal meeting note summarizing the idea as well as estimates of Required Risk Capital, Asset Liability Management, and exchange / bridging costs.

---

#### A.2.3.9.1.1.3.2.1.2.3.1: Mandate and Rationale

**Type:** Core | **Source:** atlas

Prime Agents are required to periodically submit TRC Reports to Core GovOps. This report serves a dual purpose. It provides a verifiable snapshot of the Prime Agent's TRC composition and key capital ratios as of the end of the reporting period; and second, it provides a formal attestation regarding the Prime Agent's maintenance of TRC at or above its dynamically changing Aggregate Required Risk Capital (RRC) throughout the entire reporting period. See [A.3.2.1.1.2 - Aggregate RRC](6aed5cc1-9671-4b73-88a9-fdd86ac93ece).

This comprehensive reporting, encompassing both an end-of-period statement and disclosures of any intra-period events affecting TRC, is essential. On-chain data alone (such as that captured by the planned OVRC system) cannot definitively prove the full eligibility and unimpaired availability of a Prime Agent's capital position for continuous RRC coverage, nor can it capture all off-chain factors. These factors include, but are not limited to, whether assets are subject to Prime-initiated off-chain contractual pledges, if the economic value or redeemability of its bridged assets is compromised by issues with their originating bridge, or if its assets are encumbered by derivative structures or other off-chain commitments that would impair their immediate use at any point during the period.

The TRC Report serves as an important basis for Core GovOps’ verification procedures. This entails: 1) reconciling reported end-of-period TRC components against the Sky Atlas, on-chain data, and other relevant sources to validate the period-end capital position and adherence to Atlas-defined capital requirements; and 2) reviewing Prime Agents’ attestations and disclosures regarding its TRC management and any material events throughout the reporting period to assess continuous compliance with its dynamically changing Aggregate RRC. The outcome of this validation is a critical input for the monthly settlement cycles, which latter includes the determination and retroactive application of penalties for any identified discrepancies or violations of capital requirements during the period.

The long-term vision is for the Powerhouse system to enable the automation of TRC data aggregation and verification. The Powerhouse system will have capabilities such as directly querying Prime Agent SubProxy accounts for IJRC assets, programmatically accessing and interpreting Ecosystem Accords recorded in the Atlas, interfacing with TEJRC and OSRC smart contract systems, and automatically applying Atlas-defined eligibility rules. See [A.2.3.9.1.1.3.2.1.3.1 - Continuous Monitoring Of On-chain Verifiable Risk Capital (OVRC)](8048bdf0-84b7-4546-8f1a-98b62d073c84). Even in this advanced state, the TRC Report, or a similar form of periodic attestation, may remain necessary to cover elements of TRC verification that are not fully able to be automated or require explicit Prime Agent declaration.

---

#### A.2.3.9.1.1.3.2.1.2.3.2: TRC Report Contents

**Type:** Core | **Source:** atlas

The Total Risk Capital (TRC) Report submitted by a Prime Agent must provide an accurate and verifiable breakdown of all TRC components held by the Prime Agent as of the end of the specified reporting period. The TRC Report should include the following essential information:

◦ Aggregate TRC Value As of End of Period: The total declared value in USD of all eligible TRC components held by the Prime Agent as of the end of the reporting period.

◦ Detailed Breakdown of TRC Components As of End of Period: For each category of TRC held, the report must detail the following values as of the end of the reporting period:
◦ Internal Junior Risk Capital (IJRC): The total amount of IJRC, a breakdown of its constituent asset types, and their respective values in USD.
◦ Prime-External Junior Risk Capital (SEJRC): The total amount of SEJRC. For each portion of SEJRC sourced from another Prime Agent, the report must include the amount in USD, the identifier of the counterparty Prime Agent, the expiry date of the arrangement, and a direct reference to the Ecosystem Accord that governs the SEJRC arrangement.
◦ Tokenized External Junior Risk Capital (TEJRC): The total amount of TEJRC. For each TEJRC source, the report must include the amount in USD, the identifier of the TEJRC smart contract or facility and any relevant encumbrance identifier.
◦ Originated Senior Risk Capital (OSRC): The total amount of OSRC. The report must specify the amount originated directly by the Prime Agent from the Total Senior Risk Capital (TSRC) pool and any amount of OSRC rented from other Prime Agents. For any rented OSRC, the report must include the amount in USD, the identifier of the counterparty Prime Agent, the expiry date, and a direct reference to the pertinent Ecosystem Accord.
◦ Key Ratio Inputs and Computed Totals (Prime Internal Calculation) As Of End Of Period: Based on the component values reported above (as of the end of the reporting period), the report must include key figures used in and resulting from the Prime Agent's internal capital adequacy calculations. These figures reflect the capital structure and ratios as of the end of the reporting period and include:
• Internal Junior Risk Capital (IJRC)
• External Junior Risk Capital (EJRC) generated via External Per Internal Ratio (Prime External Junior Risk Capital + Tokenized External Junior Risk Capital sourced via the EPI ratio still carries Senior Per Junior or SPJ capacity)
• EJRC-via-SPJ (sourced by spending SPJ capacity; zero-SPJ-capacity thereafter)
• Enabled Senior Risk Capital (SRC)
• Total Senior Per Junior capacity
◦ Allocation of SPJ capacity to 1) enable SRC; or to 2) source EJRC
• Prime-computed eligible Total Risk Capital (IJRC + EJRC-via-EPI + EJRC-via-SPJ + enabled SRC)
• Official Aggregate RRC
• Capital buffer = TRC – Aggregate RRC
• Effective ratios
◦ EPI = EJRC-via-EPI ÷ IJRC
◦ SPJ utilisation:
◦ enabled SRC ÷ total SPJ capacity
◦ EJRC-via-SPJ ÷ total SPJ capacity  
◦ Dynamic Period Attestation and Disclosures: In addition to the end-of-period snapshot figures, the TRC Report must include an Attestation from the Prime Agent confirming it maintained TRC at or above its Aggregate RRC at all times throughout the entire reporting period. In addition, the TRC Report must include disclosure of any events, Prime-initiated off-chain contractual obligations, impairments to the value or redeemability of held assets (such as RWA backing or bridged asset viability), encumbrances, or other conditions that occurred at any point during the reporting period which materially affected its TRC, even if such conditions were temporary or not continuously visible to on-chain monitoring systems. This disclosure must include the nature of the event/condition, its precise timing and duration, and its quantified impact on the Prime Agent's TRC.

---

#### A.2.3.9.1.2.6: List Of Allocation Instances

**Type:** Core | **Source:** atlas

If the Allocation System Primitive is Activated, then the Prime Agent Artifact must list each active Allocation Instance, grouped by blockchain. For each blockchain, the Prime Agent Artifact must specify: (1) the name of the blockchain, (2) the bridging mechanism for the blockchain, if any, (3) the allocation buffer on the blockchain, and (4) the Allocation Instances on the blockchain. For each Allocation Instance, the Prime Agent Artifact must contain the information specified herein.

---

#### A.3.2.1.1.5.1: Definition

**Type:** Core | **Source:** atlas

Smart Contract Risk refers to the risk that an investment through the Allocation System will experience a loss of funds due to a bug or technical exploit. This risk may arise from the protocol invested in or other aspects of the investment such as bridging requirements.

---

#### A.3.2.1.2.1: Total Risk Capital Definition

**Type:** Core | **Source:** atlas

Total Risk Capital is capital that is currently eligible, available, and verifiably under the Prime’s control. For capital to be included in a Prime Agent's TRC, it must be currently deployable towards covering its Required Risk Capital obligations. Consequently, in-flight capital (e.g., assets being bridged) does not contribute towards a Prime’s TRC. Similarly, commitments for future capital, such as Ecosystem Accords for renting Prime-External Junior Risk Capital (SEJRC) or Tokenized External Junior Risk Capital (TEJRC) that have been agreed upon by counterparties but are not yet formally codified within the Atlas, cannot contribute towards a Prime’s TRC until such formalization is complete.

---

#### A.3.2.2.1.1.1.5.3.2: Restrictions On Investments On Plume

**Type:** Core | **Source:** atlas

Investments on Plume are subject to the following restrictions:

• Assets other than RWAs on Plume or being bridged to Plume require 100% Instance Total CRR; and

• Total investments on Plume may not exceed 125 million USDS.

---

#### A.3.3.2.4.1: Peg Defense Event Definition

**Type:** Core | **Source:** atlas

A Peg Defense Event is a situation where the average price of USDS on DEXes that are connected via LayerZero falls below 0.999 USD per USDS.

---

#### A.3.3.2.4.1.1: Peg Defense Event Alert Tool

**Type:** Core | **Source:** atlas

The Core Council Risk Advisor, in consultation with Core GovOps, will develop a tool that calculates the average price of USDS on DEXes that are connected via LayerZero in real time. This tool must be made available to all Prime Agents and functionality must be developed that notifies Sky and Prime Agents in real time when a Peg Defense Event has been triggered.

---

#### A.6.1.1.1.2.6.1.2.2.1.2.1.2.5: Bridging Functions

**Type:** Core | **Source:** atlas

The documents herein define the operations performed by an operator to bridge liquidity between Ethereum Mainnet and the destination blockchains for the Spark Liquidity Layer.

---

#### A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.1.2: Check RateLimits

**Type:** Core | **Source:** atlas

The operator must ensure the bridging transaction complies with `RateLimits`. The `LIMIT_USDC_TO_CCTP` parameter enforces a rate limit on total USDC transferred via CCTP. The `LIMIT_USDC_TO_DOMAIN` parameter enforces a rate limit on USDC transferred to a specific `destinationDomain`.

`rateLimited(LIMIT_USDC_TO_CCTP, usdcAmount)
        rateLimited(
            RateLimitHelpers.makeDomainKey(LIMIT_USDC_TO_DOMAIN, destinationDomain),
            usdcAmount
        )`

---

#### A.6.1.1.1.2.6.1.2.2.1.2.2.2.4: Bridging Functions

**Type:** Core | **Source:** atlas

The documents herein define the operations that are performed to bridge liquidity between the destination blockchain and Ethereum Mainnet for the Spark Liquidity Layer.

---

#### A.6.1.1.1.2.6.1.2.2.3.3: Bridge Liquidity From L2 ALM Proxy To Mainnet

**Type:** Core | **Source:** atlas

The documents herein define the actions that should be performed by an operator if there is a need to bring all liquidity from the Spark ALM Proxy on the destination domain to the Spark ALM Proxy on Ethereum Mainnet.

---

#### A.6.1.1.4.3.2.1: Distribution Reward Strategy

**Type:** Core | **Source:** atlas

Launch Agent 3’s strategy with respect to the Distribution Reward Primitive is to encourage the broad adoption of USDS by bridging into new communities and DeFi platforms, thereby earning and distributing Distribution Rewards for USDS balances facilitated through its frontend. Prospective partners should demonstrate strong alignment with Launch Agent 3’s mission, and offer clear pathways to engage new user bases and support the sustainable growth of USDS across diverse ecosystems.

The guiding criteria are as follows:

- **Shared Mission Alignment:** Partners must demonstrate a commitment to promoting user-friendly stablecoin usage and responsible financial empowerment.
- **Clear Synergy:** The collaboration should enhance USDS accessibility, by offering either a unique distribution channel or a robust incentive model.
- **Community Benefit**: Proposed partnerships should deliver tangible rewards or advantages that resonate with Sky’s user base.
- **Scalability & Compliance: **Potential integrations should have the capacity to handle increased demand and adhere to the risk management guidelines described in the Atlas.

---

#### A.6.1.1.5.2.6.1.2.2.1.2.1.1.2: Set LayerZero Recipient

**Type:** Core | **Source:** atlas

The documents herein define the steps for an admin to specify which address should receive LayerZero messages on a particular destination endpoint.

---

#### A.6.1.1.5.2.6.1.2.2.1.2.1.1.2.1: Call setLayerZeroRecipient Function

**Type:** Core | **Source:** atlas

Only an operator with the admin role is able to set the LayerZero recipient for a destination endpoint. To do so, they must call the `setLayerZeroRecipient` function on the Controller contract on mainnet, providing the destination endpoint ID and the recipient address. Calling this function will carry out the following actions:

• The contract will confirm the admin status of the operator. If the caller does not have the admin role, the transaction will revert.

• The contract will set the selected LayerZero recipient for the specified destination endpoint.

• The contract will emit a `LayerZeroRecipientSet` event to the blockchain logs.

The function call is as follows:

`function setLayerZeroRecipient(uint32 destinationEndpointId, bytes32 layerZeroRecipient) external`

---

#### A.6.1.1.5.2.6.1.2.2.1.2.1.2.6.3: Transfer Token Via LayerZero

**Type:** Core | **Source:** atlas

The documents herein define the steps for a relayer to `transfer` a token via LayerZero to a destination endpoint, with the assets sent according to the configured recipient.

---

#### A.6.1.1.5.2.6.1.2.2.1.2.1.2.6.3.1: Call transferTokenLayerZero Function

**Type:** Core | **Source:** atlas

Only an operator with the relayer role can transfer tokens via LayerZero. To do so, they must call the `transferTokenLayerZero` function on the Controller contract on mainnet, providing the oftAddress, amount, and destinationEndpointId (payable for native fees). The operation will only succeed if the ALM Proxy holds sufficient tokens and fees; otherwise, the transaction will revert. Calling this function will carry out the following actions:

• The contract will confirm the relayer status of the operator. If the caller does not have the relayer role, the transaction will revert.

• The contract will ensure the transfer amount is within the allowed rate limit (built from LIMIT_LAYERZERO_TRANSFER, oftAddress, and destinationEndpointId).

• If approval is required, the contract will approve the token for the oftAddress.

• The contract will build LayerZero send options and a SendParam struct with destination details, amount, and recipient from layerZeroRecipients.

• The contract will quote the OFT receipt to set the minimum amount received.

• The contract will quote the messaging fee and execute the send via proxy.doCallWithValue, passing the fee value.

The function call is as follows:

`function transferTokenLayerZero(address oftAddress, uint256 amount, uint32  destinationEndpointId) external payable`

---

## Appendix: Complete Node Reference

| Doc No                            | Name                                                         | Type    | Tags                     |
| --------------------------------- | ------------------------------------------------------------ | ------- | ------------------------ |
| A.0.1.1.33                        | Skylink                                                      | Core    | skylink, susds           |
| A.0.1.1.37                        | Unrewarded USDS                                              | Core    | susds                    |
| A.1.13.3.4.1                      | Role Of Executor Agents                                      | Core    | bridging                 |
| A.1.9.3.2.14                      | Ethereum LayerZero Freezer Multisig                          | Core    | bridging                 |
| A.1.9.3.2.15                      | Solana LayerZero Freezer Multisig                            | Core    | bridging                 |
| A.1.9.4.1                         | Solana LayerZero Bridge                                      | Core    | bridging                 |
| A.1.9.4.1.1                       | Introduction                                                 | Core    | skylink, bridging        |
| A.1.9.4.1.2                       | Deployment                                                   | Core    | bridging                 |
| A.1.9.4.1.3                       | Security Parameters                                          | Core    | bridging                 |
| A.1.9.4.1.3.1                     | Freezer Multisigs                                            | Core    | bridging                 |
| A.1.9.4.1.3.1.1                   | Ethereum LayerZero Freezer Multisig                          | Core    | bridging                 |
| A.1.9.4.1.3.1.1.1                 | Ethereum LayerZero Freezer Multisig Address                  | Core    | bridging                 |
| A.1.9.4.1.3.1.1.2                 | Ethereum LayerZero Freezer Multisig Required Number Of Signe | Core    | bridging                 |
| A.1.9.4.1.3.1.1.3                 | Ethereum LayerZero Freezer Multisig Signers                  | Core    | bridging                 |
| A.1.9.4.1.3.1.1.4                 | Ethereum LayerZero Freezer Multisig Usage Standards          | Core    | bridging                 |
| A.1.9.4.1.3.1.1.5                 | Ethereum LayerZero Freezer Multisig Modification             | Core    | bridging                 |
| A.1.9.4.1.3.1.2                   | Solana LayerZero Freezer Multisig                            | Core    | bridging                 |
| A.1.9.4.1.3.1.2.1                 | Solana LayerZero Freezer Multisig Address                    | Core    | bridging                 |
| A.1.9.4.1.3.1.2.2                 | Solana LayerZero Freezer Multisig Required Number Of Signers | Core    | bridging                 |
| A.1.9.4.1.3.1.2.3                 | Solana LayerZero Freezer Multisig Signers                    | Core    | keel, bridging           |
| A.1.9.4.1.3.1.2.4                 | Solana LayerZero Freezer Multisig Usage Standards            | Core    | bridging                 |
| A.1.9.4.1.3.1.2.5                 | Solana LayerZero Freezer Multisig Modification               | Core    | keel, bridging           |
| A.1.9.4.1.3.2                     | Rate Limits                                                  | Core    | bridging                 |
| A.1.9.4.1.3.2.1                   | Rate Limit Accounting                                        | Core    | bridging                 |
| A.1.9.4.1.3.2.2                   | Rate Limit                                                   | Core    | bridging                 |
| A.1.9.4.1.3.3                     | Validators                                                   | Core    | bridging                 |
| A.1.9.4.1.3.3.1                   | Token Bridge                                                 | Core    | skylink, bridging        |
| A.1.9.4.1.3.3.1.1                 | Validators                                                   | Core    | skylink, bridging        |
| A.1.9.4.1.3.3.1.2                 | Quorum Requirement                                           | Core    | skylink, bridging        |
| A.1.9.4.1.3.3.2                   | Governance Bridge                                            | Core    | bridging                 |
| A.1.9.4.1.3.3.2.1                 | Validators                                                   | Core    | bridging                 |
| A.1.9.4.1.3.3.2.2                 | Quorum Requirement                                           | Core    | skylink, bridging        |
| A.2.3.1.3.1                       | Primitive Instance Status Definition                         | Core    | skylink                  |
| A.2.3.1.3.2.1                     | Active Instance Status                                       | Core    | skylink, bridging        |
| A.2.3.1.5.1                       | Current Primitives                                           | Core    | skylink                  |
| A.2.3.7                           | SkyLink Primitives                                           | Section | skylink                  |
| A.2.3.7.1                         | Token SkyLink Primitive                                      | Core    | skylink, susds, bridging |
| A.2.3.7.1.1                       | Token SkyLink Process Definition                             | Core    | skylink                  |
| A.2.3.7.1.1.1                     | Token SkyLink Setup Process Definition                       | Core    | skylink                  |
| A.2.3.7.1.1.1.1                   | Token SkyLink Setup Real World Agreements And Planning       | Core    | skylink                  |
| A.2.3.7.1.1.1.1.1                 | Token SkyLink Setup Target Chain Identification And Feasibil | Core    | skylink, bridging        |
| A.2.3.7.1.1.1.1.2                 | Token SkyLink Setup Initial Alignment With Operational GovOp | Core    | skylink, bridging        |
| A.2.3.7.1.1.1.1.3                 | Token SkyLink Setup Audit Preparation And Proposal Of Costs  | Core    | skylink, bridging        |
| A.2.3.7.1.1.1.2                   | Token SkyLink Setup Codification and Validation              | Core    | skylink                  |
| A.2.3.7.1.1.1.2.1                 | Agent Inputs                                                 | Core    | skylink                  |
| A.2.3.7.1.1.1.2.3                 | Official Update of Artifact                                  | Core    | skylink                  |
| A.2.3.7.1.1.1.3                   | Token SkyLink Setup Deployment                               | Core    | skylink                  |
| A.2.3.7.1.1.1.3.1                 | Token SkyLink Setup Bridge Deployment And Initial Audit      | Core    | skylink, bridging        |
| A.2.3.7.1.1.1.3.2                 | Token SkyLink Setup Activation On New Chain                  | Core    | skylink, bridging        |
| A.2.3.7.1.1.2                     | Token SkyLink Ongoing Management                             | Core    | skylink                  |
| A.2.3.7.1.1.2.1                   | Token SkyLink Management Settlement Cycle                    | Core    | skylink, bridging        |
| A.2.3.7.1.2                       | Token SkyLink Input Requirements                             | Core    | skylink                  |
| A.2.3.7.1.2.1                     | Token SkyLink Activation Status                              | Core    | skylink                  |
| A.2.3.7.1.2.2                     | List of Active Token SkyLink Deployments                     | Core    | skylink, bridging        |
| A.2.3.8.1.1.1                     | Purpose                                                      | Core    | susds                    |
| A.2.3.8.1.2.1.2.2.1               | Ethereum Mainnet General Tracking Methodology                | Core    | susds                    |
| A.2.3.8.1.2.1.2.2.3               | Base Tracking Methodology                                    | Core    | susds                    |
| A.2.3.8.1.2.1.3                   | Distribution Reward Rate                                     | Core    | susds                    |
| A.2.3.8.1.2.1.3.1.3               | Limitations                                                  | Core    | susds                    |
| A.2.3.8.1.2.1.4.2                 | Reward Payment                                               | Core    | susds                    |
| A.2.3.8.1.2.4.1.1.2               | Process Flow                                                 | Core    | susds                    |
| A.2.3.8.1.2.4.1.1.3               | Required Primitive Inputs                                    | Core    | susds                    |
| A.2.3.8.2.1.1                     | Purpose                                                      | Core    | susds                    |
| A.2.3.8.2.2.1.1                   | Integration Boost Partners                                   | Core    | susds                    |
| A.2.3.8.2.2.3.1.2                 | Process Flow                                                 | Core    | susds                    |
| A.2.3.8.2.2.3.1.3                 | Required Primitive Inputs                                    | Core    | susds                    |
| A.2.3.8.2.2.3.2.2                 | Process Flow                                                 | Core    | susds                    |
| A.2.3.8.2.2.4.1.1.2               | Process Flow                                                 | Core    | susds                    |
| A.2.3.8.3.1.3                     | Pioneer Prime Benefits                                       | Core    | susds, bridging          |
| A.2.3.8.3.1.4                     | Pioneer Incentive Pool                                       | Core    | susds                    |
| A.2.3.9.1.1.2.1.1                 | Initial Concept And Feasibility Discussions                  | Core    | bridging                 |
| A.2.3.9.1.1.3.2.1.2.2             | Minimum Capabilities of Prime TRC Management Systems         | Core    | skylink, bridging        |
| A.2.3.9.1.1.3.2.1.2.3.1           | Mandate and Rationale                                        | Core    | bridging                 |
| A.2.3.9.1.1.3.2.1.2.3.2           | TRC Report Contents                                          | Core    | bridging                 |
| A.2.3.9.1.2.6                     | List Of Allocation Instances                                 | Core    | bridging                 |
| A.2.4.1.2.1.3.1                   | Sky Savings Rate Paid To sUSDS Holders                       | Core    | susds                    |
| A.2.4.1.2.1.3.2                   | Sky Savings Rate Paid Through Integration Boost              | Core    | susds                    |
| A.2.4.1.2.1.3.4                   | Reimbursement Rewards                                        | Core    | skylink                  |
| A.2.5.1.1                         | Operational Processes                                        | Core    | susds                    |
| A.2.5.1.2.2.1.1.1.1               | Amount Due From Sky To Primes With Respect To Distribution R | Core    | susds                    |
| A.2.9.2.1.2.4.1                   | DeFi Opportunities Right of First Refusal Duration           | Core    | skylink                  |
| A.2.9.2.1.2.4.2                   | DeFi Opportunities Complementary Deployments                 | Core    | skylink                  |
| A.2.9.2.2.2.2.3                   | Base Rate                                                    | Core    | susds                    |
| A.2.9.2.2.2.3.2.1                 | Bonus Limitation                                             | Core    | susds                    |
| A.2.9.2.2.2.7.2.1                 | Base Rate Obligation                                         | Core    | susds                    |
| A.2.9.2.3                         | Ecosystem Accord 3: Sky And Keel                             | Core    | keel                     |
| A.2.9.2.3.1.1                     | Parties To The Accord                                        | Core    | keel                     |
| A.2.9.2.3.1.1.2                   | Keel Details                                                 | Core    | keel                     |
| A.2.9.2.3.2.1                     | Transfer From Liquidity Bootstrapping Budget To Keel         | Core    | keel                     |
| A.2.9.2.3.2.1.1                   | Use Of Funds For Keel Development Expenses                   | Core    | keel                     |
| A.2.9.2.3.2.2                     | Pre-Pioneer Incentive Pool                                   | Core    | keel, susds              |
| A.3.1.2.2                         | Sky Savings Rate                                             | Core    | susds                    |
| A.3.1.2.2.1                       | Relationship To Base Rate                                    | Core    | susds                    |
| A.3.1.2.2.2                       | Sky Savings Rate Modification                                | Core    | susds                    |
| A.3.1.2.2.2.1                     | Sky Savings Rate Stability Parameter Bounded External Access | Core    | susds                    |
| A.3.1.2.3                         | Agent Rate                                                   | Core    | susds                    |
| A.3.1.2.3.1                       | Relationship To Base Rate                                    | Core    | susds                    |
| A.3.1.2.3.3                       | Treatment Of sUSDS Balances                                  | Core    | susds                    |
| A.3.1.2.3.4                       | Spark                                                        | Core    | susds                    |
| A.3.1.2.3.6                       | Settlement                                                   | Core    | susds                    |
| A.3.2.1.1.5.1                     | Definition                                                   | Core    | bridging                 |
| A.3.2.1.2.1                       | Total Risk Capital Definition                                | Core    | bridging                 |
| A.3.2.1.2.2.1.1.3                 | Tokenized External Junior Risk Capital (TEJRC)               | Core    | susds                    |
| A.3.2.2.1.1.1.5.3.2               | Restrictions On Investments On Plume                         | Core    | bridging                 |
| A.3.2.2.1.1.1.6.1                 | Near-Term Treatment                                          | Core    | susds                    |
| A.3.2.2.4.2.3.3.1                 | Sky Spread                                                   | Core    | susds                    |
| A.3.3.2.2.3                       | Near Term Exemption For Keel                                 | Core    | keel                     |
| A.3.3.2.4.1                       | Peg Defense Event Definition                                 | Core    | bridging                 |
| A.3.3.2.4.1.1                     | Peg Defense Event Alert Tool                                 | Core    | bridging                 |
| A.3.7.1.2                         | Stability Parameter Bounded External Access Module           | Core    | susds                    |
| A.3.7.1.5.5                       | Genesis Agents                                               | Core    | keel                     |
| A.4.1.1.1.1                       | Gnosis Payment                                               | Core    | susds                    |
| A.4.2                             | SkyLink                                                      | Article | skylink                  |
| A.4.2.1                           | Multichain Support Native Mechanisms                         | Section | skylink, susds           |
| A.4.3                             | Savings Rate And Token Reward Mechanism                      | Article | susds                    |
| A.4.3.1                           | Savings Rates                                                | Section | susds                    |
| A.4.3.2.1                         | SKY Token Rewards                                            | Core    | susds                    |
| A.4.4.1                           | SKY Staking                                                  | Section | skylink                  |
| A.4.4.1.3.2                       | stUSDS Rate                                                  | Core    | susds                    |
| A.4.4.1.3.2.1.1                   | Sky Savings Rate Definition                                  | Core    | susds                    |
| A.4.4.1.3.5.2                     | SKY Borrow Minimum Rate                                      | Core    | susds                    |
| A.4.4.1.3.5.2.1.1                 | Sky Savings Rate Definition                                  | Core    | susds                    |
| A.5.4.1.3.1                       | Restricted Features                                          | Core    | susds                    |
| A.6.1.1.1.1                       | Introduction                                                 | Core    | susds                    |
| A.6.1.1.1.2.4                     | SkyLink Primitives                                           | Core    | skylink                  |
| A.6.1.1.1.2.4.1                   | Token SkyLink Primitive                                      | Core    | skylink                  |
| A.6.1.1.1.2.4.1.1                 | Primitive Hub Document                                       | Core    | skylink                  |
| A.6.1.1.1.2.4.1.1.2               | Active Instances Directory                                   | Core    | skylink                  |
| A.6.1.1.1.2.4.1.1.3               | Completed Instances Directory                                | Core    | skylink                  |
| A.6.1.1.1.2.4.1.1.4               | In Progress Invocations Directory                            | Core    | skylink                  |
| A.6.1.1.1.2.4.1.1.5.1             | Archived Invocations/Instances                               | Core    | skylink                  |
| A.6.1.1.1.2.4.1.1.5.1.1           | Failed Invocations                                           | Core    | skylink                  |
| A.6.1.1.1.2.4.1.1.5.1.2           | Suspended Instances                                          | Core    | skylink                  |
| A.6.1.1.1.2.4.1.2                 | Active Instances                                             | Core    | skylink                  |
| A.6.1.1.1.2.4.1.3                 | Completed Instances                                          | Core    | skylink                  |
| A.6.1.1.1.2.4.1.4                 | In Progress Invocations                                      | Core    | skylink                  |
| A.6.1.1.1.2.5.2.2.1.1.7           | Integration Boost Savings Rate Adjustment Strategy           | Core    | susds                    |
| A.6.1.1.1.2.6.1.1.2.1.5.1         | Ethereum Mainnet - Fluid sUSDS ERC4626 Vault Instance Config | Core    | susds                    |
| A.6.1.1.1.2.6.1.1.2.1.9.1         | Ethereum Mainnet - Curve sUSDS/USDT Pool Instance Configurat | Core    | susds                    |
| A.6.1.1.1.2.6.1.1.2.2.2.1         | Base - Fluid sUSDS ERC4626 Vault Instance Configuration Docu | Core    | susds                    |
| A.6.1.1.1.2.6.1.1.2.3.1.1         | Arbitrum - Fluid sUSDS ERC4626 Vault Instance Configuration  | Core    | susds                    |
| A.6.1.1.1.2.6.1.2.1.1.3.1.4.1     | USDC Mainnet ALM Proxy Circle Cross-Chain Transfer Protocol  | Core    | skylink, bridging        |
| A.6.1.1.1.2.6.1.2.1.1.3.2.5       | Base sUSDS Deposit Maximum                                   | Core    | susds                    |
| A.6.1.1.1.2.6.1.2.1.1.3.2.6       | Base sUSDS Withdrawal Maximum                                | Core    | susds                    |
| A.6.1.1.1.2.6.1.2.1.1.3.2.7.1     | USDC Base ALM Proxy Circle Cross-Chain Transfer Protocol Max | Core    | skylink, bridging        |
| A.6.1.1.1.2.6.1.2.1.1.3.3.5       | Arbitrum sUSDS Deposit Maximum                               | Core    | susds                    |
| A.6.1.1.1.2.6.1.2.1.1.3.3.6       | Arbitrum sUSDS Withdrawal Maximum                            | Core    | susds                    |
| A.6.1.1.1.2.6.1.2.1.1.3.4.5       | Unichain sUSDS Deposit Maximum                               | Core    | susds                    |
| A.6.1.1.1.2.6.1.2.1.1.3.4.6       | Unichain sUSDS Withdrawal Maximum                            | Core    | susds                    |
| A.6.1.1.1.2.6.1.2.1.1.3.5.5       | Optimism sUSDS Deposit Maximum                               | Core    | susds                    |
| A.6.1.1.1.2.6.1.2.1.1.3.5.6       | Optimism sUSDS Withdrawal Maximum                            | Core    | susds                    |
| A.6.1.1.1.2.6.1.2.1.1.3.6.3.1     | USDC Avalanche ALM Proxy Circle Cross-Chain Transfer Protoco | Core    | skylink, bridging        |
| A.6.1.1.1.2.6.1.2.2.1.2           | Controller Functions                                         | Core    | skylink, bridging        |
| A.6.1.1.1.2.6.1.2.2.1.2.1.1.1     | Set The Mint Recipient                                       | Core    | skylink                  |
| A.6.1.1.1.2.6.1.2.2.1.2.1.2.5     | Bridging Functions                                           | Core    | bridging                 |
| A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.1   | Bridge USDC Using Circle Cross-Chain Transfer Protocol       | Core    | skylink, bridging        |
| A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.1.2 | Check RateLimits                                             | Core    | bridging                 |
| A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.1.5 | Approve Contract Spend                                       | Core    | skylink                  |
| A.6.1.1.1.2.6.1.2.2.1.2.1.2.5.2   | Bridge USDS / sUSDS Using OP Token Bridge                    | Core    | skylink, susds, bridging |
| A.6.1.1.1.2.6.1.2.2.1.2.2         | Foreign Controller Contract Functions                        | Core    | skylink                  |
| A.6.1.1.1.2.6.1.2.2.1.2.2.1.1     | Set The Mint Recipient                                       | Core    | skylink                  |
| A.6.1.1.1.2.6.1.2.2.1.2.2.2.4     | Bridging Functions                                           | Core    | bridging                 |
| A.6.1.1.1.2.6.1.2.2.1.2.2.2.4.1   | Bridge USDC Using Circle Cross-Chain Transfer Protocol       | Core    | skylink, bridging        |
| A.6.1.1.1.2.6.1.2.2.1.2.2.2.4.2   | Bridge USDS / sUSDS using OP Token Bridge                    | Core    | skylink, susds, bridging |
| A.6.1.1.1.2.6.1.2.2.3.3           | Bridge Liquidity From L2 ALM Proxy To Mainnet                | Core    | bridging                 |
| A.6.1.1.1.2.6.1.2.2.3.3.1         | USDC Bridging Action                                         | Core    | skylink, bridging        |
| A.6.1.1.1.2.6.1.2.2.3.3.2         | USDS and sUSDS Bridging Action                               | Core    | susds, bridging          |
| A.6.1.1.1.2.6.1.3.1.5.1           | Ethereum Mainnet - Fluid sUSDS ERC4626 Vault Instance Config | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.1.5.1.2         | Parameters                                                   | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.1.5.1.2.1.3     | Asset Supplied By SLL                                        | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.1.5.1.2.1.4     | Token                                                        | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.1.5.1.2.4.1     | Inflow Rate Limits                                           | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.1.5.1.2.4.2     | Outflow Rate Limits                                          | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.1.7.1           | Ethereum Mainnet - Curve sUSDS/USDT Pool Instance Configurat | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.1.7.1.2         | Parameters                                                   | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.1.7.1.2.1.4     | Token                                                        | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.2.2.1           | Base Mainnet - Fluid sUSDS ERC4626 Vault Instance Configurat | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.2.2.1.2         | Parameters                                                   | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.2.2.1.2.1.3     | Asset Supplied By SLL                                        | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.2.2.1.2.1.4     | Token                                                        | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.2.2.1.2.4.2     | Outflow Rate Limits                                          | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.3.1.1           | Arbitrum - Fluid sUSDS ERC4626 Vault Instance Configuration  | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.3.1.1.2         | Parameters                                                   | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.3.1.1.2.1.3     | Asset Supplied By SLL                                        | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.3.1.1.2.1.4     | Token                                                        | Core    | susds                    |
| A.6.1.1.1.2.6.1.3.3.1.1.2.4.2     | Outflow Rate Limits                                          | Core    | susds                    |
| A.6.1.1.1.3.2.1.1.1.3             | Interest Rate Model Definition                               | Core    | susds                    |
| A.6.1.1.1.3.2.1.1.2.17            | sUSDS Risk Parameters                                        | Core    | susds                    |
| A.6.1.1.1.3.2.1.1.2.2             | Dai Risk Parameters                                          | Core    | susds                    |
| A.6.1.1.1.3.2.1.1.2.3             | USDS Risk Parameters                                         | Core    | susds                    |
| A.6.1.1.1.3.2.1.1.3.2.9           | SparkLend Cap Automator sUSDS Parameters                     | Core    | susds                    |
| A.6.1.1.1.3.2.2.1.1               | Conditions For The Pre-launch Token Rewards                  | Core    | susds                    |
| A.6.1.1.1.3.5.3.2.1               | Definition                                                   | Core    | susds                    |
| A.6.1.1.1.3.5.3.2.3.1             | Spark Savings USDC on Ethereum                               | Core    | susds                    |
| A.6.1.1.1.3.5.3.2.3.2             | Spark Savings USDT on Ethereum                               | Core    | susds                    |
| A.6.1.1.1.3.5.3.2.3.4             | Spark Savings USDC on Avalanche                              | Core    | susds                    |
| A.6.1.1.2.2.4                     | SkyLink Primitives                                           | Core    | skylink                  |
| A.6.1.1.2.2.4.1                   | Token SkyLink Primitive                                      | Core    | skylink                  |
| A.6.1.1.2.2.4.1.1                 | Primitive Hub Document                                       | Core    | skylink                  |
| A.6.1.1.2.2.4.1.1.2               | Active Instances Directory                                   | Core    | skylink                  |
| A.6.1.1.2.2.4.1.1.3               | Completed Instances Directory                                | Core    | skylink                  |
| A.6.1.1.2.2.4.1.1.4               | In Progress Invocations Directory                            | Core    | skylink                  |
| A.6.1.1.2.2.4.1.1.5.1             | Archived Invocations/Instances                               | Core    | skylink                  |
| A.6.1.1.2.2.4.1.1.5.1.1           | Failed Invocations                                           | Core    | skylink                  |
| A.6.1.1.2.2.4.1.1.5.1.2           | Suspended Instances                                          | Core    | skylink                  |
| A.6.1.1.2.2.4.1.2                 | Active Instances                                             | Core    | skylink                  |
| A.6.1.1.2.2.4.1.3                 | Completed Instances                                          | Core    | skylink                  |
| A.6.1.1.2.2.4.1.4                 | In Progress Invocations                                      | Core    | skylink                  |
| A.6.1.1.2.2.6.1.2.1.1.3.1.5       | USDC Mainnet ALM Proxy Circle Cross-Chain Transfer Protocol  | Core    | skylink, bridging        |
| A.6.1.1.2.2.6.1.2.1.1.3.2.2       | USDC Avalanche ALM Proxy Circle Cross-Chain Transfer Protoco | Core    | skylink, bridging        |
| A.6.1.1.2.2.6.1.2.1.1.3.2.3       | USDC Ethereum Mainnet ALM Proxy Circle Cross-Chain Transfer  | Core    | skylink, bridging        |
| A.6.1.1.2.2.6.1.2.1.1.3.3.2       | USDC Base ALM Proxy Circle Cross-Chain Transfer Protocol Max | Core    | skylink, bridging        |
| A.6.1.1.2.2.6.1.2.1.1.3.3.3       | USDC Base ALM Proxy Circle Cross-Chain Transfer Protocol Max | Core    | skylink, bridging        |
| A.6.1.1.2.2.6.1.2.2.1.2           | Controller Functions                                         | Core    | skylink, bridging        |
| A.6.1.1.2.2.6.1.2.2.1.2.1.1.1     | Set The Mint Recipient                                       | Core    | skylink                  |
| A.6.1.1.3                         | Keel                                                         | Core    | keel                     |
| A.6.1.1.3.1                       | Introduction                                                 | Core    | keel, susds              |
| A.6.1.1.3.2                       | Sky Primitives                                               | Core    | keel                     |
| A.6.1.1.3.2.1                     | Genesis Primitives                                           | Core    | keel                     |
| A.6.1.1.3.2.1.1                   | Agent Creation Primitive                                     | Core    | keel                     |
| A.6.1.1.3.2.1.1.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.1.1.3.1.1.1           | Name                                                         | Core    | keel                     |
| A.6.1.1.3.2.1.1.3.1.1.2           | SubProxy Account                                             | Core    | keel                     |
| A.6.1.1.3.2.1.1.3.1.1.3           | Genesis Account                                              | Core    | keel                     |
| A.6.1.1.3.2.1.2                   | Prime Transformation Primitive                               | Core    | keel                     |
| A.6.1.1.3.2.1.2.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.1.2.3.1.1.1           | Agent Type                                                   | Core    | keel                     |
| A.6.1.1.3.2.1.3                   | Executor Transformation Primitive                            | Core    | keel                     |
| A.6.1.1.3.2.1.3.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.1.4                   | Agent Token Primitive                                        | Core    | keel                     |
| A.6.1.1.3.2.1.4.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.1.4.2.1.1.1           | Token Name                                                   | Core    | keel                     |
| A.6.1.1.3.2.1.4.2.1.1.2           | Token Symbol                                                 | Core    | keel                     |
| A.6.1.1.3.2.1.4.2.1.1.3           | Genesis Supply                                               | Core    | keel                     |
| A.6.1.1.3.2.1.4.2.1.1.4           | Token Address                                                | Core    | keel                     |
| A.6.1.1.3.2.1.4.2.1.1.5           | Token Admin                                                  | Core    | keel                     |
| A.6.1.1.3.2.1.4.2.1.1.6           | Token Emissions                                              | Core    | keel                     |
| A.6.1.1.3.2.1.4.2.1.2             | Operational Process Definition                               | Core    | keel                     |
| A.6.1.1.3.2.2                     | Operational Primitives                                       | Core    | keel                     |
| A.6.1.1.3.2.2.1                   | Executor Accord Primitive                                    | Core    | keel                     |
| A.6.1.1.3.2.2.1.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.2.2                   | Root Edit Primitive                                          | Core    | keel                     |
| A.6.1.1.3.2.2.2.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2             | Operational Process Definition                               | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2.1           | Routine Protocol                                             | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2.1.1         | Root Edit Proposal Submission                                | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2.1.1.2       | Short-Term Transitionary Measures                            | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2.1.2         | Root Edit Expert Advisor Review                              | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2.1.4         | Root Edit Token Holder Vote                                  | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2.1.6         | Artifact Edit Restrictions                                   | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2.2           | Non-Routine Protocol                                         | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2.3           | Emergency Protocol                                           | Core    | keel                     |
| A.6.1.1.3.2.2.2.2.1.2.3.1         | Root Edit Voting Process in Urgent and Emergency Situations  | Core    | keel                     |
| A.6.1.1.3.2.2.3                   | Light Agent Primitive                                        | Core    | keel                     |
| A.6.1.1.3.2.2.3.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.3                     | Ecosystem Upkeep Primitives                                  | Core    | keel                     |
| A.6.1.1.3.2.3.1                   | Distribution Requirement Primitive                           | Core    | keel                     |
| A.6.1.1.3.2.4                     | SkyLink Primitives                                           | Core    | skylink                  |
| A.6.1.1.3.2.4.1                   | Token SkyLink Primitive                                      | Core    | skylink                  |
| A.6.1.1.3.2.4.1.1                 | Primitive Hub Document                                       | Core    | skylink                  |
| A.6.1.1.3.2.4.1.1.2               | Active Instances Directory                                   | Core    | skylink                  |
| A.6.1.1.3.2.4.1.1.3               | Completed Instances Directory                                | Core    | skylink                  |
| A.6.1.1.3.2.4.1.1.4               | In Progress Invocations Directory                            | Core    | skylink                  |
| A.6.1.1.3.2.4.1.1.5.1             | Archived Invocations/Instances                               | Core    | skylink                  |
| A.6.1.1.3.2.4.1.1.5.1.1           | Failed Invocations                                           | Core    | skylink                  |
| A.6.1.1.3.2.4.1.1.5.1.2           | Suspended Instances                                          | Core    | skylink                  |
| A.6.1.1.3.2.4.1.2                 | Active Instances                                             | Core    | skylink                  |
| A.6.1.1.3.2.4.1.3                 | Completed Instances                                          | Core    | skylink                  |
| A.6.1.1.3.2.4.1.4                 | In Progress Invocations                                      | Core    | skylink                  |
| A.6.1.1.3.2.5.2.2.1.1.7           | Integration Boost Savings Rate Adjustment Strategy           | Core    | susds                    |
| A.6.1.1.3.2.5.2.2.2.1.7           | Integration Boost Savings Rate Adjustment Strategy           | Core    | susds                    |
| A.6.1.1.3.2.5.2.2.3.1.7           | Integration Boost Savings Rate Adjustment Strategy           | Core    | susds                    |
| A.6.1.1.3.2.5.2.2.4.1.7           | Integration Boost Savings Rate Adjustment Strategy           | Core    | susds                    |
| A.6.1.1.3.2.5.2.2.4.2.1           | Routine Protocol                                             | Core    | keel                     |
| A.6.1.1.3.2.5.2.2.4.2.1.1         | Agent Customizations                                         | Core    | keel                     |
| A.6.1.1.3.2.5.2.3.1.1.7           | Integration Boost Savings Rate Adjustment Strategy           | Core    | susds                    |
| A.6.1.1.3.2.5.2.3.1.2.1           | Routine Protocol                                             | Core    | keel                     |
| A.6.1.1.3.2.5.2.3.1.2.1.1         | Agent Customizations                                         | Core    | keel                     |
| A.6.1.1.3.2.5.3                   | Pioneer Chain Primitive                                      | Core    | keel                     |
| A.6.1.1.3.2.5.3.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.6                     | Supply Side Stablecoin Primitives                            | Core    | keel                     |
| A.6.1.1.3.2.6.1                   | Allocation System Primitive                                  | Core    | keel                     |
| A.6.1.1.3.2.6.1.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.6.2                   | Junior Risk Capital Rental Primitive                         | Core    | keel                     |
| A.6.1.1.3.2.6.2.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.6.3                   | Asset Liability Management Rental Primitive                  | Core    | keel                     |
| A.6.1.1.3.2.6.3.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.2.7                     | Core Governance Primitives                                   | Core    | keel                     |
| A.6.1.1.3.2.7.1                   | Core Governance Reward Primitive                             | Core    | keel                     |
| A.6.1.1.3.2.7.1.1                 | Primitive Hub Document                                       | Core    | keel                     |
| A.6.1.1.3.3.1.2                   | Sky Ecosystem Emergency Response                             | Core    | keel                     |
| A.6.1.1.3.3.1.3                   | Agent-Specific Emergency Response                            | Core    | keel                     |
| A.6.1.1.3.3.2                     | Use Of Idle Funds                                            | Core    | keel                     |
| A.6.1.1.3.3.3                     | Ecosystem Accords                                            | Core    | keel                     |
| A.6.1.1.3.3.3.1                   | Ecosystem Accord 3                                           | Core    | keel                     |
| A.6.1.1.4.2.4                     | SkyLink Primitives                                           | Core    | skylink                  |
| A.6.1.1.4.2.4.1                   | Token SkyLink Primitive                                      | Core    | skylink                  |
| A.6.1.1.4.2.4.1.1                 | Primitive Hub Document                                       | Core    | skylink                  |
| A.6.1.1.4.2.4.1.1.2               | Active Instances Directory                                   | Core    | skylink                  |
| A.6.1.1.4.2.4.1.1.3               | Completed Instances Directory                                | Core    | skylink                  |
| A.6.1.1.4.2.4.1.1.4               | In Progress Invocations Directory                            | Core    | skylink                  |
| A.6.1.1.4.2.4.1.1.5.1             | Archived Invocations/Instances                               | Core    | skylink                  |
| A.6.1.1.4.2.4.1.1.5.1.1           | Failed Invocations                                           | Core    | skylink                  |
| A.6.1.1.4.2.4.1.1.5.1.2           | Suspended Instances                                          | Core    | skylink                  |
| A.6.1.1.4.2.4.1.2                 | Active Instances                                             | Core    | skylink                  |
| A.6.1.1.4.2.4.1.3                 | Completed Instances                                          | Core    | skylink                  |
| A.6.1.1.4.2.4.1.4                 | In Progress Invocations                                      | Core    | skylink                  |
| A.6.1.1.4.2.5.1.2.5.1.2           | Tracking Methodology                                         | Core    | susds                    |
| A.6.1.1.4.2.5.2.2.1.1.7           | Integration Boost Savings Rate Adjustment Strategy           | Core    | susds                    |
| A.6.1.1.4.2.5.2.4.1.2.7           | Integration Boost Savings Rate Adjustment Strategy           | Core    | susds                    |
| A.6.1.1.4.3.2.1                   | Distribution Reward Strategy                                 | Core    | bridging                 |
| A.6.1.1.4.3.2.2                   | Integration Boost Strategy                                   | Core    | susds                    |
| A.6.1.1.5.2.4                     | SkyLink Primitives                                           | Core    | skylink                  |
| A.6.1.1.5.2.4.1                   | Token SkyLink Primitive                                      | Core    | skylink                  |
| A.6.1.1.5.2.4.1.1                 | Primitive Hub Document                                       | Core    | skylink                  |
| A.6.1.1.5.2.4.1.1.2               | Active Instances Directory                                   | Core    | skylink                  |
| A.6.1.1.5.2.4.1.1.3               | Completed Instances Directory                                | Core    | skylink                  |
| A.6.1.1.5.2.4.1.1.4               | In Progress Invocations Directory                            | Core    | skylink                  |
| A.6.1.1.5.2.4.1.1.5.1             | Archived Invocations/Instances                               | Core    | skylink                  |
| A.6.1.1.5.2.4.1.1.5.1.1           | Failed Invocations                                           | Core    | skylink                  |
| A.6.1.1.5.2.4.1.1.5.1.2           | Suspended Instances                                          | Core    | skylink                  |
| A.6.1.1.5.2.4.1.2                 | Active Instances                                             | Core    | skylink                  |
| A.6.1.1.5.2.4.1.3                 | Completed Instances                                          | Core    | skylink                  |
| A.6.1.1.5.2.4.1.4                 | In Progress Invocations                                      | Core    | skylink                  |
| A.6.1.1.5.2.6.1.2.1.1.3.1.2       | Ethereum Mainnet sUSDS                                       | Core    | susds                    |
| A.6.1.1.5.2.6.1.2.1.1.3.1.2.1     | Ethereum Mainnet sUSDS Deposit Maximum                       | Core    | susds                    |
| A.6.1.1.5.2.6.1.2.1.1.3.1.2.2     | Ethereum Mainnet sUSDS Withdrawal Maximum                    | Core    | susds                    |
| A.6.1.1.5.2.6.1.2.1.1.3.1.3.1.1   | USDC ALM Proxy Circle Cross-Chain Transfer Protocol Maximum  | Core    | skylink, bridging        |
| A.6.1.1.5.2.6.1.2.2.1.2           | Controller Functions                                         | Core    | skylink, bridging        |
| A.6.1.1.5.2.6.1.2.2.1.2.1.1.2     | Set LayerZero Recipient                                      | Core    | bridging                 |
| A.6.1.1.5.2.6.1.2.2.1.2.1.1.2.1   | Call setLayerZeroRecipient Function                          | Core    | bridging                 |
| A.6.1.1.5.2.6.1.2.2.1.2.1.2.6.3   | Transfer Token Via LayerZero                                 | Core    | bridging                 |
| A.6.1.1.5.2.6.1.2.2.1.2.1.2.6.3.1 | Call transferTokenLayerZero Function                         | Core    | bridging                 |

---

_Report generated from Atlas data using tag-based analysis._
