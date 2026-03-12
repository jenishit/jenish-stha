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
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury-gold mb-4">
            Areas of Excellence
          </h2>
          <p className="text-soft-silver max-w-2xl mx-auto font-display">
            Specialized expertise spanning hardware design, intelligent systems, and advanced engineering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="group relative bg-gradient-to-br from-royal-deep/40 to-royal-navy/40 border border-luxury-gold/20 rounded-lg p-6 transition-all duration-400 hover:border-luxury-gold/60 hover:shadow-glow-gold cursor-pointer overflow-hidden luxury-hover"
            >
              {/* Hover glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 to-royal-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-4">{domain.icon}</div>
                <h3 className="text-xl font-serif font-bold text-frost-white mb-3 group-hover:text-luxury-gold transition-colors">
                  {domain.title}
                </h3>
                <p className="text-soft-silver text-sm leading-relaxed font-display">
                  {domain.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-luxury-gold to-royal-purple opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>
          ))}
        </div>

        {/* Engineering profile summary */}
        <div className="mt-20 p-8 border-l-4 border-luxury-gold bg-gradient-to-r from-royal-deep/40 to-royal-navy/40 rounded-lg">
          <h3 className="text-2xl font-serif font-bold text-luxury-gold mb-4">Professional Purpose</h3>
          <p className="text-frost-white leading-relaxed mb-4 font-display">
            Jenish is a dedicated engineer who transforms complex technical visions into elegant, practical systems.
            With deep expertise in robotics, embedded systems, and machine learning, he champions the integration
            of advanced technology with thoughtful design.
          </p>
          <p className="text-soft-silver leading-relaxed font-display">
            Each project reflects an unwavering commitment to precision engineering and continuous innovation.
            Specializing in robotics, automation, and intelligent systems, Jenish approaches every challenge
            with both technical rigor and creative vision—advancing the field through excellence and innovation.
          </p>
        </div>
      </div>
    </section>
  );
}
