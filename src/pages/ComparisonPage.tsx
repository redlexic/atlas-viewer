import { useState, useEffect } from 'react';
import { Container, Title, Text, Loader, Center, Box, Group, Button, Checkbox } from '@mantine/core';
import { IconDownload, IconTrash } from '@tabler/icons-react';
import { AgentComparisonAligned } from '../AgentComparisonAligned';
import type { AtlasNode } from '../types';

// Helper to get all children from any array field containing document nodes
const getChildren = (node: AtlasNode): AtlasNode[] => {
  const children: AtlasNode[] = [];

  for (const key in node) {
    const value = node[key];
    if (Array.isArray(value) && value.length > 0) {
      if (value[0] && typeof value[0] === 'object' && 'type' in value[0] && 'doc_no' in value[0] && 'uuid' in value[0]) {
        children.push(...value);
      }
    }
  }

  return children;
};

// Preprocess data to add child counts
const preprocessNode = (node: AtlasNode): number => {
  const children = getChildren(node);
  let count = children.length;

  children.forEach(child => {
    count += preprocessNode(child);
  });

  node.childCount = count;
  return count;
};

const preprocessData = (data: AtlasNode[]): AtlasNode[] => {
  data.forEach(node => preprocessNode(node));
  return data;
};

// Helper to find node by doc_no
const findNodeByDocNo = (nodes: AtlasNode[], docNo: string): AtlasNode | null => {
  for (const node of nodes) {
    if (node.doc_no === docNo) {
      return node;
    }
    const children = getChildren(node);
    const found = findNodeByDocNo(children, docNo);
    if (found) return found;
  }
  return null;
};

