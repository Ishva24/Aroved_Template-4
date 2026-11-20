/**
 * Minimal glTF 2.0 binary (GLB) writer.
 * Supports multiple named mesh nodes, each with POSITION / NORMAL / TEXCOORD_0
 * and a metallic-roughness PBR material. No external dependencies.
 */

const pad4 = (n) => (n + 3) & ~3;

export function writeGLB(meshes, { generator = "aroved-sdf-modeler" } = {}) {
  const buffers = [];
  let byteOffset = 0;
  const json = {
    asset: { version: "2.0", generator },
    scene: 0,
    scenes: [{ nodes: [] }],
    nodes: [],
    meshes: [],
    materials: [],
    accessors: [],
    bufferViews: [],
    buffers: [{ byteLength: 0 }],
  };

  const addView = (typed, target) => {
    const bytes = new Uint8Array(typed.buffer, typed.byteOffset, typed.byteLength);
    const len = pad4(bytes.byteLength);
    const chunk = new Uint8Array(len);
    chunk.set(bytes);
    buffers.push(chunk);
    json.bufferViews.push({ buffer: 0, byteOffset, byteLength: bytes.byteLength, target });
    byteOffset += len;
    return json.bufferViews.length - 1;
  };

  const addAccessor = (typed, type, componentType, target, withBounds = false) => {
    const comps = { SCALAR: 1, VEC2: 2, VEC3: 3 }[type];
    const count = typed.length / comps;
    const acc = {
      bufferView: addView(typed, target),
      componentType,
      count,
      type,
    };
    if (withBounds) {
      const min = Array(comps).fill(Infinity), max = Array(comps).fill(-Infinity);
      for (let i = 0; i < typed.length; i += comps)
        for (let c = 0; c < comps; c++) {
          min[c] = Math.min(min[c], typed[i + c]);
          max[c] = Math.max(max[c], typed[i + c]);
        }
      acc.min = min; acc.max = max;
    }
    json.accessors.push(acc);
    return json.accessors.length - 1;
  };

  for (const m of meshes) {
    const FLOAT = 5126, UINT = 5125, USHORT = 5123, ARRAY = 34962, ELEMENT = 34963;
    const small = m.positions.length / 3 < 65536;
    const attributes = {
      POSITION: addAccessor(m.positions, "VEC3", FLOAT, ARRAY, true),
      NORMAL: addAccessor(m.normals, "VEC3", FLOAT, ARRAY),
    };
    if (m.uvs) attributes.TEXCOORD_0 = addAccessor(m.uvs, "VEC2", FLOAT, ARRAY);
    const indices = small
      ? addAccessor(Uint16Array.from(m.indices), "SCALAR", USHORT, ELEMENT)
      : addAccessor(m.indices, "SCALAR", UINT, ELEMENT);
    json.materials.push({
      name: m.material.name,
      pbrMetallicRoughness: {
        baseColorFactor: m.material.color,
        metallicFactor: 0,
        roughnessFactor: m.material.roughness ?? 0.6,
      },
      doubleSided: true,
    });
    json.meshes.push({ name: m.name, primitives: [{ attributes, indices, material: json.materials.length - 1 }] });
    json.nodes.push({ name: m.name, mesh: json.meshes.length - 1 });
    json.scenes[0].nodes.push(json.nodes.length - 1);
  }

  json.buffers[0].byteLength = byteOffset;
  const bin = new Uint8Array(byteOffset);
  let o = 0;
  for (const b of buffers) { bin.set(b, o); o += b.byteLength; }

  const jsonBytes = new TextEncoder().encode(JSON.stringify(json));
  const jsonLen = pad4(jsonBytes.byteLength);
  const total = 12 + 8 + jsonLen + 8 + bin.byteLength;
  const out = new Uint8Array(total);
  const dv = new DataView(out.buffer);
  dv.setUint32(0, 0x46546c67, true); // "glTF"
  dv.setUint32(4, 2, true);
  dv.setUint32(8, total, true);
  dv.setUint32(12, jsonLen, true);
  dv.setUint32(16, 0x4e4f534a, true); // "JSON"
  out.fill(0x20, 20, 20 + jsonLen);
  out.set(jsonBytes, 20);
  const binStart = 20 + jsonLen;
  dv.setUint32(binStart, bin.byteLength, true);
  dv.setUint32(binStart + 4, 0x004e4942, true); // "BIN\0"
  out.set(bin, binStart + 8);
  return out;
}
