"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const galleryItems = [
  { id: 1, src: "/images/gallery/setup.jpg", title: "Workshop Setup", category: "workspace", tall: true },
  { id: 2, src: "/images/gallery/fire-robot.jpg", title: "Fire-Fighting Robot", category: "robotics", tall: false },
  { id: 3, src: "/images/gallery/gesture-car.jpg", title: "Gesture Car Build", category: "robotics", tall: false },
  { id: 4, src: "/images/gallery/sensors.jpg", title: "Sensor Collection", category: "hardware", tall: true },
  { id: 5, src: "/images/gallery/esp32-board.jpg", title: "ESP32 Circuit", category: "hardware", tall: false },
  { id: 6, src: "/images/gallery/pesticide-bot.jpg", title: "Pesticide Sprayer Bot", category: "robotics", tall: false },
  { id: 7, src: "/images/gallery/oled-display.jpg", title: "OLED Dashboard", category: "hardware", tall: true },
  { id: 8, src: "/images/gallery/coding.jpg", title: "Deep in Code", category: "workspace", tall: false },
];

const categories = ["all", "robotics", "hardware", "workspace"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === "all" ? galleryItems : galleryItems.filter(g => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-background circuit-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="// gallery.raw"
          title="THE LAB"
          subtitle="Builds, setups, and moments from the workshop."
        />

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-hover
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-all duration-300 ${
                activeCategory === cat
                  ? "border-accent-red bg-accent-red/10 text-accent-red"
                  : "border-border text-text-muted hover:border-accent-brown"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setLightbox(item)}
                data-hover
                className={`relative overflow-hidden cursor-pointer group break-inside-avoid mb-3 ${item.tall ? "row-span-2" : ""}`}
              >
                <div className={`bg-surface-2 border border-border ${item.tall ? "aspect-[2/3]" : "aspect-square"}`}>
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      if (el.parentElement) {
                        el.parentElement.innerHTML = `
                          <div class="w-full h-full flex flex-col items-center justify-center gap-2 bg-surface-2">
                            <span class="text-3xl">${{ robotics: "🤖", hardware: "⚙️", workspace: "🖥️" }[item.category] || "📸"}</span>
                            <span class="font-mono text-[9px] text-text-muted">${item.title}</span>
                          </div>
                        `;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-mono text-xs text-text-primary">{item.title}</p>
                    <p className="font-mono text-[9px] text-accent-red uppercase">{item.category}</p>
                  </div>
                  {/* Border glow on hover */}
                  <div className="absolute inset-0 border border-accent-red/0 group-hover:border-accent-red/40 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full glass-strong border border-accent-red/30 overflow-hidden"
              >
                <div className="aspect-video bg-surface-2">
                  <img src={lightbox.src} alt={lightbox.title} className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                    }}
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl text-text-primary tracking-wide">{lightbox.title}</h3>
                    <p className="font-mono text-[10px] text-accent-red uppercase">{lightbox.category}</p>
                  </div>
                  <button onClick={() => setLightbox(null)} data-hover className="font-mono text-text-muted hover:text-accent-red transition-colors">
                    [CLOSE]
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
