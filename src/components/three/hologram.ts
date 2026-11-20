"use client";

import * as THREE from "three";

export interface HoloUniforms {
  uTime: { value: number };
  uScan: { value: number };
  uRim: { value: THREE.Color };
  uIntensity: { value: number };
}

/**
 * Injects a holographic "diagnostic scan" into any lit three.js material:
 * a Fresnel rim glow plus a sweeping scan band with fine scan lines,
 * evaluated in world space. Returns the uniforms so the caller can animate them.
 */
export function applyHologram(material: THREE.Material, rim = "#35d7ff"): HoloUniforms {
  const uniforms: HoloUniforms = {
    uTime: { value: 0 },
    uScan: { value: -2 },
    uRim: { value: new THREE.Color(rim) },
    uIntensity: { value: 1 },
  };
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vHoloW;\nvarying vec3 vHoloN;")
      .replace(
        "#include <project_vertex>",
        "#include <project_vertex>\nvHoloW = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvHoloN = normalize(mat3(modelMatrix) * objectNormal);",
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nvarying vec3 vHoloW;\nvarying vec3 vHoloN;\nuniform float uTime;\nuniform float uScan;\nuniform vec3 uRim;\nuniform float uIntensity;",
      )
      .replace(
        "#include <dithering_fragment>",
        `#include <dithering_fragment>
        vec3 Vh = normalize(cameraPosition - vHoloW);
        float fres = pow(1.0 - abs(dot(normalize(vHoloN), Vh)), 2.6);
        float band = exp(-pow((vHoloW.y - uScan) * 9.0, 2.0));
        float lines = 0.55 + 0.45 * step(0.5, fract(vHoloW.y * 70.0 - uTime * 2.0));
        gl_FragColor.rgb += uRim * (fres * 0.75 + band * lines * 1.25) * uIntensity;`,
      );
  };
  material.customProgramCacheKey = () => "arosafe-hologram";
  return uniforms;
}
