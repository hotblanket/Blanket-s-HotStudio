
import React, { useState, useEffect } from 'react';
import { getReviews } from '../../supabaseService';
import { Review } from '../../types';
import { ReviewSummary } from './ReviewSummary';
import { ReviewList } from './ReviewList';
import { ReviewForm } from './ReviewForm';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    const data = await getReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const publishedReviews = reviews.filter(r => r.status === 'published');
  const featuredReviews = publishedReviews.filter(r => r.is_featured);

  return (
    <section id="reviews" className="py-24 bg-dark overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-brand font-bold uppercase tracking-[0.3em] text-sm mb-4">Reviews</h2>
            <h3 className="text-4xl md:text-5xl font-black leading-tight">함께 성장한<br />파트너들의 리얼한 후기</h3>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-brand hover:bg-brand-dark rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-brand/20"
          >
            리뷰 남기기
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500">리뷰 데이터를 불러오고 있습니다...</div>
        ) : publishedReviews.length === 0 ? (
          <div className="py-24 glass rounded-[3rem] text-center border-dashed border-white/10">
            <p className="text-gray-500 font-bold mb-4 text-lg">아직 등록된 리뷰가 없습니다.</p>
            <p className="text-gray-600 text-sm">첫 번째 주인공이 되어 소중한 의견을 남겨주세요!</p>
          </div>
        ) : (
          <>
            {/* 요약 대시보드 */}
            <ReviewSummary reviews={publishedReviews} />

            {/* 베스트 리뷰 하이라이트 */}
            {featuredReviews.length > 0 && (
              <div className="mb-24">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-px bg-brand"></span>
                  <h4 className="text-xs font-bold text-brand uppercase tracking-widest">Featured Best Reviews</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredReviews.map((r) => (
                    <div key={r.id} className="p-8 glass rounded-[2.5rem] border border-brand/20 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg className="w-16 h-16 text-brand" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3602 6 13.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 17.7614 19.7784 20 17.017 20H14.017V21ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56928 13 4.017 13H2.017C1.46472 13 1.017 12.5523 1.017 12V9C1.017 7.34315 2.36015 6 4.017 6H10.017C11.6739 6 13.017 7.34315 13.017 9V15C13.017 17.7614 10.7784 20 8.017 20H5.017V21Z" /></svg>
                      </div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(r.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <h5 className="font-bold text-xl mb-4 text-white line-clamp-1">{r.title}</h5>
                      <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-4">"{r.content}"</p>
                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">{r.is_anonymous ? '익명' : r.nickname}</span>
                          {r.verified && <span className="text-[10px] bg-brand/20 text-brand-light px-2 py-0.5 rounded-full font-bold">인증됨</span>}
                        </div>
                        <span className="text-xs text-gray-600 font-mono">{new Date(r.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 전체 리뷰 리스트 (필터/검색 포함) */}
            <ReviewList reviews={publishedReviews} />
          </>
        )}

        {/* 리뷰 작성 모달 */}
        {showForm && (
          <ReviewForm 
            onClose={() => setShowForm(false)} 
            onSuccess={() => {
              setShowForm(false);
              fetchReviews();
            }} 
          />
        )}
      </div>
    </section>
  );
};
