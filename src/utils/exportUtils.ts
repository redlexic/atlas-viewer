import type { AtlasNode } from '../types';
import { getChildren } from './treeUtils';

/**
 * Generate Notion-compatible markdown with nested toggles
 * Uses Notion's native toggle syntax: "- " bullets that Notion can convert to toggles
 * Paste into Notion, select all, then use /toggle to convert
 */
export const generateNotionMarkdown = (
  nodes: AtlasNode[],
  selectedUuids: Set<string>
): string => {
  const lines: string[] = [];

  const renderNode = (node: AtlasNode, depth: number) => {
    if (!selectedUuids.has(node.uuid)) return;

    const children = getChildren(node);
    const selectedChildren = children.filter((c) => selectedUuids.has(c.uuid));
    const hasSelectedChildren = selectedChildren.length > 0;
    const indent = '    '.repeat(depth); // 4 spaces per level

    // Header line as a toggle-ready bullet
    lines.push(`${indent}- **${node.doc_no}:** ${node.name} *(${node.type})*`);

    // Add content as indented paragraph under the bullet
    if (node.content) {
      const contentIndent = '    '.repeat(depth + 1);
      const contentLines = node.content.trim().split('\n');
      contentLines.forEach((line) => {
        if (line.trim()) {
          lines.push(`${contentIndent}${line.trim()}`);
        }
      });
    }

    // Render selected children
    if (hasSelectedChildren) {
      selectedChildren.forEach((child) => {
        renderNode(child, depth + 1);
      });
    }
  };

  // Add header
  lines.push('# Atlas Selection');
  lines.push('');

  // Find root-level selected nodes and render them
  const processLevel = (nodeList: AtlasNode[]) => {
    for (const node of nodeList) {
      if (selectedUuids.has(node.uuid)) {
        renderNode(node, 0);
      } else {
        const children = getChildren(node);
        processLevel(children);
      }
    }
  };

  processLevel(nodes);

  return lines.join('\n');
};

/**
 * Generate markdown with <details> tags for Notion FILE IMPORT
 * Use: Download file, then Notion > Import > Markdown
 * This creates actual toggle blocks in Notion
 */
export const generateNotionImportMarkdown = (
  nodes: AtlasNode[],
  selectedUuids: Set<string>
): string => {
  const lines: string[] = [];

  const renderNode = (node: AtlasNode, depth: number) => {
    if (!selectedUuids.has(node.uuid)) return;

    const children = getChildren(node);
    const selectedChildren = children.filter((c) => selectedUuids.has(c.uuid));
    const hasSelectedChildren = selectedChildren.length > 0;

    // Notion import format - no indentation on tags
    lines.push('<details>');
    lines.push(`<summary><b>${node.doc_no}:</b> ${node.name} <i>(${node.type})</i></summary>`);
    lines.push('');

    // Add content if present
    if (node.content) {
      // Clean code blocks
      const cleaned = node.content
        .replace(/```[\s\S]*?```/g, (match) => {
          const code = match.replace(/```\w*\n?/g, '').replace(/```$/g, '');
          return code.split('\n').map((l) => `    ${l}`).join('\n');
        })
        .trim();
      if (cleaned) {
        lines.push(cleaned);
        lines.push('');
      }
    }

    // Render selected children
    if (hasSelectedChildren) {
      selectedChildren.forEach((child) => {
        renderNode(child, depth + 1);
      });
    }

    lines.push('</details>');
    lines.push('');
  };

  const processLevel = (nodeList: AtlasNode[]) => {
    for (const node of nodeList) {
      if (selectedUuids.has(node.uuid)) {
        renderNode(node, 0);
      } else {
        const children = getChildren(node);
        processLevel(children);
      }
    }
  };

  processLevel(nodes);

  return lines.join('\n');
};

/**
 * Generate flat markdown list (alternative simpler format)
 */
export const generateFlatMarkdown = (
  nodes: AtlasNode[],
  selectedUuids: Set<string>
): string => {
  const lines: string[] = [];
  lines.push('# Selected Atlas Sections\n');

  const renderNode = (node: AtlasNode, depth: number) => {
    if (!selectedUuids.has(node.uuid)) return;

    const headingLevel = Math.min(depth + 2, 6);
    const heading = '#'.repeat(headingLevel);

    lines.push(`${heading} ${node.doc_no}: ${node.name}\n`);
    lines.push(`**Type:** ${node.type}\n`);

    if (node.content) {
      lines.push(node.content);
      lines.push('');
    }

    lines.push('---\n');

    // Render children
    const children = getChildren(node);
    children.forEach((child) => {
      if (selectedUuids.has(child.uuid)) {
        renderNode(child, depth + 1);
      }
    });
  };

  const processLevel = (nodeList: AtlasNode[], depth: number) => {
    for (const node of nodeList) {
      if (selectedUuids.has(node.uuid)) {
        renderNode(node, depth);
      } else {
        const children = getChildren(node);
        processLevel(children, depth);
      }
    }
  };

  processLevel(nodes, 0);

  return lines.join('\n');
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};

/**
 * Download text as a file
 */
export const downloadAsFile = (content: string, filename: string): void => {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
