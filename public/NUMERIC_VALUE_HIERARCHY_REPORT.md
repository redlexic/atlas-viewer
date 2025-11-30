# NUMERIC_VALUE Hierarchical Analysis

**Total Sections with NUMERIC_VALUE:** 127

## Categories Overview

- **Token Economics**: 10 sections
- **Smart Contracts**: 5 sections
- **Asset Liability Management (ALM)**: 19 sections
- **Governance**: 14 sections
- **Operational Parameters**: 10 sections
- **Other**: 69 sections

---

## Detailed Hierarchy

### Token Economics (10 sections)

#### Supply (2 sections)

**Common Variable Types:** TOKEN_AMOUNT

**Sections:**
- **Circulating Supply Definition**
  - Variables: Generic numeric
  - Example: "For purposes of A.6.1.1.6.2.2.2.2.1.2.1.4 - Root Edit Token Holder Vote, the circulating supply of PRM tokens is equal to the total supply of PRM toke..."
  - Similarity: 80.3%

- **Genesis Supply**
  - Variables: TOKEN_AMOUNT
  - Example: "The Genesis Supply of PRM is 1 billion...."
  - Similarity: 93.7%

#### Distribution & Rewards (7 sections)

**Common Variable Types:** PERCENTAGE, RATE_VALUE

