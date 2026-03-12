'use client';

import { useState } from 'react';
import GlowButton from '@/components/ui/GlowButton';

export default function ContactTerminal() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setMessage('');
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-luxury-gold to-royal-purple" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-frost-white">
              Get In Touch
            </h2>
          </div>

          <p className="text-soft-silver max-w-2xl font-display text-sm tracking-wide">
            Let's collaborate on robotics, engineering projects, or innovative initiatives
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-royal-deep/40 to-royal-navy/40 border border-luxury-gold/30 rounded-lg p-8 hover:border-luxury-gold/60 transition-all duration-400 hover:shadow-glow-gold luxury-hover">
            <h3 className="text-lg font-serif font-bold text-luxury-gold mb-6">Connect with Jenish</h3>

            <div className="space-y-4 font-display text-sm">
              <div className="border-l-2 border-royal-mauve pl-4">
                <p className="text-royal-mauve mb-1 font-600">Email</p>
                <p className="text-frost-white">jenish@example.com</p>
              </div>

              <div className="border-l-2 border-luxury-gold pl-4">
                <p className="text-luxury-gold mb-1 font-600">GitHub</p>
                <p className="text-frost-white">github.com/jenish</p>
              </div>

              <div className="border-l-2 border-royal-mauve pl-4">
                <p className="text-royal-mauve mb-1 font-600">LinkedIn</p>
                <p className="text-frost-white">linkedin.com/in/jenish</p>
              </div>

              <div className="border-l-2 border-luxury-gold pl-4">
                <p className="text-luxury-gold mb-1 font-600">Location</p>
                <p className="text-frost-white">Available for remote opportunities</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-royal-deep/40 to-royal-navy/40 border border-luxury-gold/30 rounded-lg p-8 hover:border-luxury-gold/60 transition-all duration-400 hover:shadow-glow-gold luxury-hover">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-luxury-gold text-sm block mb-3 font-display font-600 tracking-wide">
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-royal-deep border border-luxury-gold/30 rounded px-4 py-3 text-frost-white font-display text-sm focus:outline-none focus:border-luxury-gold focus:shadow-lg focus:shadow-luxury-gold/20 transition-all resize-none"
                  rows={5}
                />
              </div>

              <GlowButton className="w-full">
                {submitted ? '✓ Message Transmitted' : 'Send Message'}
              </GlowButton>

              {submitted && (
                <div className="text-luxury-gold text-sm font-display">
                  {'✓ '} Message transmitted successfully. Thank you for connecting!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-soft-silver font-display text-sm">
            <span className="text-luxury-gold">✦</span> Thank you for exploring my work
          </p>
          <p className="text-soft-silver font-display text-xs mt-2 tracking-wide">
            Crafted with Next.js • React • TailwindCSS • TypeScript
          </p>
        </div>
      </div>
    </section>
  );
}
