'use client';

import { useEffect, useState } from 'react';
import BootSequence from './BootSequence';
import BlackHole from './BlackHole';

export default function HeroSection() {
  const [bootComplete, setBootComplete] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Boot sequence takes ~3.6 seconds (6 messages × 600ms)
    const timer = setTimeout(() => {
      setBootComplete(true);
      // Show hero text content after boot
      setTimeout(() => setTextVisible(true), 300);
    }, 3900);

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Black hole background effect */}
      <BlackHole />
      
      {/* Boot sequence overlay */}
      {!bootComplete && <BootSequence />}

      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradient orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-luxury-gold via-transparent to-transparent rounded-full blur-3xl opacity-[0.08]"
          style={{
            top: '15%',
            right: '5%',
            animation: 'float 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-96 h-96 bg-gradient-to-tl from-royal-purple via-transparent to-transparent rounded-full blur-3xl opacity-[0.08]"
          style={{
            bottom: '10%',
            left: '5%',
            animation: 'float 30s ease-in-out infinite reverse',
          }}
        />
        
        {/* Subtle elegant grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(200, 155, 75, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200, 155, 75, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Content */}
      {bootComplete && (
        <div
          className={`relative z-10 max-w-7xl w-full px-6 transition-all duration-1000 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left decorative element */}
            <div className="flex flex-col items-center md:items-start gap-12">
              {/* Elegant icon design instead of emoji */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold to-royal-purple rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-28 h-28 flex items-center justify-center rounded-3xl bg-gradient-to-br from-luxury-gold/10 to-royal-purple/10 border border-luxury-gold/30 backdrop-blur-sm">
                  <div className="text-4xl">⚡</div>
                </div>
              </div>

              {/* Elegant introduction */}
              <div className="space-y-6 max-w-sm">
                <div className="space-y-2">
                  <p className="text-luxury-gold text-sm font-display font-600 tracking-widest">WELCOME</p>
                  <h2 className="text-3xl font-serif text-frost-white font-700">
                    Your Creative Engineer
                  </h2>
                </div>
                <p className="text-soft-silver leading-relaxed font-display">
                  Crafting elegant solutions at the intersection of innovation and artistry.
                </p>
              </div>
            </div>

            {/* Right content section */}
            <div className="space-y-10 text-center md:text-left">
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl font-serif font-700 leading-tight">
                  <span className="text-frost-white">Jenish</span>
                  <br />
                  <span className="bg-gradient-to-r from-luxury-gold via-accent-gold to-royal-mauve bg-clip-text text-transparent">
                    Builds Tomorrow
                  </span>
                </h1>
                
                <p className="text-xl text-soft-silver font-display leading-relaxed max-w-xl mx-auto md:mx-0">
                  Specializing in robotics, embedded systems, and intelligent solutions that transform concepts into reality.
                </p>

                {/* Key skills highlight */}
                <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start pt-4">
                  {['Robotics', 'AI/ML', 'Embedded Systems', 'IoT'].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-sm font-display"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  onClick={() => handleScroll('about')}
                  className="group px-8 py-4 bg-gradient-to-r from-luxury-gold to-accent-gold text-royal-dark font-display font-600 rounded-full hover:shadow-glow-gold transition-all duration-400 transform hover:-translate-y-1 luxury-hover"
                >
                  Explore Work
                </button>
                <button
                  onClick={() => handleScroll('projects')}
                  className="group px-8 py-4 border-2 border-luxury-gold/50 text-luxury-gold font-display font-600 rounded-full hover:bg-luxury-gold/5 hover:border-luxury-gold transition-all duration-400 transform hover:-translate-y-1"
                >
                  View Portfolio
                </button>
              </div>

              {/* Decorative line */}
              <div className="pt-8 border-t border-luxury-gold/20">
                <p className="text-sm text-soft-silver font-display">
                  <span className="text-luxury-gold">↓</span> Scroll to discover more
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-luxury-gold mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
