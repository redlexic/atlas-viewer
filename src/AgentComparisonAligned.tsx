import { useState, memo } from 'react';
import {
  Box,
  Text,
  Paper,
  Group,
  Badge,
  ActionIcon,
  Radio,
  Button,
  TextInput,
  Stack,
} from '@mantine/core';
import {
  IconChevronRight,
  IconChevronDown,
  IconFolderOpen,
  IconFolder,
  IconEdit,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import type { AtlasNode } from './types';

interface AgentComparisonAlignedProps {
  agents: { name: string; node: AtlasNode }[];
  selectedSections: Record<string, { agentName: string; node: AtlasNode }>;
  onSectionSelect: (
    sections: Record<string, { agentName: string; node: AtlasNode }>
  ) => void;
  showBuilder: boolean;
  builderAgentName: string;
  builderTokenSymbol: string;
  builderSubproxyAccount: string;
  onBuilderAgentNameChange: (value: string) => void;
  onBuilderTokenSymbolChange: (value: string) => void;
  onBuilderSubproxyAccountChange: (value: string) => void;
  variablesCommitted: boolean;
  onVariablesCommit: () => void;
  onVariablesEdit: () => void;
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

const getSegmentColor = (index: number) =>
  rainbowColors[index % rainbowColors.length];

// Substitute variables in content and highlight them in green
const substituteVariables = (
  content: string,
  agentName: string,
  tokenSymbol: string,
  subproxyAccount: string
): string => {
  if (!content) return content;

  // Find all agent names to replace (case-insensitive search but preserve case in non-matches)
  const agentNames = [
    'Prysm',
    'Spark',
    'Grove',
    'Keel',
    'Launch Agent 3',
    'Launch Agent 4',
    'Launch Agent 6',
  ];
  const tokenSymbols = ['PRM', 'SPK', 'GROVE', 'KEEL', 'AGENT3', 'AGENT4', 'AGENT6'];

  let result = content;

  // Replace agent names with green-highlighted version
  if (agentName) {
    agentNames.forEach((name) => {
      // Replace exact matches (case-sensitive to preserve formatting)
      const regex = new RegExp(name, 'g');
      result = result.replace(
        regex,
        `<span style="color: #4ade80; font-weight: 600;">${agentName}</span>`
      );

      // Also handle possessive forms
      const possessiveRegex = new RegExp(`${name}'s`, 'g');
      result = result.replace(
        possessiveRegex,
        `<span style="color: #4ade80; font-weight: 600;">${agentName}'s</span>`
      );
    });
  }

  // Replace token symbols with green-highlighted version
  if (tokenSymbol) {
    tokenSymbols.forEach((symbol) => {
      const regex = new RegExp(`\\b${symbol}\\b`, 'g');
      result = result.replace(
        regex,
        `<span style="color: #4ade80; font-weight: 600;">${tokenSymbol}</span>`
      );
    });
  }

  // Replace SubProxy Account references with green-highlighted version
  if (subproxyAccount) {
    agentNames.forEach((name) => {
      // Replace "AgentName SubProxy Account" (non-possessive form used in labels)
      const subproxyRegex = new RegExp(`${name} SubProxy Account`, 'g');
      result = result.replace(
        subproxyRegex,
        `<span style="color: #4ade80; font-weight: 600;">${subproxyAccount}</span>`
      );

      // Replace "AgentName's SubProxy Account" (possessive form used in content)
      const subproxyPossessiveRegex = new RegExp(
        `${name}'s SubProxy Account`,
        'g'
      );
      result = result.replace(
        subproxyPossessiveRegex,
        `<span style="color: #4ade80; font-weight: 600;">${subproxyAccount}</span>`
      );
    });
  }

  return result;
};

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
      if (
        value[0] &&
        typeof value[0] === 'object' &&
        'type' in value[0] &&
        'doc_no' in value[0] &&
        'uuid' in value[0]
      ) {
        children.push(...value);
      }
    }
  }
  return children;
};

