import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Container,
  Title,
  Text,
  Loader,
  Center,
  Box,
  Group,
  Paper,
  Badge,
  ScrollArea,
  Checkbox,
  Stack,
  ActionIcon,
  Tooltip,
  Button,
  TextInput,
  Textarea,
  Modal,
} from '@mantine/core';
import {
  IconPlus,
  IconMinus,
  IconEdit,
  IconExternalLink,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconCheck,
  IconX,
  IconRefresh,
  IconTrash,
  IconSubtask,
} from '@tabler/icons-react';
import {
  loadLatestAtlasData,
  loadChangeset,
  flattenAgentSections,
  getNodeWithAllChildren,
  AGENT_DOC_NUMBERS,
  type ChangesetSection,
} from '../utils/dataLoader';
import { findNodeByDocNo } from '../utils/treeUtils';
import type { AtlasNode } from '../types';
import { computeLineDiff, areContentsDifferent, type DiffLine, type WordSegment } from '../utils/diffUtils';
import { ColoredDocNo, getSegmentColor } from '../utils/colorUtils';
import { SectionPicker } from '../components/SectionPicker';

/**
 * Editable section with tracking
 */
interface EditableSection {
  doc_no: string;
  name: string;
  content: string;
  type?: string;
  source: 'file' | 'atlas';
  isEdited: boolean;
  originalName: string;
  originalContent: string;
}

/**
 * Edit categories for filtering
 */
type EditCategory = 'distribution-rewards' | 'rename-only' | 'other';

/**
 * Get the category for a section based on its doc_no and change type
 */
function getCategory(docNo: string, isRenameOnlyChange: boolean): EditCategory {
  // Distribution Rewards sections are under A.6.1.1.4.2.5
  if (docNo.startsWith('A.6.1.1.4.2.5')) {
    return 'distribution-rewards';
  }
  if (isRenameOnlyChange) {
    return 'rename-only';
  }
  return 'other';
}

const CATEGORY_COLORS: Record<EditCategory, string> = {
  'distribution-rewards': 'violet',
  'rename-only': 'blue',
  'other': 'gray',
};

const CATEGORY_LABELS: Record<EditCategory, string> = {
  'distribution-rewards': 'DIST REWARDS',
  'rename-only': 'RENAME',
  'other': 'OTHER',
};

const STORAGE_KEY = 'diffPageEditorState';

/**
 * Render word segments with inline highlighting
 */
function renderSegments(segments: WordSegment[]) {
  return segments.map((seg, i) => {
    if (seg.type === 'unchanged') {
      return <span key={i}>{seg.text}</span>;
    }
    if (seg.type === 'removed') {
      return (
        <span
          key={i}
          style={{
            backgroundColor: 'rgba(255, 107, 107, 0.35)',
            color: '#ff6b6b',
            borderRadius: 2,
          }}
        >
          {seg.text}
        </span>
      );
    }
    if (seg.type === 'added') {
      return (
        <span
          key={i}
          style={{
            backgroundColor: 'rgba(81, 207, 102, 0.35)',
            color: '#51cf66',
            borderRadius: 2,
          }}
        >
          {seg.text}
        </span>
      );
    }
    return <span key={i}>{seg.text}</span>;
  });
}

/**
 * Render a single diff line with appropriate styling
 */
function renderDiffLine(line: DiffLine, side: 'original' | 'modified', index: number) {
  const isOriginalSide = side === 'original';

  // For modified lines with segments, use word-level highlighting
  if (line.type === 'modified' && line.segments) {
    // Check if this line belongs to this side using the explicit side property
    if (line.side && line.side !== side) return null;

    return (
      <Box
        key={`${side}-${index}`}
        style={{
          backgroundColor: isOriginalSide ? 'rgba(255, 107, 107, 0.08)' : 'rgba(81, 207, 102, 0.08)',
          padding: '1px 4px',
        }}
      >
        <Text component="span" size="xs">
          {renderSegments(line.segments)}
        </Text>
      </Box>
    );
  }

  // For unchanged lines
  if (line.type === 'unchanged') {
    return (
      <Box key={`${side}-${index}`} style={{ padding: '1px 4px' }}>
        <Text component="span" size="xs">{line.content}</Text>
      </Box>
    );
  }

  // For removed lines (only show on original side)
  if (line.type === 'removed' && isOriginalSide) {
    return (
      <Box
        key={`${side}-${index}`}
        style={{
          backgroundColor: 'rgba(255, 107, 107, 0.15)',
          padding: '1px 4px',
        }}
      >
        <Text component="span" size="xs" c="red">
          - {line.content}
        </Text>
      </Box>
    );
  }

  // For added lines (only show on modified side)
  if (line.type === 'added' && !isOriginalSide) {
    return (
      <Box
        key={`${side}-${index}`}
        style={{
          backgroundColor: 'rgba(81, 207, 102, 0.15)',
          padding: '1px 4px',
        }}
      >
        <Text component="span" size="xs" c="green">
          + {line.content}
        </Text>
      </Box>
    );
  }

  return null;
}

