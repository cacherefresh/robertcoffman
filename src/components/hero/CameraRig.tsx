"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function CameraRig() {
  const { camera, pointer } = useThree();
  const angle = useRef(0);
  const parallax = useRef(new THREE.Vector2(0, 0));
  const lookTarget = useRef(new THREE.Vector3(0, 0.4, 0));

  useFrame((_, delta) => {
    angle.current += delta * 0.06;

    parallax.current.lerp(pointer as unknown as THREE.Vector2, 0.03);

    const radius = 7.2;
    const x = Math.sin(angle.current) * radius + parallax.current.x * 0.8;
    const z = Math.cos(angle.current) * radius + parallax.current.y * 0.4;
    const y = 0.6 + parallax.current.y * 0.6;

    camera.position.lerp(new THREE.Vector3(x, y, z), 0.06);
    camera.lookAt(lookTarget.current);
  });

  return null;
}
