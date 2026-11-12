import React from 'react';
import { skillCategories } from '../data/portfolioData';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-white/10">
      <div className="mb-14">
        <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
          // Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Skills & Technical Toolkit
        </h2>
        <p className="text-neutral-400 text-base max-w-2xl">
          Kombinasi teknologi dan tools yang saya gunakan untuk mewujudkan produk digital dari tahap rancangan visual hingga implementasi kode.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="p-6 rounded-2xl border border-white/10 bg-dark-surface/50 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                {category.title}
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-200 bg-white/5 border border-white/10 hover:border-accent/40 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
