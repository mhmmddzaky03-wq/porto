import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CharacterModel - "Dzaky Edition"
 * Premium 3D Collectible Designer Vinyl Toy Character.
 *
 * Visual Features:
 * - Cute stylized vinyl toy proportions with slightly oversized head
 * - Fluffy curly black hairstyle sculpted from soft volumetric puffs
 * - Warm medium tan vinyl skin tone with soft satin sheen
 * - Subtle thin mustache & friendly expressive face
 * - Polished silver royal crown with miniature colorful embedded gems
 * - Dark gray formal suit jacket, crisp white collared shirt, and black necktie
 *
 * Motion Capabilities:
 * - Independent smooth head tracking (yaw, pitch, roll) following the cursor
 * - Agile eye gaze tracking cursor independently with dual glossy catchlights
 * - Procedural eyelid blinking mechanism (every 3-6s)
 * - Rhythmic idle breathing (chest expansion, shoulder lift, subtle body float)
 * - Natural organic micro-life ensuring the toy feels alive at all times
 */
export default function CharacterModel({ pointer }) {
  // References for bone/group hierarchy
  const rootGroupRef = useRef(null);
  const torsoGroupRef = useRef(null);
  const neckPivotRef = useRef(null);
  const headGroupRef = useRef(null);
  const crownGroupRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftEyelidRef = useRef(null);
  const rightEyelidRef = useRef(null);
  const leftShoulderRef = useRef(null);
  const rightShoulderRef = useRef(null);

  // Blink state tracking
  const blinkState = useRef({
    nextBlinkTime: 2.5,
    blinkDuration: 0.15,
    isBlinking: false,
    blinkProgress: 0,
  });

  // Reusable materials memoized for peak WebGL performance
  const materials = useMemo(() => {
    return {
      // Warm medium tan skin with soft vinyl luster
      vinylSkin: new THREE.MeshStandardMaterial({
        color: '#CF9367',
        roughness: 0.38,
        metalness: 0.04,
      }),
      // Cheeks subtle warm blush
      blush: new THREE.MeshStandardMaterial({
        color: '#D97757',
        roughness: 0.5,
        transparent: true,
        opacity: 0.35,
      }),
      // Fluffy black curly hairstyle
      hair: new THREE.MeshStandardMaterial({
        color: '#11141A',
        roughness: 0.45,
        metalness: 0.2,
      }),
      // Polished Silver Royal Crown
      crownSilver: new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        roughness: 0.15,
        metalness: 0.95,
      }),
      // Crown Colorful Gems
      gemRuby: new THREE.MeshStandardMaterial({
        color: '#EF4444',
        emissive: '#EF4444',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.8,
      }),
      gemEmerald: new THREE.MeshStandardMaterial({
        color: '#10B981',
        emissive: '#10B981',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.8,
      }),
      gemSapphire: new THREE.MeshStandardMaterial({
        color: '#3B82F6',
        emissive: '#3B82F6',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.8,
      }),
      gemAmethyst: new THREE.MeshStandardMaterial({
        color: '#A855F7',
        emissive: '#A855F7',
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.8,
      }),
      gemTopaz: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        emissive: '#F59E0B',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.8,
      }),
      // Dark Gray Formal Suit Jacket
      suitDarkGray: new THREE.MeshStandardMaterial({
        color: '#262B35',
        roughness: 0.55,
        metalness: 0.15,
      }),
      suitLapel: new THREE.MeshStandardMaterial({
        color: '#1C212B',
        roughness: 0.5,
        metalness: 0.2,
      }),
      // Crisp White Collared Dress Shirt
      shirtWhite: new THREE.MeshStandardMaterial({
        color: '#F8FAFC',
        roughness: 0.4,
        metalness: 0.05,
      }),
      // Sleek Black Formal Necktie
      tieBlack: new THREE.MeshStandardMaterial({
        color: '#0A0D14',
        roughness: 0.25,
        metalness: 0.4,
      }),
      // Eyes (Glossy Designer Toy Sclera & Pupils)
      eyeWhite: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.08,
        metalness: 0.0,
      }),
      eyeIris: new THREE.MeshStandardMaterial({
        color: '#0B111E',
        roughness: 0.1,
        metalness: 0.2,
      }),
      eyePupil: new THREE.MeshBasicMaterial({
        color: '#020617',
      }),
      eyeCatchlight: new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
      // Subtle Thin Mustache & Eyebrows
      facialHair: new THREE.MeshStandardMaterial({
        color: '#0A0D14',
        roughness: 0.6,
        metalness: 0.1,
      }),
      // Gentle Smile Mouth
      mouth: new THREE.MeshBasicMaterial({
        color: '#6E3F33',
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;

    // ----------------------------------------------------
    // 1. Natural Idle Breathing & Designer Toy Micro-Float
    // ----------------------------------------------------
    const breathCycle = Math.sin(t * 1.8);
    const microLifeX = Math.sin(t * 0.7) * 0.02;
    const microLifeY = Math.cos(t * 0.9) * 0.012;

    // Torso breathing lift and subtle chest expansion
    if (torsoGroupRef.current) {
      torsoGroupRef.current.position.y = -0.16 + breathCycle * 0.012;
      torsoGroupRef.current.scale.y = 1 + breathCycle * 0.008;

      // Torso follows mouse horizontally with damped toy inertia
      const targetTorsoYaw = px * 0.16 + microLifeX * 0.4;
      const targetTorsoPitch = -py * 0.08 + microLifeY * 0.4;
      torsoGroupRef.current.rotation.y = THREE.MathUtils.damp(torsoGroupRef.current.rotation.y, targetTorsoYaw, 2.8, delta);
      torsoGroupRef.current.rotation.x = THREE.MathUtils.damp(torsoGroupRef.current.rotation.x, targetTorsoPitch, 2.8, delta);
    }

    // Shoulders lift with chest
    if (leftShoulderRef.current && rightShoulderRef.current) {
      const shoulderLift = breathCycle * 0.006;
      leftShoulderRef.current.position.y = 0.35 + shoulderLift;
      rightShoulderRef.current.position.y = 0.35 + shoulderLift;
    }

    // ----------------------------------------------------
    // 2. Independent Head Movement (Oversized Toy Head)
    // ----------------------------------------------------
    if (headGroupRef.current) {
      // Head yaw (horizontal look): up to ~32 degrees
      const targetHeadYaw = px * 0.54 + microLifeX;
      // Head pitch (vertical look): up to ~20 degrees
      const targetHeadPitch = -py * 0.32 + microLifeY;
      // Head roll (cute toy head tilt into movement direction)
      const targetHeadRoll = -px * 0.09;

      headGroupRef.current.rotation.y = THREE.MathUtils.damp(headGroupRef.current.rotation.y, targetHeadYaw, 6.0, delta);
      headGroupRef.current.rotation.x = THREE.MathUtils.damp(headGroupRef.current.rotation.x, targetHeadPitch, 6.0, delta);
      headGroupRef.current.rotation.z = THREE.MathUtils.damp(headGroupRef.current.rotation.z, targetHeadRoll, 5.0, delta);
    }

    // Subtle crown idle shimmer
    if (crownGroupRef.current) {
      crownGroupRef.current.rotation.y = Math.sin(t * 0.8) * 0.04;
    }

    // ----------------------------------------------------
    // 3. Dynamic Eye Tracking (Lead the gaze toward cursor)
    // ----------------------------------------------------
    const eyeTargetYaw = px * 0.38;
    const eyeTargetPitch = -py * 0.32;

    if (leftEyeRef.current) {
      leftEyeRef.current.rotation.y = THREE.MathUtils.damp(leftEyeRef.current.rotation.y, eyeTargetYaw, 15.0, delta);
      leftEyeRef.current.rotation.x = THREE.MathUtils.damp(leftEyeRef.current.rotation.x, eyeTargetPitch, 15.0, delta);
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.rotation.y = THREE.MathUtils.damp(rightEyeRef.current.rotation.y, eyeTargetYaw, 15.0, delta);
      rightEyeRef.current.rotation.x = THREE.MathUtils.damp(rightEyeRef.current.rotation.x, eyeTargetPitch, 15.0, delta);
    }

    // ----------------------------------------------------
    // 4. Procedural Eyelid Blink Engine
    // ----------------------------------------------------
    const blink = blinkState.current;
    if (t > blink.nextBlinkTime) {
      blink.isBlinking = true;
      blink.blinkProgress = 0;
      blink.nextBlinkTime = t + 3.0 + Math.random() * 3.0;
    }

    if (blink.isBlinking) {
      blink.blinkProgress += delta / blink.blinkDuration;
      let eyelidScaleY = 0;

      if (blink.blinkProgress <= 0.5) {
        eyelidScaleY = blink.blinkProgress * 2;
      } else if (blink.blinkProgress <= 1.0) {
        eyelidScaleY = (1.0 - blink.blinkProgress) * 2;
      } else {
        blink.isBlinking = false;
        eyelidScaleY = 0;
      }

      if (leftEyelidRef.current && rightEyelidRef.current) {
        leftEyelidRef.current.scale.y = eyelidScaleY;
        rightEyelidRef.current.scale.y = eyelidScaleY;
      }
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, -0.54, 0]} scale={1.08}>
      {/* ======================================================== */}
      {/* TORSO & FORMAL SUIT ATTIRE */}
      {/* ======================================================== */}
      <group ref={torsoGroupRef}>
        {/* Main Torso / Dark Gray Formal Suit Jacket */}
        <mesh position={[0, -0.22, -0.04]} material={materials.suitDarkGray}>
          <cylinderGeometry args={[0.52, 0.42, 0.72, 24]} />
        </mesh>

        {/* Crisp White Collared Dress Shirt (V-neck opening) */}
        <mesh position={[0, 0.02, 0.18]} rotation={[-0.1, 0, 0]} material={materials.shirtWhite}>
          <boxGeometry args={[0.26, 0.38, 0.08]} />
        </mesh>

        {/* Left Suit Lapel */}
        <mesh position={[-0.14, 0.04, 0.22]} rotation={[0.08, 0.15, -0.22]} material={materials.suitLapel}>
          <boxGeometry args={[0.11, 0.38, 0.04]} />
        </mesh>

        {/* Right Suit Lapel */}
        <mesh position={[0.14, 0.04, 0.22]} rotation={[0.08, -0.15, 0.22]} material={materials.suitLapel}>
          <boxGeometry args={[0.11, 0.38, 0.04]} />
        </mesh>

        {/* Formal Black Necktie Knot */}
        <mesh position={[0, 0.14, 0.23]} material={materials.tieBlack}>
          <boxGeometry args={[0.065, 0.055, 0.04]} />
        </mesh>

        {/* Formal Black Necktie Body */}
        <mesh position={[0, -0.04, 0.235]} rotation={[0.08, 0, 0]} material={materials.tieBlack}>
          <cylinderGeometry args={[0.04, 0.065, 0.32, 12]} />
        </mesh>

        {/* Left Shoulder & Suit Sleeve */}
        <group ref={leftShoulderRef} position={[-0.54, 0.12, -0.04]} rotation={[0, 0, 0.22]}>
          <mesh material={materials.suitDarkGray}>
            <sphereGeometry args={[0.19, 16, 16]} />
          </mesh>
          <mesh position={[-0.1, -0.3, 0.05]} rotation={[0, 0, 0.15]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.15, 0.12, 0.54, 16]} />
          </mesh>
          {/* White shirt cuff */}
          <mesh position={[-0.14, -0.58, 0.08]} material={materials.shirtWhite}>
            <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
          </mesh>
          {/* Cute rounded vinyl hand */}
          <mesh position={[-0.15, -0.66, 0.09]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.09, 16, 16]} />
          </mesh>
        </group>

        {/* Right Shoulder & Suit Sleeve */}
        <group ref={rightShoulderRef} position={[0.54, 0.12, -0.04]} rotation={[0, 0, -0.22]}>
          <mesh material={materials.suitDarkGray}>
            <sphereGeometry args={[0.19, 16, 16]} />
          </mesh>
          <mesh position={[0.1, -0.3, 0.05]} rotation={[0, 0, -0.15]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.15, 0.12, 0.54, 16]} />
          </mesh>
          {/* White shirt cuff */}
          <mesh position={[0.14, -0.58, 0.08]} material={materials.shirtWhite}>
            <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
          </mesh>
          {/* Cute rounded vinyl hand */}
          <mesh position={[0.15, -0.66, 0.09]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.09, 16, 16]} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* NECK PIVOT & OVERSIZED VINYL TOY HEAD */}
      {/* ======================================================== */}
      <group ref={neckPivotRef} position={[0, 0.36, 0]}>
        {/* Cute Vinyl Toy Neck */}
        <mesh position={[0, 0.05, 0]} material={materials.vinylSkin}>
          <cylinderGeometry args={[0.16, 0.18, 0.18, 20]} />
        </mesh>

        {/* Rotatable Head Group */}
        <group ref={headGroupRef} position={[0, 0.28, 0]}>
          {/* Slightly Oversized Head (Cute Vinyl Toy Proportions) */}
          <mesh position={[0, 0.12, 0]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.45, 32, 28]} />
          </mesh>

          {/* Cute Chubby Cheeks & Chin Volume */}
          <mesh position={[0, -0.06, 0.12]} rotation={[0.25, 0, 0]} material={materials.vinylSkin}>
            <coneGeometry args={[0.34, 0.38, 24]} />
          </mesh>

          {/* Left Ear */}
          <mesh position={[-0.45, 0.1, -0.02]} rotation={[0, 0.2, -0.1]} material={materials.vinylSkin}>
            <capsuleGeometry args={[0.055, 0.12, 8, 12]} />
          </mesh>
          {/* Right Ear */}
          <mesh position={[0.45, 0.1, -0.02]} rotation={[0, -0.2, 0.1]} material={materials.vinylSkin}>
            <capsuleGeometry args={[0.055, 0.12, 8, 12]} />
          </mesh>

          {/* Left Cheek Warm Blush */}
          <mesh position={[-0.24, 0.02, 0.39]} rotation={[0, -0.2, 0]} material={materials.blush}>
            <circleGeometry args={[0.06, 16]} />
          </mesh>
          {/* Right Cheek Warm Blush */}
          <mesh position={[0.24, 0.02, 0.39]} rotation={[0, 0.2, 0]} material={materials.blush}>
            <circleGeometry args={[0.06, 16]} />
          </mesh>

          {/* ======================================================== */}
          {/* FLUFFY BLACK CURLY HAIRSTYLE */}
          {/* Sculpted volumetric curly puffs framing the head */}
          {/* ======================================================== */}
          <group position={[0, 0.16, -0.02]}>
            {/* Core Hair Cap */}
            <mesh position={[0, 0.15, -0.05]} material={materials.hair}>
              <sphereGeometry args={[0.46, 24, 20]} />
            </mesh>

            {/* Volumetric Curly Puffs (Front & Forehead Fringe) */}
            <mesh position={[0, 0.28, 0.34]} material={materials.hair}>
              <sphereGeometry args={[0.15, 14, 14]} />
            </mesh>
            <mesh position={[-0.18, 0.26, 0.32]} material={materials.hair}>
              <sphereGeometry args={[0.15, 14, 14]} />
            </mesh>
            <mesh position={[0.18, 0.26, 0.32]} material={materials.hair}>
              <sphereGeometry args={[0.15, 14, 14]} />
            </mesh>
            <mesh position={[-0.32, 0.22, 0.24]} material={materials.hair}>
              <sphereGeometry args={[0.14, 14, 14]} />
            </mesh>
            <mesh position={[0.32, 0.22, 0.24]} material={materials.hair}>
              <sphereGeometry args={[0.14, 14, 14]} />
            </mesh>

            {/* Crown Volume Fluffy Puffs */}
            <mesh position={[0, 0.44, 0.12]} material={materials.hair}>
              <sphereGeometry args={[0.18, 16, 16]} />
            </mesh>
            <mesh position={[-0.2, 0.42, 0.08]} material={materials.hair}>
              <sphereGeometry args={[0.17, 16, 16]} />
            </mesh>
            <mesh position={[0.2, 0.42, 0.08]} material={materials.hair}>
              <sphereGeometry args={[0.17, 16, 16]} />
            </mesh>
            <mesh position={[-0.15, 0.45, -0.12]} material={materials.hair}>
              <sphereGeometry args={[0.17, 16, 16]} />
            </mesh>
            <mesh position={[0.15, 0.45, -0.12]} material={materials.hair}>
              <sphereGeometry args={[0.17, 16, 16]} />
            </mesh>

            {/* Sideburns & Temple Puffs */}
            <mesh position={[-0.42, 0.06, 0.08]} material={materials.hair}>
              <sphereGeometry args={[0.13, 14, 14]} />
            </mesh>
            <mesh position={[0.42, 0.06, 0.08]} material={materials.hair}>
              <sphereGeometry args={[0.13, 14, 14]} />
            </mesh>
            <mesh position={[-0.44, -0.06, 0.04]} material={materials.hair}>
              <boxGeometry args={[0.06, 0.14, 0.1]} />
            </mesh>
            <mesh position={[0.44, -0.06, 0.04]} material={materials.hair}>
              <boxGeometry args={[0.06, 0.14, 0.1]} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* SILVER ROYAL CROWN WITH SMALL COLORFUL GEMS */}
          {/* ======================================================== */}
          <group ref={crownGroupRef} position={[0, 0.65, 0.02]} rotation={[0.08, 0, -0.05]} scale={0.34}>
            {/* Crown Base Band Ring */}
            <mesh material={materials.crownSilver}>
              <cylinderGeometry args={[0.62, 0.58, 0.18, 32]} />
            </mesh>
            {/* Lower Band Rim */}
            <mesh position={[0, -0.09, 0]} material={materials.crownSilver}>
              <torusGeometry args={[0.6, 0.035, 12, 32]} />
            </mesh>

            {/* 5 Royal Crown Spikes / Peaks */}
            {/* Peak 1: Center Front */}
            <mesh position={[0, 0.32, 0.58]} rotation={[-0.15, 0, 0]} material={materials.crownSilver}>
              <coneGeometry args={[0.14, 0.46, 16]} />
            </mesh>
            <mesh position={[0, 0.55, 0.56]} material={materials.crownSilver}>
              <sphereGeometry args={[0.045, 12, 12]} />
            </mesh>
            {/* Gem: Center Ruby */}
            <mesh position={[0, 0.16, 0.64]} material={materials.gemRuby}>
              <octahedronGeometry args={[0.06, 0]} />
            </mesh>

            {/* Peak 2: Front-Left */}
            <mesh position={[-0.48, 0.28, 0.35]} rotation={[-0.1, -0.35, 0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.13, 0.42, 16]} />
            </mesh>
            <mesh position={[-0.52, 0.48, 0.38]} material={materials.crownSilver}>
              <sphereGeometry args={[0.04, 12, 12]} />
            </mesh>
            {/* Gem: Emerald */}
            <mesh position={[-0.46, 0.14, 0.42]} material={materials.gemEmerald}>
              <octahedronGeometry args={[0.055, 0]} />
            </mesh>

            {/* Peak 3: Front-Right */}
            <mesh position={[0.48, 0.28, 0.35]} rotation={[-0.1, 0.35, -0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.13, 0.42, 16]} />
            </mesh>
            <mesh position={[0.52, 0.48, 0.38]} material={materials.crownSilver}>
              <sphereGeometry args={[0.04, 12, 12]} />
            </mesh>
            {/* Gem: Sapphire */}
            <mesh position={[0.46, 0.14, 0.42]} material={materials.gemSapphire}>
              <octahedronGeometry args={[0.055, 0]} />
            </mesh>

            {/* Peak 4: Back-Left */}
            <mesh position={[-0.42, 0.26, -0.42]} rotation={[0.12, -0.3, 0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.12, 0.38, 16]} />
            </mesh>
            {/* Gem: Amethyst */}
            <mesh position={[-0.45, 0.14, -0.38]} material={materials.gemAmethyst}>
              <octahedronGeometry args={[0.05, 0]} />
            </mesh>

            {/* Peak 5: Back-Right */}
            <mesh position={[0.42, 0.26, -0.42]} rotation={[0.12, 0.3, -0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.12, 0.38, 16]} />
            </mesh>
            {/* Gem: Topaz */}
            <mesh position={[0.45, 0.14, -0.38]} material={materials.gemTopaz}>
              <octahedronGeometry args={[0.05, 0]} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* FRIENDLY EXPRESSIVE FACE & SUBTLE THIN MUSTACHE */}
          {/* ======================================================== */}
      {/* Eyebrows (Neat Curved & Expressive Horizontal Capsules) */}
      <mesh position={[-0.16, 0.23, 0.41]} rotation={[0, 0, Math.PI / 2 - 0.12]} material={materials.facialHair}>
        <capsuleGeometry args={[0.014, 0.11, 6, 8]} />
      </mesh>
      <mesh position={[0.16, 0.23, 0.41]} rotation={[0, 0, -(Math.PI / 2 - 0.12)]} material={materials.facialHair}>
        <capsuleGeometry args={[0.014, 0.11, 6, 8]} />
      </mesh>

      {/* Cute Stylized Nose */}
      <mesh position={[0, 0.09, 0.44]} rotation={[-0.12, 0, 0]} material={materials.vinylSkin}>
        <coneGeometry args={[0.042, 0.11, 16]} />
      </mesh>

      {/* SUBTLE THIN MUSTACHE (Horizontal gentle wings above upper lip) */}
      <group position={[0, 0.0, 0.44]}>
        {/* Left mustache wing */}
        <mesh position={[-0.055, 0, 0]} rotation={[0, 0, Math.PI / 2 + 0.15]} material={materials.facialHair}>
          <capsuleGeometry args={[0.012, 0.075, 6, 8]} />
        </mesh>
        {/* Right mustache wing */}
        <mesh position={[0.055, 0, 0]} rotation={[0, 0, -(Math.PI / 2 + 0.15)]} material={materials.facialHair}>
          <capsuleGeometry args={[0.012, 0.075, 6, 8]} />
        </mesh>
        {/* Center connection point */}
        <mesh position={[0, 0.005, 0.005]} material={materials.facialHair}>
          <sphereGeometry args={[0.013, 8, 8]} />
        </mesh>
      </group>

      {/* Friendly Gentle Smile Mouth */}
      <mesh position={[0, -0.065, 0.42]} rotation={[0, 0, 0]} material={materials.mouth}>
        <capsuleGeometry args={[0.01, 0.09, 6, 8]} />
      </mesh>

      {/* ======================================================== */}
      {/* GLOSSY DESIGNER TOY EYES WITH DYNAMIC GAZE TRACKING */}
      {/* ======================================================== */}
      {/* Left Eye */}
      <group position={[-0.16, 0.11, 0.36]}>
        <group ref={leftEyeRef}>
          {/* Sclera (Glossy White Vinyl Sphere) */}
          <mesh material={materials.eyeWhite}>
            <sphereGeometry args={[0.092, 24, 24]} />
          </mesh>
          {/* Iris (Espresso / Dark Navy Designer Toy Iris) */}
          <mesh position={[0, 0, 0.062]} material={materials.eyeIris}>
            <sphereGeometry args={[0.068, 20, 20]} />
          </mesh>
          {/* Pupil (Deep Glossy Black) */}
          <mesh position={[0, 0, 0.075]} material={materials.eyePupil}>
            <sphereGeometry args={[0.045, 16, 16]} />
          </mesh>
          {/* Main Bright Specular Highlight Catchlight */}
          <mesh position={[0.024, 0.024, 0.092]} material={materials.eyeCatchlight}>
            <sphereGeometry args={[0.014, 12, 12]} />
          </mesh>
          {/* Secondary Sub-Catchlight Spark */}
          <mesh position={[-0.018, -0.016, 0.09]} material={materials.eyeCatchlight}>
            <sphereGeometry args={[0.007, 8, 8]} />
          </mesh>
        </group>

        {/* Left Upper Eyelid (Procedural Blink) */}
        <mesh ref={leftEyelidRef} position={[0, 0.042, 0.02]} scale={[1, 0, 1]} material={materials.vinylSkin}>
          <sphereGeometry args={[0.098, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Right Eye */}
      <group position={[0.16, 0.11, 0.36]}>
        <group ref={rightEyeRef}>
          {/* Sclera (Glossy White Vinyl Sphere) */}
          <mesh material={materials.eyeWhite}>
            <sphereGeometry args={[0.092, 24, 24]} />
          </mesh>
          {/* Iris (Espresso / Dark Navy Designer Toy Iris) */}
          <mesh position={[0, 0, 0.062]} material={materials.eyeIris}>
            <sphereGeometry args={[0.068, 20, 20]} />
          </mesh>
          {/* Pupil (Deep Glossy Black) */}
          <mesh position={[0, 0, 0.075]} material={materials.eyePupil}>
            <sphereGeometry args={[0.045, 16, 16]} />
          </mesh>
          {/* Main Bright Specular Highlight Catchlight */}
          <mesh position={[0.024, 0.024, 0.092]} material={materials.eyeCatchlight}>
            <sphereGeometry args={[0.014, 12, 12]} />
          </mesh>
          {/* Secondary Sub-Catchlight Spark */}
          <mesh position={[-0.018, -0.016, 0.09]} material={materials.eyeCatchlight}>
            <sphereGeometry args={[0.007, 8, 8]} />
          </mesh>
        </group>

        {/* Right Upper Eyelid (Procedural Blink) */}
        <mesh ref={rightEyelidRef} position={[0, 0.042, 0.02]} scale={[1, 0, 1]} material={materials.vinylSkin}>
          <sphereGeometry args={[0.098, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>
        </group>
      </group>
    </group>
  );
}
