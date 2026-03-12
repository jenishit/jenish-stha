# Jenish Shrestha — Portfolio

A cinematic, immersive portfolio built with Next.js 14, Three.js, Framer Motion, and Zustand.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Hero — cinematic entrance + 3D globe
│   ├── about/              # Timeline + skills sensor dashboard
│   ├── projects/           # Filterable 3D tilt cards
│   ├── achievements/       # Wall of fame + periodic tech table
│   ├── research/           # Ongoing work with live badges
│   ├── workshop/           # 🤖 Robot builder — scroll to assemble!
│   ├── gallery/            # Masonry lightbox grid
│   ├── blog/               # MDX-powered articles
│   └── contact/            # Terminal-style contact form
├── components/
│   ├── three/              # Three.js scenes (Globe, Particles)
│   ├── sections/           # Page section components
│   ├── ui/                 # Custom cursor, scramble text, badges
│   └── layout/             # Navbar, Footer
├── store/                  # Zustand state stores
├── data/                   # Projects, skills, blog data
└── lib/                    # Utils, motion variants
```

---

## 🖼️ Adding Your Photos

Drop your images into `public/images/`:

```
public/
└── images/
    ├── hero-photo.jpg          ← Your main portrait (for Hero section)
    ├── hero-photo-2.jpg        ← Optional alternate
    ├── projects/
    │   ├── fire-robot.jpg
    │   ├── gesture-car.jpg
    │   ├── pesticide-bot.jpg
    │   ├── env-monitor.jpg
    │   ├── gps-tracker.jpg
    │   ├── pulse-monitor.jpg
    │   ├── air-quality.jpg
    │   ├── jewellery-app.jpg
    │   └── audio-transcription.jpg
    └── gallery/
        ├── setup.jpg
        ├── fire-robot.jpg
        ├── gesture-car.jpg
        ├── sensors.jpg
        ├── esp32-board.jpg
        ├── pesticide-bot.jpg
        ├── oled-display.jpg
        └── coding.jpg
```

---

## ✨ Features

- **Custom Cursor** — Glowing red dot with spring-delayed ring; morphs on hover
- **Cinematic Intro** — Circuit line draw → name scramble → globe rise
- **Scramble Text** — Every heading decodes from random chars on scroll enter
- **Lenis Scroll** — Buttery smooth scroll with inertia
- **Page Transitions** — Red diagonal wipe between routes
- **3D Globe + Robot** — Three.js scene in Hero with project pins on Nepal
- **Workshop (★)** — Scroll-triggered robot assembly with welding sparks
- **Skills Dashboard** — Sensor-style live readings with animated bars
- **Project Cards** — 3D tilt/magnetic hover with glow spotlight
- **Achievements Wall** — Animated plaque drop-in + number counters
- **Periodic Table** — Your tech stack as chemical elements
- **Gallery Lightbox** — Masonry grid with fullscreen viewer
- **Terminal Contact** — Command-line style form with real-time log
- **Ambient Sound** — Toggle server-room hum (bottom-right button)
- **Nepali Easter Egg** — Press `N` then `P` to activate Nepali mode
- **Glass Morphism** — Frosted-glass cards and navbar
- **Noise Texture** — Subtle grain overlay for premium feel

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| Three.js + @react-three/fiber | 3D scenes |
| @react-three/drei | Orbit controls, stars, HTML overlays |
| Framer Motion | Animations, page transitions |
| GSAP | Scroll-triggered animations |
| Lenis | Smooth inertia scrolling |
| Zustand | Global state (nav, filters, sound) |
| Shadcn/ui | Base UI components |
| Tailwind CSS | Utility styling |
| DM Mono + Bebas Neue + Syne | Typography |

---

## 🎨 Color Palette

| Name | Hex |
|---|---|
| Background | `#0D0A09` |
| Surface | `#1A1412` |
| Accent Red | `#C0392B` |
| Accent Brown | `#8B7355` |
| Text Primary | `#F0EDE8` |
| Text Muted | `#6B6560` |

---

## 📝 Adding Blog Posts

Create MDX files in `src/content/blog/`:

```mdx
---
title: "My Post Title"
date: "2024-01-01"
tags: ["Arduino", "Robotics"]
---

# My Post

Content here...
```

Add the post metadata to `src/data/blogs.ts`.

---

## 🌐 Deployment

```bash
# Vercel (recommended)
npx vercel

# Or build static
npm run build
```

---

Built with ❤️ by Jenish Shrestha — Kathmandu, Nepal 🇳🇵
