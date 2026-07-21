import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type ReactElement } from "react";
import * as THREE from "three";

/**
 * Hero centerpiece: N particles that live between two positions —
 *   A = organic sphere cloud (raw data)
 *   B = structured lattice grid (intelligence)
 * A single `progress` uniform (driven by scroll + cursor) morphs between them.
 */
function DataField({ progress }: { progress: React.MutableRefObject<number> }) {
  const COUNT = 2200;
  const points = useRef<THREE.Points>(null!);
  const { pointer } = useThree();

  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const a = new Float32Array(COUNT * 3); // raw
    const b = new Float32Array(COUNT * 3); // structured
    const seed = new Float32Array(COUNT);

    const side = Math.ceil(Math.sqrt(COUNT));
    for (let i = 0; i < COUNT; i++) {
      // A — noisy sphere shell
      const r = 2.2 + (Math.random() - 0.5) * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      a[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      a[i * 3 + 2] = r * Math.cos(phi);

      // B — flat lattice grid
      const gx = i % side;
      const gy = Math.floor(i / side);
      const step = 4.4 / side;
      b[i * 3] = (gx - side / 2) * step;
      b[i * 3 + 1] = (gy - side / 2) * step;
      b[i * 3 + 2] = 0;

      seed[i] = Math.random();
    }

    g.setAttribute("positionA", new THREE.BufferAttribute(a, 3));
    g.setAttribute("positionB", new THREE.BufferAttribute(b, 3));
    g.setAttribute("seed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));

    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2() },
        uColorA: { value: new THREE.Color("#8ee3ea") },
        uColorB: { value: new THREE.Color("#dfeff2") },
      },
      vertexShader: /* glsl */ `
        attribute vec3 positionA;
        attribute vec3 positionB;
        attribute float seed;
        uniform float uProgress;
        uniform float uTime;
        uniform vec2 uPointer;
        varying float vMix;
        varying float vSeed;

        void main() {
          float t = smoothstep(0.0, 1.0, uProgress);
          // per-particle stagger so morph feels alive, not linear
          float local = clamp((t - seed * 0.35) / 0.65, 0.0, 1.0);
          local = smoothstep(0.0, 1.0, local);

          vec3 pos = mix(positionA, positionB, local);

          // Gentle drift on the raw side
          float drift = (1.0 - local);
          pos.x += sin(uTime * 0.4 + seed * 6.28) * 0.15 * drift;
          pos.y += cos(uTime * 0.5 + seed * 6.28) * 0.15 * drift;
          pos.z += sin(uTime * 0.3 + seed * 3.14) * 0.15 * drift;

          // Cursor repel — subtle magnetic push
          vec2 delta = pos.xy - uPointer * 2.5;
          float d = length(delta);
          float push = smoothstep(1.2, 0.0, d) * 0.35;
          pos.xy += normalize(delta + 1e-4) * push;

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = mix(1.8, 1.1, local) * 3.0;
          vMix = local;
          vSeed = seed;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying float vMix;
        varying float vSeed;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float alpha = smoothstep(0.5, 0.0, d);
          vec3 col = mix(uColorA, uColorB, vMix);
          gl_FragColor = vec4(col, alpha * mix(0.35, 0.75, vSeed));
        }
      `,
    });

    return { geometry: g, material: m };
  }, []);

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;
    // Smooth-ease the incoming progress
    const target = progress.current;
    const cur = material.uniforms.uProgress.value as number;
    material.uniforms.uProgress.value = cur + (target - cur) * 0.08;
    material.uniforms.uPointer.value.lerp(pointer, 0.06);
    if (points.current) {
      points.current.rotation.y += delta * 0.04;
    }
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

function LatticeFrame({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (!group.current) return;
    const t = Math.min(1, Math.max(0, progress.current));
    group.current.children.forEach((c) => {
      const m = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity = 0.18 * t;
    });
    group.current.rotation.z = (1 - t) * 0.15;
  });
  const lines = useMemo(() => {
    const arr: ReactElement[] = [];
    const geo = new THREE.PlaneGeometry(4.6, 0.004);
    for (let i = -3; i <= 3; i++) {
      arr.push(
        <mesh key={`h${i}`} position={[0, i * 0.66, 0]} geometry={geo}>
          <meshBasicMaterial color="#7cd7e0" transparent opacity={0} />
        </mesh>,
        <mesh
          key={`v${i}`}
          position={[i * 0.66, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          geometry={geo}
        >
          <meshBasicMaterial color="#7cd7e0" transparent opacity={0} />
        </mesh>,
      );
    }
    return arr;
  }, []);
  return <group ref={group}>{lines}</group>;
}

export function HeroScene({ progress }: { progress: React.MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <DataField progress={progress} />
      <LatticeFrame progress={progress} />
    </Canvas>
  );
}