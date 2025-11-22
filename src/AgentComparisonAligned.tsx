import { Box, Text, Paper, Group, Badge } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import type { AtlasNode } from './types';

interface AgentComparisonAlignedProps {
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

interface UnifiedSection {
  name: string;
  nodes: (AtlasNode | null)[]; // One per agent, null if agent doesn't have this section
}

// Extract the suffix of doc_no after the agent number (A.6.1.1.N)
const getDocNoSuffix = (docNo: string): string => {
  // Match pattern A.6.1.1.X where X can be 1, 2, 5, N, etc.
  const match = docNo.match(/^A\.6\.1\.1\.[^.]+(.*)$/);
  return match ? match[1] : docNo;
};

const buildUnifiedStructure = (agentNodes: (AtlasNode | null)[]): UnifiedSection[] => {
  // Collect all unique sections by doc_no suffix (position in structure)
  const sectionMap = new Map<string, (AtlasNode | null)[]>();

  agentNodes.forEach((node, agentIndex) => {
    if (!node) return;

    const children = getChildren(node);
    children.forEach(child => {
      // Match by doc_no suffix (structural position), not name
      const key = getDocNoSuffix(child.doc_no);

      if (!sectionMap.has(key)) {
        // Initialize array with nulls for all agents
        sectionMap.set(key, Array(agentNodes.length).fill(null));
      }

      const nodes = sectionMap.get(key)!;
      nodes[agentIndex] = child;
    });
  });

  // Convert to array and sort by suffix
  const sections = Array.from(sectionMap.entries()).map(([suffix, nodes]) => ({
    name: suffix,
    nodes
  }));

  // Sort by the suffix to maintain order
  sections.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  return sections;
};

const AlignedNodeRow = ({
  nodes,
  level,
  agentNames
}: {
  nodes: (AtlasNode | null)[];
  level: number;
  agentNames: string[];
}) => {
  // Build unified structure for children
  const childSections = buildUnifiedStructure(nodes);

  return (
    <>
      {/* Current level */}
      <Group align="flex-start" gap="xs" wrap="nowrap" style={{ margin: 0 }}>
        {nodes.map((node, agentIndex) => {
          const isTemplate = agentNames[agentIndex].includes('Template');

          // Check if node is missing or is a stub (empty content with generic name)
          const isStub = node && !node.content && /^Section \d+$/.test(node.name);

          if (!node || isStub) {
            // Blank space for missing section or stub
            return (
              <Box key={agentIndex} style={{ flex: 1, minWidth: 0 }}>
                <Paper
                  p="xs"
                  mb="xs"
                  withBorder
                  style={{
                    marginLeft: level * 12,
                    borderLeft: '3px solid transparent',
                    opacity: 0.3,
                    minHeight: '60px'
                  }}
                >
                  <Text size="xs" c="dimmed" fs="italic">No matching section</Text>
                </Paper>
              </Box>
            );
          }

          return (
            <Box key={agentIndex} style={{ flex: 1, minWidth: 0 }}>
              <Paper
                p="xs"
                mb="xs"
                withBorder
                style={{
                  marginLeft: level * 12,
                  borderLeft: isTemplate ? '3px solid var(--mantine-color-yellow-6)' : '3px solid var(--mantine-color-blue-6)'
                }}
              >
                <Group gap="xs" mb={4}>
                  <Text size="xs" fw={700}>
                    <ColoredDocNo docNo={node.doc_no} />
                  </Text>
                  <Badge size="xs" variant="light" color={isTemplate ? 'yellow' : 'blue'}>
                    {node.type}
                  </Badge>
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
            </Box>
          );
        })}
      </Group>

      {/* Render children recursively */}
      {childSections.map((section, index) => (
        <AlignedNodeRow
          key={`${section.name}-${index}`}
          nodes={section.nodes}
          level={level + 1}
          agentNames={agentNames}
        />
      ))}
    </>
  );
};

export const AgentComparisonAligned = ({ agents }: AgentComparisonAlignedProps) => {
  const agentNames = agents.map(a => a.name);
  const rootNodes = agents.map(a => a.node);

  return (
    <Box style={{ margin: 0, padding: 0 }}>
      <Text size="sm" fw={600} mb="sm" ta="center">
        Side-by-Side Agent Comparison (Aligned)
      </Text>

      {/* Column Headers */}
      <Group align="flex-start" gap="xs" wrap="nowrap" style={{ margin: 0 }}>
        {agents.map(({ name }) => {
          const isTemplate = name.includes('Template');
          return (
            <Box key={name} style={{ flex: 1, minWidth: 0 }}>
              <Paper p="xs" withBorder mb="xs" bg={isTemplate ? 'yellow.8' : 'dark.7'}>
                <Text size="sm" fw={700} ta="center" c={isTemplate ? 'yellow.2' : undefined}>
                  {name}
                </Text>
              </Paper>
            </Box>
          );
        })}
      </Group>

      {/* Root level */}
      <AlignedNodeRow nodes={rootNodes} level={0} agentNames={agentNames} />
    </Box>
  );
};
