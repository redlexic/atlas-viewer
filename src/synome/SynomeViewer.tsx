/**
 * Synome Viewer Component
 *
 * Practical dashboard views for Atlas agent artifacts.
 */

import { useState, useCallback, useMemo } from 'react';
import {
  Container,
  Title,
  Paper,
  Group,
  Stack,
  Text,
  Badge,
  Card,
  Table,
  ScrollArea,
  Divider,
  ActionIcon,
  Tooltip,
  Tabs,
  Code,
  Accordion,
  Box,
  CopyButton,
} from '@mantine/core';
import {
  IconDownload,
  IconCopy,
  IconCheck,
  IconCircleCheck,
  IconCircleDashed,
  IconCircleX,
  IconBox,
  IconList,
} from '@tabler/icons-react';

import type { AtlasNode } from '../types';
import { buildGraphFromAtlas, exportGraph, getGraphStats } from './graphLoader';
import type { SynomeNodeAttributes } from './types';
import { PRIMITIVE_CATEGORIES } from './types';

// =============================================================================
// Types
// =============================================================================

interface PrimitiveData {
  uuid: string;
  doc_no: string;
  name: string;
  shortName: string;
  status: 'Active' | 'Completed' | 'Inactive' | 'Unknown';
  category: string;
  hubDoc?: string;
  activeInstanceCount: number;
  completedInstanceCount: number;
  instances: InstanceData[];
}

interface InstanceData {
  uuid: string;
  doc_no: string;
  name: string;
  status: string;
  addresses: string[];
  content: string;
  parameters: Record<string, string>;
}

// =============================================================================
// Data Extraction Functions
// =============================================================================

function extractPrimitives(graph: ReturnType<typeof buildGraphFromAtlas>): PrimitiveData[] {
  const primitives: PrimitiveData[] = [];
  const processedPrimitives = new Set<string>();

  graph.forEachNode((nodeId, attrs) => {
    // Find primitive nodes (contain "Primitive" in name, not "Hub")
    if (
      attrs.name.toLowerCase().includes('primitive') &&
      !attrs.name.toLowerCase().includes('hub') &&
      !attrs.name.toLowerCase().includes('primitives') // Skip category headers like "Genesis Primitives"
    ) {
      // Avoid duplicates
      const primitiveKey = attrs.name.replace(/\s+/g, '').toLowerCase();
      if (processedPrimitives.has(primitiveKey)) return;
      processedPrimitives.add(primitiveKey);

      // Determine category
      let category = 'Other';
      for (const [cat, names] of Object.entries(PRIMITIVE_CATEGORIES)) {
        if (names.some((n) => attrs.name.toLowerCase().includes(n.toLowerCase()))) {
          category = cat.charAt(0).toUpperCase() + cat.slice(1);
          break;
        }
      }

      // Find status from child nodes
      let status: PrimitiveData['status'] = 'Unknown';
      let activeInstanceCount = 0;
      let completedInstanceCount = 0;
      const instances: InstanceData[] = [];

      // Look at neighbors (children)
      graph.forEachNeighbor(nodeId, (neighborId) => {
        const neighborAttrs = graph.getNodeAttributes(neighborId);

        // Check for status node
        if (neighborAttrs.name.toLowerCase().includes('global activation status')) {
          if (neighborAttrs.content.includes('Active')) status = 'Active';
          else if (neighborAttrs.content.includes('Completed')) status = 'Completed';
          else if (neighborAttrs.content.includes('Inactive')) status = 'Inactive';
        }

        // Check for instance directories
        if (neighborAttrs.name.toLowerCase().includes('active instances')) {
          // Count children of active instances
          graph.forEachNeighbor(neighborId, (instanceId) => {
            const instanceAttrs = graph.getNodeAttributes(instanceId);
            if (instanceAttrs.depth > neighborAttrs.depth) {
              activeInstanceCount++;
              instances.push(extractInstanceData(instanceAttrs));
            }
          });
        }

        if (neighborAttrs.name.toLowerCase().includes('completed instances')) {
          graph.forEachNeighbor(neighborId, (instanceId) => {
            const instanceAttrs = graph.getNodeAttributes(instanceId);
            if (instanceAttrs.depth > neighborAttrs.depth) {
              completedInstanceCount++;
            }
          });
        }
      });

      primitives.push({
        uuid: attrs.uuid,
        doc_no: attrs.doc_no,
        name: attrs.name,
        shortName: attrs.name.replace(' Primitive', '').replace('Skybase\'s Instance of the ', '').replace('Skybase\'s Instances of the ', ''),
        status,
        category,
        activeInstanceCount,
        completedInstanceCount,
        instances,
      });
    }
  });

  // Sort by category then name
  primitives.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });

  return primitives;
}