export function ComparisonPage() {
  const [comparisonAgents, setComparisonAgents] = useState<{ name: string; node: AtlasNode }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleAgents, setVisibleAgents] = useState<Record<string, boolean>>({
    'Spark': true,
    'Grove': true,
    'Keel': true,
    'Launch Agent 3': true,
    'Launch Agent 4': true,
    'Prysm': true,
    'Launch Agent 6': true,
    'Builder': true
  });
  const [selectedSections, setSelectedSections] = useState<Record<string, { agentName: string; node: AtlasNode }>>({});

  // Builder variables - always initialize with empty strings to avoid controlled/uncontrolled warnings
  const [builderAgentName, setBuilderAgentName] = useState<string>('');
  const [builderTokenSymbol, setBuilderTokenSymbol] = useState<string>('');
  const [builderSubproxyAccount, setBuilderSubproxyAccount] = useState<string>('');
  const [variablesCommitted, setVariablesCommitted] = useState<boolean>(false);

  // Custom edits for Builder sections (docNoSuffix -> { name?: string, content?: string })
  const [customEdits, setCustomEdits] = useState<Record<string, { name?: string; content?: string }>>({});

  // Auto-save Builder state to localStorage whenever it changes
  useEffect(() => {
    // Skip saving during initial load
    if (loading) {
      console.log('Skipping save - still loading data');
      return;
    }

    // Don't save if everything is empty
    if (Object.keys(selectedSections).length === 0 &&
        Object.keys(customEdits).length === 0 &&
        !builderAgentName &&
        !builderTokenSymbol &&
        !builderSubproxyAccount) {
      console.log('Skipping save - no data to save');
      return;
    }

    try {
      const builderState = {
        selectedSections,
        customEdits,
        builderAgentName,
        builderTokenSymbol,
        builderSubproxyAccount,
        variablesCommitted,
      };
      const serialized = JSON.stringify(builderState);
      localStorage.setItem('builderState', serialized);
      console.log('✅ Saved builder state to localStorage:', {
        sections: Object.keys(selectedSections).length,
        edits: Object.keys(customEdits).length,
        agentName: builderAgentName,
        sizeKB: Math.round(serialized.length / 1024)
      });
    } catch (e) {
      console.error('❌ Failed to save builder state to localStorage:', e);
    }
  }, [selectedSections, customEdits, builderAgentName, builderTokenSymbol, builderSubproxyAccount, variablesCommitted, loading]);

  useEffect(() => {
    Promise.all([
      fetch('/atlas-2025-11-20.json').then(res => res.json()),
      fetch('/prysm-agent.json').then(res => res.json()),
      fetch('/launch_agent_6_agent.json').then(res => res.json())
    ])
      .then(([atlasData, prysmData, launch6Data]) => {
        const processedData = preprocessData(atlasData);

        // Extract all agents for comparison
        const spark = findNodeByDocNo(processedData, 'A.6.1.1.1');
        const grove = findNodeByDocNo(processedData, 'A.6.1.1.2');
        const keel = findNodeByDocNo(processedData, 'A.6.1.1.3');
        const launch3 = findNodeByDocNo(processedData, 'A.6.1.1.4');
        const launch4 = findNodeByDocNo(processedData, 'A.6.1.1.5');

        // Preprocess Prysm and Launch Agent 6 data
        preprocessNode(prysmData);
        preprocessNode(launch6Data);

        const agents = [];
        if (spark) agents.push({ name: 'Spark', node: spark });
        if (grove) agents.push({ name: 'Grove', node: grove });
        if (keel) agents.push({ name: 'Keel', node: keel });
        if (launch3) agents.push({ name: 'Launch Agent 3', node: launch3 });
        if (launch4) agents.push({ name: 'Launch Agent 4', node: launch4 });
        agents.push({ name: 'Prysm', node: prysmData });
        agents.push({ name: 'Launch Agent 6', node: launch6Data });

        setComparisonAgents(agents);
        setLoading(false);

        // Load Builder state from localStorage AFTER data is loaded
        try {
          const savedState = localStorage.getItem('builderState');
          console.log('📂 Checking localStorage for saved state...');

          if (savedState) {
            const parsed = JSON.parse(savedState);
            console.log('✅ Loading builder state from localStorage:', {
              sections: Object.keys(parsed.selectedSections || {}).length,
              edits: Object.keys(parsed.customEdits || {}).length,
              agentName: parsed.builderAgentName,
              sizeKB: Math.round(savedState.length / 1024)
            });

            if (parsed.selectedSections) setSelectedSections(parsed.selectedSections);
            if (parsed.customEdits) setCustomEdits(parsed.customEdits);
            // Ensure string values are always strings, never undefined
            if (parsed.builderAgentName !== undefined) setBuilderAgentName(parsed.builderAgentName || '');
            if (parsed.builderTokenSymbol !== undefined) setBuilderTokenSymbol(parsed.builderTokenSymbol || '');
            if (parsed.builderSubproxyAccount !== undefined) setBuilderSubproxyAccount(parsed.builderSubproxyAccount || '');
            if (parsed.variablesCommitted !== undefined) setVariablesCommitted(!!parsed.variablesCommitted);

            console.log('✅ State loaded successfully');
          } else {
            console.log('ℹ️ No saved state found in localStorage');
          }
        } catch (e) {
          console.error('❌ Failed to load builder state from localStorage:', e);
        }
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const clearBuilder = () => {
    if (Object.keys(selectedSections).length === 0 && Object.keys(customEdits).length === 0) {
      return; // Nothing to clear
    }

    if (confirm('Are you sure you want to clear all Builder data? This will remove all selected sections and custom edits.')) {
      setSelectedSections({});
      setCustomEdits({});
      setBuilderAgentName('');
      setBuilderTokenSymbol('');
      setBuilderSubproxyAccount('');
      setVariablesCommitted(false);
      localStorage.removeItem('builderState');
    }
  };

  const exportBuilder = () => {
    if (Object.keys(selectedSections).length === 0) {
      alert('No sections selected. Please select sections to build your agent.');
      return;
    }

    // Helper function to apply variable substitution without HTML (for export)
    const applySubstitutions = (text: string): string => {
      if (!text) return text;

      const agentNames = ['Prysm', 'Spark', 'Grove', 'Keel', 'Launch Agent 3', 'Launch Agent 4', 'Launch Agent 6'];
      const tokenSymbols = ['PRM', 'SPK', 'GROVE', 'KEEL', 'AGENT3', 'AGENT4', 'AGENT6'];

      let result = text;

      // Replace agent names
      if (builderAgentName) {
        agentNames.forEach(name => {
          const regex = new RegExp(name, 'g');
          result = result.replace(regex, builderAgentName);

          const possessiveRegex = new RegExp(`${name}'s`, 'g');
          result = result.replace(possessiveRegex, `${builderAgentName}'s`);
        });
      }

      // Replace token symbols
      if (builderTokenSymbol) {
        tokenSymbols.forEach(symbol => {
          const regex = new RegExp(`\\b${symbol}\\b`, 'g');
          result = result.replace(regex, builderTokenSymbol);
        });
      }

      // Replace SubProxy Account references
      if (builderSubproxyAccount) {
        agentNames.forEach(name => {
          const subproxyRegex = new RegExp(`${name} SubProxy Account`, 'g');
          result = result.replace(subproxyRegex, builderSubproxyAccount);

          const subproxyPossessiveRegex = new RegExp(`${name}'s SubProxy Account`, 'g');
          result = result.replace(subproxyPossessiveRegex, builderSubproxyAccount);
        });
      }

      return result;
    };

    // Create clean copies of selected nodes with substituted values or custom edits
    const selectedNodes = Object.entries(selectedSections).map(([docNoSuffix, s]) => {
      // Use custom edits if they exist, otherwise use auto-substituted values
      const customEdit = customEdits[docNoSuffix];

      return {
        type: s.node.type,
        doc_no: s.node.doc_no,
        name: customEdit?.name !== undefined ? customEdit.name : applySubstitutions(s.node.name),
        uuid: s.node.uuid,
        last_modified: s.node.last_modified,
        content: customEdit?.content !== undefined ? customEdit.content : applySubstitutions(s.node.content || ''),
        // Empty arrays for the fields we don't want to include
        agent_scope_database: [],
        annotations: [],
        tenets: [],
        active_data: [],
        needed_research: []
      };
    });

    // Create a basic agent structure with selected sections
    const builtAgent = {
      type: 'Agent',
      doc_no: 'BUILDER',
      name: builderAgentName || 'Custom Built Agent',
      uuid: 'builder-' + Date.now(),
      content: 'Agent built from selected sections',
      last_modified: new Date().toISOString(),
      sections: selectedNodes
    };

    // Download as JSON
    const json = JSON.stringify(builtAgent, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'built-agent.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text c="red" size="lg">Error: {error}</Text>
      </Center>
    );
  }

  return (
    <Container size="100%" py="xl" px="xs">
      <Box mb="xl">
        <Title order={1} mb="xs">Agent Comparison</Title>
        <Text c="dimmed" size="sm">Compare agent structures and build custom agents</Text>
      </Box>

      {comparisonAgents.length === 7 && (
        <>
          <Box mb="md">
            <Group justify="center" mb="sm">
              {comparisonAgents.map(agent => (
                <Checkbox
                  key={agent.name}
                  label={agent.name}
                  checked={visibleAgents[agent.name]}
                  onChange={(e) => {
                    const checked = e.currentTarget.checked;
                    setVisibleAgents(prev => ({
                      ...prev,
                      [agent.name]: checked
                    }));
                  }}
                />
              ))}
              <Checkbox
                key="Builder"
                label="Builder"
                checked={visibleAgents['Builder']}
                onChange={(e) => {
                  const checked = e.currentTarget.checked;
                  setVisibleAgents(prev => ({
                    ...prev,
                    'Builder': checked
                  }));
                }}
              />
            </Group>
            <Group justify="center">
              <Button
                leftSection={<IconDownload size={16} />}
                onClick={exportBuilder}
                variant="filled"
                color="green"
                disabled={Object.keys(selectedSections).length === 0}
              >
                Export Builder ({Object.keys(selectedSections).length} sections)
              </Button>
              <Button
                leftSection={<IconTrash size={16} />}
                onClick={clearBuilder}
                variant="light"
                color="red"
                disabled={Object.keys(selectedSections).length === 0 && Object.keys(customEdits).length === 0}
              >
                Clear Builder
              </Button>
            </Group>
          </Box>
          <AgentComparisonAligned
            agents={comparisonAgents.filter(agent => visibleAgents[agent.name])}
            selectedSections={selectedSections}
            onSectionSelect={setSelectedSections}
            showBuilder={visibleAgents['Builder']}
            builderAgentName={builderAgentName}
            builderTokenSymbol={builderTokenSymbol}
            builderSubproxyAccount={builderSubproxyAccount}
            onBuilderAgentNameChange={setBuilderAgentName}
            onBuilderTokenSymbolChange={setBuilderTokenSymbol}
            onBuilderSubproxyAccountChange={setBuilderSubproxyAccount}
            variablesCommitted={variablesCommitted}
            onVariablesCommit={() => setVariablesCommitted(true)}
            onVariablesEdit={() => setVariablesCommitted(false)}
            customEdits={customEdits}
            onCustomEditsChange={setCustomEdits}
          />
        </>
      )}
    </Container>
  );
}
