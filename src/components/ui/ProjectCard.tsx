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
      className="group relative bg-[#1a1f3a] border-2 border-[#00FFD5] rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,213,0.4)]"
    >
      {/* Border glow */}
      {isHovered && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00FFD5] to-[#7C3AED] opacity-10 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-[#00FFD5] mb-2">{project.title}</h3>
        <p className="text-sm text-[#E5E7EB] mb-4">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-[#0B0F1A] border border-[#7C3AED] text-[#7C3AED] rounded"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs px-2 py-1 text-[#00FFD5]">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>

        {/* CTA */}
        {isHovered && (
          <button className="text-[#00FFD5] font-mono text-sm hover:text-[#7C3AED] transition-colors">
            View Details →
          </button>
        )}
      </div>
    </div>
  );
}
