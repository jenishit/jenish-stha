'use client';

interface SkillBarProps {
  name: string;
  proficiency: number;
}

export default function SkillBar({ name, proficiency }: SkillBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-display text-sm text-frost-white">{name}</span>
        <span className="font-display text-xs text-luxury-gold">{proficiency}%</span>
      </div>
      <div className="w-full h-2 bg-royal-deep rounded-full overflow-hidden border border-luxury-gold/30">
        <div
          className="h-full bg-gradient-to-r from-luxury-gold to-royal-mauve rounded-full transition-all duration-1000"
          style={{ width: `${proficiency}%` }}
        />
      </div>
    </div>
  );
}
