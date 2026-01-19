
import React, { useState } from 'react';
import { submitReview } from '../../supabaseService';

export const ReviewForm: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: '',
    nickname: '',
    is_anonymous: false,
    service_tags: [] as string[],
    verify_code: '',
    request_month: new Date().toISOString().slice(0, 7),
    hp: '' // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tags = ['UI', '시스템', '버그수정', '최적화', '기타'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hp) return; // Spam check
    
    if (formData.content.length < 30) {
      alert('상세 내용은 최소 30자 이상 진솔하게 작성해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    const result = await submitReview(formData);
    if (result) {
      alert('리뷰가 성공적으로 등록되었습니다!');
      onSuccess();
    }
    setIsSubmitting(false);
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      service_tags: prev.service_tags.includes(tag) 
        ? prev.service_tags.filter(t => t !== tag)
        : [...prev.service_tags, tag]
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl glass p-8 md:p-12 rounded-[3.5rem] border-brand/20 shadow-2xl overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <h3 className="text-3xl font-black mb-2">작업 후기 남기기</h3>
        <p className="text-gray-500 text-sm mb-10">귀하의 소중한 피드백은 더 나은 서비스를 위한 밑거름이 됩니다.</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot */}
          <input type="text" name="hp" value={formData.hp} onChange={e => setFormData({...formData, hp: e.target.value})} className="hidden" />

          {/* Star Rating */}
          <div className="flex flex-col items-center gap-4 py-6 bg-white/5 rounded-3xl border border-white/5">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({...formData, rating: star})}
                  className={`p-1.5 transition-all hover:scale-125 ${formData.rating >= star ? 'text-brand' : 'text-gray-800'}`}
                >
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                </button>
              ))}
            </div>
            <p className="text-brand font-black uppercase tracking-[0.2em] text-[10px]">{formData.rating}점 만족</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">작성자 닉네임</label>
              <input 
                required
                type="text" 
                value={formData.nickname}
                onChange={e => setFormData({...formData, nickname: e.target.value})}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand outline-none transition-all" 
                placeholder="성함 또는 별명"
              />
            </div>
            <div className="flex items-center gap-3 pt-6 px-4">
              <input 
                type="checkbox" 
                id="anon" 
                checked={formData.is_anonymous}
                onChange={e => setFormData({...formData, is_anonymous: e.target.checked})}
                className="w-5 h-5 accent-brand rounded" 
              />
              <label htmlFor="anon" className="text-sm text-gray-400 font-bold cursor-pointer">익명으로 게시</label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">리뷰 제목</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand outline-none transition-all" 
              placeholder="간결한 한 줄 요약"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">리뷰 내용 (최소 30자)</label>
            <textarea 
              required
              rows={4}
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand outline-none resize-none transition-all" 
              placeholder="작업 결과물에 대한 솔직하고 구체적인 후기를 들려주세요."
            ></textarea>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">의뢰 분야 (중복 선택)</label>
            <div className="flex flex-wrap gap-2">
              {tags.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${formData.service_tags.includes(t) ? 'bg-brand/20 border-brand text-brand-light' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">인증 코드 (발급받은 경우만)</label>
            <input 
              type="text" 
              value={formData.verify_code}
              onChange={e => setFormData({...formData, verify_code: e.target.value})}
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand outline-none transition-all" 
              placeholder="의뢰 완료 시 제공된 8자리 코드 입력"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-brand hover:bg-brand-dark rounded-[1.5rem] font-black text-lg transition-all shadow-xl shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isSubmitting ? '리뷰 등록 중...' : '리뷰 등록하기'}
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};
