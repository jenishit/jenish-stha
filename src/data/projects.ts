export type ProjectCategory = "robotics" | "iot" | "software" | "ml";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  year: number;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "fire-robot",
    title: "Fire-Fighting Robot",
    description: "Autonomous robot that detects and extinguishes flames using sensor arrays and a pump relay system.",
    longDescription: "Built with Arduino Uno, this robot uses three flame sensors positioned at different angles to triangulate fire location. A relay-controlled water pump activates when flame is detected within range. The robot navigates toward the source autonomously.",
    category: "robotics",
    tech: ["Arduino Uno", "Flame Sensor", "Relay Module", "L298N Driver", "DC Motors"],
    image: "/images/projects/fire-robot.jpg",
    year: 2023,
    featured: true,
  },
  {
    id: "line-follower-pesticide",
    title: "Pesticide Sprayer Bot",
    description: "Line-following agricultural robot that autonomously sprays pesticide across crop rows.",
    longDescription: "Designed for precision agriculture, this robot follows IR-sensor-detected lines between crop rows. A servo-controlled nozzle and pump dispense pesticide at scheduled intervals. Includes obstacle detection to pause spraying.",
    category: "robotics",
    tech: ["Arduino", "IR Sensors", "Servo Motor", "Pump Relay", "L298N"],
    image: "/images/projects/pesticide-bot.jpg",
    year: 2023,
    featured: true,
  },
  {
    id: "gesture-car",
    title: "Gesture-Controlled Mecanum Car",
    description: "ESP32-powered mecanum wheel vehicle controlled by hand gestures via MPU6050 IMU and ESP-NOW.",
    longDescription: "Two ESP32 boards communicate wirelessly via ESP-NOW protocol. The transmitter ESP32 reads pitch/roll data from an MPU6050 gyroscope worn on the hand. The receiver ESP32 translates gesture angles into omni-directional mecanum wheel commands, enabling holonomic movement in any direction.",
    category: "robotics",
    tech: ["ESP32", "MPU6050", "ESP-NOW", "Mecanum Wheels", "I2C"],
    image: "/images/projects/gesture-car.jpg",
    year: 2024,
    featured: true,
  },
  {
    id: "env-monitor",
    title: "Environmental Monitor",
    description: "Multi-sensor IoT system tracking air quality, temperature, pressure, sound, and gas levels.",
    longDescription: "Comprehensive environmental station using BMP280 for pressure/temperature, MQ-series gas sensors for various pollutants, and a sound sensor for noise levels. Data displayed on OLED screen and optionally transmitted to cloud dashboard.",
    category: "iot",
    tech: ["ESP32", "BMP280", "MQ Sensors", "SSD1305 OLED", "I2C"],
    image: "/images/projects/env-monitor.jpg",
    year: 2023,
    featured: false,
  },
  {
    id: "gps-tracker",
    title: "GPS Asset Tracker",
    description: "Real-time GPS tracking system using NEO-6M module with live coordinate transmission.",
    longDescription: "Tracks location coordinates using NEO-6M GPS module. Coordinates transmitted over serial/wireless interface. Can store waypoints to EEPROM for persistent location history. OLED display shows current coordinates, speed, and satellites locked.",
    category: "iot",
    tech: ["ESP32", "NEO-6M GPS", "EEPROM", "OLED", "Serial"],
    image: "/images/projects/gps-tracker.jpg",
    year: 2023,
    featured: false,
  },
  {
    id: "pulse-monitor",
    title: "Pulse & SpO2 Monitor",
    description: "Wearable health monitor measuring heart rate and blood oxygen saturation with MAX30100.",
    longDescription: "Medical-grade pulse oximetry using MAX30100 sensor. Displays real-time BPM and SpO2 percentage on I2C LCD. Includes alert threshold for abnormal readings. Data logged with timestamps.",
    category: "iot",
    tech: ["Arduino", "MAX30100", "I2C LCD", "EEPROM"],
    image: "/images/projects/pulse-monitor.jpg",
    year: 2024,
    featured: true,
  },
  {
    id: "air-quality",
    title: "Air Quality Station",
    description: "DHT11 + MQ135 + ESP32 system monitoring temperature, humidity, and CO2 equivalent levels.",
    longDescription: "Smart air quality monitoring station with real-time display and WiFi data transmission. Tracks temperature, humidity from DHT11 and air quality index from MQ135. Trend graphs show historical data on OLED display.",
    category: "iot",
    tech: ["ESP32", "DHT11", "MQ135", "WiFi", "OLED"],
    image: "/images/projects/air-quality.jpg",
    year: 2024,
    featured: false,
  },
  {
    id: "jewellery-app",
    title: "Jewellery Management System",
    description: ".NET Windows Forms application for managing jewellery inventory, transactions, and customer records.",
    longDescription: "Full-featured desktop application built with C# and .NET Windows Forms. Manages jewellery inventory with item categorization, weight, purity, and pricing. Transaction module handles sales, purchases, and returns. Customer database with purchase history.",
    category: "software",
    tech: ["C#", ".NET", "Windows Forms", "SQL Server", "ADO.NET"],
    image: "/images/projects/jewellery-app.jpg",
    year: 2023,
    featured: false,
  },
  {
    id: "audio-transcription",
    title: "Audio Transcription ML",
    description: "Thesis project: ML-powered transcription of customer support calls using speech recognition algorithms.",
    longDescription: "Research thesis exploring multiple machine learning algorithms for automatic speech recognition on customer support audio. Compares WER (Word Error Rate) across models including GMM-HMM, deep learning approaches. Dataset preprocessing, feature extraction with MFCC, and model evaluation pipeline.",
    category: "ml",
    tech: ["Python", "TensorFlow", "MFCC", "Speech Recognition", "Scikit-learn"],
    image: "/images/projects/audio-transcription.jpg",
    year: 2024,
    featured: true,
  },
];
