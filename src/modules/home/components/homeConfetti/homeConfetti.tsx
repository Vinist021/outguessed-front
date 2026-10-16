import { useEffect, useRef } from "react";
import styles from "./homeConfetti.module.css";

const TILE_HEIGHT = 1020;
// Positions, radii and alpha values from the original background gradients.
const PARTICLE_SEEDS = [
  [0.04, 0.08, 2, "--color-pink", 0x44 / 255],
  [0.39, 0.04, 2, "--color-cyan", 0x3d / 255],
  [0.69, 0.12, 3, "--color-yellow", 0x60 / 255],
  [0.86, 0.05, 3, "--color-pink", 0x40 / 255],
  [0.95, 0.19, 2, "--color-cyan", 0x52 / 255],
  [0.53, 0.15, 3, "--color-mint", 0x33 / 255],
  [0.8, 0.22, 2, "--color-pink", 0x3d / 255],
  [0.02, 0.41, 2, "--color-mint", 0x40 / 255],
  [0.98, 0.56, 3, "--color-pink", 0x55 / 255],
  [0.01, 0.72, 2, "--color-yellow", 0x55 / 255],
  [0.33, 0.92, 2, "--color-cyan", 0x33 / 255],
  [0.93, 0.88, 3, "--color-yellow", 0x33 / 255],
  [0.62, 0.96, 2, "--color-pink", 0x40 / 255],
] as const;

type Particle = {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  fade: number;
  velocityX: number;
  velocityY: number;
};

function HomeConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const palette = getComputedStyle(canvas);
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frameId: number | null = null;
    let previousTime: number | null = null;
    let isVisible = false;

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        context.globalAlpha = particle.opacity * particle.fade;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    function respawn(particle: Particle) {
      particle.velocityX = Math.random() * 20 - 10;
      particle.velocityY = -(Math.random() * 8 + 2);
      particle.fade = 0;

      // Weight entry edges by incoming speed to keep the distribution even.
      const bottomWeight = width * Math.abs(particle.velocityY);
      const sideWeight = height * Math.abs(particle.velocityX);
      if (Math.random() * (bottomWeight + sideWeight) < bottomWeight) {
        particle.x = Math.random() * width;
        particle.y = height + particle.radius;
      } else {
        particle.x = particle.velocityX > 0 ? -particle.radius : width + particle.radius;
        particle.y = Math.random() * height;
      }
    }

    function animate(time: number) {
      const elapsed = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.1);
      previousTime = time;

      for (const particle of particles) {
        particle.x += particle.velocityX * elapsed;
        particle.y += particle.velocityY * elapsed;
        particle.fade = Math.min(1, particle.fade + elapsed / 2);
        if (
          particle.x < -particle.radius ||
          particle.x > width + particle.radius ||
          particle.y < -particle.radius
        ) {
          respawn(particle);
        }
      }

      draw();
      frameId = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      previousTime = null;

      if (reducedMotion.matches) {
        for (const particle of particles) particle.fade = 1;
        draw();
      } else if (isVisible && !document.hidden && width > 0 && height > 0) {
        frameId = requestAnimationFrame(animate);
      }
    }

    function resize() {
      if (!canvas || !context) return;
      const bounds = canvas.getBoundingClientRect();
      const oldWidth = width;
      const oldHeight = height;
      width = bounds.width;
      height = bounds.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const nextParticles: Particle[] = [];
      for (let offset = 0; offset < height; offset += TILE_HEIGHT) {
        for (const [x, y, radius, color, opacity] of PARTICLE_SEEDS) {
          const initialY = offset + y * TILE_HEIGHT;
          if (initialY >= height) continue;
          const previous = particles[nextParticles.length];
          nextParticles.push(
            previous && oldWidth > 0 && oldHeight > 0
              ? {
                  ...previous,
                  x: (previous.x / oldWidth) * width,
                  y: (previous.y / oldHeight) * height,
                }
              : {
                  x: x * width,
                  y: initialY,
                  radius,
                  color: palette.getPropertyValue(color).trim(),
                  opacity,
                  fade: 1,
                  velocityX: Math.random() * 20 - 10,
                  velocityY: -(Math.random() * 8 + 2),
                },
          );
        }
      }
      particles = nextParticles;
      draw();
      syncAnimation();
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      syncAnimation();
    });

    resize();
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", syncAnimation);
    reducedMotion.addEventListener("change", syncAnimation);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", syncAnimation);
      reducedMotion.removeEventListener("change", syncAnimation);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.homeConfetti} aria-hidden="true" />;
}

export default HomeConfetti;
