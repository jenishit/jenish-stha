export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

export const achievementsData: Achievement[] = [
  {
    id: 'quiz-competition-1',
    title: 'Quiz Competition Participant',
    description: 'Participated in technical quiz competitions showcasing knowledge in engineering and robotics',
    category: 'Competition',
    date: '2023-2024',
  },
  {
    id: 'art-interest',
    title: 'Arts & Literature Interest',
    description: 'Active participant in art, literature, and cultural appreciation activities',
    category: 'Interest',
    date: 'Ongoing',
  },
  {
    id: 'business-knowledge',
    title: 'Business & Economics Knowledge',
    description: 'Knowledge in business concepts, economics, and entrepreneurship',
    category: 'Knowledge',
    date: 'Ongoing',
  },
  {
    id: 'sports-knowledge',
    title: 'Sports & General Knowledge',
    description: 'Keen interest in sports, current affairs, and general knowledge domains',
    category: 'Interest',
    date: 'Ongoing',
  },
  {
    id: 'iost-exam',
    title: 'IOST Entrance Exam',
    description:
      'Participated in the IOST entrance examination for BSc CSIT under Tribhuvan University',
    category: 'Academic',
    date: '2023',
  },
  {
    id: 'robotics-projects',
    title: 'Multiple Robotics Projects',
    description:
      'Successfully designed and implemented 5+ advanced robotics and embedded systems projects',
    category: 'Project',
    date: '2022-2024',
  },
];
