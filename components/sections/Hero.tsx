
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteSettings } from '../../types';

export const Hero: React.FC<{ settings: SiteSettings }> = ({ settings }) => {
  const navigate = useNavigate();

  const handleCommissionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const userSession = localStorage.getItem('userSession');
    if (!userSession) {
      navigate('/login');
    } else {
      window.location.hash = 'contact';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-dark/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-brand/30 bg-brand/5 text-brand-light text-xs font-bold tracking-widest uppercase">
          Premium Roblox Studio
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight whitespace-pre-line">
          {settings.hero_headline.split('\n').map((line, i) => (
            <span key={i} className={i === 1 ? 'text-gradient' : ''}>
              {line}
              <br />
            </span>
          ))}
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed whitespace-pre-line">
          {settings.hero_subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="w-full sm:w-auto px-10 py-4 bg-brand hover:bg-brand-dark rounded-full font-black text-lg transition-all transform hover:-translate-y-1 shadow-2xl shadow-brand/30">
            포트폴리오 둘러보기
          </a>
          <a 
            href="#contact" 
            onClick={handleCommissionClick}
            className="w-full sm:w-auto px-10 py-4 glass hover:bg-white/10 rounded-full font-black text-lg transition-all transform hover:-translate-y-1"
          >
            커미션 의뢰
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
