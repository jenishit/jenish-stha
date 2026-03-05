export type CommandType =
  | 'about'
  | 'skills'
  | 'projects'
  | 'research'
  | 'contact'
  | 'whois'
  | 'activate'
  | 'help'
  | 'unknown';

export interface CommandOutput {
  type: CommandType;
  output: string[];
}

export const processCommand = (input: string): CommandOutput => {
  const cmd = input.toLowerCase().trim();

  if (cmd === 'about') {
    return {
      type: 'about',
      output: [
        'JENISH LAB PROFILE',
        '==================',
        'Jenish is an enthusiastic engineering student passionate about robotics,',
        'embedded systems, machine learning, and building real-world intelligent systems.',
        '',
        'He enjoys combining hardware and software to create practical solutions',
        'using sensors, microcontrollers, and modern programming techniques.',
        '',
        'Experience: Robotics systems, IoT devices, environmental monitoring,',
        'machine learning projects, and embedded systems design.',
      ],
    };
  }

  if (cmd === 'skills') {
    return {
      type: 'skills',
      output: [
        'SKILL DASHBOARD',
        '================',
        'Embedded Systems: Arduino, ESP32, Sensor Integration, IoT',
        'Programming: Python, C++, SQL, Embedded C',
        'AI & Data: Machine Learning, Audio Processing, Data Engineering',
        'Mechanics: Robot Design, CAD, Motor Control',
        'Frontend: React, Next.js, TailwindCSS, Three.js',
        'Tools: Git, Linux, ROS, MATLAB',
        '',
        '[Scroll to view full dashboard with progress bars]',
      ],
    };
  }

  if (cmd === 'projects') {
    return {
      type: 'projects',
      output: [
        'PROJECTS LAB',
        '=============',
        '1. Fire Fighting Robot - Flame detection & extinguishing system',
        '2. Gesture Controlled Mecanum Wheel Car - Hand gesture control via ESP32',
        '3. Line Following Pesticide Spraying Robot - Agricultural automation',
        '4. Environmental Monitoring System - IoT air quality & weather monitoring',
        '5. Health Monitoring System - Heart rate & blood oxygen measurement',
        '',
        '[Use "project <number>" for details or scroll to Projects Lab section]',
      ],
    };
  }

  if (cmd === 'research') {
    return {
      type: 'research',
      output: [
        'RESEARCH & ACADEMIC WORK',
        '==========================',
        'Thesis: Audio Transcription of Customer Support Calls',
        'Using Machine Learning Algorithms',
        '',
        'Problem: Manual analysis of customer support calls is time-consuming.',
        'Approach: Implementing automatic speech-to-text with ML algorithms.',
        'Impact: Enables efficient analysis of customer support quality and patterns.',
        '',
        '[Scroll to Research Section for detailed information]',
      ],
    };
  }

  if (cmd === 'contact') {
    return {
      type: 'contact',
      output: [
        'CONTACT INFORMATION',
        '====================',
        'Email: jenish@example.com',
        'GitHub: github.com/jenish',
        'LinkedIn: linkedin.com/in/jenish',
        '',
        '[Use "connect jenish" to send a message]',
      ],
    };
  }

  if (cmd === 'whois jenish') {
    return {
      type: 'whois',
      output: [
        'IDENTITY_LOOKUP: jenish',
        '=======================',
        '> Engineer',
        '> Robotics Builder',
        '> Embedded Systems Developer',
        '> Machine Learning Enthusiast',
        '> Problem Solver',
        '> Innovator',
      ],
    };
  }

  if (cmd === 'activate experiment') {
    return {
      type: 'activate',
      output: [
        '⚙️ EXPERIMENT MODE ACTIVATED',
        '=============================',
        'Running project simulations...',
        'Initializing robots...',
        '[Project cards will animate]',
        '[J-Bot will enter experiment mode]',
        '[Enhanced visual effects enabled]',
      ],
    };
  }

  if (cmd === 'help') {
    return {
      type: 'help',
      output: [
        'JENISH LAB CONSOLE v1.0',
        '=======================',
        'Available commands:',
        '  about             - Learn about Jenish',
        '  skills            - View skill dashboard',
        '  projects          - List all projects',
        '  research          - View research work',
        '  contact           - Get contact information',
        '  whois jenish      - Get identity summary',
        '  activate experiment - Enable experiment mode',
        '  help              - Show this help message',
        '  clear             - Clear terminal',
        '',
        'Press Ctrl+K to toggle this console.',
      ],
    };
  }

  if (cmd === 'clear') {
    return {
      type: 'unknown',
      output: [],
    };
  }

  return {
    type: 'unknown',
    output: [
      `Command not recognized: "${input}"`,
      'Type "help" for available commands.',
    ],
  };
};
