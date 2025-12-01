export const PLANE_CONFIG = {
  ratio: 1.618, // Golden ratio for aesthetic proportions
  baseWidth: 8,
  borderWidth: 0.4,
  verticalTiles: 10,

  layers: {
    border: -0.002,
    plane: 0,
    grid: 0.001,
  },

  get planeHeight() {
    return this.baseWidth / this.ratio;
  },

  get borderPlaneWidth() {
    return this.baseWidth + this.borderWidth * 2;
  },

  get borderPlaneHeight() {
    return this.planeHeight + this.borderWidth * 2;
  },

  get tileSize() {
    return this.planeHeight / this.verticalTiles;
  },

  get horizontalTiles() {
    return Math.floor(this.baseWidth / this.tileSize);
  },

  get gridOffsetX() {
    const totalGridWidth = this.horizontalTiles * this.tileSize;
    const leftoverSpace = this.baseWidth - totalGridWidth;
    return leftoverSpace / 2;
  },
};

/**
 * Tree Layout Configuration
 *
 * Controls the hierarchical tree visualization of Atlas nodes
 */
export const TREE_CONFIG = {
  // Mathematical constant - Golden ratio (φ = 1.618)
  // Used for aesthetically pleasing proportions
  PHI: 1.618,

  /**
   * Horizontal spacing between sibling nodes
   * - Affects: Overall tree width and node density
   * - Increase: Nodes spread further apart horizontally (wider tree)
   * - Decrease: Nodes closer together (more compact tree)
   * - Current: Increased to accommodate side-by-side multi-agent tiles (up to 3 agents)
   */
  horizontalSpacing: 1.618 * 1.5,

  /**
   * Vertical spacing between parent and child levels (rows)
   * - Affects: Overall tree height and row separation
   * - Increase: More space between levels (taller tree)
   * - Decrease: Levels closer together (more compact vertically)
   * - Units: Same as world coordinates
   */
  verticalSpacing: 3.5,

  /**
   * Size of each tile/node (square dimensions)
   * - Affects: How large each node appears
   * - Increase: Bigger tiles, text easier to read
   * - Decrease: Smaller tiles, more nodes visible at once
   * - Units: World coordinate units (width & height)
   */
  tileSize: 1.618 / 2,

  /**
   * Edge (connection line) styling
   * Controls the appearance of lines connecting parent to child nodes
   */
  edges: {
    /**
     * Line color (hex color code)
     * - Default: #4b5563 (gray)
     * - Change to match your design theme
     */
    color: '#4b5563',

    /**
     * Line thickness in pixels
     * - Increase: Thicker, more visible lines
     * - Decrease: Thinner, more subtle lines
     */
    width: 2,

    /**
     * Line transparency (0 = invisible, 1 = solid)
     * - Increase: More opaque, more prominent
     * - Decrease: More transparent, less distracting
     */
    opacity: 0.5,

    /**
     * Z-axis offset for line rendering
     * - Negative values render behind tiles
     * - Keep negative to prevent lines obscuring text
     */
    zOffset: -0.01,
  },
};
