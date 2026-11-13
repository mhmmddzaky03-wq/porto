import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CharacterModel — "Dzaky Edition" Premium Designer Vinyl Toy
 * 
 * Crafted to the visual standards of collectible designer art toys (Pop Mart, Coarse, KAWS):
 * - Smooth organic geometry with high subdivision and zero visible joint gaps
 * - Seamless limb transitions and sculpted fluffy hairstyle
 * - Seated in a modern pod chair with crossed legs and stylish designer sneakers
 * - Iconic "Thinker" pose with right hand gently supporting the chin/cheek
 * - Fluffy black curly hair with sculpted organic waves
 * - Warm tan skin tone (#CF9367) with smooth satin vinyl finish
 * - Polished silver royal crown with 5 cabochon gemstone spheres
 * - Expressive glossy eyes with clear cornea depth, dual specular catchlights & procedural blinking
 * - Tailored dark charcoal formal suit jacket, crisp white shirt, black tie, and pocket square
 * - Delta-time damped smooth mouse tracking for head and eyes
 */
export default function CharacterModel({ pointer }) {
  // Animation Refs
  const rootGroupRef = useRef(null);
  const headGroupRef = useRef(null);
  const crownGroupRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftEyelidRef = useRef(null);
  const rightEyelidRef = useRef(null);
  const torsoGroupRef = useRef(null);
  const rightArmGroupRef = useRef(null);

  // Procedural blinking state
  const blinkStateRef = useRef({
    isBlinking: false,
    nextBlinkTime: 2.2,
    blinkProgress: 0,
    blinkDuration: 0.15,
  });

  // High-Quality PBR Materials with controlled roughness & metallic properties
  const materials = useMemo(() => {
    return {
      // Warm medium tan skin with soft satin vinyl sheen (Pop Mart / Vinyl Toy aesthetic)
      vinylSkin: new THREE.MeshStandardMaterial({
        color: '#D49B6F',
        roughness: 0.36,
        metalness: 0.04,
      }),
      // Cheeks soft warm blush
      blush: new THREE.MeshBasicMaterial({
        color: '#E27D60',
        transparent: true,
        opacity: 0.32,
      }),
      // Fluffy Black Hair (Deep graphite black with soft satin specular)
      hair: new THREE.MeshStandardMaterial({
        color: '#13161F',
        roughness: 0.58,
        metalness: 0.12,
      }),
      // Polished Silver Royal Crown (High reflectivity chrome)
      crownSilver: new THREE.MeshStandardMaterial({
        color: '#F1F5F9',
        roughness: 0.12,
        metalness: 0.96,
      }),
      // Crown Cabochon Gemstones (Vibrant refractive gem appearance)
      gemRuby: new THREE.MeshStandardMaterial({
        color: '#EF4444',
        emissive: '#DC2626',
        emissiveIntensity: 0.85,
        roughness: 0.08,
        metalness: 0.2,
      }),
      gemEmerald: new THREE.MeshStandardMaterial({
        color: '#10B981',
        emissive: '#059669',
        emissiveIntensity: 0.85,
        roughness: 0.08,
        metalness: 0.2,
      }),
      gemSapphire: new THREE.MeshStandardMaterial({
        color: '#3B82F6',
        emissive: '#2563EB',
        emissiveIntensity: 0.85,
        roughness: 0.08,
        metalness: 0.2,
      }),
      gemAmethyst: new THREE.MeshStandardMaterial({
        color: '#A855F7',
        emissive: '#9333EA',
        emissiveIntensity: 0.85,
        roughness: 0.08,
        metalness: 0.2,
      }),
      gemTopaz: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        emissive: '#D97706',
        emissiveIntensity: 0.85,
        roughness: 0.08,
        metalness: 0.2,
      }),
      // Tailored Dark Charcoal Formal Suit (Refined weave with soft sheen)
      suitDarkGray: new THREE.MeshStandardMaterial({
        color: '#1E232E',
        roughness: 0.52,
        metalness: 0.14,
      }),
      suitLapel: new THREE.MeshStandardMaterial({
        color: '#161922',
        roughness: 0.38,
        metalness: 0.22,
      }),
      // Crisp White Collared Dress Shirt & Pocket Square
      shirtWhite: new THREE.MeshStandardMaterial({
        color: '#F8FAFC',
        roughness: 0.35,
        metalness: 0.05,
      }),
      // Sleek Black Formal Necktie
      tieBlack: new THREE.MeshStandardMaterial({
        color: '#0A0D14',
        roughness: 0.28,
        metalness: 0.35,
      }),
      // Eyes: Glossy White Sclera
      eyeWhite: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.06,
        metalness: 0.0,
      }),
      // Eyes: Deep Espresso-Navy Iris
      eyeIris: new THREE.MeshStandardMaterial({
        color: '#0B132B',
        roughness: 0.1,
        metalness: 0.25,
      }),
      // Eyes: Pure Deep Black Pupil
      eyePupil: new THREE.MeshBasicMaterial({
        color: '#010409',
      }),
      // Eyes: Brilliant Specular Catchlights
      eyeCatchlight: new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
      // Facial Grooming: Thin Mustache & Eyebrows
      facialHair: new THREE.MeshStandardMaterial({
        color: '#0E131F',
        roughness: 0.6,
        metalness: 0.1,
      }),
      // Gentle Smile Mouth
      mouth: new THREE.MeshBasicMaterial({
        color: '#522820',
      }),
      // Modern Pod Chair Shell (Matte Obsidian)
      chairShell: new THREE.MeshStandardMaterial({
        color: '#10131B',
        roughness: 0.32,
        metalness: 0.55,
      }),
      chairRim: new THREE.MeshStandardMaterial({
        color: '#A855F7',
        emissive: '#7C3AED',
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.7,
      }),
      chairCushion: new THREE.MeshStandardMaterial({
        color: '#0C0E15',
        roughness: 0.72,
        metalness: 0.08,
      }),
      // Pedestal Base (Dark Brushed Titanium)
      pedestalBase: new THREE.MeshStandardMaterial({
        color: '#161924',
        roughness: 0.25,
        metalness: 0.85,
      }),
      // Pedestal Neon Purple LED Ring
      neonPurple: new THREE.MeshStandardMaterial({
        color: '#D8B4FE',
        emissive: '#A855F7',
        emissiveIntensity: 2.4,
        roughness: 0.1,
      }),
      // Designer Sneakers
      sneakerBlack: new THREE.MeshStandardMaterial({
        color: '#12151D',
        roughness: 0.38,
        metalness: 0.1,
      }),
      sneakerWhite: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.32,
        metalness: 0.05,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;

    // ----------------------------------------------------
    // 1. Natural Breathing & Subtle Floating Idle Motion
    // ----------------------------------------------------
    const breathCycle = Math.sin(t * 1.8);
    const floatCycle = Math.sin(t * 0.9) * 0.015;
    const microLifeX = Math.sin(t * 0.7) * 0.012;
    const microLifeY = Math.cos(t * 0.8) * 0.008;

    // Root subtle micro-float
    if (rootGroupRef.current) {
      rootGroupRef.current.position.y = -0.38 + floatCycle;
    }

    // Torso breathing lift and subtle chest expansion
    if (torsoGroupRef.current) {
      torsoGroupRef.current.position.y = 0.22 + breathCycle * 0.007;
      const targetTorsoYaw = px * 0.1 + microLifeX * 0.5;
      torsoGroupRef.current.rotation.y = THREE.MathUtils.damp(
        torsoGroupRef.current.rotation.y,
        targetTorsoYaw,
        2.5,
        delta
      );
    }

    // Right arm subtle compensation
    if (rightArmGroupRef.current) {
      rightArmGroupRef.current.rotation.z = -0.04 + breathCycle * 0.006;
    }

    // ----------------------------------------------------
    // 2. Smooth Damped Head Tracking (Clamped Natural Limits)
    // ----------------------------------------------------
    if (headGroupRef.current) {
      const targetHeadYaw = Math.max(-0.45, Math.min(0.45, px * 0.44 + microLifeX));
      const targetHeadPitch = Math.max(-0.25, Math.min(0.25, -py * 0.26 + microLifeY));
      const targetHeadRoll = Math.max(-0.08, Math.min(0.08, -px * 0.07));

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

    // Crown idle shimmer
    if (crownGroupRef.current) {
      crownGroupRef.current.rotation.y = Math.sin(t * 0.7) * 0.025;
    }

    // ----------------------------------------------------
    // 3. Dynamic Eye Tracking (Lead gaze with high responsiveness)
    // ----------------------------------------------------
    const eyeTargetYaw = Math.max(-0.35, Math.min(0.35, px * 0.32));
    const eyeTargetPitch = Math.max(-0.25, Math.min(0.25, -py * 0.24));

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
      blink.nextBlinkTime = t + 2.2 + Math.random() * 3.8;
    }

    if (blink.isBlinking) {
      blink.blinkProgress += delta / blink.blinkDuration;
      let eyelidScaleY = 0;

      if (blink.blinkProgress <= 0.5) {
        eyelidScaleY = Math.sin(blink.blinkProgress * Math.PI);
      } else if (blink.blinkProgress <= 1.0) {
        eyelidScaleY = Math.sin(blink.blinkProgress * Math.PI);
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
    <group ref={rootGroupRef} position={[0, -0.38, 0]} scale={0.88}>
      {/* ======================================================== */}
      {/* 1. PEDESTAL & DISPLAY BASE */}
      {/* ======================================================== */}
      <group position={[0, -0.92, 0]}>
        {/* Tier 1: Wide Bottom Plinth */}
        <mesh position={[0, -0.06, 0]} material={materials.pedestalBase}>
          <cylinderGeometry args={[1.4, 1.48, 0.1, 48]} />
        </mesh>
        {/* Glowing Neon Purple LED Ring */}
        <mesh position={[0, -0.01, 0]} material={materials.neonPurple}>
          <torusGeometry args={[1.36, 0.024, 16, 64]} />
        </mesh>
        {/* Tier 2: Step-Up Disc */}
        <mesh position={[0, 0.04, 0]} material={materials.pedestalBase}>
          <cylinderGeometry args={[1.15, 1.22, 0.08, 40]} />
        </mesh>
        {/* Chrome Support Stem */}
        <mesh position={[0, 0.28, 0]} material={materials.crownSilver}>
          <cylinderGeometry args={[0.07, 0.1, 0.42, 24]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. SLEEK MODERN CHAIR BACKREST (Cradles from behind) */}
      {/* ======================================================== */}
      <group position={[0, -0.15, -0.26]} rotation={[-0.15, 0, 0]}>
        {/* Smooth Dark Crescent Backrest Shell */}
        <mesh rotation={[-Math.PI / 2 + 0.25, 0, 0]} material={materials.chairShell}>
          <sphereGeometry args={[0.82, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.46]} />
        </mesh>
        {/* Glowing Purple Rim Ring */}
        <mesh position={[0, 0.16, 0.14]} rotation={[0.45, 0, 0]} material={materials.chairRim}>
          <torusGeometry args={[0.78, 0.025, 16, 48]} />
        </mesh>
        {/* Plush Curved Backrest Cushion */}
        <mesh position={[0, 0.14, -0.06]} scale={[0.72, 0.68, 0.28]} material={materials.chairCushion}>
          <sphereGeometry args={[0.78, 24, 20]} />
        </mesh>
        {/* Plush Seat Base Cushion */}
        <mesh position={[0, -0.18, 0.12]} material={materials.chairCushion}>
          <cylinderGeometry args={[0.44, 0.4, 0.14, 28]} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. SEATED LOWER BODY: CROSSED LEGS & SNEAKERS */}
      {/* ======================================================== */}
      <group position={[0, 0.08, 0.16]}>
        {/* Left Leg: Descending to pedestal */}
        <group position={[-0.2, -0.04, 0.04]}>
          {/* Thigh (Suit Trousers) */}
          <mesh position={[0, 0.02, 0.16]} rotation={[0.95, 0, 0]} material={materials.suitDarkGray}>
            <capsuleGeometry args={[0.11, 0.32, 16, 24]} />
          </mesh>
          {/* Shin */}
          <mesh position={[0, -0.32, 0.32]} rotation={[-0.04, 0, 0]} material={materials.suitDarkGray}>
            <capsuleGeometry args={[0.095, 0.3, 16, 24]} />
          </mesh>
          {/* Left Sneaker (Floor Contact) */}
          <group position={[0, -0.54, 0.36]} rotation={[0.06, 0.05, 0]}>
            {/* White Rubber Sole */}
            <mesh position={[0, -0.02, 0.04]} material={materials.sneakerWhite}>
              <boxGeometry args={[0.15, 0.04, 0.28]} />
            </mesh>
            {/* Black Sneaker Body */}
            <mesh position={[0, 0.04, 0.02]} material={materials.sneakerBlack}>
              <boxGeometry args={[0.13, 0.08, 0.24]} />
            </mesh>
            {/* White Toe Cap */}
            <mesh position={[0, 0.02, 0.11]} material={materials.sneakerWhite}>
              <sphereGeometry args={[0.07, 16, 16]} />
            </mesh>
            {/* White Laces */}
            <mesh position={[0, 0.075, 0.02]} material={materials.sneakerWhite}>
              <boxGeometry args={[0.08, 0.012, 0.09]} />
            </mesh>
          </group>
        </group>

        {/* Right Leg: Crossed Horizontally Over Left Knee */}
        <group position={[0.16, 0.04, 0.08]} rotation={[-0.1, 0.24, -0.2]}>
          {/* Right Thigh */}
          <mesh position={[-0.06, 0.04, 0.16]} rotation={[1.1, -0.32, 0.18]} material={materials.suitDarkGray}>
            <capsuleGeometry args={[0.11, 0.32, 16, 24]} />
          </mesh>
          {/* Right Calf Crossing Over */}
          <mesh position={[0.02, -0.14, 0.44]} rotation={[0.28, 0.82, -0.28]} material={materials.suitDarkGray}>
            <capsuleGeometry args={[0.095, 0.32, 16, 24]} />
          </mesh>
          {/* Right Sneaker (Suspended) */}
          <group position={[0.26, -0.2, 0.54]} rotation={[-0.2, 0.65, 0.15]}>
            <mesh position={[0, -0.02, 0.04]} material={materials.sneakerWhite}>
              <boxGeometry args={[0.15, 0.04, 0.28]} />
            </mesh>
            <mesh position={[0, 0.04, 0.02]} material={materials.sneakerBlack}>
              <boxGeometry args={[0.13, 0.08, 0.24]} />
            </mesh>
            <mesh position={[0, 0.02, 0.11]} material={materials.sneakerWhite}>
              <sphereGeometry args={[0.07, 16, 16]} />
            </mesh>
            <mesh position={[0, 0.075, 0.02]} material={materials.sneakerWhite}>
              <boxGeometry args={[0.08, 0.012, 0.09]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 4. FORMAL SUIT TORSO, ARMS & HANDS */}
      {/* ======================================================== */}
      <group ref={torsoGroupRef} position={[0, 0.16, 0]}>
        {/* Main Jacket Torso */}
        <mesh position={[0, 0.1, -0.03]} material={materials.suitDarkGray}>
          <cylinderGeometry args={[0.34, 0.3, 0.46, 32]} />
        </mesh>

        {/* Crisp White Shirt Front (V-Opening) */}
        <mesh position={[0, 0.18, 0.23]} rotation={[-0.08, 0, 0]} material={materials.shirtWhite}>
          <boxGeometry args={[0.2, 0.32, 0.08]} />
        </mesh>

        {/* Left Lapel */}
        <mesh position={[-0.13, 0.17, 0.26]} rotation={[0.06, 0.14, -0.18]} material={materials.suitLapel}>
          <boxGeometry args={[0.1, 0.34, 0.05]} />
        </mesh>
        {/* Right Lapel */}
        <mesh position={[0.13, 0.17, 0.26]} rotation={[0.06, -0.14, 0.18]} material={materials.suitLapel}>
          <boxGeometry args={[0.1, 0.34, 0.05]} />
        </mesh>

        {/* White Pocket Square Handkerchief in Left Chest Pocket */}
        <mesh position={[-0.19, 0.23, 0.28]} rotation={[0.05, 0.12, 0.1]} material={materials.shirtWhite}>
          <boxGeometry args={[0.06, 0.025, 0.025]} />
        </mesh>

        {/* Formal Black Necktie Knot */}
        <mesh position={[0, 0.29, 0.29]} material={materials.tieBlack}>
          <boxGeometry args={[0.052, 0.05, 0.035]} />
        </mesh>
        {/* Formal Black Necktie Body */}
        <mesh position={[0, 0.14, 0.28]} rotation={[0.08, 0, 0]} material={materials.tieBlack}>
          <cylinderGeometry args={[0.03, 0.05, 0.26, 16]} />
        </mesh>

        {/* ---------------------------------------------------- */}
        {/* Left Arm: Smooth Continuous Sleeve Resting on Lap */}
        {/* ---------------------------------------------------- */}
        <group position={[-0.36, 0.2, 0.02]} rotation={[0.2, 0.1, 0.22]}>
          {/* Shoulder */}
          <mesh material={materials.suitDarkGray}>
            <sphereGeometry args={[0.13, 20, 20]} />
          </mesh>
          {/* Upper Arm Capsule */}
          <mesh position={[-0.04, -0.16, 0.06]} rotation={[0.28, 0, 0.08]} material={materials.suitDarkGray}>
            <capsuleGeometry args={[0.09, 0.26, 14, 20]} />
          </mesh>
          {/* Forearm Capsule Angling to Lap */}
          <mesh position={[-0.04, -0.34, 0.22]} rotation={[1.1, -0.18, 0.08]} material={materials.suitDarkGray}>
            <capsuleGeometry args={[0.08, 0.26, 14, 20]} />
          </mesh>
          {/* White Shirt Cuff */}
          <mesh position={[-0.02, -0.38, 0.35]} material={materials.shirtWhite}>
            <cylinderGeometry args={[0.068, 0.068, 0.04, 16]} />
          </mesh>
          {/* Resting Vinyl Hand */}
          <mesh position={[-0.01, -0.4, 0.39]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.068, 16, 16]} />
          </mesh>
        </group>

        {/* ---------------------------------------------------- */}
        {/* Right Arm: Iconic Chin-Rest Pose (The Thinker) */}
        {/* ---------------------------------------------------- */}
        <group ref={rightArmGroupRef} position={[0.34, 0.18, 0.04]}>
          {/* Shoulder */}
          <mesh material={materials.suitDarkGray}>
            <sphereGeometry args={[0.13, 20, 20]} />
          </mesh>
          {/* Upper Arm Capsule: Forward toward knee */}
          <mesh position={[0.02, -0.14, 0.16]} rotation={[1.05, -0.22, -0.28]} material={materials.suitDarkGray}>
            <capsuleGeometry args={[0.09, 0.26, 14, 20]} />
          </mesh>
          {/* Forearm Capsule: Angling Upward to Chin */}
          <mesh position={[-0.07, 0.03, 0.32]} rotation={[-1.25, 0.32, 0.32]} material={materials.suitDarkGray}>
            <capsuleGeometry args={[0.08, 0.28, 14, 20]} />
          </mesh>
          {/* White Shirt Cuff */}
          <mesh position={[-0.14, 0.19, 0.3]} material={materials.shirtWhite}>
            <cylinderGeometry args={[0.068, 0.068, 0.04, 16]} />
          </mesh>
          {/* Right Hand: Supporting right cheek/chin */}
          <mesh position={[-0.16, 0.24, 0.32]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.072, 18, 18]} />
          </mesh>
          {/* Soft Knuckle / Finger Curves */}
          <mesh position={[-0.14, 0.26, 0.36]} material={materials.vinylSkin}>
            <capsuleGeometry args={[0.02, 0.045, 6, 10]} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 5. OVERSIZED CUTE VINYL TOY HEAD & CROWN */}
      {/* ======================================================== */}
      <group position={[0, 0.77, 0]}>
        {/* Neck Seamless Collar Ring */}
        <mesh position={[0, -0.05, 0]} material={materials.vinylSkin}>
          <cylinderGeometry args={[0.14, 0.17, 0.12, 28]} />
        </mesh>

        {/* Head Rotation Pivot (Damped Mouse Look Tracking) */}
        <group ref={headGroupRef} position={[0, 0.18, 0]}>
          {/* Main Stylized Head Sphere (High Subdivision 48x48) */}
          <mesh position={[0, 0.06, 0]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.48, 48, 48]} />
          </mesh>

          {/* Left Chubby Cheek Cushion */}
          <mesh position={[-0.22, -0.04, 0.36]} scale={[1.1, 0.9, 0.8]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.15, 24, 24]} />
          </mesh>
          {/* Right Chubby Cheek Cushion */}
          <mesh position={[0.22, -0.04, 0.36]} scale={[1.1, 0.9, 0.8]} material={materials.vinylSkin}>
            <sphereGeometry args={[0.15, 24, 24]} />
          </mesh>

          {/* Left Ear */}
          <mesh position={[-0.47, 0.05, 0]} rotation={[0, 0.2, -0.1]} material={materials.vinylSkin}>
            <capsuleGeometry args={[0.045, 0.09, 8, 16]} />
          </mesh>
          {/* Right Ear */}
          <mesh position={[0.47, 0.05, 0]} rotation={[0, -0.2, 0.1]} material={materials.vinylSkin}>
            <capsuleGeometry args={[0.045, 0.09, 8, 16]} />
          </mesh>

          {/* Left Cheek Warm Blush */}
          <mesh position={[-0.24, -0.02, 0.43]} rotation={[0, -0.25, 0]} material={materials.blush}>
            <circleGeometry args={[0.06, 20]} />
          </mesh>
          {/* Right Cheek Warm Blush */}
          <mesh position={[0.24, -0.02, 0.43]} rotation={[0, 0.25, 0]} material={materials.blush}>
            <circleGeometry args={[0.06, 20]} />
          </mesh>

          {/* ======================================================== */}
          {/* SCULPTED FLUFFY BLACK CURLY HAIRSTYLE */}
          {/* ======================================================== */}
          <group position={[0, 0.12, -0.02]}>
            {/* Core Hair Cap Shell */}
            <mesh position={[0, 0.08, -0.02]} material={materials.hair}>
              <sphereGeometry args={[0.5, 48, 36, 0, Math.PI * 2, 0, Math.PI * 0.56]} />
            </mesh>

            {/* Forehead Curly Waves (Nestled organically across hairline) */}
            <mesh position={[0, 0.26, 0.36]} material={materials.hair}>
              <sphereGeometry args={[0.16, 20, 20]} />
            </mesh>
            <mesh position={[-0.16, 0.24, 0.34]} material={materials.hair}>
              <sphereGeometry args={[0.15, 20, 20]} />
            </mesh>
            <mesh position={[0.16, 0.24, 0.34]} material={materials.hair}>
              <sphereGeometry args={[0.15, 20, 20]} />
            </mesh>
            <mesh position={[-0.3, 0.18, 0.28]} material={materials.hair}>
              <sphereGeometry args={[0.14, 18, 18]} />
            </mesh>
            <mesh position={[0.3, 0.18, 0.28]} material={materials.hair}>
              <sphereGeometry args={[0.14, 18, 18]} />
            </mesh>

            {/* Top Volumetric Hair Puffs */}
            <mesh position={[0, 0.38, 0.08]} material={materials.hair}>
              <sphereGeometry args={[0.2, 20, 20]} />
            </mesh>
            <mesh position={[-0.18, 0.36, 0.04]} material={materials.hair}>
              <sphereGeometry args={[0.18, 18, 18]} />
            </mesh>
            <mesh position={[0.18, 0.36, 0.04]} material={materials.hair}>
              <sphereGeometry args={[0.18, 18, 18]} />
            </mesh>

            {/* Sideburns Framing Ears */}
            <mesh position={[-0.43, -0.04, 0.05]} material={materials.hair}>
              <boxGeometry args={[0.06, 0.14, 0.1]} />
            </mesh>
            <mesh position={[0.43, -0.04, 0.05]} material={materials.hair}>
              <boxGeometry args={[0.06, 0.14, 0.1]} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* POLISHED SILVER ROYAL CROWN WITH CABOCHON GEMS */}
          {/* ======================================================== */}
          <group ref={crownGroupRef} position={[0, 0.62, 0.02]} rotation={[0.08, 0, -0.05]} scale={0.34}>
            {/* Crown Base Torus Ring Rim */}
            <mesh material={materials.crownSilver}>
              <torusGeometry args={[0.62, 0.045, 24, 48]} />
            </mesh>
            {/* Crown Base Band Cylinder */}
            <mesh position={[0, 0.05, 0]} material={materials.crownSilver}>
              <cylinderGeometry args={[0.62, 0.58, 0.14, 36]} />
            </mesh>

            {/* Peak 1: Center Front */}
            <mesh position={[0, 0.28, 0.58]} rotation={[-0.15, 0, 0]} material={materials.crownSilver}>
              <coneGeometry args={[0.13, 0.44, 20]} />
            </mesh>
            <mesh position={[0, 0.5, 0.55]} material={materials.crownSilver}>
              <sphereGeometry args={[0.045, 16, 16]} />
            </mesh>
            {/* Center Ruby Gem */}
            <mesh position={[0, 0.12, 0.64]} material={materials.gemRuby}>
              <sphereGeometry args={[0.065, 18, 18]} />
            </mesh>

            {/* Peak 2: Front-Left */}
            <mesh position={[-0.48, 0.25, 0.35]} rotation={[-0.1, -0.35, 0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.12, 0.4, 20]} />
            </mesh>
            <mesh position={[-0.52, 0.45, 0.37]} material={materials.crownSilver}>
              <sphereGeometry args={[0.04, 16, 16]} />
            </mesh>
            {/* Emerald Gem */}
            <mesh position={[-0.46, 0.1, 0.43]} material={materials.gemEmerald}>
              <sphereGeometry args={[0.06, 18, 18]} />
            </mesh>

            {/* Peak 3: Front-Right */}
            <mesh position={[0.48, 0.25, 0.35]} rotation={[-0.1, 0.35, -0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.12, 0.4, 20]} />
            </mesh>
            <mesh position={[0.52, 0.45, 0.37]} material={materials.crownSilver}>
              <sphereGeometry args={[0.04, 16, 16]} />
            </mesh>
            {/* Sapphire Gem */}
            <mesh position={[0.46, 0.1, 0.43]} material={materials.gemSapphire}>
              <sphereGeometry args={[0.06, 18, 18]} />
            </mesh>

            {/* Peak 4: Back-Left */}
            <mesh position={[-0.42, 0.23, -0.42]} rotation={[0.12, -0.3, 0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.11, 0.36, 18]} />
            </mesh>
            {/* Amethyst Gem */}
            <mesh position={[-0.44, 0.1, -0.38]} material={materials.gemAmethyst}>
              <sphereGeometry args={[0.055, 16, 16]} />
            </mesh>

            {/* Peak 5: Back-Right */}
            <mesh position={[0.42, 0.23, -0.42]} rotation={[0.12, 0.3, -0.15]} material={materials.crownSilver}>
              <coneGeometry args={[0.11, 0.36, 18]} />
            </mesh>
            {/* Topaz Gem */}
            <mesh position={[0.44, 0.1, -0.38]} material={materials.gemTopaz}>
              <sphereGeometry args={[0.055, 16, 16]} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* FRIENDLY EXPRESSIVE FACE: NOSE, MUSTACHE, SMILE */}
          {/* ======================================================== */}
          {/* Eyebrows (Horizontal curved expressive capsules) */}
          <mesh position={[-0.16, 0.19, 0.44]} rotation={[0, 0, Math.PI / 2 - 0.12]} material={materials.facialHair}>
            <capsuleGeometry args={[0.013, 0.1, 6, 12]} />
          </mesh>
          <mesh position={[0.16, 0.19, 0.44]} rotation={[0, 0, -(Math.PI / 2 - 0.12)]} material={materials.facialHair}>
            <capsuleGeometry args={[0.013, 0.1, 6, 12]} />
          </mesh>

          {/* Cute Stylized Nose */}
          <mesh position={[0, 0.05, 0.48]} rotation={[-0.1, 0, 0]} material={materials.vinylSkin}>
            <coneGeometry args={[0.038, 0.09, 18]} />
          </mesh>

          {/* SUBTLE THIN MUSTACHE (Horizontal gentle wings above upper lip) */}
          <group position={[0, -0.015, 0.485]}>
            <mesh position={[-0.052, 0, 0]} rotation={[0, 0, Math.PI / 2 + 0.15]} material={materials.facialHair}>
              <capsuleGeometry args={[0.011, 0.07, 6, 10]} />
            </mesh>
            <mesh position={[0.052, 0, 0]} rotation={[0, 0, -(Math.PI / 2 + 0.15)]} material={materials.facialHair}>
              <capsuleGeometry args={[0.011, 0.07, 6, 10]} />
            </mesh>
            <mesh position={[0, 0.004, 0.005]} material={materials.facialHair}>
              <sphereGeometry args={[0.012, 8, 8]} />
            </mesh>
          </group>

          {/* Gentle Smile Mouth Line */}
          <mesh position={[0, -0.075, 0.475]} material={materials.mouth}>
            <capsuleGeometry args={[0.009, 0.08, 6, 10]} />
          </mesh>

          {/* ======================================================== */}
          {/* GLOSSY DESIGNER TOY EYES WITH REALISTIC DEPTH & TRACKING */}
          {/* ======================================================== */}
          {/* Left Eye */}
          <group position={[-0.15, 0.08, 0.44]}>
            <group ref={leftEyeRef}>
              {/* Glossy White Sclera Sphere */}
              <mesh material={materials.eyeWhite}>
                <sphereGeometry args={[0.092, 28, 28]} />
              </mesh>
              {/* Dark Espresso-Navy Iris */}
              <mesh position={[0, 0, 0.06]} material={materials.eyeIris}>
                <sphereGeometry args={[0.068, 24, 24]} />
              </mesh>
              {/* Pure Velvet Black Pupil */}
              <mesh position={[0, 0, 0.074]} material={materials.eyePupil}>
                <sphereGeometry args={[0.044, 20, 20]} />
              </mesh>
              {/* Primary Brilliant Catchlight */}
              <mesh position={[0.024, 0.024, 0.088]} material={materials.eyeCatchlight}>
                <sphereGeometry args={[0.014, 14, 14]} />
              </mesh>
              {/* Secondary Micro-Spark Catchlight */}
              <mesh position={[-0.016, -0.014, 0.086]} material={materials.eyeCatchlight}>
                <sphereGeometry args={[0.007, 10, 10]} />
              </mesh>
            </group>

            {/* Left Upper Eyelid (Procedural Blink) */}
            <mesh ref={leftEyelidRef} position={[0, 0.042, 0.02]} scale={[1, 0, 1]} material={materials.vinylSkin}>
              <sphereGeometry args={[0.098, 24, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.15, 0.08, 0.44]}>
            <group ref={rightEyeRef}>
              {/* Glossy White Sclera Sphere */}
              <mesh material={materials.eyeWhite}>
                <sphereGeometry args={[0.092, 28, 28]} />
              </mesh>
              {/* Dark Espresso-Navy Iris */}
              <mesh position={[0, 0, 0.06]} material={materials.eyeIris}>
                <sphereGeometry args={[0.068, 24, 24]} />
              </mesh>
              {/* Pure Velvet Black Pupil */}
              <mesh position={[0, 0, 0.074]} material={materials.eyePupil}>
                <sphereGeometry args={[0.044, 20, 20]} />
              </mesh>
              {/* Primary Brilliant Catchlight */}
              <mesh position={[0.024, 0.024, 0.088]} material={materials.eyeCatchlight}>
                <sphereGeometry args={[0.014, 14, 14]} />
              </mesh>
              {/* Secondary Micro-Spark Catchlight */}
              <mesh position={[-0.016, -0.014, 0.086]} material={materials.eyeCatchlight}>
                <sphereGeometry args={[0.007, 10, 10]} />
              </mesh>
            </group>

            {/* Right Upper Eyelid (Procedural Blink) */}
            <mesh ref={rightEyelidRef} position={[0, 0.042, 0.02]} scale={[1, 0, 1]} material={materials.vinylSkin}>
              <sphereGeometry args={[0.098, 24, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
