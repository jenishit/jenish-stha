"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/jenishit", icon: "GH" },
  { label: "LinkedIn", href: "https://linkedin.com/in/heyjenish", icon: "Li" },
  { label: "Instagram", href: "https://instagram.com/shades_of_shrestha", icon: "IG" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-2xl text-text-primary tracking-widest">JENISH SHRESTHA</p>
          <p className="font-mono text-xs text-text-muted mt-1">Engineer · Inventor · Builder — Kathmandu, Nepal 🇳🇵</p>
        </div>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              data-hover
              className="w-9 h-9 border border-border font-mono text-xs text-text-muted flex items-center justify-center hover:border-accent-red hover:text-accent-red transition-all duration-300"
            >
              {s.icon}
            </Link>
          ))}
        </div>
        <p className="font-mono text-xs text-text-muted">
          © {new Date().getFullYear()} — Built with Next.js & Three.js
        </p>
      </div>
    </footer>
  );
}
