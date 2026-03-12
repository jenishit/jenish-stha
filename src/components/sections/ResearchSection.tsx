'use client';

export default function ResearchSection() {
  return (
    <section id="research" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-luxury-gold to-royal-purple" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-frost-white">
              Research & Innovation
            </h2>
          </div>

          <p className="text-soft-silver max-w-2xl font-display text-sm tracking-wide">
            Advanced research in machine learning and signal processing
          </p>
        </div>

        <div className="bg-gradient-to-br from-royal-deep/40 to-royal-navy/40 border border-luxury-gold/30 rounded-lg p-8 md:p-12 hover:border-luxury-gold/60 transition-all duration-400 hover:shadow-glow-gold luxury-hover">
          <div className="mb-8">
            <h3 className="text-2xl font-serif font-bold text-luxury-gold mb-2">
              Audio Transcription of Customer Support Calls
            </h3>
            <p className="text-sm text-accent-gold font-display mb-6 flex items-center gap-2">
              <span>⬥</span> Using Machine Learning Algorithms
            </p>
          </div>

          <div className="space-y-8 text-frost-white leading-relaxed font-display">
            {/* Problem Statement */}
            <div className="border-l-4 border-luxury-gold pl-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-luxury-gold font-bold">Problem</span>
                <div className="flex-1 h-px bg-gradient-to-r from-luxury-gold to-transparent" />
              </div>
              <p className="text-soft-silver">
                Manual analysis of customer support call recordings is time-consuming and
                resource-intensive. Organizations struggle to extract insights from
                conversations at scale.
              </p>
            </div>

            {/* Approach */}
            <div className="border-l-4 border-royal-mauve pl-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-royal-mauve font-bold">Approach</span>
                <div className="flex-1 h-px bg-gradient-to-r from-royal-mauve to-transparent" />
              </div>
              <p className="text-soft-silver">
                Implementing automatic speech-to-text transcription using advanced machine
                learning algorithms. The system processes audio data and converts it into
                actionable text, enabling automated analysis of customer interactions.
              </p>
            </div>

            {/* Impact */}
            <div className="border-l-4 border-luxury-gold pl-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-luxury-gold font-bold">Impact</span>
                <div className="flex-1 h-px bg-gradient-to-r from-luxury-gold to-transparent" />
              </div>
              <p className="text-soft-silver">
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
