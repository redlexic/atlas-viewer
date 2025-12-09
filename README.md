# Atlas Viewer

A dynamic, interactive viewer for the Sky Atlas documentation with advanced comparison and navigation features.

## Features

### Core Viewing
- **Collapsible Tree Structure** - Browse the entire Atlas documentation hierarchy
- **Dynamic Data Loading** - Automatically displays all sections from any array field containing document nodes
- **Markdown Rendering** - Full markdown support for all content sections
- **Dark Mode** - Professional dark theme using Mantine UI

### Navigation
- **Keyboard Controls**:
  - `←` / `→` - Navigate between nodes
  - `↑` / `↓` - Navigate and collapse nodes
  - `Enter` / `Space` - Toggle expansion
- **Click Navigation** - Expand/collapse nodes and navigate the tree
- **Visual Selection** - Selected nodes display with larger font sizes, highlighted borders, and automatic scroll-to-view

### Agent Comparison
- **Side-by-Side View** - Compare all agents (Spark, Grove, Keel, Launch Agents, Prysm) simultaneously
- **Structural Alignment** - Sections align by position (doc_no suffix), not name
- **Missing Section Indicators** - Blank spaces show when sections exist in some agents but not others
- **Builder Mode** - Create custom agents by selecting sections from existing agents

### 3D Hierarchical View
- **Interactive 3D Visualization** - View document hierarchy in 3D space using React Three Fiber
- **Node Detail Sidebar** - View detailed information for selected nodes

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
atlas-viewer/
├── public/
│   ├── atlas-2025-11-20.json       # Main Atlas data
│   ├── prysm-agent.json            # Prysm agent data
│   └── launch_agent_6_agent.json   # Launch Agent 6 data
├── src/
│   ├── App.tsx                     # Main application with routing
│   ├── TreeNode.tsx                # Collapsible tree component
│   ├── AgentComparisonAligned.tsx  # Side-by-side comparison with Builder
│   ├── types.ts                    # TypeScript interfaces
│   ├── omnipanel.d.ts              # Type declarations for omnipanel
│   ├── pages/
│   │   ├── AtlasViewerPage.tsx     # Main atlas browser
│   │   ├── ComparisonPage.tsx      # Agent comparison view
│   │   └── HierarchicalViewPage.tsx # 3D visualization
│   └── utils/
│       ├── index.ts                # Barrel export
│       ├── treeUtils.ts            # Tree traversal utilities
│       ├── colorUtils.tsx          # Color and styling utilities
│       ├── substitutionUtils.ts    # Variable substitution for Builder
│       └── dataLoader.ts           # Data loading utilities
├── omnipanel/                      # 3D visualization sub-app
├── docs/
│   ├── VARIABLE_PARAMETERIZATION_GUIDE.md
│   ├── agent-template.md
│   └── ethereum-addresses.md
└── README.md
```

## Data Structure

The viewer handles any JSON tree structure with the following node format:

```json
{
  "type": "Scope|Article|Section|Core|Primary",
  "doc_no": "A.1.2.3",
  "name": "Section Name",
  "uuid": "unique-identifier",
  "content": "Markdown content...",
  "sections_and_primary_docs": [],
  "articles": [],
  "agent_scope_database": [],
  "annotations": [],
  "tenets": [],
  "active_data": [],
  "needed_research": []
}
```

The viewer automatically detects and displays children from **any** array field containing document nodes (objects with `type`, `doc_no`, `name`, and `uuid` fields).

## Updating Data

To update the Atlas data:

1. Replace `/public/atlas-2025-11-20.json` with your updated file
2. Update the filename in `src/utils/dataLoader.ts` if needed
3. Refresh the browser (no rebuild needed for JSON changes)

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **Mantine UI 8** - Component library and dark theme
- **React Markdown** - Markdown rendering
- **React Three Fiber** - 3D visualization
- **Tabler Icons** - Icon set

## Contributing

This viewer is designed to be generic and handle any Atlas JSON structure. The tree traversal automatically detects document nodes in any array field, making it adaptable to schema changes.

### Code Organization

The codebase follows DRY principles with shared utilities:
- `utils/treeUtils.ts` - Tree traversal and manipulation functions
- `utils/colorUtils.tsx` - Shared color schemes and styled components
- `utils/substitutionUtils.ts` - Variable substitution for the Builder feature
- `utils/dataLoader.ts` - Centralized data loading

## License

[Add your license here]
