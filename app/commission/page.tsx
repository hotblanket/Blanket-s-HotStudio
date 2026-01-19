
import { createClient } from '../../lib/supabase/server';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default async function CommissionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // 미들웨어에서 거르지만, 2중 방어로 서버 컴포넌트 내에서도 체크 가능

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar siteName="Blanket's Hotstudio" />
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <div className="glass p-12 rounded-[3.5rem] border-brand/20 shadow-2xl">
          <h2 className="text-4xl font-black mb-4 tracking-tighter">커미션 의뢰 신청</h2>
          <p className="text-gray-400 mb-12">반갑습니다, {user?.email}님. 상세 요구사항을 남겨주시면 검토 후 회신 드립니다.</p>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required placeholder="성함 / 닉네임" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand" />
              <input required type="email" defaultValue={user?.email} readOnly className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none opacity-50 cursor-not-allowed" />
            </div>
            <textarea required rows={6} placeholder="상세 의뢰 내용 (장르, 시스템, UI 포함 여부 등)" className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-brand resize-none" />
            <button type="submit" className="w-full py-5 bg-brand hover:bg-brand-dark rounded-2xl font-black text-xl shadow-2xl shadow-brand/30 transition-all">의뢰 신청하기 →</button>
          </form>
        </div>
      </div>
      <Footer siteName="Hotstudio" />
    </div>
  );
}
