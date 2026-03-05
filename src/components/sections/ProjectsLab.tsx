'use client';

import ProjectCard from '@/components/ui/ProjectCard';
import { projectsData } from '@/lib/projectsData';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ProjectsLab() {
  return (
    <section id="projects" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-[#00FFD5] to-[#7C3AED]" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-[#00FFD5]">{'[ '}</span>
              Projects Lab
              <span className="text-[#00FFD5]">{' ]'}</span>
            </h2>
          </div>

          <p className="text-[#B0B4C8] max-w-2xl font-mono text-sm">
            <span className="text-[#00FFD5]"># </span>
            A collection of robotics projects blending engineering excellence with innovation
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              delay={idx * 0.1}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        {/* Lab footer note */}
        <div className="mt-20 p-8 border border-[#00FFD5]/30 rounded-lg bg-[#0F1425]/50 text-center">
          <p className="text-[#B0B4C8] font-mono text-sm mb-4">
            <span className="text-[#00FFD5]">$</span> Each project demonstrates integration of hardware,
            software, and intelligent systems
          </p>
          <p className="text-[#00FFD5] font-mono text-xs">
            {'> '} View details on projects above or check GitHub repositories
          </p>
        </div>
      </div>
    </section>
  );
}
