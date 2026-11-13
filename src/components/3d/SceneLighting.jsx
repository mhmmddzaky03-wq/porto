import React from 'react';

/**
 * SceneLighting
 * Calibrated studio lighting setup for the "Dzaky Edition" vinyl toy:
 * - Warm frontal key light for vinyl skin luster, facial features, and eye reflections
 * - Soft diffuse fill light to prevent harsh unlit shadows
 * - Signature dual neon purple & magenta rim lights that carve out the silhouette
 *   of the crown, hair waves, suit shoulders, and chair against the dark background
 * - Upward violet point light simulating the glowing LED pedestal
 */
export default function SceneLighting() {
  return (
    <>
      {/* Soft atmospheric ambient base */}
      <ambientLight intensity={0.72} color="#141122" />

      {/* Main Frontal Key Light - Warm Studio Softbox */}
      <directionalLight
        position={[1.2, 2.5, 3.2]}
        intensity={1.85}
        color="#FFF6ED"
      />

      {/* Top Diffuse Soft Light */}
      <directionalLight
        position={[0, 4.0, 1.8]}
        intensity={0.65}
        color="#E2E8F0"
      />

      {/* Left Cool Diffuse Fill Light */}
      <directionalLight
        position={[-2.8, 1.5, 2.0]}
        intensity={0.65}
        color="#94A3B8"
      />

      {/* Signature Purple Neon Rim Light (Behind-Right) */}
      <directionalLight
        position={[2.6, 2.4, -2.4]}
        intensity={4.2}
        color="#A855F7"
      />

      {/* Secondary Magenta/Violet Edge Light (Behind-Left) */}
      <directionalLight
        position={[-2.6, 2.0, -2.2]}
        intensity={2.8}
        color="#C084FC"
      />

      {/* Glowing Pedestal LED Upward Light */}
      <pointLight
        position={[0, -0.95, 0.35]}
        intensity={2.2}
        color="#A855F7"
        distance={3.6}
        decay={2}
      />
    </>
  );
}
