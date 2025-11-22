import { Box, Text, Paper, ScrollArea, Group, Badge } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import type { AtlasNode } from './types';

interface AgentComparisonProps {
  agents: { name: string; node: AtlasNode }[];
}

// Rainbow colors for doc_no segments
const rainbowColors = [
  '#DC2626', // red
  '#EA580C', // orange
  '#D97706', // amber
  '#CA8A04', // yellow
  '#65A30D', // lime
  '#16A34A', // green
  '#059669', // emerald
  '#0D9488', // teal
  '#0891B2', // cyan
  '#0284C7', // sky
  '#2563EB', // blue
  '#4F46E5', // indigo
  '#7C3AED', // violet
  '#9333EA', // purple
  '#C026D3', // fuchsia
  '#DB2777', // pink
];

const getSegmentColor = (index: number) => rainbowColors[index % rainbowColors.length];

const ColoredDocNo = ({ docNo }: { docNo: string }) => {
  const segments = docNo.split('.');
  return (
    <>
      {segments.map((segment, index) => (
        <span key={index}>
          {index > 0 && <span style={{ color: '#666' }}>.</span>}
          <span style={{ color: getSegmentColor(index) }}>{segment}</span>
        </span>
      ))}
    </>
  );
};

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

const NodeView = ({ node, level = 0 }: { node: AtlasNode; level?: number }) => {
  const children = getChildren(node);

  return (
    <Box>
      <Paper
        p="xs"
        mb="xs"
        withBorder
        style={{
          marginLeft: level * 12,
          borderLeft: '3px solid var(--mantine-color-blue-6)'
        }}
      >
        <Group gap="xs" mb={4}>
          <Text size="xs" fw={700}><ColoredDocNo docNo={node.doc_no} /></Text>
          <Badge size="xs" variant="light">{node.type}</Badge>
        </Group>
        <Text size="xs" fw={500} mb={node.content ? 4 : 0}>{node.name}</Text>
        {node.content && (
          <Paper p="xs" bg="dark.8" mt="xs">
            <Text size="xs" style={{ fontSize: '0.7rem' }}>
              <ReactMarkdown>{node.content}</ReactMarkdown>
            </Text>
          </Paper>
        )}
      </Paper>

      {children.map((child, i) => (
        <NodeView key={i} node={child} level={level + 1} />
      ))}
    </Box>
  );
};

export const AgentComparison = ({ agents }: AgentComparisonProps) => {
  return (
    <Box style={{ margin: 0, padding: 0 }}>
      <Text size="sm" fw={600} mb="sm" ta="center">
        Side-by-Side Agent Comparison
      </Text>

      <Group align="flex-start" gap="xs" wrap="nowrap" style={{ margin: 0 }}>
        {agents.map(({ name, node }, index) => {
          const isTemplate = name.includes('Template');
          return (
            <Box
              key={name}
              style={{
                flex: 1,
                minWidth: 0,
                backgroundColor: isTemplate ? 'var(--mantine-color-yellow-9)' : undefined,
                padding: isTemplate ? '4px' : 0,
                borderRadius: isTemplate ? '4px' : undefined
              }}
            >
              <Paper p="xs" withBorder mb="xs" bg={isTemplate ? 'yellow.8' : 'dark.7'}>
                <Text size="sm" fw={700} ta="center" c={isTemplate ? 'yellow.2' : undefined}>
                  {name}
                </Text>
              </Paper>

              <ScrollArea h="800px" style={{ padding: 0, margin: 0 }}>
                <NodeView node={node} />
              </ScrollArea>
            </Box>
          );
        })}
      </Group>
    </Box>
  );
};
