# 3D Model Specification — "Dzaky Edition" Grab3D Humanoid GLB

This document defines the asset specifications, joint hierarchy, and animation clips for `public/models/dzaky-avatar.glb`.

---

## 1. Asset Overview & Verification

* **File**: `public/models/dzaky-avatar.glb`
* **File Size**: 625,604 bytes (611 KB)
* **Container**: Binary glTF 2.0 (glTF 2.0 / three.js GLTFExporter)
* **License**: CC0 1.0 Universal (Grab3D Character Mixer)
* **Mesh**: 1 SkinnedMesh (`character`) with 28 primitives
* **Materials**: 28 PBR Metallic-Roughness materials
* **Joints / Bones**: 19 joints bound to a single skin
* **Dimensions**:
  * Width: 0.906 units
  * Height: 1.146 units (Y: 0.00 to 1.15)
  * Depth: 0.575 units (Z: -0.22 to +0.35)
  * Natural Facing: +Z (Camera forward)

---

## 2. Skeleton & Joint Hierarchy

The Grab3D character rig uses Blender-style dot notation:

```text
Node 0: rig (Root Armature)
└── Node 1: hips
    ├── Node 2: spine
    │   └── Node 3: chest
    │       ├── Node 4: neck
    │       │   └── Node 5: head
    │       ├── Node 6: shoulder.L ──> upperArm.L (7) ──> lowerArm.L (8) ──> hand.L (9)
    │       └── Node 10: shoulder.R ──> upperArm.R (11) ──> lowerArm.R (12) ──> hand.R (13)
    ├── Node 14: upperLeg.L ──> lowerLeg.L (15) ──> foot.L (16)
    └── Node 17: upperLeg.R ──> lowerLeg.R (18) ──> foot.R (19)
```

### Dynamic Tracking Controls
* **`head` (Node 5)**: Real-time cursor tracking (Yaw: ±0.48 rad, Pitch: -0.30 to +0.28 rad, Roll: ±0.1 rad). Damping factor: 6.0.
* **`neck` (Node 4)**: Secondary anatomical follow at 35% tracking intensity.
* **`groupRef`**: Subtle whole-body yaw orientation following cursor.

---

## 3. Embedded Animation Clips (5 Clips)

1. **`idle`** (Duration: 2.00s, 57 channels)
   * Natural standing posture with subtle breathing and balance shift.
   * Auto-played on mount with `fadeIn(0.4)`.
2. **`wave`** (Duration: 1.60s, 57 channels)
   * Friendly wave gesture with right arm and hand.
   * Triggered on character click/tap, crossfading back to `idle` upon completion.
3. **`walk`** (Duration: 1.00s, 57 channels)
4. **`run`** (Duration: 0.67s, 57 channels)
5. **`jump`** (Duration: 1.10s, 57 channels)

---

## 4. Materials & Shading

* **Skin**: Base color `[0.81, 0.43, 0.25, 1.0]` (warm medium tan).
* **Hair**: `[0.013, 0.012, 0.016, 1.0]` (deep dark bob).
* **Crown**: `hat_metal` with accent gems (`hat_secondary`, `hat_accent`).
* **Outfit**: `top_primary`, `top_secondary`, `bottom_primary` (jeans), `shoes_primary` & `shoes_secondary` (sneakers).
* All materials are traversed upon mount to ensure shadow casting (`castShadow = true`), shadow receiving (`receiveShadow = true`), and calibrated roughness for dark portfolio lighting.
