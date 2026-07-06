import { useMemo } from "react";
import * as THREE from "three";
import type { CareerScreen } from "@/data/career";

const WIDTH = 512;
const HEIGHT = 320;

function drawScreen(ctx: CanvasRenderingContext2D, screen: CareerScreen) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = screen.accent;
  ctx.font = "600 22px 'Segoe UI', sans-serif";
  ctx.textBaseline = "top";
  ctx.globalAlpha = 0.9;
  ctx.fillText(screen.eyebrow.toUpperCase(), 28, 28);

  ctx.globalAlpha = 1;
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 40px 'Segoe UI', sans-serif";
  ctx.fillText(screen.title, 28, 64);

  if (screen.subtitle) {
    ctx.font = "400 22px 'Segoe UI', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText(screen.subtitle, 28, 116);
  }

  ctx.font = "400 20px 'Segoe UI', sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  const startY = screen.subtitle ? 168 : 140;
  const lineHeight = 34;

  screen.bullets.forEach((bullet, i) => {
    const y = startY + i * lineHeight;
    if (y > HEIGHT - 30) return;
    ctx.fillStyle = screen.accent;
    ctx.fillText(screen.kind === "skills" ? "◇" : "•", 28, y + 2);
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.fillText(bullet, 52, y);
  });

  ctx.strokeStyle = screen.accent;
  ctx.globalAlpha = 0.6;
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, WIDTH - 8, HEIGHT - 8);
}

export function useScreenTexture(screen: CareerScreen) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext("2d");
    if (ctx) drawScreen(ctx, screen);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    // Plane normals face outward (away from the cylinder axis), so the
    // front face is seen mirrored in U; flip it back here.
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    texture.offset.x = 1;
    texture.needsUpdate = true;
    return texture;
  }, [screen]);
}