/**
 * Check if the only change between original and modified is the "Launch Agent 3" → "Skybase" rename
 */
function isRenameOnly(original: AtlasNode | undefined, modified: ChangesetSection | EditableSection | undefined): boolean {
  if (!original || !modified) return false;

  // Apply the rename substitution to original
  const substitutedName = (original.name || '').replace(/Launch Agent 3/g, 'Skybase');
  const substitutedContent = (original.content || '').replace(/Launch Agent 3/g, 'Skybase');

  // Also handle AGENT3 → SKYBASE token rename
  const finalName = substitutedName.replace(/AGENT3/g, 'SKYBASE');
  const finalContent = substitutedContent.replace(/AGENT3/g, 'SKYBASE');

  // Compare with modified (normalize whitespace)
  const nameMatch = finalName.replace(/\s+/g, ' ').trim() === (modified.name || '').replace(/\s+/g, ' ').trim();
  const contentMatch = finalContent.replace(/\s+/g, ' ').trim() === (modified.content || '').replace(/\s+/g, ' ').trim();

  return nameMatch && contentMatch;
}

/**
 * Calculate nesting level from doc_no based on visible ancestors
 * Count how many ancestors are in the visible set
 */
function getLevel(docNo: string, visibleDocNos: Set<string>): number {
  let level = 0;
  const segments = docNo.split('.');

  // Count how many ancestors are visible
  for (let i = 1; i < segments.length; i++) {
    const ancestorDocNo = segments.slice(0, i).join('.');
    if (visibleDocNos.has(ancestorDocNo)) {
      level++;
    }
  }

  return level;
}

interface DiffSectionProps {
  docNo: string;
  original: AtlasNode | undefined;
  modified: EditableSection | undefined;
  showUnchanged: boolean;
  hideRenameOnly: boolean;
  hideNoEdits: boolean;
  categoryFilter: EditCategory | 'all';
  level: number;
  hasChildren: boolean;
  onUpdate: (docNo: string, updates: { name?: string; content?: string }) => void;
  onReset: (docNo: string) => void;
  onRemove: (docNo: string) => void;
  onRemoveWithChildren: (docNo: string) => void;
  onCopyFromOriginal: (docNo: string) => void;
  onAddChild: (parentDocNo: string) => void;
}

