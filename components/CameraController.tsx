import { useCameraData } from "@/context/CameraContext";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

import * as THREE from 'three';  // Imports everything from the three module

export function CameraController() {
  const targetPosition = { x: 197.46, y: 49.02, z: 226.28 };
  const targetRotation = {
    x: -12.22 * Math.PI / 180, 
    y: 40.46 * Math.PI / 180,
    z: 8.00 * Math.PI / 180,
  };

  const [startTime, setStartTime] = useState(null);
  const [animationDone, setAnimationDone] = useState(false);

  const { camera } = useThree();
  const { setCameraData } = useCameraData();

  const lerpFactor = 0.1;

  useEffect(() => {
    setStartTime(performance.now());
  }, []);


  useFrame(({ clock }) => {
    setCameraData({
      position: {
        x: camera.position.x, 
        y: camera.position.y, 
        z: camera.position.z
      },
      rotation: {
        x: camera.rotation.x, 
        y: camera.rotation.y, 
        z: camera.rotation.z
      }
    });
    if (animationDone) return;

    const elapsedTime = clock.getElapsedTime();
    if (startTime === null) {
      setStartTime(clock.elapsedTime);
      return;
    }

    const duration = 3; // Duration of the animation in seconds
    const t = Math.min(1, (elapsedTime - startTime) / duration); // Normalize time to [0, 1]

    // Interpolate position and rotation
    camera.position.lerp(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z), t);
    camera.rotation.set(
      camera.rotation.x + t * (targetRotation.x - camera.rotation.x),
      camera.rotation.y + t * (targetRotation.y - camera.rotation.y),
      camera.rotation.z + t * (targetRotation.z - camera.rotation.z)
    );

    if (t >= 1) {
      setAnimationDone(true); // Stop the animation after the duration is reached
    }
  });

  return null;
}