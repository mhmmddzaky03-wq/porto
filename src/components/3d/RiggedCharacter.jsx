import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

/**
 * RiggedCharacter — Dedicated Grab3D Humanoid GLB Adapter
 *
 * Asset: /models/dzaky-avatar.glb (611 KB)
 * Hierarchy: rig -> hips -> spine -> chest -> neck -> head
 * Animations: idle (2s), walk (1s), run (0.67s), wave (1.6s), jump (1.1s)
 */
export default function RiggedCharacter({
  modelPath = '/models/dzaky-avatar.glb',
  pointer,
  scale = 1.62,
  position = [0, -0.92, 0],
}) {
  const groupRef = useRef(null);
  const characterRef = useRef(null);

  // Load raw GLTF data
  const { scene, animations } = useGLTF(modelPath);

  // Safely clone scene using SkeletonUtils to retain clean bone bindings
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Hook up animation clips via Drei useAnimations
  const { actions, names } = useAnimations(animations, groupRef);

  // State to track active primary animation ('idle' | 'wave')
  const [currentAction, setCurrentAction] = useState('idle');
  const isWavingRef = useRef(false);

  // Discover and cache skeleton joints dynamically
  const bones = useMemo(() => {
    let head = null;
    let neck = null;
    let chest = null;
    let spine = null;
    let hips = null;

    clonedScene.traverse((child) => {
      if (child.isBone) {
        const lower = child.name.toLowerCase();
        if (lower === 'head') head = child;
        else if (lower === 'neck') neck = child;
        else if (lower === 'chest') chest = child;
        else if (lower === 'spine') spine = child;
        else if (lower === 'hips') hips = child;
      }

      if (child.isMesh || child.isSkinnedMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Enhance material surface response for dark portfolio lighting
        if (child.material) {
          const mat = child.material;
          mat.roughness = Math.max(0.35, mat.roughness ?? 0.5);
          mat.metalness = mat.metalness ?? 0.05;
          mat.needsUpdate = true;
        }
      }
    });

    return { head, neck, chest, spine, hips };
  }, [clonedScene]);

  // Play 'idle' animation on mount
  useEffect(() => {
    if (!actions) return;

    const idleClip = actions['idle'] || actions[names[0]];
    if (idleClip) {
      idleClip.reset().fadeIn(0.4).play();
    }

    return () => {
      if (idleClip) idleClip.fadeOut(0.3);
    };
  }, [actions, names]);

  // Interactive wave trigger when user clicks or taps character
  const triggerWave = useCallback(() => {
    if (isWavingRef.current || !actions || !actions['wave']) return;

    isWavingRef.current = true;
    setCurrentAction('wave');

    const waveClip = actions['wave'];
    const idleClip = actions['idle'];

    if (idleClip) idleClip.fadeOut(0.25);

    waveClip
      .reset()
      .setLoop(THREE.LoopOnce, 1)
      .fadeIn(0.25)
      .play();
    waveClip.clampWhenFinished = true;

    // After 1.6s wave completes, crossfade back to idle
    const timer = setTimeout(() => {
      if (waveClip) waveClip.fadeOut(0.35);
      if (idleClip) {
        idleClip.reset().fadeIn(0.35).play();
      }
      isWavingRef.current = false;
      setCurrentAction('idle');
    }, 1600);

    return () => clearTimeout(timer);
  }, [actions]);

  // Real-time mouse tracking and procedural life
  // Priority 1 ensures this executes AFTER Drei's mixer.update(delta) (priority 0)
  useFrame((state, delta) => {
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;
    const t = state.clock.getElapsedTime();

    // Subtle natural life cycle
    const microLifeX = Math.sin(t * 0.8) * 0.015;
    const microLifeY = Math.cos(t * 0.9) * 0.012;

    // 1. Smooth Head & Neck Tracking
    if (bones.head) {
      // Head orientation limits
      const targetHeadYaw = Math.max(-0.48, Math.min(0.48, px * 0.45 + microLifeX));
      const targetHeadPitch = Math.max(-0.3, Math.min(0.28, -py * 0.32 + microLifeY));
      const targetHeadRoll = Math.max(-0.1, Math.min(0.1, -px * 0.08));

      // Damped procedural override on top of baked animation
      bones.head.rotation.y = THREE.MathUtils.damp(
        bones.head.rotation.y,
        targetHeadYaw,
        6.0,
        delta
      );
      bones.head.rotation.x = THREE.MathUtils.damp(
        bones.head.rotation.x,
        targetHeadPitch,
        6.0,
        delta
      );
      bones.head.rotation.z = THREE.MathUtils.damp(
        bones.head.rotation.z,
        targetHeadRoll,
        5.0,
        delta
      );
    }

    if (bones.neck) {
      // Neck follows head at ~35% intensity for natural anatomy
      const targetNeckYaw = px * 0.16;
      const targetNeckPitch = -py * 0.12;

      bones.neck.rotation.y = THREE.MathUtils.damp(
        bones.neck.rotation.y,
        targetNeckYaw,
        5.0,
        delta
      );
      bones.neck.rotation.x = THREE.MathUtils.damp(
        bones.neck.rotation.x,
        targetNeckPitch,
        5.0,
        delta
      );
    }

    // 2. Subtle Whole Body Reorientation towards pointer
    if (characterRef.current) {
      const targetBodyYaw = px * 0.18;
      characterRef.current.rotation.y = THREE.MathUtils.damp(
        characterRef.current.rotation.y,
        targetBodyYaw,
        3.5,
        delta
      );
    }
  }, 1);

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onClick={triggerWave}
      onPointerOver={() => {
        if (typeof document !== 'undefined') {
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        if (typeof document !== 'undefined') {
          document.body.style.cursor = 'default';
        }
      }}
    >
      <group ref={characterRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

// Preload helper so the GLB is fetched and parsed early in the browser cache
export function preloadModel(path = '/models/dzaky-avatar.glb') {
  useGLTF.preload(path);
}
