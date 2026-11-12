import React from 'react';

/**
 * SceneLighting
 * Calibrated precisely for the dark creative developer atmosphere
 * seen in public/references/avatar-reference.png:
 * - Warm frontal key light for facial vinyl clarity, skin luster, and eyes
 * - Soft cool diffuse fill light to prevent black crushing in shadows
 * - Signature violet/purple neon rim lights (#A855F7, #C084FC) highlighting
 *   the silver crown, black fluffy curls, suit lapels, and chair contours
 * - Violet floor point light illuminating the pedestal base & sneakers
 */
export default function SceneLighting() {
  return (
    <>
      {/* Ambient base with soft twilight violet tint */}
      <ambientLight intensity={0.75} color="#151224" />

      {/* Frontal Key Light - Soft Warm Studio Luster */}
      <directionalLight
        position={[0.8, 2.4, 3.4]}
        intensity={1.9}
        color="#FFF8F0"
      />

      {/* Top Diffuse Softbox */}
      <directionalLight
        position={[0, 4.0, 1.8]}
        intensity={0.7}
        color="#E2E8F0"
      />

      {/* Left Cool Fill Light */}
      <directionalLight
        position={[-3.2, 1.4, 2.0]}
        intensity={0.65}
        color="#94A3B8"
      />

      {/* Main Signature Purple Rim Light (Behind-Right) */}
      {/* Creates the glowing purple edge on the crown, curls, and pod chair */}
      <directionalLight
        position={[2.8, 2.6, -2.4]}
        intensity={4.2}
        color="#A855F7"
      />

      {/* Secondary Magenta/Violet Rim Light (Behind-Left) */}
      <directionalLight
        position={[-2.6, 2.2, -2.2]}
        intensity={2.8}
        color="#C084FC"
      />

      {/* Pedestal Under-Glow Point Light */}
      {/* Simulates the glowing purple LED ring embedded in the plinth */}
      <pointLight
        position={[0, -0.9, 0.4]}
        intensity={2.0}
        color="#9333EA"
        distance={3.5}
        decay={2}
      />
    </>
  );
}
