import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

/**
 * RiggedCharacter — Dedicated GLB/GLTF Skeletal & Morph Target Adapter
 * 
 * Supports:
 * - Full SkinnedMesh & Bone Armatures (standard Humanoid / Mixamo / Blender Rigify)
 * - Dynamic Bone Discovery: 'Head', 'Neck', 'Spine', 'LeftEye', 'RightEye'
 * - Real-Time Cursor Tracking: Head & Eye orientation with delta-time damping
 * - Embedded Animation Clips: Auto-plays 'Idle' or takes procedural control
 * - Morph Targets / Shape Keys: Procedural eye blinking via morphTargetInfluences
 * - PBR Material Optimization: Traverses scene to configure shadow maps and luster
 */
export default function RiggedCharacter({ modelPath = '/models/dzaky-avatar.glb', pointer }) {
  const groupRef = useRef(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names } = useAnimations(animations, groupRef);

  // Blink state tracking
  const blinkStateRef = useRef({
    isBlinking: false,
    nextBlinkTime: 2.5,
    blinkProgress: 0,
    blinkDuration: 0.16,
  });

  // Dynamic Bone & Morph Target Discovery
  const rigData = useMemo(() => {
    let headBone = null;
    let neckBone = null;
    let spineBone = null;
    let leftEyeBone = null;
    let rightEyeBone = null;
    const morphMeshes = [];

    scene.traverse((child) => {
      if (child.isBone) {
        const name = child.name.toLowerCase();
        if (name.includes('head') && !headBone) headBone = child;
        else if (name.includes('neck') && !neckBone) neckBone = child;
        else if ((name.includes('spine') || name.includes('chest')) && !spineBone) spineBone = child;
        else if (name.includes('lefteye') || name.includes('eye_l') || name.includes('eye.l')) leftEyeBone = child;
        else if (name.includes('righteye') || name.includes('eye_r') || name.includes('eye.r')) rightEyeBone = child;
      }

      if (child.isMesh || child.isSkinnedMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.morphTargetDictionary && child.morphTargetInfluences) {
          morphMeshes.push(child);
        }
      }
    });

    return { headBone, neckBone, spineBone, leftEyeBone, rightEyeBone, morphMeshes };
  }, [scene]);

  // Auto-play idle animation if available in GLB
  useEffect(() => {
    if (names.length > 0) {
      const idleName = names.find((n) => n.toLowerCase().includes('idle')) || names[0];
      if (actions[idleName]) {
        actions[idleName].reset().fadeIn(0.5).play();
      }
    }
  }, [actions, names]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const px = pointer?.current?.x || 0;
    const py = pointer?.current?.y || 0;

    const microLifeX = Math.sin(t * 0.7) * 0.01;
    const microLifeY = Math.cos(t * 0.8) * 0.008;
    const breathCycle = Math.sin(t * 1.8);

    // 1. Head Bone Rotation (Mouse Tracking)
    if (rigData.headBone) {
      const targetYaw = Math.max(-0.45, Math.min(0.45, px * 0.45 + microLifeX));
      const targetPitch = Math.max(-0.25, Math.min(0.25, -py * 0.28 + microLifeY));
      const targetRoll = Math.max(-0.08, Math.min(0.08, -px * 0.08));

      rigData.headBone.rotation.y = THREE.MathUtils.damp(
        rigData.headBone.rotation.y,
        targetYaw,
        5.5,
        delta
      );
      rigData.headBone.rotation.x = THREE.MathUtils.damp(
        rigData.headBone.rotation.x,
        targetPitch,
        5.5,
        delta
      );
      rigData.headBone.rotation.z = THREE.MathUtils.damp(
        rigData.headBone.rotation.z,
        targetRoll,
        4.5,
        delta
      );
    } else if (groupRef.current && names.length === 0) {
      // Fallback: If unrigged static GLB, smoothly rotate root group
      const targetYaw = px * 0.35;
      const targetPitch = -py * 0.2;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetYaw, 5.0, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetPitch, 5.0, delta);
    }

    // 2. Eye Bones Tracking (if available in rig)
    const eyeYaw = Math.max(-0.35, Math.min(0.35, px * 0.35));
    const eyePitch = Math.max(-0.25, Math.min(0.25, -py * 0.25));

    if (rigData.leftEyeBone) {
      rigData.leftEyeBone.rotation.y = THREE.MathUtils.damp(rigData.leftEyeBone.rotation.y, eyeYaw, 9.0, delta);
      rigData.leftEyeBone.rotation.x = THREE.MathUtils.damp(rigData.leftEyeBone.rotation.x, eyePitch, 9.0, delta);
    }
    if (rigData.rightEyeBone) {
      rigData.rightEyeBone.rotation.y = THREE.MathUtils.damp(rigData.rightEyeBone.rotation.y, eyeYaw, 9.0, delta);
      rigData.rightEyeBone.rotation.x = THREE.MathUtils.damp(rigData.rightEyeBone.rotation.x, eyePitch, 9.0, delta);
    }

    // 3. Spine Breathing (if not driven by baked animation)
    if (rigData.spineBone && names.length === 0) {
      rigData.spineBone.rotation.x = breathCycle * 0.015;
    }

    // 4. Procedural Blinking via Morph Targets / Shape Keys
    const blink = blinkStateRef.current;
    if (!blink.isBlinking && t >= blink.nextBlinkTime) {
      blink.isBlinking = true;
      blink.blinkProgress = 0;
      blink.nextBlinkTime = t + 2.2 + Math.random() * 3.5;
    }

    if (blink.isBlinking && rigData.morphMeshes.length > 0) {
      blink.blinkProgress += delta / blink.blinkDuration;
      let influence = 0;

      if (blink.blinkProgress <= 0.5) {
        influence = Math.sin(blink.blinkProgress * Math.PI);
      } else if (blink.blinkProgress <= 1.0) {
        influence = Math.sin(blink.blinkProgress * Math.PI);
      } else {
        blink.isBlinking = false;
        influence = 0;
      }

      rigData.morphMeshes.forEach((mesh) => {
        const dict = mesh.morphTargetDictionary;
        ['blink', 'eyeBlinkLeft', 'eyeBlinkRight', 'eyesBlink'].forEach((key) => {
          if (dict[key] !== undefined) {
            mesh.morphTargetInfluences[dict[key]] = influence;
          }
        });
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.65, 0]} scale={1.0}>
      <primitive object={scene} />
    </group>
  );
}

// Preload helper for snappy asset caching
export function preloadModel(path = '/models/dzaky-avatar.glb') {
  useGLTF.preload(path);
}
