'use client';

import GridBackground from '@/components/background/GridBackground';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import MotherboardScene from '@/components/robotics/MotherboardScene';
import DomainCards from '@/components/sections/DomainCards';
import SkillsDashboard from '@/components/sections/SkillsDashboard';
import ProjectsLab from '@/components/sections/ProjectsLab';
import ResearchSection from '@/components/sections/ResearchSection';
import Achievements from '@/components/sections/Achievements';
import ContactTerminal from '@/components/sections/ContactTerminal';
import RobotAssistant from '@/components/robot/RobotAssistant';
import LabConsole from '@/components/console/LabConsole';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] overflow-hidden">
      {/* Background */}
      <GridBackground />

      {/* Navigation */}
      <Navbar />

      {/* Interactive Elements */}
      <RobotAssistant />
      <LabConsole />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* 3D Projects Motherboard */}
        <MotherboardScene />

        {/* Engineering Domains - replaces old text-based About */}
        <ScrollReveal direction="up" duration={0.8}>
          <DomainCards />
        </ScrollReveal>

        {/* Skills Dashboard */}
        <ScrollReveal direction="up" duration={0.8} delay={0.2}>
          <SkillsDashboard />
        </ScrollReveal>

        {/* Projects Lab */}
        <ProjectsLab />

        {/* Research Section */}
        <ScrollReveal direction="up" duration={0.8} delay={0.1}>
          <ResearchSection />
        </ScrollReveal>

        {/* Achievements */}
        <ScrollReveal direction="up" duration={0.8} delay={0.2}>
          <Achievements />
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal direction="up" duration={0.8} delay={0.1}>
          <ContactTerminal />
        </ScrollReveal>
      </div>
    </main>
  );
}
