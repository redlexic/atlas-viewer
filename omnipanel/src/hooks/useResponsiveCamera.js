import { useThree } from '@react-three/fiber';
import { useEffect, useContext, useMemo } from 'react';
import * as THREE from 'three';
import { SceneContext } from '../context/SceneContext';
import { CameraController } from '../camera/CameraController';

export function useResponsiveCamera(planeRef) {
  const { camera, size } = useThree();
  const { rotation, scale, isOrthographic } = useContext(SceneContext);
  
  const cameraController = useMemo(() => new CameraController(), []);

  useEffect(() => {
    if (!planeRef.current) return;

    const updateCamera = () => {
      // Fixed plane dimensions (1:1.6 ratio for even square tiling)
      const baseWidth = 8;
      const planeWidth = baseWidth;
      const planeHeight = planeWidth / 1.6;

      // Update plane geometry (keep consistent size)
      planeRef.current.geometry.dispose();
      planeRef.current.geometry = new THREE.PlaneGeometry(
        planeWidth,
        planeHeight
      );

      // Update camera using strategy pattern
      const config = {
        size,
        fov: camera.fov,
        rotation,
        scale,
        isOrthographic
      };
      
      cameraController.updateCamera(camera, config);
    };

    updateCamera();

    // Listen for window resize
    window.addEventListener('resize', updateCamera);
    return () => window.removeEventListener('resize', updateCamera);
  }, [camera, size, planeRef, rotation, scale, isOrthographic, cameraController]);
}
