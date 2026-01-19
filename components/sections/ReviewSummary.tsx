
import React from 'react';
import { Review } from '../../types';

export const ReviewSummary: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const avg = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
  
  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center glass p-10 rounded-[3rem] mb-20 border-white/5">
      <div className="text-center lg:border-r border-white/10 py-6">
        <div className="text-7xl font-black mb-2 text-gradient tracking-tighter">{avg}</div>
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-6 h-6 ${i < Math.round(Number(avg)) ? 'text-brand' : 'text-gray-800'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-500 font-bold">총 {reviews.length}개의 리뷰</p>
      </div>

      <div className="lg:col-span-2 space-y-4 px-4 md:px-12">
        {distribution.map(d => (
          <div key={d.star} className="flex items-center gap-6">
            <span className="w-10 text-xs font-black text-gray-500">{d.star}점</span>
            <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(139,92,246,0.3)]" 
                style={{ width: `${d.percentage}%` }}
              ></div>
            </div>
            <span className="w-12 text-[10px] font-mono text-gray-700 text-right">{Math.round(d.percentage)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
