/**
 * Atlas Deep Search & Tagging Analysis
 *
 * This script performs a depth-first search of the Atlas tree and creates
 * a tagging data model to identify related sections.
 *
 * Focus areas:
 * - SkyLink (bridging infrastructure)
 * - Keel (agent with bridging responsibilities)
 * - sUSDS (savings token)
 * - ERC4626 (vault standard for yield-bearing tokens)
 * - Bridging/multichain operations
 */

const fs = require('fs');
const path = require('path');

// Load atlas data (latest version includes all agents)
const atlasPath = path.join(__dirname, '../public/atlas-2025-12-11.json');
const atlasData = JSON.parse(fs.readFileSync(atlasPath, 'utf-8'));
console.log('Loaded Atlas 2025-12-11');

// Tag definitions with search patterns
const TAG_DEFINITIONS = {
  skylink: {
    name: 'SkyLink',
    description: 'SkyLink bridging infrastructure and multichain token transfers',
    patterns: [/skylink/i, /token\s*bridge/i, /multichain/i, /crosschain/i, /cross-chain/i]
  },
  keel: {
    name: 'Keel',
    description: 'Keel agent and its responsibilities',
    patterns: [/\bKeel\b/]
  },
  susds: {
    name: 'sUSDS',
    description: 'Sky USD Savings token and savings rate mechanism',
    patterns: [/sUSDS/i, /sky\s*savings\s*rate/i, /savings\s*rate\s*mechanism/i]
  },
  erc4626: {
    name: 'ERC4626',
    description: 'ERC4626 vault standard implementations',
    patterns: [/ERC4626/i, /ERC-4626/i, /vault\s*standard/i]
  },
  bridging: {
    name: 'Bridging',
    description: 'Token bridging and cross-chain operations',
    patterns: [/bridg/i, /layer\s*zero/i, /layerzero/i, /wormhole/i]
  },
  psm: {
    name: 'PSM',
    description: 'Peg Stability Module operations',
    patterns: [/PSM/i, /peg\s*stability/i]
  },
  multichain: {
    name: 'Multichain',
    description: 'Multi-chain deployments and operations',
    patterns: [/base\s*mainnet/i, /arbitrum/i, /solana/i, /ethereum\s*mainnet/i, /unichain/i, /\bL2\b/i]
  }
};

// Results storage
const taggedNodes = new Map(); // nodeUuid -> Set of tags
const tagIndex = new Map(); // tag -> array of node references
const nodeIndex = new Map(); // uuid -> node reference with path

// Initialize tag index
Object.keys(TAG_DEFINITIONS).forEach(tag => {
  tagIndex.set(tag, []);
});

/**
 * Get all child arrays from a node
 */
function getChildArrays(node) {
  const childArrays = [];
  const childKeys = [
    'articles', 'sections_and_primary_docs', 'agent_scope_database',
    'annotations', 'tenets', 'active_data', 'needed_research',
    'scenarios', 'scenario_variations'
  ];

  for (const key of childKeys) {
    if (Array.isArray(node[key]) && node[key].length > 0) {
      childArrays.push(...node[key]);
    }
  }

  return childArrays;
}

/**
 * Check if text matches any pattern for a tag
 */
function matchesTag(text, tagKey) {
  if (!text) return false;
  const patterns = TAG_DEFINITIONS[tagKey].patterns;
  return patterns.some(pattern => pattern.test(text));
}

/**
 * Analyze a node for tags
 */
function analyzeNode(node) {
  const tags = new Set();
  const searchText = `${node.name || ''} ${node.content || ''}`;

  for (const tagKey of Object.keys(TAG_DEFINITIONS)) {
    if (matchesTag(searchText, tagKey)) {
      tags.add(tagKey);
    }
  }

  return tags;
}

/**
 * Depth-first traversal of the atlas tree
 */
function traverseTree(nodes, path = []) {
  for (const node of nodes) {
    if (!node.uuid) continue;

    const currentPath = [...path, { doc_no: node.doc_no, name: node.name }];
    const tags = analyzeNode(node);

    // Store node reference
    nodeIndex.set(node.uuid, {
      uuid: node.uuid,
      doc_no: node.doc_no,
      name: node.name,
      type: node.type,
      content: node.content?.substring(0, 200) + (node.content?.length > 200 ? '...' : ''),
      path: currentPath,
      tags: Array.from(tags)
    });

    // Store tags
    if (tags.size > 0) {
      taggedNodes.set(node.uuid, tags);

      for (const tag of tags) {
        tagIndex.get(tag).push({
          uuid: node.uuid,
          doc_no: node.doc_no,
          name: node.name,
          type: node.type
        });
      }
    }

    // Recurse into children
    const children = getChildArrays(node);
    if (children.length > 0) {
      traverseTree(children, currentPath);
    }
  }
}

