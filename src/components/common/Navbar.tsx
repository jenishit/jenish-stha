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
          ? 'bg-gradient-to-r from-royal-navy/95 via-royal-deep/90 to-royal-navy/95 backdrop-blur-xl border-b border-luxury-gold/20 shadow-luxury'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo - Elegant serif style */}
        <div className="font-serif text-2xl font-bold tracking-wide">
          <span className="text-luxury-gold">✦</span>
          <span className="text-frost-white ml-3 font-normal">Jenish</span>
          <span className="text-luxury-gold ml-3">✦</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 font-display text-sm font-500">
          <button
            onClick={() => handleNavClick('about')}
            className="relative text-soft-silver hover:text-luxury-gold transition-all duration-300 group"
          >
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-gold to-royal-mauve group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => handleNavClick('research')}
            className="relative text-soft-silver hover:text-luxury-gold transition-all duration-300 group"
          >
            Research
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-gold to-royal-mauve group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => handleNavClick('skills')}
            className="relative text-soft-silver hover:text-luxury-gold transition-all duration-300 group"
          >
            Skills
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-gold to-royal-mauve group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="relative text-soft-silver hover:text-luxury-gold transition-all duration-300 group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-luxury-gold to-royal-mauve group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => handleNavClick('contact')}
          className="px-6 py-2.5 bg-gradient-to-r from-luxury-gold to-accent-gold text-royal-dark font-semibold rounded-full hover:shadow-glow-gold transition-all duration-300 transform hover:-translate-y-1 hidden sm:block"
        >
          Connect
        </button>
      </div>
    </nav>
  );
}
