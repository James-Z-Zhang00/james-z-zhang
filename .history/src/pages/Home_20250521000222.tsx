import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, useProgress } from '@react-three/drei';
import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import { Group } from 'three';

// Custom hook for screen size detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('/background1.png') no-repeat center center;
  background-size: cover;
  overflow: hidden;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  
  canvas {
    background: transparent !important;
    pointer-events: auto;
  }
`;

const NavigationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 4rem;
  pointer-events: none;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const NavigationColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  height: 100%;
  padding: 2rem 0;
  width: 200px;

  @media (max-width: 768px) {
    width: 140px;
    gap: 2rem;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 1.5rem;
  padding: 1.2rem 2.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  pointer-events: auto;
  text-align: center;
  min-width: 180px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.8rem 1.2rem;
    min-width: 120px;
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
  width: 90%;
  max-width: 300px;
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
  const lightRef = useRef<Group>(null);
  const isMobile = useIsMobile();
  
  useFrame((state) => {
    if (modelRef.current) {
      const time = state.clock.getElapsedTime();
      const 
      const yPos = -2 + Math.sin(time * 1.0) * 0.3;
      modelRef.current.position.y = yPos;
      
      if (lightRef.current) {
        lightRef.current.position.y = yPos + 2;
      }
    }
  });

  return (
    <>
      <primitive 
        ref={modelRef}
        object={gltf.scene} 
        scale={isMobile ? 1.0 : 1.5} 
        position={isMobile ? [0, -2, 0] : [0, -3.0, 0]}
      />
      <group ref={lightRef}>
        <spotLight
          position={[0, 2, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          castShadow
        />
        <pointLight position={[0, 2, 0]} intensity={0.5} />
      </group>
      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.2}
        scale={10}
        blur={2}
        far={5}
        resolution={256}
        color="#000000"
      />
    </>
  );
}

export const Home = () => {
  const isMobile = useIsMobile();

  return (
    <FullScreen>
      <LoadingScreen />
      <NavigationContainer>
        <NavigationColumn>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
        </NavigationColumn>
        <NavigationColumn>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavigationColumn>
      </NavigationContainer>
      <CanvasContainer>
        <Canvas 
          camera={{ 
            position: isMobile ? [0, 1.5, 12] : [0, 1.5, 10],
            fov: isMobile ? 35 : 45,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: true
          }}
          dpr={[1, isMobile ? 1.5 : 2]}
          style={{ 
            background: 'transparent',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          
          {/* Base ambient light */}
          <ambientLight intensity={1.0} />
          
          {/* Environment and ground reflection */}
          <Environment preset="lobby" />
          
          <ForgottenKnightModel />
          <OrbitControls 
            enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minDistance={isMobile ? 3 : 2}
            maxDistance={isMobile ? 12 : 15}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={isMobile ? 0.5 : 1}
          />
        </Canvas>
      </CanvasContainer>
    </FullScreen>
  );
};

// Required for GLTF loading
useGLTF.preload('/forgotten_knight.glb');