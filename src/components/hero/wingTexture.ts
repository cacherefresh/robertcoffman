import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

function wingPath(ctx: CanvasRenderingContext2D, size: number) {
  const root = { x: size * 0.08, y: size * 0.92 };
  ctx.beginPath();
  ctx.moveTo(root.x, root.y);
  ctx.quadraticCurveTo(size * 0.02, size * 0.5, size * 0.16, size * 0.22);
  ctx.quadraticCurveTo(size * 0.5, size * 0.0, size * 0.97, size * 0.08);
  ctx.quadraticCurveTo(size * 0.6, size * 0.3, size * 0.5, size * 0.5);
  ctx.quadraticCurveTo(size * 0.34, size * 0.66, size * 0.2, size * 0.72);
  ctx.quadraticCurveTo(size * 0.3, size * 0.78, root.x, root.y);
  ctx.closePath();
}

export function getWingTexture() {
  if (cached) return cached;

  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);

  ctx.save();
  wingPath(ctx, size);
  ctx.clip();

  const baseGrad = ctx.createLinearGradient(size * 0.05, size * 0.9, size * 0.95, size * 0.05);
  baseGrad.addColorStop(0, "rgba(255, 205, 110, 0.5)");
  baseGrad.addColorStop(0.55, "rgba(255, 196, 90, 0.28)");
  baseGrad.addColorStop(1, "rgba(255, 224, 160, 0.12)");
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, size, size);

  ctx.globalCompositeOperation = "lighter";
  const featherCount = 8;
  for (let i = 0; i < featherCount; i++) {
    const t = i / (featherCount - 1);
    const rootPt = {
      x: size * (0.08 + t * 0.06),
      y: size * (0.9 - t * 0.05),
    };
    const tipPt = {
      x: size * (0.2 + t * 0.75),
      y: size * (0.75 - t * 0.68),
    };

    const grad = ctx.createLinearGradient(rootPt.x, rootPt.y, tipPt.x, tipPt.y);
    const alpha = 0.22 - t * 0.08;
    grad.addColorStop(0, `rgba(255, 224, 160, 0)`);
    grad.addColorStop(0.4, `rgba(255, 224, 160, ${Math.max(alpha, 0.04)})`);
    grad.addColorStop(1, "rgba(255, 240, 200, 0)");

    ctx.strokeStyle = grad;
    ctx.lineWidth = size * 0.012;
    ctx.beginPath();
    ctx.moveTo(rootPt.x, rootPt.y);
    ctx.lineTo(tipPt.x, tipPt.y);
    ctx.stroke();
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.restore();

  ctx.save();
  wingPath(ctx, size);
  ctx.strokeStyle = "rgba(255, 224, 170, 0.35)";
  ctx.lineWidth = size * 0.006;
  ctx.stroke();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  cached = texture;
  return texture;
}
