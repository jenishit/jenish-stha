"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import SectionHeading from "@/components/ui/SectionHeading";
import { achievements, stats } from "@/data/skills";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/motion";

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      className="glass border border-border p-6 text-center relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-accent-red/0 group-hover:bg-accent-red/5 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-accent-red transition-all duration-500" />
      <p className="font-display text-5xl md:text-6xl text-accent-red leading-none mb-2">
        {inView ? <CountUp end={value} duration={2.5} separator="," /> : "0"}
        {suffix}
      </p>
      <p className="font-mono text-xs text-text-muted uppercase tracking-widest">{label}</p>
    </motion.div>
  );
}

function AchievementPlaque({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const typeColors: Record<string, string> = {
    academic: "border-blue-500/30 text-blue-400",
    competition: "border-yellow-500/30 text-yellow-400",
    certification: "border-green-500/30 text-green-400",
    project: "border-accent-red/30 text-accent-red",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className="glass border border-border p-6 relative group"
      style={{ perspective: "800px" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 border border-border flex items-center justify-center text-2xl shrink-0 group-hover:border-accent-red transition-colors duration-300">
          {achievement.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display text-lg text-text-primary tracking-wide">{achievement.title}</h3>
            <span className="font-mono text-[10px] text-text-muted">{achievement.year}</span>
          </div>
          <p className="font-mono text-xs text-text-muted leading-relaxed mb-3">{achievement.description}</p>
          <span className={`inline-block border font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider ${typeColors[achievement.type]}`}>
            {achievement.type}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-background circuit-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="// achievements.log"
          title="MILESTONES"
          subtitle="Every project built, exam passed, and competition entered."
        />

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>

        {/* Mission log header */}
        <div className="glass border border-border p-4 mb-6 font-mono text-xs">
          <div className="flex items-center gap-3 text-text-muted mb-2">
            <span className="text-accent-red">SYSTEM</span>
            <span>——</span>
            <span>ACHIEVEMENT LOG INITIALIZED</span>
          </div>
          <div className="flex items-center gap-3 text-text-muted">
            <span className="text-accent-red">STATUS</span>
            <span>——</span>
            <span className="text-green-400">● ALL SYSTEMS NOMINAL</span>
          </div>
        </div>

        {/* Achievement wall */}
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((a, i) => (
            <AchievementPlaque key={a.id} achievement={a} index={i} />
          ))}
        </div>

        {/* Periodic tech table */}
        <div className="mt-24">
          <SectionHeading tag="// tech_stack.periodic" title="ELEMENTS" align="center" />
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {[
              { sym: "Ar", name: "Arduino", num: "01" },
              { sym: "Es", name: "ESP32", num: "32" },
              { sym: "Py", name: "Python", num: "03" },
              { sym: "C#", name: "C Sharp", num: "04" },
              { sym: "SQ", name: "SQL", num: "05" },
              { sym: "Th", name: "Three.js", num: "06" },
              { sym: "ML", name: "ML/AI", num: "07" },
              { sym: "I²C", name: "I2C Bus", num: "08" },
              { sym: "Gp", name: "GPS", num: "09" },
              { sym: "Nx", name: "Next.js", num: "10" },
              { sym: "Gi", name: "Git", num: "11" },
              { sym: "St", name: "Stepper", num: "12" },
              { sym: "Bm", name: "BMP280", num: "13" },
              { sym: "Mq", name: "MQ135", num: "14" },
              { sym: "Ox", name: "MAX30100", num: "15" },
              { sym: "Dt", name: "DHT11", num: "16" },
            ].map((el) => (
              <motion.div
                key={el.sym}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.08 }}
                className="element-card"
              >
                <p className="font-mono text-[8px] text-text-muted">{el.num}</p>
                <p className="font-display text-lg text-accent-red leading-none my-1">{el.sym}</p>
                <p className="font-mono text-[8px] text-text-muted truncate">{el.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
