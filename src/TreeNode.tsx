import { Box, Group, Text, ActionIcon, Badge, Collapse, Paper } from '@mantine/core';
import { IconChevronRight, IconChevronDown, IconChevronsDown } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';
import type { TreeNodeProps, AtlasNode } from './types';

const getNodeColor = (type: string) => {
  const colors: Record<string, string> = {
    'Scope': 'blue',
    'Article': 'green',
    'Section': 'orange',
    'Core': 'red',
    'Primary': 'purple',
    'Template': 'yellow',
  };
  return colors[type] || 'gray';
};

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

const getAllDescendantUUIDs = (node: AtlasNode): string[] => {
  const children = getChildren(node);
  const uuids: string[] = [];

  children.forEach(child => {
    uuids.push(child.uuid);
    uuids.push(...getAllDescendantUUIDs(child));
  });

  return uuids;
};

export const TreeNode = ({ node, level, expandedNodes, selectedNodeId, onToggle, onExpandAll, onSelect }: TreeNodeProps) => {
  const children = getChildren(node);
  const hasChildren = children.length > 0;
  const isExpanded = expandedNodes.has(node.uuid);
  const isSelected = selectedNodeId === node.uuid;
  const childCount = node.childCount || 0;
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && nodeRef.current) {
      nodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSelected]);

  const handleExpandAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExpandAll(node.uuid);
  };

  const handleClick = () => {
    onSelect(node.uuid);
    if (hasChildren) {
      onToggle(node.uuid);
    }
  };

  return (
    <Box style={{ marginLeft: level * 16 }}>
      <Paper
        ref={nodeRef}
        p={isSelected ? 'md' : 'sm'}
        mb="xs"
        withBorder
        style={{
          cursor: 'pointer',
          borderLeft: `4px solid var(--mantine-color-${getNodeColor(node.type)}-6)`,
          backgroundColor: isSelected ? 'var(--mantine-color-dark-5)' : undefined,
          borderColor: isSelected ? `var(--mantine-color-${getNodeColor(node.type)}-4)` : undefined,
          borderWidth: isSelected ? '2px' : undefined,
          transform: isSelected ? 'scale(1.02)' : undefined,
          transition: 'all 0.2s ease',
        }}
        onClick={handleClick}
      >
        <Group justify="apart" wrap="nowrap">
          <Group gap="xs" style={{ flex: 1 }}>
            {hasChildren && (
              <ActionIcon
                variant="subtle"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(node.uuid);
                }}
              >
                {isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
              </ActionIcon>
            )}
            {!hasChildren && <Box style={{ width: 28 }} />}

            <Box style={{ flex: 1 }}>
              <Group gap="xs">
                <Text size={isSelected ? 'xl' : 'sm'} fw={700} c={`${getNodeColor(node.type)}.6`}>
                  {node.doc_no}
                </Text>
                <Badge size={isSelected ? 'lg' : 'xs'} color={getNodeColor(node.type)} variant="light">
                  {node.type}
                </Badge>
              </Group>
              <Text size={isSelected ? 'lg' : 'sm'} fw={isSelected ? 600 : 500} mt={2}>
                {node.name}
              </Text>
            </Box>
          </Group>

          <Group gap="xs">
            {hasChildren && (
              <>
                <Badge size="sm" color="gray" variant="outline">
                  {childCount} {childCount === 1 ? 'child' : 'children'}
                </Badge>
                <ActionIcon
                  variant="light"
                  size="sm"
                  color="blue"
                  onClick={handleExpandAll}
                  title="Expand all children"
                >
                  <IconChevronsDown size={16} />
                </ActionIcon>
              </>
            )}
          </Group>
        </Group>

        {node.content && (
          <Box mt="md" pl={hasChildren ? 36 : 0}>
            <Paper p="sm" bg="dark.7" style={{ fontSize: isSelected ? '1.125rem' : '0.875rem' }}>
              <ReactMarkdown>{node.content}</ReactMarkdown>
            </Paper>
          </Box>
        )}
      </Paper>

      {hasChildren && isExpanded && (
        <Box>
          {children.map((child) => (
            <TreeNode
              key={child.uuid}
              node={child}
              level={level + 1}
              expandedNodes={expandedNodes}
              selectedNodeId={selectedNodeId}
              onToggle={onToggle}
              onExpandAll={onExpandAll}
              onSelect={onSelect}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
