"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { scrambleText } from "@/lib/utils";
import Image from "next/image";

const RobotGlobe = dynamic(() => import("@/components/three/RobotGlobe"), { ssr: false });
const BackgroundScene = dynamic(() => import("@/components/three/BackgroundScene"), { ssr: false });

const floatingTags = [
  "ESP32", "Arduino", "Three.js", "Python", "Robotics",
  "IoT", "ML", "NEO-6M", "MPU6050", "EEPROM", "OLED",
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [nameText, setNameText] = useState("####### ########");
  const [titleText, setTitleText] = useState("##################");

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Cinematic intro sequence
    const t1 = setTimeout(() => setIntroComplete(true), 2200);
    const t2 = setTimeout(() => {
      setShowContent(true);
      scrambleText("JENISH SHRESTHA", setNameText, 1200);
    }, 2600);
    const t3 = setTimeout(() => {
      scrambleText("ENGINEER & INVENTOR", setTitleText, 1000);
    }, 3000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden circuit-bg">
      {/* Background particles */}
      <div className="absolute inset-0 z-0">
        <BackgroundScene />
      </div>

      {/* Cinematic intro overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: introComplete ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: introComplete ? "none" : "all" }}
        className="fixed inset-0 z-50 bg-background flex items-center justify-center"
      >
        <div className="text-center">
          {/* Circuit line draw animation */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <motion.path
              d="M 0 450 L 300 450 L 350 400 L 700 400 L 750 450 L 1440 450"
              stroke="#C0392B"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 720 0 L 720 350 L 720 550 L 720 900"
              stroke="rgba(192,57,43,0.3)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="relative z-10"
          >
            <p className="font-mono text-accent-red text-xs tracking-[0.5em] mb-3">INITIALIZING PORTFOLIO</p>
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-accent-red to-transparent mx-auto" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main hero content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

            {/* LEFT — Photo + floating tags */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={showContent ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex justify-center lg:justify-start"
            >
              {/* Photo frame */}
              <div className="relative">
                {/* Glowing border frame */}
                <div className="absolute -inset-3 border border-accent-red/30 rounded-sm" />
                <div className="absolute -inset-6 border border-accent-brown/15 rounded-sm" />

                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-accent-red" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-accent-red" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-accent-red" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-accent-red" />

                {/* The photo */}
                <div className="relative w-72 h-96 md:w-80 md:h-[420px] overflow-hidden bg-surface">
                  <Image
                    src="/images/hero-photo.png"
                    alt="Jenish Shrestha"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      if (el.parentElement) {
                        el.parentElement.innerHTML = `
                          <div class="w-full h-full bg-surface-2 flex flex-col items-center justify-center gap-4">
                            <div class="w-20 h-20 rounded-full border-2 border-accent-red flex items-center justify-center">
                              <span class="font-display text-4xl text-accent-red">J</span>
                            </div>
                            <p class="font-mono text-xs text-text-muted">Add hero-photo.jpg to public/images/</p>
                          </div>
                        `;
                      }
                    }}
                  />
                  {/* Glitch overlay */}
                  <motion.div
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 3.5, duration: 0.5 }}
                    className="absolute inset-0 bg-accent-red/20 mix-blend-screen"
                  />
                  {/* Scan line */}
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: "200%" }}
                    transition={{ delay: 2.8, duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-70"
                  />
                </div>

                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={showContent ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.4 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 border border-border flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
                  <span className="font-mono text-xs text-text-muted">AVAILABLE FOR WORK</span>
                </motion.div>
              </div>

              {/* Floating tech tags */}
              {floatingTags.map((tag, i) => {
                const angle = (i / floatingTags.length) * 2 * Math.PI;
                const radius = 230 + Math.sin(i * 2.3) * 40;
                const x = Math.cos(angle) * radius;
                const yPos = Math.sin(angle) * radius * 0.6;

                return (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={showContent ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.2 + i * 0.08 }}
                    style={{
                      position: "absolute",
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${yPos}px)`,
                      transform: "translate(-50%, -50%)",
                      animation: `float ${4 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
                    }}
                    className="glass px-2.5 py-1 border border-border font-mono text-[10px] text-text-muted whitespace-nowrap pointer-events-none"
                  >
                    {tag}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* RIGHT — Text + 3D Globe */}
            <div className="flex flex-col gap-8">
              {/* Name & title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                <p className="section-tag mb-4">{'// Portfolio v1.0'}</p>
                <h1 className="font-display text-6xl md:text-8xl leading-none tracking-wide text-text-primary">
                  {nameText}
                </h1>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-px w-8 bg-accent-red" />
                  <p className="font-mono text-xs tracking-[0.3em] text-accent-red uppercase">{titleText}</p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.7 }}
                className="font-mono text-sm text-text-muted leading-relaxed max-w-lg"
              >
                Building robots that fight fires, cars that follow gestures, and systems that sense the world.
                Half engineer, half inventor — from Kathmandu, Nepal 🇳🇵
              </motion.p>

              {/* 3D Globe */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={showContent ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.0, duration: 1, ease: "backOut" }}
                className="relative h-64 md:h-80 w-full"
              >
                <RobotGlobe />
                <p className="absolute bottom-2 right-2 font-mono text-[9px] text-text-muted/50">
                  drag to rotate
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/projects"
                  data-hover
                  className="px-6 py-3 bg-accent-red text-white font-mono text-xs tracking-widest uppercase hover:bg-accent-red-bright transition-all duration-300 glow-red"
                >
                  View Projects
                </Link>
                <Link
                  href="/workshop"
                  data-hover
                  className="px-6 py-3 border border-accent-brown text-accent-brown font-mono text-xs tracking-widest uppercase hover:bg-accent-brown/10 transition-all duration-300"
                >
                  Enter Workshop
                </Link>
                <Link
                  href="/contact"
                  data-hover
                  className="px-6 py-3 border border-border text-text-muted font-mono text-xs tracking-widest uppercase hover:border-accent-red hover:text-accent-red transition-all duration-300"
                >
                  Hire Me
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={showContent ? { opacity: 1 } : {}}
                transition={{ delay: 1.8 }}
                className="flex gap-8 border-t border-border pt-6"
              >
                {[
                  { n: "12+", label: "Projects" },
                  { n: "3+", label: "Years" },
                  { n: "15+", label: "Sensors" },
                  { n: "8K+", label: "Lines of Code" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl text-accent-red">{s.n}</p>
                    <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-text-muted tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-accent-red to-transparent"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
