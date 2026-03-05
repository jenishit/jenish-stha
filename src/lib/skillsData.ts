export interface Skill {
  category: string;
  skills: string[];
  proficiency: number;
}

export const skillsData: Skill[] = [
  {
    category: 'Embedded Systems',
    skills: ['Arduino', 'ESP32', 'Sensor Integration', 'IoT', 'Microcontroller Programming'],
    proficiency: 90,
  },
  {
    category: 'Programming',
    skills: ['Python', 'C++', 'SQL', 'Embedded C', 'JavaScript/TypeScript'],
    proficiency: 85,
  },
  {
    category: 'AI & Data',
    skills: ['Machine Learning', 'Audio Processing', 'Data Engineering', 'TensorFlow'],
    proficiency: 80,
  },
  {
    category: 'Mechanics & Robotics',
    skills: [
      'Robot Design',
      'CAD Modeling',
      'Motor Control',
      'Sensor Integration',
      'Systems Assembly',
    ],
    proficiency: 85,
  },
  {
    category: 'Web & Frontend',
    skills: ['React', 'Next.js', 'TailwindCSS', 'Three.js', 'GSAP'],
    proficiency: 75,
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'Linux', 'ROS', 'MATLAB', 'VS Code', 'Docker'],
    proficiency: 80,
  },
];
