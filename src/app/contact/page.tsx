"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

type FormState = "idle" | "typing" | "sending" | "sent";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [activeField, setActiveField] = useState<keyof FormData | null>(null);
  const [log, setLog] = useState<string[]>([
    "// contact.terminal v1.0",
    "// Initializing secure connection...",
    "// Connection established. Ready.",
    "",
  ]);

  const addLog = (line: string) => setLog((prev) => [...prev, line]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setState("typing");
  };

  const handleFocus = (field: keyof FormData) => {
    setActiveField(field);
    addLog(`> input --field="${field}"`);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      addLog("ERROR: Required fields missing.");
      return;
    }
    setState("sending");
    addLog(`> ./send_message --to="jenish.shrestha@email.com"`);
    addLog(`> Encrypting payload...`);

    await new Promise((r) => setTimeout(r, 800));
    addLog(`> Transmitting...`);
    await new Promise((r) => setTimeout(r, 1200));
    addLog(`> ✓ Message delivered successfully.`);
    addLog(`> Response time: ~24 hours.`);
    setState("sent");
  };

  const fields: { key: keyof FormData; label: string; placeholder: string; type?: string; multiline?: boolean }[] = [
    { key: "name", label: "NAME", placeholder: "Your name", type: "text" },
    { key: "email", label: "EMAIL", placeholder: "your@email.com", type: "email" },
    { key: "subject", label: "SUBJECT", placeholder: "What's this about?", type: "text" },
    { key: "message", label: "MESSAGE", placeholder: "Your message here...", multiline: true },
  ];

  return (
    <div className="min-h-screen bg-background circuit-bg pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          tag="// contact.terminal"
          title="REACH OUT"
          subtitle="I'm available for projects, collaborations, and good conversations."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal log */}
          <div className="glass border border-border font-mono text-xs overflow-hidden">
            {/* Terminal header */}
            <div className="border-b border-border px-4 py-2 flex items-center gap-2 bg-surface-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-text-muted text-[10px]">jenish@portfolio ~ contact.sh</span>
            </div>
            {/* Log lines */}
            <div className="p-4 h-64 lg:h-96 overflow-y-auto custom-scroll space-y-1">
              {log.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    line.startsWith("ERROR")
                      ? "text-red-400"
                      : line.startsWith("// ")
                      ? "text-text-muted/60"
                      : line.startsWith("> ✓")
                      ? "text-green-400"
                      : line.startsWith(">")
                      ? "text-accent-red"
                      : "text-text-muted"
                  }
                >
                  {line || "\u00A0"}
                </motion.p>
              ))}
              {state === "typing" && (
                <p className="text-text-muted">
                  <span className="animate-cursor-blink">▌</span>
                </p>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {fields.map(({ key, label, placeholder, type, multiline }) => (
              <div key={key} className="relative">
                <label className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-1 block">
                  <span className="text-accent-red">{">"}</span> {label}
                </label>
                <div className={`relative border transition-all duration-300 ${
                  activeField === key ? "border-accent-red glow-border-red" : "border-border"
                }`}>
                  {multiline ? (
                    <textarea
                      value={formData[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      onFocus={() => handleFocus(key)}
                      onBlur={() => setActiveField(null)}
                      placeholder={placeholder}
                      rows={5}
                      className="w-full bg-transparent font-mono text-xs text-text-primary placeholder-text-muted/40 px-4 py-3 resize-none outline-none"
                      disabled={state === "sending" || state === "sent"}
                    />
                  ) : (
                    <input
                      type={type}
                      value={formData[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      onFocus={() => handleFocus(key)}
                      onBlur={() => setActiveField(null)}
                      placeholder={placeholder}
                      className="w-full bg-transparent font-mono text-xs text-text-primary placeholder-text-muted/40 px-4 py-3 outline-none"
                      disabled={state === "sending" || state === "sent"}
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Submit */}
            <AnimatePresence mode="wait">
              {state !== "sent" ? (
                <motion.button
                  key="submit"
                  onClick={handleSubmit}
                  disabled={state === "sending"}
                  data-hover
                  className="w-full py-3 border border-accent-red text-accent-red font-mono text-xs tracking-widest uppercase hover:bg-accent-red hover:text-white transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
                >
                  {state === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⟳
                      </motion.span>
                      TRANSMITTING...
                    </span>
                  ) : (
                    "> ./send_message.sh"
                  )}
                </motion.button>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full py-3 border border-green-500/50 bg-green-500/10 text-green-400 font-mono text-xs tracking-widest uppercase text-center"
                >
                  ✓ MESSAGE TRANSMITTED
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct links */}
            <div className="pt-4 border-t border-border grid grid-cols-2 gap-3">
              {[
                { label: "GitHub", url: "https://github.com/jenish-shrestha", icon: "⌥" },
                { label: "LinkedIn", url: "https://linkedin.com/in/jenish-shrestha", icon: "◈" },
                { label: "Email", url: "mailto:jenish@email.com", icon: "✉" },
                { label: "Nepal 🇳🇵", url: "#", icon: "📍" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  data-hover
                  className="flex items-center gap-2 glass border border-border px-3 py-2 font-mono text-xs text-text-muted hover:text-accent-red hover:border-accent-red transition-all duration-300"
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
