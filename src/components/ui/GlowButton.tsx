'use client';

import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'gold' | 'purple' | 'outline';
}

export default function GlowButton({
  children,
  onClick,
  className = '',
  variant = 'gold',
}: GlowButtonProps) {
  const variantClasses = {
    gold: 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-royal-dark hover:shadow-glow-gold',
    purple: 'border-royal-mauve text-royal-mauve hover:bg-royal-mauve hover:text-frost-white hover:shadow-glow-purple',
    outline: 'border-luxury-gold/30 text-luxury-gold hover:border-luxury-gold hover:bg-luxury-gold/5',
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-display font-600
        bg-transparent border-2
        transition-all duration-400 transform hover:-translate-y-1
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
