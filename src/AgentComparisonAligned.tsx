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
  Textarea,
  Modal,
  CopyButton,
  Tooltip,
} from '@mantine/core';
import {
  IconChevronRight,
  IconChevronDown,
  IconFolderOpen,
  IconFolder,
  IconEdit,
  IconCheck,
  IconX,
  IconCode,
  IconCopy,
} from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import type { AtlasNode } from './types';
import { getChildren, countAllChildren } from './utils/treeUtils';
import { ColoredDocNo } from './utils/colorUtils';
import { substituteVariablesWithHighlight, stripHtml } from './utils/substitutionUtils';

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
  customEdits: Record<string, { name?: string; content?: string }>;
  onCustomEditsChange: (edits: Record<string, { name?: string; content?: string }>) => void;
}

// Collect all UUIDs from a node and its descendants
const collectNodeUuids = (node: AtlasNode): Set<string> => {
  const uuids = new Set<string>();
  const collect = (n: AtlasNode) => {
    uuids.add(n.uuid);
    getChildren(n).forEach(collect);
  };
  collect(node);
  return uuids;
};

interface UnifiedSection {
  name: string;
  nodes: (AtlasNode | null)[];
}

// Extract the suffix of doc_no after the agent number (A.6.1.1.N)
const getDocNoSuffix = (docNo: string): string => {
  const match = docNo.match(/^A\.6\.1\.1\.[^.]+(.*)$/);
  return match ? match[1] : docNo;
};

