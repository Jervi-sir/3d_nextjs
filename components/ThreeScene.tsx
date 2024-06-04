'use client';
//https://cgtrader.com/

import { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { Box3, MeshStandardMaterial, TextureLoader, Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';
import { CameraDataDisplay } from './CemeraDataDisplay';
import { CameraController } from './CameraController';

import { PlaneGeometry, DoubleSide, Mesh } from 'three';
import { CameraProvider, useCameraData } from '@/context/CameraContext';
import { FBXLoader } from 'three/examples/jsm/Addons.js';

function ThreeScene({ modelUrl = '/3dModels/home.fbx', textureUrl = '/3dModels/home.png', }) {
  const scale = 1000; // Adjust scale to fit the scene or model size
  const aspect = window.innerWidth / window.innerHeight;
  const left = -scale * aspect;
  const right = scale * aspect;
  const top = scale;
  const bottom = -scale;


  return (
    <CameraProvider>
      <Canvas
        camera={{
          position: [0, 50, 300], // Position the camera slightly above and in front of the scene
          near: 1, far: 100000, zoom: 7, //left, right, top, bottom,
          //isOrthographicCamera: true // This prop helps internal checks
        }}
        orthographic // Ensures the renderer understands the camera type
        shadows
        // style={{ background: 'black' }} // Set background color here

      >
        <ambientLight intensity={10} />
        <directionalLight intensity={10}  castShadow />

        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={0.1}
          intensity={1}
          castShadow  // This should enable shadow casting
          shadow-mapSize-width={1024}  // Good for higher resolution shadows
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <FbxModelNoPng modelUrl={modelUrl} />
          {/* <FbxModelWithPng modelUrl={modelUrl} textureUrl={textureUrl} /> */}
        </Suspense>
        
        <CameraController />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <CameraDataDisplay />
    </CameraProvider>
  );
}

function FbxModelNoPng({ modelUrl }) {
  const fbx = useLoader(FBXLoader, modelUrl);

  useEffect(() => {
    fbx.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (!child.material) {
          child.material = new MeshStandardMaterial();
        }
      }
    });
    fbx.rotation.set(120, 0, 0); // Example rotation, adjust as needed
  }, [fbx]);

  return (
    <primitive object={fbx} />
  );
}

function FbxModelWithPng({ modelUrl, textureUrl }) {
  const fbx = useLoader(FBXLoader, modelUrl);
  const texture = useLoader(TextureLoader, textureUrl);

  useEffect(() => {
    fbx.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new MeshStandardMaterial({ map: texture });
      }
    });

    // Apply rotation to the model
    fbx.rotation.set(Math.PI / 2, 0, 0); // Example rotation, adjust as needed
  }, [fbx, texture]);

  return (
    <primitive object={fbx} />
  );
}


function GroundPlane() {
  const meshRef = useRef();

  return (
    <mesh
      ref={meshRef}
      rotation-x={-Math.PI / 2} // Rotate the plane to be horizontal
      position-y={-0.1} // Position it slightly below your objects if needed
      receiveShadow={true} // This mesh can receive shadows
    >
      <planeGeometry args={[500, 500]} /> // Define the plane size
      <meshStandardMaterial color="gray" side={DoubleSide} /> // Define the material
    </mesh>
  );
}
export default ThreeScene;
