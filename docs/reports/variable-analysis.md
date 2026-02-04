# Agent Artifact Variable Analysis Report

## Executive Summary

This report identifies all content that should be variables across the agent artifacts in the atlas-viewer project. The analysis compared 6 agents (Prysm, Spark, Grove, Keel, Launch Agent 3, and Launch Agent 4) across their structural positions.

**Total Findings:** 137 sections contain variable patterns across 7 variable types

## Variable Types Overview

| Variable Type | Occurrences | Description |
|--------------|-------------|-------------|
| NUMERIC_VALUE | 127 | Numbers that differ between agents (amounts, percentages, versions) |
| AGENT_NAME | 100 | Agent names appearing in content |
| UUID_REFERENCE | 26 | UUID references in cross-document links |
| DOC_NO_REFERENCE | 25 | Internal document reference numbers (A.X.Y.Z format) |
| ETH_ADDRESS | 14 | Ethereum wallet/contract addresses |
| TOKEN_SYMBOL | 6 | Token ticker symbols (PRM, SPK, GROVE, etc.) |
| URL | 1 | URLs that differ between agents |

---

## Detailed Variable Patterns

### 1. AGENT_NAME Variable

**Description:** The agent's name that appears throughout its artifact content.

**Pattern:** Text like "The documents herein specify all of the logic for [AGENT_NAME], including [AGENT_NAME]'s strategy..."

**Example Values:**
- Prysm
- Spark  
- Grove
- Keel
- Launch Agent 3
- Launch Agent 4

**Sections Found In (100 total):**
- ALM Contracts
- Agent Creation Primitive
- Agent Token Primitive
- Agent Type
- Allocation Strategy
- Artifact Edit Restrictions
- Asset Liability Management Rental Primitive
- Burn USDS
- Circulating Supply Definition
- Controller Functions
- Core Governance Primitives
- Core Governance Reward Primitive
- Core Operator Relayer Multisig
- Core Vault Functions
- Debt Ceiling Buffer Ethereum Mainnet
- Default Admin Role
- Demand Side Stablecoin Primitives
- Distribution Requirement Primitive
- Distribution Reward Payments
- Distribution Reward Primitive
- ERC-4626 Functions
- Ecosystem Accord 1
- Ecosystem Accord 2
- Ecosystem Accords
- Ecosystem Upkeep Primitives
- Emergency Protocol
- Ethereum Mainnet Instances
- Executor Accord Primitive
- Executor Transformation Primitive
- Freezer Multisig
- ... and 70 more


**Example Template:**
```
The documents herein contain all data and specifications for {{AGENT_NAME}}'s Instance of the Agent Token Primitive.
```

**Example Instances:**
- Prysm: "The documents herein specify all of the logic for Prysm, including Prysm's strategy..."
- Spark: "The documents herein specify all of the logic for Spark, including Spark's strategy..."
- Grove: "The documents herein specify all of the logic for Grove, including Grove's strategy..."

---

### 2. TOKEN_SYMBOL Variable

**Description:** The token ticker symbol for each agent.

**Pattern:** References to the agent's token using its symbol (e.g., PRM, SPK, GROVE)

**Example Values:**
- PRM (Prysm)
- SPK (Spark)
- GROVE (Grove)
- KEEL (Keel)
- AGENT3 (Launch Agent 3)
- AGENT4 (Launch Agent 4)

**Sections Found In (6 total):**
- Circulating Supply Definition
- Genesis Supply
- Root Edit Proposal Submission
- Root Edit Proposal Submission Requirements Exception
- Short-Term Transitionary Measures
- Token Symbol


**Example Template:**
```
The symbol of {{AGENT_NAME}}'s token is {{TOKEN_SYMBOL}}.
```

**Example Instances:**
- Prysm: "The symbol of Prysm's token is PRM."
- Spark: "The symbol of Spark's token is SPK."
- Grove: "The symbol of Grove's token is GROVE."

---

### 3. NUMERIC_VALUE Variable

