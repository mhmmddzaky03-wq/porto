import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * FloatingObjects
 * Faithfully mirrors the floating developer & design artifacts from
 * public/references/avatar-reference.png:
 * - Left: Floating `</>` Code Badge squircle, glowing purple glass cube, floating neon orb
 * - Right: Miniature open laptop (silver), React atom symbol with glowing orbital rings,
 *          TypeScript `TS` badge, floating purple cubes & spheres
 * - Background: Sweeping glowing purple elliptical orbit ring circling behind the chair
 * - Interactive: Responsive parallax floating driven by mouse pointer coordinates
 */
export default function FloatingObjects({ pointer }) {
  const groupRef = useRef(null);
  const codeTileRef = useRef(null);
  const laptopRef = useRef(null);
  const reactLogoRef = useRef(null);
  const tsTileRef = useRef(null);
  const leftCubeRef = useRef(null);
  const rightCubeRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orbitRef = useRef(null);

  // Memoized materials for maximum 60 FPS performance
  const mats = useMemo(() => {
    return {
      // Tech Badge Tile Base (Deep Obsidian Glass with Purple Border)
      badgeDark: new THREE.MeshStandardMaterial({
        color: '#161928',
        roughness: 0.25,
        metalness: 0.85,
      }),
      badgeBorder: new THREE.MeshStandardMaterial({
        color: '#A855F7',
        emissive: '#7C3AED',
        emissiveIntensity: 1.2,
        roughness: 0.2,
      }),
      symbolWhite: new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
      // React Cyan/Purple Glowing Rings
      reactGlow: new THREE.MeshStandardMaterial({
        color: '#38BDF8',
        emissive: '#0EA5E9',
        emissiveIntensity: 1.6,
        roughness: 0.1,
      }),
      // TypeScript Blue Badge
      tsBlue: new THREE.MeshStandardMaterial({
        color: '#1E3A8A',
        emissive: '#1D4ED8',
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.4,
      }),
      // Laptop Silver Aluminum Shell
      laptopSilver: new THREE.MeshStandardMaterial({
        color: '#D8DEE9',
        roughness: 0.2,
        metalness: 0.9,
      }),
      laptopScreen: new THREE.MeshStandardMaterial({
        color: '#0A0E1A',
        emissive: '#6366F1',
        emissiveIntensity: 0.6,
        roughness: 0.1,
      }),
      // Glowing Purple Translucent Cubes
      purpleGlass: new THREE.MeshStandardMaterial({
        color: '#8B5CF6',
        emissive: '#7C3AED',
        emissiveIntensity: 0.9,
        roughness: 0.15,
        metalness: 0.5,
        transparent: true,
        opacity: 0.85,
      }),
      // Glowing Floating Orbs
      purpleOrb: new THREE.MeshStandardMaterial({
        color: '#C084FC',
        emissive: '#A855F7',
        emissiveIntensity: 1.8,
        roughness: 0.1,
      }),
      // Sweeping Orbit Path Ring
      orbitLine: new THREE.MeshBasicMaterial({
        color: '#9333EA',
        transparent: true,
        opacity: 0.35,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;

    // Smooth Parallax of entire floating layer with cursor
    if (groupRef.current) {
      const targetParallaxX = px * 0.14;
      const targetParallaxY = -py * 0.12;
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetParallaxX, 3.5, delta);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetParallaxY, 3.5, delta);
    }

    // 1. Code Badge Tile (Upper-Left)
    if (codeTileRef.current) {
      codeTileRef.current.position.y = 0.85 + Math.sin(t * 1.4) * 0.05;
      codeTileRef.current.rotation.y = -0.35 + Math.sin(t * 0.8) * 0.08;
      codeTileRef.current.rotation.x = 0.15 + Math.cos(t * 0.9) * 0.05;
    }

    // 2. Miniature Laptop (Upper-Right)
    if (laptopRef.current) {
      laptopRef.current.position.y = 0.82 + Math.cos(t * 1.3) * 0.05;
      laptopRef.current.rotation.y = 0.55 + Math.sin(t * 0.7) * 0.07;
      laptopRef.current.rotation.z = -0.15 + Math.cos(t * 0.8) * 0.04;
    }

    // 3. React Atom Emblem (Mid-Right)
    if (reactLogoRef.current) {
      reactLogoRef.current.position.y = 0.12 + Math.sin(t * 1.6 + 1) * 0.04;
      reactLogoRef.current.rotation.y = t * 0.7;
      reactLogoRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }

    // 4. TypeScript Tile (Lower-Right)
    if (tsTileRef.current) {
      tsTileRef.current.position.y = -0.38 + Math.cos(t * 1.5 + 2) * 0.04;
      tsTileRef.current.rotation.y = 0.4 + Math.sin(t * 0.9) * 0.06;
      tsTileRef.current.rotation.x = -0.12 + Math.cos(t * 0.7) * 0.05;
    }

    // 5. Purple Glass Cubes & Orbs
    if (leftCubeRef.current) {
      leftCubeRef.current.rotation.x = t * 0.4;
      leftCubeRef.current.rotation.y = t * 0.5;
      leftCubeRef.current.position.y = -0.42 + Math.sin(t * 1.7) * 0.035;
    }
    if (rightCubeRef.current) {
      rightCubeRef.current.rotation.x = t * 0.35;
      rightCubeRef.current.rotation.z = t * 0.45;
      rightCubeRef.current.position.y = -0.72 + Math.cos(t * 1.8) * 0.03;
    }
    if (orb1Ref.current) {
      orb1Ref.current.position.y = 0.28 + Math.sin(t * 2.0) * 0.04;
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.y = -0.62 + Math.cos(t * 2.2) * 0.04;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* ======================================================== */}
      {/* 1. BACKGROUND SWEEPING PURPLE ORBIT RING */}
      {/* ======================================================== */}
      <group position={[0, -0.05, -0.3]} rotation={[1.1, 0.45, -0.2]}>
        <mesh ref={orbitRef}>
          <torusGeometry args={[2.1, 0.012, 16, 80]} />
          <primitive object={mats.orbitLine} attach="material" />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. LEFT SIDE: `</>` CODE TILE BADGE */}
      {/* ======================================================== */}
      <group ref={codeTileRef} position={[-0.86, 0.72, 0.2]} scale={0.28}>
        {/* Rounded Base Tile */}
        <mesh material={mats.badgeDark}>
          <boxGeometry args={[1.0, 1.0, 0.18]} />
        </mesh>
        {/* Glowing Purple Border Rim */}
        <mesh position={[0, 0, 0.09]} material={mats.badgeBorder}>
          <boxGeometry args={[0.96, 0.96, 0.02]} />
        </mesh>
        {/* Inner Dark Face */}
        <mesh position={[0, 0, 0.1]} material={mats.badgeDark}>
          <boxGeometry args={[0.88, 0.88, 0.02]} />
        </mesh>
        {/* `</>` Code Glyphs (Procedural 3D bars) */}
        {/* Left bracket `<` */}
        <mesh position={[-0.24, 0.07, 0.12]} rotation={[0, 0, 0.65]} material={mats.symbolWhite}>
          <boxGeometry args={[0.045, 0.22, 0.02]} />
        </mesh>
        <mesh position={[-0.24, -0.07, 0.12]} rotation={[0, 0, -0.65]} material={mats.symbolWhite}>
          <boxGeometry args={[0.045, 0.22, 0.02]} />
        </mesh>
        {/* Slash `/` */}
        <mesh position={[0, 0, 0.12]} rotation={[0, 0, 0.38]} material={mats.symbolWhite}>
          <boxGeometry args={[0.045, 0.38, 0.02]} />
        </mesh>
        {/* Right bracket `>` */}
        <mesh position={[0.24, 0.07, 0.12]} rotation={[0, 0, -0.65]} material={mats.symbolWhite}>
          <boxGeometry args={[0.045, 0.22, 0.02]} />
        </mesh>
        <mesh position={[0.24, -0.07, 0.12]} rotation={[0, 0, 0.65]} material={mats.symbolWhite}>
          <boxGeometry args={[0.045, 0.22, 0.02]} />
        </mesh>
      </group>

      {/* Small Floating Squircle Icon below Code Tile */}
      <group position={[-1.02, 0.18, 0.1]} scale={0.15} rotation={[0.2, 0.4, -0.1]}>
        <mesh material={mats.badgeDark}>
          <boxGeometry args={[1, 1, 0.25]} />
        </mesh>
        <mesh position={[0, 0, 0.14]} material={mats.badgeBorder}>
          <boxGeometry args={[0.6, 0.6, 0.05]} />
        </mesh>
      </group>

      {/* Floating Purple Glass Cube (Mid-Left) */}
      <group ref={leftCubeRef} position={[-0.88, -0.38, 0.3]} scale={0.2}>
        <mesh material={mats.purpleGlass}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </group>

      {/* Floating Purple Orb (Left) */}
      <mesh ref={orb1Ref} position={[-0.8, 0.26, 0.35]} scale={0.06} material={mats.purpleOrb}>
        <sphereGeometry args={[1, 16, 16]} />
      </mesh>

      {/* ======================================================== */}
      {/* 3. RIGHT SIDE: MINIATURE LAPTOP (MACBOOK STYLE) */}
      {/* ======================================================== */}
      <group ref={laptopRef} position={[0.88, 0.72, 0.15]} scale={0.24}>
        {/* Laptop Base (Keyboard half) */}
        <mesh position={[0, 0, 0]} material={mats.laptopSilver}>
          <boxGeometry args={[1.1, 0.035, 0.8]} />
        </mesh>
        {/* Dark Keyboard area */}
        <mesh position={[0, 0.02, -0.06]} material={mats.badgeDark}>
          <boxGeometry args={[0.88, 0.01, 0.48]} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.02, 0.25]} material={mats.laptopSilver}>
          <boxGeometry args={[0.34, 0.01, 0.22]} />
        </mesh>

        {/* Laptop Display (Tilted open at ~115 degrees) */}
        <group position={[0, 0.02, -0.38]} rotation={[-1.1, 0, 0]}>
          {/* Display Back Lid */}
          <mesh position={[0, 0.38, -0.015]} material={mats.laptopSilver}>
            <boxGeometry args={[1.1, 0.76, 0.03]} />
          </mesh>
          {/* Glowing Display Screen */}
          <mesh position={[0, 0.38, 0.005]} material={mats.laptopScreen}>
            <boxGeometry args={[1.02, 0.68, 0.01]} />
          </mesh>
          {/* Little Apple-style Glowing Logo on back */}
          <mesh position={[0, 0.38, -0.032]} material={mats.symbolWhite}>
            <circleGeometry args={[0.05, 16]} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 4. RIGHT SIDE: REACT ATOM LOGO EMBLEM */}
      {/* ======================================================== */}
      <group ref={reactLogoRef} position={[0.88, 0.1, 0.22]} scale={0.23}>
        {/* Badge backplate */}
        <mesh material={mats.badgeDark}>
          <boxGeometry args={[1.1, 1.1, 0.22]} />
        </mesh>
        {/* Central glowing nucleus sphere */}
        <mesh position={[0, 0, 0.14]} material={mats.reactGlow}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
        {/* Ring 1: Horizontal */}
        <mesh position={[0, 0, 0.14]} material={mats.reactGlow}>
          <torusGeometry args={[0.34, 0.025, 12, 36]} />
        </mesh>
        {/* Ring 2: Tilted 60 deg */}
        <mesh position={[0, 0, 0.14]} rotation={[0, 0, Math.PI / 3]} material={mats.reactGlow}>
          <torusGeometry args={[0.34, 0.025, 12, 36]} />
        </mesh>
        {/* Ring 3: Tilted -60 deg */}
        <mesh position={[0, 0, 0.14]} rotation={[0, 0, -Math.PI / 3]} material={mats.reactGlow}>
          <torusGeometry args={[0.34, 0.025, 12, 36]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 5. RIGHT SIDE: TYPESCRIPT `TS` BADGE TILE */}
      {/* ======================================================== */}
      <group ref={tsTileRef} position={[0.85, -0.4, 0.25]} scale={0.23}>
        {/* Blue Squircle Base */}
        <mesh material={mats.tsBlue}>
          <boxGeometry args={[1.05, 1.05, 0.22]} />
        </mesh>
        {/* White 'T' letter */}
        <group position={[-0.18, 0, 0.12]}>
          <mesh position={[0, 0.2, 0]} material={mats.symbolWhite}>
            <boxGeometry args={[0.26, 0.06, 0.02]} />
          </mesh>
          <mesh position={[0, 0.04, 0]} material={mats.symbolWhite}>
            <boxGeometry args={[0.07, 0.28, 0.02]} />
          </mesh>
        </group>
        {/* White 'S' letter */}
        <group position={[0.18, 0.04, 0.12]}>
          <mesh position={[0, 0.16, 0]} material={mats.symbolWhite}>
            <boxGeometry args={[0.22, 0.05, 0.02]} />
          </mesh>
          <mesh position={[-0.08, 0.09, 0]} material={mats.symbolWhite}>
            <boxGeometry args={[0.06, 0.1, 0.02]} />
          </mesh>
          <mesh position={[0, 0.02, 0]} material={mats.symbolWhite}>
            <boxGeometry args={[0.22, 0.05, 0.02]} />
          </mesh>
          <mesh position={[0.08, -0.05, 0]} material={mats.symbolWhite}>
            <boxGeometry args={[0.06, 0.1, 0.02]} />
          </mesh>
          <mesh position={[0, -0.12, 0]} material={mats.symbolWhite}>
            <boxGeometry args={[0.22, 0.05, 0.02]} />
          </mesh>
        </group>
      </group>

      {/* Floating Purple Glass Cube (Lower-Right) */}
      <group ref={rightCubeRef} position={[0.88, -0.74, 0.22]} scale={0.14}>
        <mesh material={mats.purpleGlass}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </group>

      {/* Floating Small Purple Orb (Lower-Right) */}
      <mesh ref={orb2Ref} position={[1.05, -0.62, 0.3]} scale={0.055} material={mats.purpleOrb}>
        <sphereGeometry args={[1, 16, 16]} />
      </mesh>
    </group>
  );
}
