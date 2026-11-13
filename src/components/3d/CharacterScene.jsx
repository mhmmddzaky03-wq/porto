import React, { useRef, useState, useEffect, useCallback, Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import SceneLighting from './SceneLighting';
import CharacterModel from './CharacterModel';
import FloatingObjects from './FloatingObjects';

/**
 * ErrorBoundary for WebGL Canvas
 * Ensures that if a device loses WebGL context or encounters an unsupported GPU feature,
 * the portfolio stays completely functional and displays a graceful fallback.
 */
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn('3D Canvas encountered an error, falling back:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Checks whether WebGL is supported by the client browser.
 */
function checkWebGLSupport() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Stylized Fallback component for devices without WebGL or low memory
 */
function CharacterFallback() {
  return (
    <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center p-8 text-center rounded-3xl border border-white/10 bg-gradient-to-b from-dark-surface to-[#07090E]">
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full border-2 border-purple-500/40 bg-dark-card flex items-center justify-center shadow-[0_0_35px_rgba(168,85,247,0.3)]">
          <span className="text-5xl">👑</span>
        </div>
        <span className="absolute -bottom-1 -right-1 px-3 py-1 rounded-full text-[11px] font-mono text-purple-400 bg-purple-500/15 border border-purple-500/30">
          Dzaky Edition
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Dzaky Edition Vinyl Toy</h3>
      <p className="text-xs text-neutral-400 max-w-xs leading-relaxed font-mono">
        Optimized high-performance tier enabled for your device environment.
      </p>
    </div>
  );
}

/**
 * CharacterScene
 * Root 3D scene providing the WebGL Canvas, camera projection,
 * unified pointer tracking (desktop cursor + touch events), and lighting.
 */
export default function CharacterScene({ className = '' }) {
  const containerRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [isSupported, setIsSupported] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    setIsSupported(checkWebGLSupport());
  }, []);

  // Track pointer movements relative to the container center normalized to [-1, 1]
  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

    pointerRef.current.x = Math.max(-1.2, Math.min(1.2, x));
    pointerRef.current.y = Math.max(-1.2, Math.min(1.2, y));
    setIsInteracting(true);
  }, []);

  // Smoothly decay target back toward center (0, 0)
  const handlePointerLeave = useCallback(() => {
    setIsInteracting(false);
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  }, []);

  if (!isSupported) {
    return <CharacterFallback />;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
      className={`relative w-full h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* Soft atmospheric background radial purple ambient glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-purple-600/20 via-purple-900/5 to-transparent opacity-80 blur-3xl" />

      {/* Interactive 3D Canvas */}
      <CanvasErrorBoundary fallback={<CharacterFallback />}>
        <Canvas
          camera={{ position: [0, 0.08, 4.1], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
          }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <SceneLighting />
            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.55}
              scale={3.8}
              blur={2.4}
              far={2.5}
              color="#020408"
            />
            <FloatingObjects pointer={pointerRef} />
            <CharacterModel pointer={pointerRef} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>

      {/* Floating Interactive Badge Pill */}
      <div
        className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-8 pointer-events-none transition-all duration-500 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/25 bg-dark-surface/85 backdrop-blur-md shadow-lg ${
          isInteracting ? 'opacity-40 scale-95' : 'opacity-90 scale-100'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
        </span>
        <span className="text-[11px] font-mono text-neutral-300">
          Dzaky Edition • Interactive 3D
        </span>
      </div>
    </div>
  );
}
