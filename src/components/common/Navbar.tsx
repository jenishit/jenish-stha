'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0F1A]/95 backdrop-blur-md border-b border-[#00FFD5]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="font-mono text-xl font-bold">
          <span className="text-[#00FFD5]">{'<'}</span>
          <span className="text-white">JENISH LAB</span>
          <span className="text-[#7C3AED]">{' />'}</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          <button
            onClick={() => handleNavClick('about')}
            className="text-[#E5E7EB] hover:text-[#00FFD5] transition-colors duration-300"
          >
            Projects
          </button>
          <button
            onClick={() => handleNavClick('research')}
            className="text-[#E5E7EB] hover:text-[#00FFD5] transition-colors duration-300"
          >
            Research
          </button>
          <button
            onClick={() => handleNavClick('skills')}
            className="text-[#E5E7EB] hover:text-[#00FFD5] transition-colors duration-300"
          >
            Skills
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="text-[#E5E7EB] hover:text-[#00FFD5] transition-colors duration-300"
          >
            Contact
          </button>

          {/* Console indicator */}
          <div className="ml-4 pl-4 border-l border-[#00FFD5]/30">
            <span className="text-[#00FFD5] text-xs">Press </span>
            <span className="bg-[#1a1f3a] px-2 py-1 rounded text-[#00FFD5] font-bold">
              Ctrl + K
            </span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button className="text-[#00FFD5] text-2xl">☰</button>
        </div>
      </div>
    </nav>
  );
}
