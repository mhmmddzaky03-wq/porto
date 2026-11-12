import React from 'react';
import { projectsData } from '../data/portfolioData';

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-white/10">
      <div className="mb-14">
        <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
          // Portfolio Work
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          Selected Projects & Explorations
        </h2>
        <p className="text-neutral-400 text-base max-w-2xl">
          Kumpulan aplikasi dan antarmuka web yang saya bangun, mengutamakan performa, usability yang nyaman, dan arsitektur kode yang teruji.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, idx) => (
          <article
            key={project.id}
            className="p-6 rounded-2xl border border-white/10 bg-dark-surface/60 hover:border-white/25 hover:bg-dark-surface transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-accent bg-accent/10 px-2.5 py-1 rounded border border-accent/20">
                  {project.subtitle}
                </span>
                <span className="text-xs font-mono text-neutral-600">
                  0{idx + 1}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div>
              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono text-neutral-300 px-2 py-0.5 rounded bg-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-white/20 active:scale-95 transition-all"
                >
                  <span>Preview</span>
                  <ExternalLinkIcon />
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Source Code on GitHub"
                  className="p-2 rounded-lg text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <GithubIcon />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

