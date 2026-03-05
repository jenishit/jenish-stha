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
            <div className="h-1 w-12 bg-gradient-to-r from-[#00FFD5] to-[#7C3AED]" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-[#00FFD5]">{'[ '}</span>
              Contact Terminal
              <span className="text-[#00FFD5]">{' ]'}</span>
            </h2>
          </div>

          <p className="text-[#B0B4C8] max-w-2xl font-mono text-sm">
            <span className="text-[#00FFD5]"># </span>
            Reach out to discuss robotics, engineering projects, or collaborations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1425] border border-[#00FFD5]/40 rounded-lg p-8 hover:border-[#00FFD5] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFD5]/20">
            <h3 className="text-lg font-bold text-[#00FFD5] mb-6 font-mono">$ connect jenish</h3>

            <div className="space-y-4 font-mono text-sm">
              <div className="border-l-2 border-[#7C3AED] pl-4">
                <p className="text-[#7C3AED] mb-1">Email</p>
                <p className="text-[#E5E7EB]">jenish@example.com</p>
              </div>

              <div className="border-l-2 border-[#00FFD5] pl-4">
                <p className="text-[#00FFD5] mb-1">GitHub</p>
                <p className="text-[#E5E7EB]">github.com/jenish</p>
              </div>

              <div className="border-l-2 border-[#7C3AED] pl-4">
                <p className="text-[#7C3AED] mb-1">LinkedIn</p>
                <p className="text-[#E5E7EB]">linkedin.com/in/jenish</p>
              </div>

              <div className="border-l-2 border-[#00FFD5] pl-4">
                <p className="text-[#00FFD5] mb-1">Location</p>
                <p className="text-[#E5E7EB]">Ready for remote work</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1425] border border-[#00FFD5]/40 rounded-lg p-8 hover:border-[#00FFD5] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFD5]/20">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[#00FFD5] text-sm block mb-3 font-mono">
                  {'> '} transmit message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-[#0B0F1A] border border-[#00FFD5]/40 rounded px-4 py-3 text-[#E5E7EB] font-mono text-sm focus:outline-none focus:border-[#00FFD5] focus:shadow-lg focus:shadow-[#00FFD5]/20 transition-all resize-none"
                  rows={5}
                />
              </div>

              <GlowButton className="w-full">
                {submitted ? '✓ Message Transmitted' : 'Send Message'}
              </GlowButton>

              {submitted && (
                <div className="text-[#00FFD5] text-sm font-mono">
                  {'> '} Message transmitted successfully. Thank you for connecting!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-[#B0B4C8] font-mono text-sm">
            <span className="text-[#00FFD5]">{'>'}</span> Thank you for exploring Jenish Lab
          </p>
          <p className="text-[#B0B4C8] font-mono text-xs mt-2">
            Built with Next.js • React • TailwindCSS • TypeScript
          </p>
        </div>
      </div>
    </section>
  );
}
