'use client';

import { useEffect, useState } from 'react';

// Enhanced full-page loading component with smooth animations
export default function Loader({ onLoadComplete }) {
  const [loadingText, setLoadingText] = useState('Initializing XR Experience...');
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
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

