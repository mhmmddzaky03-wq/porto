import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * FloatingObjects
 * Procedural interactive 3D artifacts floating around the character.
 * Perfectly framed within camera FOV, reacting smoothly to pointer parallax.
 */
export default function FloatingObjects({ pointer }) {
  const groupRef = useRef(null);
  const icosahedronRef = useRef(null);
  const torusRef = useRef(null);
  const cubeRef = useRef(null);
  const gemRef = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle parallax tilt based on cursor pointer
    if (groupRef.current) {
      const targetRotX = (pointer?.current?.y || 0) * 0.12;
      const targetRotY = (pointer?.current?.x || 0) * 0.12;
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3.5, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3.5, delta);
    }

    // Top-Right: Rotating Wireframe Icosahedron
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = t * 0.4;
      icosahedronRef.current.rotation.y = t * 0.6;
      icosahedronRef.current.position.y = 1.05 + Math.sin(t * 1.5) * 0.06;
    }

    // Upper-Left: Floating Cybernetic Torus Ring
    if (torusRef.current) {
      torusRef.current.rotation.x = 0.6 + Math.sin(t * 0.8) * 0.15;
      torusRef.current.rotation.y = t * 0.5;
      torusRef.current.position.y = 0.5 + Math.cos(t * 1.2) * 0.05;
    }

    // Lower-Right: Frosted Glass Tech Cube
    if (cubeRef.current) {
      cubeRef.current.rotation.x = t * 0.35;
      cubeRef.current.rotation.z = t * 0.45;
      cubeRef.current.position.y = -0.55 + Math.sin(t * 1.8 + 1) * 0.04;
    }

    // Lower-Left: Glowing Accent Octahedron Gem
    if (gemRef.current) {
      gemRef.current.rotation.y = t * 0.8;
      gemRef.current.rotation.z = Math.sin(t * 1.2) * 0.3;
      gemRef.current.position.y = -0.45 + Math.cos(t * 1.6 + 2) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Wireframe Icosahedron with Glowing Inner Core (Top-Right) */}
      <group ref={icosahedronRef} position={[1.05, 1.05, 0.1]} scale={0.24}>
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#FF2A3B"
            wireframe
            emissive="#FF2A3B"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh scale={0.45}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#FF2A3B"
            emissiveIntensity={1.4}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 2. Floating Cybernetic Torus Ring (Upper-Left) */}
      <group ref={torusRef} position={[-1.05, 0.5, 0.1]} scale={0.25}>
        <mesh>
          <torusGeometry args={[1, 0.08, 16, 40]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.3}
            metalness={0.85}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.78}>
          <torusGeometry args={[1, 0.035, 16, 40]} />
          <meshStandardMaterial
            color="#FF2A3B"
            emissive="#FF2A3B"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 3. Frosted Dark Tech Cube (Lower-Right) */}
      <group ref={cubeRef} position={[0.95, -0.55, 0.2]} scale={0.16}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#0d1424"
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>
        <mesh scale={1.05}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color="#FF2A3B"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* 4. Glowing Accent Octahedron Gem (Lower-Left) */}
      <group ref={gemRef} position={[-0.95, -0.45, 0.2]} scale={0.15}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#FF2A3B"
            emissive="#FF2A3B"
            emissiveIntensity={1.5}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
      </group>
    </group>
  );
}
