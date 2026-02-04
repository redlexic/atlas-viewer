# Skybase (Launch Agent 3) Artifact Edits

**Draft Date:** 2026-01-27
**Technical Scope:** [Technical Scope of the new Skybase Agent](https://forum.sky.money/t/technical-scope-of-the-new-skybase-agent/27642)

---

## Summary of Changes

| Contract | Address | Chainlog Key |
|----------|---------|--------------|
| SubProxy | `0x08978E3700859E476201c1D7438B3427e3C81140` | `SKYBASE_SUBPROXY` |
| StarGuard | `0xA170086AeF9b3b81dD73897A0dF56B55e4C2a1F7` | `SKYBASE_STARGUARD` |

**Note:** No allocation module included per Core Council recommendation.

---

## Edited Sections

### Agent Creation Primitive - Parameters

#### A.6.1.1.4.2.1.1.3: Completed Instances Directory

The Instances of the Agent Creation Primitive with `Completed` Status are contained herein.

#### A.6.1.1.4.2.1.1.3.1: Single Instance Configuration Document

The documents herein contain the Instance Configuration Document for the Single Agent Creation Primitive Instance.

#### A.6.1.1.4.2.1.1.3.1.1: Parameters

The documents herein define the parameters of the Single Instance of the Agent Creation Primitive.

#### A.6.1.1.4.2.1.1.3.1.1.2: SubProxy Account

The address of Skybase's SubProxy Account on the Ethereum Mainnet is `0x08978E3700859E476201c1D7438B3427e3C81140`.

#### A.6.1.1.4.2.1.1.3.1.1.5: StarGuard Contract

The address of Skybase's StarGuard Contract on the Ethereum Mainnet is `0xA170086AeF9b3b81dD73897A0dF56B55e4C2a1F7`.

#### A.6.1.1.4.2.1.1.3.1.1.6: StarGuard Max Delay

The Skybase StarGuard `maxDelay` is seven (7) days.

---

## Verification Checklist

- [x] SubProxy - Code matches audited source at 5bf4b17 commit
- [x] StarGuard - Code matches audited source at 52239d7 commit
- [x] All contracts: Only MCD_PAUSE_PROXY is relied, deployer is denied

---

## Block Explorer Links

| Contract | Explorer |
|----------|----------|
| SubProxy | [Etherscan](https://etherscan.io/address/0x08978E3700859E476201c1D7438B3427e3C81140) |
| StarGuard | [Etherscan](https://etherscan.io/address/0xA170086AeF9b3b81dD73897A0dF56B55e4C2a1F7) |
