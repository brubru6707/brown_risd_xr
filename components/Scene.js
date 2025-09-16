'use client';

import { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
// Import all the models
import { Model as VRHeadset } from './VRHeadset';
import { Model as LeftController } from './LeftController';
import { Model as RightController } from './RightController';
import { Model as Bear } from './Bear';

// Easing function for smooth animations
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Animated VR Headset Component
function AnimatedHeadset() {
  const ref = useRef();
  const [startTime, setStartTime] = useState(null);

  useFrame((state) => {
    if (!startTime) {
      setStartTime(state.clock.getElapsedTime());
      return;
    }

    const elapsed = state.clock.getElapsedTime() - startTime;
    const duration = 3; // 3 seconds
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    if (ref.current) {
      // Start small and grow to final scale
      const startScale = 0.1;
      const finalScale = 0.9; // Large final scale
      ref.current.scale.setScalar(startScale + (finalScale - startScale) * easedProgress);
      
      // Rotate the headset to look down
      ref.current.rotation.set(0.3, 0.3, 0); // -0.3 radians = about -17 degrees downward
    }
  });

  return <VRHeadset ref={ref} position={[0, 0, 0]} />;
}

// Animated Left Controller Component
function AnimatedLeftController() {
  const ref = useRef();
  const [startTime, setStartTime] = useState(null);

  useFrame((state) => {
    if (!startTime) {
      setStartTime(state.clock.getElapsedTime());
      return;
    }

    const elapsed = state.clock.getElapsedTime() - startTime;
    const duration = 4; // Faster animation: 4 seconds instead of 3
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    if (ref.current) {
      // Start small and grow to smaller final scale
      const startScale = 0.1;
      const finalScale = 0.3; // Smaller final scale (was 1.0)
      ref.current.scale.setScalar(startScale + (finalScale - startScale) * easedProgress);

      // Move to left side faster and further out
      const startX = 0;
      const finalX = -4; // Further outward (was -3)
      const currentX = startX + (finalX - startX) * easedProgress;
      ref.current.position.set(currentX, -0.5, 1);
      
      // 45-degree angle rotation (no continuous rotation)
      ref.current.rotation.set(0.7  , 0.785398, 0); // 0.785398 radians = 45 degrees
    }
  });

  return <LeftController ref={ref} />;
}

// Animated Right Controller Component
function AnimatedRightController() {
  const ref = useRef();
  const [startTime, setStartTime] = useState(null);

  useFrame((state) => {
    if (!startTime) {
      setStartTime(state.clock.getElapsedTime());
      return;
    }

    const elapsed = state.clock.getElapsedTime() - startTime;
    const duration = 4; // Faster animation: 4 seconds instead of 3
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    if (ref.current) {
      // Start small and grow to smaller final scale
      const startScale = 0.1;
      const finalScale = 0.7; // Smaller final scale (was 1.0)
      ref.current.scale.setScalar(startScale + (finalScale - startScale) * easedProgress);

      // Move to right side faster and further out
      const startX = 0;
      const finalX = 4; // Further outward (was 3)
      const currentX = startX + (finalX - startX) * easedProgress;
      ref.current.position.set(currentX, -0.5, 1);
      
      // 45-degree angle rotation (opposite direction, no continuous rotation)
      ref.current.rotation.set(0.2, -0.785398, 0); // -0.785398 radians = -45 degrees
    }
  });

  return <RightController ref={ref} />;
}

// A component for a single animated bear. This is more efficient.
function FloatingBear({ position, scale, rotationSpeed }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if(ref.current) {
        ref.current.rotation.y = t * rotationSpeed;
        ref.current.position.y = position[1] + Math.sin(t * rotationSpeed + position[0]) * 0.2;
    }
  });

  return <Bear ref={ref} position={position} scale={scale} />;
}

// The main component that arranges everything in the scene
function XRComposition() {
  // Procedurally generate the data for our bears
  // useMemo ensures this array is only created once
  const bears = useMemo(() => {
    const temp = [];
    // Increased bear count for better coverage across the page
    const bearCount = 35; 
    for (let i = 0; i < bearCount; i++) {
      // Much wider spread across the entire viewport
      const x = (Math.random() - 0.5) * 25; // Increased from 10 to 25
      const y = (Math.random() - 0.5) * 15; // Increased from 5 to 15
      const z = (Math.random() - 0.5) * 25; // Increased from 10 to 25
      
      // Ensure bears don't clump too close to the center (larger exclusion zone)
      if (Math.abs(x) < 4 && Math.abs(z) < 4) continue; // Increased exclusion zone for main equipment

      const scale = Math.random() * 0.08 + 0.02; // Much smaller: between 0.02 and 0.1
      const rotationSpeed = Math.random() * 0.3 + 0.1; // Random rotation speed
      
      temp.push({ position: [x, y, z], scale, rotationSpeed });
    }
    return temp;
  }, []);

  return (
    <>
      {/* Central animated headset */}
      <AnimatedHeadset />
      
      {/* Animated controllers */}
      <AnimatedLeftController />
      <AnimatedRightController />

      {/* Map over the generated bear data to render each one */}
      {bears.map((bear, i) => (
        <FloatingBear key={i} {...bear} />
      ))}
    </>
  );
}


export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none', // Allow clicking through the 3D scene to page content
      }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} />
      <Suspense fallback={null}>
        <XRComposition />
        <Environment preset="city" />
      </Suspense>
      {/* Removed OrbitControls since you want fixed positioning */}
    </Canvas>
  );
}

