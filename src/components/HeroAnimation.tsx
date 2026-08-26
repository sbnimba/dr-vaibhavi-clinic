'use client';

import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
  opacityDir: number;
  pulseAngle: number;
  pulseSpeed: number;
}

const HeroAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Restrained brand palette — one calming primary tone, one warm neutral.
    // Fewer, larger, slower shapes read as a quiet ambient wash rather than
    // a busy animated background — closer to how premium sites use motion.
    const blobColors = [
      { r: 252, g: 214, b: 227 }, // soft primary blush
      { r: 255, g: 233, b: 214 }, // warm cream
    ];

    const mkColor = (c: { r: number; g: number; b: number }, a: number) =>
      `rgba(${c.r},${c.g},${c.b},${a.toFixed(2)})`;

    // Large soft floating blobs — the only moving element left.
    const blobs: Blob[] = Array.from({ length: 4 }, (_, i) => {
      const c = blobColors[i % blobColors.length];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 140 + Math.random() * 160,
        color: mkColor(c, 1),
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        opacity: 0.08 + Math.random() * 0.08,
        opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.0004,
        pulseAngle: Math.random() * Math.PI * 2,
        pulseSpeed: 0.004 + Math.random() * 0.004,
      };
    });

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw blobs
      blobs.forEach(b => {
        b.pulseAngle += b.pulseSpeed;
        const r = b.radius + Math.sin(b.pulseAngle) * 15;
        b.opacity += b.opacityDir;
        if (b.opacity > 0.18 || b.opacity < 0.04) b.opacityDir *= -1;
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -r) b.x = canvas.width + r;
        if (b.x > canvas.width + r) b.x = -r;
        if (b.y < -r) b.y = canvas.height + r;
        if (b.y > canvas.height + r) b.y = -r;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0, b.color.replace(/[\d.]+\)$/, `${b.opacity.toFixed(2)})`));
        grad.addColorStop(0.6, b.color.replace(/[\d.]+\)$/, `${(b.opacity * 0.4).toFixed(2)})`));
        grad.addColorStop(1, b.color.replace(/[\d.]+\)$/, '0)'));
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  );
};

export default HeroAnimation;
