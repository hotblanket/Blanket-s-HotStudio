
import React, { useState } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { submitInquiry } from '../../supabaseService';

export const CommissionPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', budget_range: '', deadline: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submitInquiry(formData)) setSent(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar siteName="Blanket's Hotstudio" />
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="glass p-12 rounded-[3.5rem] border-brand/20 shadow-2xl">
          <h2 className="text-4xl font-black mb-4 tracking-tighter">커미션 의뢰 신청</h2>
          <p className="text-gray-400 mb-12">상세한 요구사항을 작성해 주시면 검토 후 이메일로 회신 드립니다.</p>
          
          {sent ? (
            <div className="py-20 text-center">
              <div className="text-brand text-6xl mb-6">✓</div>
              <h3 className="text-2xl font-bold mb-4">의뢰가 접수되었습니다!</h3>
              <p className="text-gray-500 mb-8">24시간 이내에 dlrwo1233@gmail.com에서 연락을 드립니다.</p>
              <button onClick={() => setSent(false)} className="text-brand font-black underline">새로운 의뢰 작성</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input required placeholder="성함 / 닉네임" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="답변 받을 이메일" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand" onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <textarea required rows={6} placeholder="상세 의뢰 내용 (장르, 시스템, UI 포함 여부 등)" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand resize-none" onChange={e => setFormData({...formData, message: e.target.value})} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="예상 예산 범위" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand" onChange={e => setFormData({...formData, budget_range: e.target.value})} />
                <input placeholder="희망 마감일 (YYYY-MM-DD)" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand" onChange={e => setFormData({...formData, deadline: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-5 bg-brand hover:bg-brand-dark rounded-2xl font-black text-xl shadow-2xl shadow-brand/30 transition-all">의뢰 신청하기 →</button>
            </form>
          )}
        </div>
      </div>
      <Footer siteName="Hotstudio" />
    </div>
  );
};
