import { useState, useEffect } from 'react';
import { Container, Title, Text, Loader, Center, Box, Group, Button, Checkbox } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
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

  // Builder variables
  const [builderAgentName, setBuilderAgentName] = useState('');
  const [builderTokenSymbol, setBuilderTokenSymbol] = useState('');
  const [builderSubproxyAccount, setBuilderSubproxyAccount] = useState('');
  const [variablesCommitted, setVariablesCommitted] = useState(false);

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
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const exportBuilder = () => {
    if (Object.keys(selectedSections).length === 0) {
      alert('No sections selected. Please select sections to build your agent.');
      return;
    }

    // Create a basic agent structure with selected sections
    const builtAgent: AtlasNode = {
      type: 'Agent',
      doc_no: 'BUILDER',
      name: 'Custom Built Agent',
      uuid: 'builder-' + Date.now(),
      content: 'Agent built from selected sections',
      last_modified: new Date().toISOString()
    };

    // Group selected sections by their structure
    const selectedNodes = Object.values(selectedSections).map(s => s.node);

    // Add selected sections as children
    const builtAgentWithSections = {
      ...builtAgent,
      sections: selectedNodes
    };

    // Download as JSON
    const json = JSON.stringify(builtAgentWithSections, null, 2);
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
          />
        </>
      )}
    </Container>
  );
}
