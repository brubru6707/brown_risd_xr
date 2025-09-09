'use client';

import { Suspense, useRef } from 'react';
// Import the useFrame hook
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Headset } from './Headset';

// We'll create a new component to contain the animation logic
// This keeps our main Scene component clean
function AnimatedHeadset() {
  // useRef gives us direct access to the 3D object in the scene
  const headsetRef = useRef();

  // useFrame is a hook that runs on every rendered frame
  useFrame((state, delta) => {
    // 'state.clock.elapsedTime' gives us a constantly increasing number
    // We use Math.sin and Math.cos to create a smooth, looping motion
    if (headsetRef.current) {
      // Rotate on the Y-axis (left and right)
      headsetRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

      // Bob up and down on the Y-axis
      headsetRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;

      // Tilt slightly on the X-axis
      headsetRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Pass the ref to the Headset component
  return <Headset ref={headsetRef} scale={1.5} />;
}


export default function Scene() {
  return (
    <Canvas style={{ height: '100vh', width: '100vw', background: '#111' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        {/* Render the new animated component */}
        <AnimatedHeadset />
      </Suspense>
      <Environment preset="city" />
      {/* Disable OrbitControls if you want the animation to be the only movement.
        Or, keep it to allow users to override the animation by clicking and dragging.
      */}
      <OrbitControls />
    </Canvas>
  );
}

