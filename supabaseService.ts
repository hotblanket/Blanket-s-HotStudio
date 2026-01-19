
import { createClient } from './lib/supabase/client';
import { Project, SiteSettings, Review, PartnerInquiry } from './types';

const supabase = createClient();

// --- Inquiry Services ---
export const submitInquiry = async (inquiryData: any): Promise<boolean> => {
  try {
    const { error } = await supabase.from('inquiries').insert([
      {
        name: inquiryData.name,
        contact_method: 'email',
        contact_value: inquiryData.email,
        message: inquiryData.message,
        budget_range: inquiryData.budget_range,
        deadline: inquiryData.deadline,
        status: 'new'
      }
    ]);
    return !error;
  } catch (e) {
    console.error('Inquiry submission failed:', e);
    return false;
  }
};

export const submitPartnerInquiry = async (data: Partial<PartnerInquiry>): Promise<boolean> => {
  try {
    const { error } = await supabase.from('partner_inquiries').insert([
      {
        partner_type: data.partner_type || '기타',
        intro: data.intro || '',
        proposal: data.proposal || '',
        portfolio_link: data.portfolio_link,
        contact_time: data.contact_time,
        status: 'new'
      }
    ]);
    return !error;
  } catch (e) {
    console.error('Partner inquiry failed:', e);
    return false;
  }
};

export const getPartnerInquiries = async (): Promise<PartnerInquiry[]> => {
  try {
    const { data } = await supabase.from('partner_inquiries').select('*').order('created_at', { ascending: false });
    return data || [];
  } catch (e) {
    return [];
  }
};

// --- Review Services ---
export const getReviews = async (): Promise<Review[]> => {
  try {
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    return data || [];
  } catch (e) {
    return [];
  }
};

export const submitReview = async (reviewData: any) => {
  try {
    const { error } = await supabase.from('reviews').insert([{
      rating: reviewData.rating,
      title: reviewData.title,
      content: reviewData.content,
      nickname: reviewData.nickname,
      is_anonymous: reviewData.is_anonymous,
      service_tags: reviewData.service_tags,
      status: 'published',
      verified: reviewData.verify_code === 'HOTSTUDIO2024'
    }]);
    return !error;
  } catch (e) {
    return false;
  }
};

export const updateReviewStatus = async (id: string, status: Review['status']) => {
  const { error } = await supabase.from('reviews').update({ status }).eq('id', id);
  return !error;
};

export const toggleReviewFeatured = async (id: string) => {
  const { data: review } = await supabase.from('reviews').select('is_featured').eq('id', id).single();
  if (!review) return false;
  const { error } = await supabase.from('reviews').update({ is_featured: !review.is_featured }).eq('id', id);
  return !error;
};

// --- Site Data (With Robust Fallbacks) ---
export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase.from('projects').select('*').order('order_index', { ascending: true });
    if (error || !data || data.length === 0) throw new Error();
    return data;
  } catch (e) {
    return [
      {
        id: '1',
        created_at: new Date().toISOString(),
        title: '고급 인벤토리 시스템',
        tagline: 'RPG 전용 다용도 인벤토리',
        description: '드래그 앤 드롭 시스템 통합.',
        thumbnail_url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800',
        tech_tags: ['Luau', 'UI'],
        role: 'Full System',
        period: '2일',
        links: { roblox: '#' },
        status: 'completed',
        order_index: 0
      },
      {
        id: '2',
        created_at: new Date().toISOString(),
        title: 'UI/UX 상점 시스템',
        tagline: '모던한 디자인의 게임 내 상점',
        description: '트윈 애니메이션 기반의 매끄러운 UI.',
        thumbnail_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
        tech_tags: ['UI', 'TweenService'],
        role: 'Design & Script',
        period: '4일',
        links: { roblox: '#' },
        status: 'completed',
        order_index: 1
      }
    ];
  }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (error || !data) throw new Error();
    return data;
  } catch (e) {
    return {
      id: '1',
      site_name: "Blanket's Hotstudio",
      hero_headline: "로블록스의 한계를 넘는\n프리미엄 시스템 개발",
      hero_subtitle: "안녕하세요 개발자 Blanket 입니다. 단순한 코딩을 넘어 플레이어의 경험을 설계합니다.",
      accent_color: "#8B5CF6",
      updated_at: new Date().toISOString()
    };
  }
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
