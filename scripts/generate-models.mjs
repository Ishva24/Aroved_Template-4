/**
 * Generates the AROSAFE 3D product models from scratch as GLB files.
 *
 *   node scripts/generate-models.mjs
 *
 * Each model is described as a signed distance field (SDF), meshed with
 * Surface Nets, smoothed, and written as glTF binary into /public/models.
 * Shapes are modelled on the reference product photography supplied by Aroved
 * (blue nitrile examination glove, sterile surgeon gown).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { surfaceNets, taubinSmooth, gradient } from "./lib/surface-nets.mjs";
import { writeGLB } from "./lib/glb.mjs";
import { smin, smax, chain, roundBox, roundCone, ellipseXZ, ellipseTorus, smoothstep, clamp } from "./lib/sdf.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "models");
mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------ */
/* Glove                                                               */
/* Units: ~2.9 tall. +y fingers, +x thumb side, +z back of hand.       */
/* ------------------------------------------------------------------ */

const deg = (d) => (d * Math.PI) / 180;

/** Build a 3-joint finger from a knuckle, an in-plane splay angle, and segment lengths. */
function finger(base, splay, lengths, radii, curl) {
  const pts = [base];
  let [x, y, z] = base;
  let pitch = 0;
  for (let i = 0; i < lengths.length; i++) {
    pitch += curl[i];
    const L = lengths[i];
    x += Math.sin(deg(splay)) * L * Math.cos(deg(pitch));
    y += Math.cos(deg(splay)) * L * Math.cos(deg(pitch));
    z -= L * Math.sin(deg(pitch));
    pts.push([x, y, z]);
  }
  return { pts, radii };
}

const FINGERS = [
  // pinky, ring, middle, index (left → right); thumb handled separately
  finger([-0.33, 0.30, 0.0], -10, [0.25, 0.19, 0.15], [0.1, 0.095, 0.09, 0.086], [4, 6, 6]),
  finger([-0.11, 0.40, 0.0], -3.5, [0.3, 0.24, 0.19], [0.112, 0.107, 0.101, 0.096], [3, 5, 6]),
  finger([0.115, 0.43, 0.0], 1.5, [0.32, 0.26, 0.2], [0.115, 0.11, 0.104, 0.098], [3, 5, 5]),
  finger([0.335, 0.37, 0.0], 8, [0.29, 0.23, 0.18], [0.111, 0.106, 0.1, 0.095], [3, 5, 6]),
];
const THUMB = {
  pts: [[0.26, -0.36, -0.02], [0.5, -0.14, -0.0], [0.69, 0.08, -0.03], [0.83, 0.27, -0.06]],
  radii: [0.17, 0.142, 0.126, 0.112],
};

const CUFF_BOTTOM = -1.42;

function gloveSDF(x, y, z) {
  // Palm: rounded slab, slightly wider at the knuckles, thicker at the centre.
  const widen = 1 + 0.07 * clamp((0.35 - y) / 0.8, 0, 1);
  const palm = roundBox(x * widen - 0.01, y + 0.02, z + 0.005, 0.445, 0.42, 0.12, 0.12);
  let d = palm;

  for (const f of FINGERS) d = smin(d, chain(x, y, z, f.pts, f.radii, 0.03), 0.075);
  d = smin(d, chain(x, y, z, THUMB.pts, THUMB.radii, 0.04), 0.16);

  // Wrist → cuff: elliptical sleeve that flares gently toward the opening.
  const t = clamp((-0.35 - y) / (-0.35 - CUFF_BOTTOM), 0, 1);
  const rx = 0.4 + 0.05 * t * t - 0.025 * Math.sin(t * Math.PI);
  const rz = 0.15 + 0.07 * t;
  let sleeve = ellipseXZ(x, z, rx, rz);
  sleeve = smax(sleeve, y - -0.2, 0.05);
  sleeve = Math.max(sleeve, CUFF_BOTTOM - y);
  d = smin(d, sleeve, 0.22);

  // Subtle stretch wrinkles around the wrist, fading out toward the hand.
  const wrinkleMask = smoothstep(-0.35, -0.55, y) * smoothstep(CUFF_BOTTOM + 0.02, CUFF_BOTTOM + 0.2, y);
  d += 0.0012 * Math.sin(y * 34 + Math.sin(x * 9) * 1.6) * wrinkleMask;

  // Rolled bead at the cuff opening.
  const bead = ellipseTorus(x, y, z, rx - 0.004, rz - 0.004, CUFF_BOTTOM + 0.02, 0.03);
  d = smin(d, bead, 0.03);

  // Hollow opening so the cuff reads as a real glove from below.
  const inner = Math.max(ellipseXZ(x, z, rx - 0.03, rz - 0.03), y - -0.95);
  d = Math.max(d, -inner);
  d = Math.max(d, CUFF_BOTTOM - 0.04 - y);
  return d;
}

/* ------------------------------------------------------------------ */
/* Sterile surgeon gown (mannequin form, raglan sleeves, knit cuffs)    */
/* ------------------------------------------------------------------ */

const SLEEVES = [-1, 1].map((s) => ({
  pts: [[0.42 * s, 0.98, 0.0], [0.7 * s, 0.55, 0.04], [0.78 * s, -0.05, 0.12], [0.76 * s, -0.68, 0.2]],
  radii: [0.2, 0.18, 0.15, 0.125],
}));
const CUFFS = [-1, 1].map((s) => ({ a: [0.76 * s, -0.66, 0.2], b: [0.755 * s, -0.95, 0.23] }));
const HEM = -1.75;

