import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * FloatingObjects
 * Procedural designer artifacts floating around the "Dzaky Edition" vinyl toy.
 * Features neon purple wireframes, floating royal gems, and collectible tokens.
 */
export default function FloatingObjects({ pointer }) {
  const groupRef = useRef(null);
  const icosahedronRef = useRef(null);
  const torusRef = useRef(null);
  const gemRef = useRef(null);
  const cubeRef = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle parallax tilt based on cursor pointer
    if (groupRef.current) {
      const targetRotX = (pointer?.current?.y || 0) * 0.12;
      const targetRotY = (pointer?.current?.x || 0) * 0.12;
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.5, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.5, delta);
    }

    // Top-Right: Rotating Purple Neon Wireframe Icosahedron
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = t * 0.4;
      icosahedronRef.current.rotation.y = t * 0.6;
      icosahedronRef.current.position.y = 1.05 + Math.sin(t * 1.5) * 0.06;
    }

    // Upper-Left: Floating Purple Cyber Ring / Halo
    if (torusRef.current) {
      torusRef.current.rotation.x = 0.6 + Math.sin(t * 0.8) * 0.15;
      torusRef.current.rotation.y = t * 0.5;
      torusRef.current.position.y = 0.5 + Math.cos(t * 1.2) * 0.05;
    }

    // Lower-Left: Floating Royal Ruby / Amethyst Gem
    if (gemRef.current) {
      gemRef.current.rotation.y = t * 0.8;
      gemRef.current.rotation.z = Math.sin(t * 1.2) * 0.3;
      gemRef.current.position.y = -0.45 + Math.cos(t * 1.6 + 2) * 0.04;
    }

    // Lower-Right: Designer Toy Pedestal Cube
    if (cubeRef.current) {
      cubeRef.current.rotation.x = t * 0.35;
      cubeRef.current.rotation.z = t * 0.45;
      cubeRef.current.position.y = -0.55 + Math.sin(t * 1.8 + 1) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Neon Purple Wireframe Icosahedron (Top-Right) */}
      <group ref={icosahedronRef} position={[1.05, 1.05, 0.1]} scale={0.24}>
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#A855F7"
            wireframe
            emissive="#A855F7"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh scale={0.45}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#C084FC"
            emissiveIntensity={1.4}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 2. Floating Cybernetic Ring (Upper-Left) */}
      <group ref={torusRef} position={[-1.05, 0.5, 0.1]} scale={0.25}>
        <mesh>
          <torusGeometry args={[1, 0.08, 16, 40]} />
          <meshStandardMaterial
            color="#271d3b"
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.78}>
          <torusGeometry args={[1, 0.035, 16, 40]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#A855F7"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 3. Floating Royal Amethyst Gem (Lower-Left) */}
      <group ref={gemRef} position={[-0.95, -0.45, 0.2]} scale={0.15}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#9333EA"
            emissive="#A855F7"
            emissiveIntensity={1.5}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>
      </group>

      {/* 4. Frosted Dark Tech Token (Lower-Right) */}
      <group ref={cubeRef} position={[0.95, -0.55, 0.2]} scale={0.16}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#141124"
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>
        <mesh scale={1.05}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#A855F7"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}
