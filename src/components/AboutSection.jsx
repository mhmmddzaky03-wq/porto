import React from 'react';
import { personalData } from '../data/portfolioData';

export default function AboutSection() {
  const highlights = [
    {
      title: "Clean Frontend Architecture",
      desc: "Menulis kode React & Tailwind yang rapi, modular, dan mudah di-maintain. Fokus pada performa rendering tinggi dan aksesibilitas.",
      badge: "Frontend & Web",
    },
    {
      title: "Intuitive UI/UX Sensibility",
      desc: "Bukan sekadar styling, tapi memikirkan alur interaksi pengguna, kenyamanan visual, hierarki tipografi, dan konsistensi layout.",
      badge: "Design & UX",
    },
    {
      title: "Expanding to Full-Stack",
      desc: "Sedang intensif mendalami perancangan backend, REST API, autentikasi, dan relasi database (MySQL/PostgreSQL) untuk solusi end-to-end.",
      badge: "Backend & DB",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="mb-12">
        <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
          // About Me
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Background & Engineering Mindset
        </h2>
      </div>

      {/* Main Bio Paragraphs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-7 space-y-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
          <p>
            Saya adalah seorang <strong className="text-white font-semibold">Web Developer</strong> yang memiliki antusiasme tinggi dalam membangun antarmuka web yang tidak hanya berfungsi dengan baik, tetapi juga nyaman dan menyenangkan saat digunakan.
          </p>
          <p className="text-neutral-400 text-base">
            Dengan fondasi kuat di ranah frontend dan ketelitian desain antarmuka (UI/UX), saya terbiasa menerjemahkan ide atau desain abstrak menjadi kode yang terstruktur, responsif, dan ringan.
          </p>
          <p className="text-neutral-400 text-base">
            Saya terus memperluas pemahaman teknis menuju full-stack development, mendalami bagaimana API bekerja secara efisien, bagaimana data disimpan dan diakses dalam basis data relasional, hingga proses deployment dan optimasi produksi.
          </p>
        </div>

        {/* Quick Identity Card */}
        <div className="md:col-span-5 p-6 rounded-2xl border border-white/10 bg-dark-surface/60 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-neutral-400 uppercase tracking-wider">
              Quick Highlights
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Name</span>
                <span className="text-white font-medium">{personalData.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Primary Focus</span>
                <span className="text-white font-medium">Frontend & UI/UX</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-neutral-400">Learning Path</span>
                <span className="text-white font-medium">Full-Stack & APIs</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-400">Status</span>
                <span className="text-emerald-400 font-medium">Open to opportunities</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-xs font-mono text-neutral-500">
            Based in {personalData.location}
          </div>
        </div>
      </div>

      {/* 3 Pillars Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, index) => (
          <div
            key={item.title}
            className="p-6 rounded-2xl border border-white/10 bg-dark-surface/40 hover:bg-dark-surface hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <span className="inline-block px-2.5 py-1 rounded text-[11px] font-mono text-accent bg-accent/10 border border-accent/20 mb-4">
                {item.badge}
              </span>
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="mt-6 text-xs font-mono text-neutral-600">
              0{index + 1} //
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

