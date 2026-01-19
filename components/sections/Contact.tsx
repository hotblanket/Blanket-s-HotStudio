
import React, { useState } from 'react';
import { submitInquiry } from '../../supabaseService';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget_range: '',
    deadline: '',
    reference_link: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await submitInquiry({
      ...formData,
      contact_method: 'email'
    });
    if (success) {
      setSent(true);
      setFormData({
        name: '', email: '', 
        message: '', budget_range: '', deadline: '', reference_link: ''
      });
    }
    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-brand font-bold uppercase tracking-widest text-sm mb-4">Contact</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-8">당신의 꿈을<br />현실로 만드세요.</h3>
              <p className="text-gray-400 mb-12 leading-relaxed">
                현재 커미션 예약이 가능합니다. 상세한 내용을 적어주시면 확인 후 24시간 이내에 <strong>dlrwo1233@gmail.com</strong> 에서 연락드리겠습니다.
              </p>

              <div className="p-8 glass rounded-3xl border-brand/10 bg-brand/5">
                <p className="text-brand-light font-black text-xs uppercase tracking-widest mb-4">Quick Contact</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <span className="text-white font-bold">dlrwo1233@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 glass rounded-[3rem] border-white/10 shadow-2xl">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">문의 전송 완료!</h4>
                  <p className="text-gray-400">문의가 성공적으로 접수되었습니다.<br />곧 기재해주신 이메일로 연락드리겠습니다.</p>
                  <button onClick={() => setSent(false)} className="mt-8 text-brand font-black hover:underline">새 문의 작성</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">의뢰자 성함 / 닉네임</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand outline-none transition-all text-white" placeholder="성함을 입력하세요" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">답변 받을 이메일 주소</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand transition-all text-white" placeholder="example@gmail.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">상세 의뢰 내용</label>
                    <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand outline-none transition-all resize-none text-white" placeholder="작업의 규모, 장르, 필요한 기능 등을 자유롭게 적어주세요."></textarea>
                  </div>

                  <button type="submit" disabled={submitting} className="w-full py-5 bg-brand hover:bg-brand-dark disabled:bg-gray-800 rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand/30">
                    {submitting ? '전송 중...' : '커미션 의뢰 신청하기'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
