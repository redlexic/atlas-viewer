import type { AtlasNode } from '../types';

/**
 * Get all children from any array field containing document nodes
 */
export const getChildren = (node: AtlasNode): AtlasNode[] => {
  const children: AtlasNode[] = [];

  for (const key in node) {
    const value = node[key];
    if (Array.isArray(value) && value.length > 0) {
      // Check if this array contains document nodes (has type, doc_no, name, uuid)
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

/**
 * Preprocess a single node to add child count
 */
export const preprocessNode = (node: AtlasNode): number => {
  const children = getChildren(node);
  let count = children.length;

  children.forEach((child) => {
    count += preprocessNode(child);
  });

  node.childCount = count;
  return count;
};

/**
 * Preprocess data array to add child counts to all nodes
 */
export const preprocessData = (data: AtlasNode[]): AtlasNode[] => {
  data.forEach((node) => preprocessNode(node));
  return data;
};

/**
 * Get all descendant UUIDs of a node
 */
export const getAllDescendantUUIDs = (node: AtlasNode): string[] => {
  const children = getChildren(node);
  const uuids: string[] = [];

  children.forEach((child) => {
    uuids.push(child.uuid);
    uuids.push(...getAllDescendantUUIDs(child));
  });

  return uuids;
};

/**
 * Find a node by UUID in a tree
 */
export const findNodeByUUID = (
  nodes: AtlasNode[],
  targetUuid: string
): AtlasNode | null => {
  for (const node of nodes) {
    if (node.uuid === targetUuid) {
      return node;
    }
    const children = getChildren(node);
    const found = findNodeByUUID(children, targetUuid);
    if (found) return found;
  }
  return null;
};

/**
 * Find a node by doc_no in a tree
 */
export const findNodeByDocNo = (
  nodes: AtlasNode[],
  docNo: string
): AtlasNode | null => {
  for (const node of nodes) {
    if (node.doc_no === docNo) {
      return node;
    }
    const children = getChildren(node);
    const found = findNodeByDocNo(children, docNo);
    if (found) return found;
  }
  return null;
};

/**
 * Flatten tree into ordered list for navigation (only includes expanded nodes)
 */
export const flattenTree = (
  nodes: AtlasNode[],
  expandedNodes: Set<string>
): AtlasNode[] => {
  const result: AtlasNode[] = [];

  const traverse = (node: AtlasNode) => {
    result.push(node);
    if (expandedNodes.has(node.uuid)) {
      const children = getChildren(node);
      children.forEach(traverse);
    }
  };

  nodes.forEach(traverse);
  return result;
};

/**
 * Find next sibling of a node
 */
export const findNextSibling = (
  nodes: AtlasNode[],
  currentUuid: string
): AtlasNode | null => {
  const findInChildren = (children: AtlasNode[]): AtlasNode | null => {
    const index = children.findIndex((n) => n.uuid === currentUuid);
    if (index !== -1 && index < children.length - 1) {
      return children[index + 1];
    }
    return null;
  };

  const search = (nodeList: AtlasNode[]): AtlasNode | null => {
    for (const node of nodeList) {
      const children = getChildren(node);
      const sibling = findInChildren(children);
      if (sibling) return sibling;

      const result = search(children);
      if (result) return result;
    }
    return null;
  };

  const topLevelSibling = findInChildren(nodes);
  if (topLevelSibling) return topLevelSibling;

  return search(nodes);
};

/**
 * Count all children recursively
 */
export const countAllChildren = (node: AtlasNode): number => {
  const children = getChildren(node);
  let count = children.length;
  children.forEach((child) => {
    count += countAllChildren(child);
  });
  return count;
};

/**
 * Get all ancestor UUIDs of a node (from root to parent)
 * Returns array ordered from root to immediate parent
 */
export const getAncestors = (
  nodes: AtlasNode[],
  targetUuid: string
): string[] => {
  const path: string[] = [];

  const findPath = (nodeList: AtlasNode[], target: string): boolean => {
    for (const node of nodeList) {
      if (node.uuid === target) {
        return true;
      }
      const children = getChildren(node);
      if (findPath(children, target)) {
        path.unshift(node.uuid);
        return true;
      }
    }
    return false;
  };

  findPath(nodes, targetUuid);
  return path;
};

/**
 * Build a tree structure from selected UUIDs
 * Returns nodes in hierarchical order based on doc_no
 */
export const buildSelectedTree = (
  nodes: AtlasNode[],
  selectedUuids: Set<string>
): AtlasNode[] => {
  const selectedNodes: AtlasNode[] = [];

  const collectSelected = (nodeList: AtlasNode[]) => {
    for (const node of nodeList) {
      if (selectedUuids.has(node.uuid)) {
        selectedNodes.push(node);
      }
      const children = getChildren(node);
      collectSelected(children);
    }
  };

  collectSelected(nodes);

  // Sort by doc_no
  selectedNodes.sort((a, b) =>
    a.doc_no.localeCompare(b.doc_no, undefined, { numeric: true })
  );

  return selectedNodes;
};
