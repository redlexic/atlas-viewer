import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Title,
  Text,
  Loader,
  Center,
  Box,
  Group,
  Button,
  Checkbox,
  Paper,
  Badge,
  Stack,
  ScrollArea,
  TextInput,
  Menu,
  Modal,
  ActionIcon,
  Tabs,
} from '@mantine/core';
import {
  IconFolder,
  IconFolderOpen,
  IconTrash,
  IconCopy,
  IconDownload,
  IconCheck,
  IconSearch,
  IconDeviceFloppy,
  IconHistory,
  IconChevronDown,
  IconList,
  IconPlus,
} from '@tabler/icons-react';
import { TreeNode } from '../TreeNode';
import type { AtlasNode } from '../types';
import {
  getChildren,
  getAllDescendantUUIDs,
  findNodeByUUID,
  findNodeByDocNo,
  flattenTree,
  findNextSibling,
  getAncestors,
  buildSelectedTree,
} from '../utils/treeUtils';
import { loadAtlasData } from '../utils/dataLoader';
import {
  generateNotionMarkdown,
  generateNotionImportMarkdown,
  copyToClipboard,
  downloadAsFile,
} from '../utils/exportUtils';
import { ColoredDocNo, getNodeColor } from '../utils/colorUtils';

interface SavedSelectionSet {
  id: string;
  name: string;
  chosenNodes: string[];
  selectParents: boolean;
  savedAt: string;
}

