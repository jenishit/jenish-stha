'use client';

import { useEffect, useState } from 'react';
import BootSequence from './BootSequence';

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
      {/* Boot sequence overlay */}
      {!bootComplete && <BootSequence />}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 213, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 213, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />

        {/* Floating gradients */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-[#00FFD5] to-transparent rounded-full blur-3xl opacity-10"
          style={{
            top: '20%',
            right: '10%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-96 h-96 bg-gradient-to-l from-[#7C3AED] to-transparent rounded-full blur-3xl opacity-10"
          style={{
            bottom: '20%',
            left: '10%',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Content */}
      {bootComplete && (
        <div
          className={`relative z-10 max-w-6xl w-full px-4 transition-all duration-1000 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Robot Section */}
            <div className="flex flex-col items-center md:items-start gap-8">
              {/* Robot Avatar */}
              <div className="text-9xl animate-pulse drop-shadow-2xl" style={{
                textShadow: '0 0 40px rgba(0, 255, 213, 0.5)',
              }}>
                🤖
              </div>

              {/* J-Bot Introduction */}
              <div className="space-y-4">
                <div className="text-lg text-[#00FFD5] font-mono">
                  <span className="animate-pulse">{'>'}</span> Welcome to Jenish Lab
                </div>
                <div className="font-mono text-[#B0B4C8] space-y-1">
                  <p>{'→'} Hello visitor. I am J-Bot.</p>
                  <p>{'→'} Your guide through the engineering lab.</p>
                  <p className="text-[#00FFD5]">{'→'} Ready to explore?</p>
                </div>
              </div>
            </div>

            {/* Hero Text Section */}
            <div className="space-y-8 text-center md:text-left">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Engineer <span className="text-[#00FFD5]">Jenish</span>
                </h1>
                <p className="text-xl md:text-2xl text-[#B0B4C8] font-mono">
                  <span className="text-[#00FFD5]">Robotics</span> • <span className="text-[#7C3AED]">Embedded Systems</span> • <span className="text-[#00FFD5]">Machine Learning</span>
                </p>
              </div>

              <p className="text-[#E5E7EB] leading-relaxed max-w-lg mx-auto md:mx-0">
                Transforming ideas into intelligent systems. Building autonomous robots, embedded devices,
                and intelligent solutions that bridge hardware and software.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => handleScroll('about')}
                  className="px-8 py-3 bg-[#00FFD5] text-[#0B0F1A] font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FFD5]/50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Enter The Lab
                </button>
                <button
                  onClick={() => handleScroll('projects')}
                  className="px-8 py-3 border-2 border-[#00FFD5] text-[#00FFD5] font-bold rounded-lg hover:bg-[#00FFD5]/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  View Projects
                </button>
              </div>

              {/* Terminal hint */}
              <div className="pt-8 border-t border-[#00FFD5]/20">
                <p className="text-sm text-[#B0B4C8] font-mono">
                  <span className="text-[#00FFD5]">Hint:</span> Press <span className="bg-[#1a1f3a] px-2 rounded">Ctrl + K</span> to open the lab console
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-[#B0B4C8] text-sm mb-2">Scroll to explore</p>
            <div className="animate-bounce">
              <svg
                className="w-6 h-6 text-[#00FFD5] mx-auto"
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
