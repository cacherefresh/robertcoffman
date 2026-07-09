import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform sampler2D uMap;
  uniform float uOpacity;
  uniform float uHover;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 content = texture2D(uMap, vUv);

    float scan = sin((vUv.y * 220.0) - uTime * 2.2) * 0.5 + 0.5;
    scan = pow(scan, 6.0) * 0.35;

    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.2);

    float edgeX = smoothstep(0.0, 0.03, vUv.x) * smoothstep(1.0, 0.97, vUv.x);
    float edgeY = smoothstep(0.0, 0.03, vUv.y) * smoothstep(1.0, 0.97, vUv.y);
    float frame = 1.0 - (edgeX * edgeY);

    float flicker = 0.94 + 0.06 * sin(uTime * 14.0 + vUv.x * 30.0);

    vec3 panelTint = uColor * (0.10 + fresnel * 0.6);
    vec3 color = panelTint + uColor * scan + content.rgb * (1.0 + uHover * 0.6);
    color += uColor * frame * 0.9;
    color *= flicker;

    float alpha = clamp(uOpacity * (0.35 + fresnel * 0.5 + content.a + frame * 0.6), 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

export const HolographicMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#4fd1ff"),
    uMap: null,
    uOpacity: 1,
    uHover: 0,
  },
  vertexShader,
  fragmentShader
);

HolographicMaterialImpl.key = THREE.MathUtils.generateUUID();

extend({ HolographicMaterialImpl });

declare module "@react-three/fiber" {
  interface ThreeElements {
    holographicMaterialImpl: {
      ref?: React.Ref<THREE.ShaderMaterial>;
      transparent?: boolean;
      side?: THREE.Side;
      depthWrite?: boolean;
      uTime?: number;
      uColor?: THREE.Color | string;
      uMap?: THREE.Texture | null;
      uOpacity?: number;
      uHover?: number;
    };
  }
}
