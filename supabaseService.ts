
import { createClient } from './lib/supabase/client';
import { Project, SiteSettings, Review, PartnerInquiry } from './types';

const supabase = createClient();

export const submitInquiry = async (inquiryData: any): Promise<boolean> => {
  try {
    const { error } = await supabase.from('inquiries').insert([{
      name: inquiryData.name,
      contact_method: 'email',
      contact_value: inquiryData.email,
      message: inquiryData.message,
      budget_range: inquiryData.budget_range,
      deadline: inquiryData.deadline,
      status: 'new'
    }]);
    return !error;
  } catch (e) {
    return false;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data } = await supabase.from('projects').select('*').order('order_index', { ascending: true });
    if (data && data.length > 0) return data;
    throw new Error();
  } catch (e) {
    return [
      {
        id: '1',
        created_at: new Date().toISOString(),
        title: '고급 인벤토리 시스템',
        tagline: 'RPG 전용 다용도 인벤토리',
        description: '최적화된 Luau 스크립트.',
        thumbnail_url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800',
        tech_tags: ['Luau', 'UI'],
        role: 'Lead Dev',
        period: '3일',
        links: { roblox: '#' },
        status: 'completed',
        order_index: 0
      }
    ];
  }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const { data } = await supabase.from('site_settings').select('*').single();
    if (data) return data;
    throw new Error();
  } catch (e) {
    return {
      id: '1',
      site_name: "Blanket's Hotstudio",
      hero_headline: "로블록스의 한계를 넘는\n프리미엄 시스템 개발",
      hero_subtitle: "사용자 경험을 설계하는 로블록스 개발자 Blanket입니다.",
      accent_color: "#8B5CF6",
      updated_at: new Date().toISOString()
    };
  }
};

export const getReviews = async (): Promise<Review[]> => {
  const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
  return data || [];
};

export const getPartnerInquiries = async (): Promise<PartnerInquiry[]> => {
  const { data } = await supabase.from('partner_inquiries').select('*').order('created_at', { ascending: false });
  return data || [];
};

export const submitPartnerInquiry = async (data: any) => {
  const { error } = await supabase.from('partner_inquiries').insert([data]);
  return !error;
};

export const submitReview = async (data: any) => {
  const { error } = await supabase.from('reviews').insert([data]);
  return !error;
};

export const updateReviewStatus = async (id: string, status: string) => {
  const { error } = await supabase.from('reviews').update({ status }).eq('id', id);
  return !error;
};

export const toggleReviewFeatured = async (id: string) => {
  const { data: current } = await supabase.from('reviews').select('is_featured').eq('id', id).single();
  const { error } = await supabase.from('reviews').update({ is_featured: !current?.is_featured }).eq('id', id);
  return !error;
};