**Description:** Numbers that differ systematically between agents, including amounts, percentages, limits, and version numbers.

**Pattern:** Various numeric values that are agent-specific

**Example Subsections:**

#### a) Genesis Supply
**Template:** `The Genesis Supply of {{TOKEN_SYMBOL}} is {{GENESIS_SUPPLY}}.`

**Values:**
- PRM: 1 billion
- SPK: 10 billion
- GROVE: 10 billion
- KEEL: TBD (specified in future iteration)
- AGENT3: TBD (specified in future iteration)
- AGENT4: 10 billion

#### b) Rate Limits
**Example from "Inflow Rate Limits":**

Spark:
```
• maxAmount: 200,000,000 USDS
• slope: 400,000,000 USDS per day
```

Grove:
```
• maxAmount: 50,000,000 USDC
• slope: 50,000,000 USDC per day
```

#### c) Multisig Signing Requirements
**Example from "Required Number Of Signers":**
- Spark: "1/2 signing requirement"
- Grove: "4/7 signing requirement"

#### d) Contract Versions
**Example from "ALM Controller Contract Version":**
- Grove: "will be specified in a future iteration"
- Launch Agent 4: "V.1.6.0"

**Sections Found In (127 total):**
- ALM Contracts
- ALM Controller Contract
- ALM Controller Contract Version
- ALM Freezer Multisig (Avalanche) Address
- ALM Freezer Multisig (Mainnet) Address
- ALM Freezer Multisig Address
- ALM Proxy (Avalanche) Contract
- ALM Proxy (Mainnet) Contract
- ALM Proxy Contract
- ALM Rate Limits (Avalanche) Contract
- ALM Rate Limits Contract
- ALM Relayer Multisig (Avalanche) Address
- Address
- Admin Functions
- Agent Creation Primitive
- Agent Customizations
- Agent Token Primitive
- Agent Type
- Allocation Strategy
- Allocator Buffer Contract
- Amatsu Instance Configuration Document Location
- Artifact Edit Restrictions
- Asset Liability Management Rental Primitive
- Burn USDS
- Circulating Supply Definition
- Controller Functions
- Core Governance Primitives
- Core Governance Reward Primitive
- Core Operator Relayer Multisig
- Debt Ceiling Buffer Ethereum Mainnet
- Default Admin Role
- Demand Side Stablecoin Primitives
- Distribution Requirement Primitive
- Distribution Reward Payments
- Distribution Reward Primitive
- ERC-4626 Functions
- ERC-4626 Withdrawal Action
- Ecosystem Accords
- Ecosystem Upkeep Primitives
- Emergency Protocol
- ... and 87 more


---

### 4. ETH_ADDRESS Variable

**Description:** Ethereum addresses (contracts, multisigs, etc.) that differ between agents.

**Pattern:** Hexadecimal addresses in format `0x[40 hex characters]`

**Sections Found In (14 total):**
- ALM Controller Contract
- ALM Freezer Multisig (Avalanche) Address
- ALM Freezer Multisig (Mainnet) Address
- ALM Freezer Multisig Address
- ALM Proxy (Avalanche) Contract
- ALM Proxy (Mainnet) Contract
- ALM Proxy Contract
- ALM Rate Limits (Avalanche) Contract
- ALM Rate Limits Contract
- ALM Relayer Multisig (Avalanche) Address
- Address
- Allocator Buffer Contract
- Integration Partner Reward Address
- SubProxy Account


**Example Template:**
```
The address of the ALM_CONTROLLER contract is: {{ALM_CONTROLLER_ADDRESS}}
```

**Example Instances:**
- Grove: `0x08b045609a673996ca10fedbAFAE2395A21ba539`
- Launch Agent 4: `0xF2bB664f16E2df4b0c71F9d2cFc386504E795b7A`

---

### 5. DOC_NO_REFERENCE Variable

**Description:** Internal document reference numbers that point to agent-specific sections.

**Pattern:** References like `[A.6.1.1.X.Y.Z - Section Name](uuid)` where X is the agent number

