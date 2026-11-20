"use client";

import { useEffect, useMemo } from "react";

import * as THREE from "three";

/**
 * Procedural textures generated on a canvas at runtime — no image downloads.
 * Each is cached so the same texture is shared across every viewer.
 */
const cache = new Map<string, THREE.Texture>();

function heightToNormal(size: number, height: (x: number, y: number) => number, strength: number) {
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) h[y * size + x] = height(x / size, y / size);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  const at = (x: number, y: number) => h[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      img.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((dy / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Fine diamond grip micro-texture seen on nitrile examination gloves. */
export function gripNormalMap() {
  if (!cache.has("grip")) {
    const t = heightToNormal(
      256,
      (u, v) => {
        const a = Math.sin((u + v) * Math.PI * 2 * 18);
        const b = Math.sin((u - v) * Math.PI * 2 * 18);
        return Math.max(a * b, 0) ** 0.6;
      },
      2.2,
    );
    t.repeat.set(5, 5);
    cache.set("grip", t);
  }
  return cache.get("grip")!;
}

/** Non-woven SMS fabric — irregular fibres with a faint spun-bond dot pattern. */
export function fabricNormalMap() {
  if (!cache.has("fabric")) {
    const rand = (x: number, y: number) => {
      const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };
    const t = heightToNormal(
      256,
      (u, v) => {
        const fibre = Math.sin(u * 90 + Math.sin(v * 40) * 2) * 0.3 + Math.sin(v * 110 + Math.sin(u * 30) * 3) * 0.3;
        const dots = Math.sin(u * Math.PI * 2 * 32) * Math.sin(v * Math.PI * 2 * 32) > 0.6 ? 0.5 : 0;
        return fibre + dots + rand(Math.floor(u * 256), Math.floor(v * 256)) * 0.4;
      },
      1.2,
    );
    t.repeat.set(6, 6);
    cache.set("fabric", t);
  }
  return cache.get("fabric")!;
}

/** Quilted pattern for under pads. */
export function quiltNormalMap() {
  if (!cache.has("quilt")) {
    const t = heightToNormal(
      256,
      (u, v) => {
        const a = Math.abs(Math.sin((u + v) * Math.PI * 4));
        const b = Math.abs(Math.sin((u - v) * Math.PI * 4));
        return Math.min(a, b) ** 0.35;
      },
      6,
    );
    t.repeat.set(2, 3);
    cache.set("quilt", t);
  }
  return cache.get("quilt")!;
}

/** Pleats for face masks. */
export function pleatNormalMap() {
  if (!cache.has("pleat")) {
    const t = heightToNormal(128, (_u, v) => Math.abs(((v * 3) % 1) - 0.5) * 2, 8);
    cache.set("pleat", t);
  }
  return cache.get("pleat")!;
}

interface PrintOptions {
  lines: string[];
  color?: string;
  width?: number;
  height?: number;
  align?: CanvasTextAlign;
  background?: string;
  stripes?: string;
}

/** Brand print (e.g. "AROSAFE" lettering on a glove or label) as a transparent texture. */
export function printTexture({ lines, color = "#ffffff", width = 1024, height = 512, align = "left", background, stripes }: PrintOptions) {
  const key = `print:${lines.join("|")}:${color}:${background}:${stripes}:${width}x${height}`;
  if (cache.has(key)) return cache.get(key)!;
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d")!;
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }
  if (stripes) {
    ctx.fillStyle = stripes;
    for (let x = -height; x < width; x += 90) {
      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + 40, height);
      ctx.lineTo(x + 40 + height, 0);
      ctx.lineTo(x + height, 0);
      ctx.fill();
    }
  }
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "top";
  const x = align === "center" ? width / 2 : width * 0.06;
  let y = height * 0.12;
  lines.forEach((line, i) => {
    if (i === 0) {
      const size = Math.round(height * 0.28);
      ctx.font = `700 ${size}px "Sora", "Segoe UI", Arial, sans-serif`;
      // AROSAFE wordmark: bold "ARO", light "SAFE" — mirrors the printed glove reference.
      if (line === "AROSAFE") {
        const bold = "ARO";
        ctx.font = `800 ${size}px "Sora", "Segoe UI", Arial, sans-serif`;
        const wBold = ctx.measureText(bold).width;
        ctx.font = `300 ${size}px "Sora", "Segoe UI", Arial, sans-serif`;
        const wLight = ctx.measureText("SAFE").width;
        const start = align === "center" ? x - (wBold + wLight) / 2 : x;
        ctx.textAlign = "left";
        ctx.font = `800 ${size}px "Sora", "Segoe UI", Arial, sans-serif`;
        ctx.fillText(bold, start, y);
        ctx.font = `300 ${size}px "Sora", "Segoe UI", Arial, sans-serif`;
        ctx.fillText("SAFE", start + wBold, y);
        ctx.font = `400 ${size * 0.3}px "Sora", Arial, sans-serif`;
        ctx.fillText("®", start + wBold + wLight + 4, y);
        ctx.textAlign = align;
      } else ctx.fillText(line, x, y);
      y += size * 1.18;
    } else {
      const size = Math.round(height * 0.115);
      ctx.font = `500 ${size}px "Sora", "Segoe UI", Arial, sans-serif`;
      ctx.fillText(line, x, y);
      y += size * 1.3;
    }
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  cache.set(key, tex);
  return tex;
}


/* ────────────────── Template 2 Packaging & Fabric Texture Generators ────────────────── */





/* ────────────────────────── helpers ────────────────────────── */

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement, srgb = true) {
  const tex = new THREE.CanvasTexture(canvas);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

/** Dispose a texture list when the component unmounts. */
function useDisposable<T extends THREE.Texture | THREE.Texture[]>(value: T): T {
  useEffect(
    () => () => {
      (Array.isArray(value) ? value : [value]).forEach((t) => t.dispose());
    },
    [value],
  );
  return value;
}

/* ────────────────────────── packaging label ────────────────────────── */

export interface LabelOptions {
  title: string;
  subtitle?: string;
  bg?: string;
  fg?: string;
  accent?: string;
  /** Texture aspect, default square */
  width?: number;
  height?: number;
}

/** Draws a clean AROSAFE-branded packaging label to a canvas texture (no font files needed). */
export function drawLabel({
  title,
  subtitle = '',
  bg = '#ffffff',
  fg = '#06304f',
  accent = '#18b8e8',
  width = 1024,
  height = 1024,
}: LabelOptions) {
  const { canvas, ctx } = makeCanvas(width, height);
  const font = '"Sora","Manrope",system-ui,-apple-system,"Segoe UI",sans-serif';

  // background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // soft accent wave
  const g = ctx.createLinearGradient(0, 0, width, height);
  g.addColorStop(0, accent);
  g.addColorStop(1, '#0a6cd6');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, height * 0.74);
  ctx.bezierCurveTo(width * 0.3, height * 0.66, width * 0.6, height * 0.9, width, height * 0.72);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();

  // top band
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height * 0.05);

  // cross mark
  const cx = width * 0.12;
  const cy = height * 0.2;
  const s = height * 0.05;
  ctx.fillStyle = accent;
  ctx.fillRect(cx - s * 0.35, cy - s, s * 0.7, s * 2);
  ctx.fillRect(cx - s, cy - s * 0.35, s * 2, s * 0.7);

  // wordmark
  ctx.fillStyle = fg;
  ctx.textBaseline = 'alphabetic';
  ctx.font = `800 ${height * 0.115}px ${font}`;
  ctx.fillText('AROSAFE', width * 0.2, cy + s * 0.9);

  // title (auto-wrap on two lines max)
  ctx.font = `700 ${height * 0.075}px ${font}`;
  const words = title.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > width * 0.8 && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  lines.slice(0, 3).forEach((l, i) => ctx.fillText(l, width * 0.1, height * 0.46 + i * height * 0.09));

  // subtitle
  if (subtitle) {
    ctx.fillStyle = accent;
    ctx.font = `600 ${height * 0.045}px ${font}`;
    ctx.fillText(subtitle.toUpperCase(), width * 0.1, height * 0.46 + Math.min(lines.length, 3) * height * 0.09 + height * 0.02);
  }

  // footer
  ctx.fillStyle = '#ffffff';
  ctx.font = `600 ${height * 0.035}px ${font}`;
  ctx.fillText('AROVED HEALTHCARE PVT LTD', width * 0.1, height * 0.93);

  return toTexture(canvas);
}

export function useLabelTexture(opts: LabelOptions) {
  const key = JSON.stringify(opts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tex = useMemo(() => drawLabel(opts), [key]);
  return useDisposable(tex);
}

/* ────────────────────────── patterns ────────────────────────── */

/** Diagonal-striped autoclave tape. */
export function useTapeTexture(base = '#efe3c4', stripe = '#8f9aa6') {
  const tex = useMemo(() => {
    const { canvas, ctx } = makeCanvas(256, 256);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = stripe;
    ctx.lineWidth = 16;
    for (let i = -256; i < 512; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 256);
      ctx.lineTo(i + 256, 0);
      ctx.stroke();
    }
    const t = toTexture(canvas);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 1);
    return t;
  }, [base, stripe]);
  return useDisposable(tex);
}