/**
 * Find nodes with multiple overlapping tags
 */
function findOverlappingTags(targetTags) {
  const results = [];

  for (const [uuid, tags] of taggedNodes) {
    const overlap = targetTags.filter(t => tags.has(t));
    if (overlap.length >= 2) {
      const nodeRef = nodeIndex.get(uuid);
      results.push({
        ...nodeRef,
        matchedTags: overlap,
        overlapCount: overlap.length
      });
    }
  }

  return results.sort((a, b) => b.overlapCount - a.overlapCount);
}

// Run analysis
console.log('=== Atlas Deep Search & Tagging Analysis ===\n');
console.log('Loading and analyzing atlas data...\n');

traverseTree(atlasData);

console.log(`Total nodes indexed: ${nodeIndex.size}`);
console.log(`Nodes with tags: ${taggedNodes.size}\n`);

// Report by tag
console.log('=== Tag Distribution ===\n');
for (const [tag, nodes] of tagIndex) {
  const def = TAG_DEFINITIONS[tag];
  console.log(`${def.name} (${tag}): ${nodes.length} nodes`);
}

// Focus analysis: SkyLink + Keel + sUSDS + ERC4626
console.log('\n=== Focus Analysis: SkyLink, Keel, sUSDS, ERC4626 Bridging ===\n');

const focusTags = ['skylink', 'keel', 'susds', 'erc4626', 'bridging'];
const overlapping = findOverlappingTags(focusTags);

console.log(`Nodes with 2+ focus tags: ${overlapping.length}\n`);

if (overlapping.length > 0) {
  console.log('Top overlapping nodes:\n');
  overlapping.slice(0, 20).forEach((node, i) => {
    console.log(`${i + 1}. [${node.doc_no}] ${node.name}`);
    console.log(`   Type: ${node.type} | Tags: ${node.matchedTags.join(', ')}`);
    console.log(`   Path: ${node.path.map(p => p.doc_no).join(' > ')}`);
    console.log('');
  });
}

// Detailed report for each focus tag
console.log('\n=== Detailed Tag Reports ===\n');

for (const tag of focusTags) {
  const nodes = tagIndex.get(tag);
  if (nodes.length === 0) continue;

  console.log(`\n--- ${TAG_DEFINITIONS[tag].name} (${nodes.length} nodes) ---\n`);

  nodes.slice(0, 15).forEach(node => {
    const fullNode = nodeIndex.get(node.uuid);
    const otherTags = fullNode.tags.filter(t => t !== tag);
    console.log(`[${node.doc_no}] ${node.name}`);
    if (otherTags.length > 0) {
      console.log(`  Also tagged: ${otherTags.join(', ')}`);
    }
  });

  if (nodes.length > 15) {
    console.log(`  ... and ${nodes.length - 15} more`);
  }
}

// Export tagging model as JSON
const taggingModel = {
  generatedAt: new Date().toISOString(),
  totalNodes: nodeIndex.size,
  taggedNodes: taggedNodes.size,
  tagDefinitions: TAG_DEFINITIONS,
  tagCounts: Object.fromEntries(
    Array.from(tagIndex.entries()).map(([tag, nodes]) => [tag, nodes.length])
  ),
  focusAnalysis: {
    targetTags: focusTags,
    overlappingNodes: overlapping.map(n => ({
      uuid: n.uuid,
      doc_no: n.doc_no,
      name: n.name,
      type: n.type,
      matchedTags: n.matchedTags,
      path: n.path.map(p => p.doc_no).join(' > ')
    }))
  },
  tagIndex: Object.fromEntries(
    Array.from(tagIndex.entries()).map(([tag, nodes]) => [
      tag,
      nodes.map(n => ({
        uuid: n.uuid,
        doc_no: n.doc_no,
        name: n.name,
        type: n.type
      }))
    ])
  )
};

const outputPath = path.join(__dirname, '../public/tagging-model.json');
fs.writeFileSync(outputPath, JSON.stringify(taggingModel, null, 2));
console.log(`\n\nTagging model exported to: ${outputPath}`);
