'use client';

// STEP 1: Import Suspense, dynamic, and your loading components
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@/components/PageLoader';
import Loading from './loading';

// STEP 2: Dynamically import the Scene component with SSR disabled
const Scene = dynamic(() => import('@/components/Scene'), { 
  ssr: false 
});

export default function HomePage() {
  return (
    <PageLoader>
      <Suspense fallback={<Loading />}>
        <Scene />
        <div className="bg-gray-900 min-h-screen">
          {/* Empty page with just the 3D scene */}
        </div>
      </Suspense>
    </PageLoader>
  );
}

