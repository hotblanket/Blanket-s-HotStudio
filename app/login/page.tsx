
'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = searchParams.get('message');
  const returnTo = searchParams.get('returnTo') || '/';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full glass p-10 md:p-12 rounded-[3rem] text-center border-brand/20 shadow-2xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-3 tracking-tight">
            {mode === 'signin' ? '반갑습니다!' : '시작하기'}
          </h1>
          <p className="text-gray-500 font-medium">
            {mode === 'signin' 
              ? '계정에 로그인하여 의뢰를 관리하세요.' 
              : '새 계정을 만들고 Blanket의 파트너가 되세요.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-sm font-bold">
            {message}
          </div>
        )}

        <form 
          action={mode === 'signin' ? '/auth/sign-in' : '/auth/sign-up'} 
          method="POST" 
          className="space-y-6 text-left"
        >
          <input type="hidden" name="returnTo" value={returnTo} />
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">이메일 주소</label>
            <input 
              required
              name="email"
              type="email" 
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-all text-white" 
              placeholder="example@gmail.com" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">비밀번호</label>
            <input 
              required
              name="password"
              type="password" 
              minLength={8}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-all text-white" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-brand hover:bg-brand-dark rounded-2xl font-black text-lg shadow-xl shadow-brand/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {mode === 'signin' ? '로그인하기' : '회원가입 완료'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5">
          <p className="text-gray-600 text-sm">
            {mode === 'signin' ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'}
            <button 
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="ml-2 text-brand font-bold hover:underline"
            >
              {mode === 'signin' ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
