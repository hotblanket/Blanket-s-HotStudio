
import React, { useState, useEffect } from 'react';
import { getReviews, updateReviewStatus, toggleReviewFeatured } from '../../supabaseService';
import { Review } from '../../types';

export const ReviewManager: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    const data = await getReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Review['status']) => {
    await updateReviewStatus(id, newStatus);
    fetch();
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await toggleReviewFeatured(id);
      fetch();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">리뷰 목록 로딩 중...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-xl font-black">Review Moderation</h4>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total {reviews.length} reviews</p>
      </div>

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className="p-8 bg-white/5 rounded-3xl border border-white/5 flex flex-col xl:flex-row gap-8 items-start xl:items-center group hover:border-brand/30 transition-all">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`px-2 py-0.5 text-[9px] font-black rounded tracking-tighter ${
                  r.status === 'published' ? 'bg-green-500/10 text-green-500' : 
                  r.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {r.status.toUpperCase()}
                </span>
                <h5 className="font-bold text-lg">{r.title}</h5>
                {r.is_featured && <span className="px-2 py-0.5 bg-brand text-white text-[9px] font-bold rounded">BEST</span>}
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">"{r.content}"</p>
              <div className="flex items-center gap-4 text-[10px] font-black text-gray-700 uppercase tracking-widest">
                <span>By {r.nickname}</span>
                <span>•</span>
                <span>{new Date(r.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="text-brand">Rating {r.rating}</span>
              </div>
            </div>

            <div className="flex gap-2 w-full xl:w-auto">
              <button 
                onClick={() => handleToggleFeatured(r.id)}
                className={`flex-1 xl:flex-none p-3 rounded-xl transition-all border ${r.is_featured ? 'bg-brand/20 border-brand text-brand' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                title="베스트 지정 (최대 3개)"
              >
                <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </button>
              
              {r.status !== 'published' ? (
                <button 
                  onClick={() => handleStatusChange(r.id, 'published')}
                  className="flex-1 xl:flex-none px-6 py-3 bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-black rounded-xl hover:bg-green-500 hover:text-white transition-all"
                >
                  승인 및 게시
                </button>
              ) : (
                <button 
                  onClick={() => handleStatusChange(r.id, 'hidden')}
                  className="flex-1 xl:flex-none px-6 py-3 bg-white/5 border border-white/10 text-gray-500 text-xs font-black rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                >
                  숨기기
                </button>
              )}

              <button className="p-3 bg-red-500/10 text-red-500 border border-transparent hover:border-red-500/30 rounded-xl transition-all">
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
