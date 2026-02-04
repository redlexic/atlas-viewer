const fs = require('fs');

// Read the analysis results
const data = JSON.parse(fs.readFileSync('./public/variable_analysis_results.json', 'utf8'));

// Get all sections with NUMERIC_VALUE
const numericSections = data.details.filter(d => d.variables.includes('NUMERIC_VALUE'));

// Categorize sections by semantic domain
const categories = {
  'Token Economics': {
    subcategories: {
      'Supply': [],
      'Distribution & Rewards': [],
      'Token Emissions': []
    }
  },
  'Smart Contracts': {
    subcategories: {
      'Contract Addresses': [],
      'Contract Versions': [],
      'Contract Functions': []
    }
  },
  'Asset Liability Management (ALM)': {
    subcategories: {
      'Rate Limits - Inflow': [],
      'Rate Limits - Outflow': [],
      'Rate Limits - Swap': [],
      'Rate Limits - Cross-Chain': [],
      'Proxy Contracts': [],
      'Controller Contracts': []
    }
  },
  'Governance': {
    subcategories: {
      'Multisig Configuration': [],
      'Voting Requirements': [],
      'Proposal Thresholds': [],
      'Governance Rewards': []
    }
  },
  'Operational Parameters': {
    subcategories: {
      'Debt Ceilings & Buffers': [],
      'Minimum Operation Sizes': [],
      'Fees & Percentages': [],
      'Instance Configurations': []
    }
  },
  'Other': {
    subcategories: {
      'Uncategorized': []
    }
  }
};

// Categorization rules
const categorize = (section) => {
  const name = section.section.toLowerCase();

  // Token Economics
  if (name.includes('genesis supply') || name.includes('circulating supply')) {
    return ['Token Economics', 'Supply'];
  }
  if (name.includes('distribution') || name.includes('reward')) {
    return ['Token Economics', 'Distribution & Rewards'];
  }
  if (name.includes('token emissions')) {
    return ['Token Economics', 'Token Emissions'];
  }

  // ALM Rate Limits
  if (name.includes('inflow rate limit')) {
    return ['Asset Liability Management (ALM)', 'Rate Limits - Inflow'];
  }
  if (name.includes('outflow rate limit')) {
    return ['Asset Liability Management (ALM)', 'Rate Limits - Outflow'];
  }
  if (name.includes('swap rate limit') || name.includes('swap') && name.includes('maximum')) {
    return ['Asset Liability Management (ALM)', 'Rate Limits - Swap'];
  }
  if (name.includes('cross-chain') && name.includes('maximum')) {
    return ['Asset Liability Management (ALM)', 'Rate Limits - Cross-Chain'];
  }
  if (name.includes('alm proxy') || name.includes('proxy') && name.includes('contract')) {
    return ['Asset Liability Management (ALM)', 'Proxy Contracts'];
  }
  if (name.includes('alm controller') || name.includes('controller') && name.includes('contract')) {
    return ['Asset Liability Management (ALM)', 'Controller Contracts'];
  }
  if (name.includes('rate limit')) {
    return ['Asset Liability Management (ALM)', 'Rate Limits - Outflow']; // Default
  }

  // Governance
  if (name.includes('multisig') || name.includes('signers')) {
    return ['Governance', 'Multisig Configuration'];
  }
  if (name.includes('vote') || name.includes('voting')) {
    return ['Governance', 'Voting Requirements'];
  }
  if (name.includes('proposal')) {
    return ['Governance', 'Proposal Thresholds'];
  }
  if (name.includes('governance') && name.includes('reward')) {
    return ['Governance', 'Governance Rewards'];
  }

  // Smart Contracts
  if (name.includes('contract version')) {
    return ['Smart Contracts', 'Contract Versions'];
  }
  if (name.includes('contract') && name.includes('address')) {
    return ['Smart Contracts', 'Contract Addresses'];
  }
  if (name.includes('functions')) {
    return ['Smart Contracts', 'Contract Functions'];
  }

  // Operational Parameters
  if (name.includes('debt ceiling') || name.includes('buffer')) {
    return ['Operational Parameters', 'Debt Ceilings & Buffers'];
  }
  if (name.includes('minimum') && name.includes('operation')) {
    return ['Operational Parameters', 'Minimum Operation Sizes'];
  }
  if (name.includes('fee') || name.includes('percentage')) {
    return ['Operational Parameters', 'Fees & Percentages'];
  }
  if (name.includes('instance') && name.includes('configuration')) {
    return ['Operational Parameters', 'Instance Configurations'];
  }

  return ['Other', 'Uncategorized'];
};

// Categorize all sections
numericSections.forEach(section => {
  const [category, subcategory] = categorize(section);
  if (categories[category] && categories[category].subcategories[subcategory]) {
    categories[category].subcategories[subcategory].push(section);
  }
});

