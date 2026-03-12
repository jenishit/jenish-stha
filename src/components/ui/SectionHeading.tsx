"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrambleText from "./ScrambleText";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ tag, title, subtitle, className, align = "left" }: SectionHeadingProps) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={cn("mb-16", align === "center" && "text-center", className)}
    >
      <span className="section-tag block mb-3">{tag}</span>
      <ScrambleText
        text={title}
        as="h2"
        className="font-display text-5xl md:text-7xl text-text-primary leading-none tracking-wide"
        delay={200}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-4 text-text-muted font-mono text-sm max-w-xl"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ transformOrigin: align === "center" ? "center" : "left" }}
        className="mt-6 h-px bg-gradient-to-r from-accent-red via-accent-brown to-transparent w-40"
      />
    </motion.div>
  );
}
