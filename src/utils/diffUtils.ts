/**
 * Diff utilities for comparing text content
 */

export type DiffType = 'unchanged' | 'added' | 'removed' | 'modified';

export interface WordSegment {
  text: string;
  type: DiffType;
}

export interface DiffLine {
  type: DiffType;
  content: string;
  lineNumber?: number;
  /** For modified lines, word-level segments showing what changed */
  segments?: WordSegment[];
  /** The paired line from the other side (for modified lines) */
  pairedContent?: string;
  /** For modified lines, which side this line belongs to */
  side?: 'original' | 'modified';
}

export interface DiffResult {
  type: DiffType;
  lines: DiffLine[];
  addedCount: number;
  removedCount: number;
  unchangedCount: number;
}

/**
 * Compute similarity ratio between two strings (0-1)
 */
function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;

  const aWords = a.toLowerCase().split(/\s+/);
  const bWords = b.toLowerCase().split(/\s+/);

  // Count common words
  const aSet = new Set(aWords);
  let common = 0;
  for (const word of bWords) {
    if (aSet.has(word)) common++;
  }

  return (2 * common) / (aWords.length + bWords.length);
}

/**
 * Compute word-level diff between two strings
 */
export function computeWordSegments(original: string, modified: string): { originalSegments: WordSegment[]; modifiedSegments: WordSegment[] } {
  // Split into words while preserving whitespace
  const splitIntoTokens = (s: string) => {
    const tokens: string[] = [];
    let current = '';
    let inWhitespace = false;

    for (const char of s) {
      const isWs = /\s/.test(char);
      if (isWs !== inWhitespace && current) {
        tokens.push(current);
        current = '';
      }
      current += char;
      inWhitespace = isWs;
    }
    if (current) tokens.push(current);
    return tokens;
  };

  const origTokens = splitIntoTokens(original);
  const modTokens = splitIntoTokens(modified);

  // Find LCS of tokens
  const lcs = computeTokenLCS(origTokens, modTokens);

  // Build segments for original
  const originalSegments: WordSegment[] = [];
  let lcsIdx = 0;
  for (const token of origTokens) {
    if (lcsIdx < lcs.length && token === lcs[lcsIdx]) {
      originalSegments.push({ text: token, type: 'unchanged' });
      lcsIdx++;
    } else {
      originalSegments.push({ text: token, type: 'removed' });
    }
  }

  // Build segments for modified
  const modifiedSegments: WordSegment[] = [];
  lcsIdx = 0;
  for (const token of modTokens) {
    if (lcsIdx < lcs.length && token === lcs[lcsIdx]) {
      modifiedSegments.push({ text: token, type: 'unchanged' });
      lcsIdx++;
    } else {
      modifiedSegments.push({ text: token, type: 'added' });
    }
  }

  return { originalSegments, modifiedSegments };
}

/**
 * Compute LCS for token arrays
 */
