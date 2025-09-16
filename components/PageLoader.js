'use client';

import { useState, useEffect } from 'react';
import Loader from './Loader';

// Full-page loading wrapper that manages the entire page loading state
export default function PageLoader({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate initial page load time
    const minimumLoadTime = 2000; // Minimum 2 seconds for smooth UX
    const startTime = Date.now();

    // Handle when all resources are loaded
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);
      
      setTimeout(() => {
        setIsLoading(false);
        // Show content after loader fades out
        setTimeout(() => {
          setShowContent(true);
        }, 500);
      }, remainingTime);
    };

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  return (
    <>
      {isLoading && <Loader onLoadComplete={handleLoadComplete} />}
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  );
}