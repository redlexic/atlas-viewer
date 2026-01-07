import { useState, useEffect } from 'react';
import { Container, Title, Text, Loader, Center, Box, Group, Button, Checkbox } from '@mantine/core';
import { IconDownload, IconTrash } from '@tabler/icons-react';
import { AgentComparisonAligned } from '../AgentComparisonAligned';
import type { AtlasNode } from '../types';
import { loadComparisonAgents, type AgentInfo } from '../utils/dataLoader';
import { substituteVariablesPlain } from '../utils/substitutionUtils';

export function ComparisonPage() {
  const [comparisonAgents, setComparisonAgents] = useState<AgentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleAgents, setVisibleAgents] = useState<Record<string, boolean>>({
    Spark: true,
    Grove: true,
    Keel: true,
    'Launch Agent 3': true,
    'Obex': true,
    'Launch Agent 5': true,
    Builder: true,
  });
  const [selectedSections, setSelectedSections] = useState<
    Record<string, { agentName: string; node: AtlasNode }>
  >({});

  // Builder variables
  const [builderAgentName, setBuilderAgentName] = useState<string>('');
  const [builderTokenSymbol, setBuilderTokenSymbol] = useState<string>('');
  const [builderSubproxyAccount, setBuilderSubproxyAccount] = useState<string>('');
  const [variablesCommitted, setVariablesCommitted] = useState<boolean>(false);

  // Custom edits for Builder sections
  const [customEdits, setCustomEdits] = useState<
    Record<string, { name?: string; content?: string }>
  >({});

  // Auto-save Builder state to localStorage
  useEffect(() => {
    if (loading) return;

    if (
      Object.keys(selectedSections).length === 0 &&
      Object.keys(customEdits).length === 0 &&
      !builderAgentName &&
      !builderTokenSymbol &&
      !builderSubproxyAccount
    ) {
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
      localStorage.setItem('builderState', JSON.stringify(builderState));
    } catch (e) {
      console.error('Failed to save builder state:', e);
    }
  }, [
    selectedSections,
    customEdits,
    builderAgentName,
    builderTokenSymbol,
    builderSubproxyAccount,
    variablesCommitted,
    loading,
  ]);

  useEffect(() => {
    loadComparisonAgents()
      .then((agents) => {
        setComparisonAgents(agents);
        setLoading(false);

        // Load Builder state from localStorage
        try {
          const savedState = localStorage.getItem('builderState');
          if (savedState) {
            const parsed = JSON.parse(savedState);
            if (parsed.selectedSections) setSelectedSections(parsed.selectedSections);
            if (parsed.customEdits) setCustomEdits(parsed.customEdits);
            if (parsed.builderAgentName !== undefined)
              setBuilderAgentName(parsed.builderAgentName || '');
            if (parsed.builderTokenSymbol !== undefined)
              setBuilderTokenSymbol(parsed.builderTokenSymbol || '');
            if (parsed.builderSubproxyAccount !== undefined)
              setBuilderSubproxyAccount(parsed.builderSubproxyAccount || '');
            if (parsed.variablesCommitted !== undefined)
              setVariablesCommitted(!!parsed.variablesCommitted);
          }
        } catch (e) {
          console.error('Failed to load builder state:', e);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const clearBuilder = () => {
    if (
      Object.keys(selectedSections).length === 0 &&
      Object.keys(customEdits).length === 0
    ) {
      return;
    }

    if (
      confirm(
        'Are you sure you want to clear all Builder data? This will remove all selected sections and custom edits.'
      )
    ) {
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

    // Create clean copies of selected nodes with substituted values or custom edits
    const selectedNodes = Object.entries(selectedSections).map(([docNoSuffix, s]) => {
      const customEdit = customEdits[docNoSuffix];

      return {
        type: s.node.type,
        doc_no: s.node.doc_no,
        name:
          customEdit?.name !== undefined
            ? customEdit.name
            : substituteVariablesPlain(
                s.node.name,
                builderAgentName,
                builderTokenSymbol,
                builderSubproxyAccount
              ),
        uuid: s.node.uuid,
        last_modified: s.node.last_modified,
        content:
          customEdit?.content !== undefined
            ? customEdit.content
            : substituteVariablesPlain(
                s.node.content || '',
                builderAgentName,
                builderTokenSymbol,
                builderSubproxyAccount
              ),
        agent_scope_database: [],
        annotations: [],
        tenets: [],
        active_data: [],
        needed_research: [],
      };
    });

    const builtAgent = {
      type: 'Agent',
      doc_no: 'BUILDER',
      name: builderAgentName || 'Custom Built Agent',
      uuid: 'builder-' + Date.now(),
      content: 'Agent built from selected sections',
      last_modified: new Date().toISOString(),
      sections: selectedNodes,
    };

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
        <Text c="red" size="lg">
          Error: {error}
        </Text>
      </Center>
    );
  }

  return (
    <Container size="100%" py="xl" px="xs">
      <Box mb="xl">
        <Title order={1} mb="xs">
          Agent Comparison
        </Title>
        <Text c="dimmed" size="sm">
          Compare agent structures and build custom agents
        </Text>
      </Box>

      {comparisonAgents.length === 6 && (
        <>
          <Box mb="md">
            <Group justify="center" mb="sm">
              {comparisonAgents.map((agent) => (
                <Checkbox
                  key={agent.name}
                  label={agent.name}
                  checked={visibleAgents[agent.name]}
                  onChange={(e) => {
                    const checked = e.currentTarget.checked;
                    setVisibleAgents((prev) => ({
                      ...prev,
                      [agent.name]: checked,
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
                  setVisibleAgents((prev) => ({
                    ...prev,
                    Builder: checked,
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
                disabled={
                  Object.keys(selectedSections).length === 0 &&
                  Object.keys(customEdits).length === 0
                }
              >
                Clear Builder
              </Button>
            </Group>
          </Box>
          <AgentComparisonAligned
            agents={comparisonAgents.filter((agent) => visibleAgents[agent.name])}
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