function computeTokenLCS(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;

  if (m === 0 || n === 0) return [];

  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const lcs: string[] = [];
  let i = m;
  let j = n;

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

/**
 * Line-by-line diff with word-level detail for modified lines
 */
export function computeLineDiff(original: string, modified: string): DiffResult {
  const originalLines = (original || '').split('\n');
  const modifiedLines = (modified || '').split('\n');

  // First pass: use LCS to get basic line diff
  const lcs = computeLCS(originalLines, modifiedLines);

  // Collect removed and added lines with their indices
  const removed: { line: string; idx: number }[] = [];
  const added: { line: string; idx: number }[] = [];
  const unchanged: { line: string; origIdx: number; modIdx: number }[] = [];

  let origIdx = 0;
  let modIdx = 0;
  let lcsIdx = 0;

  while (origIdx < originalLines.length || modIdx < modifiedLines.length) {
    if (lcsIdx < lcs.length && origIdx < originalLines.length && originalLines[origIdx] === lcs[lcsIdx]) {
      if (modIdx < modifiedLines.length && modifiedLines[modIdx] === lcs[lcsIdx]) {
        unchanged.push({ line: originalLines[origIdx], origIdx, modIdx });
        origIdx++;
        modIdx++;
        lcsIdx++;
      } else {
        added.push({ line: modifiedLines[modIdx], idx: modIdx });
        modIdx++;
      }
    } else if (origIdx < originalLines.length && (lcsIdx >= lcs.length || originalLines[origIdx] !== lcs[lcsIdx])) {
      removed.push({ line: originalLines[origIdx], idx: origIdx });
      origIdx++;
    } else if (modIdx < modifiedLines.length) {
      added.push({ line: modifiedLines[modIdx], idx: modIdx });
      modIdx++;
    }
  }

  // Second pass: pair up similar removed/added lines as modifications
  const paired = new Set<number>(); // indices of added lines that are paired
  const modifications: { removed: typeof removed[0]; added: typeof added[0] }[] = [];

  for (const rem of removed) {
    let bestMatch: typeof added[0] | null = null;
    let bestSim = 0.4; // minimum similarity threshold

    for (let i = 0; i < added.length; i++) {
      if (paired.has(i)) continue;
      const sim = similarity(rem.line, added[i].line);
      if (sim > bestSim) {
        bestSim = sim;
        bestMatch = added[i];
      }
    }

    if (bestMatch) {
      const addIdx = added.indexOf(bestMatch);
      paired.add(addIdx);
      modifications.push({ removed: rem, added: bestMatch });
    }
  }

  // Build final result by merging all entries in order
  const result: DiffLine[] = [];
  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;

  // Create lookups for modifications
  const modByRemovedIdx = new Map<number, typeof modifications[0]>();
  const modByAddedIdx = new Map<number, typeof modifications[0]>();
  for (const mod of modifications) {
    modByRemovedIdx.set(mod.removed.idx, mod);
    modByAddedIdx.set(mod.added.idx, mod);
  }

  // Create sets for quick lookup
  const unchangedOrigIdx = new Set(unchanged.map(u => u.origIdx));
  const removedIdx = new Set(removed.map(r => r.idx));
  const addedIdx = new Set(added.map(a => a.idx));

  // Process each position, outputting in document order
  origIdx = 0;
  modIdx = 0;

  while (origIdx < originalLines.length || modIdx < modifiedLines.length) {
    // Check for unchanged line (both indices match)
    const unchangedEntry = unchanged.find(u => u.origIdx === origIdx && u.modIdx === modIdx);
    if (unchangedEntry) {
      result.push({
        type: 'unchanged',
        content: unchangedEntry.line,
        lineNumber: origIdx + 1,
      });
      unchangedCount++;
      origIdx++;
      modIdx++;
      continue;
    }

    // Check if original line at origIdx was removed or modified
    if (origIdx < originalLines.length && removedIdx.has(origIdx)) {
      const mod = modByRemovedIdx.get(origIdx);
      if (mod) {
        // It's a modification - output both versions
        const { originalSegments, modifiedSegments } = computeWordSegments(mod.removed.line, mod.added.line);

        result.push({
          type: 'modified',
          content: mod.removed.line,
          lineNumber: origIdx + 1,
          segments: originalSegments,
          pairedContent: mod.added.line,
          side: 'original',
        });

        result.push({
          type: 'modified',
          content: mod.added.line,
          lineNumber: mod.added.idx + 1,
          segments: modifiedSegments,
          pairedContent: mod.removed.line,
          side: 'modified',
        });

        removedCount++;
        addedCount++;
        origIdx++;
        // Advance modIdx past any added lines up to and including the paired line
        while (modIdx <= mod.added.idx) {
          modIdx++;
        }
      } else {
        // Pure removal
        result.push({
          type: 'removed',
          content: originalLines[origIdx],
          lineNumber: origIdx + 1,
        });
        removedCount++;
        origIdx++;
      }
      continue;
    }

    // Check if modified line at modIdx was added (and not part of a modification)
    if (modIdx < modifiedLines.length && addedIdx.has(modIdx) && !modByAddedIdx.has(modIdx)) {
      result.push({
        type: 'added',
        content: modifiedLines[modIdx],
        lineNumber: modIdx + 1,
      });
      addedCount++;
      modIdx++;
      continue;
    }

    // Move forward if nothing matched (shouldn't normally happen)
    if (origIdx < originalLines.length && !unchangedOrigIdx.has(origIdx) && !removedIdx.has(origIdx)) {
      origIdx++;
    }
    if (modIdx < modifiedLines.length && !addedIdx.has(modIdx)) {
      modIdx++;
    }

    // Safety: if we're stuck, break
    if (origIdx >= originalLines.length && modIdx >= modifiedLines.length) break;
    if (!unchangedEntry && origIdx < originalLines.length && modIdx < modifiedLines.length) {
      // Force advance if stuck
      origIdx++;
      modIdx++;
    }
  }

  // Determine overall diff type
  let type: DiffType = 'unchanged';
  if (addedCount > 0 && removedCount > 0) {
    type = 'modified';
  } else if (addedCount > 0) {
    type = 'added';
  } else if (removedCount > 0) {
    type = 'removed';
  }

  return { type, lines: result, addedCount, removedCount, unchangedCount };
}

/**
 * Compute Longest Common Subsequence of two string arrays
 */
function computeLCS(a: string[], b: string[]): string[] {
  const m = a.length;
  const n = b.length;

  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const lcs: string[] = [];
  let i = m;
  let j = n;

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.unshift(a[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

/**
 * Check if two strings are meaningfully different (ignoring whitespace)
 */
export function areContentsDifferent(a: string | undefined, b: string | undefined): boolean {
  const normalizeA = (a || '').replace(/\s+/g, ' ').trim();
  const normalizeB = (b || '').replace(/\s+/g, ' ').trim();
  return normalizeA !== normalizeB;
}

/**
 * Get a summary of changes between original and modified
 */
export function getDiffSummary(original: string, modified: string): string {
  const diff = computeLineDiff(original, modified);

  if (diff.type === 'unchanged') {
    return 'No changes';
  }

  const parts: string[] = [];
  if (diff.addedCount > 0) {
    parts.push(`+${diff.addedCount} lines`);
  }
  if (diff.removedCount > 0) {
    parts.push(`-${diff.removedCount} lines`);
  }

  return parts.join(', ');
}
