"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname + "-in"}
        initial={{ scaleX: 1, transformOrigin: "left" }}
        animate={{ scaleX: 0, transformOrigin: "right", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }}
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(135deg, #C0392B 0%, #8B7355 50%, #0D0A09 100%)",
          zIndex: 10000,
          pointerEvents: "none",
        }}
      />
    </AnimatePresence>
  );
}
