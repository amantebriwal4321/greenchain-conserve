
import React, { useRef, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
}

const ParticleBackground: React.FC<Props> = ({ progress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const count = 150;

    class Particle {
      x: number;
      y: number;
      size: number;
      baseSpeed: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 0.8 + 0.2;
        this.baseSpeed = Math.random() * 0.2 + 0.05;
        this.color = '#ffffff';
        this.opacity = Math.random() * 0.15;
      }

      update(p: number) {
        // Subtle drift
        const speed = this.baseSpeed + p * 0.5;
        this.y -= speed;
        if (this.y < -10) this.y = canvas!.height + 10;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: count }, () => new Particle());
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const p = progress.get();
      particles.forEach(part => {
        part.update(p);
        part.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    init();
    render();

    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
    };
  }, [progress]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
};

export default ParticleBackground;
