import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CharacterModel
 * High-craft stylized procedural 3D human developer character.
 *
 * Capabilities:
 * 1. Independent head movement: Natural yaw (horizontal look), pitch (vertical look),
 *    and subtle roll (ear tilt) smoothly damped with inertia.
 * 2. Eye tracking: Pupils & irises rotate agilely to track cursor coordinates
 *    with dual catchlight specular sparks.
 * 3. Procedural blinking: Natural randomized eyelid blink cycle every 3-6s.
 * 4. Idle breathing: Torso, chest volume, and shoulders rise and fall with gentle expansion.
 * 5. Subtle torso & shoulder kinematics: Torso follows head motion with realistic delay.
 * 6. Organic micro-life: Autonomous micro-saccades and resting gaze wobble when idle.
 * 7. Modern developer styling: Chic round titanium glasses with subtle lens sheen,
 *    dark technical streetwear hoodie with crimson red piping, and wireless headphones.
 */
export default function CharacterModel({ pointer }) {
  // References for bone/group hierarchy
  const rootGroupRef = useRef(null);
  const torsoGroupRef = useRef(null);
  const neckPivotRef = useRef(null);
  const headGroupRef = useRef(null);
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
      skin: new THREE.MeshStandardMaterial({
        color: '#E0AC8B',
        roughness: 0.55,
        metalness: 0.05,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: '#0B0F19',
        roughness: 0.45,
        metalness: 0.25,
      }),
      hoodie: new THREE.MeshStandardMaterial({
        color: '#0D111A',
        roughness: 0.75,
        metalness: 0.15,
      }),
      hoodieCollar: new THREE.MeshStandardMaterial({
        color: '#151C2B',
        roughness: 0.7,
        metalness: 0.2,
      }),
      hoodieAccent: new THREE.MeshStandardMaterial({
        color: '#FF2A3B',
        emissive: '#FF2A3B',
        emissiveIntensity: 0.9,
        roughness: 0.2,
      }),
      headphonesBody: new THREE.MeshStandardMaterial({
        color: '#1A2233',
        roughness: 0.3,
        metalness: 0.8,
      }),
      headphonesGlow: new THREE.MeshStandardMaterial({
        color: '#FF2A3B',
        emissive: '#FF2A3B',
        emissiveIntensity: 1.6,
        roughness: 0.1,
      }),
      glassesFrame: new THREE.MeshStandardMaterial({
        color: '#1E2638',
        roughness: 0.2,
        metalness: 0.9,
      }),
      glassesBridge: new THREE.MeshStandardMaterial({
        color: '#FF2A3B',
        emissive: '#FF2A3B',
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      }),
      glassesLens: new THREE.MeshPhysicalMaterial({
        color: '#c7d2fe',
        transparent: true,
        opacity: 0.25,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.05,
        reflectivity: 0.9,
      }),
      eyeWhite: new THREE.MeshStandardMaterial({
        color: '#F8FAFC',
        roughness: 0.1,
        metalness: 0.0,
      }),
      eyeIris: new THREE.MeshStandardMaterial({
        color: '#0E1726',
        roughness: 0.15,
        metalness: 0.2,
      }),
      eyePupil: new THREE.MeshBasicMaterial({
        color: '#020617',
      }),
      eyeCatchlight: new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
      }),
      eyebrow: new THREE.MeshStandardMaterial({
        color: '#090D15',
        roughness: 0.8,
      }),
      mouth: new THREE.MeshBasicMaterial({
        color: '#7C483B',
      }),
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;

    // ----------------------------------------------------
    // 1. Natural Idle Breathing & Micro-Organic Life
    // ----------------------------------------------------
    const breathCycle = Math.sin(t * 1.8);
    const microLifeX = Math.sin(t * 0.7) * 0.02;
    const microLifeY = Math.cos(t * 0.9) * 0.012;

    // Torso breathing lift and subtle chest expansion
    if (torsoGroupRef.current) {
      torsoGroupRef.current.position.y = -0.15 + breathCycle * 0.012;
      torsoGroupRef.current.scale.y = 1 + breathCycle * 0.008;

      // Torso follows mouse horizontally with slower, dampened inertia
      const targetTorsoYaw = px * 0.18 + microLifeX * 0.4;
      const targetTorsoPitch = -py * 0.08 + microLifeY * 0.4;
      torsoGroupRef.current.rotation.y = THREE.MathUtils.damp(torsoGroupRef.current.rotation.y, targetTorsoYaw, 2.5, delta);
      torsoGroupRef.current.rotation.x = THREE.MathUtils.damp(torsoGroupRef.current.rotation.x, targetTorsoPitch, 2.5, delta);
    }

    // Shoulders lift naturally with breathing
    if (leftShoulderRef.current && rightShoulderRef.current) {
      const shoulderLift = breathCycle * 0.006;
      leftShoulderRef.current.position.y = 0.36 + shoulderLift;
      rightShoulderRef.current.position.y = 0.36 + shoulderLift;
    }

    // ----------------------------------------------------
    // 2. Independent Head Movement & Organic Tilt
    // ----------------------------------------------------
    if (headGroupRef.current) {
      // Head yaw (horizontal look): up to ~30 degrees
      const targetHeadYaw = px * 0.52 + microLifeX;
      // Head pitch (vertical look): up to ~18 degrees
      const targetHeadPitch = -py * 0.3 + microLifeY;
      // Head roll (slight natural tilt into movement direction)
      const targetHeadRoll = -px * 0.08;

      headGroupRef.current.rotation.y = THREE.MathUtils.damp(headGroupRef.current.rotation.y, targetHeadYaw, 6.0, delta);
      headGroupRef.current.rotation.x = THREE.MathUtils.damp(headGroupRef.current.rotation.x, targetHeadPitch, 6.0, delta);
      headGroupRef.current.rotation.z = THREE.MathUtils.damp(headGroupRef.current.rotation.z, targetHeadRoll, 5.0, delta);
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
      blink.nextBlinkTime = t + 3.2 + Math.random() * 3.2;
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
    <group ref={rootGroupRef} position={[0, -0.45, 0]} scale={1.12}>
      {/* ======================================================== */}
      {/* TORSO & BODY HIERARCHY */}
      {/* ======================================================== */}
      <group ref={torsoGroupRef}>
        {/* Main Chest / Hoodie Body */}
        <mesh position={[0, -0.22, -0.04]} material={materials.hoodie}>
          <cylinderGeometry args={[0.54, 0.44, 0.72, 24]} />
        </mesh>

        {/* Back of Hoodie Volume */}
        <mesh position={[0, 0.05, -0.15]} material={materials.hoodie}>
          <sphereGeometry args={[0.42, 20, 16]} />
        </mesh>

        {/* Hoodie Collar / Neck Trim */}
        <mesh position={[0, 0.22, -0.02]} rotation={[0.1, 0, 0]} material={materials.hoodieCollar}>
          <cylinderGeometry args={[0.29, 0.36, 0.2, 24]} />
        </mesh>

        {/* Accent Red Drawstrings */}
        <mesh position={[-0.1, 0.08, 0.2]} rotation={[0, 0, 0.08]} material={materials.hoodieAccent}>
          <capsuleGeometry args={[0.015, 0.24, 8, 12]} />
        </mesh>
        <mesh position={[0.1, 0.08, 0.2]} rotation={[0, 0, -0.08]} material={materials.hoodieAccent}>
          <capsuleGeometry args={[0.015, 0.24, 8, 12]} />
        </mesh>

        {/* Chest Accent Tech Chevron */}
        <mesh position={[0, -0.05, 0.27]} rotation={[0, 0, Math.PI / 4]} material={materials.hoodieAccent}>
          <boxGeometry args={[0.045, 0.045, 0.005]} />
        </mesh>

        {/* Left Shoulder & Upper Arm */}
        <group ref={leftShoulderRef} position={[-0.56, 0.12, -0.04]} rotation={[0, 0, 0.22]}>
          <mesh material={materials.hoodie}>
            <sphereGeometry args={[0.2, 16, 16]} />
          </mesh>
          <mesh position={[-0.1, -0.3, 0.05]} rotation={[0, 0, 0.15]} material={materials.hoodie}>
            <cylinderGeometry args={[0.16, 0.13, 0.55, 16]} />
          </mesh>
        </group>

        {/* Right Shoulder & Upper Arm */}
        <group ref={rightShoulderRef} position={[0.56, 0.12, -0.04]} rotation={[0, 0, -0.22]}>
          <mesh material={materials.hoodie}>
            <sphereGeometry args={[0.2, 16, 16]} />
          </mesh>
          <mesh position={[0.1, -0.3, 0.05]} rotation={[0, 0, -0.15]} material={materials.hoodie}>
            <cylinderGeometry args={[0.16, 0.13, 0.55, 16]} />
          </mesh>
        </group>

        {/* Sleek Wireless Headphones rested around neck */}
        <group position={[0, 0.26, -0.02]} rotation={[0.24, 0, 0]}>
          {/* Headband arch */}
          <mesh material={materials.headphonesBody}>
            <torusGeometry args={[0.33, 0.042, 12, 32, Math.PI * 1.15]} />
          </mesh>
          {/* Left Ear Cup & Status Ring */}
          <mesh position={[-0.34, -0.06, 0.1]} rotation={[0, 0.4, 0]} material={materials.headphonesBody}>
            <cylinderGeometry args={[0.11, 0.11, 0.09, 20]} />
          </mesh>
          <mesh position={[-0.38, -0.06, 0.1]} rotation={[0, 0.4, 0]} material={materials.headphonesGlow}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          </mesh>
          {/* Right Ear Cup & Status Ring */}
          <mesh position={[0.34, -0.06, 0.1]} rotation={[0, -0.4, 0]} material={materials.headphonesBody}>
            <cylinderGeometry args={[0.11, 0.11, 0.09, 20]} />
          </mesh>
          <mesh position={[0.38, -0.06, 0.1]} rotation={[0, -0.4, 0]} material={materials.headphonesGlow}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* NECK PIVOT & INDEPENDENT HEAD HIERARCHY */}
      {/* ======================================================== */}
      <group ref={neckPivotRef} position={[0, 0.36, 0]}>
        {/* Anatomical Neck */}
        <mesh position={[0, 0.06, 0]} material={materials.skin}>
          <cylinderGeometry args={[0.15, 0.17, 0.22, 20]} />
        </mesh>

        {/* Rotatable Head Group */}
        <group ref={headGroupRef} position={[0, 0.28, 0]}>
          {/* Base Head / Cranium */}
          <mesh position={[0, 0.1, 0]} material={materials.skin}>
            <sphereGeometry args={[0.37, 28, 24]} />
          </mesh>
          {/* Chin & Jaw Structure */}
          <mesh position={[0, -0.05, 0.1]} rotation={[0.32, 0, 0]} material={materials.skin}>
            <coneGeometry args={[0.26, 0.34, 20]} />
          </mesh>

          {/* Left Ear */}
          <mesh position={[-0.37, 0.08, -0.02]} rotation={[0, 0.2, -0.1]} material={materials.skin}>
            <capsuleGeometry args={[0.045, 0.11, 8, 12]} />
          </mesh>
          {/* Right Ear */}
          <mesh position={[0.37, 0.08, -0.02]} rotation={[0, -0.2, 0.1]} material={materials.skin}>
            <capsuleGeometry args={[0.045, 0.11, 8, 12]} />
          </mesh>

          {/* Stylized Modern Developer Hair */}
          <group position={[0, 0.24, -0.03]}>
            {/* Main Cap Volume */}
            <mesh position={[0, 0.09, -0.04]} material={materials.hair}>
              <sphereGeometry args={[0.4, 24, 20]} />
            </mesh>
            {/* Swept Front Fringe / Bangs (Soft natural frame) */}
            <mesh position={[-0.08, 0.11, 0.28]} rotation={[0.48, -0.2, 0.15]} material={materials.hair}>
              <coneGeometry args={[0.13, 0.28, 12]} />
            </mesh>
            <mesh position={[0.08, 0.13, 0.27]} rotation={[0.42, 0.2, -0.15]} material={materials.hair}>
              <coneGeometry args={[0.14, 0.29, 12]} />
            </mesh>
            <mesh position={[0.22, 0.08, 0.23]} rotation={[0.48, 0.35, -0.3]} material={materials.hair}>
              <coneGeometry args={[0.11, 0.24, 12]} />
            </mesh>
            {/* Crown volume texture */}
            <mesh position={[0, 0.25, 0.03]} rotation={[0.18, 0, 0]} material={materials.hair}>
              <coneGeometry args={[0.16, 0.26, 12]} />
            </mesh>
            {/* Sideburns */}
            <mesh position={[-0.36, -0.06, 0.06]} material={materials.hair}>
              <boxGeometry args={[0.05, 0.18, 0.1]} />
            </mesh>
            <mesh position={[0.36, -0.06, 0.06]} material={materials.hair}>
              <boxGeometry args={[0.05, 0.18, 0.1]} />
            </mesh>
          </group>

          {/* Confident Expressive Eyebrows */}
          <mesh position={[-0.14, 0.19, 0.34]} rotation={[0, 0, 0.06]} material={materials.eyebrow}>
            <boxGeometry args={[0.12, 0.026, 0.03]} />
          </mesh>
          <mesh position={[0.14, 0.19, 0.34]} rotation={[0, 0, -0.06]} material={materials.eyebrow}>
            <boxGeometry args={[0.12, 0.026, 0.03]} />
          </mesh>

          {/* Nose (Clean stylized rounded cone) */}
          <mesh position={[0, 0.06, 0.37]} rotation={[-0.12, 0, 0]} material={materials.skin}>
            <coneGeometry args={[0.04, 0.12, 12]} />
          </mesh>

          {/* Subtle Smile / Mouth */}
          <mesh position={[0, -0.08, 0.34]} material={materials.mouth}>
            <boxGeometry args={[0.1, 0.014, 0.02]} />
          </mesh>

          {/* ======================================================== */}
          {/* EYES & DYNAMIC GAZE TRACKING HIERARCHY */}
          {/* ======================================================== */}
          {/* Left Eye */}
          <group position={[-0.14, 0.09, 0.3]}>
            <group ref={leftEyeRef}>
              {/* Sclera (White) */}
              <mesh material={materials.eyeWhite}>
                <sphereGeometry args={[0.078, 20, 20]} />
              </mesh>
              {/* Iris (Dark Navy / Obsidian) */}
              <mesh position={[0, 0, 0.065]} material={materials.eyeIris}>
                <circleGeometry args={[0.046, 24]} />
              </mesh>
              {/* Pupil (Deep Black) */}
              <mesh position={[0, 0, 0.067]} material={materials.eyePupil}>
                <circleGeometry args={[0.025, 20]} />
              </mesh>
              {/* Primary Catchlight (Specular Sparkle) */}
              <mesh position={[0.016, 0.016, 0.069]} material={materials.eyeCatchlight}>
                <circleGeometry args={[0.011, 12]} />
              </mesh>
              {/* Secondary Micro-Catchlight */}
              <mesh position={[-0.012, -0.012, 0.069]} material={materials.eyeCatchlight}>
                <circleGeometry args={[0.005, 10]} />
              </mesh>
            </group>

            {/* Left Upper Eyelid (Blink Mechanism) */}
            <mesh ref={leftEyelidRef} position={[0, 0.035, 0.02]} scale={[1, 0, 1]} material={materials.skin}>
              <sphereGeometry args={[0.084, 18, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.14, 0.09, 0.3]}>
            <group ref={rightEyeRef}>
              {/* Sclera (White) */}
              <mesh material={materials.eyeWhite}>
                <sphereGeometry args={[0.078, 20, 20]} />
              </mesh>
              {/* Iris (Dark Navy / Obsidian) */}
              <mesh position={[0, 0, 0.065]} material={materials.eyeIris}>
                <circleGeometry args={[0.046, 24]} />
              </mesh>
              {/* Pupil (Deep Black) */}
              <mesh position={[0, 0, 0.067]} material={materials.eyePupil}>
                <circleGeometry args={[0.025, 20]} />
              </mesh>
              {/* Primary Catchlight (Specular Sparkle) */}
              <mesh position={[0.016, 0.016, 0.069]} material={materials.eyeCatchlight}>
                <circleGeometry args={[0.011, 12]} />
              </mesh>
              {/* Secondary Micro-Catchlight */}
              <mesh position={[-0.012, -0.012, 0.069]} material={materials.eyeCatchlight}>
                <circleGeometry args={[0.005, 10]} />
              </mesh>
            </group>

            {/* Right Upper Eyelid (Blink Mechanism) */}
            <mesh ref={rightEyelidRef} position={[0, 0.035, 0.02]} scale={[1, 0, 1]} material={materials.skin}>
              <sphereGeometry args={[0.084, 18, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* CHIC MODERN DEVELOPER ROUNDED GLASSES */}
          {/* ======================================================== */}
          <group position={[0, 0.09, 0.38]}>
            {/* Left Glass Rim */}
            <mesh position={[-0.14, 0, 0]} material={materials.glassesFrame}>
              <torusGeometry args={[0.095, 0.01, 12, 28]} />
            </mesh>
            {/* Left Lens Sheen */}
            <mesh position={[-0.14, 0, 0]} material={materials.glassesLens}>
              <circleGeometry args={[0.09, 24]} />
            </mesh>

            {/* Right Glass Rim */}
            <mesh position={[0.14, 0, 0]} material={materials.glassesFrame}>
              <torusGeometry args={[0.095, 0.01, 12, 28]} />
            </mesh>
            {/* Right Lens Sheen */}
            <mesh position={[0.14, 0, 0]} material={materials.glassesLens}>
              <circleGeometry args={[0.09, 24]} />
            </mesh>

            {/* Connecting Bridge (Accent Glow) */}
            <mesh position={[0, 0.03, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.glassesBridge}>
              <capsuleGeometry args={[0.008, 0.08, 6, 8]} />
            </mesh>

            {/* Left Temple Arm (goes back to ear) */}
            <mesh position={[-0.24, 0, -0.16]} rotation={[0, -0.22, 0]} material={materials.glassesFrame}>
              <boxGeometry args={[0.008, 0.008, 0.32]} />
            </mesh>
            {/* Right Temple Arm (goes back to ear) */}
            <mesh position={[0.24, 0, -0.16]} rotation={[0, 0.22, 0]} material={materials.glassesFrame}>
              <boxGeometry args={[0.008, 0.008, 0.32]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
