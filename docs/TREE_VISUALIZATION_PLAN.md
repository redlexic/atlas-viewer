# Tree Visualization Implementation Plan

## Goal
Add Troika text rendering to omnipanel's grid tiles to prototype tree node visualization.

## Current State
- ✅ omnipanel has working 3D grid with interactive tiles
- ✅ @react-three/drei (v9.92.0) already installed
- ✅ Mantine UI components integrated
- ✅ Orthographic/perspective camera switching
- ✅ Click detection and hover states

## Implementation Plan

### Phase 1: Add Text to Existing Grid Tiles ⬅️ START HERE

**Goal:** See how Troika text looks and performs on the current grid

**Changes to make:**

1. **Modify `ClickableTile` component** (`src/components/GridOverlay.jsx` and `src/components/portable/InteractiveGrid.jsx`)
   - Import `Text` from `@react-three/drei`
   - Add 2-3 Text components per tile:
     - Doc number (e.g., "A.0.1.2")
     - Node name (e.g., "Definitions")
     - Type badge (e.g., "Section")

2. **Create sample Atlas-like data**
   - Modify grid generation to include:
     ```javascript
     {
       id: "0-0",
       x, y, size, color,
       doc_no: "A.0.1.1",
       name: "Organizational Alignment",
       type: "Core"
     }
     ```

3. **Style the text**
   - Position text layers above tile (z-axis)
   - Choose appropriate fontSize for tile size
   - Set colors based on node type
   - Add hover effects (text color change?)

**Success criteria:**
- Text renders clearly on tiles
- 60fps with current grid size (10x16 = 160 tiles)
- Text is readable when zoomed in/out
- No performance degradation

---

### Phase 2: Optimize Text Styling

**Test different approaches:**

1. **Font sizing**
   - Determine optimal fontSize for readability
   - Test with different zoom levels
   - Consider LOD (hide text when zoomed far out)

2. **Layout**
   - Vertical stacking: doc_no on top, name below
   - Text alignment (center vs left)
   - Text wrapping for long names
   - Truncation strategy

3. **Visual hierarchy**
   - Doc number: Bold, larger, colored
   - Name: Regular weight, smaller
   - Type: Smallest, dimmed color

4. **Backgrounds/outlines**
   - Test with/without outlines
   - Semi-transparent backgrounds for readability?

**Success criteria:**
- Text is easily readable
- Visual hierarchy is clear
- Looks professional

---

### Phase 3: Add Real Atlas Data

**Integration points:**

1. **Load Atlas JSON**
   - Copy `atlas-2025-11-20.json` to omnipanel public folder
   - Create data loader utility

2. **Flatten tree to grid (temporary)**
   - Take first N nodes from Atlas
   - Lay them out in grid positions
   - Preserve all node data

3. **Update tile data structure**
   - Replace dummy data with real AtlasNode data
   - Ensure all fields accessible (doc_no, name, type, content, uuid)

**Success criteria:**
- Real Atlas data renders on grid
- All node information preserved
- Can test with real content

---

### Phase 4: Tree Layout Algorithm (Future)

**After text prototype works, implement tree layout:**

1. Research/implement Reingold-Tilford algorithm
2. Replace grid positioning with tree positioning
3. Add edge rendering (parent-child lines)
4. Implement expand/collapse

**Not in scope for initial text prototype**

---

## File Structure

```
omnipanel/
├── src/
│   ├── components/
│   │   ├── GridOverlay.jsx          # Modify: Add Text to tiles
│   │   ├── portable/
│   │   │   └── InteractiveGrid.jsx  # Modify: Add Text to tiles
│   │   └── tree/                    # New: Future tree components
│   │       ├── TreeNode.jsx         # Component with text
│   │       └── TreeEdges.jsx        # Connection lines
│   ├── data/
│   │   └── sampleAtlasNodes.js      # New: Sample data
│   └── pages/
│       └── TreePrototypePage.jsx    # New: Test page for tree viz
└── public/
    └── fonts/                        # New: Custom fonts (optional)
        └── Roboto-Bold.ttf
```

---

## Next Steps

1. **Immediate:** Add `Text` component to one grid tile
2. **Test:** Check rendering quality and performance
3. **Iterate:** Adjust styling based on results
4. **Expand:** Apply to all tiles
5. **Evaluate:** Decide if troika Text is the right approach

---

## Open Questions

- [ ] What font should we use? (Default Roboto vs custom)
- [ ] Should text disappear when zoomed out? (LOD)
- [ ] How much text fits on a tile comfortably?
- [ ] Do we need text backgrounds for readability?

---

## Risk Mitigation

**If troika Text performs poorly:**
- Fallback 1: Canvas2D texture
- Fallback 2: LOD system (only show text when close)
- Fallback 3: Show text on hover only

**If text is hard to read:**
- Add outline/stroke
- Increase contrast
- Add semi-transparent background
- Use better font

---

*Plan created: 2025-11-28*
*Next: Implement Phase 1 - Add text to grid tiles*
