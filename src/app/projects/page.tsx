"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects, ProjectCategory } from "@/data/projects";
import { useProjectStore } from "@/store/useProjectStore";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Image from "next/image";

const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "🤖 Robotics", value: "robotics" },
  { label: "📡 IoT", value: "iot" },
  { label: "💻 Software", value: "software" },
  { label: "🧠 ML", value: "ml" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotX(-((y - cy) / cy) * 8);
    setRotY(((x - cx) / cx) * 8);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const onMouseLeave = () => { setRotX(0); setRotY(0); };

  const categoryColors: Record<string, string> = {
    robotics: "border-accent-red text-accent-red",
    iot: "border-accent-brown text-accent-brown",
    software: "border-blue-500/50 text-blue-400",
    ml: "border-purple-500/50 text-purple-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-hover
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: "transform 0.15s ease",
      }}
      className="glass border border-border rounded-sm overflow-hidden group relative"
    >
      {/* Glow spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-sm"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(192,57,43,0.12) 0%, transparent 60%)`,
        }}
      />

      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-surface-2">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
            if (el.parentElement) {
              el.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl bg-surface-2">${
                { robotics: "🤖", iot: "📡", software: "💻", ml: "🧠" }[project.category]
              }</div>`;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <div className={`absolute top-3 right-3 border font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider ${categoryColors[project.category]} bg-background/80`}>
          {project.category}
        </div>
        {project.featured && (
          <div className="absolute top-3 left-3 bg-accent-red/90 font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider text-white">
            Featured
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-xl text-text-primary tracking-wide leading-tight">{project.title}</h3>
          <span className="font-mono text-[10px] text-text-muted ml-2 shrink-0">{project.year}</span>
        </div>
        <p className="font-mono text-xs text-text-muted leading-relaxed mb-4">{project.description}</p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="font-mono text-[9px] px-2 py-0.5 bg-surface-2 border border-border text-text-muted rounded-sm">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 border-t border-border pt-3">
          {project.github && (
            <a href={project.github} target="_blank" className="font-mono text-[10px] text-text-muted hover:text-accent-red transition-colors" data-hover>
              GitHub →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" className="font-mono text-[10px] text-accent-red hover:text-accent-red-bright transition-colors" data-hover>
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { activeFilter, setFilter } = useProjectStore();

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background circuit-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="// projects.db"
          title="MY BUILDS"
          subtitle={`${projects.length} projects spanning robotics, IoT, software, and machine learning.`}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              data-hover
              className={`px-4 py-2 font-mono text-xs tracking-wider uppercase border transition-all duration-300 ${
                activeFilter === f.value
                  ? "border-accent-red bg-accent-red/10 text-accent-red"
                  : "border-border text-text-muted hover:border-accent-brown hover:text-text-primary"
              }`}
            >
              {f.label}
              {f.value !== "all" && (
                <span className="ml-2 opacity-50">
                  ({projects.filter(p => p.category === f.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 font-mono text-text-muted">No projects found.</div>
        )}
      </div>
    </div>
  );
}
