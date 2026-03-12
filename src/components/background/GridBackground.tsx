'use client';

export default function GridBackground() {
  return (
    <>
      {/* Fixed Elegant Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-royal-dark via-royal-navy to-royal-deep" />

        {/* Subtle elegant grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200, 155, 75, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200, 155, 75, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Elegant radial accents */}
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute w-96 h-96 bg-gradient-to-br from-luxury-gold via-transparent to-transparent rounded-full blur-3xl"
            style={{
              top: '15%',
              right: '5%',
              opacity: 0.08,
              animation: 'float 25s ease-in-out infinite',
            }}
          />
          <div
            className="absolute w-96 h-96 bg-gradient-to-tl from-royal-purple via-transparent to-transparent rounded-full blur-3xl"
            style={{
              bottom: '10%',
              left: '5%',
              opacity: 0.08,
              animation: 'float 30s ease-in-out infinite reverse',
            }}
          />
        </div>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-royal-dark/30" />
      </div>
    </>
  );
}
