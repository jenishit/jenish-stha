'use client';

const domains = [
  {
    id: 1,
    title: 'Robotics Systems',
    description: 'Autonomous robots and intelligent control systems',
    icon: '🤖',
  },
  {
    id: 2,
    title: 'Embedded Engineering',
    description: 'ESP32 • Arduino • Sensors • Microcontrollers',
    icon: '⚙️',
  },
  {
    id: 3,
    title: 'Machine Learning',
    description: 'Real-world AI applications and data analytics',
    icon: '🧠',
  },
  {
    id: 4,
    title: 'IoT Systems',
    description: 'Environmental monitoring and smart automation',
    icon: '🌐',
  },
];

export default function DomainCards() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00FFD5] mb-4">
            Engineering Domains
          </h2>
          <p className="text-[#B0B4C8] max-w-2xl mx-auto">
            Core expertise areas spanning hardware, software, and intelligent systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="group relative bg-gradient-to-br from-[#1a1f3a] to-[#0f1425] border border-[#00FFD5]/20 rounded-lg p-6 transition-all duration-300 hover:border-[#00FFD5]/60 hover:shadow-lg cursor-pointer overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,213,0.3)]"
            >
              {/* Hover glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FFD5]/10 to-[#7C3AED]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-4">{domain.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FFD5] transition-colors">
                  {domain.title}
                </h3>
                <p className="text-[#B0B4C8] text-sm leading-relaxed">
                  {domain.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00FFD5] to-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Engineering profile summary */}
        <div className="mt-20 p-8 border-l-4 border-[#00FFD5] bg-[#0F1425]/30 rounded-lg">
          <h3 className="text-2xl font-bold text-[#00FFD5] mb-4">The Engineer Behind the Machines</h3>
          <p className="text-[#E5E7EB] leading-relaxed mb-4">
            Jenish is an enthusiastic engineering student who transforms ideas into intelligent systems.
            With a passion for robotics, embedded systems, and machine learning, he combines hardware
            and software expertise to create practical, innovative solutions.
          </p>
          <p className="text-[#B0B4C8] leading-relaxed">
            Each project represents a commitment to engineering excellence and continuous learning in
            the rapidly evolving fields of robotics, automation, and intelligent systems. His approach
            blends meticulous engineering principles with creative problem-solving.
          </p>
        </div>
      </div>
    </section>
  );
}
