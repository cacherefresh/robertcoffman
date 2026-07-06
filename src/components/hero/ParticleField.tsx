"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { computeOrbitLayout } from "./orbitLayout";
import { mulberry32 } from "@/lib/prng";

const energyVertex = /* glsl */ `
  attribute float aOffset;
  attribute float aRadius;
  attribute float aSpeed;
  uniform float uTime;
  varying float vAlpha;

  void main() {
    float cycle = fract(uTime * aSpeed + aOffset);
    float y = mix(-2.4, 2.4, cycle);
    vec3 pos = vec3(position.x, y, position.z) * vec3(aRadius, 1.0, aRadius);
    vAlpha = sin(cycle * 3.14159265);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.8 * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const energyFragment = /* glsl */ `
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    vec3 color = vec3(0.96, 0.77, 0.32);
    gl_FragColor = vec4(color * glow, glow * vAlpha * 0.55);
  }
`;

function AscendingEmbers({ count = 90 }: { count?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, offsets, radii, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    const radii = new Float32Array(count);
    const speeds = new Float32Array(count);
    const rand = mulberry32(1337);

    for (let i = 0; i < count; i++) {
      const angle = rand() * Math.PI * 2;
      const r = 1.0 + rand() * 1.4;
      positions[i * 3] = Math.cos(angle);
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(angle);
      radii[i] = r;
      offsets[i] = rand();
      speeds[i] = 0.05 + rand() * 0.08;
    }

    return { positions, offsets, radii, speeds };
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aOffset" args={[offsets, 1]} />
        <bufferAttribute attach="attributes-aRadius" args={[radii, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        args={[
          {
            uniforms: { uTime: { value: 0 } },
            vertexShader: energyVertex,
            fragmentShader: energyFragment,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          },
        ]}
      />
    </points>
  );
}

const streamVertex = /* glsl */ `
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aRadius;
  attribute float aHeight;
  attribute float aOffset;
  attribute vec3 aColor;
  uniform float uTime;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float cycle = fract(uTime * 0.22 + aOffset);
    float angle = aPhase + uTime * aSpeed;
    float r = mix(0.35, aRadius, cycle);
    float y = mix(0.5, aHeight, cycle);
    vec3 pos = vec3(cos(angle) * r, y, sin(angle) * r);

    vColor = aColor;
    vAlpha = smoothstep(0.0, 0.15, cycle) * smoothstep(1.0, 0.85, cycle);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (1.8 + 1.5 * (1.0 - cycle)) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const streamFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor * glow, glow * vAlpha);
  }
`;

function DataStreams({ perScreen = 5 }: { perScreen?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const layout = useMemo(() => computeOrbitLayout(), []);

  const attrs = useMemo(() => {
    const total = layout.length * perScreen;
    const positions = new Float32Array(total * 3);
    const phases = new Float32Array(total);
    const speeds = new Float32Array(total);
    const radii = new Float32Array(total);
    const heights = new Float32Array(total);
    const offsets = new Float32Array(total);
    const colors = new Float32Array(total * 3);

    const rand = mulberry32(2024);
    let idx = 0;
    for (const slot of layout) {
      const color = new THREE.Color(slot.screen.accent);
      for (let j = 0; j < perScreen; j++) {
        positions[idx * 3] = 0;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = 0;
        phases[idx] = slot.phase;
        speeds[idx] = slot.speed;
        radii[idx] = slot.radius;
        heights[idx] = slot.height;
        offsets[idx] = j / perScreen + rand() * 0.1;
        colors[idx * 3] = color.r;
        colors[idx * 3 + 1] = color.g;
        colors[idx * 3 + 2] = color.b;
        idx++;
      }
    }

    return { positions, phases, speeds, radii, heights, offsets, colors };
  }, [layout, perScreen]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[attrs.positions, 3]} />
        <bufferAttribute attach="attributes-aPhase" args={[attrs.phases, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[attrs.speeds, 1]} />
        <bufferAttribute attach="attributes-aRadius" args={[attrs.radii, 1]} />
        <bufferAttribute attach="attributes-aHeight" args={[attrs.heights, 1]} />
        <bufferAttribute attach="attributes-aOffset" args={[attrs.offsets, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[attrs.colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        args={[
          {
            uniforms: { uTime: { value: 0 } },
            vertexShader: streamVertex,
            fragmentShader: streamFragment,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          },
        ]}
      />
    </points>
  );
}

export function ParticleField() {
  return (
    <group>
      <Stars radius={60} depth={40} count={3000} factor={2.2} saturation={0} fade speed={0.4} />
      <AscendingEmbers />
      <DataStreams />
    </group>
  );
}
