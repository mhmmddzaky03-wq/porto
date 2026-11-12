import React, { useState, useEffect } from 'react';

// Inline clean SVGs for instant zero-crawl build
const SunIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const TerminalIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
  </svg>
);

const CodeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const SparklesIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-12 max-w-5xl mx-auto">
      {/* Header / Nav Sederhana */}
      <header className="flex items-center justify-between py-4 border-b border-[var(--card-border)]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="font-mono text-sm tracking-wider font-semibold">MD — DEVV</span>
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          {theme === 'dark' ? (
            <SunIcon className="w-4 h-4 text-amber-400" />
          ) : (
            <MoonIcon className="w-4 h-4 text-slate-700" />
          )}
        </button>
      </header>

      {/* Main Preview Hero Sementara */}
      <main className="my-auto py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-mono mb-6">
          <TerminalIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>PORTFOLIO SYSTEM INITIALIZED</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase leading-tight mb-6">
          Muhammad Dzaky<br />
          <span className="text-[var(--accent)]">Web Developer</span> & UI/UX
        </h1>

        <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed mb-8">
          Membangun fondasi portofolio dari nol dengan arsitektur modern, performa tinggi, dan tanpa error.
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] font-mono text-sm">
            <CodeIcon className="w-4 h-4 text-[var(--accent)]" />
            <span>React 19 + Vite</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] font-mono text-sm">
            <SparklesIcon className="w-4 h-4 text-[var(--accent)]" />
            <span>Tailwind CSS v3</span>
          </div>
        </div>
      </main>

      {/* Footer Sederhana */}
      <footer className="pt-8 border-t border-[var(--card-border)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
        <span>© 2026 MUHAMMAD DZAKY</span>
        <span className="text-emerald-400">● STABLE STEP 2</span>
      </footer>
    </div>
  );
}
