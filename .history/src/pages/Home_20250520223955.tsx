import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import styled from '@emotion/styled';

const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ForgottenKnightModel() {
  const gltf = useGLTF('/forgotten_knight.glb');
  return (
    <primitive 
      object={gltf.scene} 
      scale={1.5} 
      position={[0, -2, 0]}  // [x, y, z] - y controls vertical position
    />
  );
}

export const Home = () => {
  return (
    <FullScreen>
      <Canvas 
        camera={{ 
          position: [0, 1.5, 10],  // Moved camera straight up (y: 8)
          fov: 45,
          near: 0.1,
          far: 1000
        }}
      >
        <color attach="background" args={['#222']} />
        
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
        <Environment preset="dawn" /> 
        {/*  */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
        />
        
        <ForgottenKnightModel />
        <OrbitControls 
          enablePan={false}
          minPolarAngle={0}        // Allow viewing from above
          maxPolarAngle={Math.PI}  // Allow full rotation
          minDistance={2}
          maxDistance={15}         // Increased max distance for better view from above
        />
      </Canvas>
    </FullScreen>
  );
};

// Required for GLTF loading
useGLTF.preload('/forgotten_knight.glb'); 