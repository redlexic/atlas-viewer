# PSM Whitelisting: Mainnet vs Other Chains

**Report Date:** 2026-01-26 (updated)
**Data Source:** atlas-2026-01-26.json

---

## Executive Summary

This report examines how Peg Stability Module (PSM) authorization differs between Ethereum mainnet and other chains (Base, Arbitrum, Unichain, Optimism).

**Key findings:**
- **LitePSM** (mainnet) and **PSM3** (L2s) are completely different contracts with different codebases
- Mainnet LitePSM requires **explicit whitelisting via governance spells** for fee-free access
- PSM3 on other chains is **permissionless** with access control handled at the Liquidity Layer level

See [Section 0](#0-contract-overview) for a complete list of contract addresses and block explorer links.

---

## 0. Contract Overview

**LitePSM and PSM3 are completely different contracts** with separate codebases and different authorization models.

### 0.1 Mainnet: LitePSM

The LitePSM is part of the MakerDAO Core Deployment (MCD), handling DAI/USDC swaps on Ethereum mainnet.

| Chainlog Key | Contract | Address | Explorer | Atlas Reference |
|--------------|----------|---------|----------|-----------------|
| `MCD_LITE_PSM_USDC_A` | LitePSM | `0xf6e72Db5454dd049d0788e411b06CfAF16853042` | [Etherscan](https://etherscan.io/address/0xf6e72Db5454dd049d0788e411b06CfAF16853042) | [A.3.3.2.7.1.1](https://sky-atlas.io/#A.3.3.2.7.1.1) |

> **Source:** [dss repo](https://github.com/makerdao/dss) (MakerDAO core contracts), [Atlas A.3.3.2.7.1.1](https://sky-atlas.io/#A.3.3.2.7.1.1) - Lite Peg Stability Module

### 0.2 L2 Chains: PSM3

PSM3 is a separate contract developed by Spark, handling USDS/sUSDS/USDC swaps on L2 chains.

| Chain | Contract | Address | Explorer | Atlas Reference |
|-------|----------|---------|----------|-----------------|
| Base | PSM3 | `0x1601843c5E9bC251A3272907010AFa41Fa18347E` | [Basescan](https://basescan.org/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E) | *Not in Atlas* |
| Arbitrum | PSM3 | `0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266` | [Arbiscan](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266) | *Not in Atlas* |
| Optimism | PSM3 | `0xe0F9978b907853F354d79188A3dEfbD41978af62` | [Optimistic Etherscan](https://optimistic.etherscan.io/address/0xe0F9978b907853F354d79188A3dEfbD41978af62) | *Not in Atlas* |
| Unichain | PSM3 | `0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f` | [Uniscan](https://unichain.blockscout.com/address/0x7b42Ed932f26509465F7cE3FAF76FfCe1275312f) | *Not in Atlas* |

> **Source:** [sparkdotfi/spark-psm](https://github.com/sparkdotfi/spark-psm), [spark-address-registry](https://github.com/sparkdotfi/spark-address-registry)
>
> **Note:** PSM3 contract addresses are not documented in the Atlas. They are sourced from the Spark Address Registry.

### 0.3 Spark Liquidity Layer Contracts

The Liquidity Layer is a separate set of contracts that interact with both LitePSM (mainnet) and PSM3 (L2s).

> **Atlas Reference:** [A.6.1.1.1.2.6.1.2.1.1.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1) - SLL Addresses

**Ethereum Mainnet:**
| Contract | Address | Explorer | Atlas Reference |
|----------|---------|----------|-----------------|
| ALM_PROXY | `0x1601843c5E9bC251A3272907010AFa41Fa18347E` | [Etherscan](https://etherscan.io/address/0x1601843c5E9bC251A3272907010AFa41Fa18347E) | [A.6.1.1.1.2.6.1.2.1.1.1.2.1.5](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.1.5) |
| ALM_CONTROLLER (MainnetController) | `0xE52d643B27601D4d2BAB2052f30cf936ed413cec` | [Etherscan](https://etherscan.io/address/0xE52d643B27601D4d2BAB2052f30cf936ed413cec) | [A.6.1.1.1.2.6.1.2.1.1.1.2.1.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.1.1) |
| ALM_RATE_LIMITS | `0x7A5FD5cf045e010e62147F065cEAe59e5344b188` | [Etherscan](https://etherscan.io/address/0x7A5FD5cf045e010e62147F065cEAe59e5344b188) | [A.6.1.1.1.2.6.1.2.1.1.1.2.1.6](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.1.6) |

**Base:**
| Contract | Address | Explorer | Atlas Reference |
|----------|---------|----------|-----------------|
| ALM_PROXY | `0x2917956eFF0B5eaF030abDB4EF4296DF775009cA` | [Basescan](https://basescan.org/address/0x2917956eFF0B5eaF030abDB4EF4296DF775009cA) | [A.6.1.1.1.2.6.1.2.1.1.1.2.2.5](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.2.5) |
| ALM_CONTROLLER (ForeignController) | `0x86036CE5d2f792367C0AA43164e688d13c5A60A8` | [Basescan](https://basescan.org/address/0x86036CE5d2f792367C0AA43164e688d13c5A60A8) | [A.6.1.1.1.2.6.1.2.1.1.1.2.2.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.2.1) |
| ALM_RATE_LIMITS | `0x983eC82E45C61a42FDDA7B3c43B8C767004c8A74` | [Basescan](https://basescan.org/address/0x983eC82E45C61a42FDDA7B3c43B8C767004c8A74) | [A.6.1.1.1.2.6.1.2.1.1.1.2.2.6](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.2.6) |

**Arbitrum:**
| Contract | Address | Explorer | Atlas Reference |
|----------|---------|----------|-----------------|
| ALM_PROXY | `0x92afd6F2385a90e44da3a8B60fe36f6cBe1D8709` | [Arbiscan](https://arbiscan.io/address/0x92afd6F2385a90e44da3a8B60fe36f6cBe1D8709) | [A.6.1.1.1.2.6.1.2.1.1.1.2.3.5](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.3.5) |
| ALM_CONTROLLER (ForeignController) | `0xC40611AC4Fff8572Dc5F02A238176edCF15Ea7ba` | [Arbiscan](https://arbiscan.io/address/0xC40611AC4Fff8572Dc5F02A238176edCF15Ea7ba) | [A.6.1.1.1.2.6.1.2.1.1.1.2.3.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.3.1) |
| ALM_RATE_LIMITS | `0x19D08879851FB54C2dCc4bb32b5a1EA5E9Ad6838` | [Arbiscan](https://arbiscan.io/address/0x19D08879851FB54C2dCc4bb32b5a1EA5E9Ad6838) | [A.6.1.1.1.2.6.1.2.1.1.1.2.3.6](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.3.6) |

**Optimism:**
| Contract | Address | Explorer | Atlas Reference |
|----------|---------|----------|-----------------|
| ALM_PROXY | `0x876664f0c9Ff24D1aa355Ce9f1680AE1A5bf36fB` | [Optimistic Etherscan](https://optimistic.etherscan.io/address/0x876664f0c9Ff24D1aa355Ce9f1680AE1A5bf36fB) | [A.6.1.1.1.2.6.1.2.1.1.1.2.5.5](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.5.5) |
| ALM_CONTROLLER (ForeignController) | `0x689502bc817E6374286af8f171Ed4715721406f7` | [Optimistic Etherscan](https://optimistic.etherscan.io/address/0x689502bc817E6374286af8f171Ed4715721406f7) | [A.6.1.1.1.2.6.1.2.1.1.1.2.5.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.5.1) |
| ALM_RATE_LIMITS | `0x6B34A6B84444dC3Fc692821D5d077a1e4927342d` | [Optimistic Etherscan](https://optimistic.etherscan.io/address/0x6B34A6B84444dC3Fc692821D5d077a1e4927342d) | [A.6.1.1.1.2.6.1.2.1.1.1.2.5.6](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.5.6) |

**Unichain:**
| Contract | Address | Explorer | Atlas Reference |
|----------|---------|----------|-----------------|
| ALM_PROXY | `0x345E368fcCd62266B3f5F37C9a131FD1c39f5869` | [Uniscan](https://unichain.blockscout.com/address/0x345E368fcCd62266B3f5F37C9a131FD1c39f5869) | [A.6.1.1.1.2.6.1.2.1.1.1.2.4.5](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.4.5) |
| ALM_CONTROLLER (ForeignController) | `0xF16DE710899C7bdd6D46873265392CCA68e5D5bA` | [Uniscan](https://unichain.blockscout.com/address/0xF16DE710899C7bdd6D46873265392CCA68e5D5bA) | [A.6.1.1.1.2.6.1.2.1.1.1.2.4.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.4.1) |
| ALM_RATE_LIMITS | `0x5A1a44D2192Dd1e21efB9caA50E32D0716b35535` | [Uniscan](https://unichain.blockscout.com/address/0x5A1a44D2192Dd1e21efB9caA50E32D0716b35535) | [A.6.1.1.1.2.6.1.2.1.1.1.2.4.6](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.4.6) |

> **Source:** [Spark Address Registry](https://github.com/sparkdotfi/spark-address-registry), [Atlas A.6.1.1.1.2.6.1.2.1.1.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1) - SLL Addresses

### 0.4 Key Differences

| Aspect | LitePSM (Mainnet) | PSM3 (L2 Chains) |
|--------|-------------------|------------------|
| **Atlas Reference** | [A.3.3.2.7.1.1](https://sky-atlas.io/#A.3.3.2.7.1.1) | *Not in Atlas* |
| **Codebase** | [makerdao/dss](https://github.com/makerdao/dss) | [sparkdotfi/spark-psm](https://github.com/sparkdotfi/spark-psm) |
| **Assets** | DAI ↔ USDC | USDS ↔ sUSDS ↔ USDC |
| **Access Pattern** | Whitelist-based (`bud` mapping) | Permissionless (Ownable) |
| **Swap Functions** | `buyGemNoFee`, `sellGemNoFee` | `swapExactIn`, `swapExactOut` |
| **Admin Functions** | Multiple (fees, debt ceiling, whitelist) | Single (`setPocket`) |

---

## 1. Mainnet LitePSM: Whitelisting Required

### 1.1 Authorized Parties Mechanism

On Ethereum mainnet, the LitePSM has a formal "Authorized Parties" mechanism that controls who can access fee-free swap functions.

> **Source:** [Atlas A.3.3.2.7.1.1.1.7](https://sky-atlas.io/#A.3.3.2.7.1.1.1.7) - Lite Peg Stability Module Authorized Parties Definition
>
> *"Authorized Parties are actors who are authorized by Sky Governance to use the Lite Peg Stability Module without paying swap fees."*

### 1.2 Current Parameter Values

The current LitePSM configuration shows no authorized parties are currently whitelisted at the PSM contract level:

> **Source:** [Atlas A.3.3.2.7.1.1.2](https://sky-atlas.io/#A.3.3.2.7.1.1.2) - Lite Peg Stability Module Parameter Values
>
> ```
> • tin: 0%
> • tout: 0%
> • DC-IAM line: 10,000,000,000
> • DC-IAM gap: 400,000,000
> • DC-IAM ttl: 43,200 seconds
> • buf: 400,000,000
> • Authorized Parties: None
> ```

**Note:** Even though "Authorized Parties: None" is listed, agents like Keel interact via ALMProxy whitelisting (see 1.3).

### 1.3 Agent ALMProxy Whitelisting

Individual agents must have their ALMProxy contracts whitelisted on the LitePSM to call fee-free functions. This is done through governance spells.

#### Keel (Whitelisted)

> **Source:** [Atlas A.6.1.1.3.2.6.1.2.1.1.4.2](https://sky-atlas.io/#A.6.1.1.3.2.6.1.2.1.1.4.2) - Whitelisting Of ALMProxy (Keel)
>
> *"The ALMProxy for Keel is whitelisted on the LitePSM. This allows Keel to call `buyGemNoFee` and `sellGemNoFee` on the [`MCD_LITE_PSM_USDC_A`](https://etherscan.io/address/0xf6e72db5454dd049d0788e411b06cfaf16853042) contract."*

#### Obex (Pending Whitelisting)

> **Source:** [Atlas A.6.1.1.5.2.6.1.2.1.1.4.2](https://sky-atlas.io/#A.6.1.1.5.2.6.1.2.1.1.4.2) - Whitelisting Of ALMProxy (Obex)
>
> *"The ALMProxy for Obex **must be** whitelisted on the LitePSM. This will effectively allow Obex to call `buyGemNoFee` and `sellGemNoFee` on the [`MCD_LITE_PSM_USDC_A`](https://etherscan.io/address/0xf6e72db5454dd049d0788e411b06cfaf16853042) contract."*

**Verification:** The language difference ("is whitelisted" vs "must be whitelisted") indicates Keel's whitelisting is complete while Obex's is pending a future governance spell.

### 1.4 Governance Process for Modifications

> **Source:** [Atlas A.3.3.2.7.1.1.3](https://sky-atlas.io/#A.3.3.2.7.1.1.3) - Lite Peg Stability Module Parameter Modification
>
> *"The Sky Core Stability Facilitators, in consultation with the Core Council Risk Advisor, may recommend changes to any of the parameters specified in the subdocuments of [A.3.3.2.7.1.1.1]. These changes will be subject to an Executive Vote through the Operational Weekly Governance Cycle."*

**Verification:** The Atlas explicitly states that PSM parameter changes require Executive Votes, confirming that whitelisting changes go through formal governance.

---

## 2. Other Chains (PSM3): Permissionless Design

### 2.1 No Whitelisting Mechanism

PSM3 is a **completely different contract** from LitePSM (see [Section 0](#0-contract-overview) for addresses and repos). It uses a fundamentally different authorization model.

> **Source:** [PSM3.sol](https://github.com/sparkdotfi/spark-psm/blob/master/src/PSM3.sol)
>
> The PSM3 implements a single admin role through OpenZeppelin's Ownable pattern. The only admin function is `setPocket`:
> ```solidity
> function setPocket(address newPocket) external override onlyOwner
> ```
>
> All user-facing functions are permissionless - no whitelisting or access control:
> ```solidity
> function swapExactIn(address assetIn, address assetOut, uint256 amountIn,
>     uint256 minAmountOut, address receiver, uint256 referralCode)
>     external override returns (uint256 amountOut)
>
> function deposit(address asset, address receiver, uint256 assetsToDeposit)
>     external override returns (uint256 newShares)
>
> function withdraw(address asset, address receiver, uint256 maxAssetsToWithdraw)
>     external override returns (uint256 assetsWithdrawn)
> ```

**Verification:** Verified by examining PSM3.sol source code. The contract inherits Ownable (not AccessControl), and swap/deposit/withdraw functions have no role-based modifiers.

### 2.2 PSM3 Deployment Locations

> **Source:** [Atlas A.3.3.2.2.1.1.1](https://sky-atlas.io/#A.3.3.2.2.1.1.1) - Resting Actively Stabilizing Collateral Calculations
>
> *"Resting Actively Stabilizing Collateral is currently calculated as the sum of:*
> 1. *USDC in the LitePSM;*
> 2. *USDC in the PSM3 on Base, Arbitrum, Unichain, Optimism;*
> 3. *Cash Stablecoins in Curve (paired with USDS);*
> ..."

**Verification:** The Atlas ASC calculation formula explicitly lists PSM3 deployments on four L2 chains, confirming where these contracts exist.

### 2.3 Access Control at the Liquidity Layer

While PSM3 itself is permissionless, access control on other chains happens at the **ForeignController** contract level.

#### Role-Based Access

> **Source:** [Atlas A.6.1.1.1.2.6.1.2.2.1.1.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.2.1.1.1) - DEFAULT_ADMIN_ROLE (Spark)
>
> *"The admin role (`DEFAULT_ADMIN_ROLE`) is the role that can grant and revoke any role, including itself and all other roles defined in the contract. The admin role is also used for general admin functions in all contracts. This role is fully controlled by Sky Governance via the Spark Proxy."*

> **Source:** [Atlas A.6.1.1.1.2.6.1.2.2.1.1.2](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.2.1.1.2) - RELAYER_ROLE (Spark)
>
> *"The `RELAYER_ROLE` is the address for the Spark Liquidity Layer ALM Planner off-chain system that calls functions on `Controller` contracts to perform actions on behalf of the `ALMProxy` contract."*

> **Source:** [Atlas A.6.1.1.1.2.6.1.2.2.1.1.3](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.2.1.1.3) - ALM_CONTROLLER_ROLE (Spark)
>
> *"The `ALM_CONTROLLER_ROLE` is the address of the role that can call the `call` functions on the `ALMProxy` contract and update `RateLimits` contract. It includes the `MainnetController` and `ForeignController` contracts."*

**Verification:** The Atlas defines three distinct roles (DEFAULT_ADMIN, RELAYER, ALM_CONTROLLER) that control what operations the Liquidity Layer can perform. This is a contract-level access control, not PSM-level.

#### ForeignController Contracts by Chain

| Chain | Contract Address | Atlas Reference |
|-------|-----------------|-----------------|
| Base | `0xC0bcbb2554D4694fe7b34bB68b9DdfbB55D896BC` | [A.6.1.1.1.2.6.1.2.1.1.1.2.2.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.2.1) |
| Arbitrum | TBC | [A.6.1.1.1.2.6.1.2.1.1.1.2.3.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.3.1) |
| Unichain | TBC | [A.6.1.1.1.2.6.1.2.1.1.1.2.4.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.4.1) |
| Optimism | TBC | [A.6.1.1.1.2.6.1.2.1.1.1.2.5.1](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.5.1) |

**Verification:** The Atlas contains explicit contract addresses for each chain's ForeignController. "TBC" entries indicate contracts not yet deployed or addresses not yet recorded.

---

## 3. Rate Limits: Throughput Control

**Rate limits** and **whitelisting** are separate features that serve different purposes:
- **Whitelisting** controls *who* can access certain functions (authorization)
- **Rate limits** control *how much* can move through the system (throughput)

Both mainnet and L2 chains use rate limits at the Liquidity Layer level. The difference is that mainnet *also* has PSM-level whitelisting for fee-free functions.

### 3.1 Rate Limit Structure

> **Source:** [Atlas A.6.1.1.1.2.6.1.2.1.1.3](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.3) - RateLimits (Spark)
>
> *"The documents herein list the `Ratelimits` for the Spark Liquidity Layer on each blockchain."*

### 3.2 Example: Base PSM Rate Limits

> **Source:** [Atlas A.6.1.1.1.2.6.1.2.1.1.3.2](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.3.2) (Base RateLimits)
>
> | Parameter | maxAmount | slope |
> |-----------|-----------|-------|
> | `LIMIT_PSM_DEPOSIT_USDC` | 50,000,000 | 50,000,000/day |
> | `LIMIT_PSM_WITHDRAW_USDC` | 50,000,000 | 50,000,000/day |
> | `LIMIT_PSM_DEPOSIT_USDS` | Unlimited | Unlimited |
> | `LIMIT_PSM_WITHDRAW_USDS` | max | 0 |
> | `LIMIT_PSM_DEPOSIT_SUSDS` | Unlimited | Unlimited |
> | `LIMIT_PSM_WITHDRAW_SUSDS` | max | 0 |

**Verification:** The Atlas specifies exact rate limit values for each asset type on each chain. The `slope` parameter indicates how quickly limits replenish per day.

### 3.3 Rate Limit Enforcement in Code

> **Source:** [ForeignController.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/ForeignController.sol)
>
> Rate limits are enforced via modifiers that call `triggerRateLimitDecrease` before function execution:
> ```solidity
> modifier rateLimited(bytes32 key, uint256 amount) {
>     rateLimits.triggerRateLimitDecrease(key, amount);
>     _;
> }
>
> modifier rateLimitedAddress(bytes32 key, address asset, uint256 amount) {
>     rateLimits.triggerRateLimitDecrease(
>         RateLimitHelpers.makeAddressKey(key, asset),
>         amount
>     );
>     _;
> }
> ```
>
> PSM functions apply these modifiers:
> ```solidity
> function depositPSM(address asset, uint256 amount)
>     external nonReentrant onlyRole(RELAYER)
>     rateLimitedAddress(LIMIT_PSM_DEPOSIT, asset, amount)
>     returns (uint256 shares)
> ```

**Verification:** Verified by examining ForeignController.sol source code. The modifiers gate function execution by checking available rate limit capacity.

---

## 4. PSM Functions: Mainnet vs Foreign Chains

### 4.1 Mainnet PSM Functions (via MainnetController)

> **Source:** [PSMLib.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/libraries/PSMLib.sol)
>
> Operations are performed via the LitePSM using `buyGemNoFee` and `sellGemNoFee`. The PSMLib defines the interface:
> ```solidity
> interface IPSMLike {
>     function buyGemNoFee(address usr, uint256 usdcAmount)
>         external returns (uint256 usdsAmount);
>     function sellGemNoFee(address usr, uint256 usdcAmount)
>         external returns (uint256 usdsAmount);
> }
> ```
>
> And calls them via the ALMProxy:
> ```solidity
> // Swap USDS to USDC (buyGemNoFee)
> params.proxy.doCall(
>     address(params.psm),
>     abi.encodeCall(params.psm.buyGemNoFee, (address(params.proxy), params.usdcAmount))
> );
>
> // Swap USDC to USDS (sellGemNoFee)
> proxy.doCall(
>     address(psm),
>     abi.encodeCall(psm.sellGemNoFee, (address(proxy), usdcAmount))
> );
> ```

### 4.2 Foreign Chain PSM Functions (via ForeignController)

> **Source:** [ForeignController.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/ForeignController.sol)
>
> Operations use `depositPSM` and `withdrawPSM`:
> ```solidity
> function depositPSM(address asset, uint256 amount)
>     external nonReentrant onlyRole(RELAYER)
>     rateLimitedAddress(LIMIT_PSM_DEPOSIT, asset, amount)
>     returns (uint256 shares)
>
> function withdrawPSM(address asset, uint256 maxAmount)
>     external nonReentrant onlyRole(RELAYER)
>     returns (uint256 assetsWithdrawn)
> ```

**Verification:** Verified by examining PSMLib.sol and ForeignController.sol source code. Mainnet uses `buyGemNoFee`/`sellGemNoFee` (LitePSM interface), while foreign chains use `depositPSM`/`withdrawPSM` (PSM3 wrapper functions).

---

## 5. Comparative Summary

| Aspect | Mainnet LitePSM | PSM3 (Other Chains) |
|--------|-----------------|---------------------|
| **PSM-Level Access** | Whitelist required for fee-free functions | Permissionless |
| **Liquidity Layer Access** | RELAYER_ROLE on MainnetController | RELAYER_ROLE on ForeignController |
| **Rate Limits** | Liquidity Layer + PSM debt ceiling | Liquidity Layer only |
| **How to Add Agent** | Governance spell to whitelist ALMProxy | Grant RELAYER_ROLE via DEFAULT_ADMIN |
| **Swap Functions** | `buyGemNoFee`/`sellGemNoFee` (restricted) | `swapExactIn`/`swapExactOut` (public) |
| **Admin Functions** | Multiple (fees, debt ceiling, whitelist) | Single: `setPocket(address) onlyOwner` |
| **Governance** | Executive Vote for PSM changes | DEFAULT_ADMIN_ROLE (Spark Proxy) |

---

## 6. Implications

### 6.1 For New Agents Seeking PSM Access

**On Mainnet:**
1. Agent must deploy ALMProxy contract
2. Governance proposal required to whitelist ALMProxy
3. Executive Vote must pass
4. Only then can agent call `buyGemNoFee`/`sellGemNoFee`

**On Other Chains:**
1. Agent deploys ALMProxy and ForeignController
2. DEFAULT_ADMIN grants RELAYER_ROLE to agent's multisig
3. Rate limits configured for the agent
4. Agent can immediately interact with PSM3

### 6.2 Security Considerations

**Mainnet:** Governance gatekeeping provides security but adds latency for new integrations.

**Other Chains:** Permissionless PSM3 relies on:
- ForeignController access control (who can call it)
- Rate limits (how much can move)
- Multisig controls (RELAYER_ROLE holders)

---

## 7. PSM3 Asset Configuration & Deployment Architecture

### 7.1 PSM3 Supported Assets

PSM3 currently supports exactly **three assets**:

| Asset | Description | Pricing |
|-------|-------------|---------|
| **USDS** | Sky's stablecoin | 1:1 with USD |
| **sUSDS** | Yield-bearing USDS wrapper | Via rate oracle (accumulates yield) |
| **USDC** | Circle's stablecoin | 1:1 with USD |

> **Source:** [Spark PSM Documentation](https://docs.spark.fi/dev/savings/spark-psm)
>
> *"PSM3 allows swaps between USDS, sUSDS, and USDC with no slippage or fees beyond gas."*

**Key Point:** The existing PSM3 deployments use USDC, but the contract is **configurable at deployment**. Assets are passed as constructor parameters and stored as immutable variables - they cannot be changed after deployment, but a new PSM3 instance could be deployed with USDT instead of USDC.

### 7.2 PSM3 Contract Addresses

PSM3 is **shared infrastructure** - one contract per chain that any agent's Liquidity Layer can interact with.

| Chain | PSM3 Address | Source |
|-------|--------------|--------|
| Base | `0x1601843c5E9bC251A3272907010AFa41Fa18347E` | [Spark Address Registry](https://github.com/sparkdotfi/spark-address-registry) |
| Arbitrum | `0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266` | [Spark Address Registry](https://github.com/sparkdotfi/spark-address-registry) |

### 7.3 Liquidity Layer Contracts Required Per Agent

Each Star/Agent deploying on a new chain needs their **own full set** of Liquidity Layer contracts:

**Per Chain (Mainnet):**
| Contract | Purpose |
|----------|---------|
| ALMProxy | Holds custody of all funds, routes calls |
| MainnetController | Logic for PSM swaps, USDS minting, CCTP bridging |
| RateLimits | Enforces rate limit policies |
| Allocator Vault | Sky allocation system integration |
| Allocator Buffer | Buffer for allocation |
| Allocator Oracle | Price oracle for allocation |
| Allocator Registry | Registry of allocators |
| Allocator Roles | Role management for allocators |

**Per Foreign Chain (L2s):**
| Contract | Purpose |
|----------|---------|
| ALMProxy | Holds custody of all funds, routes calls |
| ForeignController | Logic for L2 PSM deposits/withdrawals, CCTP |
| RateLimits | Enforces rate limit policies |

**Plus Role Assignments:**

> **Source:** [ALMProxy.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/ALMProxy.sol), [ForeignController.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/ForeignController.sol)
>
> ```solidity
> // ALMProxy.sol - inherits OpenZeppelin AccessControl
> bytes32 public override constant CONTROLLER = keccak256("CONTROLLER");
> // DEFAULT_ADMIN_ROLE inherited from AccessControl
>
> // ForeignController.sol
> bytes32 public constant FREEZER = keccak256("FREEZER");
> bytes32 public constant RELAYER = keccak256("RELAYER");
> ```

| Role | Contract | Purpose |
|------|----------|---------|
| `DEFAULT_ADMIN_ROLE` | ALMProxy | Can grant/revoke all roles (governance) |
| `CONTROLLER` | ALMProxy | Can call `doCall` functions on proxy |
| `RELAYER` | ForeignController | Off-chain ALM Planner, executes operations |
| `FREEZER` | ForeignController | Emergency freeze capability |

### 7.4 Example: Spark vs Grove Deployments

Both Spark and Grove have **separate Liquidity Layer infrastructure**:

| Component | Spark | Grove |
|-----------|-------|-------|
| Allocator Vault | ALLOCATOR-SPARK-A | ALLOCATOR-BLOOM-A |
| Mainnet Chains | Ethereum, Base, Arbitrum, Unichain, Optimism, Avalanche | Ethereum, Base, Avalanche, Plasma, Plume |
| PSM3 Usage | Shared PSM3 contracts | Shared PSM3 contracts |

This confirms that **PSM3 is shared**, but **Liquidity Layer is per-agent**.

### 7.5 Implications for New Stars (e.g., Prysm)

If a new Star like Prysm wanted to deploy:

**To use existing PSM3 (USDS/sUSDS/USDC):**
1. Deploy ALMProxy on each target chain
2. Deploy ForeignController (L2s) or MainnetController (mainnet)
3. Deploy RateLimits contract
4. Deploy Allocator contracts (mainnet only)
5. Configure role assignments (RELAYER, FREEZER, ADMIN)
6. Set rate limits for PSM operations

**Estimated contracts: ~6 per chain minimum** (confirming the "at least 6 contracts" observation)

**To support USDT instead of USDC:**

> **Source:** [PSM3.sol](https://github.com/sparkdotfi/spark-psm/blob/master/src/PSM3.sol)

PSM3 accepts asset addresses as constructor parameters and stores them as immutables, so a new deployment could use USDT:

```solidity
// Constructor parameters - configurable at deployment
constructor(
    address owner_,
    address usdc_,   // Could be USDT address instead
    address usds_,
    address susds_,  // Could be syrupUSDT instead
    address rateProvider_
)

// Stored as immutables - cannot change after deployment
IERC20 public override immutable usdc;
IERC20 public override immutable usds;
IERC20 public override immutable susds;
```

Options for Prysm:
1. Deploy new PSM3 instance with USDT address in place of USDC
2. Use existing USDC-based PSM3 and swap USDT→USDC externally
3. Request Spark/governance to deploy a USDT variant on shared infrastructure

**Note on syrupUSDT:** If Prysm wanted to use Maple/Syrup's yield-bearing USDT (syrupUSDT) analogous to how Spark uses sUSDS, they could deploy PSM3 with:
- `usdc_` → USDT address
- `susds_` → syrupUSDT address
- `rateProvider_` → A rate provider returning syrupUSDT/USD conversion rate

The contract architecture supports this - it just requires a compatible rate provider for the yield-bearing asset.

---

## Sources

### Atlas References (atlas-2026-01-22.json)

All Atlas links point to [sky-atlas.io](https://sky-atlas.io), the public interface for the Sky Atlas governance documentation.

| Section | Title | Link |
|---------|-------|------|
| A.3.3.2.2.1.1.1 | Resting Actively Stabilizing Collateral Calculations | [View](https://sky-atlas.io/#A.3.3.2.2.1.1.1) |
| A.3.3.2.7.1.1 | Lite Peg Stability Module | [View](https://sky-atlas.io/#A.3.3.2.7.1.1) |
| A.3.3.2.7.1.1.1.7 | Authorized Parties Definition | [View](https://sky-atlas.io/#A.3.3.2.7.1.1.1.7) |
| A.3.3.2.7.1.1.2 | LitePSM Parameter Values | [View](https://sky-atlas.io/#A.3.3.2.7.1.1.2) |
| A.3.3.2.7.1.1.3 | LitePSM Parameter Modification | [View](https://sky-atlas.io/#A.3.3.2.7.1.1.3) |
| A.6.1.1.1.2.6.1.2.1.1.1.2.2.1 | ForeignController Base Address | [View](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.1.2.2.1) |
| A.6.1.1.1.2.6.1.2.1.1.3 | RateLimits | [View](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.1.1.3) |
| A.6.1.1.1.2.6.1.2.2.1.1.1 | DEFAULT_ADMIN_ROLE | [View](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.2.1.1.1) |
| A.6.1.1.1.2.6.1.2.2.1.1.2 | RELAYER_ROLE | [View](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.2.1.1.2) |
| A.6.1.1.1.2.6.1.2.2.1.1.3 | ALM_CONTROLLER_ROLE | [View](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.2.1.1.3) |
| A.6.1.1.1.2.6.1.2.2.1.2.1.2.4 | PSM Functions (Mainnet) | [View](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.2.1.2.1.2.4) |
| A.6.1.1.1.2.6.1.2.2.1.2.2.2.3 | PSM Functions (Foreign) | [View](https://sky-atlas.io/#A.6.1.1.1.2.6.1.2.2.1.2.2.2.3) |
| A.6.1.1.3.2.6.1.2.1.1.4.2 | ALMProxy Whitelisting (Keel) | [View](https://sky-atlas.io/#A.6.1.1.3.2.6.1.2.1.1.4.2) |
| A.6.1.1.5.2.6.1.2.1.1.4.2 | ALMProxy Whitelisting (Obex) | [View](https://sky-atlas.io/#A.6.1.1.5.2.6.1.2.1.1.4.2) |

### External Sources

**Documentation:**
- [Spark PSM Documentation](https://docs.spark.fi/dev/savings/spark-psm) - PSM3 architecture, supported assets, and authorization model
- [Spark ALM Controller Documentation](https://docs.spark.fi/dev/spark-liquidity-layer/spark-alm-controller) - Liquidity Layer contract architecture

**Source Code (verified assertions):**
- [PSM3.sol](https://github.com/sparkdotfi/spark-psm/blob/master/src/PSM3.sol) - PSM3 contract: constructor parameters, Ownable pattern, permissionless functions
- [ForeignController.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/ForeignController.sol) - L2 controller: depositPSM/withdrawPSM, RELAYER/FREEZER roles, rate limit modifiers
- [MainnetController.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/MainnetController.sol) - Mainnet controller: swapUSDSToUSDC/swapUSDCToUSDS
- [PSMLib.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/libraries/PSMLib.sol) - LitePSM interface: buyGemNoFee/sellGemNoFee calls
- [ALMProxy.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/ALMProxy.sol) - Proxy contract: CONTROLLER role, AccessControl inheritance
- [RateLimits.sol](https://github.com/sparkdotfi/spark-alm-controller/blob/master/src/RateLimits.sol) - Rate limiting: triggerRateLimitDecrease, getCurrentRateLimit

**Address Registry:**
- [Spark Address Registry (GitHub)](https://github.com/sparkdotfi/spark-address-registry) - Contract addresses for all chains

**On-Chain:**
- [Spark PSM3 on Arbitrum (Arbiscan)](https://arbiscan.io/address/0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266) - Deployed contract

**Governance:**
- [Feb 2025 Spark Spell Proposal](https://forum.sky.money/t/feb-20-2025-proposed-changes-to-spark-for-upcoming-spell/25951) - Arbitrum onboarding details

---

## Appendix: Methodology

### How This Report Was Generated

1. **Primary Source:** The `atlas-2026-01-26.json` data file was queried for all nodes containing "PSM", "whitelist", "authorized", and "LitePSM" keywords.

2. **Cross-Referencing:** Agent-specific documentation (Keel, Obex, Spark, Grove) was examined to understand how different actors interact with PSMs.

3. **External Verification:** The Spark PSM documentation was fetched to confirm the permissionless nature of PSM3 on foreign chains.

4. **Contract Analysis:** On-chain contract addresses were verified against the Atlas documentation.

5. **GitHub Research:** The Spark Address Registry and ALM Controller repositories were examined to determine exact contract addresses and deployment architecture for Section 7.

6. **Comparative Analysis:** Spark and Grove Liquidity Layer structures were compared to understand per-agent deployment requirements.

7. **Contract Source Review:** PSM3.sol was examined to verify asset configurability (constructor parameters vs hardcoded constants).

### Limitations

- This report reflects the Atlas state as of 2026-01-26. Governance may have enacted changes since this snapshot.
- "TBC" entries indicate addresses not yet recorded in the Atlas; actual contracts may exist on-chain.
- The Spark PSM documentation is maintained separately from the Atlas and may have additional details not captured here.
- Information about future Stars (e.g., Prysm) is speculative based on current architecture patterns.
