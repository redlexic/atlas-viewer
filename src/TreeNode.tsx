import { Box, Group, Text, ActionIcon, Badge, Paper, Checkbox } from '@mantine/core';
import { IconChevronRight, IconChevronDown, IconChevronsDown } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';
import type { TreeNodeProps } from './types';
import { getChildren } from './utils/treeUtils';
import { ColoredDocNo, getNodeColor } from './utils/colorUtils';

export const TreeNode = ({
  node,
  level,
  expandedNodes,
  selectedNodeId,
  onToggle,
  onExpandAll,
  onSelect,
  chosenNodes,
  onChoose,
}: TreeNodeProps) => {
  const children = getChildren(node);
  const hasChildren = children.length > 0;
  const isExpanded = expandedNodes.has(node.uuid);
  const isSelected = selectedNodeId === node.uuid;
  const isChosen = chosenNodes?.has(node.uuid) || false;
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
    <Box style={{ marginLeft: level * 10 }}>
      <Paper
        ref={nodeRef}
        p={isSelected ? 'md' : 'sm'}
        mb="xs"
        withBorder
        style={{
          cursor: 'pointer',
          borderLeft: `4px solid var(--mantine-color-${getNodeColor(node.type)}-6)`,
          backgroundColor: isSelected ? 'var(--mantine-color-dark-5)' : undefined,
          borderColor: isSelected
            ? `var(--mantine-color-${getNodeColor(node.type)}-4)`
            : undefined,
          borderWidth: isSelected ? '2px' : undefined,
          transform: isSelected ? 'scale(1.02)' : undefined,
          transition: 'all 0.2s ease',
          outline: isChosen ? '2px solid var(--mantine-color-green-6)' : undefined,
          outlineOffset: isChosen ? '2px' : undefined,
          position: 'relative',
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
                <Text size={isSelected ? 'xl' : 'sm'} fw={700}>
                  <ColoredDocNo docNo={node.doc_no} />
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

          <Group gap="xs" style={{ paddingRight: onChoose ? 36 : 0 }}>
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

        {onChoose && (
          <Checkbox
            checked={isChosen}
            onChange={(e) => {
              e.stopPropagation();
              onChoose(node.uuid);
            }}
            onClick={(e) => e.stopPropagation()}
            color="green"
            size="md"
            title={isChosen ? 'Remove from selection' : 'Add to selection'}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        )}

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
              chosenNodes={chosenNodes}
              onChoose={onChoose}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
