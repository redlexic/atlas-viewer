const fs = require('fs');
const path = require('path');

// Load the atlas to build a doc_no -> UUID mapping
const atlasPath = path.join(__dirname, '..', 'atlas-2026-01-14.json');
const atlas = JSON.parse(fs.readFileSync(atlasPath, 'utf-8'));

// Build UUID lookup map from atlas
const uuidMap = new Map();

function extractUUIDs(node) {
  if (node.doc_no && node.uuid) {
    uuidMap.set(node.doc_no, node.uuid);
  }

  // Recursively process all child arrays
  const childKeys = [
    'children', 'sections_and_primary_docs', 'articles', 'annotations',
    'tenets', 'active_data', 'needed_research', 'agent_scope_database',
    'delegates', 'artifacts', 'parameters', 'processes', 'repositories'
  ];

  for (const key of childKeys) {
    if (Array.isArray(node[key])) {
      for (const child of node[key]) {
        if (child && typeof child === 'object') {
          extractUUIDs(child);
        }
      }
    }
  }
}

// Process atlas
if (Array.isArray(atlas)) {
  for (const node of atlas) {
    extractUUIDs(node);
  }
} else {
  extractUUIDs(atlas);
}

console.log(`Built UUID map with ${uuidMap.size} entries`);

// Load the changeset
const changesetPath = path.join(__dirname, 'skybase-changeset-complete.json');
let content = fs.readFileSync(changesetPath, 'utf-8');

// Pattern to find sky-atlas.io links: [text](https://sky-atlas.io/#A.x.x.x)
const linkPattern = /\[([^\]]+)\]\(https:\/\/sky-atlas\.io\/#(A\.[0-9.]+)\)/g;

let fixedCount = 0;
let notFoundCount = 0;
const notFound = [];

content = content.replace(linkPattern, (match, text, docNo) => {
  const uuid = uuidMap.get(docNo);
  if (uuid) {
    fixedCount++;
    return `[${text}](${uuid})`;
  } else {
    notFoundCount++;
    notFound.push(docNo);
    // Keep the sky-atlas.io link if we can't find the UUID
    return match;
  }
});

// Write the fixed content
fs.writeFileSync(changesetPath, content);

console.log(`\nFixed ${fixedCount} links to UUID format`);
console.log(`Could not find UUID for ${notFoundCount} links`);

if (notFound.length > 0) {
  console.log('\nDoc numbers without UUIDs:');
  [...new Set(notFound)].forEach(d => console.log(`  - ${d}`));
}

// Also fix the markdown file
const mdPath = path.join(__dirname, 'skybase-changeset-complete.md');
if (fs.existsSync(mdPath)) {
  let mdContent = fs.readFileSync(mdPath, 'utf-8');
  let mdFixedCount = 0;

  mdContent = mdContent.replace(linkPattern, (match, text, docNo) => {
    const uuid = uuidMap.get(docNo);
    if (uuid) {
      mdFixedCount++;
      return `[${text}](${uuid})`;
    }
    return match;
  });

  fs.writeFileSync(mdPath, mdContent);
  console.log(`\nAlso fixed ${mdFixedCount} links in markdown file`);
}
