'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import { Model as Bear } from './Bear';
import { Model as World2 } from './World2';

// Rotating World/Globe component using the actual world2.glb model
function RotatingWorld() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      // Continuous rotation
      ref.current.rotation.y = t * 0.3; // Adjust speed by changing the multiplier
    }
  });

  return <World2 ref={ref} position={[0, 0, 0]} scale={0.6} />;
}

// Single bear component with bouncing/hopping animation - standing on screen
function FloatingBear({ position, scale, delay = 0, rotationY }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    if (ref.current) {
      // Bouncing animation - feet touching the bottom of screen
      // When sin wave is at minimum, bear is on ground; at maximum, bear is jumping up
      const bounceHeight = Math.max(0, Math.sin(t * 1.5)) * 0.4; // Only positive values (upward bounces)
      ref.current.position.y = position[1] + bounceHeight;
      
      // Slight forward tilt when jumping, backward when landing
      ref.current.rotation.x = Math.sin(t * 1.5) * 0.1;
      
      // Keep facing camera (no Y rotation)
      ref.current.rotation.y = rotationY;
    }
  });

  return <Bear ref={ref} position={position} scale={scale} />;
}

// The main composition
function WorldBearComposition() {
  let bear_bottom = -2.6; // Y position for bears to stand on the bottom of the screen
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Rotating World in the center */}
      <RotatingWorld />

      <FloatingBear position={[-4, -2.7, 4]} scale={0.1} delay={0} rotationY={3.5} />
      <FloatingBear position={[3, -2.6, 4]} scale={0.1} delay={0.5} rotationY={2.9} />
      <FloatingBear position={[4.5, -2.6, 4]} scale={0.1} delay={1.0} rotationY={2.8} />
    </>
  );
}

export default function Scene() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <WorldBearComposition />
        {/* OrbitControls removed - users cannot pan, rotate, or zoom */}
      </Canvas>
      
      {/* Star 1 with line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        width: '2px',
        height: '60%',
        backgroundColor: 'white',
        zIndex: 9
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '10%',
        transform: 'translate(-50%, -50%)',
        fontSize: '3rem',
        color: 'yellow',
        textShadow: '0 0 10px orange, 0 0 20px red',
        zIndex: 10
      }}>★</div>
      
      {/* Star 2 with line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '25%',
        width: '2px',
        height: '45%',
        backgroundColor: 'white',
        zIndex: 9
      }}></div>
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '25%',
        transform: 'translate(-50%, -50%)',
        fontSize: '2.5rem',
        color: 'yellow',
        textShadow: '0 0 10px orange, 0 0 20px red',
        zIndex: 10
      }}>★</div>
      

      
      {/* Star 4 with line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '80%',
        width: '2px',
        height: '70%',
        backgroundColor: 'white',
        zIndex: 9
      }}></div>
      <div style={{
        position: 'absolute',
        top: '70%',
        left: '80%',
        transform: 'translate(-50%, -50%)',
        fontSize: '3.2rem',
        color: 'yellow',
        textShadow: '0 0 10px orange, 0 0 20px red',
        zIndex: 10
      }}>★</div>
      
      {/* Star 6 with line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '88%',
        width: '2px',
        height: '50%',
        backgroundColor: 'white',
        zIndex: 9
      }}></div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '88%',
        transform: 'translate(-50%, -50%)',
        fontSize: '2.7rem',
        color: 'yellow',
        textShadow: '0 0 10px orange, 0 0 20px red',
        zIndex: 10
      }}>★</div>
      
      {/* Text overlay at center */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '10px',
        borderRadius: '10px',
        pointerEvents: 'auto',
        zIndex: 10
      }}>
        <h1 style={{
          color: 'white',
          margin: 0,
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          Brown_Risd XR
        </h1>
      </div>
    </div>
  );
}

