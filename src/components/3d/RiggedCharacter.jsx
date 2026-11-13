import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

/**
 * RiggedCharacter — Dedicated Humanoid GLB Adapter
 *
 * Asset: /models/dzaky-avatar.glb
 * Animations: idle (2s), walk (1s), run (0.67s), wave (1.6s), jump (1.1s)
 */
export default function RiggedCharacter({
  modelPath = '/models/dzaky-avatar.glb',
  pointer,
  scale = 1.62,
  position = [0, -0.92, 0],
}) {
  const characterRef = useRef(null);

  // Load raw GLTF data
  const { scene, animations } = useGLTF(modelPath);

  // Bind animation mixer directly to the root scene object
  const { actions, names } = useAnimations(animations, scene);

  // Track active animation state
  const isWavingRef = useRef(false);

  // Discover and cache skeleton joints
  const bones = useMemo(() => {
    let head = null;
    let neck = null;
    let chest = null;
    let spine = null;
    let hips = null;

    scene.traverse((child) => {
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

        if (child.material) {
          const mat = child.material;
          mat.roughness = Math.max(0.35, mat.roughness ?? 0.5);
          mat.metalness = mat.metalness ?? 0.05;
          mat.needsUpdate = true;
        }
      }
    });

    return { head, neck, chest, spine, hips };
  }, [scene]);

  // Start 'idle' animation on mount
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    const idleClip = actions['idle'] || actions[names[0]];
    if (idleClip) {
      idleClip.reset().fadeIn(0.4).play();
    }

    return () => {
      if (idleClip) idleClip.fadeOut(0.3);
    };
  }, [actions, names]);

  // Interactive wave trigger on click or tap
  const triggerWave = useCallback(() => {
    if (isWavingRef.current || !actions || !actions['wave']) return;

    isWavingRef.current = true;
    const waveClip = actions['wave'];
    const idleClip = actions['idle'];

    if (idleClip) idleClip.fadeOut(0.25);

    waveClip
      .reset()
      .setLoop(THREE.LoopOnce, 1)
      .fadeIn(0.25)
      .play();
    waveClip.clampWhenFinished = true;

    const timer = setTimeout(() => {
      if (waveClip) waveClip.fadeOut(0.35);
      if (idleClip) {
        idleClip.reset().fadeIn(0.35).play();
      }
      isWavingRef.current = false;
    }, 1600);

    return () => clearTimeout(timer);
  }, [actions]);

  // Damped pointer tracking & natural life breathing
  useFrame((state, delta) => {
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;
    const t = state.clock.getElapsedTime();

    // Natural subtle life breathing
    const microLifeX = Math.sin(t * 0.8) * 0.015;
    const microLifeY = Math.cos(t * 0.9) * 0.012;

    // 1. Smooth Head & Neck Tracking
    if (bones.head) {
      const targetHeadYaw = Math.max(-0.48, Math.min(0.48, px * 0.45 + microLifeX));
      const targetHeadPitch = Math.max(-0.3, Math.min(0.28, -py * 0.32 + microLifeY));
      const targetHeadRoll = Math.max(-0.1, Math.min(0.1, -px * 0.08));

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

    // 2. Whole body subtle reorientation toward pointer
    if (characterRef.current) {
      const targetBodyYaw = px * 0.18;
      characterRef.current.rotation.y = THREE.MathUtils.damp(
        characterRef.current.rotation.y,
        targetBodyYaw,
        3.5,
        delta
      );
    }
  });

  return (
    <group
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
        <primitive object={scene} />
      </group>
    </group>
  );
}
