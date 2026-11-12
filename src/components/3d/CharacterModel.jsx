import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CharacterModel — "Dzaky Edition" Designer Vinyl Toy
 * 
 * Faithfully crafted based on public/references/avatar-reference.png:
 * - Seated in a futuristic sleek pod/egg chair on a glowing neon purple pedestal
 * - Charismatic crossed-leg sitting pose with right hand resting thoughtfully under chin
 * - Cute oversized vinyl toy proportions with warm tan skin (#CF9367)
 * - Sculpted fluffy black curly hair with soft volumetric curls
 * - Polished silver royal crown with colorful cabochon gems (ruby, emerald, sapphire, topaz)
 * - Tailored dark gray formal suit jacket, white collared shirt, black tie, and pocket square
 * - Stylish black & white designer sneakers
 * - Smooth cursor-tracking head rotation & independent eye gaze tracking
 * - Natural idle breathing and procedural eyelid blinking
 */
export default function CharacterModel({ pointer }) {
  // Animation & Group Refs
  const rootGroupRef = useRef(null);
  const headGroupRef = useRef(null);
  const crownGroupRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftEyelidRef = useRef(null);
  const rightEyelidRef = useRef(null);
  const torsoGroupRef = useRef(null);
  const rightArmGroupRef = useRef(null);

  // Eyelid blink state
  const blinkStateRef = useRef({
    isBlinking: false,
    nextBlinkTime: 2.5,
    blinkProgress: 0,
    blinkDuration: 0.16,
  });

  // Reusable memoized materials
  const materials = useMemo(() => {
    return {
      // Warm medium tan skin with soft satin vinyl sheen
      vinylSkin: new THREE.MeshStandardMaterial({
        color: '#CF9367',
        roughness: 0.42,
        metalness: 0.05,
      }),
      // Cheeks warm blush
      blush: new THREE.MeshBasicMaterial({
        color: '#E07A5F',
        transparent: true,
        opacity: 0.35,
      }),
      // Fluffy Black Hair (soft matte vinyl)
      hair: new THREE.MeshStandardMaterial({
        color: '#12141A',
        roughness: 0.75,
        metalness: 0.05,
      }),
      // Polished Silver Royal Crown
      crownSilver: new THREE.MeshStandardMaterial({
        color: '#E8ECF2',
        roughness: 0.15,
        metalness: 0.95,
      }),
      // Crown Gems
      gemRuby: new THREE.MeshStandardMaterial({
        color: '#FF2A4B',
        emissive: '#DC2626',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.3,
      }),
      gemEmerald: new THREE.MeshStandardMaterial({
        color: '#10B981',
        emissive: '#059669',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.3,
      }),
      gemSapphire: new THREE.MeshStandardMaterial({
        color: '#3B82F6',
        emissive: '#2563EB',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.3,
      }),
      gemTopaz: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        emissive: '#D97706',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.3,
      }),
      // Tailored Dark Gray Formal Suit
      suitDarkGray: new THREE.MeshStandardMaterial({
        color: '#222631',
        roughness: 0.5,
        metalness: 0.12,
      }),
      suitLapel: new THREE.MeshStandardMaterial({
        color: '#1A1E27',
        roughness: 0.35,
        metalness: 0.25,
      }),
      // Crisp White Collared Dress Shirt & Pocket Square
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
        color: '#0D1424',
        roughness: 0.1,
        metalness: 0.25,
      }),
      eyePupil: new THREE.MeshBasicMaterial({
        color: '#020408',
      }),
      eyeCatchlight: new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
      // Subtle Thin Mustache & Eyebrows
      facialHair: new THREE.MeshStandardMaterial({
        color: '#0D111A',
        roughness: 0.6,
        metalness: 0.1,
      }),
      // Gentle Smile Mouth
      mouth: new THREE.MeshBasicMaterial({
        color: '#5C3127',
      }),
      // Futuristic Egg Chair Outer Shell (Sleek Obsidian Black)
      chairShell: new THREE.MeshStandardMaterial({
        color: '#11141E',
        roughness: 0.3,
        metalness: 0.65,
        side: THREE.DoubleSide,
      }),
      // Egg Chair Inner Cushion (Plush Dark Velvet)
      chairCushion: new THREE.MeshStandardMaterial({
        color: '#0D1017',
        roughness: 0.7,
        metalness: 0.1,
        side: THREE.DoubleSide,
      }),
      // Pedestal Base (Dark Brushed Titanium)
      pedestalBase: new THREE.MeshStandardMaterial({
        color: '#181C26',
        roughness: 0.28,
        metalness: 0.85,
      }),
      // Neon Purple LED Ring
      neonPurple: new THREE.MeshStandardMaterial({
        color: '#C084FC',
        emissive: '#A855F7',
        emissiveIntensity: 2.2,
        roughness: 0.1,
      }),
      // Designer Sneakers
      sneakerBlack: new THREE.MeshStandardMaterial({
        color: '#141822',
        roughness: 0.4,
        metalness: 0.1,
      }),
      sneakerWhite: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.35,
        metalness: 0.05,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;

    // ----------------------------------------------------
    // 1. Natural Idle Breathing & Micro-Life
    // ----------------------------------------------------
    const breathCycle = Math.sin(t * 1.8);
    const microLifeX = Math.sin(t * 0.7) * 0.015;
    const microLifeY = Math.cos(t * 0.9) * 0.01;

    // Torso breathing lift
    if (torsoGroupRef.current) {
      torsoGroupRef.current.position.y = 0.28 + breathCycle * 0.008;
      const targetTorsoYaw = px * 0.12 + microLifeX * 0.5;
      torsoGroupRef.current.rotation.y = THREE.MathUtils.damp(
        torsoGroupRef.current.rotation.y,
        targetTorsoYaw,
        2.5,
        delta
      );
    }

    // Right arm subtle breathing compensation
    if (rightArmGroupRef.current) {
      rightArmGroupRef.current.rotation.z = -0.05 + breathCycle * 0.008;
    }

    // ----------------------------------------------------
    // 2. Head Tracking (Follows Mouse with Toy Damping)
    // ----------------------------------------------------
    if (headGroupRef.current) {
      const targetHeadYaw = px * 0.48 + microLifeX;
      const targetHeadPitch = -py * 0.28 + microLifeY;
      const targetHeadRoll = -px * 0.08;

      headGroupRef.current.rotation.y = THREE.MathUtils.damp(
        headGroupRef.current.rotation.y,
        targetHeadYaw,
        5.5,
        delta
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.damp(
        headGroupRef.current.rotation.x,
        targetHeadPitch,
        5.5,
        delta
      );
      headGroupRef.current.rotation.z = THREE.MathUtils.damp(
        headGroupRef.current.rotation.z,
        targetHeadRoll,
        4.5,
        delta
      );
    }

    // Subtle crown idle shimmer
    if (crownGroupRef.current) {
      crownGroupRef.current.rotation.y = Math.sin(t * 0.7) * 0.03;
    }

    // ----------------------------------------------------
    // 3. Independent Eye Gaze Tracking
    // ----------------------------------------------------
    const eyeTargetYaw = px * 0.32;
    const eyeTargetPitch = -py * 0.26;

    if (leftEyeRef.current) {
      leftEyeRef.current.rotation.y = THREE.MathUtils.damp(
        leftEyeRef.current.rotation.y,
        eyeTargetYaw,
        9.0,
        delta
      );
      leftEyeRef.current.rotation.x = THREE.MathUtils.damp(
        leftEyeRef.current.rotation.x,
        eyeTargetPitch,
        9.0,
        delta
      );
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.rotation.y = THREE.MathUtils.damp(
        rightEyeRef.current.rotation.y,
        eyeTargetYaw,
        9.0,
        delta
      );
      rightEyeRef.current.rotation.x = THREE.MathUtils.damp(
        rightEyeRef.current.rotation.x,
        eyeTargetPitch,
        9.0,
        delta
      );
    }

    // ----------------------------------------------------
    // 4. Procedural Eyelid Blinking
    // ----------------------------------------------------
    const blink = blinkStateRef.current;
    if (!blink.isBlinking && t >= blink.nextBlinkTime) {
      blink.isBlinking = true;
      blink.blinkProgress = 0;
      blink.nextBlinkTime = t + 2.5 + Math.random() * 3.5;
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
    <group ref={rootGroupRef} position={[0, -0.42, 0]} scale={0.88}>
      {/* ======================================================== */}
      {/* 1. GLOWING CIRCULAR PEDESTAL & DISPLAY BASE */}
      {/* ======================================================== */}
      <group position={[0, -0.85, 0]}>
        {/* Tier 1: Wide Bottom Plinth */}
        <mesh position={[0, -0.06, 0]} material={materials.pedestalBase}>
          <cylinderGeometry args={[1.45, 1.55, 0.1, 40]} />
        </mesh>
        {/* Glowing Neon Purple LED Ring */}
        <mesh position={[0, -0.01, 0]} material={materials.neonPurple}>
          <torusGeometry args={[1.42, 0.026, 16, 48]} />
        </mesh>
        {/* Tier 2: Step-Up Disc */}
        <mesh position={[0, 0.04, 0]} material={materials.pedestalBase}>
          <cylinderGeometry args={[1.2, 1.28, 0.09, 36]} />
        </mesh>
        {/* Chrome Chair Support Stem */}
        <mesh position={[0, 0.28, 0]} material={materials.crownSilver}>
          <cylinderGeometry args={[0.08, 0.12, 0.42, 24]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. FUTURISTIC SLEEK EGG / POD CHAIR (Open forward scoop) */}
      {/* ======================================================== */}
      <group position={[0, -0.1, -0.22]} rotation={[-0.22, 0, 0]}>
        {/* Smooth Dark Hollow Cup Shell (Opens toward +Z) */}
        <mesh rotation={[-Math.PI / 2 + 0.18, 0, 0]} material={materials.chairShell}>
          <sphereGeometry args={[0.88, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        </mesh>
        {/* Outer Shell Glowing Purple/Dark Rim */}
        <mesh position={[0, 0.12, 0.16]} rotation={[0.42, 0, 0]} material={materials.suitLapel}>
          <torusGeometry args={[0.86, 0.035, 16, 40]} />
        </mesh>
        {/* Plush Dark Inner Cushion Base */}
        <mesh position={[0, -0.16, 0.1]} material={materials.chairCushion}>
          <cylinderGeometry args={[0.48, 0.44, 0.16, 24]} />
        </mesh>
        {/* Plush Curved Backrest Cushion */}
        <mesh position={[0, 0.18, -0.14]} scale={[0.75, 0.72, 0.35]} material={materials.chairCushion}>
          <sphereGeometry args={[0.82, 24, 20]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. SEATED BODY: CROSSED LEGS & SNEAKERS */}
      {/* ======================================================== */}
      <group position={[0, 0.12, 0.18]}>
        {/* Left Leg: Dropped down toward floor */}
        <group position={[-0.22, -0.05, 0.05]}>
          {/* Left Thigh (Dark Gray Suit Trousers) */}
          <mesh position={[0, 0.02, 0.18]} rotation={[0.95, 0, 0]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.13, 0.115, 0.42, 16]} />
          </mesh>
          {/* Left Knee */}
          <mesh position={[0, -0.16, 0.34]} material={materials.suitDarkGray}>
            <sphereGeometry args={[0.115, 16, 16]} />
          </mesh>
          {/* Left Shin going down to pedestal */}
          <mesh position={[0, -0.38, 0.36]} rotation={[-0.05, 0, 0]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.11, 0.09, 0.38, 16]} />
          </mesh>
          {/* Left Sneaker (Floor Contact) */}
          <group position={[0, -0.56, 0.42]} rotation={[0.06, 0.05, 0]}>
            {/* White Rubber Sneaker Sole */}
            <mesh position={[0, -0.02, 0.04]} material={materials.sneakerWhite}>
              <boxGeometry args={[0.16, 0.04, 0.3]} />
            </mesh>
            {/* Black Sneaker Body */}
            <mesh position={[0, 0.04, 0.02]} material={materials.sneakerBlack}>
              <boxGeometry args={[0.14, 0.08, 0.26]} />
            </mesh>
            {/* White Sneaker Toe Cap */}
            <mesh position={[0, 0.02, 0.12]} material={materials.sneakerWhite}>
              <sphereGeometry args={[0.075, 14, 14]} />
            </mesh>
            {/* White Lace Accents */}
            <mesh position={[0, 0.075, 0.02]} material={materials.sneakerWhite}>
              <boxGeometry args={[0.09, 0.015, 0.1]} />
            </mesh>
          </group>
        </group>

        {/* Right Leg: Crossed Horizontally over Left Knee */}
        <group position={[0.18, 0.04, 0.08]} rotation={[-0.12, 0.28, -0.22]}>
          {/* Right Thigh */}
          <mesh position={[-0.08, 0.04, 0.18]} rotation={[1.1, -0.35, 0.2]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.13, 0.115, 0.42, 16]} />
          </mesh>
          {/* Right Knee Pivot (Resting on left knee) */}
          <mesh position={[-0.24, -0.1, 0.36]} material={materials.suitDarkGray}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
          {/* Right Calf & Shin (Crossing over) */}
          <mesh position={[0.02, -0.16, 0.48]} rotation={[0.3, 0.8, -0.3]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.11, 0.095, 0.4, 16]} />
          </mesh>
          {/* Right Sneaker (Suspended / Crossed) */}
          <group position={[0.26, -0.22, 0.58]} rotation={[-0.2, 0.65, 0.15]}>
            {/* White Sneaker Sole */}
            <mesh position={[0, -0.02, 0.04]} material={materials.sneakerWhite}>
              <boxGeometry args={[0.16, 0.04, 0.3]} />
            </mesh>
            {/* Black Sneaker Body */}
            <mesh position={[0, 0.04, 0.02]} material={materials.sneakerBlack}>
              <boxGeometry args={[0.14, 0.08, 0.26]} />
            </mesh>
            {/* White Toe Cap */}
            <mesh position={[0, 0.02, 0.12]} material={materials.sneakerWhite}>
              <sphereGeometry args={[0.075, 14, 14]} />
            </mesh>
            {/* White Lace Accents */}
            <mesh position={[0, 0.075, 0.02]} material={materials.sneakerWhite}>
              <boxGeometry args={[0.09, 0.015, 0.1]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 4. FORMAL SUIT TORSO, ARMS & HANDS */}
      {/* ======================================================== */}
      <group ref={torsoGroupRef} position={[0, 0.24, 0]}>
        {/* Main Torso Core (Tailored Dark Gray Suit Jacket) */}
        <mesh position={[0, 0.1, -0.04]} material={materials.suitDarkGray}>
          <cylinderGeometry args={[0.34, 0.31, 0.48, 20]} />
        </mesh>

        {/* Crisp White Collared Dress Shirt (V-Opening Front) */}
        <mesh position={[0, 0.16, 0.24]} rotation={[-0.08, 0, 0]} material={materials.shirtWhite}>
          <boxGeometry args={[0.22, 0.34, 0.1]} />
        </mesh>

        {/* Left Suit Jacket Front / Lapel */}
        <mesh position={[-0.14, 0.15, 0.27]} rotation={[0.06, 0.15, -0.18]} material={materials.suitLapel}>
          <boxGeometry args={[0.11, 0.36, 0.06]} />
        </mesh>
        {/* Right Suit Jacket Front / Lapel */}
        <mesh position={[0.14, 0.15, 0.27]} rotation={[0.06, -0.15, 0.18]} material={materials.suitLapel}>
          <boxGeometry args={[0.11, 0.36, 0.06]} />
        </mesh>

        {/* White Pocket Square Handkerchief in Left Chest Pocket */}
        <mesh position={[-0.2, 0.22, 0.29]} rotation={[0.05, 0.12, 0.1]} material={materials.shirtWhite}>
          <boxGeometry args={[0.065, 0.025, 0.03]} />
        </mesh>

        {/* Formal Black Necktie Knot */}
        <mesh position={[0, 0.28, 0.31]} material={materials.tieBlack}>
          <boxGeometry args={[0.055, 0.05, 0.04]} />
        </mesh>
        {/* Formal Black Necktie Body */}
        <mesh position={[0, 0.12, 0.3]} rotation={[0.08, 0, 0]} material={materials.tieBlack}>
          <cylinderGeometry args={[0.035, 0.055, 0.28, 12]} />
        </mesh>

        {/* ---------------------------------------------------- */}
        {/* Left Arm: Resting Casually on Lap / Crossed Leg */}
        {/* ---------------------------------------------------- */}
        <group position={[-0.38, 0.22, 0.02]} rotation={[0.2, 0.1, 0.25]}>
          {/* Shoulder */}
          <mesh material={materials.suitDarkGray}>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[-0.05, -0.18, 0.06]} rotation={[0.3, 0, 0.1]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.11, 0.095, 0.36, 16]} />
          </mesh>
          {/* Forearm Angling to Knee */}
          <mesh position={[-0.04, -0.36, 0.24]} rotation={[1.1, -0.2, 0.1]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.09, 0.08, 0.34, 16]} />
          </mesh>
          {/* White Shirt Cuff */}
          <mesh position={[-0.02, -0.4, 0.38]} material={materials.shirtWhite}>
            <cylinderGeometry args={[0.075, 0.075, 0.04, 14]} />
          </mesh>
          {/* Resting Hand */}
          <mesh position={[-0.01, -0.42, 0.42]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.07, 14, 14]} />
          </mesh>
        </group>

        {/* ---------------------------------------------------- */}
        {/* Right Arm: Iconic Chin-Rest Pose (The Thinker) */}
        {/* ---------------------------------------------------- */}
        <group ref={rightArmGroupRef} position={[0.36, 0.2, 0.04]}>
          {/* Shoulder */}
          <mesh material={materials.suitDarkGray}>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
          {/* Upper Arm: Elbow brought forward and rested on knee */}
          <mesh position={[0.02, -0.16, 0.18]} rotation={[1.1, -0.25, -0.3]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.11, 0.095, 0.36, 16]} />
          </mesh>
          {/* Elbow Joint */}
          <mesh position={[0.05, -0.25, 0.34]} material={materials.suitDarkGray}>
            <sphereGeometry args={[0.1, 14, 14]} />
          </mesh>
          {/* Forearm: Angling Upward toward Chin */}
          <mesh position={[-0.08, 0.02, 0.34]} rotation={[-1.25, 0.35, 0.35]} material={materials.suitDarkGray}>
            <cylinderGeometry args={[0.09, 0.08, 0.36, 16]} />
          </mesh>
          {/* White Shirt Cuff */}
          <mesh position={[-0.15, 0.2, 0.32]} material={materials.shirtWhite}>
            <cylinderGeometry args={[0.075, 0.075, 0.04, 14]} />
          </mesh>
          {/* Right Hand: Curled softly supporting right chin/cheek */}
          <mesh position={[-0.17, 0.25, 0.34]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.075, 14, 14]} />
          </mesh>
          {/* Finger Knuckles Accent */}
          <mesh position={[-0.15, 0.27, 0.38]} material={materials.vinylSkin}>
            <capsuleGeometry args={[0.022, 0.05, 4, 8]} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 5. OVERSIZED CUTE VINYL TOY HEAD & CROWN */}
      {/* ======================================================== */}
      <group position={[0, 0.76, 0]}>
        {/* Cute Vinyl Neck */}
        <mesh position={[0, -0.04, 0]} material={materials.vinylSkin}>
          <cylinderGeometry args={[0.14, 0.16, 0.14, 20]} />
        </mesh>

        {/* Head Rotation Group (Mouse Look Tracking) */}
        <group ref={headGroupRef} position={[0, 0.18, 0]}>
          {/* Main Oversized Head (Cute Chibi Proportions) */}
          <mesh position={[0, 0.1, 0]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.45, 32, 28]} />
          </mesh>

          {/* Chubby Cheeks Volume */}
          <mesh position={[0, -0.06, 0.12]} rotation={[0.22, 0, 0]} material={materials.vinylSkin}>
            <coneGeometry args={[0.34, 0.36, 24]} />
          </mesh>

          {/* Left Ear */}
          <mesh position={[-0.44, 0.08, -0.02]} rotation={[0, 0.2, -0.1]} material={materials.vinylSkin}>
            <capsuleGeometry args={[0.05, 0.1, 8, 12]} />
          </mesh>
          {/* Right Ear */}
          <mesh position={[0.44, 0.08, -0.02]} rotation={[0, -0.2, 0.1]} material={materials.vinylSkin}>
            <capsuleGeometry args={[0.05, 0.1, 8, 12]} />
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
          {/* ======================================================== */}
          <group position={[0, 0.16, -0.02]}>
            {/* Core Hair Shell */}
            <mesh position={[0, 0.14, -0.05]} material={materials.hair}>
              <sphereGeometry args={[0.46, 24, 20]} />
            </mesh>
            {/* Forehead Front Curls & Waves */}
            <mesh position={[0, 0.3, 0.32]} material={materials.hair}>
              <sphereGeometry args={[0.18, 16, 16]} />
            </mesh>
            <mesh position={[-0.18, 0.28, 0.3]} material={materials.hair}>
              <sphereGeometry args={[0.17, 16, 16]} />
            </mesh>
            <mesh position={[0.18, 0.28, 0.3]} material={materials.hair}>
              <sphereGeometry args={[0.17, 16, 16]} />
            </mesh>
            <mesh position={[-0.32, 0.22, 0.22]} material={materials.hair}>
              <sphereGeometry args={[0.16, 14, 14]} />
            </mesh>
            <mesh position={[0.32, 0.22, 0.22]} material={materials.hair}>
              <sphereGeometry args={[0.16, 14, 14]} />
            </mesh>

            {/* Top Volumetric Hair Puffs */}
            <mesh position={[0, 0.44, 0.06]} material={materials.hair}>
              <sphereGeometry args={[0.22, 16, 16]} />
            </mesh>
            <mesh position={[-0.22, 0.42, 0.02]} material={materials.hair}>
              <sphereGeometry args={[0.2, 16, 16]} />
            </mesh>
            <mesh position={[0.22, 0.42, 0.02]} material={materials.hair}>
              <sphereGeometry args={[0.2, 16, 16]} />
            </mesh>

            {/* Side Curls framing ears */}
            <mesh position={[-0.42, 0.06, 0.08]} material={materials.hair}>
              <sphereGeometry args={[0.13, 14, 14]} />
            </mesh>
            <mesh position={[0.42, 0.06, 0.08]} material={materials.hair}>
              <sphereGeometry args={[0.13, 14, 14]} />
            </mesh>
            {/* Sideburns */}
            <mesh position={[-0.44, -0.06, 0.04]} material={materials.hair}>
              <boxGeometry args={[0.06, 0.14, 0.1]} />
            </mesh>
            <mesh position={[0.44, -0.06, 0.04]} material={materials.hair}>
              <boxGeometry args={[0.06, 0.14, 0.1]} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* SILVER ROYAL CROWN WITH COLORFUL EMBEDDED GEMS */}
          {/* ======================================================== */}
          <group ref={crownGroupRef} position={[0, 0.65, 0.02]} rotation={[0.08, 0, -0.06]} scale={0.34}>
            {/* Crown Base Band Ring */}
            <mesh material={materials.crownSilver}>
              <cylinderGeometry args={[0.62, 0.58, 0.18, 32]} />
            </mesh>
            {/* Lower Band Rim */}
            <mesh position={[0, -0.09, 0]} material={materials.crownSilver}>
              <torusGeometry args={[0.6, 0.035, 12, 32]} />
            </mesh>

            {/* Peak 1: Center Front */}
            <mesh position={[0, 0.32, 0.58]} rotation={[-0.15, 0, 0]} material={materials.crownSilver}>
              <coneGeometry args={[0.14, 0.46, 16]} />
            </mesh>
            <mesh position={[0, 0.55, 0.56]} material={materials.crownSilver}>
              <sphereGeometry args={[0.045, 12, 12]} />
            </mesh>
            {/* Gem: Center Ruby */}
            <mesh position={[0, 0.16, 0.64]} material={materials.gemRuby}>
              <octahedronGeometry args={[0.065, 0]} />
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
              <octahedronGeometry args={[0.06, 0]} />
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
              <octahedronGeometry args={[0.06, 0]} />
            </mesh>

            {/* Peak 4: Back-Left */}
            <mesh position={[-0.42, 0.26, -0.42]} rotation={[0.12, -0.3, 0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.12, 0.38, 16]} />
            </mesh>
            {/* Gem: Amethyst */}
            <mesh position={[-0.45, 0.14, -0.38]} material={materials.neonPurple}>
              <octahedronGeometry args={[0.055, 0]} />
            </mesh>

            {/* Peak 5: Back-Right */}
            <mesh position={[0.42, 0.26, -0.42]} rotation={[0.12, 0.3, -0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.12, 0.38, 16]} />
            </mesh>
            {/* Gem: Topaz */}
            <mesh position={[0.45, 0.14, -0.38]} material={materials.gemTopaz}>
              <octahedronGeometry args={[0.055, 0]} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* FRIENDLY EXPRESSIVE FACE: EYEBROWS, NOSE, MUSTACHE, MOUTH */}
          {/* ======================================================== */}
          {/* Eyebrows (Horizontal expressive curved capsules) */}
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
          <group position={[0, 0.005, 0.44]}>
            <mesh position={[-0.055, 0, 0]} rotation={[0, 0, Math.PI / 2 + 0.15]} material={materials.facialHair}>
              <capsuleGeometry args={[0.012, 0.075, 6, 8]} />
            </mesh>
            <mesh position={[0.055, 0, 0]} rotation={[0, 0, -(Math.PI / 2 + 0.15)]} material={materials.facialHair}>
              <capsuleGeometry args={[0.012, 0.075, 6, 8]} />
            </mesh>
            <mesh position={[0, 0.005, 0.005]} material={materials.facialHair}>
              <sphereGeometry args={[0.013, 8, 8]} />
            </mesh>
          </group>

          {/* Gentle Friendly Smile */}
          <mesh position={[0, -0.065, 0.42]} rotation={[0, 0, 0]} material={materials.mouth}>
            <capsuleGeometry args={[0.01, 0.09, 6, 8]} />
          </mesh>

          {/* ======================================================== */}
          {/* GLOSSY DESIGNER TOY EYES WITH DYNAMIC EYE TRACKING */}
          {/* ======================================================== */}
          {/* Left Eye */}
          <group position={[-0.16, 0.11, 0.36]}>
            <group ref={leftEyeRef}>
              {/* Glossy White Sclera */}
              <mesh material={materials.eyeWhite}>
                <sphereGeometry args={[0.092, 24, 24]} />
              </mesh>
              {/* Dark Iris */}
              <mesh position={[0, 0, 0.062]} material={materials.eyeIris}>
                <sphereGeometry args={[0.068, 20, 20]} />
              </mesh>
              {/* Deep Black Pupil */}
              <mesh position={[0, 0, 0.075]} material={materials.eyePupil}>
                <sphereGeometry args={[0.045, 16, 16]} />
              </mesh>
              {/* Main Specular Highlight Catchlight */}
              <mesh position={[0.024, 0.024, 0.092]} material={materials.eyeCatchlight}>
                <sphereGeometry args={[0.014, 12, 12]} />
              </mesh>
              {/* Secondary Micro Catchlight */}
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
              {/* Glossy White Sclera */}
              <mesh material={materials.eyeWhite}>
                <sphereGeometry args={[0.092, 24, 24]} />
              </mesh>
              {/* Dark Iris */}
              <mesh position={[0, 0, 0.062]} material={materials.eyeIris}>
                <sphereGeometry args={[0.068, 20, 20]} />
              </mesh>
              {/* Deep Black Pupil */}
              <mesh position={[0, 0, 0.075]} material={materials.eyePupil}>
                <sphereGeometry args={[0.045, 16, 16]} />
              </mesh>
              {/* Main Specular Highlight Catchlight */}
              <mesh position={[0.024, 0.024, 0.092]} material={materials.eyeCatchlight}>
                <sphereGeometry args={[0.014, 12, 12]} />
              </mesh>
              {/* Secondary Micro Catchlight */}
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
