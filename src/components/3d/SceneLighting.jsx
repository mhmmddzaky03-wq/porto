import React from 'react';

/**
 * SceneLighting
 * Soft cinematic studio lighting with purple neon accents
 * calibrated for the "Dzaky Edition" designer vinyl toy presentation.
 * - Warm frontal key light for facial clarity, skin luster, and eye catchlights
 * - Soft cool fill light to balance shadows
 * - Vibrant neon purple & magenta rim lights for premium collectible contrast
 * - Subtle violet under-bounce simulating a lighted display base
 */
export default function SceneLighting() {
  return (
    <>
      {/* Soft atmospheric ambient base with violet tint */}
      <ambientLight intensity={0.7} color="#1a1528" />

      {/* Main Frontal Key Light - Illuminates vinyl skin and eyes */}
      <directionalLight
        position={[0.6, 2.2, 3.2]}
        intensity={1.7}
        color="#fffaf5"
      />

      {/* Top-Right Soft Diffuse Light */}
      <directionalLight
        position={[2.5, 3.5, 2.2]}
        intensity={0.8}
        color="#e9d5ff"
      />

      {/* Lateral Fill Light (Left) */}
      <directionalLight
        position={[-3, 1.2, 1.8]}
        intensity={0.65}
        color="#60a5fa"
      />

      {/* Signature Purple Neon Rim Light (Behind-Right) */}
      {/* Creates the glowing purple edge highlight on hair, crown & suit */}
      <directionalLight
        position={[2.4, 2.6, -2.2]}
        intensity={3.6}
        color="#A855F7"
      />

      {/* Secondary Violet / Magenta Edge Light (Behind-Left) */}
      <directionalLight
        position={[-2.4, 1.8, -2.0]}
        intensity={2.2}
        color="#C084FC"
      />

      {/* Subtle under-bounce light (simulates glowing collectible pedestal) */}
      <pointLight
        position={[0, -1.8, 1.2]}
        intensity={0.9}
        color="#9333EA"
        distance={4.5}
        decay={2}
      />
    </>
  );
}
