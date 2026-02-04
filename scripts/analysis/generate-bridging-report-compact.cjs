/**
 * Generate a COMPACT report focused on bridging sUSDS
 * Only includes sections directly relevant to bridging operations
 */

const fs = require('fs')
const path = require('path')

// Load tagging model
const taggingModelPath = path.join(__dirname, '../public/tagging-model.json')
const taggingModel = JSON.parse(fs.readFileSync(taggingModelPath, 'utf-8'))

// Load full atlas
const atlasPath = path.join(__dirname, '../public/atlas-2025-11-20.json')
const atlas = JSON.parse(fs.readFileSync(atlasPath, 'utf-8'))

// Also load Launch Agent 6
const la6Path = path.join(__dirname, '../public/launch_agent_6_agent.json')
const la6Data = JSON.parse(fs.readFileSync(la6Path, 'utf-8'))

// Build a map of doc_no -> node
const nodeMap = new Map()

function indexNodes(nodes, source = 'atlas') {
  if (!Array.isArray(nodes)) {
    if (nodes && nodes.doc_no) {
      nodeMap.set(nodes.doc_no, { ...nodes, source })
    }
    return
  }
  
  for (const node of nodes) {
    if (node.doc_no) {
      nodeMap.set(node.doc_no, { ...node, source })
    }
    const childFields = ['articles', 'sections_and_primary_docs', 'agent_scope_database']
    for (const field of childFields) {
      if (node[field] && Array.isArray(node[field])) {
        indexNodes(node[field], source)
      }
    }
  }
}

indexNodes(atlas, 'atlas')
indexNodes(la6Data, 'launch_agent_6')

const tagIndex = taggingModel.tagIndex

// Get all tagged doc_nos
const skylinkDocs = new Set((tagIndex['skylink'] || []).map(n => n.doc_no))
const keelDocs = new Set((tagIndex['keel'] || []).map(n => n.doc_no))
const susdsDocs = new Set((tagIndex['susds'] || []).map(n => n.doc_no))
const bridgingDocs = new Set((tagIndex['bridging'] || []).map(n => n.doc_no))

// Bridging-related keywords to check in content
const bridgingKeywords = [
  'bridge', 'bridging', 'bridged',
  'cross-chain', 'crosschain', 'multichain', 'multi-chain',
  'layerzero', 'layer zero', 'wormhole',
  'l2', 'layer 2', 'layer-2',
  'optimism', 'arbitrum', 'base', 'solana',
  'token transfer', 'transfer token'
]

function isBridgingRelevant(node, tags) {
  // Always include if tagged with 'bridging'
  if (tags.includes('bridging')) return true
  
  // Include if tagged with multiple relevant tags (indicates intersection)
  if (tags.length >= 2) return true
  
  // Check content for bridging keywords
  const content = (node.content || '').toLowerCase()
  const name = (node.name || '').toLowerCase()
  
  for (const keyword of bridgingKeywords) {
    if (content.includes(keyword) || name.includes(keyword)) {
      return true
    }
  }
  
  return false
}

// Collect relevant nodes
const relevantNodes = []
const allDocs = new Set([...skylinkDocs, ...keelDocs, ...susdsDocs, ...bridgingDocs])

for (const docNo of allDocs) {
  const node = nodeMap.get(docNo)
  if (!node) continue
  
  const tags = []
  if (skylinkDocs.has(docNo)) tags.push('skylink')
  if (keelDocs.has(docNo)) tags.push('keel')
  if (susdsDocs.has(docNo)) tags.push('susds')
  if (bridgingDocs.has(docNo)) tags.push('bridging')
  
  if (isBridgingRelevant(node, tags)) {
    relevantNodes.push({
      doc_no: docNo,
      name: node.name,
      type: node.type,
      content: node.content,
      tags,
      tagCount: tags.length,
      source: node.source
    })
  }
}

// Sort: multi-tag first, then by doc_no
relevantNodes.sort((a, b) => {
  if (b.tagCount !== a.tagCount) return b.tagCount - a.tagCount
  return a.doc_no.localeCompare(b.doc_no)
})

console.log(`Found ${relevantNodes.length} bridging-relevant sections (from ${allDocs.size} total tagged)`)

// Generate compact report
let report = `# Bridging sUSDS: Compact Atlas Reference

**Generated:** ${new Date().toISOString().split('T')[0]}
**Focus:** Sections specifically relevant to bridging sUSDS using SkyLink and Keel

---

## Summary

This compact report includes **${relevantNodes.length} sections** directly relevant to bridging operations, filtered from ${allDocs.size} total tagged sections.

**Inclusion criteria:**
- Tagged with \`bridging\`
- Tagged with multiple relevant categories (skylink, keel, susds, bridging)
- Contains bridging-related keywords in content

---

`

// Group by relevance tier
const tier1 = relevantNodes.filter(n => n.tagCount >= 3)
const tier2 = relevantNodes.filter(n => n.tagCount === 2)
const tier3 = relevantNodes.filter(n => n.tagCount === 1)

if (tier1.length > 0) {
  report += `## 🔥 Critical Sections (3+ tags)

These sections are central to bridging sUSDS - they appear in multiple relevant categories.

`
  for (const node of tier1) {
    const tagBadges = node.tags.map(t => `\`${t}\``).join(' ')
    report += `### ${node.doc_no}: ${node.name}
**Tags:** ${tagBadges}

${node.content || '_No content_'}

---

`
  }
}

if (tier2.length > 0) {
  report += `## ⚡ Important Sections (2 tags)

These sections connect two relevant areas.

`
  for (const node of tier2) {
    const tagBadges = node.tags.map(t => `\`${t}\``).join(' ')
    report += `### ${node.doc_no}: ${node.name}
**Tags:** ${tagBadges}

${node.content || '_No content_'}

---

`
  }
}

if (tier3.length > 0) {
  report += `## 📋 Supporting Sections (1 tag, bridging content)

These sections are tagged with one category but contain bridging-related content.

`
  for (const node of tier3) {
    const tagBadges = node.tags.map(t => `\`${t}\``).join(' ')
    report += `### ${node.doc_no}: ${node.name}
**Tags:** ${tagBadges}

${node.content || '_No content_'}

---

`
  }
}

// Quick reference table
report += `## Quick Reference

| Doc No | Name | Tags |
|--------|------|------|
`

for (const node of relevantNodes) {
  const name = node.name.replace(/\|/g, '\\|').substring(0, 50)
  const tags = node.tags.join(', ')
  report += `| ${node.doc_no} | ${name} | ${tags} |\n`
}

report += `
---
*Compact bridging-focused report - see full report for complete coverage.*
`

// Write report
const outputPath = path.join(__dirname, '../docs/BRIDGING_SUSDS_COMPACT.md')
fs.writeFileSync(outputPath, report)

console.log(`\nCompact report written to: ${outputPath}`)
console.log(`  Tier 1 (3+ tags): ${tier1.length}`)
console.log(`  Tier 2 (2 tags): ${tier2.length}`)
console.log(`  Tier 3 (1 tag + keywords): ${tier3.length}`)
