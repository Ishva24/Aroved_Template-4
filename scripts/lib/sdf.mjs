/** Signed distance primitives & operators (after Inigo Quilez). Scalar-only for speed. */

export const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
export const smoothstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

/** Polynomial smooth minimum — blends surfaces with radius k. */
export function smin(a, b, k) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}
export const smax = (a, b, k) => -smin(-a, -b, k);

/** Cone with spherical caps between points a (radius r1) and b (radius r2). */
export function roundCone(px, py, pz, a, b, r1, r2) {
  const bax = b[0] - a[0], bay = b[1] - a[1], baz = b[2] - a[2];
  const l2 = bax * bax + bay * bay + baz * baz;
  const rr = r1 - r2;
  const a2 = l2 - rr * rr;
  const il2 = 1 / l2;
  const pax = px - a[0], pay = py - a[1], paz = pz - a[2];
  const y = pax * bax + pay * bay + paz * baz;
  const z = y - l2;
  const qx = pax * l2 - bax * y, qy = pay * l2 - bay * y, qz = paz * l2 - baz * y;
  const x2 = qx * qx + qy * qy + qz * qz;
  const y2 = y * y * l2;
  const z2 = z * z * l2;
  const k = Math.sign(rr) * rr * rr * x2;
  if (Math.sign(z) * a2 * z2 > k) return Math.sqrt(x2 + z2) * il2 - r2;
  if (Math.sign(y) * a2 * y2 < k) return Math.sqrt(x2 + y2) * il2 - r1;
  return (Math.sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
}

/** Chain of round cones through points with per-point radii, smoothly unioned. */
export function chain(px, py, pz, pts, radii, k = 0.02) {
  let d = Infinity;
  for (let i = 0; i < pts.length - 1; i++)
    d = smin(d, roundCone(px, py, pz, pts[i], pts[i + 1], radii[i], radii[i + 1]), k);
  return d;
}

export function roundBox(px, py, pz, hx, hy, hz, r) {
  const qx = Math.abs(px) - hx + r, qy = Math.abs(py) - hy + r, qz = Math.abs(pz) - hz + r;
  const ox = Math.max(qx, 0), oy = Math.max(qy, 0), oz = Math.max(qz, 0);
  return Math.hypot(ox, oy, oz) + Math.min(Math.max(qx, qy, qz), 0) - r;
}

/** Approximate distance to an elliptical tube surface (infinite along y). */
export function ellipseXZ(px, pz, rx, rz) {
  const k = Math.hypot(px / rx, pz / rz);
  return (k - 1) * Math.min(rx, rz);
}

/** Elliptical torus lying in the XZ plane at height y0. */
export function ellipseTorus(px, py, pz, rx, rz, y0, r) {
  const radial = ellipseXZ(px, pz, rx, rz);
  return Math.hypot(radial, py - y0) - r;
}
