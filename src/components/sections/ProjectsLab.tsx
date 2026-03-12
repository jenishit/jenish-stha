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
            <div className="h-1 w-12 bg-gradient-to-r from-luxury-gold to-royal-purple" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-frost-white">
              Featured Work
            </h2>
          </div>

          <p className="text-soft-silver max-w-2xl font-display text-sm tracking-wide">
            A collection of robotics and intelligent systems projects that showcase engineering excellence
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
        <div className="mt-20 p-8 border border-luxury-gold/30 rounded-lg bg-gradient-to-r from-royal-deep/50 to-royal-navy/50 text-center">
          <p className="text-soft-silver font-display text-sm mb-4">
            <span className="text-luxury-gold">✦</span> Each project demonstrates integration of advanced engineering,
            intelligent systems, and elegant design
          </p>
          <p className="text-luxury-gold font-display text-xs tracking-wider">
            {'> '} Explore detailed implementations and GitHub repositories
          </p>
        </div>
      </div>
    </section>
  );
}
