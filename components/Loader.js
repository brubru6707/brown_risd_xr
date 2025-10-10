'use client';

import { useEffect, useState, useMemo } from 'react';

// Enhanced full-page loading component with smooth animations
export default function Loader({ onLoadComplete }) {
  const [loadingText, setLoadingText] = useState('Initializing XR Experience...');
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Generate deterministic particle positions to avoid hydration errors
  const particles = useMemo(() => {
    // Use a seeded approach for consistent positions
    const positions = [
      { left: 15, top: 25, delay: 0.3, duration: 2.5 },
      { left: 85, top: 15, delay: 0.8, duration: 3.2 },
      { left: 45, top: 75, delay: 1.2, duration: 2.8 },
      { left: 70, top: 40, delay: 0.5, duration: 3.5 },
      { left: 25, top: 60, delay: 1.5, duration: 2.3 },
      { left: 90, top: 80, delay: 0.2, duration: 4.0 },
      { left: 10, top: 50, delay: 1.8, duration: 2.7 },
      { left: 55, top: 20, delay: 0.9, duration: 3.1 },
      { left: 35, top: 85, delay: 1.1, duration: 2.9 },
      { left: 78, top: 65, delay: 0.6, duration: 3.4 },
      { left: 20, top: 35, delay: 1.4, duration: 2.6 },
      { left: 95, top: 55, delay: 0.4, duration: 3.8 },
      { left: 5, top: 10, delay: 1.7, duration: 2.4 },
      { left: 65, top: 90, delay: 0.7, duration: 3.3 },
      { left: 40, top: 45, delay: 1.3, duration: 2.2 },
      { left: 82, top: 28, delay: 0.1, duration: 3.9 },
      { left: 12, top: 70, delay: 1.6, duration: 2.5 },
      { left: 60, top: 12, delay: 1.0, duration: 3.6 },
      { left: 48, top: 82, delay: 0.8, duration: 2.1 },
      { left: 88, top: 48, delay: 1.9, duration: 3.7 },
    ];
    return positions;
  }, []);

  useEffect(() => {
    const loadingSteps = [
      'Initializing XR Experience...',
      'Loading 3D Models...',
      'Preparing Virtual Environment...',
      'Finalizing Setup...'
    ];

    let stepIndex = 0;
    let progressValue = 0;

    const interval = setInterval(() => {
      progressValue += Math.random() * 15 + 5; // Random progress increment
      
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(100);
        
        // Start fade out after completion
        setTimeout(() => {
          setFadeOut(true);
          // Call completion callback after fade starts
          setTimeout(() => {
            if (onLoadComplete) onLoadComplete();
          }, 500);
        }, 500);
        
        clearInterval(interval);
        return;
      }

      setProgress(progressValue);

      // Update loading text based on progress
      const newStepIndex = Math.floor((progressValue / 100) * loadingSteps.length);
      if (newStepIndex !== stepIndex && newStepIndex < loadingSteps.length) {
        stepIndex = newStepIndex;
        setLoadingText(loadingSteps[stepIndex]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto p-8">
        {/* Main logo/title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
            Brown RISD XR
          </h1>
          <p className="text-blue-300 text-sm tracking-wider uppercase">
            Extended Reality Experience
          </p>
        </div>

        {/* Loading spinner with enhanced design */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-blue-400/30 rounded-full animate-spin border-t-blue-400"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/30 rounded-full animate-spin border-r-purple-400" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-right text-xs text-gray-400 mt-1">
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading text */}
        <p className="text-lg font-medium text-gray-300 mb-2 min-h-[28px] transition-all duration-300">
          {loadingText}
        </p>
        <p className="text-sm text-gray-500">
          Preparing your journey into extended reality...
        </p>

        {/* Pulsing dots */}
        <div className="flex space-x-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