function gownSDF(x, y, z) {
  // Torso: elliptical body flaring into the skirt.
  const t = clamp((0.9 - y) / (0.9 - HEM), 0, 1);
  const rx = 0.5 + 0.18 * t - 0.06 * Math.sin(t * Math.PI * 1.2);
  const rz = 0.3 + 0.12 * t;
  let body = ellipseXZ(x, z, rx, rz);
  body = Math.max(body, HEM - y);
  // Shoulder dome
  const shoulders = roundCone(x, y, z, [-0.4, 0.95, 0], [0.4, 0.95, 0], 0.22, 0.22);
  body = smin(Math.max(body, y - 0.95), shoulders, 0.25);

  let d = body;
  for (const s of SLEEVES) d = smin(d, chain(x, y, z, s.pts, s.radii, 0.05), 0.14);

  // Neck opening + collar rim
  const neck = Math.hypot(x, (z - 0.01) * 1.15) - 0.19;
  d = smax(d, -Math.max(neck, 0.92 - y), 0.03);
  const collar = Math.hypot(Math.hypot(x, (z - 0.01) * 1.15) - 0.205, y - 1.1) - 0.028;
  d = smin(d, collar, 0.05);
  d = Math.max(d, y - 1.16);

  // Fabric folds in the skirt and soft drape across the chest.
  const skirt = smoothstep(0.0, -1.4, y);
  d += 0.009 * Math.sin(Math.atan2(z, x) * 11 + y * 1.5) * skirt;
  d += 0.004 * Math.sin(x * 22 + y * 6) * smoothstep(0.8, 0.2, y) * (1 - skirt);
  // Stitched chest panel (slightly raised) on the front.
  const panel = roundBox(x, y - 0.35, 0, 0.33, 0.27, 1, 0.02);
  if (z > 0) d -= 0.006 * smoothstep(0.01, -0.01, panel);

  // Open hem, hollow inside
  const inner = Math.max(ellipseXZ(x, z, rx - 0.075, rz - 0.075), y - -1.0);
  d = Math.max(d, -inner);
  // Leave the cuffs to their own mesh
  for (const c of CUFFS) d = Math.max(d, -(roundCone(x, y, z, c.a, c.b, 0.112, 0.105) - 0.004));
  return d;
}

function cuffSDF(x, y, z) {
  let d = Infinity;
  for (const c of CUFFS) {
    let cuff = roundCone(x, y, z, c.a, c.b, 0.118, 0.108);
    cuff += 0.004 * Math.sin(Math.atan2(z - c.a[2], x - c.a[0]) * 48); // knit ribbing
    d = Math.min(d, cuff);
  }
  return d;
}

/* ------------------------------------------------------------------ */

function build(name, sdf, bounds, cell, material) {
  const t0 = performance.now();
  const mesh = taubinSmooth(surfaceNets(sdf, { ...bounds, cell }), 2);
  const { positions, normals, indices } = mesh;
  // Recompute normals from the SDF after smoothing.
  for (let p = 0; p < positions.length; p += 3) {
    const g = gradient(sdf, positions[p], positions[p + 1], positions[p + 2]);
    normals[p] = g[0]; normals[p + 1] = g[1]; normals[p + 2] = g[2];
  }
  // Ensure consistent outward winding.
  for (let t = 0; t < indices.length; t += 3) {
    const [a, b, c] = [indices[t] * 3, indices[t + 1] * 3, indices[t + 2] * 3];
    const ux = positions[b] - positions[a], uy = positions[b + 1] - positions[a + 1], uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a], vy = positions[c + 1] - positions[a + 1], vz = positions[c + 2] - positions[a + 2];
    const fx = uy * vz - uz * vy, fy = uz * vx - ux * vz, fz = ux * vy - uy * vx;
    if (fx * normals[a] + fy * normals[a + 1] + fz * normals[a + 2] < 0) {
      const tmp = indices[t + 1]; indices[t + 1] = indices[t + 2]; indices[t + 2] = tmp;
    }
  }
  // Planar UVs (front projection) used for grip texture / fabric weave.
  const uvs = new Float32Array((positions.length / 3) * 2);
  const [minX, minY] = bounds.min, [maxX, maxY] = bounds.max;
  for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
    uvs[j] = (positions[i] - minX) / (maxX - minX);
    uvs[j + 1] = (positions[i + 1] - minY) / (maxY - minY);
  }
  console.log(`  ${name}: ${positions.length / 3} verts, ${indices.length / 3} tris (${(performance.now() - t0).toFixed(0)} ms)`);
  // UVs are derived in the browser from the bounding box (planar projection) to keep files small.
  void uvs;
  return { name, positions, normals, indices, material };
}

function save(file, meshes) {
  const glb = writeGLB(meshes);
  writeFileSync(join(OUT, file), glb);
  console.log(`→ public/models/${file} (${(glb.byteLength / 1024).toFixed(0)} KB)`);
}

console.log("Generating AROSAFE models…");
save("arosafe-glove.glb", [
  build("Glove", gloveSDF, { min: [-0.68, -1.5, -0.38], max: [1.02, 1.42, 0.32] }, 0.0185, {
    name: "Nitrile", color: [0.09, 0.2, 0.78, 1], roughness: 0.45,
  }),
]);
save("arosafe-gown.glb", [
  build("Gown", gownSDF, { min: [-1.02, -1.82, -0.6], max: [1.02, 1.22, 0.62] }, 0.03, {
    name: "SMS Fabric", color: [0.33, 0.6, 0.85, 1], roughness: 0.92,
  }),
  build("Cuffs", cuffSDF, { min: [-0.92, -1.1, 0.0], max: [0.92, -0.5, 0.42] }, 0.016, {
    name: "Knit Cuff", color: [0.95, 0.96, 0.97, 1], roughness: 1,
  }),
]);
