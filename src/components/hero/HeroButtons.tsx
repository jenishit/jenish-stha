'use client';

import GlowButton from '@/components/ui/GlowButton';

export default function HeroButtons() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-12">
      <GlowButton onClick={() => handleScroll('projects')}>
        Explore Projects
      </GlowButton>
      <GlowButton onClick={() => handleScroll('skills')}>
        View Skills
      </GlowButton>
      <GlowButton onClick={() => handleScroll('research')}>
        Research Work
      </GlowButton>
      <GlowButton onClick={() => handleScroll('contact')}>
        Contact
      </GlowButton>
    </div>
  );
}
