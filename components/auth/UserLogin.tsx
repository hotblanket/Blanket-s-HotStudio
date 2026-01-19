
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 데모: 1초 후 로그인 성공 처리
    setTimeout(() => {
      localStorage.setItem('userSession', JSON.stringify({ email, id: 'u_' + Date.now() }));
      navigate(returnTo);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full glass p-12 rounded-[3rem] text-center border-brand/20 shadow-2xl">
        <h1 className="text-4xl font-black mb-4">로그인</h1>
        <p className="text-gray-500 mb-10 text-sm">의뢰 및 협업 제안을 위해 계정이 필요합니다.</p>
        
        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">이메일</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">비밀번호</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-all" />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-brand hover:bg-brand-dark rounded-2xl font-black text-lg shadow-xl shadow-brand/30">
            {isSubmitting ? '진행 중...' : '로그인하기'}
          </button>
        </form>
      </div>
    </div>
  );
};
