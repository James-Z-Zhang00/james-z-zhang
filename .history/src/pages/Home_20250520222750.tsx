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
  return <primitive object={gltf.scene} scale={2} />;
}

export const Home = () => {
  return (
    <FullScreen>
      <Canvas 
        camera={{ 
          position: [0, 1.5, 4], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
      >
        <color attach="background" args={['#222']} />
        
        {/* Enhanced lighting setup */}
        <ambientLight intensity={1.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment and ground reflection */}
        <Environment preset="studio" />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2.5}
        />
        
        <ForgottenKnightModel />
        <OrbitControls 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </FullScreen>
  );
};

// Required for GLTF loading
useGLTF.preload('/forgotten_knight.glb'); 