function extractInstanceData(attrs: SynomeNodeAttributes): InstanceData {
  // Extract parameters from content (look for bullet points or key: value patterns)
  const parameters: Record<string, string> = {};
  const lines = attrs.content.split('\n');
  for (const line of lines) {
    const match = line.match(/[•◦-]\s*(.+?):\s*(.+)/);
    if (match) {
      parameters[match[1].trim()] = match[2].trim();
    }
  }

  return {
    uuid: attrs.uuid,
    doc_no: attrs.doc_no,
    name: attrs.name,
    status: attrs.status || 'Unknown',
    addresses: attrs.addresses || [],
    content: attrs.content,
    parameters,
  };
}

function extractAllInstances(graph: ReturnType<typeof buildGraphFromAtlas>): InstanceData[] {
  const instances: InstanceData[] = [];

  graph.forEachNode((_, attrs) => {
    // Find instance configuration documents or active instance nodes
    if (
      attrs.name.toLowerCase().includes('instance configuration') ||
      (attrs.nodeType === 'Instance' && attrs.name.toLowerCase().includes('instance'))
    ) {
      instances.push(extractInstanceData(attrs));
    }
  });

  // Sort by doc_no
  instances.sort((a, b) => a.doc_no.localeCompare(b.doc_no, undefined, { numeric: true }));

  return instances;
}

function extractAllAddresses(graph: ReturnType<typeof buildGraphFromAtlas>): Array<{
  address: string;
  context: string;
  doc_no: string;
  uuid: string;
}> {
  const addresses: Array<{
    address: string;
    context: string;
    doc_no: string;
    uuid: string;
  }> = [];

  graph.forEachNode((_, attrs) => {
    if (attrs.addresses && attrs.addresses.length > 0) {
      for (const addr of attrs.addresses) {
        addresses.push({
          address: addr,
          context: attrs.name,
          doc_no: attrs.doc_no,
          uuid: attrs.uuid,
        });
      }
    }
  });

  // Dedupe by address, keeping first occurrence
  const seen = new Set<string>();
  return addresses.filter((a) => {
    if (seen.has(a.address)) return false;
    seen.add(a.address);
    return true;
  });
}

// =============================================================================
// Status Badge Component
// =============================================================================

function StatusBadge({ status }: { status: string }) {
  const color =
    status === 'Active' ? 'green' :
    status === 'Completed' ? 'blue' :
    status === 'Inactive' ? 'gray' :
    'yellow';

  const Icon =
    status === 'Active' ? IconCircleCheck :
    status === 'Completed' ? IconCircleCheck :
    status === 'Inactive' ? IconCircleX :
    IconCircleDashed;

  return (
    <Badge color={color} leftSection={<Icon size={12} />} variant="light">
      {status}
    </Badge>
  );
}

// =============================================================================
// Primitive Status Dashboard
// =============================================================================

interface PrimitiveDashboardProps {
  primitives: PrimitiveData[];
  onSelectPrimitive: (primitive: PrimitiveData) => void;
}

