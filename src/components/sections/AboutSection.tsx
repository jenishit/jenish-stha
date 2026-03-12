'use client';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full">
        <div className="border-l-4 border-luxury-gold pl-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-luxury-gold mb-8">
            The Engineer Behind Excellence
          </h2>

          <div className="space-y-6 text-soft-silver leading-relaxed font-display">
            <p>
              Jenish is a passionate engineering innovator with a drive for creating elegant
              solutions in robotics and intelligent systems. With expertise spanning embedded
              systems, machine learning, and IoT technologies, he transforms complex technical
              challenges into refined, practical implementations.
            </p>

            <p>
              His methodology combines meticulous hardware design with sophisticated software
              architecture, leveraging microcontrollers, advanced sensors, and cutting-edge
              programming paradigms. From autonomous robotics to intelligent monitoring systems,
              each project reflects a commitment to engineering excellence and continuous innovation.
            </p>

            <p>
              Specializing in robotics systems, IoT platforms, environmental monitoring, and
              machine learning applications, Jenish approaches every challenge with precision
              and creative vision—dedicated to advancing the frontiers of intelligent automation
              and system design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
