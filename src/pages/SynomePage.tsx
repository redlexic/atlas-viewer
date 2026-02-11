/**
 * Synome Page
 *
 * Displays an Atlas artifact as an interactive graph.
 */

import { useEffect, useState } from 'react';
import { Container, Loader, Center, Text, Stack, Alert, Select, Group } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import { SynomeViewer } from '../synome';
import type { AtlasNode } from '../types';
import { ATLAS_FILES } from '../config/dataPaths';

// Agent doc numbers
const AGENTS = {
  Spark: 'A.6.1.1.1',
  Grove: 'A.6.1.1.2',
  Keel: 'A.6.1.1.3',
  Skybase: 'A.6.1.1.4',
  Obex: 'A.6.1.1.5',
  Prysm: 'A.6.1.1.6',
} as const;

export function SynomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agentNode, setAgentNode] = useState<AtlasNode | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<keyof typeof AGENTS>('Skybase');
  const [atlasVersion, setAtlasVersion] = useState<string>('');

  useEffect(() => {
    async function loadAgent() {
      setLoading(true);
      setError(null);

      try {
        // Extract version from path
        const version = ATLAS_FILES.current.match(/atlas-(\d{4}-\d{2}-\d{2})/)?.[1] || 'unknown';
        setAtlasVersion(version);

        // Load atlas
        const response = await fetch(ATLAS_FILES.current);
        if (!response.ok) {
          throw new Error(`Failed to load Atlas: ${response.statusText}`);
        }

        const atlas = await response.json();

        // Find the selected agent
        const targetDocNo = AGENTS[selectedAgent];

        // Recursive search for the agent node
        function findNode(nodes: AtlasNode[], docNo: string): AtlasNode | null {
          for (const node of nodes) {
            if (node.doc_no === docNo) {
              return node;
            }
            // Check all array fields for children
            for (const key in node) {
              const value = node[key];
              if (Array.isArray(value) && value.length > 0) {
                if (value[0] && typeof value[0] === 'object' && 'doc_no' in value[0]) {
                  const found = findNode(value as AtlasNode[], docNo);
                  if (found) return found;
                }
              }
            }
          }
          return null;
        }

        const agent = findNode(atlas, targetDocNo);

        if (!agent) {
          throw new Error(`Agent ${selectedAgent} (${targetDocNo}) not found in Atlas`);
        }

        setAgentNode(agent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadAgent();
  }, [selectedAgent]);

  if (loading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text c="dimmed">Loading {selectedAgent} artifact...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="sm" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!agentNode) {
    return (
      <Container size="sm" py="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Not Found" color="yellow">
          Agent node not found
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Agent Selector */}
      <Container size="xl" py="sm">
        <Group>
          <Select
            label="Agent"
            value={selectedAgent}
            onChange={(v) => v && setSelectedAgent(v as keyof typeof AGENTS)}
            data={Object.keys(AGENTS)}
            w={200}
          />
          <Text size="sm" c="dimmed" mt={24}>
            Atlas version: {atlasVersion}
          </Text>
        </Group>
      </Container>

      {/* Synome Viewer */}
      <SynomeViewer agentNode={agentNode} atlasVersion={atlasVersion} />
    </>
  );
}

export default SynomePage;
