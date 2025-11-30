export class MaterialFactory {
  static createBasicMaterial(color, options = {}) {
    const { 
      opacity = 1, 
      side = 2, 
      transparent = opacity < 1 
    } = options;
    
    return {
      color,
      side,
      transparent,
      opacity
    };
  }
  
  static createStandardMaterial(color, options = {}) {
    const { 
      metalness = 0, 
      roughness = 1, 
      opacity = 1, 
      side = 2, 
      transparent = opacity < 1 
    } = options;
    
    return {
      color,
      metalness,
      roughness,
      side,
      transparent,
      opacity
    };
  }
  
  static createClickableTileMaterial(baseColor, isClicked, options = {}) {
    const color = isClicked ? '#ffd700' : baseColor;
    return this.createBasicMaterial(color, {
      opacity: 1.0,  // Fully opaque
      ...options
    });
  }
  
  static createPlaneMaterial(color = '#000000') {
    return this.createBasicMaterial(color, { side: 2 });
  }
  
  static createBorderMaterial(color = '#c0c0c0', options = {}) {
    return this.createStandardMaterial(color, {
      metalness: 0.9,
      roughness: 0.1,
      opacity: 0.95,
      ...options
    });
  }
}