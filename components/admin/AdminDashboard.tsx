
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, SiteSettings, PartnerInquiry } from '../../types';
import { getPartnerInquiries } from '../../supabaseService';

export const AdminDashboard: React.FC<{ projects: Project[]; settings: SiteSettings }> = ({ projects, settings }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'partners' | 'settings'>('projects');
  const [partnerInquiries, setPartnerInquiries] = useState<PartnerInquiry[]>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('isAdmin');
    if (auth === 'true') {
      setIsAuthorized(true);
    } else {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (isAuthorized && activeTab === 'partners') {
      getPartnerInquiries().then(setPartnerInquiries);
    }
  }, [activeTab, isAuthorized]);

  if (isAuthorized === null) return null;

  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row text-white">
      <aside className="w-full md:w-64 glass p-8 flex flex-col gap-4 border-r-0 md:border-r border-white/5">
        <h2 className="text-xl font-black text-brand mb-10 tracking-tighter">HOTSTUDIO PANEL</h2>
        {['projects', 'partners', 'settings'].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t as any)} 
            className={`w-full text-left px-6 py-4 rounded-2xl font-bold capitalize transition-all ${activeTab === t ? 'bg-brand shadow-lg shadow-brand/30' : 'hover:bg-white/5 text-gray-500'}`}
          >
            {t}
          </button>
        ))}
        <button 
          onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }} 
          className="mt-auto p-4 text-red-500 font-bold hover:bg-red-500/10 rounded-xl transition-all"
        >
          대시보드 종료
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black capitalize tracking-tight">{activeTab}</h1>
          <div className="px-4 py-2 glass rounded-xl text-xs font-bold text-gray-500">Admin Mode Active</div>
        </header>

        <div className="glass p-6 md:p-10 rounded-[3rem]">
          {activeTab === 'partners' && (
            <div className="space-y-6">
              {partnerInquiries.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600 font-bold">접수된 파트너 문의가 없습니다.</p>
                </div>
              ) : (
                partnerInquiries.map(pi => (
                  <div key={pi.id} className="p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-brand/20 transition-all">
                    <div className="flex justify-between items-center mb-6">
                      <span className="bg-brand/20 text-brand px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{pi.partner_type}</span>
                      <span className="text-xs text-gray-500 font-mono">{new Date(pi.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-sm text-gray-500 uppercase mb-2">자기소개</h4>
                        <p className="text-white leading-relaxed">{pi.intro}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-500 uppercase mb-2">제안 내용</h4>
                        <p className="text-white leading-relaxed">{pi.proposal}</p>
                      </div>
                    </div>
                    {pi.portfolio_link && (
                      <a href={pi.portfolio_link} target="_blank" className="inline-block mt-6 text-brand text-xs font-bold hover:underline">포트폴리오 확인하기 →</a>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
          {activeTab === 'projects' && (
            <div className="text-center py-20 text-gray-600">
              <p>현재 프로젝트 {projects.length}개가 게시 중입니다.</p>
              <button className="mt-6 px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all">새 프로젝트 추가</button>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">사이트 이름</label>
                <input defaultValue={settings.site_name} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">메인 슬로건</label>
                <textarea defaultValue={settings.hero_headline} rows={3} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand resize-none" />
              </div>
              <button className="px-10 py-4 bg-brand rounded-2xl font-black shadow-lg shadow-brand/20">설정 저장하기</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
