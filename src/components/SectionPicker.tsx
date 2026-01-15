import { useState, useMemo, useCallback } from 'react';
import {
  Box,
  TextInput,
  Paper,
  Text,
  Group,
  ActionIcon,
  Badge,
  ScrollArea,
  Stack,
  Button,
  Tooltip,
} from '@mantine/core';
import {
  IconSearch,
  IconChevronRight,
  IconChevronDown,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import type { AtlasNode } from '../types';
import { getChildren } from '../utils/treeUtils';
import { searchAtlasSections } from '../utils/dataLoader';
import { ColoredDocNo } from '../utils/colorUtils';

interface SectionPickerProps {
  atlasData: AtlasNode[];
  loadedDocNos: Set<string>;
  onLoadSection: (docNo: string) => void;
  onClose?: () => void;
}

interface PickerTreeNodeProps {
  node: AtlasNode;
  level: number;
  expandedNodes: Set<string>;
  loadedDocNos: Set<string>;
  onToggle: (uuid: string) => void;
  onLoad: (docNo: string) => void;
}

function PickerTreeNode({
  node,
  level,
  expandedNodes,
  loadedDocNos,
  onToggle,
  onLoad,
}: PickerTreeNodeProps) {
  const children = getChildren(node);
  const hasChildren = children.length > 0;
  const isExpanded = expandedNodes.has(node.uuid);
  const isLoaded = loadedDocNos.has(node.doc_no);
  const childCount = node.childCount || 0;

  return (
    <Box>
      <Paper
        p="xs"
        mb={4}
        withBorder
        style={{
          marginLeft: level * 12,
          borderLeftWidth: 3,
          borderLeftColor: isLoaded ? 'var(--mantine-color-green-6)' : 'var(--mantine-color-dark-4)',
          backgroundColor: isLoaded ? 'var(--mantine-color-green-9)' : undefined,
          opacity: isLoaded ? 0.7 : 1,
        }}
      >
        <Group justify="space-between" wrap="nowrap" gap="xs">
          <Group gap={4} style={{ flex: 1, minWidth: 0 }}>
            {hasChildren ? (
              <ActionIcon
                variant="subtle"
                size="xs"
                onClick={() => onToggle(node.uuid)}
              >
                {isExpanded ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
              </ActionIcon>
            ) : (
              <Box style={{ width: 22 }} />
            )}

            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text size="xs" fw={600} truncate style={{ fontFamily: 'monospace' }}>
                <ColoredDocNo docNo={node.doc_no} />
              </Text>
              <Text size="xs" c="dimmed" truncate>
                {node.name}
              </Text>
            </Box>
          </Group>

          <Group gap={4}>
            {hasChildren && (
              <Badge size="xs" color="gray" variant="outline">
                {childCount}
              </Badge>
            )}
            <Tooltip label={isLoaded ? 'Already loaded' : 'Load section + children'}>
              <ActionIcon
                variant={isLoaded ? 'filled' : 'light'}
                size="sm"
                color={isLoaded ? 'green' : 'blue'}
                onClick={() => !isLoaded && onLoad(node.doc_no)}
                disabled={isLoaded}
              >
                {isLoaded ? <IconX size={14} /> : <IconPlus size={14} />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Paper>

      {hasChildren && isExpanded && (
        <Box>
          {children.map((child) => (
            <PickerTreeNode
              key={child.uuid}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              loadedDocNos={loadedDocNos}
              onToggle={onToggle}
              onLoad={onLoad}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export function SectionPicker({
  atlasData,
  loadedDocNos,
  onLoadSection,
  onClose,
}: SectionPickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchAtlasSections(atlasData, searchQuery, 20);
  }, [atlasData, searchQuery]);

  const handleToggle = useCallback((uuid: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(uuid)) {
        newSet.delete(uuid);
      } else {
        newSet.add(uuid);
      }
      return newSet;
    });
  }, []);

  const handleLoad = useCallback((docNo: string) => {
    onLoadSection(docNo);
  }, [onLoadSection]);

  // Get top-level sections for tree browser (A.0, A.1, etc.)
  const topLevelSections = useMemo(() => {
    return atlasData.filter(node => node.doc_no && node.doc_no.split('.').length <= 2);
  }, [atlasData]);

  return (
    <Box h="100%">
      <Stack gap="sm" h="100%">
        {/* Header */}
        <Group justify="space-between">
          <Text fw={600} size="sm">Section Picker</Text>
          {onClose && (
            <ActionIcon variant="subtle" size="sm" onClick={onClose}>
              <IconX size={16} />
            </ActionIcon>
          )}
        </Group>

        {/* Search */}
        <TextInput
          placeholder="Search by doc_no or name..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          size="sm"
        />

        {/* Results/Tree */}
        <ScrollArea style={{ flex: 1 }}>
          {searchResults ? (
            // Show search results
            <Stack gap={4}>
              <Text size="xs" c="dimmed" mb="xs">
                {searchResults.length} results for "{searchQuery}"
              </Text>
              {searchResults.map((node) => (
                <Paper
                  key={node.uuid}
                  p="xs"
                  withBorder
                  style={{
                    borderLeftWidth: 3,
                    borderLeftColor: loadedDocNos.has(node.doc_no)
                      ? 'var(--mantine-color-green-6)'
                      : 'var(--mantine-color-dark-4)',
                  }}
                >
                  <Group justify="space-between" wrap="nowrap" gap="xs">
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Text size="xs" fw={600} truncate style={{ fontFamily: 'monospace' }}>
                        <ColoredDocNo docNo={node.doc_no} />
                      </Text>
                      <Text size="xs" c="dimmed" truncate>
                        {node.name}
                      </Text>
                    </Box>
                    <Tooltip label={loadedDocNos.has(node.doc_no) ? 'Already loaded' : 'Load section + children'}>
                      <Button
                        variant={loadedDocNos.has(node.doc_no) ? 'filled' : 'light'}
                        size="xs"
                        color={loadedDocNos.has(node.doc_no) ? 'green' : 'blue'}
                        onClick={() => !loadedDocNos.has(node.doc_no) && handleLoad(node.doc_no)}
                        disabled={loadedDocNos.has(node.doc_no)}
                        leftSection={loadedDocNos.has(node.doc_no) ? null : <IconPlus size={14} />}
                      >
                        {loadedDocNos.has(node.doc_no) ? 'Loaded' : 'Load'}
                      </Button>
                    </Tooltip>
                  </Group>
                </Paper>
              ))}
            </Stack>
          ) : (
            // Show tree browser
            <Box>
              <Text size="xs" c="dimmed" mb="xs">
                Browse Atlas sections
              </Text>
              {topLevelSections.map((node) => (
                <PickerTreeNode
                  key={node.uuid}
                  node={node}
                  level={0}
                  expandedNodes={expandedNodes}
                  loadedDocNos={loadedDocNos}
                  onToggle={handleToggle}
                  onLoad={handleLoad}
                />
              ))}
            </Box>
          )}
        </ScrollArea>
      </Stack>
    </Box>
  );
}