function DiffSection({
  docNo,
  original,
  modified,
  showUnchanged,
  hideRenameOnly,
  hideNoEdits,
  categoryFilter,
  level,
  hasChildren,
  onUpdate,
  onReset,
  onAddChild,
  onRemove,
  onRemoveWithChildren,
  onCopyFromOriginal,
}: DiffSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(modified?.name || '');
  const [editContent, setEditContent] = useState(modified?.content || '');

  // Compute line diff for content - must be before any conditional returns (Rules of Hooks)
  const contentDiff = useMemo(() => {
    if (!original && !modified) return null;
    return computeLineDiff(original?.content || '', modified?.content || '');
  }, [original?.content, modified?.content]);

  // Determine diff status
  const isNew = !original && modified;
  const hasNoEdits = original && !modified; // Section exists in original but not in changeset
  const isChanged = original && modified && (
    areContentsDifferent(original.name, modified.name) ||
    areContentsDifferent(original.content, modified.content)
  );
  const isUnchanged = original && modified && !isChanged;
  const renameOnly = isRenameOnly(original, modified);

  // Determine category
  const category = getCategory(docNo, renameOnly && !isNew);

  // Skip sections with no edits if filter is on
  if (hideNoEdits && hasNoEdits) {
    return null;
  }

  // Skip unchanged sections if filter is on
  if (!showUnchanged && isUnchanged) {
    return null;
  }

  // Skip if category filter is active and doesn't match (but always show hasNoEdits sections if not filtered)
  if (categoryFilter !== 'all' && category !== categoryFilter && !hasNoEdits) {
    return null;
  }

  // Skip rename-only sections if filter is on
  if (hideRenameOnly && renameOnly && category !== 'distribution-rewards') {
    return null;
  }

  // Get badge color and text
  const getBadge = () => {
    if (isNew) return { color: 'green', text: 'NEW' };
    if (hasNoEdits) return null; // No badge for sections without edits
    if (isChanged && renameOnly) return { color: 'blue', text: 'RENAME' };
    if (isChanged) return { color: 'yellow', text: 'CHANGED' };
    return { color: 'gray', text: 'UNCHANGED' };
  };

  const badge = getBadge();

  const segments = docNo.split('.');
  const lastSegmentColor = getSegmentColor(segments.length - 1);

  const handleStartEdit = () => {
    setEditName(modified?.name || '');
    setEditContent(modified?.content || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(docNo, { name: editName, content: editContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(modified?.name || '');
    setEditContent(modified?.content || '');
    setIsEditing(false);
  };

  return (
    <Paper
      p="xs"
      mb="xs"
      withBorder
      style={{
        marginLeft: level * 16,
        borderColor: 'var(--mantine-color-dark-4)',
        borderWidth: 1,
        borderLeftWidth: 4,
        borderLeftColor: lastSegmentColor,
      }}
    >
      {/* Header row with doc_no and badge */}
      <Group justify="space-between" mb="xs">
        <Group gap="xs">
          <Text size="xs" fw={600} style={{ fontFamily: 'monospace' }}>
            <ColoredDocNo docNo={docNo} />
          </Text>
          <Tooltip label="View on Sky Atlas">
            <ActionIcon
              component="a"
              href={`https://sky-atlas.io/#${docNo}`}
              target="_blank"
              size="xs"
              variant="subtle"
              color="gray"
            >
              <IconExternalLink size={12} />
            </ActionIcon>
          </Tooltip>
          {badge && (
            <Badge size="xs" color={badge.color}>
              {badge.text}
            </Badge>
          )}
          {modified?.source && (
            <Badge size="xs" color={modified.source === 'file' ? 'blue' : 'violet'} variant="outline">
              {modified.source === 'file' ? 'FILE' : 'ATLAS'}
            </Badge>
          )}
          {modified?.isEdited && (
            <Badge size="xs" color="yellow" variant="outline">
              EDITED
            </Badge>
          )}
          {category !== 'other' && (
            <Badge size="xs" color={CATEGORY_COLORS[category]} variant="outline">
              {CATEGORY_LABELS[category]}
            </Badge>
          )}
          {contentDiff && (contentDiff.addedCount > 0 || contentDiff.removedCount > 0) && (
            <Group gap={4}>
              {contentDiff.addedCount > 0 && (
                <Text size="xs" c="green">+{contentDiff.addedCount}</Text>
              )}
              {contentDiff.removedCount > 0 && (
                <Text size="xs" c="red">-{contentDiff.removedCount}</Text>
              )}
            </Group>
          )}
        </Group>

        {/* Action buttons */}
        <Group gap={4}>
          {modified && !isEditing && (
            <>
              <Tooltip label="Edit section">
                <ActionIcon variant="subtle" size="sm" onClick={handleStartEdit}>
                  <IconEdit size={14} />
                </ActionIcon>
              </Tooltip>
              {modified.isEdited && (
                <Tooltip label="Reset to original">
                  <ActionIcon variant="subtle" size="sm" color="yellow" onClick={() => onReset(docNo)}>
                    <IconRefresh size={14} />
                  </ActionIcon>
                </Tooltip>
              )}
              <Tooltip label="Remove from changeset">
                <ActionIcon variant="subtle" size="sm" color="red" onClick={() => onRemove(docNo)}>
                  <IconTrash size={14} />
                </ActionIcon>
              </Tooltip>
              {hasChildren && (
                <Tooltip label="Remove with all children">
                  <ActionIcon variant="filled" size="sm" color="red" onClick={() => onRemoveWithChildren(docNo)}>
                    <IconTrash size={14} />
                  </ActionIcon>
                </Tooltip>
              )}
              <Tooltip label="Add child section">
                <ActionIcon variant="light" size="sm" color="blue" onClick={() => onAddChild(docNo)}>
                  <IconSubtask size={14} />
                </ActionIcon>
              </Tooltip>
            </>
          )}
          {!modified && original && (
            <Tooltip label="Add to changeset">
              <ActionIcon variant="light" size="sm" color="green" onClick={() => onCopyFromOriginal(docNo)}>
                <IconPlus size={14} />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Group>

      {/* Two-column layout for names and content */}
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}
      >
        {/* Original column */}
        <Box>
          <Text size="sm" fw={500} c={isNew ? 'dimmed' : undefined} mb="xs">
            {original?.name || '(no section)'}
          </Text>
          {hasNoEdits ? (
            // For sections with no edits, just show the original content plainly
            original?.content && (
              <Paper p="xs" bg="dark.8" style={{ maxHeight: 200, overflow: 'auto' }}>
                <Text size="xs" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  {original.content}
                </Text>
              </Paper>
            )
          ) : (
            <>
              {(original?.content || modified?.content) && !isEditing && (
                <Paper p="xs" bg="dark.8" style={{ maxHeight: 200, overflow: 'auto' }}>
                  <Box style={{ fontFamily: 'monospace', fontSize: '11px', whiteSpace: 'pre-wrap' }}>
                    {contentDiff?.lines.map((line, i) => renderDiffLine(line, 'original', i))}
                  </Box>
                </Paper>
              )}
              {isEditing && original?.content && (
                <Paper p="xs" bg="dark.8" style={{ maxHeight: 200, overflow: 'auto' }}>
                  <Text size="xs" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                    {original.content}
                  </Text>
                </Paper>
              )}
            </>
          )}
        </Box>

        {/* Modified column */}
        <Box>
          {hasNoEdits ? (
            // For sections with no edits, show subdued "(no edits)" text
            <Text size="sm" c="dimmed" fs="italic">
              (no edits)
            </Text>
          ) : isEditing ? (
            <Stack gap="xs">
              <TextInput
                label="Name"
                value={editName}
                onChange={(e) => setEditName(e.currentTarget.value)}
                size="xs"
              />
              <Textarea
                label="Content"
                value={editContent}
                onChange={(e) => setEditContent(e.currentTarget.value)}
                minRows={4}
                maxRows={10}
                autosize
                size="xs"
                styles={{ input: { fontFamily: 'monospace', fontSize: '11px' } }}
              />
              <Group gap="xs">
                <Button
                  size="xs"
                  color="green"
                  leftSection={<IconCheck size={14} />}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  leftSection={<IconX size={14} />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Group>
            </Stack>
          ) : (
            <>
              <Text size="sm" fw={500} c={isNew ? 'green' : undefined} mb="xs">
                {modified?.name || '(no section)'}
              </Text>
              {(original?.content || modified?.content) && (
                <Paper p="xs" bg="dark.8" style={{ maxHeight: 200, overflow: 'auto' }}>
                  <Box style={{ fontFamily: 'monospace', fontSize: '11px', whiteSpace: 'pre-wrap' }}>
                    {contentDiff?.lines.map((line, i) => renderDiffLine(line, 'modified', i))}
                  </Box>
                </Paper>
              )}
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export function DiffPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [atlasData, setAtlasData] = useState<AtlasNode[]>([]);
  const [originalSections, setOriginalSections] = useState<Map<string, AtlasNode>>(new Map());
  const [changesetSections, setChangesetSections] = useState<Map<string, EditableSection>>(new Map());
  const [changesetName, setChangesetName] = useState('Skybase Changeset');
  const [changesetDescription, setChangesetDescription] = useState('');
  const [showUnchanged, setShowUnchanged] = useState(false);
  const [hideRenameOnly, setHideRenameOnly] = useState(false);
  const [hideNoEdits, setHideNoEdits] = useState(true); // Default to hiding sections with no edits
  const [categoryFilter, setCategoryFilter] = useState<EditCategory | 'all'>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // New section modal state
  const [newSectionModalOpen, setNewSectionModalOpen] = useState(false);
  const [newDocNo, setNewDocNo] = useState('');
  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');

  // Load atlas data
  useEffect(() => {
    const loadData = async () => {
      try {
        const atlas = await loadLatestAtlasData();
        setAtlasData(atlas);

        // Try to load from localStorage first
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.version === 1) {
              // Restore changeset sections
              const sections = new Map<string, EditableSection>();
              for (const section of parsed.changesetSections) {
                sections.set(section.doc_no, section);
              }
              setChangesetSections(sections);
              setChangesetName(parsed.changesetName || 'Skybase Changeset');
              setChangesetDescription(parsed.changesetDescription || '');

              // Restore original sections
              const originals = new Map<string, AtlasNode>();
              for (const docNo of parsed.loadedDocNos || []) {
                const nodeMap = getNodeWithAllChildren(atlas, docNo);
                for (const [key, node] of nodeMap) {
                  originals.set(key, node);
                }
              }
              setOriginalSections(originals);
              setInitialized(true);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error('Failed to parse saved state:', e);
          }
        }

        // Load default changeset
        const changesetData = await loadChangeset();
        setChangesetName(changesetData.name);
        setChangesetDescription(changesetData.description);

        // Convert to editable sections
        const sections = new Map<string, EditableSection>();
        for (const section of changesetData.sections) {
          sections.set(section.doc_no, {
            doc_no: section.doc_no,
            name: section.name,
            content: section.content,
            type: section.type,
            source: 'file',
            isEdited: false,
            originalName: section.name,
            originalContent: section.content,
          });
        }
        setChangesetSections(sections);

        // Build original sections map
        const originals = new Map<string, AtlasNode>();

        // Find Launch Agent 3 and flatten it
        const la3Node = findNodeByDocNo(atlas, AGENT_DOC_NUMBERS.launchAgent3);
        if (la3Node) {
          const la3Sections = flattenAgentSections(la3Node);
          for (const [docNo, node] of la3Sections) {
            originals.set(docNo, node);
          }
        }

        // For sections outside A.6.1.1.4, look them up directly
        for (const section of changesetData.sections) {
          if (!section.doc_no.startsWith('A.6.1.1.4') && !originals.has(section.doc_no)) {
            const node = findNodeByDocNo(atlas, section.doc_no);
            if (node) {
              originals.set(section.doc_no, node);
            }
          }
        }

        setOriginalSections(originals);
        setInitialized(true);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (!initialized) return;

    try {
      const state = {
        version: 1,
        changesetSections: Array.from(changesetSections.values()),
        changesetName,
        changesetDescription,
        loadedDocNos: Array.from(originalSections.keys()),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }, [changesetSections, changesetName, changesetDescription, originalSections, initialized]);

  // Get node with all children helper
  const getNodeWithChildren = useCallback((docNo: string) => {
    return getNodeWithAllChildren(atlasData, docNo);
  }, [atlasData]);

  // Load an Atlas section and its children
  const loadAtlasSection = useCallback((docNo: string) => {
    const nodeMap = getNodeWithChildren(docNo);
    setOriginalSections(prev => {
      const newMap = new Map(prev);
      for (const [key, node] of nodeMap) {
        newMap.set(key, node);
      }
      return newMap;
    });
  }, [getNodeWithChildren]);

  // Copy a section from original to changeset
  const copyFromOriginal = useCallback((docNo: string) => {
    const original = originalSections.get(docNo);
    if (!original) return;

    setChangesetSections(prev => {
      if (prev.has(docNo)) return prev;

      const newMap = new Map(prev);
      newMap.set(docNo, {
        doc_no: docNo,
        name: original.name,
        content: original.content || '',
        type: original.type,
        source: 'atlas',
        isEdited: false,
        originalName: original.name,
        originalContent: original.content || '',
      });
      return newMap;
    });
  }, [originalSections]);

  // Update a section
  const updateSection = useCallback((docNo: string, updates: { name?: string; content?: string }) => {
    setChangesetSections(prev => {
      const section = prev.get(docNo);
      if (!section) return prev;

      const newMap = new Map(prev);
      const updated = { ...section };

      if (updates.name !== undefined) updated.name = updates.name;
      if (updates.content !== undefined) updated.content = updates.content;

      updated.isEdited = updated.name !== updated.originalName || updated.content !== updated.originalContent;

      newMap.set(docNo, updated);
      return newMap;
    });
  }, []);

  // Reset a section
  const resetSection = useCallback((docNo: string) => {
    setChangesetSections(prev => {
      const section = prev.get(docNo);
      if (!section) return prev;

      const newMap = new Map(prev);
      newMap.set(docNo, {
        ...section,
        name: section.originalName,
        content: section.originalContent,
        isEdited: false,
      });
      return newMap;
    });
  }, []);

  // Remove a section from changeset
  const removeSection = useCallback((docNo: string) => {
    setChangesetSections(prev => {
      const newMap = new Map(prev);
      newMap.delete(docNo);
      return newMap;
    });
  }, []);

  // Remove a section and all its children from changeset
  const removeSectionWithChildren = useCallback((docNo: string) => {
    setChangesetSections(prev => {
      const newMap = new Map(prev);
      // Remove this section and all children (anything starting with docNo.)
      for (const key of newMap.keys()) {
        if (key === docNo || key.startsWith(docNo + '.')) {
          newMap.delete(key);
        }
      }
      return newMap;
    });
  }, []);

  // Create a new section
  const createNewSection = useCallback(() => {
    if (!newDocNo.trim() || !newName.trim()) return;

    const docNo = newDocNo.trim();

    setChangesetSections(prev => {
      if (prev.has(docNo)) {
        alert('A section with this doc_no already exists in the changeset');
        return prev;
      }

      const newMap = new Map(prev);
      newMap.set(docNo, {
        doc_no: docNo,
        name: newName.trim(),
        content: newContent.trim(),
        source: 'atlas', // Mark as coming from atlas even though it's new
        isEdited: true, // Mark as edited since it's entirely new
        originalName: '',
        originalContent: '',
      });
      return newMap;
    });

    // Reset form and close modal
    setNewDocNo('');
    setNewName('');
    setNewContent('');
    setNewSectionModalOpen(false);
  }, [newDocNo, newName, newContent]);

  // Start adding a child section with auto-numbering
  const startAddChild = useCallback((parentDocNo: string) => {
    // Find all existing children of this parent in both changeset and original
    const allDocNos = new Set([
      ...changesetSections.keys(),
      ...originalSections.keys(),
    ]);

    // Find the highest child number
    let maxChildNum = 0;
    const prefix = parentDocNo + '.';
    for (const docNo of allDocNos) {
      if (docNo.startsWith(prefix)) {
        // Get the immediate child segment
        const remainder = docNo.slice(prefix.length);
        const firstSegment = remainder.split('.')[0];
        const num = parseInt(firstSegment, 10);
        if (!isNaN(num) && num > maxChildNum) {
          maxChildNum = num;
        }
      }
    }

    // Set the next child number
    const nextChildDocNo = `${parentDocNo}.${maxChildNum + 1}`;
    setNewDocNo(nextChildDocNo);
    setNewName('');
    setNewContent('');
    setNewSectionModalOpen(true);
  }, [changesetSections, originalSections]);

  // Export merged sections as Markdown (original + changeset edits)
  const exportChangeset = useCallback(() => {
    // Merge: start with original sections, then apply changeset edits
    const mergedSections: { doc_no: string; name: string; content: string }[] = [];

    // Collect all doc_nos from both sources
    const allExportDocNos = new Set<string>();
    for (const docNo of originalSections.keys()) {
      allExportDocNos.add(docNo);
    }
    for (const docNo of changesetSections.keys()) {
      allExportDocNos.add(docNo);
    }

    // For each doc_no, use changeset if exists, otherwise use original
    for (const docNo of allExportDocNos) {
      const changeset = changesetSections.get(docNo);
      const original = originalSections.get(docNo);

      if (changeset) {
        // Use changeset version (edited or new)
        mergedSections.push({
          doc_no: changeset.doc_no,
          name: changeset.name,
          content: changeset.content,
        });
      } else if (original) {
        // Use original version (unedited)
        mergedSections.push({
          doc_no: original.doc_no,
          name: original.name,
          content: original.content || '',
        });
      }
    }

    // Sort by doc_no
    mergedSections.sort((a, b) => {
      const aParts = a.doc_no.split('.').map(p => parseInt(p.replace(/\D/g, ''), 10) || 0);
      const bParts = b.doc_no.split('.').map(p => parseInt(p.replace(/\D/g, ''), 10) || 0);
      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const diff = (aParts[i] || 0) - (bParts[i] || 0);
        if (diff !== 0) return diff;
      }
      return 0;
    });

    // Build Markdown content
    const lines: string[] = [
      `# ${changesetName}`,
      '',
    ];

    if (changesetDescription) {
      lines.push(changesetDescription, '');
    }

    lines.push(`*Exported: ${new Date().toISOString().split('T')[0]}*`, '');
    lines.push(`*${mergedSections.length} total sections (${changesetSections.size} with edits)*`, '');
    lines.push('---', '');

    for (const section of mergedSections) {
      lines.push(`> ## ${section.doc_no} - ${section.name}`, '');
      if (section.content) {
        lines.push(section.content, '');
      }
      lines.push('---', '');
    }

    const markdown = lines.join('\n');
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${changesetName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [changesetSections, originalSections, changesetName, changesetDescription]);

  // Compute all doc_nos from both sources
  const allDocNos = useMemo(() => {
    const docNos = new Set<string>();

    for (const docNo of originalSections.keys()) {
      docNos.add(docNo);
    }

    for (const docNo of changesetSections.keys()) {
      docNos.add(docNo);
    }

    return Array.from(docNos).sort((a, b) => {
      const aParts = a.split('.').map(p => {
        const num = parseInt(p.replace(/[^\d]/g, ''), 10);
        return isNaN(num) ? p : num;
      });
      const bParts = b.split('.').map(p => {
        const num = parseInt(p.replace(/[^\d]/g, ''), 10);
        return isNaN(num) ? p : num;
      });

      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aVal = aParts[i] ?? '';
        const bVal = bParts[i] ?? '';

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          if (aVal !== bVal) return aVal - bVal;
        } else {
          const cmp = String(aVal).localeCompare(String(bVal));
          if (cmp !== 0) return cmp;
        }
      }
      return 0;
    });
  }, [originalSections, changesetSections]);

  // Get doc_nos already in changeset for the picker
  const loadedDocNos = useMemo(() => {
    return new Set(changesetSections.keys());
  }, [changesetSections]);

  // Compute stats
  const stats = useMemo(() => {
    let newCount = 0;
    let changedCount = 0;
    let renameOnlyCount = 0;
    let unchangedCount = 0;
    let noEditsCount = 0;
    let distributionRewardsCount = 0;
    let editedCount = 0;

    for (const docNo of allDocNos) {
      const original = originalSections.get(docNo);
      const modified = changesetSections.get(docNo);

      // Count sections with no edits (in original but not in changeset)
      if (original && !modified) {
        noEditsCount++;
        continue;
      }

      if (!changesetSections.has(docNo)) continue;

      if (modified?.isEdited) editedCount++;

      if (docNo.startsWith('A.6.1.1.4.2.5')) {
        distributionRewardsCount++;
      }

      if (!original && modified) {
        newCount++;
      } else if (original && modified) {
        const hasChanges = areContentsDifferent(original.name, modified.name) ||
          areContentsDifferent(original.content, modified.content);
        if (hasChanges) {
          if (isRenameOnly(original, modified)) {
            renameOnlyCount++;
          } else {
            changedCount++;
          }
        } else {
          unchangedCount++;
        }
      }
    }

    return { newCount, changedCount, renameOnlyCount, unchangedCount, noEditsCount, distributionRewardsCount, editedCount, total: changesetSections.size };
  }, [allDocNos, originalSections, changesetSections]);

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
        <Text c="red" size="lg">Error: {error}</Text>
      </Center>
    );
  }

  return (
    <Box style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
      {/* Sidebar */}
      <Box
        style={{
          width: sidebarOpen ? 350 : 0,
          overflow: 'hidden',
          transition: 'width 0.2s ease',
          borderRight: sidebarOpen ? '1px solid var(--mantine-color-dark-4)' : 'none',
        }}
      >
        {sidebarOpen && (
          <Box p="md" h="100%">
            <SectionPicker
              atlasData={atlasData}
              loadedDocNos={loadedDocNos}
              onLoadSection={loadAtlasSection}
            />
          </Box>
        )}
      </Box>

      {/* Toggle button */}
      <Box
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 16,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <Tooltip label={sidebarOpen ? 'Hide section picker' : 'Show section picker'}>
          <ActionIcon
            variant="filled"
            color="violet"
            size="lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <IconChevronLeft size={18} /> : <IconChevronRight size={18} />}
          </ActionIcon>
        </Tooltip>
      </Box>

      {/* Main content */}
      <Box style={{ flex: 1, overflow: 'hidden' }}>
        <Container size="100%" py="md" px="md" h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
          <Box mb="md">
            <Group justify="space-between" align="flex-start">
              <Box>
                <Title order={2} mb="xs">Skybase Changeset Diff</Title>
                <Text c="dimmed" size="sm">
                  Comparing original Atlas sections with changeset edits
                </Text>
              </Box>
              <Group gap="xs">
                {stats.editedCount > 0 && (
                  <Badge color="yellow" size="lg">
                    {stats.editedCount} unsaved edits
                  </Badge>
                )}
                <Button
                  leftSection={<IconPlus size={16} />}
                  onClick={() => setNewSectionModalOpen(true)}
                  variant="light"
                >
                  New Section
                </Button>
                <Button
                  leftSection={<IconDownload size={16} />}
                  onClick={exportChangeset}
                  color="green"
                >
                  Export Merged ({originalSections.size} sections)
                </Button>
              </Group>
            </Group>
          </Box>

          {/* Stats */}
          <Paper p="sm" mb="md" withBorder>
            <Group justify="space-between" mb="sm">
              <Group gap="xl">
                <Group gap="xs">
                  <IconPlus size={16} color="var(--mantine-color-green-6)" />
                  <Text size="sm">{stats.newCount} new</Text>
                </Group>
                <Group gap="xs">
                  <IconEdit size={16} color="var(--mantine-color-yellow-6)" />
                  <Text size="sm">{stats.changedCount} changed</Text>
                </Group>
                <Group gap="xs">
                  <Badge size="xs" color="blue">R</Badge>
                  <Text size="sm">{stats.renameOnlyCount} rename only</Text>
                </Group>
                <Group gap="xs">
                  <IconMinus size={16} color="var(--mantine-color-gray-6)" />
                  <Text size="sm">{stats.unchangedCount} unchanged</Text>
                </Group>
              </Group>
              <Group gap="md">
                <Checkbox
                  label={`Hide no edits (${stats.noEditsCount})`}
                  checked={hideNoEdits}
                  onChange={(e) => setHideNoEdits(e.currentTarget.checked)}
                />
                <Checkbox
                  label="Show unchanged"
                  checked={showUnchanged}
                  onChange={(e) => setShowUnchanged(e.currentTarget.checked)}
                />
                <Checkbox
                  label="Hide rename-only"
                  checked={hideRenameOnly}
                  onChange={(e) => setHideRenameOnly(e.currentTarget.checked)}
                />
              </Group>
            </Group>
            <Group gap="xs">
              <Text size="sm" c="dimmed">Filter by category:</Text>
              <Badge
                size="sm"
                color="gray"
                variant={categoryFilter === 'all' ? 'filled' : 'outline'}
                style={{ cursor: 'pointer' }}
                onClick={() => setCategoryFilter('all')}
              >
                All
              </Badge>
              <Badge
                size="sm"
                color="violet"
                variant={categoryFilter === 'distribution-rewards' ? 'filled' : 'outline'}
                style={{ cursor: 'pointer' }}
                onClick={() => setCategoryFilter('distribution-rewards')}
              >
                Distribution Rewards ({stats.distributionRewardsCount})
              </Badge>
              <Badge
                size="sm"
                color="blue"
                variant={categoryFilter === 'rename-only' ? 'filled' : 'outline'}
                style={{ cursor: 'pointer' }}
                onClick={() => setCategoryFilter('rename-only')}
              >
                Rename Only ({stats.renameOnlyCount})
              </Badge>
              <Badge
                size="sm"
                color="gray"
                variant={categoryFilter === 'other' ? 'filled' : 'outline'}
                style={{ cursor: 'pointer' }}
                onClick={() => setCategoryFilter('other')}
              >
                Other
              </Badge>
            </Group>
          </Paper>

          {/* Column headers */}
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '0.5rem',
            }}
          >
            <Paper p="sm" bg="dark.7">
              <Text fw={600}>Original (Atlas)</Text>
              <Text size="xs" c="dimmed">{originalSections.size} sections loaded</Text>
            </Paper>
            <Paper p="sm" bg="dark.7">
              <Group justify="space-between">
                <Box>
                  <Text fw={600}>Changeset (Editable)</Text>
                  <Text size="xs" c="dimmed">{changesetSections.size} sections in changeset</Text>
                </Box>
              </Group>
            </Paper>
          </Box>

          {/* Diff sections */}
          <ScrollArea style={{ flex: 1 }}>
            <Stack gap={0}>
              {(() => {
                // First, determine which sections will actually be rendered (after all filters)
                const renderedDocNos = new Set<string>();

                for (const docNo of allDocNos) {
                  const original = originalSections.get(docNo);
                  const modified = changesetSections.get(docNo);

                  const isNew = !original && modified;
                  const hasNoEdits = original && !modified;
                  const isChanged = original && modified && (
                    areContentsDifferent(original.name, modified.name) ||
                    areContentsDifferent(original.content, modified.content)
                  );
                  const isUnchanged = original && modified && !isChanged;
                  const renameOnly = isRenameOnly(original, modified);
                  const category = getCategory(docNo, renameOnly && !isNew);

                  // Apply same filters as DiffSection
                  if (hideNoEdits && hasNoEdits) continue;
                  if (!showUnchanged && isUnchanged) continue;
                  if (categoryFilter !== 'all' && category !== categoryFilter && !hasNoEdits) continue;
                  if (hideRenameOnly && renameOnly && category !== 'distribution-rewards') continue;

                  renderedDocNos.add(docNo);
                }

                return allDocNos
                  .filter(docNo => renderedDocNos.has(docNo))
                  .map(docNo => (
                    <DiffSection
                      key={docNo}
                      docNo={docNo}
                      original={originalSections.get(docNo)}
                      modified={changesetSections.get(docNo)}
                      showUnchanged={showUnchanged}
                      hideRenameOnly={hideRenameOnly}
                      hideNoEdits={hideNoEdits}
                      categoryFilter={categoryFilter}
                      level={getLevel(docNo, renderedDocNos)}
                      hasChildren={Array.from(changesetSections.keys()).some(k => k.startsWith(docNo + '.'))}
                      onUpdate={updateSection}
                      onReset={resetSection}
                      onRemove={removeSection}
                      onRemoveWithChildren={removeSectionWithChildren}
                      onCopyFromOriginal={copyFromOriginal}
                      onAddChild={startAddChild}
                    />
                  ));
              })()}
            </Stack>
          </ScrollArea>
        </Container>
      </Box>

      {/* New Section Modal */}
      <Modal
        opened={newSectionModalOpen}
        onClose={() => setNewSectionModalOpen(false)}
        title="Create New Section"
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            label="Doc No"
            placeholder="e.g., A.2.9.2.7"
            value={newDocNo}
            onChange={(e) => setNewDocNo(e.currentTarget.value)}
            required
          />
          <TextInput
            label="Name"
            placeholder="e.g., Ecosystem Accord 7: Sky And Skybase"
            value={newName}
            onChange={(e) => setNewName(e.currentTarget.value)}
            required
          />
          <Textarea
            label="Content"
            placeholder="Section content..."
            value={newContent}
            onChange={(e) => setNewContent(e.currentTarget.value)}
            minRows={4}
            maxRows={10}
            autosize
          />
          <Group justify="flex-end" gap="xs">
            <Button variant="subtle" onClick={() => setNewSectionModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={createNewSection}
              disabled={!newDocNo.trim() || !newName.trim()}
            >
              Create Section
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
}
