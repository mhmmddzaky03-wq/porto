import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import FooterSection from './components/FooterSection';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-neutral-100 bg-ambient-glow selection:bg-accent selection:text-white">
      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>

      {/* Footer & Contact */}
      <FooterSection />
    </div>
  );
}
