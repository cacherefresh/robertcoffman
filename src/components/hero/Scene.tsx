"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Figure } from "./Figure";
import { OrbitingScreens } from "./OrbitingScreens";
import { ParticleField } from "./ParticleField";
import { CameraRig } from "./CameraRig";

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 7.2], fov: 45, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#040611"]} />
      <fog attach="fog" args={["#040611", 8, 26]} />

      <ambientLight intensity={0.2} color="#5566ff" />
      <directionalLight position={[4, 6, 3]} intensity={0.5} color="#8fb3ff" />
      <pointLight position={[0, -1.5, 0]} intensity={0.4} color="#f5c451" distance={6} />

      <Suspense fallback={null}>
        <Figure />
        <OrbitingScreens />
        <ParticleField />
      </Suspense>

      <CameraRig />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.28} luminanceThreshold={0.65} luminanceSmoothing={0.1} mipmapBlur={false} radius={0.08} />
        <Vignette eskil={false} offset={0.15} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
