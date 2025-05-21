import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, useProgress } from '@react-three/drei';
import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import { Group } from 'three';

const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('/background.png') no-repeat center center;
  background-size: cover;
  z-index: 0;
  
  canvas {
    background: transparent !important;
    pointer-events: auto;
  }
`;

const LoadingContainer = styled.div<{ isLoading: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(34, 34, 34, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  opacity: ${props => props.isLoading ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  pointer-events: ${props => props.isLoading ? 'auto' : 'none'};
  z-index: 1000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const LoadingContent = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 200px;
  height: 4px;
  background: #444;
  border-radius: 2px;
  margin-top: 20px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    background: #fff;
    transition: width 0.3s ease-in-out;
  }
`;

function LoadingScreen() {
  const { progress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [progress]);

  return (
    <LoadingContainer isLoading={isLoading}>
      <LoadingContent>
        <h2>Loading Model</h2>
        <ProgressBar progress={progress} />
        <p>{Math.round(progress)}%</p>
      </LoadingContent>
    </LoadingContainer>
  );
}

function ForgottenKnightModel() {
  const gltf = useGLTF('/forgotten_knight.glb');
  const modelRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (modelRef.current) {
      const time = state.clock.getElapsedTime();
      modelRef.current.position.y = -2 + Math.sin(time * 1.) * 0.5; // Gentle floating motion
    }
  });

  return (
    <primitive 
      ref={modelRef}
      object={gltf.scene} 
      scale={1.5} 
      position={[0, -2, 0]}
    />
  );
}

export const Home = () => {
  return (
    <FullScreen>
      <LoadingScreen />
      <CanvasContainer>
        <Canvas 
          camera={{ 
            position: [0, 1.5, 10],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: true
          }}
          dpr={[1, 2]}
          style={{ 
            background: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          
          {/* Enhanced lighting setup */}
          <ambientLight intensity={1.5} />
          <spotLight
            position={[10, 110, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {/* Environment and ground reflection */}
          <Environment preset="lobby" />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
          />
          
          <ForgottenKnightModel />
          <OrbitControls 
            enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minDistance={2}
            maxDistance={15}
          />
        </Canvas>
      </CanvasContainer>
    </FullScreen>
  );
};

// Required for GLTF loading
useGLTF.preload('/forgotten_knight.glb'); 