**Example:**
- Spark references: `A.6.1.1.1.2.6.1.2.1.2.2.3.1`
- Grove references: `A.6.1.1.2.2.6.1.2.1.2.2.3.1`
- Keel references: `A.6.1.1.3.2.6.1.2.1.2.2.3.1`

The pattern shows the agent identifier (1, 2, 3, etc.) in the 4th position, with the rest of the structure remaining the same.

**Sections Found In (25 total):**
- ALM Freezer Multisig (Mainnet) Address
- ALM Freezer Multisig Address
- Admin Functions
- Amatsu Instance Configuration Document Location
- Circulating Supply Definition
- Core Operator Relayer Multisig
- ERC-4626 Withdrawal Action
- Ethereum Mainnet - Ethena USDe Instance Configuration Document Location
- Ethereum Mainnet - Ethena sUSDe Instance Configuration Document Location
- Ethereum Mainnet - Maple USDC Instance Configuration Document Location
- Ethereum Mainnet - Superstate USTB Instance Configuration Document Location
- Freezer Multisig
- General Deposit to ERC-4626 Tokens Procedure
- Governance Information Unrelated To Root Edit Primitive
- Invoking New Instances
- Prime Relayer Multisig
- Relayer Functions
- Root Edit Proposal Review By Operational Facilitator
- Root Edit Proposal Submission Requirements Exception For Nested Contributors
- Short-Term Transitionary Measures
- Single Instance Configuration Document Location
- USDC to USDS Swap Action
- USDS Burn Action
- sUSDe Cooldown Action
- sUSDe Unstake Action


**Example Template:**
```
This Instance's associated Instance Configuration Document is located at [A.6.1.1.{{AGENT_ID}}.2.2.1.2.1 - Amatsu Instance Configuration Document]({{UUID}}).
```

---

### 6. UUID_REFERENCE Variable

**Description:** UUID values in document cross-references that differ between agents (because each agent has unique section UUIDs).

**Pattern:** UUIDs in markdown link format: `[Link Text](xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)`

**Sections Found In (26 total):**
- ALM Freezer Multisig (Mainnet) Address
- ALM Freezer Multisig Address
- Admin Functions
- Amatsu Instance Configuration Document Location
- Circulating Supply Definition
- Core Operator Relayer Multisig
- ERC-4626 Withdrawal Action
- Ethereum Mainnet - Ethena USDe Instance Configuration Document Location
- Ethereum Mainnet - Ethena sUSDe Instance Configuration Document Location
- Ethereum Mainnet - Maple USDC Instance Configuration Document Location
- Ethereum Mainnet - Superstate USTB Instance Configuration Document Location
- Freezer Multisig
- General Deposit to ERC-4626 Tokens Procedure
- Governance Information Unrelated To Root Edit Primitive
- Invoking New Instances
- Prime Relayer Multisig
- Relayer Functions
- Root Edit Proposal Review By Operational Facilitator
- Root Edit Proposal Submission Requirements Exception For Nested Contributors
- Short-Term Transitionary Measures
- Single Instance Configuration Document Location
- Token Emissions
- USDC to USDS Swap Action
- USDS Burn Action
- sUSDe Cooldown Action
- sUSDe Unstake Action


**Note:** These UUIDs are unique identifiers for each section and will naturally differ between agents even when the structural position is the same.

---

### 7. URL Variable

**Description:** URLs that differ between agents.

**Sections Found In (1 total):**
- Integration Boost Data Submission Format

**Example:**
Different API endpoint URLs for different agents' data submission formats.

---

## Special Patterns Identified

### Pattern 1: "Liquidity Layer" Naming

Different agents use different shortened names for their liquidity layers:
- Spark: "SLL" (Spark Liquidity Layer)
- Grove: "Grove Liquidity Layer" (full name)
- Launch Agent 4: "Launch Agent 4 Liquidity Layer" (full name)

**Sections affected:**
- ALM Contracts
- Allocation Strategy
- Controller Functions
- Core Vault Functions
- And many others related to liquidity layer operations

