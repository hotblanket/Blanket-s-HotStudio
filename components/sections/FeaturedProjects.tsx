
import React from 'react';
import { Project } from '../../types';

export const FeaturedProjects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <section id="projects" className="py-24 bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-sm font-bold text-brand uppercase tracking-[0.3em] mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-black">예시 프로젝트</h3>
          </div>
          <p className="text-gray-500 max-w-sm">Hotstudio의 기술적 깊이와 시각적 감각이 집약된 프로젝트 리스트입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group relative glass rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-video overflow-hidden">
                <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    {project.status === 'in_progress' && (
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase rounded-full border border-yellow-500/20">In Progress</span>
                    )}
                    <span className="px-3 py-1 bg-brand/10 text-brand-light text-[10px] font-bold uppercase rounded-full border border-brand/20">{project.role}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{project.period}</span>
                </div>

                <h4 className="text-2xl font-bold mb-2 group-hover:text-brand transition-colors">{project.title}</h4>
                <p className="text-gray-400 mb-6 line-clamp-2">{project.tagline}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech_tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/5 text-gray-400 text-xs rounded-lg">#{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.links.roblox && (
                    <a href={project.links.roblox} target="_blank" className="flex-1 text-center py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">의뢰 문의하기</a>
                  )}
                  {project.links.video && (
                    <a href={project.links.video} target="_blank" className="w-12 h-12 flex items-center justify-center bg-brand/20 hover:bg-brand/40 rounded-xl transition-colors">
                      <svg className="w-5 h-5 text-brand-light" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
