'use client';

import { achievementsData } from '@/lib/achievementsData';

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-royal-purple to-luxury-gold" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-frost-white">
              Achievements & Recognition
            </h2>
          </div>

          <p className="text-soft-silver max-w-2xl font-display text-sm tracking-wide">
            Milestones and recognitions in engineering and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((achievement) => (
            <div
              key={achievement.id}
              className="group relative bg-gradient-to-br from-royal-deep/40 to-royal-navy/40 border border-luxury-gold/20 rounded-lg p-6 hover:border-luxury-gold/60 transition-all duration-400 hover:shadow-glow-gold luxury-hover"
            >
              {/* Hover background */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-luxury-gold/5 to-royal-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Content */}
              <div className="relative z-10">
                {/* Category badge */}
                <div className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-luxury-gold to-accent-gold text-royal-dark rounded-full text-xs font-bold">
                  {achievement.category}
                </div>

                <h3 className="text-lg font-serif font-bold text-frost-white mb-2 group-hover:text-luxury-gold transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-sm text-soft-silver mb-4 leading-relaxed">
                  {achievement.description}
                </p>

                <div className="text-xs text-luxury-gold font-display flex items-center gap-1">
                  <span>→</span> {achievement.date}
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-royal-purple to-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-b-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