### Pattern 2: Foundation Names

**Template:** `The {{FOUNDATION_NAME}} is the Prime Foundation associated with {{AGENT_NAME}}.`

**Examples:**
- Prysm: "Prysm Foundation"
- Spark: "Spark Assets Foundation" 
- Grove: "Grove Foundation"
- Keel: "Keel Foundation" (inferred)

**Sections:**
- Foundation name definitions
- Nested contributor references

### Pattern 3: Development Company Names

Agent-specific development companies:
- Prysm: "Stablewatch sp. z o.o."
- Spark: "Phoenix Labs"
- Grove: "Grove Development Company"

### Pattern 4: Forum Category References

**Template:** `Posts should use the "{{AGENT_NAME}}" category.`

**Examples:**
- Prysm: "Prysm Prime" category
- Spark: "Spark Prime" category
- Grove: "Grove Prime" category

---

## Recommendations

### 1. Template Variables to Implement

Based on this analysis, the following template variables should be created:

```javascript
{
  // Core Identity
  AGENT_NAME: string,           // e.g., "Prysm", "Spark"
  AGENT_ID: string,             // e.g., "1", "2", "3"
  AGENT_DOC_PREFIX: string,     // e.g., "A.6.1.1.1", "A.6.1.1.2"
  
  // Token Information
  TOKEN_NAME: string,           // e.g., "Prysm", "Spark"
  TOKEN_SYMBOL: string,         // e.g., "PRM", "SPK"
  GENESIS_SUPPLY: string,       // e.g., "1 billion", "10 billion"
  
  // Organization
  FOUNDATION_NAME: string,      // e.g., "Prysm Foundation"
  DEV_COMPANY_NAME: string,     // e.g., "Stablewatch sp. z o.o."
  
  // Governance
  FORUM_CATEGORY: string,       // e.g., "Prysm Prime"
  MIN_PROPOSAL_PERCENTAGE: string, // e.g., "1%"
  
  // Technical
  LIQUIDITY_LAYER_NAME: string, // e.g., "SLL", "Grove Liquidity Layer"
  LIQUIDITY_LAYER_SHORT: string, // e.g., "SLL", "GLL"
  
  // Addresses (per network)
  ALM_CONTROLLER_ADDRESS: string,
  ALM_PROXY_ADDRESS: string,
  FREEZER_MULTISIG_ADDRESS: string,
  
  // Configuration Values (highly variable)
  INFLOW_MAX_AMOUNT: string,
  INFLOW_SLOPE: string,
  MULTISIG_SIGNERS: string,
  CONTRACT_VERSION: string,
  
  // References (auto-generated)
  SECTION_UUID: string,         // Unique per section
  CROSS_REFERENCES: object,     // Map of reference keys to agent-specific doc_nos
}
```

### 2. Priority Implementation Order

**High Priority** (appears in >50 sections):
1. AGENT_NAME
2. NUMERIC_VALUE (various subtypes)
3. TOKEN_SYMBOL

**Medium Priority** (appears in 10-50 sections):
4. DOC_NO_REFERENCE
5. UUID_REFERENCE
6. ETH_ADDRESS

**Low Priority** (appears in <10 sections):
7. URL
8. FOUNDATION_NAME (can be derived from AGENT_NAME in many cases)

### 3. Template Structure Recommendation

Consider a hierarchical variable structure:

```yaml
agent:
  identity:
    name: "Prysm"
    doc_no: "A.6.1.1.6"
    
  token:
    name: "Prysm"
    symbol: "PRM"
    genesis_supply: "1 billion"
    
  organization:
    foundation: "Prysm Foundation"
    dev_company: "Stablewatch sp. z o.o."
    
  governance:
    forum_category: "Prysm Prime"
    min_proposal_pct: "1%"
    
  technical:
    liquidity_layer_name: "Prysm Liquidity Layer"
    liquidity_layer_short: "PLL"
    
  contracts:
    mainnet:
      alm_controller: "0x..."
      alm_proxy: "0x..."
```

---

