"use client";

import { useEffect, useRef } from "react";

interface HeroSapphireCanvasProps {
  className?: string;
  reducedMotion?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  hueShift: number; // 0 = sapphire, 1 = cyan, 2 = emerald, 3 = white
  pulseSpeed: number;
  phase: number;
}

export default function HeroSapphireCanvas({ className = "", reducedMotion = false }: HeroSapphireCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking with smooth spring damping
    const mouse = {
      x: width * 0.65,
      y: height * 0.45,
      targetX: width * 0.65,
      targetY: height * 0.45,
      active: false,
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = width * 0.65;
      mouse.targetY = height * 0.45;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);

    // Initialize 65 molecular bio-particles
    const particleCount = width < 768 ? 32 : 64;
    const particles: Particle[] = [];
    const colors = [
      "rgba(56, 189, 248,",  // cyan #38bdf8
      "rgba(3, 78, 162,",    // royal sapphire #034ea2
      "rgba(74, 222, 128,",  // emerald bio-green #4ade80
      "rgba(255, 255, 255,", // pure white
    ];

    for (let i = 0; i < particleCount; i++) {
      const type = i % 4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.2 - Math.random() * 0.45, // gentle upward sterile cleanroom buoyancy
        radius: Math.random() * 2.2 + 0.8,
        baseRadius: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.5 + 0.25,
        baseAlpha: Math.random() * 0.5 + 0.25,
        hueShift: type,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(render);
        return;
      }

      time += reducedMotion ? 0.003 : 0.016;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // ─── LAYER 1: Dynamic Flowing Harmonic Wave Meshes (The #034ea2 Sapphire Ocean) ───
      // We draw 3 organic undulating bezier wave ribbons that shift and flow in realtime
      const waveConfigs = [
        {
          baseY: height * 0.72,
          amplitude: 36,
          freq: 0.0018,
          speed: 1.0,
          colorA: "rgba(3, 78, 162, 0.55)",
          colorB: "rgba(2, 53, 114, 0.0)",
          lineWidth: 2,
          strokeColor: "rgba(56, 189, 248, 0.35)",
        },
        {
          baseY: height * 0.62,
          amplitude: 28,
          freq: 0.0026,
          speed: 1.4,
          colorA: "rgba(2, 64, 137, 0.45)",
          colorB: "rgba(1, 35, 78, 0.0)",
          lineWidth: 1.5,
          strokeColor: "rgba(74, 222, 128, 0.28)", // subtle bio-green harmonic
        },
        {
          baseY: height * 0.82,
          amplitude: 44,
          freq: 0.0014,
          speed: 0.75,
          colorA: "rgba(4, 92, 189, 0.6)",
          colorB: "rgba(2, 37, 82, 0.0)",
          lineWidth: 2.5,
          strokeColor: "rgba(56, 189, 248, 0.5)",
        },
      ];

      waveConfigs.forEach((wave, idx) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, wave.baseY);

        const step = 20;
        for (let x = 0; x <= width + step; x += step) {
          // Dynamic harmonic wave height
          const wave1 = Math.sin(x * wave.freq + time * wave.speed + idx * 1.8) * wave.amplitude;
          const wave2 = Math.cos(x * wave.freq * 1.5 - time * wave.speed * 0.8) * (wave.amplitude * 0.45);

          // Interactive mouse gravity displacement: ripples around mouse
          const dx = x - mouse.x;
          const distToMouse = Math.abs(dx);
          const mouseEffect = Math.exp(-Math.pow(distToMouse / 220, 2)) * 32 * Math.sin(time * 3 + idx);

          const y = wave.baseY + wave1 + wave2 + (mouse.active ? mouseEffect : 0);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Fill with deep sapphire gradient
        const grad = ctx.createLinearGradient(0, wave.baseY - wave.amplitude, 0, height);
        grad.addColorStop(0, wave.colorA);
        grad.addColorStop(1, wave.colorB);
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke the glowing crest
        ctx.strokeStyle = wave.strokeColor;
        ctx.lineWidth = wave.lineWidth;
        ctx.stroke();
      });

      // ─── LAYER 2: Realtime Caustic Light Sweep / Medical Precision Beam ───
      const sweepX = ((time * 70) % (width + 600)) - 300;
      const sweepGrad = ctx.createLinearGradient(sweepX, 0, sweepX + 240, height);
      sweepGrad.addColorStop(0, "rgba(56, 189, 248, 0.0)");
      sweepGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.07)");
      sweepGrad.addColorStop(1, "rgba(74, 222, 128, 0.0)");
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, 0, width, height);

      // ─── LAYER 3: Bioluminescent Molecular Cleanroom Particles ───
      // Update and draw particles with interactive mouse deflection and constellation links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges seamlessly
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Interactive mouse reaction: gentle repelling or swirl
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140 && mdist > 1) {
            const force = (140 - mdist) / 140;
            p.x += (mdx / mdist) * force * 1.8;
            p.y += (mdy / mdist) * force * 1.8;
          }
        }

        // Pulse size and alpha
        const currentAlpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.phase) * 0.18;
        const currentRadius = p.baseRadius + Math.sin(time * p.pulseSpeed * 40 + p.phase) * 0.4;
        const colorPrefix = colors[p.hueShift];

        // Particle Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = `${colorPrefix} ${Math.max(0.05, Math.min(1, currentAlpha))})`;
        ctx.fill();

        // Soft outer glow for sapphire & emerald particles
        if (p.hueShift === 0 || p.hueShift === 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, currentRadius * 2.8), 0, Math.PI * 2);
          ctx.fillStyle = `${colorPrefix} ${Math.max(0, currentAlpha * 0.25)})`;
          ctx.fill();
        }

        // Constellation lines between nearby particles (medical polymer network aesthetic)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distx = p.x - p2.x;
          const disty = p.y - p2.y;
          const d = Math.sqrt(distx * distx + disty * disty);
          if (d < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - d / 85) * 0.14;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
