
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC<{ siteName: string }> = ({ siteName }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-2xl' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-black tracking-tighter text-white">
          <span className="text-brand">BLANKET'S</span> HOTSTUDIO
        </Link>

        <div className="hidden xl:flex items-center space-x-6">
          <a href="/#projects" className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest">프로젝트</a>
          <a href="/#services" className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest">서비스</a>
          <a href="/#reviews" className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest">후기</a>
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <Link to="/partner-inquiry" className="px-5 py-2.5 border border-brand/50 text-brand-light hover:bg-brand/10 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">파트너 문의</Link>
          <Link to="/commission" className="bg-brand hover:bg-brand-dark px-6 py-2.5 rounded-full text-[10px] font-black text-white shadow-lg shadow-brand/20 uppercase tracking-widest transition-all">커미션 의뢰</Link>
        </div>
      </div>
    </nav>
  );
};