const countAllChildren = (node: AtlasNode): number => {
  const children = getChildren(node);
  let count = children.length;
  children.forEach((child) => {
    count += countAllChildren(child);
  });
  return count;
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

const buildUnifiedStructure = (
  agentNodes: (AtlasNode | null)[]
): UnifiedSection[] => {
  // Collect all unique sections by doc_no suffix (position in structure)
  const sectionMap = new Map<string, (AtlasNode | null)[]>();

  agentNodes.forEach((node, agentIndex) => {
    if (!node) return;

    const children = getChildren(node);
    children.forEach((child) => {
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
    nodes,
  }));

  // Sort by the suffix to maintain order
  sections.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true })
  );

  return sections;
};

const AlignedNodeRow = memo(
  ({
    nodes,
    level,
    agentNames,
    expandedNodes,
    onToggle,
    docNoSuffix,
    selectedSections,
    onSectionSelect,
    showBuilder,
    builderAgentName,
    builderTokenSymbol,
    builderSubproxyAccount,
  }: {
    nodes: (AtlasNode | null)[];
    level: number;
    agentNames: string[];
    expandedNodes: Set<string>;
    onToggle: (uuid: string) => void;
    docNoSuffix: string;
    selectedSections: Record<string, { agentName: string; node: AtlasNode }>;
    onSectionSelect: (
      sections: Record<string, { agentName: string; node: AtlasNode }>
    ) => void;
    showBuilder: boolean;
    builderAgentName: string;
    builderTokenSymbol: string;
    builderSubproxyAccount: string;
  }) => {
    // Build unified structure for children
    const childSections = buildUnifiedStructure(nodes);

    // Get a representative UUID for this row (use first non-null node's UUID)
    const rowUuid = nodes.find((n) => n !== null)?.uuid || '';

    const hasChildren = childSections.length > 0;
    const isExpanded = expandedNodes.has(rowUuid);

    // Calculate total columns: chevron + agents + (builder if shown)
    const totalColumns = 1 + nodes.length + (showBuilder ? 1 : 0);

    return (
      <>
        {/* Current level */}
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: `28px repeat(${totalColumns - 1}, 1fr)`,
            gap: '8px',
            marginBottom: '8px',
            alignItems: 'start',
          }}
        >
          {/* Chevron for expand/collapse */}
          <Box style={{ paddingTop: '8px' }}>
            {hasChildren && (
              <ActionIcon
                size="sm"
                variant="subtle"
                onClick={() => onToggle(rowUuid)}
                style={{ cursor: 'pointer' }}
              >
                {isExpanded ? (
                  <IconChevronDown size={16} />
                ) : (
                  <IconChevronRight size={16} />
                )}
              </ActionIcon>
            )}
          </Box>

          {/* Agent columns - each is a grid column */}
          {nodes.map((node, agentIndex) => {
            const agentName = agentNames[agentIndex];
            // Check if node is missing or is a stub (empty content with generic name)
            const isStub =
              node && !node.content && /^Section \d+$/.test(node.name);
            const isSelected =
              selectedSections[docNoSuffix]?.agentName === agentName;

            if (!node || isStub) {
              // Blank space for missing section or stub
              return (
                <Box key={agentIndex}>
                  <Paper
                    p="xs"
                    mb="xs"
                    withBorder
                    style={{
                      marginLeft: level * 12,
                      borderLeft: '3px solid transparent',
                      opacity: 0.3,
                      minHeight: '60px',
                    }}
                  >
                    <Text size="xs" c="dimmed" fs="italic">
                      No matching section
                    </Text>
                  </Paper>
                </Box>
              );
            }

            const childCount = countAllChildren(node);

            return (
              <Box key={agentIndex} style={{ overflow: 'hidden' }}>
                <Paper
                  p="xs"
                  mb="xs"
                  withBorder
                  style={{
                    marginLeft: level * 12,
                    borderLeft: isSelected
                      ? '3px solid var(--mantine-color-green-6)'
                      : '3px solid var(--mantine-color-blue-6)',
                    overflow: 'hidden',
                  }}
                >
                  <Group gap="xs" mb={4} wrap="wrap">
                    <Radio
                      size="xs"
                      name={`section-${docNoSuffix}`}
                      value={agentName}
                      checked={isSelected}
                      onChange={() => {
                        onSectionSelect({
                          ...selectedSections,
                          [docNoSuffix]: { agentName, node },
                        });
                      }}
                    />
                    <Text size="xs" fw={700}>
                      <ColoredDocNo docNo={node.doc_no} />
                    </Text>
                    <Badge size="xs" variant="light" color="blue">
                      {node.type}
                    </Badge>
                    {childCount > 0 && (
                      <Badge size="xs" variant="filled" color="gray">
                        {childCount}
                      </Badge>
                    )}
                  </Group>
                  <Text
                    size="xs"
                    fw={500}
                    mb={node.content ? 4 : 0}
                    style={{ wordBreak: 'break-word' }}
                  >
                    {node.name}
                  </Text>
                  {node.content && (
                    <Paper
                      p="xs"
                      bg="dark.8"
                      mt="xs"
                      style={{ overflow: 'hidden' }}
                    >
                      <Text
                        size="xs"
                        style={{
                          fontSize: '0.7rem',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                        }}
                      >
                        <ReactMarkdown>{node.content}</ReactMarkdown>
                      </Text>
                    </Paper>
                  )}
                </Paper>
              </Box>
            );
          })}

          {/* Builder column */}
          {showBuilder && (
            <Box style={{ overflow: 'hidden' }}>
              {selectedSections[docNoSuffix] ? (
                <Paper
                  p="xs"
                  mb="xs"
                  withBorder
                  title="Click to remove from Builder"
                  style={{
                    marginLeft: level * 12,
                    borderLeft: '3px solid var(--mantine-color-green-6)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  onClick={() => {
                    // Remove this section from selectedSections by creating new object without this key
                    const { [docNoSuffix]: _, ...newSections } =
                      selectedSections;
                    onSectionSelect(newSections);
                  }}
                >
                  {(() => {
                    const selectedNode = selectedSections[docNoSuffix].node;

                    // Count how many children of this node are actually selected in Builder
                    const countSelectedChildren = (node: AtlasNode): number => {
                      const children = getChildren(node);
                      let count = 0;

                      children.forEach((child) => {
                        // Check if this child is selected in the builder
                        const childSuffix = getDocNoSuffix(child.doc_no);
                        if (selectedSections[childSuffix]) {
                          count++;
                          // Recursively count selected descendants
                          count += countSelectedChildren(child);
                        }
                      });

                      return count;
                    };

                    const builderChildCount =
                      countSelectedChildren(selectedNode);

                    // Apply variable substitution
                    const substitutedName = substituteVariables(
                      selectedNode.name,
                      builderAgentName,
                      builderTokenSymbol,
                      builderSubproxyAccount
                    );
                    const substitutedContent = selectedNode.content
                      ? substituteVariables(
                          selectedNode.content,
                          builderAgentName,
                          builderTokenSymbol,
                          builderSubproxyAccount
                        )
                      : '';

                    return (
                      <>
                        {/* Remove button indicator */}
                        <ActionIcon
                          size="xs"
                          variant="subtle"
                          color="red"
                          style={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            zIndex: 1,
                            pointerEvents: 'none', // Let clicks pass through to Paper
                          }}
                        >
                          <IconX size={12} />
                        </ActionIcon>

                        <Group gap="xs" mb={4} wrap="wrap">
                          <Text size="xs" fw={700}>
                            <ColoredDocNo docNo={selectedNode.doc_no} />
                          </Text>
                          <Badge size="xs" variant="light" color="green">
                            {selectedNode.type}
                          </Badge>
                          {builderChildCount > 0 && (
                            <Badge size="xs" variant="filled" color="gray">
                              {builderChildCount}
                            </Badge>
                          )}
                        </Group>
                        <Text
                          size="xs"
                          fw={500}
                          mb={substitutedContent ? 4 : 0}
                          style={{ wordBreak: 'break-word' }}
                          dangerouslySetInnerHTML={{ __html: substitutedName }}
                        />
                        {substitutedContent && (
                          <Paper
                            p="xs"
                            bg="dark.8"
                            mt="xs"
                            style={{ overflow: 'hidden' }}
                          >
                            <Text
                              size="xs"
                              style={{
                                fontSize: '0.7rem',
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                              }}
                            >
                              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {substitutedContent}
                              </ReactMarkdown>
                            </Text>
                          </Paper>
                        )}
                      </>
                    );
                  })()}
                </Paper>
              ) : (
                <Paper
                  p="xs"
                  mb="xs"
                  withBorder
                  style={{
                    marginLeft: level * 12,
                    borderLeft: '3px solid transparent',
                    opacity: 0.3,
                    minHeight: '60px',
                  }}
                >
                  <Text size="xs" c="dimmed" fs="italic">
                    Select a section
                  </Text>
                </Paper>
              )}
            </Box>
          )}
        </Box>

        {/* Show dotted line for collapsed sections with children */}
        {!isExpanded && hasChildren && (
          <Box
            style={{
              gridColumn: '1 / -1',
              borderBottom: '2px dotted var(--mantine-color-gray-6)',
              marginTop: '4px',
              marginBottom: '8px',
            }}
          />
        )}

        {/* Render children recursively if expanded */}
        {isExpanded &&
          childSections.map((section, index) => (
            <AlignedNodeRow
              key={`${section.name}-${index}`}
              nodes={section.nodes}
              level={level + 1}
              agentNames={agentNames}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
              docNoSuffix={section.name}
              selectedSections={selectedSections}
              onSectionSelect={onSectionSelect}
              showBuilder={showBuilder}
              builderAgentName={builderAgentName}
              builderTokenSymbol={builderTokenSymbol}
              builderSubproxyAccount={builderSubproxyAccount}
            />
          ))}
      </>
    );
  }
);

