'use client';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full">
        <div className="border-l-4 border-[#00FFD5] pl-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#00FFD5] mb-8">
            The Engineer Behind the Machines
          </h2>

          <div className="space-y-6 text-[#E5E7EB] leading-relaxed">
            <p>
              Jenish is an enthusiastic engineering student passionate about robotics,
              embedded systems, machine learning, and building real-world intelligent
              systems. His journey in technology is driven by a desire to create practical
              solutions that blend hardware and software seamlessly.
            </p>

            <p>
              He enjoys combining hardware and software to create practical solutions
              using sensors, microcontrollers, and modern programming techniques. From
              autonomous robots to IoT monitoring systems, Jenish approaches every
              project with meticulous engineering principles and creative problem-solving.
            </p>

            <p>
              His experience spans across robotics systems, IoT devices, environmental
              monitoring systems, machine learning projects, and embedded systems design.
              Each project represents a commitment to innovation and continuous learning
              in the rapidly evolving field of robotics and intelligent systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
