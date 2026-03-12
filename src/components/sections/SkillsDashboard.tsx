'use client';

import SkillBar from '@/components/ui/SkillBar';
import { skillsData } from '@/lib/skillsData';

export default function SkillsDashboard() {
  return (
    <section id="skills" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-royal-purple to-luxury-gold" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-frost-white">
              Technical Expertise
            </h2>
          </div>

          <p className="text-soft-silver max-w-2xl font-display text-sm tracking-wide">
            Core competencies across robotics, embedded systems, and intelligent systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((skillGroup, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-br from-royal-deep/40 to-royal-navy/40 border border-luxury-gold/20 rounded-lg p-8 transition-all duration-400 hover:border-luxury-gold/60 hover:shadow-glow-gold luxury-hover"
            >
              {/* Hover background */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-luxury-gold/5 to-royal-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-serif font-bold text-luxury-gold mb-6 flex items-center gap-2">
                  <span className="text-royal-mauve">⬥</span> {skillGroup.category}
                </h3>

                <div className="space-y-5">
                  {skillGroup.skills.map((skill, sidx) => (
                    <SkillBar
                      key={sidx}
                      name={skill}
                      proficiency={skillGroup.proficiency}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
