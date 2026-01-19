
import React, { useState } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { submitPartnerInquiry } from '../../supabaseService';

export const PartnerInquiryPage: React.FC = () => {
  const [formData, setFormData] = useState<any>({ partner_type: '기획', intro: '', proposal: '', portfolio_link: '', contact_time: '' });
  const [sent, setSent] = useState(false);

  const types = ['기획', '개발', '디자인', '모델링', '애니메이션', '기타'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await submitPartnerInquiry(formData)) setSent(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar siteName="Blanket's Hotstudio" />
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="glass p-12 rounded-[3.5rem] border-brand/20 shadow-2xl">
          <h2 className="text-4xl font-black mb-4 tracking-tighter">파트너 문의</h2>
          <p className="text-gray-400 mb-12">함께 멋진 프로젝트를 만들어갈 전문가분들의 제안을 기다립니다.</p>
          
          {sent ? (
            <div className="py-20 text-center">
              <div className="text-brand text-6xl mb-6">🤝</div>
              <h3 className="text-2xl font-bold mb-4">제안이 성공적으로 전달되었습니다!</h3>
              <p className="text-gray-500">검토 후 기재해주신 연락처를 통해 회신 드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">파트너 유형</label>
                <div className="flex flex-wrap gap-2">
                  {types.map(t => (
                    <button key={t} type="button" onClick={() => setFormData({...formData, partner_type: t})} className={`px-6 py-2.5 rounded-xl text-xs font-bold border transition-all ${formData.partner_type === t ? 'bg-brand/20 border-brand text-brand' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <textarea required placeholder="짧은 자기소개를 입력하세요" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand resize-none" onChange={e => setFormData({...formData, intro: e.target.value})} />
                <textarea required rows={5} placeholder="협업 아이디어 또는 제안하는 역할에 대해 적어주세요" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand resize-none" onChange={e => setFormData({...formData, proposal: e.target.value})} />
                <input placeholder="포트폴리오 링크 (선택)" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand" onChange={e => setFormData({...formData, portfolio_link: e.target.value})} />
                <input placeholder="연락 가능 시간대 (선택)" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand" onChange={e => setFormData({...formData, contact_time: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-5 border-2 border-brand text-brand hover:bg-brand hover:text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-brand/10">협업 제안 전송하기 →</button>
            </form>
          )}
        </div>
      </div>
      <Footer siteName="Hotstudio" />
    </div>
  );
};