// Now analyze variable types within each section
const analyzeVariableTypes = (section) => {
  const examples = Object.values(section.examples);
  const variables = [];

  // Check for specific patterns
  examples.forEach(text => {
    // Version numbers
    if (/V\.\d+\.\d+\.\d+/.test(text)) {
      variables.push('CONTRACT_VERSION');
    }
    // Multisig requirements (n/m format)
    if (/\d+\/\d+/.test(text)) {
      variables.push('MULTISIG_SIGNING_REQUIREMENT');
    }
    // Large token amounts (billion, million)
    if (/\d+\s*(billion|million|thousand)/.test(text.toLowerCase())) {
      variables.push('TOKEN_AMOUNT');
    }
    // Currency amounts with USDS, USDC, etc
    if (/[\d,]+\s*(USDS|USDC|USD|DAI)/.test(text)) {
      variables.push('CURRENCY_AMOUNT');
    }
    // Percentages
    if (/\d+%/.test(text)) {
      variables.push('PERCENTAGE');
    }
    // Rate (per day, per second, etc)
    if (/per\s+(day|second|hour|year)/i.test(text)) {
      variables.push('RATE_VALUE');
    }
    // maxAmount pattern
    if (/maxAmount/.test(text)) {
      variables.push('MAX_AMOUNT');
    }
    // slope pattern
    if (/slope/.test(text)) {
      variables.push('SLOPE');
    }
  });

  return [...new Set(variables)]; // Remove duplicates
};

// Build hierarchical output
const output = {
  summary: {
    total_numeric_sections: numericSections.length,
    categories: {}
  },
  hierarchy: {}
};

// Generate report
Object.entries(categories).forEach(([catName, catData]) => {
  const totalInCategory = Object.values(catData.subcategories).reduce((sum, subs) => sum + subs.length, 0);

  if (totalInCategory === 0) return; // Skip empty categories

  output.summary.categories[catName] = totalInCategory;
  output.hierarchy[catName] = {
    total_sections: totalInCategory,
    subcategories: {}
  };

  Object.entries(catData.subcategories).forEach(([subName, sections]) => {
    if (sections.length === 0) return; // Skip empty subcategories

    // Collect all variable types found in this subcategory
    const variableTypes = new Set();
    const sectionDetails = [];

    sections.forEach(section => {
      const vars = analyzeVariableTypes(section);
      vars.forEach(v => variableTypes.add(v));

      sectionDetails.push({
        section: section.section,
        detected_variables: vars,
        similarity: section.similarity,
        example: Object.values(section.examples)[0]
      });
    });

    output.hierarchy[catName].subcategories[subName] = {
      total_sections: sections.length,
      common_variable_types: Array.from(variableTypes),
      sections: sectionDetails
    };
  });
});

// Write output
fs.writeFileSync('./public/numeric_value_hierarchy.json', JSON.stringify(output, null, 2));

// Generate markdown report
let markdown = '# NUMERIC_VALUE Hierarchical Analysis\n\n';
markdown += `**Total Sections with NUMERIC_VALUE:** ${numericSections.length}\n\n`;
markdown += '## Categories Overview\n\n';

Object.entries(output.summary.categories).forEach(([cat, count]) => {
  markdown += `- **${cat}**: ${count} sections\n`;
});

markdown += '\n---\n\n## Detailed Hierarchy\n\n';

Object.entries(output.hierarchy).forEach(([catName, catData]) => {
  markdown += `### ${catName} (${catData.total_sections} sections)\n\n`;

  Object.entries(catData.subcategories).forEach(([subName, subData]) => {
    markdown += `#### ${subName} (${subData.total_sections} sections)\n\n`;
    markdown += `**Common Variable Types:** ${subData.common_variable_types.join(', ') || 'None detected'}\n\n`;
    markdown += '**Sections:**\n';

    subData.sections.forEach(section => {
      markdown += `- **${section.section}**\n`;
      markdown += `  - Variables: ${section.detected_variables.join(', ') || 'Generic numeric'}\n`;
      markdown += `  - Example: "${section.example.substring(0, 150)}..."\n`;
      markdown += `  - Similarity: ${(section.similarity * 100).toFixed(1)}%\n\n`;
    });
  });

  markdown += '\n';
});

// Add variable type recommendations
markdown += '---\n\n## Recommended Variable Types\n\n';
markdown += 'Based on the analysis, these specific variable types should replace NUMERIC_VALUE:\n\n';

const recommendedVars = {
  'CONTRACT_VERSION': 'Semantic version strings (e.g., V.1.6.0)',
  'MULTISIG_SIGNING_REQUIREMENT': 'Signing requirements in n/m format (e.g., 1/2, 4/7)',
  'TOKEN_AMOUNT': 'Large token supply amounts (e.g., "1 billion", "10 billion")',
  'CURRENCY_AMOUNT': 'Specific currency amounts (e.g., 200,000,000 USDS)',
  'MAX_AMOUNT': 'Maximum limit values for rate limits',
  'SLOPE': 'Rate limit slope values (amount per time period)',
  'RATE_VALUE': 'Values with time components (per day, per second)',
  'PERCENTAGE': 'Percentage values',
  'DEBT_CEILING': 'Debt ceiling amounts',
  'BUFFER_AMOUNT': 'Buffer amounts below ceilings'
};

Object.entries(recommendedVars).forEach(([varName, description]) => {
  markdown += `### ${varName}\n`;
  markdown += `${description}\n\n`;
});

fs.writeFileSync('./public/NUMERIC_VALUE_HIERARCHY_REPORT.md', markdown);

console.log('Analysis complete!');
console.log(`- JSON output: public/numeric_value_hierarchy.json`);
console.log(`- Markdown report: public/NUMERIC_VALUE_HIERARCHY_REPORT.md`);
console.log(`\nSummary:`);
console.log(`Total sections: ${numericSections.length}`);
Object.entries(output.summary.categories).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});
