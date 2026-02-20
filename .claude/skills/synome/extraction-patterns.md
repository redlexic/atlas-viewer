# Synome Extraction Patterns

Regex patterns and jq recipes for extracting structured data from Atlas JSON.

## jq Recipes

### Extract Agent Subtree

```bash
# Get current atlas filename from dataPaths.ts first, then:
ATLAS_FILE="public/data/atlas/atlas-YYYY-MM-DD.json"

# Single agent (e.g., Spark at A.6.1.1.1)
cat "$ATLAS_FILE" | jq '.. | objects | select(.doc_no == "A.6.1.1.1")' > /tmp/synome-spark.json

# All agents
for i in 1 2 3 4 5 6; do
  AGENT=$(echo "spark grove keel skybase obex prysm" | cut -d' ' -f$i)
  cat "$ATLAS_FILE" | jq ".. | objects | select(.doc_no == \"A.6.1.1.$i\")" > /tmp/synome-$AGENT.json
done
```

### Extract Specific Data

```bash
# All Ethereum addresses in an agent
cat /tmp/synome-spark.json | jq -r '.. | .content? // empty' | grep -oP '0x[a-fA-F0-9]{40}' | sort -u

# All doc_no references
cat /tmp/synome-spark.json | jq -r '.. | .doc_no? // empty' | sort -V

# All node names
cat /tmp/synome-spark.json | jq -r '.. | objects | select(.name?) | .name' | head -50

# Find primitive status nodes
cat /tmp/synome-spark.json | jq '.. | objects | select(.name? | test("Global Activation Status"; "i")) | {doc_no, name, content}'

# Find instance configuration documents
cat /tmp/synome-spark.json | jq '.. | objects | select(.name? | test("Instance Configuration|Configuration Document"; "i")) | {doc_no, name}'

# Count total nodes
cat /tmp/synome-spark.json | jq '[.. | objects | select(.uuid?)] | length'
```

## Regex Patterns

### Ethereum Addresses

```regex
0x[a-fA-F0-9]{40}
```

Context determination:
- In a "SubProxy" section → `identity.subproxy_address`
- In a "Multisig" section → `multisigs[].address`
- In an "Instance Configuration" → `instances[].contracts.*`
- In a "Rate Limit" section → `instances[].contracts.rate_limits`

### Doc Number References

```regex
A\.\d+(?:\.\d+)+
```

Used to build cross-reference edges (`REFERENCES` edge type).

### UUID References (in Markdown Links)

```regex
\[([^\]]+)\]\(([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\)
```

Captures: `[link text](uuid)` → build `REFERENCES` edges to target UUID.

### Status Values

```regex
`(Active|Completed|Inactive|Suspended)`
```

Found in "Global Activation Status" nodes. The backtick-wrapped value is the canonical status.

### Rate Limits

```regex
maxAmount[:\s]+(\d[\d,]*)
slope[:\s]+(\d[\d,]*)\s*(per\s*day|/day)?
```

Typically found in Instance Configuration Documents under rate limit sections.

### Percentages

```regex
(\d+(?:\.\d+)?)\s*%
```

Context-dependent:
- In governance sections → voting thresholds, quorum
- In distribution sections → allocation percentages
- In penalty sections → APY rates (expressed as basis points elsewhere)

### Multisig Configurations

```regex
(\d+)\s*(?:of|/)\s*(\d+)
```

Captures signer threshold (e.g., "3 of 5" → signers_required=3, signers_total=5).

### Token Amounts

```regex
(\d[\d,]*(?:\.\d+)?)\s*(SPK|GROVE|KEEL|OBEX|USDS|USDC|SKY|MKR|DAI|ETH)
```

### Basis Points

```regex
(\d+)\s*(?:bp|bps|basis\s*points)
```

Used in BEAM parameters (divide by 10000 to get decimal).

## Content Structure Patterns

### Bullet Point Parameters

Many Instance Configuration Documents use bullet-point lists for parameters:

```regex
[•◦-]\s*(.+?):\s*(.+)
```

### Markdown Tables

Rate limits and parameters often appear in markdown tables:

```
| Parameter | Value |
|-----------|-------|
| maxAmount | 200,000,000 |
```

Parse by splitting on `|` and trimming whitespace.

### Code Blocks

Some content embeds parameter values in fenced code blocks:

````regex
```[a-z]*\n([\s\S]*?)```
````

## Atlas Node Child Detection

Children are in dynamically-named array fields. Detect with:

```typescript
// Any array field containing objects with {type, doc_no, uuid}
for (const key in node) {
  const value = node[key];
  if (Array.isArray(value) && value.length > 0 &&
      value[0] && typeof value[0] === 'object' &&
      'type' in value[0] && 'doc_no' in value[0] && 'uuid' in value[0]) {
    // value is an array of child AtlasNodes
  }
}
```

Common child array field names: `Scopes`, `Articles`, `Sections`, `Cores`, `Primitives`, `Instances`, `Elements`.

## Primitive Status Extraction Path

For a given agent at `A.6.1.1.X`:
1. Navigate to Sky Primitives section: `A.6.1.1.X.2`
2. Each primitive category is at `A.6.1.1.X.2.N` (N=1-7)
3. Individual primitives are children of the category
4. Status is at the primitive's Hub Document → Global Activation Status child
5. Active instances are at the primitive's "Active Instances" child directory

## Network Identification

When extracting contract addresses, determine network from context:
- Default: Ethereum Mainnet
- Look for keywords: "Base", "Arbitrum", "Optimism" in parent sections
- PSM3 on Base: `0x1601843c5E9bC251A3272907010AFa41Fa18347E`
- PSM3 on Arbitrum: `0x2B05F8e1cACC6974fD79A673a341Fe1f58d27266`
- Mainnet LitePSM: `0xf6e72Db5454dd049d0788e411b06CfAF16853042`