const buildUnifiedStructure = (
  agentNodes: (AtlasNode | null)[]
): UnifiedSection[] => {
  const sectionMap = new Map<string, (AtlasNode | null)[]>();

  agentNodes.forEach((node, agentIndex) => {
    if (!node) return;

    const children = getChildren(node);
    children.forEach((child) => {
      const key = getDocNoSuffix(child.doc_no);

      if (!sectionMap.has(key)) {
        sectionMap.set(key, Array(agentNodes.length).fill(null));
      }

      const nodes = sectionMap.get(key)!;
      nodes[agentIndex] = child;
    });
  });

  const sections = Array.from(sectionMap.entries()).map(([suffix, nodes]) => ({
    name: suffix,
    nodes,
  }));

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
    onExpandDescendants,
    docNoSuffix,
    selectedSections,
    onSectionSelect,
    showBuilder,
    builderAgentName,
    builderTokenSymbol,
    builderSubproxyAccount,
    customEdits,
    onCustomEditsChange,
  }: {
    nodes: (AtlasNode | null)[];
    level: number;
    agentNames: string[];
    expandedNodes: Set<string>;
    onToggle: (uuid: string) => void;
    onExpandDescendants: (node: AtlasNode) => void;
    docNoSuffix: string;
    selectedSections: Record<string, { agentName: string; node: AtlasNode }>;
    onSectionSelect: (
      sections: Record<string, { agentName: string; node: AtlasNode }>
    ) => void;
    showBuilder: boolean;
    builderAgentName: string;
    builderTokenSymbol: string;
    builderSubproxyAccount: string;
    customEdits: Record<string, { name?: string; content?: string }>;
    onCustomEditsChange: (edits: Record<string, { name?: string; content?: string }>) => void;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [markdownViewOpen, setMarkdownViewOpen] = useState(false);
    const [markdownViewContent, setMarkdownViewContent] = useState({ name: '', content: '' });

    const childSections = buildUnifiedStructure(nodes);
    const rowUuid = nodes.find((n) => n !== null)?.uuid || '';
    const hasChildren = childSections.length > 0;
    const isExpanded = expandedNodes.has(rowUuid);
    const totalColumns = 1 + nodes.length + (showBuilder ? 1 : 0);

    return (
      <>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: `28px repeat(${totalColumns - 1}, 1fr)`,
            gap: '8px',
            marginBottom: '8px',
            alignItems: 'start',
          }}
        >
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

          {nodes.map((node, agentIndex) => {
            const agentName = agentNames[agentIndex];
            const isStub =
              node && !node.content && /^Section \d+$/.test(node.name);
            const isSelected =
              selectedSections[docNoSuffix]?.agentName === agentName;

            if (!node || isStub) {
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
                    position: 'relative',
                  }}
                >
                  <Tooltip label="View raw markdown">
                    <ActionIcon
                      size="xs"
                      variant="subtle"
                      color="gray"
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        zIndex: 1,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMarkdownViewContent({
                          name: node.name || '',
                          content: node.content || '',
                        });
                        setMarkdownViewOpen(true);
                      }}
                    >
                      <IconCode size={12} />
                    </ActionIcon>
                  </Tooltip>

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
                      <Tooltip label={`Click to expand all ${childCount} descendants`}>
                        <Badge
                          size="xs"
                          variant="filled"
                          color="gray"
                          style={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onExpandDescendants(node);
                          }}
                        >
                          {childCount}
                        </Badge>
                      </Tooltip>
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
                        component="div"
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

          {showBuilder && (
            <Box style={{ overflow: 'hidden' }}>
              {selectedSections[docNoSuffix] ? (
                <Paper
                  p="xs"
                  mb="xs"
                  withBorder
                  title={isEditing ? '' : 'Click to remove from Builder'}
                  style={{
                    marginLeft: level * 12,
                    borderLeft: '3px solid var(--mantine-color-green-6)',
                    overflow: 'hidden',
                    cursor: isEditing ? 'default' : 'pointer',
                    position: 'relative',
                  }}
                  onClick={
                    isEditing
                      ? undefined
                      : () => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          const { [docNoSuffix]: _, ...newSections } =
                            selectedSections;
                          onSectionSelect(newSections);
                        }
                  }
                >
                  {(() => {
                    const selectedNode = selectedSections[docNoSuffix].node;

                    const countSelectedChildren = (node: AtlasNode): number => {
                      const children = getChildren(node);
                      let count = 0;

                      children.forEach((child) => {
                        const childSuffix = getDocNoSuffix(child.doc_no);
                        if (selectedSections[childSuffix]) {
                          count++;
                          count += countSelectedChildren(child);
                        }
                      });

                      return count;
                    };

                    const builderChildCount =
                      countSelectedChildren(selectedNode);

                    const customEdit = customEdits[docNoSuffix];
                    const substitutedName = substituteVariablesWithHighlight(
                      selectedNode.name,
                      builderAgentName,
                      builderTokenSymbol,
                      builderSubproxyAccount
                    );
                    const substitutedContent = selectedNode.content
                      ? substituteVariablesWithHighlight(
                          selectedNode.content,
                          builderAgentName,
                          builderTokenSymbol,
                          builderSubproxyAccount
                        )
                      : '';

                    const displayName = customEdit?.name !== undefined ? customEdit.name : substitutedName;
                    const displayContent = customEdit?.content !== undefined ? customEdit.content : substitutedContent;

                    return (
                      <>
                        {!isEditing && (
                          <>
                            <ActionIcon
                              size="xs"
                              variant="subtle"
                              color="blue"
                              style={{
                                position: 'absolute',
                                top: 4,
                                right: 24,
                                zIndex: 1,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditedName(customEdit?.name !== undefined ? customEdit.name : stripHtml(substitutedName));
                                setEditedContent(customEdit?.content !== undefined ? customEdit.content : stripHtml(substitutedContent));
                                setIsEditing(true);
                              }}
                              title="Edit this section"
                            >
                              <IconEdit size={12} />
                            </ActionIcon>
                            <ActionIcon
                              size="xs"
                              variant="subtle"
                              color="red"
                              style={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                zIndex: 1,
                                pointerEvents: 'none',
                              }}
                            >
                              <IconX size={12} />
                            </ActionIcon>
                          </>
                        )}

                        {isEditing ? (
                          <Stack gap="xs" onClick={(e) => e.stopPropagation()}>
                            <Group gap="xs" mb={4} wrap="wrap">
                              <Text size="xs" fw={700}>
                                <ColoredDocNo docNo={selectedNode.doc_no} />
                              </Text>
                              <Badge size="xs" variant="light" color="green">
                                {selectedNode.type}
                              </Badge>
                            </Group>
                            <TextInput
                              label="Name"
                              value={editedName}
                              onChange={(e) => setEditedName(e.currentTarget.value)}
                              size="xs"
                            />
                            <Textarea
                              label="Content"
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.currentTarget.value)}
                              minRows={4}
                              maxRows={12}
                              autosize
                              size="xs"
                            />
                            <Group gap="xs">
                              <Button
                                size="xs"
                                color="green"
                                leftSection={<IconCheck size={14} />}
                                onClick={() => {
                                  onCustomEditsChange({
                                    ...customEdits,
                                    [docNoSuffix]: {
                                      name: editedName,
                                      content: editedContent,
                                    },
                                  });
                                  setIsEditing(false);
                                }}
                              >
                                Save
                              </Button>
                              <Button
                                size="xs"
                                variant="light"
                                color="gray"
                                onClick={() => {
                                  setIsEditing(false);
                                }}
                              >
                                Cancel
                              </Button>
                            </Group>
                          </Stack>
                        ) : (
                          <>
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
                              {customEdit && (
                                <Badge size="xs" variant="filled" color="blue">
                                  Edited
                                </Badge>
                              )}
                            </Group>
                            <Text
                              size="xs"
                              fw={500}
                              mb={displayContent ? 4 : 0}
                              style={{ wordBreak: 'break-word' }}
                              dangerouslySetInnerHTML={{ __html: displayName }}
                            />
                            {displayContent && (
                              <Paper
                                p="xs"
                                bg="dark.8"
                                mt="xs"
                                style={{ overflow: 'hidden' }}
                              >
                                <Text
                                  component="div"
                                  size="xs"
                                  style={{
                                    fontSize: '0.7rem',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                  }}
                                >
                                  {customEdit ? (
                                    <ReactMarkdown>{displayContent}</ReactMarkdown>
                                  ) : (
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                      {displayContent}
                                    </ReactMarkdown>
                                  )}
                                </Text>
                              </Paper>
                            )}
                          </>
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

        {!isExpanded && hasChildren && (
          <Box
            style={{
              gridColumn: '1 / -1',
              borderBottom: '1px dotted var(--mantine-color-gray-5)',
              marginTop: '4px',
              marginBottom: '8px',
              opacity: 0.5,
            }}
          />
        )}

        {isExpanded && (
          <>
            {childSections.map((section, index) => (
              <AlignedNodeRow
                key={`${section.name}-${index}`}
                nodes={section.nodes}
                level={level + 1}
                agentNames={agentNames}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
                onExpandDescendants={onExpandDescendants}
                docNoSuffix={section.name}
                selectedSections={selectedSections}
                onSectionSelect={onSectionSelect}
                showBuilder={showBuilder}
                builderAgentName={builderAgentName}
                builderTokenSymbol={builderTokenSymbol}
                builderSubproxyAccount={builderSubproxyAccount}
                customEdits={customEdits}
                onCustomEditsChange={onCustomEditsChange}
              />
            ))}
            {childSections.length > 0 && (
              <Box
                style={{
                  gridColumn: '1 / -1',
                  borderBottom: '2px solid var(--mantine-color-gray-7)',
                  marginTop: '8px',
                  marginBottom: '12px',
                  opacity: 0.4,
                }}
              />
            )}
          </>
        )}

        <Modal
          opened={markdownViewOpen}
          onClose={() => setMarkdownViewOpen(false)}
          title="Raw Markdown"
          size="lg"
        >
          <Stack gap="md">
            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={600}>Name</Text>
                <CopyButton value={markdownViewContent.name}>
                  {({ copied, copy }) => (
                    <Button
                      size="xs"
                      variant="light"
                      leftSection={<IconCopy size={14} />}
                      color={copied ? 'green' : 'blue'}
                      onClick={copy}
                    >
                      {copied ? 'Copied!' : 'Copy Name'}
                    </Button>
                  )}
                </CopyButton>
              </Group>
              <Textarea
                value={markdownViewContent.name}
                readOnly
                autosize
                minRows={1}
                maxRows={3}
                styles={{
                  input: {
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                  },
                }}
              />
            </Box>

            <Box>
              <Group justify="space-between" mb="xs">
                <Text size="sm" fw={600}>Content</Text>
                <CopyButton value={markdownViewContent.content}>
                  {({ copied, copy }) => (
                    <Button
                      size="xs"
                      variant="light"
                      leftSection={<IconCopy size={14} />}
                      color={copied ? 'green' : 'blue'}
                      onClick={copy}
                    >
                      {copied ? 'Copied!' : 'Copy Content'}
                    </Button>
                  )}
                </CopyButton>
              </Group>
              <Textarea
                value={markdownViewContent.content}
                readOnly
                autosize
                minRows={5}
                maxRows={20}
                styles={{
                  input: {
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                  },
                }}
              />
            </Box>
          </Stack>
        </Modal>
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
  customEdits,
  onCustomEditsChange,
}: AgentComparisonAlignedProps) => {
  const agentNames = agents.map((a) => a.name);
  const rootNodes = agents.map((a) => a.node);

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

  const handleExpandDescendants = (node: AtlasNode) => {
    const nodeUuids = collectNodeUuids(node);
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      nodeUuids.forEach((uuid) => newSet.add(uuid));
      return newSet;
    });
  };

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
          {[...Array(1 + agents.length)].map((_, i) => (
            <Box key={i} />
          ))}

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

      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: `28px repeat(${totalColumns}, 1fr)`,
          gap: '8px',
          marginBottom: '8px',
          alignItems: 'start',
        }}
      >
        <Box />

        {agents.map(({ name }) => (
          <Box key={name}>
            <Paper p="xs" withBorder mb="xs" bg="dark.7">
              <Text size="sm" fw={700} ta="center">
                {name}
              </Text>
            </Paper>
          </Box>
        ))}

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

      <AlignedNodeRow
        nodes={rootNodes}
        level={0}
        agentNames={agentNames}
        expandedNodes={expandedNodes}
        onToggle={handleToggle}
        onExpandDescendants={handleExpandDescendants}
        docNoSuffix="ROOT"
        selectedSections={selectedSections}
        onSectionSelect={onSectionSelect}
        showBuilder={showBuilder}
        builderAgentName={builderAgentName}
        builderTokenSymbol={builderTokenSymbol}
        builderSubproxyAccount={builderSubproxyAccount}
        customEdits={customEdits}
        onCustomEditsChange={onCustomEditsChange}
      />
    </Box>
  );
};