function PrimitiveDashboard({ primitives, onSelectPrimitive }: PrimitiveDashboardProps) {
  // Group by category
  const byCategory = useMemo(() => {
    const groups: Record<string, PrimitiveData[]> = {};
    for (const p of primitives) {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    }
    return groups;
  }, [primitives]);

  // Stats
  const stats = useMemo(() => {
    let active = 0, completed = 0, inactive = 0, unknown = 0;
    for (const p of primitives) {
      if (p.status === 'Active') active++;
      else if (p.status === 'Completed') completed++;
      else if (p.status === 'Inactive') inactive++;
      else unknown++;
    }
    return { active, completed, inactive, unknown, total: primitives.length };
  }, [primitives]);

  return (
    <Stack gap="md">
      {/* Summary Cards */}
      <Group gap="md">
        <Card shadow="sm" p="md" radius="md" withBorder style={{ flex: 1 }}>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Total Primitives</Text>
          <Text size="xl" fw={700}>{stats.total}</Text>
        </Card>
        <Card shadow="sm" p="md" radius="md" withBorder style={{ flex: 1 }}>
          <Text size="xs" c="green" tt="uppercase" fw={600}>Active</Text>
          <Text size="xl" fw={700} c="green">{stats.active}</Text>
        </Card>
        <Card shadow="sm" p="md" radius="md" withBorder style={{ flex: 1 }}>
          <Text size="xs" c="blue" tt="uppercase" fw={600}>Completed</Text>
          <Text size="xl" fw={700} c="blue">{stats.completed}</Text>
        </Card>
        <Card shadow="sm" p="md" radius="md" withBorder style={{ flex: 1 }}>
          <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Inactive</Text>
          <Text size="xl" fw={700} c="dimmed">{stats.inactive}</Text>
        </Card>
      </Group>

      {/* Primitives by Category */}
      <Accordion multiple defaultValue={Object.keys(byCategory)}>
        {Object.entries(byCategory).map(([category, prims]) => (
          <Accordion.Item key={category} value={category}>
            <Accordion.Control>
              <Group justify="space-between">
                <Text fw={600}>{category} Primitives</Text>
                <Badge variant="light">{prims.length}</Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Primitive</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Active Instances</Table.Th>
                    <Table.Th>Completed</Table.Th>
                    <Table.Th>Doc No</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {prims.map((p) => (
                    <Table.Tr
                      key={p.uuid}
                      style={{ cursor: 'pointer' }}
                      onClick={() => onSelectPrimitive(p)}
                    >
                      <Table.Td>
                        <Text size="sm" fw={500}>{p.shortName}</Text>
                      </Table.Td>
                      <Table.Td>
                        <StatusBadge status={p.status} />
                      </Table.Td>
                      <Table.Td>
                        {p.activeInstanceCount > 0 ? (
                          <Badge color="green" variant="filled">{p.activeInstanceCount}</Badge>
                        ) : (
                          <Text size="sm" c="dimmed">-</Text>
                        )}
                      </Table.Td>
                      <Table.Td>
                        {p.completedInstanceCount > 0 ? (
                          <Badge color="blue" variant="light">{p.completedInstanceCount}</Badge>
                        ) : (
                          <Text size="sm" c="dimmed">-</Text>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Code fz="xs">{p.doc_no}</Code>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  );
}

// =============================================================================
// Instance Inventory
// =============================================================================

interface InstanceInventoryProps {
  instances: InstanceData[];
  addresses: Array<{ address: string; context: string; doc_no: string; uuid: string }>;
}

function InstanceInventory({ instances, addresses }: InstanceInventoryProps) {
  const [selectedInstance, setSelectedInstance] = useState<InstanceData | null>(null);

  return (
    <Stack gap="md">
      {/* Top row: Instance List and Detail */}
      <Group align="flex-start" gap="md" grow>
        {/* Instance List */}
        <Paper shadow="sm" p="md" radius="md" withBorder style={{ minWidth: 400 }}>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={600}>Instances ({instances.length})</Text>
            </Group>
            <Divider />
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Addresses</Table.Th>
                  <Table.Th>Doc No</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {instances.map((inst) => (
                  <Table.Tr
                    key={inst.uuid}
                    style={{ cursor: 'pointer', background: selectedInstance?.uuid === inst.uuid ? 'var(--mantine-color-dark-5)' : undefined }}
                    onClick={() => setSelectedInstance(inst)}
                  >
                    <Table.Td>
                      <Text size="sm" lineClamp={1}>{inst.name}</Text>
                    </Table.Td>
                    <Table.Td>
                      {inst.addresses.length > 0 ? (
                        <Badge size="sm" variant="light">{inst.addresses.length}</Badge>
                      ) : (
                        <Text size="xs" c="dimmed">-</Text>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Code fz="xs">{inst.doc_no}</Code>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
        </Stack>
      </Paper>

        {/* Instance Detail */}
        <Paper shadow="sm" p="md" radius="md" withBorder style={{ minWidth: 350 }}>
          {selectedInstance ? (
            <Stack gap="sm">
              <Text fw={600} size="sm">{selectedInstance.name}</Text>
              <Code fz="xs">{selectedInstance.doc_no}</Code>
              <Divider />

              {selectedInstance.addresses.length > 0 && (
                <>
                  <Text size="xs" fw={600} c="dimmed">ADDRESSES</Text>
                  {selectedInstance.addresses.map((addr) => (
                    <Group key={addr} gap="xs">
                      <Code fz="xs" style={{ flex: 1 }}>{addr}</Code>
                      <CopyButton value={addr}>
                        {({ copied, copy }) => (
                          <ActionIcon size="xs" variant="subtle" onClick={copy}>
                            {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                          </ActionIcon>
                        )}
                      </CopyButton>
                    </Group>
                  ))}
                  <Divider />
                </>
              )}

              {Object.keys(selectedInstance.parameters).length > 0 && (
                <>
                  <Text size="xs" fw={600} c="dimmed">PARAMETERS</Text>
                  {Object.entries(selectedInstance.parameters).map(([key, value]) => (
                    <Group key={key} justify="space-between">
                      <Text size="xs" c="dimmed">{key}</Text>
                      <Text size="xs" ff="monospace">{value}</Text>
                    </Group>
                  ))}
                  <Divider />
                </>
              )}

              <Text size="xs" fw={600} c="dimmed">CONTENT</Text>
              <ScrollArea h={150}>
                <Text size="xs" style={{ whiteSpace: 'pre-wrap' }}>
                  {selectedInstance.content || 'No content'}
                </Text>
              </ScrollArea>
            </Stack>
          ) : (
            <Text size="sm" c="dimmed" ta="center" py="xl">
              Select an instance to view details
            </Text>
          )}
        </Paper>
      </Group>

      {/* Address Registry - separate row */}
      <Paper shadow="sm" p="md" radius="md" withBorder>
        <Stack gap="sm">
          <Text fw={600}>Address Registry ({addresses.length})</Text>
          <Divider />
          <Group gap="xs" wrap="wrap">
            {addresses.map((a) => (
              <Box key={a.address} p="xs" style={{ borderRadius: 4, background: 'var(--mantine-color-dark-6)' }}>
                <Group gap="xs">
                  <Code fz="xs">{a.address.slice(0, 10)}...{a.address.slice(-8)}</Code>
                  <CopyButton value={a.address}>
                    {({ copied, copy }) => (
                      <ActionIcon size="xs" variant="subtle" onClick={copy}>
                        {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                      </ActionIcon>
                    )}
                  </CopyButton>
                </Group>
                <Text size="xs" c="dimmed" lineClamp={1}>{a.context}</Text>
              </Box>
            ))}
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}

// =============================================================================
// Main Component
// =============================================================================

interface SynomeViewerProps {
  agentNode: AtlasNode;
  atlasVersion?: string;
}

export function SynomeViewer({ agentNode, atlasVersion = 'unknown' }: SynomeViewerProps) {
  const [, setSelectedPrimitive] = useState<PrimitiveData | null>(null);

  // Build graph from Atlas node
  const graph = useMemo(() => {
    return buildGraphFromAtlas(agentNode, atlasVersion);
  }, [agentNode, atlasVersion]);

  // Extract data
  const stats = useMemo(() => getGraphStats(graph), [graph]);
  const primitives = useMemo(() => extractPrimitives(graph), [graph]);
  const instances = useMemo(() => extractAllInstances(graph), [graph]);
  const addresses = useMemo(() => extractAllAddresses(graph), [graph]);

  // Export graph
  const handleExport = useCallback(() => {
    const exported = exportGraph(graph, atlasVersion);
    const blob = new Blob([JSON.stringify(exported, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synome-${agentNode.name.toLowerCase()}-${atlasVersion}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [graph, atlasVersion, agentNode.name]);

  return (
    <Container size="xl" py="md">
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between">
          <Group>
            <Title order={2}>{agentNode.name}</Title>
            <Badge size="lg" variant="light">{agentNode.doc_no}</Badge>
            <Badge size="lg" variant="outline" color="gray">{stats.nodeCount} nodes</Badge>
          </Group>
          <Group>
            <Tooltip label="Export Graph JSON">
              <ActionIcon variant="light" onClick={handleExport}>
                <IconDownload size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* Tabs */}
        <Tabs defaultValue="primitives">
          <Tabs.List>
            <Tabs.Tab value="primitives" leftSection={<IconBox size={16} />}>
              Primitive Status
            </Tabs.Tab>
            <Tabs.Tab value="instances" leftSection={<IconList size={16} />}>
              Instance Inventory
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="primitives" pt="md">
            <PrimitiveDashboard
              primitives={primitives}
              onSelectPrimitive={setSelectedPrimitive}
            />
          </Tabs.Panel>

          <Tabs.Panel value="instances" pt="md">
            <InstanceInventory instances={instances} addresses={addresses} />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

export default SynomeViewer;
