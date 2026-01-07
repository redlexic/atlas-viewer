/**
 * Known agent names for variable substitution
 */
export const KNOWN_AGENT_NAMES = [
  'Spark',
  'Grove',
  'Keel',
  'Launch Agent 3',
  'Obex',
  'Launch Agent 5',
];

/**
 * Known token symbols for variable substitution
 */
export const KNOWN_TOKEN_SYMBOLS = [
  'SPK',
  'GROVE',
  'KEEL',
  'AGENT3',
  'OBEX',
  'AGENT5',
];

/**
 * Substitute variables in content with HTML highlighting (for display)
 * @param content - The content string to process
 * @param agentName - The agent name to substitute
 * @param tokenSymbol - The token symbol to substitute
 * @param subproxyAccount - The subproxy account to substitute
 * @returns Content with HTML-highlighted substitutions
 */
export const substituteVariablesWithHighlight = (
  content: string,
  agentName: string,
  tokenSymbol: string,
  subproxyAccount: string
): string => {
  if (!content) return content;

  let result = content;

  // Replace agent names with green-highlighted version
  if (agentName) {
    KNOWN_AGENT_NAMES.forEach((name) => {
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
    KNOWN_TOKEN_SYMBOLS.forEach((symbol) => {
      const regex = new RegExp(`\\b${symbol}\\b`, 'g');
      result = result.replace(
        regex,
        `<span style="color: #4ade80; font-weight: 600;">${tokenSymbol}</span>`
      );
    });
  }

  // Replace SubProxy Account references with green-highlighted version
  if (subproxyAccount) {
    KNOWN_AGENT_NAMES.forEach((name) => {
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

/**
 * Substitute variables in content without HTML (for export/plain text)
 * @param content - The content string to process
 * @param agentName - The agent name to substitute
 * @param tokenSymbol - The token symbol to substitute
 * @param subproxyAccount - The subproxy account to substitute
 * @returns Content with plain text substitutions
 */
export const substituteVariablesPlain = (
  content: string,
  agentName: string,
  tokenSymbol: string,
  subproxyAccount: string
): string => {
  if (!content) return content;

  let result = content;

  // Replace agent names
  if (agentName) {
    KNOWN_AGENT_NAMES.forEach((name) => {
      const regex = new RegExp(name, 'g');
      result = result.replace(regex, agentName);

      const possessiveRegex = new RegExp(`${name}'s`, 'g');
      result = result.replace(possessiveRegex, `${agentName}'s`);
    });
  }

  // Replace token symbols
  if (tokenSymbol) {
    KNOWN_TOKEN_SYMBOLS.forEach((symbol) => {
      const regex = new RegExp(`\\b${symbol}\\b`, 'g');
      result = result.replace(regex, tokenSymbol);
    });
  }

  // Replace SubProxy Account references
  if (subproxyAccount) {
    KNOWN_AGENT_NAMES.forEach((name) => {
      const subproxyRegex = new RegExp(`${name} SubProxy Account`, 'g');
      result = result.replace(subproxyRegex, subproxyAccount);

      const subproxyPossessiveRegex = new RegExp(
        `${name}'s SubProxy Account`,
        'g'
      );
      result = result.replace(subproxyPossessiveRegex, subproxyAccount);
    });
  }

  return result;
};

/**
 * Strip HTML tags from a string
 */
export const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, '');
