
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createClient } from '../../lib/supabase/client';

export const UserLogin: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMock, setIsMock] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/';
  const supabase = createClient();

  useEffect(() => {
    if ((supabase as any).isMock) {
      setIsMock(true);
    }
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === 'signin') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        navigate(returnTo);
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        
        if (isMock) {
          setMessage('데모 모드: 회원가입이 즉시 완료되었습니다. 이제 로그인해주세요.');
        } else {
          setMessage('회원가입 요청이 전송되었습니다. 이메일을 확인해주세요.');
        }
        setMode('signin');
      }
    } catch (err: any) {
      console.error('Auth Error:', err);
      setError(err.message || '인증 과정에서 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full glass p-12 rounded-[3rem] text-center border-brand/20 shadow-2xl">
        {isMock && (
          <div className="mb-6 px-4 py-2 bg-brand/10 border border-brand/30 rounded-full text-[10px] font-black text-brand uppercase tracking-widest inline-block">
            Preview Mode / No DB Connected
          </div>
        )}
        
        <h1 className="text-4xl font-black mb-4">
          {mode === 'signin' ? '로그인' : '회원가입'}
        </h1>
        <p className="text-gray-500 mb-10 text-sm">
          {isMock 
            ? '데모 모드에서는 아무 이메일이나 입력하여 접속할 수 있습니다.' 
            : mode === 'signin' ? '의뢰 및 협업 제안을 위해 계정이 필요합니다.' : '새 계정을 만들고 Blanket의 파트너가 되세요.'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-left break-all">
            ⚠️ {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-500 text-sm font-bold">
            ✅ {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">이메일 주소</label>
            <input 
              required 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-all text-white" 
              placeholder="example@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">비밀번호</label>
            <input 
              required 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-all text-white" 
              placeholder="••••••••"
              minLength={8}
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-brand hover:bg-brand-dark rounded-2xl font-black text-lg shadow-xl shadow-brand/30 transition-all disabled:opacity-50">
            {isSubmitting ? '진행 중...' : mode === 'signin' ? '로그인하기' : '가입하기'}
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
          {isMock && (
            <p className="mt-4 text-[9px] text-gray-700 font-bold uppercase tracking-widest">
              Tip: 'admin@hotstudio.com'으로 로그인하면 관리자 대시보드 접근 가능
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
