import { PerspectiveStrategy, OrthographicStrategy } from './CameraStrategies';

export class CameraController {
  constructor() {
    this.strategies = new Map([
      ['perspective', new PerspectiveStrategy()],
      ['orthographic', new OrthographicStrategy()]
    ]);
  }
  
  updateCamera(camera, config) {
    const cameraType = config.isOrthographic ? 'orthographic' : 'perspective';
    const strategy = this.strategies.get(cameraType);
    
    if (!strategy) {
      throw new Error(`Unknown camera strategy: ${cameraType}`);
    }
    
    strategy.updateCamera(camera, config);
  }
}