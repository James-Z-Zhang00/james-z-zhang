import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
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
      <Canvas camera={{ position: [0, 1.5, 4], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <ForgottenKnightModel />
        <OrbitControls enablePan={false} />
      </Canvas>
    </FullScreen>
  );
};

// Required for GLTF loading
useGLTF.preload('/forgotten_knight.glb'); 