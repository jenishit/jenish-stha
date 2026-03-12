// ── Skills ──────────────────────────────────────────────────────────────
export interface Skill {
  symbol: string;
  name: string;
  number: string;
  level: number; // 0–100
  category: "embedded" | "software" | "hardware" | "ml" | "tools";
  status: "ACTIVE" | "RUNNING" | "LEARNING" | "STANDBY";
}

export const skills: Skill[] = [
  { symbol: "Ar", name: "Arduino", number: "01", level: 88, category: "embedded", status: "ACTIVE" },
  { symbol: "Es", name: "ESP32", number: "32", level: 85, category: "embedded", status: "ACTIVE" },
  { symbol: "Py", name: "Python", number: "03", level: 78, category: "software", status: "RUNNING" },
  { symbol: "C#", name: "C Sharp", number: "04", level: 70, category: "software", status: "RUNNING" },
  { symbol: "SQ", name: "SQL", number: "05", level: 72, category: "software", status: "ACTIVE" },
  { symbol: "Th", name: "Three.js", number: "06", level: 65, category: "software", status: "LEARNING" },
  { symbol: "ML", name: "Machine Learning", number: "07", level: 60, category: "ml", status: "LEARNING" },
  { symbol: "I2", name: "I2C", number: "08", level: 82, category: "hardware", status: "ACTIVE" },
  { symbol: "Gp", name: "GPS/NEO-6M", number: "09", level: 75, category: "hardware", status: "ACTIVE" },
  { symbol: "Nx", name: "Next.js", number: "10", level: 62, category: "software", status: "LEARNING" },
  { symbol: "Gi", name: "Git", number: "11", level: 75, category: "tools", status: "RUNNING" },
  { symbol: "St", name: "Stepper Motors", number: "12", level: 80, category: "hardware", status: "ACTIVE" },
];

// ── Achievements ─────────────────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: number;
  type: "academic" | "competition" | "certification" | "project";
  icon: string;
}

export const achievements: Achievement[] = [
  {
    id: "iost-exam",
    title: "IOST Entrance Exam",
    description: "Successfully appeared in the Institute of Science and Technology entrance examination.",
    year: 2024,
    type: "academic",
    icon: "🎓",
  },
  {
    id: "csit-priority",
    title: "B.Sc. CSIT — Tribhuvan University",
    description: "Qualified and filled priority form for B.Sc. CSIT under Tribhuvan University.",
    year: 2024,
    type: "academic",
    icon: "🏛️",
  },
  {
    id: "quiz-champion",
    title: "Quiz Competition Participant",
    description: "Participated in and prepared comprehensive quiz competitions across art, literature, business, politics, and sports.",
    year: 2023,
    type: "competition",
    icon: "🧠",
  },
  {
    id: "robotics-build",
    title: "9+ Robotics Projects",
    description: "Successfully designed, built, and programmed over 9 functional robotics and IoT systems.",
    year: 2024,
    type: "project",
    icon: "🤖",
  },
  {
    id: "ml-thesis",
    title: "ML Research Thesis",
    description: "Authored thesis on Audio Transcription of Customer Support Calls using Machine Learning Algorithms.",
    year: 2024,
    type: "academic",
    icon: "📄",
  },
];

export const stats = [
  { label: "Projects Built", value: 12, suffix: "+" },
  { label: "Sensors Mastered", value: 15, suffix: "+" },
  { label: "Lines of Code", value: 8500, suffix: "+" },
  { label: "Years Building", value: 3, suffix: "" },
];

// ── Research / Ongoing ────────────────────────────────────────────────────
export interface Research {
  id: string;
  title: string;
  description: string;
  status: "live" | "in-progress" | "planned";
  tags: string[];
  progress: number;
  startYear: number;
}

export const research: Research[] = [
  {
    id: "audio-transcription-research",
    title: "Audio Transcription ML — Thesis",
    description: "Developing and comparing machine learning models for automatic speech recognition on Nepali customer support calls. Evaluating WER across GMM-HMM and deep learning architectures.",
    status: "in-progress",
    tags: ["Python", "TensorFlow", "MFCC", "NLP", "Speech"],
    progress: 75,
    startYear: 2024,
  },
  {
    id: "advanced-gesture-car",
    title: "Advanced Gesture-Controlled Vehicle",
    description: "Extending the ESP32 gesture car with computer vision — adding camera-based gesture recognition to replace IMU-only control. Exploring TensorFlow Lite on ESP32-S3.",
    status: "in-progress",
    tags: ["ESP32-S3", "TF Lite", "OpenCV", "Camera", "ESP-NOW"],
    progress: 30,
    startYear: 2024,
  },
  {
    id: "smart-farm",
    title: "Autonomous Smart Farm System",
    description: "Combining the pesticide sprayer bot with the environmental monitoring station. Creating a fully autonomous farm monitoring + treatment system with LoRa long-range communication.",
    status: "planned",
    tags: ["LoRa", "ESP32", "Sensors", "Automation", "IoT"],
    progress: 10,
    startYear: 2025,
  },
  {
    id: "nequino",
    title: "Nepali Sign Language Recognition",
    description: "Exploring computer vision-based recognition of Nepali sign language gestures using MediaPipe + custom ML models. Aimed at accessibility tools.",
    status: "planned",
    tags: ["MediaPipe", "Python", "CV", "Accessibility", "ML"],
    progress: 5,
    startYear: 2025,
  },
];
