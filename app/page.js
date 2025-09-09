// src/app/page.js
import Scene from '@/components/Scene';

export default function HomePage() {
  return (
    <main>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          zIndex: 10
        }}>
          <h1>Brown RISD XR</h1>
          <p>Exploring the future of reality.</p>
        </div>
        <Scene />
      </div>
    </main>
  );
}