export const AgentComparisonAligned = ({
  agents,
  selectedSections,
  onSectionSelect,
  showBuilder,
  builderAgentName,
  builderTokenSymbol,
  builderSubproxyAccount,
  onBuilderAgentNameChange,
  onBuilderTokenSymbolChange,
  onBuilderSubproxyAccountChange,
  variablesCommitted,
  onVariablesCommit,
  onVariablesEdit,
}: AgentComparisonAlignedProps) => {
  const agentNames = agents.map((a) => a.name);
  const rootNodes = agents.map((a) => a.node);

  // Initialize with all nodes collapsed for better performance
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

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

  const expandAll = () => {
    const allUuids = new Set<string>();
    const collectUuids = (node: AtlasNode) => {
      allUuids.add(node.uuid);
      const children = getChildren(node);
      children.forEach(collectUuids);
    };
    rootNodes.forEach(collectUuids);
    setExpandedNodes(allUuids);
  };

  const collapseAll = () => {
    setExpandedNodes(new Set());
  };

  // Calculate total columns for header
  const totalColumns = agents.length + (showBuilder ? 1 : 0);

  return (
    <Box style={{ margin: 0, padding: 0 }}>
      <Group gap="xs" mb="sm">
        <Button
          leftSection={<IconFolderOpen size={14} />}
          onClick={expandAll}
          variant="light"
          size="xs"
        >
          Expand All
        </Button>
        <Button
          leftSection={<IconFolder size={14} />}
          onClick={collapseAll}
          variant="light"
          color="gray"
          size="xs"
        >
          Collapse All
        </Button>
      </Group>

      {/* Builder variable form - positioned above Builder column */}
      {showBuilder && (
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: `28px repeat(${totalColumns}, 1fr)`,
            gap: '8px',
            marginBottom: '8px',
            alignItems: 'start',
          }}
        >
          {/* Empty spaces for chevron and agent columns */}
          {[...Array(1 + agents.length)].map((_, i) => (
            <Box key={i} />
          ))}

          {/* Variable form in Builder column position */}
          <Box>
            <Paper p="sm" withBorder bg="dark.7">
              <Stack gap="xs">
                <TextInput
                  label="Agent Name"
                  placeholder="e.g., MyAgent"
                  value={builderAgentName}
                  onChange={(e) =>
                    onBuilderAgentNameChange(e.currentTarget.value)
                  }
                  disabled={variablesCommitted}
                  size="xs"
                  styles={{
                    input: {
                      backgroundColor: variablesCommitted
                        ? 'var(--mantine-color-dark-7)'
                        : undefined,
                    },
                  }}
                />
                <TextInput
                  label="Token Symbol"
                  placeholder="e.g., MYTKN"
                  value={builderTokenSymbol}
                  onChange={(e) =>
                    onBuilderTokenSymbolChange(e.currentTarget.value)
                  }
                  disabled={variablesCommitted}
                  size="xs"
                  styles={{
                    input: {
                      backgroundColor: variablesCommitted
                        ? 'var(--mantine-color-dark-7)'
                        : undefined,
                    },
                  }}
                />
                <TextInput
                  label="Subproxy Account"
                  placeholder="e.g., Ox123...abc"
                  value={builderSubproxyAccount}
                  onChange={(e) =>
                    onBuilderSubproxyAccountChange(e.currentTarget.value)
                  }
                  disabled={variablesCommitted}
                  size="xs"
                  styles={{
                    input: {
                      backgroundColor: variablesCommitted
                        ? 'var(--mantine-color-dark-7)'
                        : undefined,
                    },
                  }}
                />

                {!variablesCommitted ? (
                  <Button
                    leftSection={<IconCheck size={14} />}
                    onClick={onVariablesCommit}
                    size="xs"
                    color="green"
                    disabled={
                      !builderAgentName &&
                      !builderTokenSymbol &&
                      !builderSubproxyAccount
                    }
                  >
                    Commit
                  </Button>
                ) : (
                  <Button
                    leftSection={<IconEdit size={14} />}
                    onClick={onVariablesEdit}
                    size="xs"
                    variant="light"
                    color="gray"
                  >
                    Edit
                  </Button>
                )}
              </Stack>
            </Paper>
          </Box>
        </Box>
      )}

      {/* Column Headers */}
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: `28px repeat(${totalColumns}, 1fr)`,
          gap: '8px',
          marginBottom: '8px',
          alignItems: 'start',
        }}
      >
        {/* Space for chevron column */}
        <Box />

        {/* Agent column headers */}
        {agents.map(({ name }) => (
          <Box key={name}>
            <Paper p="xs" withBorder mb="xs" bg="dark.7">
              <Text size="sm" fw={700} ta="center">
                {name}
              </Text>
            </Paper>
          </Box>
        ))}

        {/* Builder column header */}
        {showBuilder && (
          <Box>
            <Paper p="xs" withBorder mb="xs" bg="green.8">
              <Text size="sm" fw={700} ta="center" c="green.2">
                Builder
              </Text>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Root level */}
      <AlignedNodeRow
        nodes={rootNodes}
        level={0}
        agentNames={agentNames}
        expandedNodes={expandedNodes}
        onToggle={handleToggle}
        docNoSuffix="ROOT"
        selectedSections={selectedSections}
        onSectionSelect={onSectionSelect}
        showBuilder={showBuilder}
        builderAgentName={builderAgentName}
        builderTokenSymbol={builderTokenSymbol}
        builderSubproxyAccount={builderSubproxyAccount}
      />
    </Box>
  );
};
