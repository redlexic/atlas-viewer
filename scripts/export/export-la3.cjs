const fs = require("fs");
const data = JSON.parse(fs.readFileSync("public/atlas-2026-01-14.json", "utf8"));

function findNode(nodes, docNo) {
  for (const node of nodes) {
    if (node.doc_no === docNo) return node;
    const childKeys = ["sections", "agent_scope_database", "sections_and_primary_docs", "articles", "annotations", "tenets", "active_data", "needed_research"];
    for (const key of childKeys) {
      if (Array.isArray(node[key])) {
        const found = findNode(node[key], docNo);
        if (found) return found;
      }
    }
  }
  return null;
}

function getChildren(node) {
  const children = [];
  const childKeys = ["sections", "agent_scope_database", "sections_and_primary_docs", "articles", "annotations", "tenets", "active_data", "needed_research"];
  for (const key of childKeys) {
    if (Array.isArray(node[key])) {
      children.push(...node[key]);
    }
  }
  return children;
}

function collectAllSections(node, results = []) {
  results.push({
    doc_no: node.doc_no,
    name: node.name,
    content: node.content || ""
  });

  const children = getChildren(node);
  for (const child of children) {
    if (child && child.doc_no) {
      collectAllSections(child, results);
    }
  }
  return results;
}

// Find Launch Agent 3
const la3 = findNode(data, "A.6.1.1.4");
if (!la3) {
  console.error("Launch Agent 3 not found");
  process.exit(1);
}

// Collect all sections
const sections = collectAllSections(la3);

// Sort by doc_no
sections.sort((a, b) => {
  const aParts = a.doc_no.split(".").map(p => parseInt(p.replace(/\D/g, ""), 10) || 0);
  const bParts = b.doc_no.split(".").map(p => parseInt(p.replace(/\D/g, ""), 10) || 0);
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const diff = (aParts[i] || 0) - (bParts[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
});

// Build markdown
const lines = [
  "# Launch Agent 3 - Full Atlas Export",
  "",
  "*Source: atlas-2026-01-14.json*",
  "",
  "---",
  ""
];

for (const section of sections) {
  lines.push(`> ## ${section.doc_no} - ${section.name}`);
  lines.push("");
  if (section.content) {
    lines.push(section.content);
    lines.push("");
  }
  lines.push("---");
  lines.push("");
}

// Write to file
fs.writeFileSync("public/skybase/launch-agent-3-atlas-export.md", lines.join("\n"));
console.log(`Exported ${sections.length} sections to public/skybase/launch-agent-3-atlas-export.md`);
