"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrambleText from "@/components/ui/ScrambleText";
import { skills } from "@/data/skills";
import { fadeUp, staggerContainer } from "@/lib/motion";

const timeline = [
  { year: "2021", event: "First Arduino Project", desc: "Built my first LED blink circuit. Got hooked immediately.", icon: "⚡" },
  { year: "2022", event: "First Robot", desc: "Built a line-following robot. Fell in love with autonomous systems.", icon: "🤖" },
  { year: "2023", event: "IoT & Sensors", desc: "Expanded into GPS, gas sensors, pulse monitoring, and environmental systems.", icon: "📡" },
  { year: "2023", event: "Software Side", desc: "Built Jewellery Management System in .NET. Explored SQL injection and databases.", icon: "💻" },
  { year: "2024", event: "ESP32 & Advanced Robotics", desc: "Gesture-controlled mecanum car with ESP-NOW. Advanced wireless robotics.", icon: "🎮" },
  { year: "2024", event: "ML Research", desc: "Started thesis on Audio Transcription using ML. Entered Tribhuvan University (CSIT).", icon: "🧠" },
];

const statusColor: Record<string, string> = {
  ACTIVE: "text-green-400",
  RUNNING: "text-blue-400",
  LEARNING: "text-yellow-400",
  STANDBY: "text-gray-400",
};

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="glass border border-border p-3 font-mono text-xs"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-accent-red font-bold">[{skill.symbol}]</span>
          <span className="text-text-primary">{skill.name}</span>
        </div>
        <span className={`text-[10px] ${statusColor[skill.status]}`}>
          ● {skill.status}
        </span>
      </div>
      <div className="sensor-bar mb-1">
        <motion.div
          className="sensor-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.06 + 0.3, duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-text-muted">
        <span>SIGNAL: {skill.level}%</span>
        <span>#{skill.number}</span>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background circuit-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="// about.sys"
          title="WHO AM I"
          subtitle="Half engineer, half inventor — with a quiz-lover brain and a builder's hands."
        />

        <div className="grid lg:grid-cols-2 gap-20 mb-24">
          {/* Bio */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="font-mono text-sm text-text-muted leading-relaxed mb-6">
              I'm <span className="text-text-primary">Jenish Shrestha</span>, a builder from Kathmandu, Nepal.
              I started with a blinking LED and haven't stopped since.
            </motion.p>
            <motion.p variants={fadeUp} className="font-mono text-sm text-text-muted leading-relaxed mb-6">
              My projects span the full stack of a physical product — from soldering sensors
              and writing firmware, to building software that makes sense of the data.
              I love the moment when code meets hardware and something real happens.
            </motion.p>
            <motion.p variants={fadeUp} className="font-mono text-sm text-text-muted leading-relaxed mb-8">
              Currently pursuing <span className="text-accent-red">B.Sc. CSIT at Tribhuvan University</span> and
              working on my thesis about ML-powered audio transcription.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {[
                ["Location", "Kathmandu, Nepal 🇳🇵"],
                ["Degree", "B.Sc. CSIT (TU)"],
                ["Interests", "Robotics, IoT, ML"],
                ["Hobbies", "Cricket 🏏, Quizzes 🧠"],
              ].map(([label, val]) => (
                <div key={label} className="border-l-2 border-accent-red pl-3">
                  <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{label}</p>
                  <p className="font-mono text-xs text-text-primary mt-0.5">{val}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Skills dashboard */}
          <div>
            <p className="section-tag mb-6">{'// skill_monitor.exe — LIVE READINGS'}</p>
            <div className="grid grid-cols-1 gap-2">
              {skills.map((skill, i) => (
                <SkillCard key={skill.symbol} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <SectionHeading tag="// history.log" title="MY JOURNEY" align="left" />
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-red via-accent-brown to-transparent" />
            <div className="space-y-8 pl-16">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative glass border border-border p-5"
                >
                  <div className="absolute -left-[42px] top-5 w-6 h-6 border border-accent-red bg-background flex items-center justify-center text-sm">
                    {item.icon}
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-accent-red">{item.year}</span>
                    <span className="font-mono text-[10px] text-text-muted">—</span>
                    <ScrambleText text={item.event} className="font-display text-lg text-text-primary tracking-wide" delay={i * 100} />
                  </div>
                  <p className="font-mono text-xs text-text-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
