# Pattern (Launch Agent 5) Artifact Edits

**Draft Date:** 2026-01-27
**Technical Scope:** [Technical Scope of the new PATTERN allocator instance](https://forum.sky.money/t/technical-scope-of-the-new-pattern-allocator-instance/27641)
**Related PR:** [sky-ecosystem/next-gen-atlas#170](https://github.com/sky-ecosystem/next-gen-atlas/pull/170)

---

## Summary of Changes

| Contract | Address | Chainlog Key |
|----------|---------|--------------|
| AllocatorBuffer | `0x823459b55D79F0421f24a4828237F7ecb8D7F1ef` | - |
| AllocatorVault | `0xbd34fc6AAa1d3F52B314CB9D78023dd23eAc3B0E` | - |
| SubProxy | `0xbC8959Ae2d4E9B385Fe620BEF48C2FD7f4A84736` | `PATTERN_SUBPROXY` |
| StarGuard | `0x2fb18b28fB39Ec3b26C3B5AF5222e2ca3B8B2269` | `PATTERN_STARGUARD` |

**Ilk:** `ALLOCATOR-PATTERN-A`

---

## Edited Sections

### Agent Creation Primitive - Parameters

#### A.6.1.1.6.2.1.1.3: Completed Instances Directory

The Instances of the Agent Creation Primitive with `Completed` Status are contained herein.

#### A.6.1.1.6.2.1.1.3.1: Single Instance Configuration Document

The documents herein contain the Instance Configuration Document for the Single Agent Creation Primitive Instance.

#### A.6.1.1.6.2.1.1.3.1.1: Parameters

The documents herein define the parameters of the Single Instance of the Agent Creation Primitive.

#### A.6.1.1.6.2.1.1.3.1.1.2: SubProxy Account

The address of Pattern's SubProxy Account on the Ethereum Mainnet is `0xbC8959Ae2d4E9B385Fe620BEF48C2FD7f4A84736`.

#### A.6.1.1.6.2.1.1.3.1.1.5: StarGuard Contract

The address of Pattern's StarGuard Contract on the Ethereum Mainnet is `0x2fb18b28fB39Ec3b26C3B5AF5222e2ca3B8B2269`.

#### A.6.1.1.6.2.1.1.3.1.1.6: StarGuard Max Delay

The Pattern StarGuard `maxDelay` is seven (7) days.

---

### Allocation System Primitive - Contract Addresses

#### A.6.1.1.6.2.6.1.2: Multi-Instance Coordinator Document

~~The documents herein specify the logic for coordinating multiple Instances of the Allocation System Primitive. In the future, additional logic will be added herein regarding how capital is allocated between different Instances of the Allocation System Primitive.~~

The documents herein provide general specifications of the Pattern Allocation System and define Pattern's overarching strategy and operational framework for managing across all Instances.

#### A.6.1.1.6.2.6.1.2.1: General Specifications

The documents herein contain general specifications for the Pattern Allocation System.

#### A.6.1.1.6.2.6.1.2.1.1: Allocation System Architecture

The documents herein describe the high-level design of the Pattern Allocation System, including its key smart contracts and their functionality.

#### A.6.1.1.6.2.6.1.2.1.1.1: Allocation System Addresses

The documents herein provide the addresses of the Pattern Allocation System's constituent contracts.

#### A.6.1.1.6.2.6.1.2.1.1.1.1: Allocator Contract Addresses

The documents herein contain global key addresses for the Allocator Contracts.

#### A.6.1.1.6.2.6.1.2.1.1.1.1.1: Ethereum Mainnet

The documents herein contain the Allocator Contract Addresses on the Ethereum Mainnet.

#### A.6.1.1.6.2.6.1.2.1.1.1.1.1.1: Allocator Buffer Contract

The address of the ALLOCATOR_BUFFER contract is: `0x823459b55D79F0421f24a4828237F7ecb8D7F1ef`

#### A.6.1.1.6.2.6.1.2.1.1.1.1.1.2: Allocator Vault Contract

The address of the ALLOCATOR_VAULT contract is: `0xbd34fc6AAa1d3F52B314CB9D78023dd23eAc3B0E`

---

## Not In Scope (Sky Core Atlas)

The SP-BEAM parameters are being added via PR #170 to Sky Core Atlas at `A.3.7.1.2.3.5` and are **not part of this artifact edit**.

---

## Verification Checklist

- [x] AllocatorBuffer - Code matches audited source at 226584d commit
- [x] AllocatorVault - Code matches audited source at 226584d commit
- [x] SubProxy - Code matches audited source at 5bf4b17 commit
- [x] StarGuard - Code matches audited source at 52239d7 commit
- [x] All contracts: Only MCD_PAUSE_PROXY is relied, deployer is denied

---

## Block Explorer Links

| Contract | Explorer |
|----------|----------|
| AllocatorBuffer | [Etherscan](https://etherscan.io/address/0x823459b55D79F0421f24a4828237F7ecb8D7F1ef) |
| AllocatorVault | [Etherscan](https://etherscan.io/address/0xbd34fc6AAa1d3F52B314CB9D78023dd23eAc3B0E) |
| SubProxy | [Etherscan](https://etherscan.io/address/0xbC8959Ae2d4E9B385Fe620BEF48C2FD7f4A84736) |
| StarGuard | [Etherscan](https://etherscan.io/address/0x2fb18b28fB39Ec3b26C3B5AF5222e2ca3B8B2269) |
