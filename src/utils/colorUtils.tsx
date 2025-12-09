/**
 * Rainbow colors for doc_no segments
 */
export const rainbowColors = [
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

/**
 * Get a color for a segment index (cycles through rainbow colors)
 */
export const getSegmentColor = (index: number): string =>
  rainbowColors[index % rainbowColors.length];

/**
 * Get color for a node type
 */
export const getNodeColor = (type: string): string => {
  const colors: Record<string, string> = {
    Scope: 'blue',
    Article: 'green',
    Section: 'orange',
    Core: 'red',
    Primary: 'purple',
    Template: 'yellow',
  };
  return colors[type] || 'gray';
};

/**
 * Component to display a doc_no with rainbow-colored segments
 */
export const ColoredDocNo = ({ docNo }: { docNo: string }) => {
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
