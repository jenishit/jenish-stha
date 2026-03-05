'use client';

interface SkillBarProps {
  name: string;
  proficiency: number;
}

export default function SkillBar({ name, proficiency }: SkillBarProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm text-[#E5E7EB]">{name}</span>
        <span className="font-mono text-xs text-[#00FFD5]">{proficiency}%</span>
      </div>
      <div className="w-full h-2 bg-[#1a1f3a] rounded-full overflow-hidden border border-[#00FFD5] border-opacity-30">
        <div
          className="h-full bg-gradient-to-r from-[#00FFD5] to-[#7C3AED] rounded-full transition-all duration-1000"
          style={{ width: `${proficiency}%` }}
        />
      </div>
    </div>
  );
}
