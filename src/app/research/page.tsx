"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import LiveBadge from "@/components/ui/LiveBadge";
import { research } from "@/data/skills";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-background circuit-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="// research.active"
          title="ONGOING WORK"
          subtitle="Active research threads and experimental builds. These aren't finished — they're alive."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {research.map((r, i) => (
            <motion.div
              key={r.id}
              variants={fadeUp}
              className="glass border border-border p-6 relative group overflow-hidden"
            >
              {/* Animated bg gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-red/0 to-accent-brown/0 group-hover:from-accent-red/5 group-hover:to-accent-brown/5 transition-all duration-500" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-mono text-[10px] text-text-muted mb-1">{r.startYear} — PRESENT</p>
                    <h3 className="font-display text-xl text-text-primary tracking-wide leading-tight">{r.title}</h3>
                  </div>
                  <LiveBadge status={r.status} />
                </div>

                <p className="font-mono text-xs text-text-muted leading-relaxed mb-5">{r.description}</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between font-mono text-[10px] text-text-muted mb-2">
                    <span>PROGRESS</span>
                    <span className="text-accent-red">{r.progress}%</span>
                  </div>
                  <div className="sensor-bar h-1.5">
                    <motion.div
                      className="sensor-bar-fill h-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[9px] px-2 py-0.5 bg-surface-2 border border-border text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass border border-accent-red/20 p-6 font-mono text-xs"
        >
          <p className="text-accent-red mb-1">{'// note.md'}</p>
          <p className="text-text-muted">
            These projects are experimental. Some will ship. Some will teach me something and get shelved.
            Either way — the process is the point. If any of these excite you, let's collaborate.
          </p>
          <a href="/contact" className="text-accent-red mt-3 block hover:underline" data-hover>
            &gt; reach out →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
