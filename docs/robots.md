# Omnipanel - 3D Hierarchical Tree Viewer

## Project Overview

Omnipanel is a React Three Fiber-based 3D visualization tool for rendering hierarchical tree structures from nested JSON data (Atlas agent format). It provides an interactive, navigable 3D tree view with keyboard controls, visual selection feedback, and detailed node inspection.

## Technology Stack

- **React**: 18.2.0
- **React Three Fiber**: 8.15.0 (React renderer for Three.js)
- **Three.js**: 0.160.0 (3D graphics library)
- **@react-three/drei**: 9.92.0 (Helper components for R3F)
- **Vite**: Build tool and dev server
- **react-markdown**: Markdown rendering for node content

## Architecture

### Core Components

#### `/src/components/TreeView.jsx`
Main tree visualization component that:
- Loads Launch Agent 6 data from JSON on mount
- Falls back to sample data on error
- Renders tree using ClickableTile components
- Implements visual selection highlighting:
  - Bright blue color (#3b82f6) for selected nodes
  - Selection border with glow effect
  - Scale animation (1.1x) for selected nodes
  - Levitation animation (z-axis movement)
- Uses useKeyboardNavigation hook for arrow key navigation

#### `/src/components/NodeDetailSidebar.jsx`
Right-side panel showing detailed node information:
- Parent node (doc_no and name)
- Last modified timestamp
- Child node counts (agent_scope_database, annotations, tenets, etc.)
- Full markdown content rendering
- Dark theme with blue accents

#### `/src/components/TreeEdges.jsx`
Renders connection lines between parent and child nodes using Three.js Line component.

#### `/src/hooks/useKeyboardNavigation.js`
Implements keyboard navigation in depth-first pre-order traversal:
- **Right Arrow**: Next node (with wrapping)
- **Left Arrow**: Previous node (with wrapping)
- **Escape**: Deselect current node
- Updates navigation state in SceneContext

#### `/src/hooks/useZoomToTile.js`
Handles camera zoom and pan animations:
- Smooth zoom to selected tiles
- Zoom-to-fit for entire tree (maxZ: 100 for wide view)
- 800ms animation with cubic easing

### Data Handling

#### `/src/data/agentDataLoader.js`
Async loader for agent JSON files:
- `loadLaunchAgent6()`: Loads launch_agent_6_agent.json
- `getTreeStats(data)`: Calculates tree statistics (node count, max depth, types)

#### `/src/utils/treeParser.js`
Tree structure parsing and manipulation:
- **Format Detection**: Supports both nested (agent_scope_database) and flat array formats
- **Smart Detection**: Validates if data is already a tree structure before rebuilding
- `buildTree(nodes)`: Converts flat/nested data into tree hierarchy
- `flattenTree(roots)`: Converts tree to flat array in depth-first order
- `getParentDocNo(docNo)`: Extracts parent identifier (e.g., "A.1" from "A.1.2")
- `traverseTree(roots, callback)`: Depth-first traversal with callback

### Layout System

#### `/src/layouts/treeLayout.js`
Implements Simplified Walker Algorithm (Reingold-Tilford variant) for tree layout:
- Hierarchical positioning with no overlaps
- Uses golden ratio (PHI = 1.618) for aesthetic spacing
- Calculates node positions (x, y) and sizes
- `getTreeBounds(layout)`: Calculates bounding box for zoom-to-fit

#### `/src/config/planeConfig.js`
Configuration constants:
```javascript
TREE_CONFIG = {
  PHI: 1.618,                    // Golden ratio
  horizontalSpacing: 1.618 / 2,  // Sibling node spacing
  verticalSpacing: 1.618,        // Parent-child level spacing
  tileSize: 1.618 / 2,           // Node tile dimensions
  edges: {
    color: '#4b5563',
    width: 2,
    opacity: 0.5,
    zOffset: -0.01
  }
}
```

### State Management

#### `/src/context/SceneContext.jsx`
Global state using React Context:
- `clickedTiles`: Set of clicked node IDs
- `selectedTile`: Currently selected node with position data
- `treeNodes`: All nodes in the tree (flat array)
- `treeLoading`: Loading state
- `treeDataSource`: Data source identifier
- `treeBounds`: Bounding box for zoom-to-fit
- `navigationIndex`: Current position in navigation (0-based)
- `navigationTotal`: Total number of navigable nodes

### HUD Components

#### `/src/components/hud/TreeStatsHUD.jsx`
Top-right stats panel showing:
- Data source (Launch Agent 6 / Sample Data)
- Total nodes count
- Max depth
- Current navigation position (e.g., "3 / 56")
- Node type distribution
- Keyboard hints (← → Navigate, Esc Deselect)

#### `/src/components/hud/ZoomControls.jsx`
Contains ZoomToFitButtonWrapper for auto-zoom functionality.

## Data Format

### Launch Agent 6 Format
Nested JSON structure with recursive children:

```json
{
  "doc_no": "A",
  "name": "Root Agent",
  "type": "agent",
  "content": "Markdown content here",
  "last_modified": "2024-11-30",
  "agent_scope_database": [
    {
      "doc_no": "A.1",
      "name": "Child Node",
      "type": "skill",
      "content": "...",
      "agent_scope_database": [...]
    }
  ]
}
```

### Node Types
Common types: `agent`, `skill`, `resource`, `annotation`, `tenet`

Each type has a distinct color in `getNodeColor()` from `/src/data/sampleAtlasNodes.js`.

## Key Features

1. **3D Tree Visualization**: Hierarchical layout in 3D space with WebGL rendering
2. **Keyboard Navigation**: Arrow keys for traversal in depth-first order
3. **Visual Selection**: Blue highlighting, border glow, scale/levitation animations
4. **Detail Sidebar**: Full node content with markdown rendering
5. **Zoom Controls**: Zoom-to-fit, zoom to selected node
6. **Parent Tracking**: Shows parent doc_no and name in sidebar
7. **Tree Statistics**: Real-time stats display in HUD
8. **Smooth Animations**: useFrame-based interpolation for all transitions

## File Locations

- **Data**: `/public/launch_agent_6_agent.json` (56 nodes)
- **Entry Point**: `/src/main.jsx` → `/src/App.jsx`
- **Main Scene**: `/src/components/Scene.jsx` (Canvas setup with OrbitControls)

## Important Patterns

### Animation Pattern
Uses `useFrame` hook for smooth interpolation:
```javascript
useFrame((state, delta) => {
  groupRef.current.position.z += (targetZ - groupRef.current.position.z) * delta * 5
  groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * delta * 8
})
```

### Tree Building Pattern
1. Detect format (nested vs flat vs already-built tree)
2. Build/validate tree structure
3. Flatten for rendering and navigation
4. Calculate layout positions
5. Update context with bounds and stats

### Selection Pattern
- Click handler: `toggleTile(doc_no)` + `selectTile(node)`
- Keyboard: Updates `selectedTile` in context
- Visual: Material props and borders change based on `isSelected`

## Common Issues & Solutions

### Tree Shows as Horizontal Bar
**Cause**: buildTree incorrectly detecting flattened array as already-built tree
**Solution**: Check array length < 10 AND validate children structure in treeParser.js

### Parent Warnings in Console
**Cause**: Attempting to rebuild already-processed tree data
**Solution**: Smart detection in buildTree checks for nested format before parsing

### Zoom Not Wide Enough
**Cause**: maxZ too low in zoom controls
**Solution**: Set maxZ to 100 in useZoomToTile.js

## Development Commands

```bash
# Start dev server (from omnipanel directory)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Git Information

- Repository: https://github.com/redlexic/atlas-viewer.git
- Location: `/atlas-viewer/omnipanel/` subdirectory
- Last major commit: fcc50e5 (Added omnipanel 3D tree viewer)

## Design Principles

1. **Golden Ratio Aesthetics**: All spacing uses PHI (1.618) for visual harmony
2. **Depth-First Navigation**: Matches mental model of tree traversal
3. **Progressive Enhancement**: Falls back to sample data on load errors
4. **Smooth Animations**: All transitions use interpolation, never instant jumps
5. **Context-Based State**: Single source of truth for selection and navigation

## Future AI Assistant Notes

- Always read treeParser.js and TreeView.jsx first to understand data flow
- The tree structure detection logic is critical - don't simplify it
- Selection state affects both visual rendering AND sidebar content
- Navigation index must stay in sync with selectedTile
- Parent node lookup requires access to full treeNodes array
- Test keyboard navigation after any changes to tree building or flattening

## Color Scheme

- Background: `rgba(17, 24, 39, 0.98)` (dark gray)
- Primary Accent: `#60a5fa` (blue)
- Selection: `#3b82f6` (bright blue)
- Selection Border: `#60a5fa` (lighter blue)
- Text: `#e5e7eb` (light gray)
- Labels: `#9ca3af` (medium gray)

## Camera Settings

- MinZoom: 0.1
- MaxZoom: 20
- Initial Position: [0, 0, 5]
- Zoom-to-fit uses calculated tree bounds with 20% padding
