
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified login for demo
    if (password === 'admin1234') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full glass p-10 rounded-[2.5rem] text-center">
        <div className="w-16 h-16 bg-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </div>
        <h1 className="text-3xl font-black mb-2">Admin Access</h1>
        <p className="text-gray-500 mb-8">관리자 전용 대시보드에 접근합니다.</p>
        
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 ml-2 uppercase tracking-widest">Master Key</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-all" placeholder="비밀번호 입력" />
          </div>
          <button type="submit" className="w-full py-4 bg-brand hover:bg-brand-dark rounded-2xl font-bold shadow-xl shadow-brand/20 transition-all">접속하기</button>
        </form>
      </div>
    </div>
  );
};