## Appendix: Complete Section List by Variable Type


### AGENT_NAME (100 sections)

1. ALM Contracts
2. Agent Creation Primitive
3. Agent Token Primitive
4. Agent Type
5. Allocation Strategy
6. Artifact Edit Restrictions
7. Asset Liability Management Rental Primitive
8. Burn USDS
9. Circulating Supply Definition
10. Controller Functions
11. Core Governance Primitives
12. Core Governance Reward Primitive
13. Core Operator Relayer Multisig
14. Core Vault Functions
15. Debt Ceiling Buffer Ethereum Mainnet
16. Default Admin Role
17. Demand Side Stablecoin Primitives
18. Distribution Requirement Primitive
19. Distribution Reward Payments
20. Distribution Reward Primitive
21. ERC-4626 Functions
22. Ecosystem Accord 1
23. Ecosystem Accord 2
24. Ecosystem Accords
25. Ecosystem Upkeep Primitives
26. Emergency Protocol
27. Ethereum Mainnet Instances
28. Executor Accord Primitive
29. Executor Transformation Primitive
30. Freezer Multisig
31. General Deposit to ERC-4626 Tokens Procedure
32. General Redeem from ERC-4626 Tokens Procedure
33. General Specifications
34. General Withdraw from ERC-4626 Tokens Procedure
35. Genesis Account
36. Genesis Primitives
37. Genesis Supply
38. Governance Information Unrelated To Root Edit Primitive
39. Governance Processes
40. Instance Lifecycle Management
41. Instance-specific Operational Processes
42. Integration Boost Primitive
43. Junior Risk Capital Rental Primitive
44. Light Agent Primitive
45. Mainnet Controller Contract Functions
46. Management Of Infrastructure Inherited From Sky Core
47. Market Cap Fee Primitive
48. Minimum Operation Size Ethereum Mainnet
49. Mint USDS
50. Modification
51. Multi-Instance Coordinator Document
52. Multisigs
53. Name
54. Non-Routine Protocol
55. Off-chain Operational Parameters For Ethereum Mainnet
56. Operational GovOps Reviews Rebate
57. Operational Primitives
58. Outflow Rate Limits
59. PSM Functions
60. Pioneer Chain Primitive
61. Prime Relayer Multisig
62. Prime Transformation Primitive
63. Primitive Hub Document
64. Process Definition For Buy Back And Distribution Obligation
65. Rate Limit IDs
66. Rate Limit Management
67. Rate Limits
68. RateLimits
69. Redeem All Mainnet Positions
70. Relayer Role
71. Role Hierarchy And Permissions
72. Root Edit Primitive
73. Root Edit Proposal Submission
74. Root Edit Proposal Submission Requirements Exception
75. Root Edit Proposal Submission Requirements Exception For Nested Contributors
76. Routine Protocol
77. Short-Term Transitionary Measures
78. Signers
79. Sky Ecosystem Emergency Response
80. Sky Forum
81. Sky Primitives
82. SkyLink Primitives
83. SubProxy Account
84. Supply Side Stablecoin Primitives
85. Terms
86. Token Emissions
87. Token Name
88. Token SkyLink Primitive
89. Token Symbol
90. Total Risk Capital (TRC) Management
91. USDC Avalanche ALM Proxy Maximum
92. USDC Base ALM Proxy Maximum
93. USDC Mainnet ALM Proxy Maximum
94. USDS Burn Action
95. USDS Burn Maximum
96. USDS For USDC Swap Maximum
97. USDS Mint Maximum
98. Upgrading Controller
99. Upkeep Rebate Primitive
100. Usage Standards

### DOC_NO_REFERENCE (25 sections)

