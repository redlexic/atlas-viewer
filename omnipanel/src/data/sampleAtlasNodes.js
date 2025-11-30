/**
 * Sample Atlas node data for testing tree visualization
 * Based on actual Sky Atlas structure
 */

export const SAMPLE_ATLAS_NODES = [
  {
    doc_no: "A.0",
    name: "Atlas Preamble",
    type: "Scope",
    content: "This Preamble will be further populated in later iterations of the Atlas.",
  },
  {
    doc_no: "A.0.1",
    name: "Atlas Preamble",
    type: "Article",
    content: "This Article contains definitions and general provisions.",
  },
  {
    doc_no: "A.0.1.1",
    name: "Definitions",
    type: "Section",
    content: "This Section contains essential definitions.",
  },
  {
    doc_no: "A.0.1.1.1",
    name: "Organizational Alignment",
    type: "Core",
    content: "Organizational alignment is a traditional business concept...",
  },
  {
    doc_no: "A.0.1.1.2",
    name: "Ecosystem Intelligence",
    type: "Core",
    content: "Ecosystem Intelligence characterizes a decentralized ecosystem...",
  },
  {
    doc_no: "A.0.1.1.3",
    name: "Aligned Structure",
    type: "Core",
    content: "An aligned structure is a network, ecosystem, entity...",
  },
  {
    doc_no: "A.0.1.1.4",
    name: "Universal Alignment",
    type: "Core",
    content: "Universal Alignment refers to an actor's holistic understanding...",
  },
  {
    doc_no: "A.6.1.1",
    name: "Spark Artifact",
    type: "Article",
    content: "The Spark Liquidity Layer Agent Artifact.",
  },
  {
    doc_no: "A.6.1.1.1",
    name: "Agent Overview",
    type: "Section",
    content: "Overview of the Spark Agent.",
  },
  {
    doc_no: "A.6.1.1.1.1",
    name: "Agent Name",
    type: "Core",
    content: "The name of this Agent is Spark.",
  },
  {
    doc_no: "A.6.1.1.1.2",
    name: "Agent Type",
    type: "Core",
    content: "Spark is a Launch Agent.",
  },
  {
    doc_no: "A.6.1.1.2",
    name: "Token Economics",
    type: "Section",
    content: "Token economics specifications.",
  },
  {
    doc_no: "A.6.1.1.2.1",
    name: "Token Symbol",
    type: "Core",
    content: "The token symbol is SPK.",
  },
  {
    doc_no: "A.6.1.1.2.2",
    name: "Genesis Supply",
    type: "Core",
    content: "The Genesis Supply of SPK is 10 billion.",
  },
  {
    doc_no: "A.6.1.2",
    name: "Grove Artifact",
    type: "Article",
    content: "The Grove Agent Artifact.",
  },
  {
    doc_no: "A.6.1.2.1",
    name: "Agent Overview",
    type: "Section",
    content: "Overview of the Grove Agent.",
  },
  {
    doc_no: "A.6.1.2.1.1",
    name: "Agent Name",
    type: "Core",
    content: "The name of this Agent is Grove.",
  },
  {
    doc_no: "A.6.1.2.1.2",
    name: "Agent Type",
    type: "Core",
    content: "Grove is a Launch Agent.",
  },
  {
    doc_no: "A.6.1.2.2",
    name: "Token Symbol",
    type: "Core",
    content: "The token symbol is GROVE.",
  },
  {
    doc_no: "A.6.1.2.3",
    name: "Genesis Supply",
    type: "Core",
    content: "The Genesis Supply of GROVE is 10 billion.",
  },
];

/**
 * Get node color based on type
 */
export const getNodeColor = (type) => {
  const colors = {
    'Scope': '#3b82f6',    // blue
    'Article': '#10b981',   // green
    'Section': '#f59e0b',   // orange
    'Core': '#ef4444',      // red
    'Primary': '#a855f7',   // purple
    'Template': '#eab308',  // yellow
  };
  return colors[type] || '#6b7280'; // gray fallback
};

/**
 * Get a sample of N nodes
 */
export const getSampleNodes = (count = 20) => {
  return SAMPLE_ATLAS_NODES.slice(0, count);
};
