import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export function useContainerResponsiveCamera(planeRef, containerRef, { rotation = 0, scale = 1, isOrthographic = false }) {
  const { camera, size, gl } = useThree();

  useEffect(() => {
    if (!planeRef?.current) return;

    const updateCamera = () => {
      // Use the exact same logic as the working full-screen version
      const { width: screenWidth, height: screenHeight } = size;
      const aspect = screenWidth / screenHeight;

      // Fixed plane dimensions (same as original)
      const baseWidth = 8;
      const planeWidth = baseWidth;
      const planeHeight = planeWidth / 1.6;

      // Account for border (same as original)
      const borderWidth = 0.4;
      const totalWidth = planeWidth + borderWidth * 2;
      const totalHeight = planeHeight + borderWidth * 2;

      // Update plane geometry (same as original)
      if (planeRef.current?.geometry) {
        planeRef.current.geometry.dispose();
        planeRef.current.geometry = new THREE.PlaneGeometry(
          planeWidth,
          planeHeight
        );
      }

      // Copy the exact camera calculation from the working version
      const fovRadians = camera.fov * (Math.PI / 180);
      const halfFov = fovRadians / 2;

      const SCREEN_WIDTH_PERCENTAGE = 0.9;
      const desiredWidthInView = totalWidth / SCREEN_WIDTH_PERCENTAGE;
      const distanceForWidth = desiredWidthInView / 2 / Math.tan(halfFov) / aspect;

      const viewableHeightAtDistance = 2 * Math.tan(halfFov) * distanceForWidth;
      const maxPlaneHeightRatio = 0.9;
      const requiredViewHeight = totalHeight / maxPlaneHeightRatio;

      let finalDistance;
      if (viewableHeightAtDistance >= requiredViewHeight) {
        finalDistance = distanceForWidth;
      } else {
        finalDistance = requiredViewHeight / (2 * Math.tan(halfFov));
      }

      if (isOrthographic) {
        // Orthographic camera setup (same as original)
        const perspectiveDistance = finalDistance / scale;
        const viewHeight = 2 * Math.tan(halfFov) * perspectiveDistance;
        const viewWidth = viewHeight * aspect;

        camera.left = -viewWidth / 2;
        camera.right = viewWidth / 2;
        camera.top = viewHeight / 2;
        camera.bottom = -viewHeight / 2;

        const x = Math.sin(rotation) * perspectiveDistance;
        const z = Math.cos(rotation) * perspectiveDistance;
        camera.position.set(x, 0, z);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      } else {
        // Perspective camera setup (same as original)
        const distance = finalDistance / scale;
        const x = Math.sin(rotation) * distance;
        const z = Math.cos(rotation) * distance;

        camera.position.set(x, 0, z);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }
    };

    updateCamera();

    // Listen for window resize
    window.addEventListener('resize', updateCamera);
    return () => window.removeEventListener('resize', updateCamera);
  }, [camera, size, planeRef, rotation, scale, isOrthographic]);
}