"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

/**
 * Full-screen GLSL backdrop: domain-warped fbm "bio-fluid" in deep navy with
 * luminous blue/cyan currents, a pointer-reactive glow, and a faint
 * molecular dot lattice. Drawn as a clip-space quad behind the scene.
 */
const frag = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
    float t = uTime * 0.04;

    // Domain warping (slow, deep organic motion)
    vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 4.3));
    vec2 r = vec2(fbm(p * 1.2 + 2.5 * q + vec2(1.7, 9.2) + t * 1.2), fbm(p * 1.2 + 2.5 * q + vec2(8.3, 2.8) - t));
    float f = fbm(p * 1.0 + 2.0 * r);

    // Truly deep obsidian & dark midnight medical palette
    vec3 deepVoid = vec3(0.012, 0.022, 0.055);      // Deep obsidian midnight (#03060e)
    vec3 darkSapphire = vec3(0.025, 0.065, 0.19);   // Subtle dark sapphire undertone (#061131)
    vec3 royalGlow = vec3(0.045, 0.12, 0.38);       // Faint royal blue current (#0c1f61)
    vec3 cyanWisps = vec3(0.08, 0.35, 0.65);        // Ultra-subtle deep cyan accent

    // Deep dark base with soft, subtle currents (NOT bright clouds)
    vec3 col = mix(deepVoid, darkSapphire, smoothstep(0.4, 1.0, f) * 0.45);
    col = mix(col, royalGlow, smoothstep(0.65, 1.0, f * f) * 0.30);
    col += cyanWisps * pow(smoothstep(0.72, 1.0, length(r)), 3.5) * 0.14;

    // Soft localized radial glow behind the 3D hero on the right side
    vec2 heroCenter = vec2(0.65, 0.05);
    float heroDist = length(p - heroCenter);
    float heroBackdropGlow = exp(-heroDist * heroDist * 1.8) * 0.18;
    col += vec3(0.06, 0.18, 0.48) * heroBackdropGlow;

    // Gentle pointer interaction in dark space
    vec2 m = (uMouse * 0.5) * vec2(uRes.x / uRes.y, 1.0);
    col += vec3(0.05, 0.22, 0.45) * 0.08 * exp(-dot(p - m, p - m) * 4.0);

    // Fine microscopic sterile lattice dots in dark space
    vec2 g = fract(p * 22.0) - 0.5;
    float dots = smoothstep(0.04, 0.0, length(g)) * 0.18 * smoothstep(0.4, 0.9, f);
    col += vec3(0.35, 0.65, 0.95) * dots;

    // Deep cinematic vignette keeping edges and text area dark & crisp
    col *= 1.0 - 0.55 * dot(uv - 0.5, uv - 0.5) * 1.9;
    col *= 1.0 - uScroll * 0.4;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }
`;

export function FluidBackground({ scroll }: { scroll?: { current: number } }) {
  const { size, pointer } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uRes: { value: new THREE.Vector2(1, 1) }, uMouse: { value: new THREE.Vector2() }, uScroll: { value: 0 } }),
    [],
  );
  useFrame((state, dt) => {
    const u = uniforms;
    u.uTime.value += dt;
    u.uRes.value.set(size.width, size.height);
    u.uMouse.value.lerp(pointer, 0.05);
    u.uScroll.value = scroll?.current ?? 0;
    void state;
  });
  return (
    <mesh renderOrder={-10} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} depthWrite={false} depthTest={false} toneMapped={false} />
    </mesh>
  );
}
