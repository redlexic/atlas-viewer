# Keel (A.6.1.1.3) - Reference Document

**Generated:** 2026-01-27
**Purpose:** Reference document showing existing Keel artifact structure (no edits)

---

## Summary of Contracts

| Contract | Address | Notes |
|----------|---------|-------|
| SubProxy | `0x355CD90Ecb1b409Fdf8b64c4473C3B858dA2c310` | Ethereum Mainnet |
| Allocator Buffer | `0x065E5De3D3A08c9d14BF79Ce5A6d3D0E8794640c` | Ethereum Mainnet |
| Allocator Oracle | `0xc7B91C401C02B73CBdF424dFaaa60950d5040dB7` | Shared |
| Allocator Registry | `0xCdCFA95343DA7821fdD01dc4d0AeDA958051bB3B` | Shared |
| Allocator Roles | `0x9A865A710399cea85dbD9144b7a09C889e94E803` | Shared |
| Allocator Vault (Nova) | `0xe4470DD3158F7A905cDeA07260551F72d4bB0e77` | Ethereum Mainnet |
| ALM Controller | `0xEF26BDc34F35669C235345aeF24A251B1EE80EF3` | MainnetController v1.7.0 |
| ALM Proxy | `0xa5139956eC99aE2e51eA39d0b57C42B6D8db0758` | Ethereum Mainnet |
| ALM Rate Limits | `0x65E7B39e508944F7C4278d3e4580f84Eb20b26a7` | Ethereum Mainnet |

---

## Agent Creation Primitive - Parameters

#### A.6.1.1.3.2.1.1.3: Completed Instances Directory

The Instances of the Agent Creation Primitive with `Completed` Status are contained herein.

#### A.6.1.1.3.2.1.1.3.1: Single Instance Configuration Document

The documents herein contain the Instance Configuration Document for the Single Agent Creation Primitive Instance.

#### A.6.1.1.3.2.1.1.3.1.1: Parameters

The documents herein define the parameters of the Single Instance of the Agent Creation Primitive.

#### A.6.1.1.3.2.1.1.3.1.1.1: Name

The name of the Agent is Keel.

#### A.6.1.1.3.2.1.1.3.1.1.2: SubProxy Account

The address of Keel's SubProxy Account on the Ethereum Mainnet is `0x355CD90Ecb1b409Fdf8b64c4473C3B858dA2c310`.

#### A.6.1.1.3.2.1.1.3.1.1.3: Genesis Account

The address of Keel's Genesis Account will be specified in a future iteration of the Keel Artifact.

#### A.6.1.1.3.2.1.1.3.1.1.4: Custom Instance Parameters

The documents herein define the custom parameters of the Single Instance of the Agent Creation Primitive, if any.

---

## Allocation System Primitive - Contract Addresses

#### A.6.1.1.3.2.6.1.2: Multi-Instance Coordinator Document

The documents herein provide general specifications of the Keel Liquidity Layer and define Keel's overarching strategy and operational framework for managing across all Instances.

#### A.6.1.1.3.2.6.1.2.1: General Specifications

The documents herein contain general specifications for the Keel Liquidity Layer.

#### A.6.1.1.3.2.6.1.2.1.1: Keel Liquidity Layer Architecture

The documents herein describe the high-level design of the Keel Liquidity Layer, including its key smart contracts and their functionality.

#### A.6.1.1.3.2.6.1.2.1.1.1: Keel Liquidity Layer Addresses

The subdocuments herein provide the addresses of the Keel Liquidity Layer's constituent contracts.

#### A.6.1.1.3.2.6.1.2.1.1.1.1: Allocator Contract Addresses

The documents herein contain global key addresses for the Allocator Contracts.

#### A.6.1.1.3.2.6.1.2.1.1.1.1.1: Ethereum Mainnet

The documents herein contain the Allocator Contract Addresses on the Ethereum Mainnet.

#### A.6.1.1.3.2.6.1.2.1.1.1.1.1.1: Allocator Buffer Contract

The address of the ALLOCATOR_BUFFER contract is: `0x065E5De3D3A08c9d14BF79Ce5A6d3D0E8794640c`

#### A.6.1.1.3.2.6.1.2.1.1.1.1.1.2: Allocator Oracle Contract

The address of the ALLOCATOR_ORACLE contract is: `0xc7B91C401C02B73CBdF424dFaaa60950d5040dB7`

#### A.6.1.1.3.2.6.1.2.1.1.1.1.1.3: Allocator Registry Contract

