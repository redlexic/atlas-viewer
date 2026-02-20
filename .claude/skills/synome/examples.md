# Synome Extraction Examples

Sample outputs showing expected format for each extraction type.

## Agent Identity Extraction

```json
{
  "metadata": {
    "extractedAt": "2026-02-12T00:00:00.000Z",
    "atlasVersion": "2026-02-10",
    "agent": "spark",
    "docPrefix": "A.6.1.1.1"
  },
  "identity": {
    "name": "Spark",
    "doc_prefix": "A.6.1.1.1",
    "agent_type": "Prime",
    "subproxy_address": "0x3300f198988e4C9C63F75dF86De36421f06af8c4",
    "foundation_name": "Spark Assets Foundation",
    "token": {
      "symbol": "SPK",
      "genesis_supply": "1000000000"
    }
  }
}
```

## Multi-Agent Identity Summary

```json
{
  "agents": [
    {
      "name": "Spark",
      "doc_prefix": "A.6.1.1.1",
      "subproxy_address": "0x3300f198988e4C9C63F75dF86De36421f06af8c4",
      "token_symbol": "SPK",
      "foundation": "Spark Assets Foundation"
    },
    {
      "name": "Grove",
      "doc_prefix": "A.6.1.1.2",
      "subproxy_address": "0x1369f7b2b38c76B6478c0f0E66D94923421891Ba",
      "token_symbol": "GROVE",
      "foundation": "Grove Foundation"
    },
    {
      "name": "Keel",
      "doc_prefix": "A.6.1.1.3",
      "subproxy_address": "0x355CD90Ecb1b409Fdf8b64c4473C3B858dA2c310",
      "token_symbol": "KEEL",
      "foundation": "Keel Foundation"
    },
    {
      "name": "Obex",
      "doc_prefix": "A.6.1.1.5",
      "subproxy_address": "0x8be042581f581E3620e29F213EA8b94afA1C8071",
      "token_symbol": "OBEX",
      "foundation": "Obex Foundation"
    }
  ]
}
```

## Primitive Status Report

```json
{
  "primitives": [
    {
      "name": "Agent Creation Primitive",
      "doc_no": "A.6.1.1.4.2.1.1",
      "category": "genesis",
      "status": "Completed",
      "activeInstances": [],
      "completedInstances": [
        {
          "name": "Skybase Agent Creation",
          "doc_no": "A.6.1.1.4.2.1.1.3.1"
        }
      ]
    },
    {
      "name": "Executor Accord Primitive",
      "doc_no": "A.6.1.1.4.2.2.1",
      "category": "operational",
      "status": "Active",
      "activeInstances": [
        {
          "name": "Skybase Executor Accord Instance",
          "doc_no": "A.6.1.1.4.2.2.1.2.1",
          "addresses": [],
          "parameters": {
            "executor": "Skybase Operations Ltd"
          }
        }
      ],
      "completedInstances": []
    },
    {
      "name": "Distribution Requirement Primitive",
      "doc_no": "A.6.1.1.4.2.3.1",
      "category": "economic",
      "status": "Inactive",
      "activeInstances": [],
      "completedInstances": []
    }
  ]
}
```

## Rate Limit Extraction (from SLL Instance)

```json
{
  "instances": [
    {
      "name": "SLL Instance Configuration",
      "doc_no": "A.6.1.1.1.2.X.2.1",
      "status": "Active",
      "addresses": [
        "0xf6e72Db5454dd049d0788e411b06CfAF16853042"
      ],
      "parameters": {
        "protocol": "Spark Liquidity Layer",
        "network": "ethereum-mainnet"
      },
      "rateLimits": [
        {
          "id": "LIMIT_USDS_MINT",
          "type": "outflow",
          "max_amount": "200000000",
          "slope": "400000000",
          "slope_unit": "per_day",
          "currency": "USDS"
        },
        {
          "id": "LIMIT_USDS_BURN",
          "type": "inflow",
          "max_amount": "unlimited",
          "slope": "unlimited",
          "currency": "USDS"
        }
      ]
    }
  ]
}
```

## Address Registry

```json
{
  "addresses": [
    {
      "address": "0x3300f198988e4C9C63F75dF86De36421f06af8c4",
      "context": "Spark SubProxy Account",
      "doc_no": "A.6.1.1.1",
      "network": "ethereum-mainnet"
    },
    {
      "address": "0xf6e72Db5454dd049d0788e411b06CfAF16853042",
      "context": "Mainnet LitePSM (MCD_LITE_PSM_USDC_A)",
      "doc_no": "A.6.1.1.1.2.4.1.2.1",
      "network": "ethereum-mainnet"
    },
    {
      "address": "0x1601843c5E9bC251A3272907010AFa41Fa18347E",
      "context": "Base PSM3",
      "doc_no": "A.6.1.1.1.2.4.1.2.2",
      "network": "base"
    }
  ]
}
```

## BEAM Parameter Extraction

```json
{
  "beam_config": {
    "stUSDS_rate": {
      "min_bp": 200,
      "max_bp": 5000,
      "step_bp": 500,
      "tau_hours": 16
    },
    "SKY_borrow_rate": {
      "min_bp": 210,
      "max_bp": 5000,
      "step_bp": 500,
      "tau_hours": 16
    }
  }
}
```

## Penalty Schedule Extraction

```json
{
  "penalty_schedules": {
    "low_severity": {
      "threshold": "100% <= ER < 103%",
      "tiers": [
        { "start_min": 0, "end_min": 30, "apy": 500 },
        { "start_min": 30, "end_min": 60, "apy": 1000 },
        { "start_min": 60, "end_min": null, "apy": 1500 }
      ]
    },
    "high_severity": {
      "threshold": "ER >= 103%",
      "tiers": [
        { "start_min": 0, "end_min": 15, "apy": 1500 },
        { "start_min": 15, "end_min": 30, "apy": 2000 },
        { "start_min": 30, "end_min": 60, "apy": 2500 },
        { "start_min": 60, "end_min": null, "apy": 3000 }
      ]
    }
  }
}
```

## Report Output Format

When using `/synome report <agent>`, the markdown report should follow this structure:

```markdown
# Synome Report: [Agent Name]

**Atlas Version:** YYYY-MM-DD
**Generated:** YYYY-MM-DD
**Doc Prefix:** A.6.1.1.X

## Identity
- **Agent Type:** Prime
- **Foundation:** [Name]
- **SubProxy:** `0x...`
- **Token:** [SYMBOL] (genesis supply: X)

## Primitive Status Matrix

| Primitive | Category | Status | Active | Completed |
|-----------|----------|--------|--------|-----------|
| Agent Creation | Genesis | Completed | 0 | 1 |
| ... | ... | ... | ... | ... |

**Summary:** X active, Y completed, Z inactive out of N total

## Active Instance Details

### [Instance Name] (A.6.1.1.X.2.Y.Z)
- **Status:** Active
- **Addresses:** `0x...`
- **Parameters:**
  - key: value

## Address Registry

| Address | Context | Doc No |
|---------|---------|--------|
| `0x...` | SubProxy | A.6.1.1.X |

## Statistics
- Total nodes: X
- Primitives: X (Y active)
- Instances: X
- Addresses: X
```
