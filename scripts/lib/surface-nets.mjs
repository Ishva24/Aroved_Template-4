/**
 * Naive Surface Nets isosurface extraction.
 * Samples a signed distance function on a regular grid and produces an
 * indexed, watertight triangle mesh with shared vertices. Each vertex is then
 * projected onto the true surface with a few Newton steps, and normals are
 * taken from the SDF gradient so shading stays smooth at modest resolutions.
 */

export function gradient(sdf, x, y, z, e = 1e-3) {
  const gx = sdf(x + e, y, z) - sdf(x - e, y, z);
  const gy = sdf(x, y + e, z) - sdf(x, y - e, z);
  const gz = sdf(x, y, z + e) - sdf(x, y, z - e);
  const l = Math.hypot(gx, gy, gz) || 1;
  return [gx / l, gy / l, gz / l];
}

export function surfaceNets(sdf, { min, max, cell }) {
  const nx = Math.ceil((max[0] - min[0]) / cell) + 1;
  const ny = Math.ceil((max[1] - min[1]) / cell) + 1;
  const nz = Math.ceil((max[2] - min[2]) / cell) + 1;
  const field = new Float32Array(nx * ny * nz);
  const idx = (i, j, k) => i + nx * (j + ny * k);

  for (let k = 0; k < nz; k++) {
    const z = min[2] + k * cell;
    for (let j = 0; j < ny; j++) {
      const y = min[1] + j * cell;
      for (let i = 0; i < nx; i++) field[idx(i, j, k)] = sdf(min[0] + i * cell, y, z);
    }
  }

  // One vertex per cell that straddles the surface.
  const cellVert = new Int32Array((nx - 1) * (ny - 1) * (nz - 1)).fill(-1);
  const cidx = (i, j, k) => i + (nx - 1) * (j + (ny - 1) * k);
  const positions = [];
  const corners = [
    [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0],
    [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1],
  ];
  const edges = [
    [0, 1], [2, 3], [4, 5], [6, 7],
    [0, 2], [1, 3], [4, 6], [5, 7],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  const v = new Float32Array(8);

  for (let k = 0; k < nz - 1; k++)
    for (let j = 0; j < ny - 1; j++)
      for (let i = 0; i < nx - 1; i++) {
        let mask = 0;
        for (let c = 0; c < 8; c++) {
          const [a, b, d] = corners[c];
          v[c] = field[idx(i + a, j + b, k + d)];
          if (v[c] < 0) mask |= 1 << c;
        }
        if (mask === 0 || mask === 255) continue;
        let sx = 0, sy = 0, sz = 0, n = 0;
        for (const [e0, e1] of edges) {
          const a0 = v[e0], a1 = v[e1];
          if (a0 < 0 === a1 < 0) continue;
          const t = a0 / (a0 - a1);
          const c0 = corners[e0], c1 = corners[e1];
          sx += c0[0] + t * (c1[0] - c0[0]);
          sy += c0[1] + t * (c1[1] - c0[1]);
          sz += c0[2] + t * (c1[2] - c0[2]);
          n++;
        }
        cellVert[cidx(i, j, k)] = positions.length / 3;
        positions.push(
          min[0] + (i + sx / n) * cell,
          min[1] + (j + sy / n) * cell,
          min[2] + (k + sz / n) * cell,
        );
      }

  // Quads across every grid edge with a sign change.
  const indices = [];
  const quad = (a, b, c, d, flip) => {
    if (a < 0 || b < 0 || c < 0 || d < 0) return;
    if (flip) indices.push(a, c, b, a, d, c);
    else indices.push(a, b, c, a, c, d);
  };
  for (let k = 1; k < nz - 1; k++)
    for (let j = 1; j < ny - 1; j++)
      for (let i = 1; i < nx - 1; i++) {
        const s0 = field[idx(i, j, k)] < 0;
        if (i < nx - 1 && s0 !== field[idx(i + 1, j, k)] < 0)
          quad(cellVert[cidx(i, j - 1, k - 1)], cellVert[cidx(i, j, k - 1)], cellVert[cidx(i, j, k)], cellVert[cidx(i, j - 1, k)], !s0);
        if (j < ny - 1 && s0 !== field[idx(i, j + 1, k)] < 0)
          quad(cellVert[cidx(i - 1, j, k - 1)], cellVert[cidx(i - 1, j, k)], cellVert[cidx(i, j, k)], cellVert[cidx(i, j, k - 1)], !s0);
        if (k < nz - 1 && s0 !== field[idx(i, j, k + 1)] < 0)
          quad(cellVert[cidx(i - 1, j - 1, k)], cellVert[cidx(i, j - 1, k)], cellVert[cidx(i, j, k)], cellVert[cidx(i - 1, j, k)], !s0);
      }

  // Project onto the surface and compute analytic normals.
  const normals = new Float32Array(positions.length);
  for (let p = 0; p < positions.length; p += 3) {
    let x = positions[p], y = positions[p + 1], z = positions[p + 2];
    for (let it = 0; it < 3; it++) {
      const d = sdf(x, y, z);
      const g = gradient(sdf, x, y, z);
      x -= g[0] * d; y -= g[1] * d; z -= g[2] * d;
    }
    positions[p] = x; positions[p + 1] = y; positions[p + 2] = z;
    const g = gradient(sdf, x, y, z);
    normals[p] = g[0]; normals[p + 1] = g[1]; normals[p + 2] = g[2];
  }

  return { positions: new Float32Array(positions), normals, indices: new Uint32Array(indices) };
}

/** Light Taubin smoothing (shrink-free) to remove grid stair artefacts. */
export function taubinSmooth(mesh, iterations = 2, lambda = 0.5, mu = -0.53) {
  const { positions, indices } = mesh;
  const n = positions.length / 3;
  const nbrs = Array.from({ length: n }, () => new Set());
  for (let t = 0; t < indices.length; t += 3) {
    const a = indices[t], b = indices[t + 1], c = indices[t + 2];
    nbrs[a].add(b).add(c); nbrs[b].add(a).add(c); nbrs[c].add(a).add(b);
  }
  const tmp = new Float32Array(positions.length);
  const pass = (f) => {
    for (let i = 0; i < n; i++) {
      let sx = 0, sy = 0, sz = 0, cnt = 0;
      for (const j of nbrs[i]) { sx += positions[j * 3]; sy += positions[j * 3 + 1]; sz += positions[j * 3 + 2]; cnt++; }
      if (!cnt) { tmp.set(positions.subarray(i * 3, i * 3 + 3), i * 3); continue; }
      for (let a = 0; a < 3; a++) {
        const p = positions[i * 3 + a];
        tmp[i * 3 + a] = p + f * ([sx, sy, sz][a] / cnt - p);
      }
    }
    positions.set(tmp);
  };
  for (let i = 0; i < iterations; i++) { pass(lambda); pass(mu); }
  return mesh;
}
