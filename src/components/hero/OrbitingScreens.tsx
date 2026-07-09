"use client";

import { useMemo } from "react";
import { computeOrbitLayout } from "./orbitLayout";
import { ScreenPanel } from "./ScreenPanel";

export function OrbitingScreens() {
  const layout = useMemo(() => computeOrbitLayout(), []);

  return (
    <group>
      {layout.map(({ screen, radius, height, speed, phase }) => (
        <ScreenPanel key={screen.id} screen={screen} radius={radius} height={height} speed={speed} phase={phase} />
      ))}
    </group>
  );
}
