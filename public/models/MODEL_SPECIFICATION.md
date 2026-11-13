# 3D Model Specification — "Dzaky Edition" Custom Rigged Vinyl Toy

This document defines the technical and artistic specifications for importing a custom 3D model into the portfolio.

---

## 1. File Format & Export Settings

* **Container**: `.glb` (Binary glTF 2.0 with embedded textures and geometry).
* **Target File Path**: `public/models/dzaky-avatar.glb`
* **Polygon Budget**: 15,000 to 45,000 triangles (optimized for 60 FPS in WebGL).
* **Coordinate System**: Y-Up, Character facing +Z (front).
* **Scale**: 1 unit = ~1 meter (Character seated height ~1.2 to 1.5 units).
* **Compression (Optional)**: Draco compression or standard glTF binary.

---

## 2. Skeleton & Armature Hierarchy

To enable real-time cursor tracking (head follow, eye gaze) and procedural breathing, the model should follow standard humanoid bone naming conventions:

```text
Root / Armature
└── Hips
    ├── Spine
    │   └── Spine1 (Chest)
    │       ├── LeftShoulder -> LeftArm -> LeftForeArm -> LeftHand
    │       ├── RightShoulder -> RightArm -> RightForeArm -> RightHand
    │       └── Neck
    │           └── Head
    │               ├── LeftEye
    │               ├── RightEye
    │               └── Crown (Optional bone or parented mesh)
    ├── LeftUpLeg -> LeftLeg -> LeftFoot
    └── RightUpLeg -> RightLeg -> RightFoot
```

### Key Bones for Interactive Tracking:
* `Head` (or `mixamorig:Head`): Controlled by mouse pointer coordinates (Yaw, Pitch, Roll).
* `Neck`: Secondary damping for natural head rotation.
* `LeftEye` & `RightEye` (or eye bones): Independent gaze tracking before head turns.
* `Spine` / `Chest`: Driven by idle breathing sine wave.

---

## 3. Morph Targets / Shape Keys (Facial Animation)

If facial features (eyes, eyelids) are part of the head mesh rather than bones, include these shape keys:
* `eyeBlinkLeft` & `eyeBlinkRight` (or unified `blink`): Procedural blinking every 2.5–5s.
* `mouthSmile`: Gentle friendly smile.

---

## 4. Materials & Textures (glTF PBR Metallic-Roughness)

* **Texture Resolution**: Max 2048x2048 (2K) PNG/WebP textures.
* **Channels**:
  * `BaseColor` (Albedo / Diffuse)
  * `MetallicRoughness` (Green channel = Roughness, Blue channel = Metallic)
  * `NormalMap` (OpenGL tangent space)
  * `EmissiveMap` (For glowing purple ring and royal gems)
* **Surface Finishes**:
  * **Skin**: Roughness ~0.35–0.45, Metallic ~0.04 (silky vinyl toy sheen).
  * **Hair**: Roughness ~0.6, Metallic ~0.1 (soft matte dark sculpt).
  * **Crown**: Roughness ~0.12, Metallic ~0.95 (polished reflective chrome).
  * **Suit**: Roughness ~0.55, Metallic ~0.15 (tailored charcoal cloth).
  * **Eyes**: Roughness ~0.05, Metallic ~0.0 (high-gloss specular cornea).

---

## 5. Built-in Animations (Optional)

If exporting with embedded animation clips:
* `Idle`: 3–5 second seamless loop of subtle breathing and relaxed posture.
* If no animation clip is present, the portfolio's procedural bone IK and delta-time damped tracking will animate the rig automatically.
