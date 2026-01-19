
import React, { useState, useMemo } from 'react';
import { Review } from '../../types';

export const ReviewList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const [filter, setFilter] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'rating' | 'helpful'>('latest');
  const [search, setSearch] = useState('');

  const filteredReviews = useMemo(() => {
    return reviews
      .filter(r => {
        const matchesFilter = filter === 'all' || r.rating === filter;
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) || 
                             r.content.toLowerCase().includes(search.toLowerCase()) || 
                             r.nickname.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'helpful') return b.helpful_count - a.helpful_count;
        return 0;
      });
  }, [reviews, filter, sortBy, search]);

  return (
    <div className="space-y-12">
      {/* Filters & Controls */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between border-b border-white/5 pb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {['all', 5, 4, 3, 2, 1].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-3 rounded-2xl text-xs font-black border transition-all ${filter === f ? 'bg-brand text-white border-brand shadow-lg shadow-brand/20' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'}`}
            >
              {f === 'all' ? '전체 후기' : `${f}점`}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72">
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="리뷰 내용 또는 키워드 검색..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:border-brand outline-none text-sm transition-all"
            />
          </div>
          <select 
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-black outline-none focus:border-brand cursor-pointer"
          >
            <option value="latest">최신순</option>
            <option value="rating">평점순</option>
            <option value="helpful">인기순</option>
          </select>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-20 text-gray-600 font-bold border-2 border-dashed border-white/5 rounded-[2.5rem]">
            검색 조건과 일치하는 리뷰가 없습니다.
          </div>
        ) : (
          filteredReviews.map(r => (
            <div key={r.id} className="p-10 glass rounded-[3rem] border border-white/5 group transition-all hover:border-brand/30">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-56 shrink-0 border-r border-white/5 pr-4">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < r.rating ? 'text-brand' : 'text-gray-800'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg font-black mb-1 text-white">{r.is_anonymous ? '익명 파트너' : r.nickname}</p>
                  <p className="text-[10px] text-gray-600 font-mono tracking-widest mb-6 uppercase">{new Date(r.created_at).toLocaleDateString()}</p>
                  <div className="flex flex-wrap gap-2">
                    {r.service_tags.map(t => (
                      <span key={t} className="px-2.5 py-1 bg-brand/5 text-brand-light text-[9px] font-black rounded border border-brand/10 uppercase tracking-tighter">#{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <h5 className="text-2xl font-black group-hover:text-brand transition-colors">{r.title}</h5>
                      {r.verified && <span className="px-2.5 py-1 bg-brand text-white text-[9px] font-black rounded-full ring-4 ring-brand/10">VERIFIED</span>}
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-10">
                      "{r.content}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2.5 px-6 py-3 bg-white/5 hover:bg-brand/10 hover:text-brand rounded-2xl text-xs font-black transition-all border border-transparent hover:border-brand/20 group/btn">
                      <svg className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 10h4.757c1.246 0 2.257 1.011 2.257 2.257 0 .584-.232 1.144-.645 1.556L15.353 19.34C15.15 19.543 14.887 19.65 14.6 19.65H8.75a1.25 1.25 0 01-1.25-1.25V9.75c0-.441.221-.851.589-1.096l3.661-2.441a1.25 1.25 0 011.666.236l.934 1.168a1.25 1.25 0 01.25 1.008l-.25 1.625H14z" /></svg>
                      도움돼요 <span className="opacity-50">{r.helpful_count > 0 ? r.helpful_count : ''}</span>
                    </button>
                    {r.request_month && <span className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em]">의뢰 시기: {r.request_month}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
