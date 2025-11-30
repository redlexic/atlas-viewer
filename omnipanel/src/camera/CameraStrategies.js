import * as THREE from 'three';

export class CameraUtils {
  static positionCamera(camera, distance, rotation) {
    const x = Math.sin(rotation) * distance;
    const z = Math.cos(rotation) * distance;
    camera.position.set(x, 0, z);
    camera.lookAt(0, 0, 0);
  }

  static calculateViewBounds(config) {
    const { size, fov, scale } = config;
    const { width: screenWidth, height: screenHeight } = size;
    const aspect = screenWidth / screenHeight;
    
    const fovRadians = fov * (Math.PI / 180);
    const halfFov = fovRadians / 2;
    
    const SCREEN_FILL_PERCENTAGE = 0.9;
    const baseWidth = 8;
    const planeWidth = baseWidth;
    const planeHeight = planeWidth / 1.6;
    const borderWidth = 0.4;
    const totalWidth = planeWidth + borderWidth * 2;
    const totalHeight = planeHeight + borderWidth * 2;
    
    // Calculate distance needed to fit width
    const desiredWidthInView = totalWidth / SCREEN_FILL_PERCENTAGE;
    const distanceForWidth = desiredWidthInView / (2 * Math.tan(halfFov) * aspect);
    
    // Calculate distance needed to fit height  
    const desiredHeightInView = totalHeight / SCREEN_FILL_PERCENTAGE;
    const distanceForHeight = desiredHeightInView / (2 * Math.tan(halfFov));
    
    // For narrow containers (aspect < totalWidth/totalHeight), use width constraint
    // For wide containers (aspect > totalWidth/totalHeight), use height constraint
    const planeAspect = totalWidth / totalHeight; // ~1.52 for our 8.8x5.8 plane
    const finalDistance = aspect < planeAspect ? distanceForWidth : distanceForHeight;
    
    
    return {
      finalDistance,
      aspect,
      halfFov,
      planeWidth,
      planeHeight
    };
  }
}

export class PerspectiveStrategy {
  updateCamera(camera, config) {
    const { finalDistance } = CameraUtils.calculateViewBounds(config);
    const distance = finalDistance / config.scale;
    
    CameraUtils.positionCamera(camera, distance, config.rotation);
    camera.updateProjectionMatrix();
  }
}

export class OrthographicStrategy {
  updateCamera(camera, config) {
    const { finalDistance, aspect, halfFov } = CameraUtils.calculateViewBounds(config);
    
    const perspectiveDistance = finalDistance / config.scale;
    const viewHeight = 2 * Math.tan(halfFov) * perspectiveDistance;
    const viewWidth = viewHeight * aspect;

    camera.left = -viewWidth / 2;
    camera.right = viewWidth / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;

    CameraUtils.positionCamera(camera, perspectiveDistance, config.rotation);
    camera.updateProjectionMatrix();
  }
}