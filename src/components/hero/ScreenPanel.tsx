"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { CareerScreen } from "@/data/career";
import { useScreenTexture } from "./useScreenTexture";
import "./holographicMaterial";

interface ScreenPanelProps {
  screen: CareerScreen;
  radius: number;
  height: number;
  speed: number;
  phase: number;
}

export function ScreenPanel({ screen, radius, height, speed, phase }: ScreenPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useScreenTexture(screen);
  const color = useMemo(() => new THREE.Color(screen.accent), [screen.accent]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const angle = phase + t * speed;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = height + Math.sin(t * 0.6 + phase) * 0.15;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.y = -angle + Math.PI / 2;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[1.6, 1, 1, 1]} />
        <holographicMaterialImpl
          ref={materialRef}
          uColor={color}
          uMap={texture}
          uOpacity={1}
          transparent
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
