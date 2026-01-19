
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, SiteSettings, PartnerInquiry } from '../../types';
import { getPartnerInquiries } from '../../supabaseService';

export const AdminDashboard: React.FC<{ projects: Project[]; settings: SiteSettings }> = ({ projects, settings }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'partners' | 'settings'>('projects');
  const [partnerInquiries, setPartnerInquiries] = useState<PartnerInquiry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin/login');
    if (activeTab === 'partners') getPartnerInquiries().then(setPartnerInquiries);
  }, [activeTab, navigate]);

  return (
    <div className="min-h-screen bg-dark flex flex-col md:flex-row text-white">
      <aside className="w-64 glass p-8 flex flex-col gap-4 border-r-0">
        <h2 className="text-xl font-black text-brand mb-10">ADMIN PANEL</h2>
        {['projects', 'partners', 'settings'].map(t => (
          <button key={t} onClick={() => setActiveTab(t as any)} className={`w-full text-left px-6 py-4 rounded-2xl font-bold capitalize ${activeTab === t ? 'bg-brand' : 'hover:bg-white/5 text-gray-500'}`}>{t}</button>
        ))}
        <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }} className="mt-auto p-4 text-red-500 font-bold">로그아웃</button>
      </aside>

      <main className="flex-1 p-12">
        <h1 className="text-4xl font-black mb-12 capitalize">{activeTab}</h1>
        <div className="glass p-10 rounded-[3rem]">
          {activeTab === 'partners' && (
            <div className="space-y-6">
              {partnerInquiries.length === 0 ? <p className="text-center py-20 text-gray-600">접수된 파트너 문의가 없습니다.</p> : 
                partnerInquiries.map(pi => (
                  <div key={pi.id} className="p-8 bg-white/5 rounded-3xl border border-white/5">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-brand/20 text-brand px-3 py-1 rounded-full text-[10px] font-black uppercase">{pi.partner_type}</span>
                      <span className="text-xs text-gray-500 font-mono">{new Date(pi.created_at).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">자기소개</h4>
                    <p className="text-gray-400 mb-6 text-sm">"{pi.intro}"</p>
                    <h4 className="font-bold text-lg mb-2">제안 내용</h4>
                    <p className="text-white mb-6 text-sm">{pi.proposal}</p>
                    {pi.portfolio_link && <a href={pi.portfolio_link} className="text-brand text-xs font-bold hover:underline">포트폴리오 보기 →</a>}
                  </div>
                ))
              }
            </div>
          )}
          {activeTab === 'projects' && <p className="text-gray-500">프로젝트 관리 로직...</p>}
          {activeTab === 'settings' && <p className="text-gray-500">사이트 설정 로직...</p>}
        </div>
      </main>
    </div>
  );
};
