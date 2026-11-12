import React, { useState, useEffect } from 'react';
import { navLinks, personalData } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/10 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0D111A]/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.5)]'
            : 'bg-[#0D111A]/70 backdrop-blur-sm shadow-[0_4px_20px_rgb(0,0,0,0.3)]'
        }`}
      >
        {/* Brand identity */}
        <a
          href="#home"
          className="flex items-center gap-2 pr-3 border-r border-white/10 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider hover:text-accent transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>{personalData.shortName.toUpperCase()}</span>
        </a>

        {/* Navigation items */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* CTA Contact button in navbar */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1.5 ml-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-white bg-accent/90 hover:bg-accent active:scale-95 transition-all shadow-[0_0_15px_rgba(255,42,59,0.3)]"
        >
          <span>Hire Me</span>
        </a>
      </nav>
    </header>
  );
}
