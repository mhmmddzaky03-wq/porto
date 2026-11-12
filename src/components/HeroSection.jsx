import React from 'react';
import { personalData } from '../data/portfolioData';
import CharacterScene from './3d/CharacterScene';

// Clean SVG icons for fast, 0-latency rendering
const ArrowRightIcon = () => (
  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-3.5 h-3.5 text-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

export default function HeroSection() {
  const quickSkills = [
    'React.js',
    'Three.js / R3F',
    'Tailwind CSS',
    'JavaScript',
    'TypeScript',
    'PHP & MySQL',
    'REST API',
    'UI/UX Design',
  ];

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* 2-Column Responsive Layout: Content on Left, Interactive 3D Character on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
        {/* Left Column: Headline, Bio & Calls to Action */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-dark-surface/80 backdrop-blur-md w-fit mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono text-neutral-300 tracking-wide">
              {personalData.status}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Hi, I'm <span className="text-white hover:text-accent transition-colors duration-300">{personalData.name}</span>.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              {personalData.role}
            </span>
          </h1>

          {/* Role Tag & Subtitle */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-accent mb-6 uppercase tracking-wider">
            <SparkleIcon />
            <span>{personalData.subRole}</span>
          </div>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed mb-10 font-normal">
            {personalData.bio}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white bg-accent hover:bg-accent-muted active:scale-95 transition-all shadow-[0_0_25px_rgba(255,42,59,0.35)]"
            >
              <span>Explore Projects</span>
              <ArrowRightIcon />
            </a>

            <a
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-neutral-200 bg-dark-surface hover:bg-white/10 border border-white/10 hover:border-white/20 active:scale-95 transition-all"
            >
              <DownloadIcon />
              <span>Resume (CV)</span>
            </a>
          </div>
        </div>

        {/* Right Column: Genuine Interactive 3D Vinyl Toy Character */}
        <div className="lg:col-span-5 flex items-center justify-center relative w-full">
          <div className="relative w-full max-w-[540px] lg:max-w-none aspect-[4/5] sm:aspect-square lg:aspect-[5/6] rounded-3xl border border-purple-500/20 bg-gradient-to-b from-dark-surface/40 via-dark-surface/20 to-[#07090E]/80 backdrop-blur-sm shadow-[0_0_50px_rgba(168,85,247,0.14)] overflow-hidden group">
            <CharacterScene />
          </div>
        </div>
      </div>

      {/* Technologies Micro Bar */}
      <div className="pt-8 border-t border-white/10">
        <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3">
          Core Technologies & Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {quickSkills.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md text-xs font-mono text-neutral-300 bg-dark-surface/60 border border-white/5 hover:border-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