/** Concentric paper layers for the face of a roll. */
export function useRollFaceTexture(paper = '#eaf6ff', line = '#b9d6ea') {
  const tex = useMemo(() => {
    const { canvas, ctx } = makeCanvas(512, 512);
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = line;
    ctx.lineWidth = 1.5;
    for (let r = 20; r < 256; r += 5) {
      ctx.beginPath();
      ctx.arc(256, 256, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    return toTexture(canvas);
  }, [paper, line]);
  return useDisposable(tex);
}

/** Printed film stripe along a sterilization reel. */
export function useReelSideTexture(film = '#d8eefc', paper = '#ffffff', accent = '#1b8cf5') {
  const tex = useMemo(() => {
    const { canvas, ctx } = makeCanvas(512, 128);
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = film;
    ctx.fillRect(0, 0, 512, 64);
    ctx.fillStyle = accent;
    for (let x = 0; x < 512; x += 64) ctx.fillRect(x + 8, 76, 24, 6);
    const t = toTexture(canvas);
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(5, 1);
    return t;
  }, [film, paper, accent]);
  return useDisposable(tex);
}

/** Indicator strip graphic: white strip with colour-change bars. */
export function useIndicatorStripTexture() {
  const tex = useMemo(() => {
    const { canvas, ctx } = makeCanvas(128, 512);
    ctx.fillStyle = '#fbfbf6';
    ctx.fillRect(0, 0, 128, 512);
    ctx.fillStyle = '#3a2f2a';
    ctx.fillRect(14, 40, 100, 150);
    ctx.fillStyle = '#d9b64a';
    ctx.fillRect(14, 200, 100, 150);
    ctx.fillStyle = '#9aa7b3';
    ctx.font = '600 22px system-ui, sans-serif';
    ctx.fillText('AROSAFE', 14, 400);
    return toTexture(canvas);
  }, []);
  return useDisposable(tex);
}

/** Sticker sheet for CSSD labels. */
export function useLabelSheetTexture(accent = '#1b8cf5') {
  const tex = useMemo(() => {
    const { canvas, ctx } = makeCanvas(512, 512);
    ctx.fillStyle = '#f5f8fb';
    ctx.fillRect(0, 0, 512, 512);
    const cols = 3;
    const rows = 6;
    const pw = 512 / cols;
    const ph = 512 / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * pw + 8;
        const y = r * ph + 6;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#d6e2ee';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, pw - 16, ph - 12, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = accent;
        ctx.fillRect(x + 10, y + 10, 28, 6);
        ctx.fillStyle = '#c3d2e0';
        ctx.fillRect(x + 10, y + 28, pw - 56, 5);
        ctx.fillRect(x + 10, y + 42, pw - 80, 5);
      }
    }
    return toTexture(canvas);
  }, [accent]);
  return useDisposable(tex);
}

