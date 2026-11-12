import React from 'react';

/**
 * SceneLighting
 * Multi-point studio lighting calibrated for dark creative portfolio aesthetic.
 * - Warm soft frontal key light for clear facial features and eyes
 * - Cool lateral fill light for depth
 * - Iconic accent red rim light and rear edge glow (#FF2A3B)
 * - Subtle ambient light to keep shadowed geometry rich
 */
export default function SceneLighting() {
  return (
    <>
      {/* Soft cool ambient base */}
      <ambientLight intensity={0.65} color="#182030" />

      {/* Main Frontal Key Light - Illuminates face and eyes with warm clarity */}
      <directionalLight
        position={[0.5, 2, 3]}
        intensity={1.6}
        color="#fff8f2"
      />

      {/* Top-Right Soft Diffuse Light */}
      <directionalLight
        position={[2.5, 3.5, 2]}
        intensity={0.9}
        color="#e0e7ff"
      />

      {/* Lateral Fill Light (Left) */}
      <directionalLight
        position={[-3, 1, 1.5]}
        intensity={0.7}
        color="#38bdf8"
      />

      {/* Signature Cyber Red Rim Light (Behind-Right) */}
      <directionalLight
        position={[2.2, 2.5, -2]}
        intensity={3.4}
        color="#FF2A3B"
      />

      {/* Secondary Rim Light (Behind-Left) */}
      <directionalLight
        position={[-2.2, 1.8, -1.8]}
        intensity={1.8}
        color="#ff5967"
      />

      {/* Subtle under-bounce light */}
      <pointLight
        position={[0, -1.8, 1.2]}
        intensity={0.7}
        color="#FF2A3B"
        distance={4}
        decay={2}
      />
    </>
  );
}
