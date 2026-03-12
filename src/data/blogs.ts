export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  coverImage: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-gesture-car-esp32",
    title: "Building a Gesture-Controlled Car with ESP32 & MPU6050",
    excerpt: "How I used two ESP32 boards, ESP-NOW protocol, and a gyroscope to build a car controlled entirely by hand tilts.",
    date: "2024-08-15",
    readTime: 8,
    tags: ["ESP32", "Robotics", "ESP-NOW", "MPU6050"],
    coverImage: "/images/projects/gesture-car.jpg",
    featured: true,
  },
  {
    slug: "fire-fighting-robot-guide",
    title: "Designing an Autonomous Fire-Fighting Robot from Scratch",
    excerpt: "A full walkthrough of how I built a robot that can detect flames using sensor triangulation and extinguish them.",
    date: "2024-06-10",
    readTime: 12,
    tags: ["Arduino", "Robotics", "Flame Sensor", "Relay"],
    coverImage: "/images/projects/fire-robot.jpg",
    featured: true,
  },
  {
    slug: "ml-audio-transcription",
    title: "Audio Transcription of Customer Calls Using ML",
    excerpt: "An overview of my thesis research comparing speech recognition algorithms for Nepali customer support audio.",
    date: "2024-10-01",
    readTime: 15,
    tags: ["Machine Learning", "Python", "Speech Recognition", "Thesis"],
    coverImage: "/images/projects/audio-transcription.jpg",
    featured: true,
  },
  {
    slug: "eeprom-persistent-storage",
    title: "Using EEPROM for Persistent Storage on Arduino & ESP32",
    excerpt: "Why EEPROM matters in embedded projects and how to use it correctly without burning through write cycles.",
    date: "2024-03-22",
    readTime: 6,
    tags: ["Arduino", "ESP32", "EEPROM", "Embedded"],
    coverImage: "/images/projects/env-monitor.jpg",
    featured: false,
  },
];
