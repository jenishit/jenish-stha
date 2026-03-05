export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  workingPrinciple: string;
  github?: string;
  image?: string;
}

export const projectsData: Project[] = [
  {
    id: 'fire-fighting-robot',
    title: 'Fire Fighting Robot',
    description: 'Detects flames and extinguishes them automatically',
    fullDescription:
      'An autonomous robot equipped with flame sensors and a relay-controlled water pump system. Detects flames using IR sensors and immediately activates the pump to extinguish fires.',
    tech: ['Arduino', 'Flame Sensors', 'Relay', 'Pump', 'Servo Motors'],
    workingPrinciple:
      'The robot uses IR sensors to detect flame radiation. When a flame is detected, a signal is sent to the relay module which activates the water pump. Multiple sensors allow the robot to locate the fire source.',
    github: '#',
    image: '/images/fire-fighting-robot.jpg',
  },
  {
    id: 'gesture-controlled-car',
    title: 'Gesture Controlled Mecanum Wheel Car',
    description:
      'Robot car controlled using hand gestures with ESP32 and MPU6050 motion sensor',
    fullDescription:
      'An advanced mecanum-wheeled robot controlled via hand gestures. Uses an ESP32 transmitter with MPU6050 accelerometer to detect hand movements and communicate via ESP-NOW protocol.',
    tech: ['ESP32', 'MPU6050', 'Mecanum Wheels', 'ESP-NOW', 'Servo Motors'],
    workingPrinciple:
      'Hand movements are captured by the MPU6050 sensor. The ESP32 processes the accelerometer data and transmits control signals wirelessly using the ESP-NOW protocol to the robot. The mecanum wheels allow omnidirectional movement.',
    github: '#',
    image: '/images/gesture-car.jpg',
  },
  {
    id: 'line-following-robot',
    title: 'Line Following Pesticide Spraying Robot',
    description:
      'Agricultural robot that follows a line path using IR sensors and sprays pesticide automatically',
    fullDescription:
      'An autonomous agricultural robot designed for precision pesticide application. Follows predefined paths using IR sensors and applies pesticide through a relay-controlled pump system.',
    tech: ['Arduino', 'IR Sensors', 'Relay Module', 'DC Motors', 'Pump'],
    workingPrinciple:
      'The robot uses IR sensors to detect a black line on the ground. Advanced PID control algorithms adjust motor speeds to keep the robot centered on the line. The pump is triggered at programmed intervals to spray pesticide.',
    github: '#',
    image: '/images/line-following-robot.jpg',
  },
  {
    id: 'environmental-monitoring',
    title: 'Environmental Monitoring System',
    description:
      'IoT system using ESP32 with MQ gas sensors, BMP280 pressure sensor, and GPS',
    fullDescription:
      'A comprehensive environmental monitoring system that collects air quality, weather, and location data. Integrates multiple sensors with ESP32 microcontroller for real-time data collection and transmission.',
    tech: [
      'ESP32',
      'MQ Gas Sensors',
      'BMP280',
      'GPS Module',
      'WiFi IoT',
      'Cloud Integration',
    ],
    workingPrinciple:
      'MQ sensors measure various gas concentrations including CO, CO2, and other pollutants. BMP280 measures temperature and atmospheric pressure. GPS provides location data. All data is transmitted to a cloud server for analysis and visualization.',
    github: '#',
    image: '/images/environmental-monitoring.jpg',
  },
  {
    id: 'health-monitoring',
    title: 'Health Monitoring System',
    description:
      'System using MAX30100 pulse oximeter sensor to measure heart rate and blood oxygen',
    fullDescription:
      'A wearable health monitoring device that continuously measures vital signs. Uses the MAX30100 sensor for non-invasive pulse oximetry and heart rate detection.',
    tech: ['Arduino', 'MAX30100 Sensor', 'Display Module', 'Wireless Transmission'],
    workingPrinciple:
      'The MAX30100 uses infrared LEDs to detect blood oxygen levels and heart rate through optical absorption. Data is processed by the Arduino and displayed on a connected screen. Can transmit data to a mobile app for real-time monitoring.',
    github: '#',
    image: '/images/health-monitoring.jpg',
  },
];
