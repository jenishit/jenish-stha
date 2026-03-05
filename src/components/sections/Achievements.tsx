'use client';

import { achievementsData } from '@/lib/achievementsData';

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-[#7C3AED] to-[#00FFD5]" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-[#7C3AED]">{'< '}</span>
              Achievements
              <span className="text-[#7C3AED]">{' >'}</span>
            </h2>
          </div>

          <p className="text-[#B0B4C8] max-w-2xl font-mono text-sm">
            <span className="text-[#7C3AED]"># </span>
            Milestones and recognitions in engineering and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((achievement) => (
            <div
              key={achievement.id}
              className="group relative bg-gradient-to-br from-[#1a1f3a] to-[#0f1425] border border-[#7C3AED]/40 rounded-lg p-6 hover:border-[#00FFD5] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFD5]/20"
            >
              {/* Hover background */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#7C3AED]/5 to-[#00FFD5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                {/* Category badge */}
                <div className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-[#00FFD5] to-[#7C3AED] text-[#0B0F1A] rounded-full text-xs font-bold">
                  {achievement.category}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FFD5] transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-sm text-[#B0B4C8] mb-4 leading-relaxed">
                  {achievement.description}
                </p>

                <div className="text-xs text-[#00FFD5] font-mono flex items-center gap-1">
                  <span>→</span> {achievement.date}
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#00FFD5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
