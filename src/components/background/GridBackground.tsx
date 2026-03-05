'use client';

export default function GridBackground() {
  return (
    <>
      {/* Fixed Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 213, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 213, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#02101c] via-[#0B0F1A] to-[#000814]" />

        {/* Animated glow overlay */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-[#00FFD5] to-[#7C3AED] rounded-full blur-3xl"
            style={{
              top: '10%',
              right: '10%',
              opacity: 0.1,
              animation: 'float 20s ease-in-out infinite',
            }}
          />
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-[#7C3AED] to-[#00FFD5] rounded-full blur-3xl"
            style={{
              bottom: '10%',
              left: '10%',
              opacity: 0.1,
              animation: 'float 25s ease-in-out infinite reverse',
            }}
          />
        </div>

        {/* Gradient overlay for dark feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0, 255, 213, 0.02)]" />
      </div>
    </>
  );
}
