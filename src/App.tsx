import { useState, useEffect, useCallback } from 'react';
import { Container, Title, Text, Loader, Center, Box, Group, Button } from '@mantine/core';
import { IconFolder, IconFolderOpen } from '@tabler/icons-react';
import { TreeNode } from './TreeNode';
import { AgentComparisonAligned } from './AgentComparisonAligned';
import type { AtlasNode } from './types';

// Helper to get all children from any array field containing document nodes
const getChildren = (node: AtlasNode): AtlasNode[] => {
  const children: AtlasNode[] = [];

  for (const key in node) {
    const value = node[key];
    if (Array.isArray(value) && value.length > 0) {
      // Check if this array contains document nodes (has type, doc_no, name, uuid)
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

// Flatten tree into ordered list for navigation
const flattenTree = (nodes: AtlasNode[], expandedNodes: Set<string>): AtlasNode[] => {
  const result: AtlasNode[] = [];

  const traverse = (node: AtlasNode) => {
    result.push(node);
    if (expandedNodes.has(node.uuid)) {
      const children = getChildren(node);
      children.forEach(traverse);
    }
  };

  nodes.forEach(traverse);
  return result;
};

// Find next sibling of a node
const findNextSibling = (nodes: AtlasNode[], currentUuid: string): AtlasNode | null => {
  const findInChildren = (children: AtlasNode[]): AtlasNode | null => {
    const index = children.findIndex(n => n.uuid === currentUuid);
    if (index !== -1 && index < children.length - 1) {
      return children[index + 1];
    }
    return null;
  };

  const search = (nodeList: AtlasNode[]): AtlasNode | null => {
    for (const node of nodeList) {
      const children = getChildren(node);
      const sibling = findInChildren(children);
      if (sibling) return sibling;

      const result = search(children);
      if (result) return result;
    }
    return null;
  };

  const topLevelSibling = findInChildren(nodes);
  if (topLevelSibling) return topLevelSibling;

  return search(nodes);
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

function App() {
  const [atlasData, setAtlasData] = useState<AtlasNode[]>([]);
  const [agentTemplate, setAgentTemplate] = useState<AtlasNode | null>(null);
  const [comparisonAgents, setComparisonAgents] = useState<{ name: string; node: AtlasNode }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/atlas-2025-11-20.json').then(res => res.json()),
      fetch('/agent-template.json').then(res => res.json())
    ])
      .then(([atlasData, templateData]) => {
        const processedData = preprocessData(atlasData);

        // Wrap template with a special wrapper node
        const templateWrapper: AtlasNode = {
          type: 'Template',
          doc_no: 'TEMPLATE',
          name: '📋 Agent Template (Reference Only)',
          uuid: 'template-root',
          last_modified: '',
          content: 'This is a reference template for creating new agents. Use this structure when creating new Prime Agents. This template is NOT part of the official Atlas.',
          agent_scope_database: [templateData],
          childCount: preprocessNode(templateData) + 1
        };

        // Extract the three agents for comparison
        const spark = findNodeByDocNo(processedData, 'A.6.1.1.1');
        const grove = findNodeByDocNo(processedData, 'A.6.1.1.2');
        const launch = findNodeByDocNo(processedData, 'A.6.1.1.5');

        const agents = [];
        if (spark) agents.push({ name: 'Spark', node: spark });
        if (grove) agents.push({ name: 'Grove', node: grove });
        if (launch) agents.push({ name: 'Launch Agent 4', node: launch });

        setAtlasData(processedData);
        setAgentTemplate(templateWrapper);
        setComparisonAgents(agents);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleToggle = (uuid: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(uuid)) {
        newSet.delete(uuid);
      } else {
        newSet.add(uuid);
      }
      return newSet;
    });
  };

  const handleExpandAll = (uuid: string) => {
    const getAllDescendantUUIDs = (node: AtlasNode): string[] => {
      const children = getChildren(node);
      const uuids: string[] = [uuid];

      children.forEach(child => {
        uuids.push(child.uuid);
        uuids.push(...getAllDescendantUUIDs(child));
      });

      return uuids;
    };

    const findNode = (nodes: AtlasNode[], targetUuid: string): AtlasNode | null => {
      for (const node of nodes) {
        if (node.uuid === targetUuid) {
          return node;
        }
        const children = getChildren(node);
        const found = findNode(children, targetUuid);
        if (found) return found;
      }
      return null;
    };

    const node = findNode(atlasData, uuid);
    if (node) {
      const allUuids = getAllDescendantUUIDs(node);
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        allUuids.forEach(id => newSet.add(id));
        return newSet;
      });
    }
  };

  const expandAllScopes = () => {
    const allUuids = atlasData.flatMap(scope => {
      const getAllUuids = (node: AtlasNode): string[] => {
        const children = getChildren(node);
        const uuids: string[] = [node.uuid];
        children.forEach(child => {
          uuids.push(...getAllUuids(child));
        });
        return uuids;
      };
      return getAllUuids(scope);
    });
    setExpandedNodes(new Set(allUuids));
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedNodeId) return;

    const flatNodes = flattenTree(atlasData, expandedNodes);
    const currentIndex = flatNodes.findIndex(n => n.uuid === selectedNodeId);
    if (currentIndex === -1) return;

    const currentNode = flatNodes[currentIndex];

    switch (e.key) {
      case 'ArrowRight':
        // Go to next node
        e.preventDefault();
        if (currentIndex < flatNodes.length - 1) {
          setSelectedNodeId(flatNodes[currentIndex + 1].uuid);
        }
        break;

      case 'ArrowLeft':
        // Go to previous node
        e.preventDefault();
        if (currentIndex > 0) {
          setSelectedNodeId(flatNodes[currentIndex - 1].uuid);
        }
        break;

      case 'ArrowDown':
        // Close current node and go to next sibling
        e.preventDefault();
        if (expandedNodes.has(selectedNodeId)) {
          setExpandedNodes(prev => {
            const newSet = new Set(prev);
            newSet.delete(selectedNodeId);
            return newSet;
          });
        }
        const nextSibling = findNextSibling(atlasData, selectedNodeId);
        if (nextSibling) {
          setSelectedNodeId(nextSibling.uuid);
        }
        break;

      case 'ArrowUp':
        // Go to previous sibling or parent
        e.preventDefault();
        if (currentIndex > 0) {
          setSelectedNodeId(flatNodes[currentIndex - 1].uuid);
        }
        break;

      case 'Enter':
      case ' ':
        // Toggle expansion
        e.preventDefault();
        const children = getChildren(currentNode);
        if (children.length > 0) {
          handleToggle(selectedNodeId);
        }
        break;
    }
  }, [selectedNodeId, atlasData, expandedNodes]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
        <Group justify="apart" align="center">
          <Box>
            <Title order={1} mb="xs">Atlas Viewer</Title>
            <Text c="dimmed" size="sm">Browse the Atlas documentation structure</Text>
            <Text c="dimmed" size="xs" mt={4}>
              Keyboard: ← → navigate | ↓ collapse & next sibling | ↑ previous | Enter/Space toggle
            </Text>
          </Box>
          <Group>
            <Button
              leftSection={<IconFolderOpen size={16} />}
              onClick={expandAllScopes}
              variant="light"
            >
              Expand All
            </Button>
            <Button
              leftSection={<IconFolder size={16} />}
              onClick={collapseAll}
              variant="light"
              color="gray"
            >
              Collapse All
            </Button>
          </Group>
        </Group>
      </Box>

      <Box>
        {atlasData.map(scope => (
          <TreeNode
            key={scope.uuid}
            node={scope}
            level={0}
            expandedNodes={expandedNodes}
            selectedNodeId={selectedNodeId}
            onToggle={handleToggle}
            onExpandAll={handleExpandAll}
            onSelect={setSelectedNodeId}
          />
        ))}

        {agentTemplate && (
          <>
            <Box my="xl" py="md" style={{ borderTop: '2px dashed var(--mantine-color-gray-6)' }}>
              <Text size="xs" c="dimmed" ta="center">Reference Template Below</Text>
            </Box>
            <TreeNode
              key={agentTemplate.uuid}
              node={agentTemplate}
              level={0}
              expandedNodes={expandedNodes}
              selectedNodeId={selectedNodeId}
              onToggle={handleToggle}
              onExpandAll={handleExpandAll}
              onSelect={setSelectedNodeId}
            />
          </>
        )}

        {comparisonAgents.length === 3 && agentTemplate && (
          <>
            <Box my="xl" py="md" style={{ borderTop: '2px dashed var(--mantine-color-gray-6)' }}>
              <Text size="xs" c="dimmed" ta="center">Agent Comparison View</Text>
            </Box>
            <AgentComparisonAligned
              agents={[
                ...comparisonAgents,
                { name: '📋 Template', node: agentTemplate.agent_scope_database![0] }
              ]}
            />
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