/* ────────────────────────── surgical drape / gown alpha maps ────────────────────────── */

/** Drape: colour map with adhesive border + alpha map with a fenestration (hole). */
export function useDrapeTextures(color: string) {
  const textures = useMemo(() => {
    const w = 1024;
    const h = 704;
    const { canvas: c1, ctx } = makeCanvas(w, h);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    // subtle weave
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#ffffff';
    for (let y = 0; y < h; y += 6) ctx.fillRect(0, y, w, 1);
    ctx.globalAlpha = 1;
    // adhesive ring
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h / 2, 190, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    // fold lines
    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 3, 0);
    ctx.lineTo(w / 3, h);
    ctx.moveTo((w * 2) / 3, 0);
    ctx.lineTo((w * 2) / 3, h);
    ctx.stroke();

    const { canvas: c2, ctx: a } = makeCanvas(w, h);
    a.fillStyle = '#fff';
    a.fillRect(0, 0, w, h);
    a.fillStyle = '#000';
    a.beginPath();
    a.ellipse(w / 2, h / 2, 150, 88, 0, 0, Math.PI * 2);
    a.fill();

    return [toTexture(c1), toTexture(c2, false)] as THREE.CanvasTexture[];
  }, [color]);
  useDisposable(textures);
  return { map: textures[0], alphaMap: textures[1] };
}

