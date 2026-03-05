'use client';

export default function ResearchSection() {
  return (
    <section id="research" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-[#00FFD5] to-[#7C3AED]" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="text-[#00FFD5]">{'[ '}</span>
              Research & Academic
              <span className="text-[#00FFD5]">{' ]'}</span>
            </h2>
          </div>

          <p className="text-[#B0B4C8] max-w-2xl font-mono text-sm">
            <span className="text-[#00FFD5]"># </span>
            Advanced research in machine learning and signal processing
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1425] border border-[#00FFD5]/40 rounded-lg p-8 md:p-12 hover:border-[#00FFD5] transition-all duration-300 hover:shadow-lg hover:shadow-[#00FFD5]/20">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-[#7C3AED] mb-2">
              Audio Transcription of Customer Support Calls
            </h3>
            <p className="text-sm text-[#00FFD5] font-mono mb-6 flex items-center gap-2">
              <span>{'$'}</span> Using Machine Learning Algorithms
            </p>
          </div>

          <div className="space-y-8 text-[#E5E7EB] leading-relaxed">
            {/* Problem Statement */}
            <div className="border-l-4 border-[#00FFD5] pl-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#00FFD5] font-bold">Problem</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#00FFD5] to-transparent" />
              </div>
              <p className="text-[#B0B4C8]">
                Manual analysis of customer support call recordings is time-consuming and
                resource-intensive. Organizations struggle to extract insights from
                conversations at scale.
              </p>
            </div>

            {/* Approach */}
            <div className="border-l-4 border-[#7C3AED] pl-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#7C3AED] font-bold">Approach</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#7C3AED] to-transparent" />
              </div>
              <p className="text-[#B0B4C8]">
                Implementing automatic speech-to-text transcription using advanced machine
                learning algorithms. The system processes audio data and converts it into
                actionable text, enabling automated analysis of customer interactions.
              </p>
            </div>

            {/* Impact */}
            <div className="border-l-4 border-[#00FFD5] pl-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#00FFD5] font-bold">Impact</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#00FFD5] to-transparent" />
              </div>
              <p className="text-[#B0B4C8]">
                This research enables efficient quality assurance, sentiment analysis, and
                pattern recognition in customer support calls. Businesses can now identify
                trends, improve training, and enhance overall customer experience
                systematically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
