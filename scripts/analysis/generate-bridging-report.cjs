/**
 * Generate a report about SkyLink and Keel for bridging sUSDS
 * Uses the tagging model to find relevant sections in the Atlas
 */

const fs = require('fs')
const path = require('path')

// Load tagging model
const taggingModelPath = path.join(__dirname, '../public/tagging-model.json')
const taggingModel = JSON.parse(fs.readFileSync(taggingModelPath, 'utf-8'))

// Load full atlas
const atlasPath = path.join(__dirname, '../public/atlas-2025-11-20.json')
const atlas = JSON.parse(fs.readFileSync(atlasPath, 'utf-8'))

// Also load Launch Agent 6 for additional context
const la6Path = path.join(__dirname, '../public/launch_agent_6_agent.json')
const la6Data = JSON.parse(fs.readFileSync(la6Path, 'utf-8'))

// Build a map of doc_no -> node for quick lookup
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
    
    // Recurse into children
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

console.log(`Indexed ${nodeMap.size} nodes from Atlas and Launch Agent 6`)

// Get relevant tags
const relevantTags = ['skylink', 'keel', 'susds', 'bridging']
const tagIndex = taggingModel.tagIndex

// Collect all relevant doc_nos by tag
const docNosByTag = {}
const allRelevantDocNos = new Set()

for (const tag of relevantTags) {
  const taggedNodes = tagIndex[tag] || []
  docNosByTag[tag] = taggedNodes.map(n => n.doc_no)
  taggedNodes.forEach(n => allRelevantDocNos.add(n.doc_no))
}

console.log('\nTag counts:')
for (const [tag, docNos] of Object.entries(docNosByTag)) {
  console.log(`  ${tag}: ${docNos.length} nodes`)
}

// Find nodes that appear in multiple relevant tags (high priority)
const multiTagNodes = []
const singleTagNodes = []

for (const docNo of allRelevantDocNos) {
  const tags = relevantTags.filter(tag => docNosByTag[tag].includes(docNo))
  const node = nodeMap.get(docNo)
  
  if (node) {
    const entry = {
      doc_no: docNo,
      name: node.name,
      type: node.type,
      content: node.content,
      tags,
      tagCount: tags.length,
      source: node.source
    }
    
    if (tags.length > 1) {
      multiTagNodes.push(entry)
    } else {
      singleTagNodes.push(entry)
    }
  }
}

// Sort by tag count (descending), then by doc_no
multiTagNodes.sort((a, b) => b.tagCount - a.tagCount || a.doc_no.localeCompare(b.doc_no))
singleTagNodes.sort((a, b) => a.doc_no.localeCompare(b.doc_no))

// Generate report
let report = `# Atlas Report: SkyLink and Keel for Bridging sUSDS

**Generated:** ${new Date().toISOString().split('T')[0]}
**Query:** "Atlas contains content about SkyLink and Keel for bridging sUSDS"

## Executive Summary

This report compiles all Atlas sections related to:
- **SkyLink** - Cross-chain bridging infrastructure
- **Keel** - Agent responsible for bridging operations
- **sUSDS** - Sky USD Savings token
- **Bridging** - Cross-chain token transfer operations

The goal is to provide comprehensive information to support teams working on bridging sUSDS across chains.

---

## Key Statistics

| Tag | Node Count |
|-----|------------|
`

for (const [tag, docNos] of Object.entries(docNosByTag)) {
  report += `| ${tag} | ${docNos.length} |\n`
}

report += `| **Total Unique** | ${allRelevantDocNos.size} |\n`
report += `| **Multi-tag (High Priority)** | ${multiTagNodes.length} |\n`

report += `
---

## 🔥 High Priority Sections (Multiple Tags)

These sections are tagged with multiple relevant categories, indicating they are central to the bridging sUSDS topic.

`

for (const node of multiTagNodes) {
  const tagBadges = node.tags.map(t => `\`${t}\``).join(' ')
  report += `### ${node.doc_no}: ${node.name}

**Type:** ${node.type} | **Tags:** ${tagBadges} | **Source:** ${node.source}

${node.content || '_No content available_'}

---

`
}

// Group single-tag nodes by tag for organized presentation
report += `
## Sections by Category

`

for (const tag of relevantTags) {
  const tagDef = taggingModel.tagDefinitions[tag]
  const nodesForTag = singleTagNodes.filter(n => n.tags[0] === tag)
  
  if (nodesForTag.length === 0) continue
  
  report += `### ${tagDef.name} (${nodesForTag.length} sections)

> ${tagDef.description}

`

  for (const node of nodesForTag) {
    report += `#### ${node.doc_no}: ${node.name}

**Type:** ${node.type} | **Source:** ${node.source}

${node.content || '_No content available_'}

---

`
  }
}

// Add appendix with full list
report += `
## Appendix: Complete Node Reference

| Doc No | Name | Type | Tags |
|--------|------|------|------|
`

const allNodes = [...multiTagNodes, ...singleTagNodes]
allNodes.sort((a, b) => a.doc_no.localeCompare(b.doc_no))

for (const node of allNodes) {
  const tagList = node.tags.join(', ')
  const name = node.name.replace(/\|/g, '\\|').substring(0, 60)
  report += `| ${node.doc_no} | ${name} | ${node.type} | ${tagList} |\n`
}

report += `
---

*Report generated from Atlas data using tag-based analysis.*
`

// Write report
const outputPath = path.join(__dirname, '../docs/SKYLINK_KEEL_BRIDGING_SUSDS_REPORT.md')
fs.writeFileSync(outputPath, report)

console.log(`\nReport written to: ${outputPath}`)
console.log(`Total nodes in report: ${allNodes.length}`)
console.log(`High priority (multi-tag) nodes: ${multiTagNodes.length}`)
