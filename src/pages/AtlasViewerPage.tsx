import { useState, useEffect, useCallback } from 'react';
import { Container, Title, Text, Loader, Center, Box, Group, Button } from '@mantine/core';
import { IconFolder, IconFolderOpen } from '@tabler/icons-react';
import { TreeNode } from '../TreeNode';
import type { AtlasNode } from '../types';
import {
  getChildren,
  getAllDescendantUUIDs,
  findNodeByUUID,
  flattenTree,
  findNextSibling,
} from '../utils/treeUtils';
import { loadAtlasData } from '../utils/dataLoader';

export function AtlasViewerPage() {
  const [atlasData, setAtlasData] = useState<AtlasNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  useEffect(() => {
    loadAtlasData()
      .then((data) => {
        setAtlasData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleToggle = (uuid: string) => {
    setExpandedNodes((prev) => {
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
    const node = findNodeByUUID(atlasData, uuid);
    if (node) {
      const allUuids = [uuid, ...getAllDescendantUUIDs(node)];
      setExpandedNodes((prev) => {
        const newSet = new Set(prev);
        allUuids.forEach((id) => newSet.add(id));
        return newSet;
      });
    }
  };

  const expandAllScopes = () => {
    const allUuids = atlasData.flatMap((scope) => {
      const getAllUuids = (node: AtlasNode): string[] => {
        const children = getChildren(node);
        const uuids: string[] = [node.uuid];
        children.forEach((child) => {
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
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedNodeId) return;

      const flatNodes = flattenTree(atlasData, expandedNodes);
      const currentIndex = flatNodes.findIndex((n) => n.uuid === selectedNodeId);
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

        case 'ArrowDown': {
          // Close current node and go to next sibling
          e.preventDefault();
          if (expandedNodes.has(selectedNodeId)) {
            setExpandedNodes((prev) => {
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
        }

        case 'ArrowUp':
          // Go to previous sibling or parent
          e.preventDefault();
          if (currentIndex > 0) {
            setSelectedNodeId(flatNodes[currentIndex - 1].uuid);
          }
          break;

        case 'Enter':
        case ' ': {
          // Toggle expansion
          e.preventDefault();
          const children = getChildren(currentNode);
          if (children.length > 0) {
            handleToggle(selectedNodeId);
          }
          break;
        }
      }
    },
    [selectedNodeId, atlasData, expandedNodes]
  );

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
        <Text c="red" size="lg">
          Error: {error}
        </Text>
      </Center>
    );
  }

  return (
    <Container size="100%" py="xl" px="xs">
      <Box mb="xl">
        <Group justify="apart" align="center">
          <Box>
            <Title order={1} mb="xs">
              Atlas Viewer
            </Title>
            <Text c="dimmed" size="sm">
              Browse the Atlas documentation structure
            </Text>
            <Text c="dimmed" size="xs" mt={4}>
              Keyboard: ← → navigate | ↓ collapse & next sibling | ↑ previous | Enter/Space toggle
            </Text>
          </Box>
          <Group>
            <Button leftSection={<IconFolderOpen size={16} />} onClick={expandAllScopes} variant="light">
              Expand All
            </Button>
            <Button leftSection={<IconFolder size={16} />} onClick={collapseAll} variant="light" color="gray">
              Collapse All
            </Button>
          </Group>
        </Group>
      </Box>

      <Box>
        {atlasData.map((scope) => (
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
      </Box>
    </Container>
  );
}
