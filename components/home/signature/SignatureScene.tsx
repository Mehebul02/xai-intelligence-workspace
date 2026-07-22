"use client"
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, } from "react";
import * as THREE from "three";
type Formation = "sphere" | "helix" | "cube" | "disc";
const COUNT = 900;

function buildTargets(): Record<Formation, Float32Array> {
  const sphere = new Float32Array(COUNT * 3);
  const helix = new Float32Array(COUNT * 3);
  const cube = new Float32Array(COUNT * 3);
  const disc = new Float32Array(COUNT * 3);

  const side = Math.round(Math.cbrt(COUNT));
  for (let i = 0; i < COUNT; i++) {
    // sphere
    const r = 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    sphere[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    sphere[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    sphere[i * 3 + 2] = r * Math.cos(phi);
    const t = i / COUNT;
    const arm = i % 2 === 0 ? 0 : Math.PI;
    helix[i * 3] = Math.cos(t * Math.PI * 8 + arm) * (0.6 + t * 0.9);
    helix[i * 3 + 1] = (t - 0.5) * 3.2;
    helix[i * 3 + 2] = Math.sin(t * Math.PI * 8 + arm) * (0.6 + t * 0.9);

    // cube lattice
    const cx = i % side;
    const cy = Math.floor(i / side) % side;
    const cz = Math.floor(i / (side * side));
    const step = 2.4 / side;
    cube[i * 3] = (cx - side / 2) * step;
    cube[i * 3 + 1] = (cy - side / 2) * step;
    cube[i * 3 + 2] = (cz - side / 2) * step;

    // disc
    const rr = Math.sqrt(Math.random()) * 1.9;
    const th = Math.random() * Math.PI * 2;
    disc[i * 3] = Math.cos(th) * rr;
    disc[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
    disc[i * 3 + 2] = Math.sin(th) * rr;
  }
  return { sphere, helix, cube, disc };
}

function Cluster({
  formation,
  hovering,
}: {
  formation: Formation;
  hovering: React.MutableRefObject<{ x: number; y: number; active: number }>;
}) {
  const targets = useMemo(buildTargets, []);
  const meshRef = useRef<THREE.Points>(null!);

  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const from = new Float32Array(targets.sphere);
    const to = new Float32Array(targets.sphere);
    const seed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) seed[i] = Math.random();
    g.setAttribute("aFrom", new THREE.BufferAttribute(from, 3));
    g.setAttribute("aTo", new THREE.BufferAttribute(to, 3));
    g.setAttribute("seed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));

    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uProgress: { value: 1 },
        uTime: { value: 0 },
        uCursor: { value: new THREE.Vector3() },
        uColor: { value: new THREE.Color("#8ee8f0") },
      },
      vertexShader: /* glsl */ `
        attribute vec3 aFrom;
        attribute vec3 aTo;
        attribute float seed;
        uniform float uProgress;
        uniform float uTime;
        uniform vec3 uCursor;
        varying float vGlow;
        void main() {
          float local = clamp((uProgress - seed * 0.4) / 0.6, 0.0, 1.0);
          local = local * local * (3.0 - 2.0 * local);
          vec3 pos = mix(aFrom, aTo, local);

          // cursor magnetism
          vec3 delta = pos - uCursor;
          float d = length(delta);
          float pull = smoothstep(1.4, 0.0, d) * 0.5;
          pos += normalize(delta + 1e-4) * pull;

          // breathing
          pos *= 1.0 + sin(uTime * 0.6 + seed * 6.28) * 0.008;

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = 3.2;
          vGlow = pull * 2.0 + 0.5;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        varying float vGlow;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor * vGlow, a * 0.9);
        }
      `,
    });
    return { geometry: g, material: m };
  }, [targets]);

  // Swap targets when formation changes and animate progress 0 → 1
  const activeFormation = useRef<Formation>("sphere");
  const progressTarget = useRef(1);
  if (formation !== activeFormation.current) {
    const posAttr = geometry.getAttribute("aFrom") as THREE.BufferAttribute;
    const toAttr = geometry.getAttribute("aTo") as THREE.BufferAttribute;
    // freeze current interpolated position into aFrom
    const p = material.uniforms.uProgress.value as number;
    const from = posAttr.array as Float32Array;
    const to = toAttr.array as Float32Array;
    for (let i = 0; i < COUNT * 3; i++) from[i] = from[i] + (to[i] - from[i]) * p;
    const next = targets[formation];
    for (let i = 0; i < COUNT * 3; i++) to[i] = next[i];
    posAttr.needsUpdate = true;
    toAttr.needsUpdate = true;
    material.uniforms.uProgress.value = 0;
    progressTarget.current = 1;
    activeFormation.current = formation;
  }

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta;
    const cur = material.uniforms.uProgress.value as number;
    material.uniforms.uProgress.value = cur + (progressTarget.current - cur) * 0.06;
    material.uniforms.uCursor.value.set(
      hovering.current.x * 2,
      hovering.current.y * 1.5,
      0,
    );
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.08;
  });

  return <points ref={meshRef} geometry={geometry} material={material} />;
}

export function SignatureScene({
  formation,
  hovering,
}: {
  formation: Formation;
  hovering: React.MutableRefObject<{ x: number; y: number; active: number }>;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Cluster formation={formation} hovering={hovering} />
    </Canvas>
  );
}

export type { Formation };