export function AtlasViewerPage() {
  const [atlasData, setAtlasData] = useState<AtlasNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Cherry picker state
  const [chosenNodes, setChosenNodes] = useState<Set<string>>(new Set());
  const [selectParents, setSelectParents] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  // Jump to section state
  const [jumpToDocNo, setJumpToDocNo] = useState('');

  // Saved selection sets
  const [savedSets, setSavedSets] = useState<SavedSelectionSet[]>([]);
  const [activeSetId, setActiveSetId] = useState<string | null>(null);
  const [activeSetOriginal, setActiveSetOriginal] = useState<{ chosenNodes: string[]; selectParents: boolean } | null>(null);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [newSetName, setNewSetName] = useState('');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState('');
  const [searchResults, setSearchResults] = useState<AtlasNode[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>('selection');

  // Load cherry picker state and saved sets from localStorage on mount
  useEffect(() => {
    try {
      // Load current working state
      const savedState = localStorage.getItem('cherryPickerState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.chosenNodes) {
          setChosenNodes(new Set(parsed.chosenNodes));
        }
        if (parsed.selectParents !== undefined) {
          setSelectParents(parsed.selectParents);
        }
        if (parsed.activeSetId) {
          setActiveSetId(parsed.activeSetId);
        }
        if (parsed.activeSetOriginal) {
          setActiveSetOriginal(parsed.activeSetOriginal);
        }
      }
      // Load saved selection sets
      const savedSetsData = localStorage.getItem('cherryPickerSavedSets');
      if (savedSetsData) {
        setSavedSets(JSON.parse(savedSetsData));
      }
    } catch (e) {
      console.error('Failed to load cherry picker state:', e);
    }
  }, []);

  // Save cherry picker state to localStorage when it changes
  useEffect(() => {
    try {
      const state = {
        chosenNodes: Array.from(chosenNodes),
        selectParents,
        activeSetId,
        activeSetOriginal,
      };
      localStorage.setItem('cherryPickerState', JSON.stringify(state));

      // Auto-update active set if one is loaded
      if (activeSetId && chosenNodes.size > 0) {
        setSavedSets((prev) => {
          const updated = prev.map((set) =>
            set.id === activeSetId
              ? { ...set, chosenNodes: Array.from(chosenNodes), selectParents, savedAt: new Date().toISOString() }
              : set
          );
          localStorage.setItem('cherryPickerSavedSets', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (e) {
      console.error('Failed to save cherry picker state:', e);
    }
  }, [chosenNodes, selectParents, activeSetId, activeSetOriginal]);

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

  // Cherry picker handlers
  const handleChoose = (uuid: string) => {
    setChosenNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(uuid)) {
        // Remove the node (but keep ancestors if they were added for other nodes)
        newSet.delete(uuid);
      } else {
        // Add the node
        newSet.add(uuid);
        // Optionally add all ancestors
        if (selectParents) {
          const ancestors = getAncestors(atlasData, uuid);
          ancestors.forEach((ancestorUuid) => newSet.add(ancestorUuid));
        }
      }
      return newSet;
    });
  };

  const clearChosenNodes = () => {
    setChosenNodes(new Set());
    setActiveSetId(null);
    setActiveSetOriginal(null);
    localStorage.removeItem('cherryPickerState');
  };

  // Save current selection as a new named set
  const handleSaveNewSet = () => {
    if (!newSetName.trim() || chosenNodes.size === 0) return;

    const newSet: SavedSelectionSet = {
      id: Date.now().toString(),
      name: newSetName.trim(),
      chosenNodes: Array.from(chosenNodes),
      selectParents,
      savedAt: new Date().toISOString(),
    };

    const updated = [...savedSets, newSet];
    setSavedSets(updated);
    localStorage.setItem('cherryPickerSavedSets', JSON.stringify(updated));

    // Make this the active set
    setActiveSetId(newSet.id);
    setActiveSetOriginal({ chosenNodes: Array.from(chosenNodes), selectParents });

    setNewSetName('');
    setSaveModalOpen(false);
  };

  // Load a saved set
  const handleLoadSet = (set: SavedSelectionSet) => {
    setChosenNodes(new Set(set.chosenNodes));
    setSelectParents(set.selectParents);
    setActiveSetId(set.id);
    setActiveSetOriginal({ chosenNodes: [...set.chosenNodes], selectParents: set.selectParents });
  };

  // Revert to original state when set was loaded
  const handleRevertSet = () => {
    if (activeSetOriginal) {
      setChosenNodes(new Set(activeSetOriginal.chosenNodes));
      setSelectParents(activeSetOriginal.selectParents);
    }
  };

  // Delete a saved set
  const handleDeleteSet = (setId: string) => {
    const updated = savedSets.filter((s) => s.id !== setId);
    setSavedSets(updated);
    localStorage.setItem('cherryPickerSavedSets', JSON.stringify(updated));

    if (activeSetId === setId) {
      setActiveSetId(null);
      setActiveSetOriginal(null);
    }
  };

  // Check if current state differs from original loaded state
  const hasChangesFromOriginal = activeSetOriginal
    ? JSON.stringify(Array.from(chosenNodes).sort()) !== JSON.stringify([...activeSetOriginal.chosenNodes].sort()) ||
      selectParents !== activeSetOriginal.selectParents
    : false;

  // Get active set name
  const activeSetName = activeSetId ? savedSets.find((s) => s.id === activeSetId)?.name : null;

  // Search function - searches through all nodes
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const scopePrefix = searchScope.trim().toUpperCase();
    const results: AtlasNode[] = [];

    // Check if a node is within the scope
    const isInScope = (docNo: string): boolean => {
      if (!scopePrefix) return true;
      // Match exact section or children (e.g., "A.6.1.1.3" matches "A.6.1.1.3" and "A.6.1.1.3.1")
      return docNo.toUpperCase() === scopePrefix || docNo.toUpperCase().startsWith(scopePrefix + '.');
    };

    const searchNode = (node: AtlasNode) => {
      // Check scope first
      if (!isInScope(node.doc_no)) {
        // Still recurse into children in case they match the scope
        const children = getChildren(node);
        children.forEach(searchNode);
        return;
      }

      const matchesName = node.name.toLowerCase().includes(query);
      const matchesDocNo = node.doc_no.toLowerCase().includes(query);
      const matchesContent = node.content?.toLowerCase().includes(query);
      const matchesType = node.type.toLowerCase().includes(query);

      if (matchesName || matchesDocNo || matchesContent || matchesType) {
        results.push(node);
      }

      const children = getChildren(node);
      children.forEach(searchNode);
    };

    atlasData.forEach(searchNode);

    // Sort by doc_no
    results.sort((a, b) => a.doc_no.localeCompare(b.doc_no, undefined, { numeric: true }));

    setSearchResults(results);
    setActiveTab('search');
  }, [searchQuery, searchScope, atlasData]);

  // Navigate to a search result
  const handleNavigateToNode = (node: AtlasNode) => {
    // Expand ancestors and select the node
    const ancestors = getAncestors(atlasData, node.uuid);
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      ancestors.forEach((uuid) => newSet.add(uuid));
      return newSet;
    });
    setSelectedNodeId(node.uuid);
  };

  // Jump to section by doc_no
  const handleJumpToSection = () => {
    const trimmed = jumpToDocNo.trim();
    if (!trimmed) return;

    const node = findNodeByDocNo(atlasData, trimmed);
    if (node) {
      // Get ancestors and expand them all
      const ancestors = getAncestors(atlasData, node.uuid);
      setExpandedNodes((prev) => {
        const newSet = new Set(prev);
        ancestors.forEach((uuid) => newSet.add(uuid));
        return newSet;
      });
      // Select the node (triggers scroll via useEffect in TreeNode)
      setSelectedNodeId(node.uuid);
      setJumpToDocNo('');
    }
  };

  const handleCopyToClipboard = async () => {
    const markdown = generateNotionMarkdown(atlasData, chosenNodes);
    const success = await copyToClipboard(markdown);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownload = () => {
    // Use toggle format for file import into Notion
    const markdown = generateNotionImportMarkdown(atlasData, chosenNodes);
    downloadAsFile(markdown, 'atlas-selection.md');
  };

  // Get selected nodes in sorted order for display
  const selectedNodesList = buildSelectedTree(atlasData, chosenNodes);

  // Calculate depth from doc_no (count dots)
  const getNodeDepth = (docNo: string): number => {
    return (docNo.match(/\./g) || []).length;
  };

  // Find minimum depth to use as base for indentation
  const minDepth = selectedNodesList.length > 0
    ? Math.min(...selectedNodesList.map((n) => getNodeDepth(n.doc_no)))
    : 0;

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
            <TextInput
              placeholder="Jump to section (e.g. A.6.1.1.1.2.6)"
              value={jumpToDocNo}
              onChange={(e) => setJumpToDocNo(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleJumpToSection();
                }
              }}
              rightSection={
                <IconSearch
                  size={16}
                  style={{ cursor: 'pointer' }}
                  onClick={handleJumpToSection}
                />
              }
              style={{ width: 280 }}
              size="sm"
            />
            <Button leftSection={<IconFolderOpen size={16} />} onClick={expandAllScopes} variant="light">
              Expand All
            </Button>
            <Button leftSection={<IconFolder size={16} />} onClick={collapseAll} variant="light" color="gray">
              Collapse All
            </Button>
          </Group>
        </Group>
      </Box>

      <Group align="flex-start" gap="md" wrap="nowrap" style={{ minHeight: '70vh' }}>
        {/* Tree Browser Column */}
        <Box style={{ flex: 1, minWidth: 0 }}>
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
              chosenNodes={chosenNodes}
              onChoose={handleChoose}
            />
          ))}
        </Box>

        {/* Cherry Picker Column */}
        <Paper
          withBorder
          p="md"
          style={{
            width: 400,
            minWidth: 400,
            position: 'sticky',
            top: 16,
            maxHeight: 'calc(100vh - 150px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Group justify="apart" mb="xs">
            <Box>
              <Title order={4}>Cherry Picker</Title>
              {activeSetName && (
                <Text size="xs" c="dimmed">
                  Editing: <Text span fw={600} c="green">{activeSetName}</Text>
                  {hasChangesFromOriginal && <Text span c="yellow"> (modified)</Text>}
                </Text>
              )}
            </Box>
            <Badge size="lg" color="green" variant="light">
              {chosenNodes.size} selected
            </Badge>
          </Group>

          {/* Save/Load Controls */}
          <Group mb="md" gap="xs">
            <Button
              leftSection={<IconDeviceFloppy size={14} />}
              onClick={() => setSaveModalOpen(true)}
              variant="light"
              color="blue"
              size="xs"
              disabled={chosenNodes.size === 0}
            >
              Save As
            </Button>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button
                  rightSection={<IconChevronDown size={14} />}
                  variant="light"
                  size="xs"
                  disabled={savedSets.length === 0}
                >
                  Load ({savedSets.length})
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {savedSets.map((set) => (
                  <Menu.Item
                    key={set.id}
                    onClick={() => handleLoadSet(set)}
                    rightSection={
                      <ActionIcon
                        size="xs"
                        color="red"
                        variant="subtle"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSet(set.id);
                        }}
                      >
                        <IconTrash size={12} />
                      </ActionIcon>
                    }
                  >
                    <Text size="sm" fw={set.id === activeSetId ? 700 : 400}>
                      {set.name}
                    </Text>
                    <Text size="xs" c="dimmed">{set.chosenNodes.length} items</Text>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
            {hasChangesFromOriginal && (
              <Button
                leftSection={<IconHistory size={14} />}
                onClick={handleRevertSet}
                variant="light"
                color="orange"
                size="xs"
              >
                Revert
              </Button>
            )}
          </Group>

          <Group mb="md" gap="xs">
            <Checkbox
              label="Select parents"
              checked={selectParents}
              onChange={(e) => setSelectParents(e.currentTarget.checked)}
              size="sm"
            />
          </Group>

          <Group mb="md" gap="xs">
            <Button
              leftSection={copySuccess ? <IconCheck size={16} /> : <IconCopy size={16} />}
              onClick={handleCopyToClipboard}
              variant="light"
              color={copySuccess ? 'teal' : 'blue'}
              size="xs"
              disabled={chosenNodes.size === 0}
              title="Copy as bullets for pasting"
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              leftSection={<IconDownload size={16} />}
              onClick={handleDownload}
              variant="filled"
              color="green"
              size="xs"
              disabled={chosenNodes.size === 0}
              title="Download for Notion Import (creates toggles)"
            >
              Notion Import
            </Button>
            <Button
              leftSection={<IconTrash size={16} />}
              onClick={clearChosenNodes}
              variant="light"
              color="red"
              size="xs"
              disabled={chosenNodes.size === 0}
            >
              Clear
            </Button>
          </Group>

          <Tabs value={activeTab} onChange={setActiveTab} style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Tabs.List>
              <Tabs.Tab value="selection" leftSection={<IconList size={14} />}>
                Selection ({chosenNodes.size})
              </Tabs.Tab>
              <Tabs.Tab value="search" leftSection={<IconSearch size={14} />}>
                Search {searchResults.length > 0 && `(${searchResults.length})`}
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="selection" style={{ flex: 1, minHeight: 0, overflow: 'hidden' }} pt="xs">
              <ScrollArea.Autosize mah="calc(100vh - 520px)" offsetScrollbars>
                <Stack gap="xs">
                  {selectedNodesList.length === 0 ? (
                    <Text size="sm" c="dimmed" ta="center" py="xl">
                      Click the checkboxes on nodes to add them to your selection
                    </Text>
                  ) : (
                    selectedNodesList.map((node) => {
                      const depth = getNodeDepth(node.doc_no) - minDepth;
                      return (
                        <Paper
                          key={node.uuid}
                          p="xs"
                          withBorder
                          style={{
                            borderLeft: `3px solid var(--mantine-color-${getNodeColor(node.type)}-6)`,
                            cursor: 'pointer',
                            marginLeft: depth * 12,
                          }}
                          onClick={() => handleChoose(node.uuid)}
                        >
                          <Group justify="apart" wrap="nowrap">
                            <Box style={{ flex: 1, minWidth: 0 }}>
                              <Group gap="xs" wrap="nowrap">
                                <Text size="xs" fw={600} style={{ whiteSpace: 'nowrap' }}>
                                  <ColoredDocNo docNo={node.doc_no} />
                                </Text>
                                <Badge size="xs" color={getNodeColor(node.type)} variant="light">
                                  {node.type}
                                </Badge>
                              </Group>
                              <Text size="xs" lineClamp={1} mt={2}>
                                {node.name}
                              </Text>
                            </Box>
                            <IconTrash size={14} style={{ color: 'var(--mantine-color-red-6)', flexShrink: 0 }} />
                          </Group>
                        </Paper>
                      );
                    })
                  )}
                </Stack>
              </ScrollArea.Autosize>
            </Tabs.Panel>

            <Tabs.Panel value="search" style={{ flex: 1, minHeight: 0, overflow: 'hidden' }} pt="xs">
              <Group gap="xs" mb="xs" align="flex-end">
                <TextInput
                  placeholder="Search keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  rightSection={
                    <IconSearch
                      size={16}
                      style={{ cursor: 'pointer' }}
                      onClick={handleSearch}
                    />
                  }
                  size="xs"
                  style={{ flex: 1 }}
                />
                <TextInput
                  placeholder="Scope (e.g. A.6.1.1.3)"
                  value={searchScope}
                  onChange={(e) => setSearchScope(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  size="xs"
                  style={{ width: 130 }}
                />
              </Group>
              <ScrollArea.Autosize mah="calc(100vh - 560px)" offsetScrollbars>
                <Stack gap="xs">
                  {searchResults.length === 0 ? (
                    <Text size="sm" c="dimmed" ta="center" py="xl">
                      {searchQuery ? 'No results found' : 'Enter a keyword to search'}
                    </Text>
                  ) : (
                    searchResults.map((node) => (
                      <Paper
                        key={node.uuid}
                        p="xs"
                        withBorder
                        style={{
                          borderLeft: `3px solid var(--mantine-color-${getNodeColor(node.type)}-6)`,
                          cursor: 'pointer',
                        }}
                        onClick={() => handleNavigateToNode(node)}
                      >
                        <Group justify="apart" wrap="nowrap">
                          <Box style={{ flex: 1, minWidth: 0 }}>
                            <Group gap="xs" wrap="nowrap">
                              <Text size="xs" fw={600} style={{ whiteSpace: 'nowrap' }}>
                                <ColoredDocNo docNo={node.doc_no} />
                              </Text>
                              <Badge size="xs" color={getNodeColor(node.type)} variant="light">
                                {node.type}
                              </Badge>
                            </Group>
                            <Text size="xs" lineClamp={1} mt={2}>
                              {node.name}
                            </Text>
                          </Box>
                          <ActionIcon
                            size="xs"
                            color="green"
                            variant="subtle"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChoose(node.uuid);
                            }}
                            title="Add to selection"
                          >
                            <IconPlus size={14} />
                          </ActionIcon>
                        </Group>
                      </Paper>
                    ))
                  )}
                </Stack>
              </ScrollArea.Autosize>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Group>

      {/* Save Set Modal */}
      <Modal
        opened={saveModalOpen}
        onClose={() => {
          setSaveModalOpen(false);
          setNewSetName('');
        }}
        title="Save Selection Set"
        size="sm"
      >
        <TextInput
          label="Set Name"
          placeholder="Enter a name for this selection"
          value={newSetName}
          onChange={(e) => setNewSetName(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveNewSet();
            }
          }}
          mb="md"
        />
        <Group justify="flex-end">
          <Button variant="light" onClick={() => setSaveModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveNewSet}
            disabled={!newSetName.trim()}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            Save
          </Button>
        </Group>
      </Modal>
    </Container>
  );
}
