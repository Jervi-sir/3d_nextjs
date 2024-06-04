'use client'

import { useCameraData } from "@/context/CameraContext";

export function CameraDataDisplay() {
  const { cameraData } = useCameraData();

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, color: 'white', padding: '10px' }}>
      <div>Position X: {cameraData.position.x.toFixed(2)}</div>
      <div>Position Y: {cameraData.position.y.toFixed(2)}</div>
      <div>Position Z: {cameraData.position.z.toFixed(2)}</div>
      <div>Rotation X: {(cameraData.rotation.x * (180 / Math.PI)).toFixed(2)}°</div>
      <div>Rotation Y: {(cameraData.rotation.y * (180 / Math.PI)).toFixed(2)}°</div>
      <div>Rotation Z: {(cameraData.rotation.z * (180 / Math.PI)).toFixed(2)}°</div>
    </div>
  );
}