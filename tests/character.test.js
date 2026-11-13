import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('dzaky-avatar.glb exists and is a valid GLB binary', () => {
  const modelPath = 'public/models/dzaky-avatar.glb';
  assert.ok(fs.existsSync(modelPath), 'dzaky-avatar.glb must exist in public/models/');
  
  const stats = fs.statSync(modelPath);
  assert.ok(stats.size > 500000, `Model size should be >500KB, got ${stats.size} bytes`);
  
  // Verify GLB magic header (0x46546C67 -> "glTF")
  const buffer = Buffer.alloc(4);
  const fd = fs.openSync(modelPath, 'r');
  fs.readSync(fd, buffer, 0, 4, 0);
  fs.closeSync(fd);
  
  assert.equal(buffer.toString('utf-8'), 'glTF', 'File must start with "glTF" magic header');
});

test('CharacterScene and RiggedCharacter source files exist and have no syntax errors', () => {
  const sceneSrc = fs.readFileSync('src/components/3d/CharacterScene.jsx', 'utf-8');
  assert.ok(sceneSrc.includes('useGLTF.preload'), 'Preload GLB in CharacterScene');
  assert.ok(sceneSrc.includes('SceneLighting'), 'SceneLighting must be included');
  assert.ok(sceneSrc.includes('FloatingObjects'), 'FloatingObjects must be included');

  const riggedSrc = fs.readFileSync('src/components/3d/RiggedCharacter.jsx', 'utf-8');
  assert.ok(riggedSrc.includes('useAnimations'), 'Animation clips bound');
  assert.ok(!riggedSrc.includes(', 1);'), 'No priority number overriding R3F render loop');
});
