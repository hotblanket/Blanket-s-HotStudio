
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../lib/supabase/client';

export const Navbar: React.FC<{ siteName: string }> = ({ siteName }) => {
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [supabase]);

  const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    return `${name.slice(0, 3)}***@${domain}`;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-2xl' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter text-white">
          <span className="text-brand">BLANKET'S</span> HOTSTUDIO
        </Link>

        <div className="hidden xl:flex items-center space-x-6">
          <Link href="/#projects" className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest">프로젝트</Link>
          <Link href="/partner-inquiry" className="px-5 py-2.5 border border-brand/50 text-brand-light hover:bg-brand/10 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">파트너 문의</Link>
          <Link href="/commission" className="bg-brand hover:bg-brand-dark px-6 py-2.5 rounded-full text-[10px] font-black text-white shadow-lg shadow-brand/20 uppercase tracking-widest transition-all">커미션 의뢰</Link>

          <div className="pl-4 border-l border-white/10 flex items-center gap-4">
            {user ? (
              <>
                <span className="text-[10px] font-bold text-gray-500">{maskEmail(user.email)}</span>
                <form action="/auth/sign-out" method="POST">
                  <button type="submit" className="text-[10px] font-black text-red-500/70 hover:text-red-500 uppercase tracking-widest">로그아웃</button>
                </form>
              </>
            ) : (
              <Link href="/login" className="text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest">로그인</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
