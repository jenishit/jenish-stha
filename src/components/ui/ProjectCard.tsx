'use client';

import { useState } from 'react';
import { Project } from '@/lib/projectsData';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-royal-deep/40 to-royal-navy/40 border-2 border-luxury-gold/30 rounded-lg p-6 cursor-pointer transition-all duration-400 hover:shadow-glow-gold luxury-hover"
    >
      {/* Border glow */}
      {isHovered && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-luxury-gold/10 to-royal-purple/10 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-serif font-bold text-luxury-gold mb-2">{project.title}</h3>
        <p className="text-sm text-soft-silver mb-4">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-luxury-gold/10 border border-luxury-gold/40 text-luxury-gold rounded font-display"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs px-2 py-1 text-luxury-gold font-display">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>

        {/* CTA */}
        {isHovered && (
          <button className="text-luxury-gold font-display text-sm hover:text-accent-gold transition-colors">
            View Details →
          </button>
        )}
      </div>
    </div>
  );
}