/** Gown: T-shaped silhouette via alpha map, with cuffs, seams and a neck notch. */
export function useGownTextures(color: string, trim: string) {
  const textures = useMemo(() => {
    const w = 1024;
    const h = 1024;
    const shape = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      // neck notch → left shoulder → left sleeve → left underarm → hem → mirrored
      ctx.moveTo(420, 120);
      ctx.quadraticCurveTo(512, 210, 604, 120);
      ctx.lineTo(700, 150);
      ctx.lineTo(980, 520);
      ctx.lineTo(900, 590);
      ctx.lineTo(740, 420);
      ctx.lineTo(740, 960);
      ctx.quadraticCurveTo(512, 990, 284, 960);
      ctx.lineTo(284, 420);
      ctx.lineTo(124, 590);
      ctx.lineTo(44, 520);
      ctx.lineTo(324, 150);
      ctx.closePath();
    };

    const { canvas: c1, ctx } = makeCanvas(w, h);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#fff';
    for (let y = 0; y < h; y += 6) ctx.fillRect(0, y, w, 1);
    ctx.globalAlpha = 1;
    // cuffs
    ctx.save();
    shape(ctx);
    ctx.clip();
    ctx.fillStyle = trim;
    ctx.save();
    ctx.translate(940, 555);
    ctx.rotate(0.88);
    ctx.fillRect(-60, -30, 120, 60);
    ctx.restore();
    ctx.save();
    ctx.translate(84, 555);
    ctx.rotate(-0.88);
    ctx.fillRect(-60, -30, 120, 60);
    ctx.restore();
    // seams & centre line
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 4;
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.moveTo(512, 215);
    ctx.lineTo(512, 975);
    ctx.moveTo(284, 420);
    ctx.lineTo(324, 150);
    ctx.moveTo(740, 420);
    ctx.lineTo(700, 150);
    ctx.stroke();
    ctx.restore();

    const { canvas: c2, ctx: a } = makeCanvas(w, h);
    a.fillStyle = '#000';
    a.fillRect(0, 0, w, h);
    a.fillStyle = '#fff';
    shape(a);
    a.fill();

    return [toTexture(c1), toTexture(c2, false)] as THREE.CanvasTexture[];
  }, [color, trim]);
  useDisposable(textures);
  return { map: textures[0], alphaMap: textures[1] };
}
