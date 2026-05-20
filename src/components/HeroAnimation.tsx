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

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  opacityDir: number;
  color: string;
  speed: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  angle: number;
  rotSpeed: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
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

    // Soothing brand palette — soft pink, peach, lavender
    const blobColors = [
      { r: 255, g: 183, b: 197 }, // soft pink
      { r: 255, g: 218, b: 185 }, // peach
      { r: 216, g: 191, b: 216 }, // lavender
      { r: 255, g: 204, b: 213 }, // blush
      { r: 230, g: 190, b: 255 }, // soft purple
      { r: 255, g: 230, b: 200 }, // warm cream
    ];

    const mkColor = (c: { r: number; g: number; b: number }, a: number) =>
      `rgba(${c.r},${c.g},${c.b},${a.toFixed(2)})`;

    // Large soft floating blobs
    const blobs: Blob[] = Array.from({ length: 12 }, () => {
      const c = blobColors[Math.floor(Math.random() * blobColors.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 80 + Math.random() * 160,
        color: mkColor(c, 1),
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        opacity: 0.12 + Math.random() * 0.18,
        opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.0008,
        pulseAngle: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.008,
      };
    });

    // Tiny sparkle dots
    const sparkleColors = ['#ffb6c1', '#ffd7be', '#d8b4fe', '#fbcfe8', '#fde68a'];
    const sparkles: Sparkle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1.5 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.6,
      opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.005,
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      speed: 0.1 + Math.random() * 0.3,
    }));

    // Soft floating petals / hearts
    const petalColors = ['rgba(255,182,193,0.5)', 'rgba(255,192,203,0.4)', 'rgba(216,180,254,0.4)', 'rgba(253,186,116,0.3)'];
    const petals: Petal[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      size: 4 + Math.random() * 10,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(0.3 + Math.random() * 0.5),
      opacity: 0.3 + Math.random() * 0.5,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.3);
      ctx.bezierCurveTo(size * 0.5, -size, size * 1.1, 0, 0, size * 0.8);
      ctx.bezierCurveTo(-size * 1.1, 0, -size * 0.5, -size, 0, -size * 0.3);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw blobs
      blobs.forEach(b => {
        b.pulseAngle += b.pulseSpeed;
        const r = b.radius + Math.sin(b.pulseAngle) * 15;
        b.opacity += b.opacityDir;
        if (b.opacity > 0.3 || b.opacity < 0.05) b.opacityDir *= -1;
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

      // Draw sparkles
      sparkles.forEach(s => {
        s.opacity += s.opacityDir;
        if (s.opacity > 0.8 || s.opacity < 0.05) s.opacityDir *= -1;
        s.y -= s.speed;
        if (s.y < -10) {
          s.y = canvas.height + 10;
          s.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.round(s.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        // Add cross sparkle effect for some
        if (s.size > 3) {
          ctx.strokeStyle = s.color + Math.round(s.opacity * 0.5 * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y - s.size * 2);
          ctx.lineTo(s.x, s.y + s.size * 2);
          ctx.moveTo(s.x - s.size * 2, s.y);
          ctx.lineTo(s.x + s.size * 2, s.y);
          ctx.stroke();
        }
      });

      // Draw floating hearts/petals
      petals.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.rotSpeed;
        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
        }
        drawHeart(ctx, p.x, p.y, p.size, p.angle, p.color);
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
