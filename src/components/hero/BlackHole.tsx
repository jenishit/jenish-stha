'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  velocity: number;
  opacity: number;
  hue: number;
}

export default function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initializeParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 300; i++) {
        particlesRef.current.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          angle: Math.random() * Math.PI * 2,
          distance: Math.random() * 350 + 60,
          size: Math.random() * 2.5 + 0.5,
          velocity: Math.random() * 4 + 1.5,
          opacity: Math.random() * 0.8 + 0.4,
          hue: Math.random() * 60 + 30, // White to warm yellow range (30-90 hue)
        });
      }
    };
    initializeParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      // Clear with semi-transparent black for motion blur effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2 + (mousePosRef.current.x - canvas.width / 2) * 0.1;
      const centerY = canvas.height / 2 + (mousePosRef.current.y - canvas.height / 2) * 0.1;
      const blackHoleRadius = 60 + Math.sin(time * 0.01) * 10;

      // Draw accretion disk - outer glowing ring
      const gradient = ctx.createRadialGradient(centerX, centerY, blackHoleRadius, centerX, centerY, blackHoleRadius + 200);
      gradient.addColorStop(0, 'rgba(200, 155, 75, 0)');
      gradient.addColorStop(0.3, 'rgba(200, 155, 75, 0.3)');
      gradient.addColorStop(0.7, 'rgba(107, 63, 176, 0.2)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius + 200, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Orbital motion
        particle.angle += particle.velocity * 0.005;
        
        // Spiral inward effect
        particle.distance -= particle.velocity * 0.15;
        
        if (particle.distance < blackHoleRadius) {
          // Reset particle
          particle.distance = 300;
          particle.angle = Math.random() * Math.PI * 2;
          particle.opacity = Math.random() * 0.7 + 0.3;
        }

        const x = centerX + Math.cos(particle.angle) * particle.distance;
        const y = centerY + Math.sin(particle.angle) * particle.distance;

        // Calculate opacity based on distance (fade near black hole)
        const opacityMultiplier = Math.max(0, 1 - (blackHoleRadius - 20) / particle.distance);
        const finalOpacity = particle.opacity * opacityMultiplier;

        // Draw particle with glow
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${finalOpacity})`;
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 60%, ${finalOpacity * 0.5})`;
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x = x;
        particle.y = y;
      });

      // Draw event horizon (black hole center)
      const horizonGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, blackHoleRadius);
      horizonGradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      horizonGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.8)');
      horizonGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

      ctx.fillStyle = horizonGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw intense glow around event horizon
      ctx.strokeStyle = `rgba(200, 155, 75, ${0.6 + Math.sin(time * 0.02) * 0.2})`;
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(200, 155, 75, 0.8)';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Secondary glow ring
      ctx.strokeStyle = `rgba(107, 63, 176, ${0.4 + Math.sin(time * 0.015) * 0.2})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(107, 63, 176, 0.6)';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(centerX, centerY, blackHoleRadius + 30, 0, Math.PI * 2);
      ctx.stroke();

      // Draw distortion effect - subtle lens effects
      const distortionRings = 3;
      for (let i = 1; i <= distortionRings; i++) {
        const ringRadius = blackHoleRadius + 50 * i;
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 / i})`;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 5 * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ pointerEvents: 'none', zIndex: 5 }}
    />
  );
}