1. ALM Freezer Multisig (Mainnet) Address
2. ALM Freezer Multisig Address
3. Admin Functions
4. Amatsu Instance Configuration Document Location
5. Circulating Supply Definition
6. Core Operator Relayer Multisig
7. ERC-4626 Withdrawal Action
8. Ethereum Mainnet - Ethena USDe Instance Configuration Document Location
9. Ethereum Mainnet - Ethena sUSDe Instance Configuration Document Location
10. Ethereum Mainnet - Maple USDC Instance Configuration Document Location
11. Ethereum Mainnet - Superstate USTB Instance Configuration Document Location
12. Freezer Multisig
13. General Deposit to ERC-4626 Tokens Procedure
14. Governance Information Unrelated To Root Edit Primitive
15. Invoking New Instances
16. Prime Relayer Multisig
17. Relayer Functions
18. Root Edit Proposal Review By Operational Facilitator
19. Root Edit Proposal Submission Requirements Exception For Nested Contributors
20. Short-Term Transitionary Measures
21. Single Instance Configuration Document Location
22. USDC to USDS Swap Action
23. USDS Burn Action
24. sUSDe Cooldown Action
25. sUSDe Unstake Action

### ETH_ADDRESS (14 sections)

1. ALM Controller Contract
2. ALM Freezer Multisig (Avalanche) Address
3. ALM Freezer Multisig (Mainnet) Address
4. ALM Freezer Multisig Address
5. ALM Proxy (Avalanche) Contract
6. ALM Proxy (Mainnet) Contract
7. ALM Proxy Contract
8. ALM Rate Limits (Avalanche) Contract
9. ALM Rate Limits Contract
10. ALM Relayer Multisig (Avalanche) Address
11. Address
12. Allocator Buffer Contract
13. Integration Partner Reward Address
14. SubProxy Account

### NUMERIC_VALUE (127 sections)

1. ALM Contracts
2. ALM Controller Contract
3. ALM Controller Contract Version
4. ALM Freezer Multisig (Avalanche) Address
5. ALM Freezer Multisig (Mainnet) Address
6. ALM Freezer Multisig Address
7. ALM Proxy (Avalanche) Contract
8. ALM Proxy (Mainnet) Contract
9. ALM Proxy Contract
10. ALM Rate Limits (Avalanche) Contract
11. ALM Rate Limits Contract
12. ALM Relayer Multisig (Avalanche) Address
13. Address
14. Admin Functions
15. Agent Creation Primitive
16. Agent Customizations
17. Agent Token Primitive
18. Agent Type
19. Allocation Strategy
20. Allocator Buffer Contract
21. Amatsu Instance Configuration Document Location
22. Artifact Edit Restrictions
23. Asset Liability Management Rental Primitive
24. Burn USDS
25. Circulating Supply Definition
26. Controller Functions
27. Core Governance Primitives
28. Core Governance Reward Primitive
29. Core Operator Relayer Multisig
30. Debt Ceiling Buffer Ethereum Mainnet
31. Default Admin Role
32. Demand Side Stablecoin Primitives
33. Distribution Requirement Primitive
34. Distribution Reward Payments
35. Distribution Reward Primitive
36. ERC-4626 Functions
37. ERC-4626 Withdrawal Action
38. Ecosystem Accords
39. Ecosystem Upkeep Primitives
40. Emergency Protocol
41. Ethereum Mainnet - Ethena USDe Instance Configuration Document Location
42. Ethereum Mainnet - Ethena sUSDe Instance Configuration Document Location
43. Ethereum Mainnet - Maple USDC Instance Configuration Document Location
44. Ethereum Mainnet - Superstate USTB Instance Configuration Document Location
45. Ethereum Mainnet Instances
46. Executor Accord Primitive
47. Executor Transformation Primitive
48. Freezer Multisig
49. General Deposit to ERC-4626 Tokens Procedure
50. General Specifications
51. Genesis Account
52. Genesis Primitives
53. Genesis Supply
54. Governance Information Unrelated To Root Edit Primitive
55. Governance Processes
56. Inflow Rate Limits
57. Instance Lifecycle Management
58. Instance-specific Operational Processes
59. Integration Boost Primitive
60. Integration Partner Reward Address
61. Invoking New Instances
62. Junior Risk Capital Rental Primitive
63. Light Agent Primitive
64. Mainnet Controller Contract Functions
65. Market Cap Fee Primitive
66. Minimum Operation Size Ethereum Mainnet
67. Mint USDS
68. Modification
69. Multi-Instance Coordinator Document
70. Multisigs
71. Name
72. Non-Routine Protocol
73. Off-chain Operational Parameters For Ethereum Mainnet
74. Operational GovOps Reviews Rebate
75. Operational Primitives
76. PSM Functions
77. Pioneer Chain Primitive
78. Prime Relayer Multisig
79. Prime Transformation Primitive
80. Primitive Hub Document
81. Process Definition For Buy Back And Distribution Obligation
82. Rate Limit Management
83. Rate Limits
84. Redeem All Mainnet Positions
85. Relayer Functions
86. Relayer Role
87. Required Number Of Signers
88. Reward Code
89. Role Hierarchy And Permissions
90. Root Edit Primitive
91. Root Edit Proposal Review By Operational Facilitator
92. Root Edit Proposal Submission
93. Root Edit Proposal Submission Requirements Exception
94. Root Edit Proposal Submission Requirements Exception For Nested Contributors
95. Routine Protocol
96. Short-Term Transitionary Measures
97. Signers
98. Single Instance Configuration Document Location
99. Sky Ecosystem Emergency Response
100. Sky Forum
101. Sky Primitives
102. SkyLink Primitives
103. SubProxy Account
104. Supply Side Stablecoin Primitives
105. Swap Rate Limits
106. Terms
107. Token Emissions
108. Token Name
109. Token SkyLink Primitive
110. Token Symbol
111. Total Risk Capital (TRC) Management
112. USDC Avalanche ALM Proxy Circle Cross-Chain Transfer Protocol Maximum
113. USDC Avalanche ALM Proxy Maximum
114. USDC Base ALM Proxy Circle Cross-Chain Transfer Protocol Maximum
115. USDC Base ALM Proxy Maximum
116. USDC Mainnet ALM Proxy Circle Cross-Chain Transfer Protocol Maximum
117. USDC Mainnet ALM Proxy Maximum
118. USDC to USDS Swap Action
119. USDS Burn Action
120. USDS Burn Maximum
121. USDS For USDC Swap Maximum
122. USDS Mint Maximum
123. Upgrading Controller
124. Upkeep Rebate Primitive
125. Usage Standards
126. sUSDe Cooldown Action
127. sUSDe Unstake Action

