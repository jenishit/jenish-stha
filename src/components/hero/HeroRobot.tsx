'use client';

import { useEffect, useRef } from 'react';

export default function HeroRobot() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angle = Math.atan2(y - centerY, x - centerX);
      const rotateX = (Math.sin(angle) * 20).toFixed(2);
      const rotateY = (-Math.cos(angle) * 20).toFixed(2);
      
      containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-64 h-64 mx-auto flex items-center justify-center transition-transform duration-75"
    >
      {/* Placeholder robot visualization */}
      <div className="relative">
        <div className="w-48 h-48 rounded-full border-2 border-[#00FFD5] bg-gradient-to-b from-[#1a1f3a] to-[#0B0F1A] flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🤖</div>
            <div className="text-[#00FFD5] font-mono text-sm">J-BOT</div>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full border-2 border-[#00FFD5] opacity-50 animate-pulse" />
      </div>
    </div>
  );
}
