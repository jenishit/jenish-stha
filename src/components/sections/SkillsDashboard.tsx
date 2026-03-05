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
            <div className="h-1 w-12 bg-gradient-to-r from-[#7C3AED] to-[#00FFD5]" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-[#7C3AED]">{'< '}</span>
              Skills Dashboard
              <span className="text-[#7C3AED]">{' >'}</span>
            </h2>
          </div>

          <p className="text-[#B0B4C8] max-w-2xl font-mono text-sm">
            <span className="text-[#7C3AED]"># </span>
            Core competencies across robotics, embedded systems, and intelligent systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((skillGroup, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-br from-[#1a1f3a] to-[#0f1425] border border-[#7C3AED]/40 rounded-lg p-8 transition-all duration-300 hover:border-[#7C3AED] hover:shadow-lg hover:shadow-[#7C3AED]/20"
            >
              {/* Hover background */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#7C3AED]/5 to-[#00FFD5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#7C3AED] mb-6 flex items-center gap-2">
                  <span className="text-[#00FFD5]">{'→'}</span> {skillGroup.category}
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
