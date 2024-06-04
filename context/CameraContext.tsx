'use client'
import React, { createContext, useContext, useState } from 'react';

// Create a context
const CameraContext = createContext();

// Context provider component
export const CameraProvider = ({ children }) => {
  const [cameraData, setCameraData] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  });

  return (
    <CameraContext.Provider value={{ cameraData, setCameraData }}>
      {children}
    </CameraContext.Provider>
  );
};

// Hook to use camera data
export const useCameraData = () => useContext(CameraContext);
