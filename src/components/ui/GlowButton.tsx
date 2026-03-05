'use client';

import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function GlowButton({
  children,
  onClick,
  className = '',
}: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-mono font-bold
        bg-transparent border-2 border-[#00FFD5] text-[#00FFD5]
        hover:bg-[#00FFD5] hover:text-[#0B0F1A]
        hover:shadow-[0_0_20px_rgba(0,255,213,0.6)]
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </button>
  );
}