The address of the ALLOCATOR_REGISTRY contract is: `0xCdCFA95343DA7821fdD01dc4d0AeDA958051bB3B`

#### A.6.1.1.3.2.6.1.2.1.1.1.1.1.4: Allocator Roles Contract

The address of the ALLOCATOR_ROLES contract is: `0x9A865A710399cea85dbD9144b7a09C889e94E803`

#### A.6.1.1.3.2.6.1.2.1.1.1.1.1.5: Allocator Vault (Nova) Contract

The address of the ALLOCATOR_VAULT (ALLOCATOR Nova) contract is: `0xe4470DD3158F7A905cDeA07260551F72d4bB0e77`

#### A.6.1.1.3.2.6.1.2.1.1.1.2: ALM Contracts

The documents herein contain addresses for the ALM Contracts for the Keel Liquidity Layer.

#### A.6.1.1.3.2.6.1.2.1.1.1.2.1: Ethereum Mainnet

The documents herein contain the ALM Contract Addresses for the Keel Liquidity Layer on the Ethereum Mainnet.

#### A.6.1.1.3.2.6.1.2.1.1.1.2.1.1: ALM Controller Contract Address

The address of the ALM_CONTROLLER (`MainnetController`) contract is: `0xEF26BDc34F35669C235345aeF24A251B1EE80EF3`

#### A.6.1.1.3.2.6.1.2.1.1.1.2.1.2: ALM Controller Contract Version

The ALM_CONTROLLER contract version is: `1.7.0`

#### A.6.1.1.3.2.6.1.2.1.1.1.2.1.3: ALM Freezer Multisig Address

The address of the Multisig that has the Freezer Role is specified in [A.6.1.1.3.2.6.1.2.1.2.2.3 - Freezer Multisig](50ef16ee-1309-4172-befa-186529eb91c3).

#### A.6.1.1.3.2.6.1.2.1.1.1.2.1.4: ALM Relayer Multisig Addresses

The addresses of the Multisigs that have the Relayer Role are specified in [A.6.1.1.3.2.6.1.2.1.2.2.1 - Prime Relayer Multisig](0bdf0649-1446-4ea7-b8dd-e41dc26b9be7) and [A.6.1.1.3.2.6.1.2.1.2.2.2 - Core Operator Relayer Multisig](b17a4a11-7340-4113-972d-76362f816b8a).

#### A.6.1.1.3.2.6.1.2.1.1.1.2.1.5: ALM Proxy Contract

The address of the ALM_PROXY contract is: `0xa5139956eC99aE2e51eA39d0b57C42B6D8db0758`

#### A.6.1.1.3.2.6.1.2.1.1.1.2.1.6: ALM Rate Limits Contract

The address of the ALM_RATE_LIMITS contract is: `0x65E7B39e508944F7C4278d3e4580f84Eb20b26a7`

#### A.6.1.1.3.2.6.1.2.1.1.1.2.2: Solana

The documents herein contain the ALM Program Addresses for the Keel Liquidity Layer on Solana.

#### A.6.1.1.3.2.6.1.2.1.1.1.2.2.1: Solana ALM Controller Program

The address of the SOLANA_ALM_CONTROLLER (`SvmAlmController`) program is: `ALM1JSnEhc5PkNecbSZotgprBuJujL5objTbwGtpTgTd`.

#### A.6.1.1.3.2.6.1.2.1.1.1.2.2.2: Solana ALM Controller State

The address of the state instance configured for Keel is: `EeobZr57FSmNvw8Hs719iULJNqv3XLrTB5uPezvC2ND3`.

---

## Block Explorer Links

| Contract | Explorer |
|----------|----------|
| SubProxy | [Etherscan](https://etherscan.io/address/0x355CD90Ecb1b409Fdf8b64c4473C3B858dA2c310) |
| Allocator Buffer | [Etherscan](https://etherscan.io/address/0x065E5De3D3A08c9d14BF79Ce5A6d3D0E8794640c) |
| Allocator Vault (Nova) | [Etherscan](https://etherscan.io/address/0xe4470DD3158F7A905cDeA07260551F72d4bB0e77) |
| ALM Controller | [Etherscan](https://etherscan.io/address/0xEF26BDc34F35669C235345aeF24A251B1EE80EF3) |
| ALM Proxy | [Etherscan](https://etherscan.io/address/0xa5139956eC99aE2e51eA39d0b57C42B6D8db0758) |
| ALM Rate Limits | [Etherscan](https://etherscan.io/address/0x65E7B39e508944F7C4278d3e4580f84Eb20b26a7) |