### TOKEN_SYMBOL (6 sections)

1. Circulating Supply Definition
2. Genesis Supply
3. Root Edit Proposal Submission
4. Root Edit Proposal Submission Requirements Exception
5. Short-Term Transitionary Measures
6. Token Symbol

### URL (1 sections)

1. Integration Boost Data Submission Format

### UUID_REFERENCE (26 sections)

1. ALM Freezer Multisig (Mainnet) Address
2. ALM Freezer Multisig Address
3. Admin Functions
4. Amatsu Instance Configuration Document Location
5. Circulating Supply Definition
6. Core Operator Relayer Multisig
7. ERC-4626 Withdrawal Action
8. Ethereum Mainnet - Ethena USDe Instance Configuration Document Location
9. Ethereum Mainnet - Ethena sUSDe Instance Configuration Document Location
10. Ethereum Mainnet - Maple USDC Instance Configuration Document Location
11. Ethereum Mainnet - Superstate USTB Instance Configuration Document Location
12. Freezer Multisig
13. General Deposit to ERC-4626 Tokens Procedure
14. Governance Information Unrelated To Root Edit Primitive
15. Invoking New Instances
16. Prime Relayer Multisig
17. Relayer Functions
18. Root Edit Proposal Review By Operational Facilitator
19. Root Edit Proposal Submission Requirements Exception For Nested Contributors
20. Short-Term Transitionary Measures
21. Single Instance Configuration Document Location
22. Token Emissions
23. USDC to USDS Swap Action
24. USDS Burn Action
25. sUSDe Cooldown Action
26. sUSDe Unstake Action

---

*Report generated from analysis of 6 agent artifacts*
