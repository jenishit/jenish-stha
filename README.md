# 🤖 Jenish Robotics Lab - Portfolio Website

A futuristic, interactive portfolio website showcasing engineer Jenish's robotics projects, skills, and achievements. Built as a digital laboratory experience with a robot assistant guide.

## 📋 Project Overview

**Jenish Robotics Lab** is a Next.js-based portfolio that transforms a traditional CV into an immersive exploration of a digital robotics laboratory. Visitors are guided by J-Bot, an AI assistant, through different "rooms" of the lab representing various aspects of Jenish's work.

### Key Features

- ✅ **Terminal Boot Sequence** - Cinematic boot animation on page load
- ✅ **J-Bot Assistant** - Friendly robot character with cursor tracking
- ✅ **Lab Console** - Developer-style command palette (Ctrl+K)
- ✅ **Skills Dashboard** - Glowing animated skill cards with proficiency bars
- ✅ **Projects Lab** - Interactive project cards with hover effects
- ✅ **Research Section** - Thesis on audio transcription and ML
- ✅ **Achievements Grid** - Futuristic badges for accomplishments
- ✅ **Contact Terminal** - Terminal-style contact form
- ✅ **Smooth Scrolling** - Section-based navigation
- ✅ **Responsive Design** - Mobile-friendly layouts
- ✅ **Neon Aesthetic** - Cyan & purple color scheme (#00FFD5, #7C3AED)

## 🏗️ Project Structure (Next.js App Router)

```
jenish-robotics-lab/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout with metadata
│   │   ├── page.tsx            ← Home page (main entry)
│   │   
│   ├── components/
│   │   ├── hero/
│   │   │   ├── BootSequence.tsx
│   │   │   ├── HeroRobot.tsx
│   │   │   └── HeroButtons.tsx
│   │   │
│   │   ├── robot/
│   │   │   ├── RobotAssistant.tsx
│   │   │   └── RobotMessages.ts
│   │   │
│   │   ├── console/
│   │   │   └── LabConsole.tsx     (Ctrl+K command palette)
│   │   │
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsDashboard.tsx
│   │   │   ├── ProjectsLab.tsx
│   │   │   ├── ResearchSection.tsx
│   │   │   ├── Achievements.tsx
│   │   │   └── ContactTerminal.tsx
│   │   │
│   │   └── ui/
│   │       ├── GlowButton.tsx
│   │       ├── SkillBar.tsx
│   │       └── ProjectCard.tsx
│   │
│   ├── lib/
│   │   ├── projectsData.ts      (5 robotics projects)
│   │   ├── skillsData.ts        (6 skill categories)
│   │   ├── achievementsData.ts  (6 achievements)
│   │   └── commandProcessor.ts  (console commands)
│   │
│   └── styles/
│       ├── globals.css          (Tailwind base + custom)
│       └── animations.css       (Keyframe animations)
│
├── public/               (Static assets)
├── next.config.js       (Next.js configuration)
├── tsconfig.json        (TypeScript config with @ alias)
├── tailwind.config.js   (Tailwind with custom theme)
├── postcss.config.js    (PostCSS with Tailwind)
└── package.json         (Next.js dependencies)
```

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 14** - Latest App Router (not Pages Router)
- **React 18** - UI library
- **TypeScript** - Type safety

### Styling & Animation
- **TailwindCSS v4** - Utility-first CSS with custom theme
- **GSAP 3.12** - Advanced animations
- **Framer Motion 11** - Smooth transitions
- **Three.js 0.160** - 3D graphics ready

### 3D Ready
- **Three.js** - 3D model support
- **@react-three/fiber** - React integration for Three.js
- **@react-three/drei** - Useful 3D helpers

## 📦 What Was Built

### 1. **Core Structure (Next.js Latest Convention)**
✅ Project follows the **2024+ Next.js app directory pattern**:
- All code in `src/` folder
- App Router (`src/app/`) instead of Pages Router
- `layout.tsx` for root layout
- `page.tsx` for home page
- Path aliases configured (`@/*` → `src/*`)

### 2. **Home Page (`src/app/page.tsx`)**
- Client component with all major sections
- Sequential import of components
- Fixed background gradient overlay
- Relative z-index stacking for layering

### 3. **Hero Section**
- **BootSequence.tsx**: 6-message terminal animation (600ms intervals)
- **HeroRobot.tsx**: 3D robot placeholder with cursor tracking effect
- **HeroButtons.tsx**: Navigation buttons to scroll to sections

### 4. **Robot Assistant**
- **RobotAssistant.tsx**: Fixed position bubble with J-Bot message
- Appears after 4000ms (boot completes)
- Shows helpful messages
- Online status indicator with pulse animation

### 5. **Lab Console (Ctrl+K)**
Command palette with commands:
- `about` - Engineer bio
- `skills` - Skill dashboard summary
- `projects` - List all 5 projects  
- `research` - Thesis details
- `contact` - Contact information
- `whois jenish` - Identity lookup
- `activate experiment` - Easter egg
- `help` - Command list
- `clear` - Clear terminal

### 6. **5 Robotics Projects**
1. **Fire Fighting Robot** - Flame detection & extinguishing
2. **Gesture Controlled Mecanum Wheel Car** - ESP32 hand gesture control
3. **Line Following Pesticide Spraying Robot** - Agricultural automation
4. **Environmental Monitoring System** - IoT air quality tracking
5. **Health Monitoring System** - Pulse oximetry heart rate monitoring

Each with: title, description, full description, tech stack, working principle, GitHub link placeholder.

### 7. **Skills Dashboard**
6 Categories:
1. Embedded Systems (Arduino, ESP32, IoT)
2. Programming (Python, C++, SQL, Embedded C)
3. AI & Data (ML, Audio Processing)
4. Mechanics & Robotics (CAD, Motor Control)
5. Web & Frontend (React, Next.js, Three.js)
6. Tools & Platforms (Git, Linux, ROS, MATLAB, Docker)

Each with animated progress bars (75-90% proficiency).

### 8. **Research Section**
- Thesis: "Audio Transcription of Customer Support Calls Using ML"
- Problem, Approach, Impact breakdown
- Terminal-style styling

### 9. **Achievements**
6 Badges with categories:
- Quiz Competition Participant
- Art & Literature Interest
- Business & Economics Knowledge
- Sports & General Knowledge
- IOST Entrance Exam
- Multiple Robotics Projects

### 10. **Contact Terminal**
- Terminal-style contact form
- Example `connect jenish` command
- Email, GitHub, LinkedIn display
- Message submission with feedback

### 11. **Styling & Effects**
- Custom TailwindCSS theme: Dark background (#0B0F1A), Neon cyan (#00FFD5), Purple (#7C3AED)
- 15+ CSS keyframe animations
- Glow effects, hover states, smooth scrolling
- Custom scrollbar (cyan)
- Neon text shadows for titles

## ✅ Next.js Convention Compliance

| Requirement | Status | Details |
|-----------|--------|---------|
| `src/` folder structure | ✅ | All code in `src/` directory |
| App Router | ✅ | Using `src/app/` with layout.tsx & page.tsx |
| Path aliases (@/) | ✅ | Configured in tsconfig.json → `./src/*` |
| TypeScript | ✅ | All .tsx & .ts files with strict mode |
| CSS imports | ✅ | Global CSS in layout.tsx |
| Metadata API | ✅ | Export metadata in layout.tsx |
| Client components | ✅ | 'use client' directive where needed |
| ESM modules | ✅ | All files use ES6 imports |
| TailwindCSS v4 | ✅ | Latest Tailwind with @tailwindcss/postcss |
| No CommonJS mixing | ✅ | Pure ESM configuration |

## 🎯 Matches User Requirements

### ✅ Requirements Met:
1. **Futuristic Robotics Lab Theme** - Dark theme, neon colors, terminal styling
2. **Terminal Boot Sequence** - Sequential messages with typing effect
3. **J-Bot Robot Assistant** - Friendly bot with cursor tracking
4. **Lab Console (Ctrl+K)** - Developer command palette with commands
5. **5 Projects Implemented** - Fire fighting, gesture car, pesticide robot, environmental monitoring, health monitoring
6. **Skills Dashboard** - 6 categories with progress bars
7. **Research Section** - ML thesis on audio transcription
8. **Achievements** - 6 badges with categories
9. **Contact Terminal** - Terminal-style contact form
10. **Smooth Scrolling** - Section IDs with navigation
11. **Responsive Grid Layouts** - Mobile-friendly CSS Grid
12. **Neon Aesthetic** - Cyan (#00FFD5) & Purple (#7C3AED) colors
13. **Animations** - Keyframes: glow-pulse, slide-in, float, blink
14. **Data-Driven Design** - All content from typed .ts files

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎮 Features to Try

1. **Press Ctrl+K** - Open lab console
2. **Type `help`** - See all commands
3. **Type `whois jenish`** - Get identity
4. **Type `activate experiment`** - Easter egg mode
5. **Scroll to Projects** - Hover over project cards
6. **Click Skills buttons** - Navigate to sections
7. **Move mouse over robot** - 3D perspective effect
8. **Scroll through sections** - Smooth scroll behavior

## 📊 Configuration Files

### tsconfig.json
```json
{
  "paths": {
    "@/*": ["./src/*"]  // Project alias
  }
}
```

### tailwind.config.js
```javascript
content: [
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
]
```

### next.config.js
- Webpack config for .glb/.gltf 3D models
- Image optimization settings
- CSS handling

## 🎨 Color Scheme

| Hex | Name | Usage |
|-----|------|-------|
| #0B0F1A | Dark Background | Page background |
| #00FFD5 | Neon Cyan | Primary buttons, titles, borders |
| #7C3AED | Purple | Secondary accents, badges |
| #1a1f3a | Deep Blue | Cards, containers |
| #E5E7EB | Light Gray | Body text |

## 📝 Future Enhancements

- [ ] Add 3D robot model using Three.js
- [ ] Implement project modal details
- [ ] Add scroll animations with Intersection Observer
- [ ] Deploy to Vercel
- [ ] Add dark/light theme toggle
- [ ] Integrate actual contact form backend
- [ ] Add particle background animation
- [ ] Implement Three.js 3D scene

## 📄 License

ISC

---

**Built with ❤️ for Jenish's Robotics Portfolio**  
**Framework:** Next.js 14 | **UI:** React 18 | **Styling:** TailwindCSS v4
