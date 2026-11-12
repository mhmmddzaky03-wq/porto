import React, { useState } from 'react';
import { personalData } from '../data/portfolioData';

const CopyIcon = () => (
  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function FooterSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-white/10">
      {/* Contact Banner */}
      <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-dark-surface to-[#07090E] text-center mb-16 relative overflow-hidden">
        <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-3">
          // Get in touch
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
          Let's create something thoughtful together.
        </h2>
        <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
          Tertarik untuk berkolaborasi, mendiskusikan peluang proyek, atau ingin mengundang untuk magang/pekerjaan? Pintu saya selalu terbuka.
        </p>

        {/* Copy email pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${personalData.email}`}
            className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-accent hover:bg-accent-muted active:scale-95 transition-all shadow-[0_0_20px_rgba(255,42,59,0.3)]"
          >
            Send Email
          </a>

          <button
            onClick={copyEmail}
            aria-label="Copy email address"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-mono text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95 transition-all cursor-pointer"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span>{copied ? 'Copied to clipboard!' : personalData.email}</span>
          </button>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 pt-8 border-t border-white/5">
        <div className="flex items-center gap-4">
          <span>© 2026 {personalData.name.toUpperCase()}</span>
          <span>•</span>
          <span className="text-neutral-400">ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={personalData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={personalData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={personalData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