**Sections:**
- **Core Governance Reward Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instances of the Core Governance Reward Primitive. See [A.2.3.10.1 - Core Governa..."
  - Similarity: 97.6%

- **Distribution Requirement Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instance of the Distribution Requirement Primitive. See [A.2.3.6.1 - Distribution..."
  - Similarity: 97.6%

- **Distribution Reward Payments**
  - Variables: Generic numeric
  - Example: "The Distribution Reward payments for the SparkLend Instance of the Distribution Reward Primitive are defined as Active Data. 
The Active Data is updat..."
  - Similarity: 93.2%

- **Distribution Reward Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s instances of the Distribution Reward Primitive. See [A.2.3.8.1 - Distribution Rew..."
  - Similarity: 97.5%

- **Integration Partner Reward Address**
  - Variables: Generic numeric
  - Example: "The reward address for the Aave Integration Boost is `0xac140648435d03f784879cd789130F22Ef588Fcd` on the Ethereum Mainnet...."
  - Similarity: 53.8%

- **Process Definition For Buy Back And Distribution Obligation**
  - Variables: PERCENTAGE, RATE_VALUE
  - Example: "The process to buy back and distribute 0.25% of Spark’s tokens per year will be specified in future iterations of the Spark Artifact...."
  - Similarity: 94.0%

- **Reward Code**
  - Variables: Generic numeric
  - Example: "`128`...."
  - Similarity: 80.0%

#### Token Emissions (1 sections)

**Common Variable Types:** None detected

**Sections:**
- **Token Emissions**
  - Variables: Generic numeric
  - Example: "Token emissions beyond the Genesis Supply are permanently disabled; this cannot be reverted by Prysm Governance. Sky Governance retains the ability to..."
  - Similarity: 90.0%


### Smart Contracts (5 sections)

#### Contract Functions (5 sections)

**Common Variable Types:** None detected

**Sections:**
- **Admin Functions**
  - Variables: Generic numeric
  - Example: "The documents herein define the operations performed by the `DEFAULT_ADMIN_ROLE` within the `MainnetController` contract...."
  - Similarity: 100.0%

- **Controller Functions**
  - Variables: Generic numeric
  - Example: "The documents herein describe the purpose and operational use of key functions within SLL `MainnetController` and `ForeignController` contracts: USDS ..."
  - Similarity: 91.2%

- **ERC-4626 Functions**
  - Variables: Generic numeric
  - Example: "The documents herein define the general SLL operational procedures for interacting with ERC4626-compliant tokenized vaults. ERC4626 is a standard inte..."
  - Similarity: 87.4%

- **PSM Functions**
  - Variables: Generic numeric
  - Example: "The documents herein define the swap operations performed by the Spark Liquidity Layer in the PSM...."
  - Similarity: 95.9%

- **Relayer Functions**
  - Variables: Generic numeric
  - Example: "The documents herein define the operations performed by the `RELAYER_ROLE` within the `MainnetController` contract...."
  - Similarity: 100.0%


### Asset Liability Management (ALM) (19 sections)

#### Rate Limits - Inflow (1 sections)

**Common Variable Types:** CURRENCY_AMOUNT, RATE_VALUE, MAX_AMOUNT, SLOPE

**Sections:**
- **Inflow Rate Limits**
  - Variables: CURRENCY_AMOUNT, RATE_VALUE, MAX_AMOUNT, SLOPE
  - Example: "The inflow rate limits are:
• `maxAmount`: 200,000,000 USDS
• `slope`: 400,000,000 USDS per day..."
  - Similarity: 85.7%

#### Rate Limits - Outflow (4 sections)

**Common Variable Types:** MAX_AMOUNT, SLOPE

**Sections:**
- **ALM Rate Limits (Avalanche) Contract**
  - Variables: Generic numeric
  - Example: "The address of the ALM_RATE_LIMITS contract is: `TBD`..."
  - Similarity: 71.7%

- **ALM Rate Limits Contract**
  - Variables: Generic numeric
  - Example: "The address of the ALM_RATE_LIMITS contract is: `0xAc8BF0669223197ac8B94Cbb53E725e40B3919E8`..."
  - Similarity: 69.6%

- **Rate Limit Management**
  - Variables: Generic numeric
  - Example: "The documents herein define the protocol for querying, setting, and adjusting `RateLimits` for Instances using their `RateLimitID`s. The ratelimits mu..."
  - Similarity: 100.0%

- **Rate Limits**
  - Variables: MAX_AMOUNT, SLOPE
  - Example: "The current `maxAmount` and `slope` for this conduit’s inflow/outflow are defined in the subdocuments herein...."
  - Similarity: 100.0%

#### Rate Limits - Swap (2 sections)

**Common Variable Types:** PERCENTAGE, RATE_VALUE, MAX_AMOUNT, SLOPE, TOKEN_AMOUNT

**Sections:**
- **Swap Rate Limits**
  - Variables: PERCENTAGE, RATE_VALUE, MAX_AMOUNT, SLOPE, TOKEN_AMOUNT
  - Example: "The swap rate limits are:
• `maxAmount`: 5,000,000
• `slope`: 20,000,000 per day
• Max slippage: 0.15%..."
  - Similarity: 80.4%

- **USDS For USDC Swap Maximum**
  - Variables: Generic numeric
  - Example: "The maximum amount of USDS that can be swapped for USDC by the Spark Liquidity Layer in the Mainnet PSM (`LIMIT_USDS_TO_USDC`) is specified in the doc..."
  - Similarity: 92.9%

#### Rate Limits - Cross-Chain (3 sections)

**Common Variable Types:** None detected

**Sections:**
- **USDC Avalanche ALM Proxy Circle Cross-Chain Transfer Protocol Maximum**
  - Variables: Generic numeric
  - Example: "The maximum amount of USDC that can be bridged to Avalanche ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_AVALANCHE`) ..."
  - Similarity: 99.4%

- **USDC Base ALM Proxy Circle Cross-Chain Transfer Protocol Maximum**
  - Variables: Generic numeric
  - Example: "The maximum amount of USDC that can be bridged to Base ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_BASE`) is specifi..."
  - Similarity: 75.8%

- **USDC Mainnet ALM Proxy Circle Cross-Chain Transfer Protocol Maximum**
  - Variables: Generic numeric
  - Example: "The maximum amount of USDC that can be bridged to Ethereum Mainnet ALM Proxy using the Circle Cross-Chain Transfer Protocol (`LIMIT_USDC_TO_CCTP_ETH`)..."
  - Similarity: 94.3%

#### Proxy Contracts (6 sections)

**Common Variable Types:** None detected

**Sections:**
- **ALM Proxy (Avalanche) Contract**
  - Variables: Generic numeric
  - Example: "The address of the ALM_PROXY contract is: `TBD`..."
  - Similarity: 66.2%

- **ALM Proxy (Mainnet) Contract**
  - Variables: Generic numeric
  - Example: "The address of the ALM_PROXY contract is: `0x1601843c5E9bC251A3272907010AFa41Fa18347E`..."
  - Similarity: 73.3%

- **ALM Proxy Contract**
  - Variables: Generic numeric
  - Example: "The address of the ALM_PROXY contract is: `0x9B746dBC5269e1DF6e4193Bcb441C0FbBF1CeCEe`..."
  - Similarity: 62.8%

- **USDC Avalanche ALM Proxy Maximum**
  - Variables: Generic numeric
  - Example: "The maximum amount of USDC that can be sent to the Avalanche ALM Proxy (`LIMIT_USDC_TO_DOMAIN`, hashed with Avalanche domain) is specified in the docu..."
  - Similarity: 70.5%

- **USDC Base ALM Proxy Maximum**
  - Variables: Generic numeric
  - Example: "The maximum amount of USDC that can be sent to the Base ALM Proxy (`LIMIT_USDC_TO_DOMAIN`, hashed with Base domain) is specified in the document herei..."
  - Similarity: 57.2%

- **USDC Mainnet ALM Proxy Maximum**
  - Variables: Generic numeric
  - Example: "The maximum amount of USDC that can be sent to the Ethereum Mainnet ALM Proxy (`LIMIT_USDC_TO_DOMAIN`, hashed with Ethereum domain) is specified in th..."
  - Similarity: 71.4%

#### Controller Contracts (3 sections)

**Common Variable Types:** CONTRACT_VERSION

**Sections:**
- **ALM Controller Contract**
  - Variables: Generic numeric
  - Example: "The address of the ALM_CONTROLLER contract is: `0x08b045609a673996ca10fedbAFAE2395A21ba539`..."
  - Similarity: 57.4%

- **ALM Controller Contract Version**
  - Variables: CONTRACT_VERSION
  - Example: "The ALM_CONTROLLER contract version will be specified in a future iteration of the Atlas...."
  - Similarity: 57.4%

- **Mainnet Controller Contract Functions**
  - Variables: Generic numeric
  - Example: "The documents herein define the functions controlled by the Controller contract for Spark Liquidity Layer operations on Ethereum Mainnet...."
  - Similarity: 97.1%


### Governance (14 sections)

#### Multisig Configuration (10 sections)

**Common Variable Types:** MULTISIG_SIGNING_REQUIREMENT

**Sections:**
- **ALM Freezer Multisig (Avalanche) Address**
  - Variables: Generic numeric
  - Example: "The address of the Multisig that has the Freezer Role is specified in TBD...."
  - Similarity: 65.5%

- **ALM Freezer Multisig (Mainnet) Address**
  - Variables: Generic numeric
  - Example: "The address of the Multisig that has the Freezer Role is specified in [A.6.1.1.1.2.6.1.2.1.2.2.3.1 - Address](51777bdd-df5f-4a6e-93f5-8163d981f595)...."
  - Similarity: 52.0%

- **ALM Freezer Multisig Address**
  - Variables: Generic numeric
  - Example: "The address of the Multisig that has the Freezer Role is: `0xB0113804960345fd0a245788b3423319c86940e5`...."
  - Similarity: 51.2%

- **ALM Relayer Multisig (Avalanche) Address**
  - Variables: Generic numeric
  - Example: "The address of the Multisigs that has the Relayer Role will be specified in a future iteration of the artifact...."
  - Similarity: 60.7%

- **Core Operator Relayer Multisig**
  - Variables: Generic numeric
  - Example: "The Core Operator Relayer Multisig has the `RELAYER_ROLE` as defined in [A.6.1.1.1.2.6.1.2.2.1.1.2 - Relayer Role](cc2f7956-90ce-4025-9642-bfe403dc3cc..."
  - Similarity: 59.9%

- **Freezer Multisig**
  - Variables: Generic numeric
  - Example: "The Freezer Multisig has the `FREEZER_ROLE` as defined in [A.6.1.1.1.2.6.1.2.2.1.1.4 - Freezer Role](02a614ea-1d6b-4197-b39b-49de676092cb) and is cont..."
  - Similarity: 61.5%

- **Multisigs**
  - Variables: Generic numeric
  - Example: "The documents herein define multisigs that have privileged access to manage the SLL...."
  - Similarity: 89.2%

- **Prime Relayer Multisig**
  - Variables: Generic numeric
  - Example: "The Prime Relayer Multisig has the `RELAYER_ROLE` as defined in [A.6.1.1.1.2.6.1.2.2.1.1.2 - Relayer Role](cc2f7956-90ce-4025-9642-bfe403dc3ccc) and i..."
  - Similarity: 81.5%

- **Required Number Of Signers**
  - Variables: MULTISIG_SIGNING_REQUIREMENT
  - Example: "The Prime Relayer Multisig currently has a 1/2 signing requirement...."
  - Similarity: 97.0%

- **Signers**
  - Variables: Generic numeric
  - Example: "The signers of the Prime Relayer Multisig are two (2) addresses controlled by Ecosystem Actor Phoenix Labs...."
  - Similarity: 78.8%

#### Proposal Thresholds (4 sections)

**Common Variable Types:** PERCENTAGE

**Sections:**
- **Root Edit Proposal Review By Operational Facilitator**
  - Variables: Generic numeric
  - Example: "Within seven (7) days of the proposal being submitted, the Operational Facilitator must review the Root Edit Proposal for alignment.
If the proposal i..."
  - Similarity: 78.3%

- **Root Edit Proposal Submission**
  - Variables: Generic numeric
  - Example: "The Root Edit process begins with a PRM token holder submitting a proposal through the Powerhouse system containing a draft Artifact Edit Proposal. A ..."
  - Similarity: 71.2%

- **Root Edit Proposal Submission Requirements Exception**
  - Variables: PERCENTAGE
  - Example: "For proposals that solely entail a buyback or a grant of KEEL tokens, the requirement that KEEL token holders must hold at least 1% of the circulating..."
  - Similarity: 96.5%

- **Root Edit Proposal Submission Requirements Exception For Nested Contributors**
  - Variables: Generic numeric
  - Example: "Nested Contributors are always authorized to submit Artifact Edit Proposals and do not have to fulfill the token-holding requirements defined in [A.6...."
  - Similarity: 76.1%


### Operational Parameters (10 sections)

#### Debt Ceilings & Buffers (2 sections)

**Common Variable Types:** None detected

**Sections:**
- **Allocator Buffer Contract**
  - Variables: Generic numeric
  - Example: "The address of the ALLOCATOR_BUFFER contract is: `0xc395D150e71378B47A1b8E9de0c1a83b75a08324`..."
  - Similarity: 63.4%

- **Debt Ceiling Buffer Ethereum Mainnet**
  - Variables: Generic numeric
  - Example: "The buffer amount below the maximum debt ceiling is (`DEBT_CEILING_BUFFER`):
◦ 10,000..."
  - Similarity: 64.5%

#### Minimum Operation Sizes (1 sections)

**Common Variable Types:** None detected

**Sections:**
- **Minimum Operation Size Ethereum Mainnet**
  - Variables: Generic numeric
  - Example: "The minimum transaction size for operations on Ethereum Mainnet is (`MAINNET_MIN_OPERATION_SIZE`):
◦ 500,000..."
  - Similarity: 70.6%

#### Fees & Percentages (1 sections)

**Common Variable Types:** None detected

**Sections:**
- **Market Cap Fee Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instances of the Market Cap Fee Primitive. See [A.2.3.6.2 - Market Cap Fee Primit..."
  - Similarity: 97.9%

#### Instance Configurations (6 sections)

**Common Variable Types:** None detected

**Sections:**
- **Amatsu Instance Configuration Document Location**
  - Variables: Generic numeric
  - Example: "This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.2.1.2.1 - Amatsu Instance Configuration Document](79147a0f-b07e-..."
  - Similarity: 84.5%

- **Ethereum Mainnet - Ethena USDe Instance Configuration Document Location**
  - Variables: Generic numeric
  - Example: "This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.6.1.3.1.4.1 - Ethereum Mainnet - Ethena USDe Instance Configurat..."
  - Similarity: 83.2%

- **Ethereum Mainnet - Ethena sUSDe Instance Configuration Document Location**
  - Variables: Generic numeric
  - Example: "This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.6.1.3.1.4.2 - Ethereum Mainnet - Ethena sUSDe Instance Configura..."
  - Similarity: 84.2%

- **Ethereum Mainnet - Maple USDC Instance Configuration Document Location**
  - Variables: Generic numeric
  - Example: "This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.6.1.3.1.3.1 - Ethereum Mainnet - Maple USDC Instance Configurati..."
  - Similarity: 82.6%

- **Ethereum Mainnet - Superstate USTB Instance Configuration Document Location**
  - Variables: Generic numeric
  - Example: "This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.6.1.3.1.6.1 - Ethereum Mainnet - Superstate USTB Instance Config..."
  - Similarity: 79.6%

- **Single Instance Configuration Document Location**
  - Variables: Generic numeric
  - Example: "This Instance’s associated Instance Configuration Document is located at [A.6.1.1.1.2.1.1.3.1 - Single Instance Configuration Document](8f26332f-df39-..."
  - Similarity: 84.5%


### Other (69 sections)

#### Uncategorized (69 sections)

**Common Variable Types:** PERCENTAGE, RATE_VALUE, MAX_AMOUNT

**Sections:**
- **ALM Contracts**
  - Variables: Generic numeric
  - Example: "The documents herein contain addresses for the ALM Contracts for the SLL on each blockchain...."
  - Similarity: 79.8%

- **Address**
  - Variables: Generic numeric
  - Example: "The address of the Prime Relayer Multisig on the Ethereum Mainnet, Base, and Arbitrum is `0x8a25A24EDE9482C4Fc0738F99611BE58F1c839AB`...."
  - Similarity: 67.7%

- **Agent Creation Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instance of the Agent Creation Primitive. See [A.2.3.4.1 - Agent Creation Primiti..."
  - Similarity: 97.9%

- **Agent Customizations**
  - Variables: Generic numeric
  - Example: "The Prime Agent may define instance-specific customization of the routine protocol to extend the baseline functionality defined in the Sky Core Atlas...."
  - Similarity: 97.8%

- **Agent Token Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instance of the Agent Token Primitive. See [A.2.3.4.4 - Agent Token Primitive](20..."
  - Similarity: 97.8%

- **Agent Type**
  - Variables: Generic numeric
  - Example: "Prysm is a Prime Agent...."
  - Similarity: 87.0%

- **Allocation Strategy**
  - Variables: Generic numeric
  - Example: "In the future, additional logic will be added herein regarding the strategy by which capital is allocated between different Instances of the SLL...."
  - Similarity: 93.5%

- **Artifact Edit Restrictions**
  - Variables: Generic numeric
  - Example: "The Prysm Artifact cannot be edited in any way that violates the Sky Core Atlas or its specifications of the Sky Primitives, or in any way that is oth..."
  - Similarity: 98.1%

- **Asset Liability Management Rental Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instances of the Asset Liability Management Rental Primitive. See [A.2.3.9.3 - As..."
  - Similarity: 97.6%

- **Burn USDS**
  - Variables: Generic numeric
  - Example: "The documents herein define the steps for an operator to return and then `burn` Spark’s USDS debt in the Sky Allocation Vault...."
  - Similarity: 96.8%

- **Core Governance Primitives**
  - Variables: Generic numeric
  - Example: "The documents herein implement the Core Governance Primitives for Spark. See [A.2.3.10 - Core Governance Primitives](6fa54611-c744-4b9d-897d-b2a20e9ca..."
  - Similarity: 97.4%

- **Default Admin Role**
  - Variables: Generic numeric
  - Example: "The admin role (`DEFAULT_ADMIN_ROLE`) is the role that can grant and revoke any role, including itself and all other roles defined in the contract. Th..."
  - Similarity: 98.6%

- **Demand Side Stablecoin Primitives**
  - Variables: Generic numeric
  - Example: "The documents herein implement the Demand Side Stablecoin Primitives for Spark. See [A.2.3.8 - Demand Side Stablecoin Primitives](26415305-432d-423b-9..."
  - Similarity: 97.6%

- **ERC-4626 Withdrawal Action**
  - Variables: Generic numeric
  - Example: "In order to withdraw all ERC-4626 balances, the operator must execute the following action:

`foreignController.redeemERC4626(address(token), token.ba..."
  - Similarity: 59.5%

- **Ecosystem Accords**
  - Variables: Generic numeric
  - Example: "Spark has formally agreed to the Ecosystem Accords herein...."
  - Similarity: 93.1%

- **Ecosystem Upkeep Primitives**
  - Variables: Generic numeric
  - Example: "The documents herein implement the Ecosystem Upkeep Primitives for Spark. See [A.2.3.6 - Ecosystem Upkeep Primitives](25673fd2-76cb-4c4d-8ec6-8c489207..."
  - Similarity: 97.4%

- **Emergency Protocol**
  - Variables: Generic numeric
  - Example: "The documents herein define the process for using the Root Edit Primitive to update the Spark Agent Artifact in urgent or emergency situations...."
  - Similarity: 97.2%

- **Ethereum Mainnet Instances**
  - Variables: Generic numeric
  - Example: "The Ethereum Mainnet Instances of the Spark Liquidity Layer with `Active` Status are stored herein and are organized by target protocol...."
  - Similarity: 96.3%

- **Executor Accord Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instances of the Executor Accord Primitive. See [A.2.3.5.1 - Executor Accord Prim..."
  - Similarity: 97.9%

- **Executor Transformation Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instance of the Executor Transformation Primitive. See [A.2.3.4.3 - Executor Tran..."
  - Similarity: 97.6%

- **General Deposit to ERC-4626 Tokens Procedure**
  - Variables: Generic numeric
  - Example: "This document defines the steps for an operator to deposit assets from the ALM Proxy to the ERC-4626 vault to receive yield-bearing shares.
    
◦ The..."
  - Similarity: 89.8%

- **General Specifications**
  - Variables: Generic numeric
  - Example: "The documents herein contain general specifications for the SLL...."
  - Similarity: 86.3%

- **Genesis Account**
  - Variables: Generic numeric
  - Example: "The address of Spark’s Genesis Account will be specified in a future iteration of the Spark Artifact...."
  - Similarity: 92.1%

- **Genesis Primitives**
  - Variables: Generic numeric
  - Example: "The documents herein implement the Genesis Primitives for Spark. See [A.2.3.4 - Genesis Primitives](3d5e3668-8333-4908-adcc-5784cfe7f6b5)...."
  - Similarity: 97.1%

- **Governance Information Unrelated To Root Edit Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein specify Prysm’s governance information that is unrelated to the use of the Root Edit Primitive. The governance process for updati..."
  - Similarity: 78.4%

- **Governance Processes**
  - Variables: Generic numeric
  - Example: "The documents herein describe the specific governance processes for the SLL...."
  - Similarity: 88.2%

- **Instance Lifecycle Management**
  - Variables: Generic numeric
  - Example: "The documents herein define processes for invoking (onboarding) new SLL Instances and offboarding existing ones. This process will be specified in a f..."
  - Similarity: 91.4%

- **Instance-specific Operational Processes**
  - Variables: Generic numeric
  - Example: "The documents herein contain operational procedures or monitoring requirements unique to this Instance that deviate from or otherwise supplement the g..."
  - Similarity: 94.4%

- **Integration Boost Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instances of the Integration Boost Primitive. See [A.2.3.8.2 - Integration Boost ..."
  - Similarity: 98.0%

- **Invoking New Instances**
  - Variables: Generic numeric
  - Example: "The governance process to invoke a new Instance of the Allocation System Primitive follows the Root Edit process see [A.6.1.1.1.2.2.2.2.1.2 - Operatio..."
  - Similarity: 84.9%

- **Junior Risk Capital Rental Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instances of the Junior Risk Capital Rental Primitive. See [A.2.3.9.2 - Junior Ri..."
  - Similarity: 97.7%

- **Light Agent Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instances of the Light Agent Primitive. See [A.2.3.5.3 - Light Agent Primitive](4..."
  - Similarity: 97.9%

- **Mint USDS**
  - Variables: Generic numeric
  - Example: "The documents herein define the steps for an operator to `mint` USDS from the Sky Allocation Vault to the Spark ALM Proxy...."
  - Similarity: 96.7%

- **Modification**
  - Variables: Generic numeric
  - Example: "Ecosystem Actor Phoenix Labs can change the signers of the Prime Relayer Multisig at any time, so long as there are at least two (2) signers and at le..."
  - Similarity: 92.3%

- **Multi-Instance Coordinator Document**
  - Variables: Generic numeric
  - Example: "The documents herein provide general specifications of the Spark Liquidity Layer and define Spark’s overarching strategy and operational framework for..."
  - Similarity: 95.6%

- **Name**
  - Variables: Generic numeric
  - Example: "The name of the Agent is Prysm...."
  - Similarity: 90.3%

- **Non-Routine Protocol**
  - Variables: Generic numeric
  - Example: "The documents herein define the process for using the Root Edit Primitive to update the Spark Agent Artifact in non-routine conditions...."
  - Similarity: 97.0%

- **Off-chain Operational Parameters For Ethereum Mainnet**
  - Variables: Generic numeric
  - Example: "The document herein lists the current off-chain operational parameters for the Spark Liquidity Layer on Ethereum Mainnet...."
  - Similarity: 96.7%

- **Operational GovOps Reviews Rebate**
  - Variables: Generic numeric
  - Example: "Operational GovOps reviews Spark’s calculation of the rebate before executing a return of surplus to token holders. In the event of any issues, Operat..."
  - Similarity: 90.5%

- **Operational Primitives**
  - Variables: Generic numeric
  - Example: "The documents herein implement the Operational Primitives for Spark. See [A.2.3.5 - Operational Primitives](0192ec95-9207-480e-8c51-88d2a1da95ad)...."
  - Similarity: 97.3%

- **Pioneer Chain Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instances of the Pioneer Chain Primitive. See [A.2.3.8.3 - Pioneer Chain Primitiv..."
  - Similarity: 97.9%

- **Prime Transformation Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instance of the Prime Transformation Primitive. See [A.2.3.4.2 - Prime Transforma..."
  - Similarity: 97.5%

- **Primitive Hub Document**
  - Variables: Generic numeric
  - Example: "The documents herein organize all base information relevant to Spark’s usage of the Agent Creation Primitive...."
  - Similarity: 96.3%

- **Redeem All Mainnet Positions**
  - Variables: Generic numeric
  - Example: "The documents herein define the actions that should be performed by an operator if there is a need to recover the liquidity from Mainnet Protocols and..."
  - Similarity: 98.0%

- **Relayer Role**
  - Variables: Generic numeric
  - Example: "The `RELAYER_ROLE` is the address for the Spark Liquidity Layer ALM Planner off-chain system that calls functions on `Controller` contracts to perform..."
  - Similarity: 98.8%

- **Role Hierarchy And Permissions**
  - Variables: Generic numeric
  - Example: "The documents herein defines roles (Admin, Relayer, Freezer) and their responsibilities/permissions for managing the SLL...."
  - Similarity: 92.3%

- **Root Edit Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instance of the Root Edit Primitive. See [A.2.3.5.2 - Root Edit Primitive](78488c..."
  - Similarity: 97.8%

- **Routine Protocol**
  - Variables: Generic numeric
  - Example: "The documents herein define the process for using the Root Edit Primitive to update the Spark Agent Artifact in routine or normal conditions (i.e., no..."
  - Similarity: 97.7%

- **Short-Term Transitionary Measures**
  - Variables: Generic numeric
  - Example: "Until the Powerhouse system supports submitting Artifact Edit Proposals, PRM token holders may submit Artifact Edit Proposals by posting them to the S..."
  - Similarity: 77.8%

- **Sky Ecosystem Emergency Response**
  - Variables: Generic numeric
  - Example: "The documents herein specify Spark’s emergency response protocol in situations that impact the entire Sky Ecosystem. This protocol will be specified i..."
  - Similarity: 95.9%

- **Sky Forum**
  - Variables: Generic numeric
  - Example: "Spark uses the Sky Forum for governance-related discussion. Posts should use the “Spark Prime” category...."
  - Similarity: 92.3%

- **Sky Primitives**
  - Variables: Generic numeric
  - Example: "The documents herein implement the Sky Primitives for Spark. See [A.2.3 - Sky Primitives](fcde2604-a138-4c1b-9d9a-14895835c907)...."
  - Similarity: 96.9%

- **SkyLink Primitives**
  - Variables: Generic numeric
  - Example: "The documents herein implement the SkyLink Primitives for Spark. See [A.2.3.7 - SkyLink Primitives](7b5d8965-a64c-4c44-b742-607f51f69d8f)...."
  - Similarity: 97.1%

- **SubProxy Account**
  - Variables: Generic numeric
  - Example: "The address of Spark’s SubProxy Account on the Ethereum Mainnet is `0x3300f198988e4C9C63F75dF86De36421f06af8c4`...."
  - Similarity: 72.3%

- **Supply Side Stablecoin Primitives**
  - Variables: Generic numeric
  - Example: "The documents herein implement the Supply Side Stablecoin Primitives for Spark. See [A.2.3.9 - Supply Side Stablecoin Primitives](d1142876-33c2-4e21-9..."
  - Similarity: 97.6%

- **Terms**
  - Variables: PERCENTAGE, RATE_VALUE
  - Example: "Spark will buy back and distribute 0.25% of its total token supply per year...."
  - Similarity: 94.7%

- **Token Name**
  - Variables: Generic numeric
  - Example: "The name of Prysm’s token is Prysm...."
  - Similarity: 82.9%

- **Token SkyLink Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s instances of the Token SkyLink Primitive. See [A.2.3.7.1 - Token SkyLink Primitiv..."
  - Similarity: 97.9%

- **Token Symbol**
  - Variables: Generic numeric
  - Example: "The symbol of Prysm’s token is PRM...."
  - Similarity: 85.7%

- **Total Risk Capital (TRC) Management**
  - Variables: Generic numeric
  - Example: "The documents herein** **specify requirements related to Spark’s Total Risk Capital (TRC) management...."
  - Similarity: 92.9%

- **USDC to USDS Swap Action**
  - Variables: Generic numeric
  - Example: "This document defines the action that should be performed by an operator if there is a need to centralize all recovered liquidity in USDS.

`mainnetCo..."
  - Similarity: 90.9%

- **USDS Burn Action**
  - Variables: Generic numeric
  - Example: "This document defines the action that should be performed if there is a need to repay and then burn Spark’s USDS debt.

`mainnetController.burnUSDS(us..."
  - Similarity: 89.5%

- **USDS Burn Maximum**
  - Variables: MAX_AMOUNT
  - Example: "The maximum amount of USDS that can be burned within the Spark Liquidity Layer (`LIMIT_USDS_BURN`) is specified in the document herein.
• `maxAmount` ..."
  - Similarity: 68.1%

- **USDS Mint Maximum**
  - Variables: MAX_AMOUNT
  - Example: "The maximum amount of USDS that can be minted within the Spark Liquidity Layer (`LIMIT_USDS_MINT`) is specified in the document herein.
• `maxAmount` ..."
  - Similarity: 93.4%

- **Upgrading Controller**
  - Variables: Generic numeric
  - Example: "The documents herein define the process for deploying new Controller contracts. This process will be specified in a future iteration of the Spark Arti..."
  - Similarity: 97.4%

- **Upkeep Rebate Primitive**
  - Variables: Generic numeric
  - Example: "The documents herein contain all data and specifications for Spark’s Instance of the Upkeep Rebate Primitive. See [A.2.3.6.3 - Upkeep Rebate Primitive..."
  - Similarity: 97.6%

- **Usage Standards**
  - Variables: Generic numeric
  - Example: "The signers of the Prime Relayer Multisig must use the Multisig to exercise the `RELAYER_ROLE` in accordance with the instructions specified in the Sp..."
  - Similarity: 97.5%

- **sUSDe Cooldown Action**
  - Variables: Generic numeric
  - Example: "The operator must start the cooldown for sUSDe using the following action:

`mainnetController.cooldownSharesSUSDe(susde.balanceOf(address(proxy))
`
F..."
  - Similarity: 89.9%

- **sUSDe Unstake Action**
  - Variables: Generic numeric
  - Example: "The operator must unstake sUSDe using the following action:

`mainnetController.unstakeSUSDe()
`
For more detailed instructions on the code to execute..."
  - Similarity: 87.5%


---

## Recommended Variable Types

Based on the analysis, these specific variable types should replace NUMERIC_VALUE:

### CONTRACT_VERSION
Semantic version strings (e.g., V.1.6.0)

### MULTISIG_SIGNING_REQUIREMENT
Signing requirements in n/m format (e.g., 1/2, 4/7)

### TOKEN_AMOUNT
Large token supply amounts (e.g., "1 billion", "10 billion")

### CURRENCY_AMOUNT
Specific currency amounts (e.g., 200,000,000 USDS)

### MAX_AMOUNT
Maximum limit values for rate limits

### SLOPE
Rate limit slope values (amount per time period)

### RATE_VALUE
Values with time components (per day, per second)

### PERCENTAGE
Percentage values

### DEBT_CEILING
Debt ceiling amounts

### BUFFER_AMOUNT
Buffer amounts below ceilings

