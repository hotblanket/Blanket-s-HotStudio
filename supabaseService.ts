
import { createClient } from './lib/supabase/client';
import { Project, SiteSettings, Review, PartnerInquiry } from './types';

const supabase = createClient();

// --- Auth Services ---
// Fix for AdminDashboard.tsx: added getCurrentUser
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// --- Inquiry Services (로그인 없이 가능) ---
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
        reference_link: inquiryData.reference_link,
        status: 'new'
      }
    ]);

    if (error) throw error;
    return true;
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

    if (error) throw error;
    return true;
  } catch (e) {
    console.error('Partner inquiry failed:', e);
    return false;
  }
};

// Fix for AdminDashboard.tsx: added getPartnerInquiries
export const getPartnerInquiries = async (): Promise<PartnerInquiry[]> => {
  try {
    const { data, error } = await supabase
      .from('partner_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    return data || [];
  } catch (e) {
    console.error('Failed to fetch partner inquiries:', e);
    return [];
  }
};

// --- Review Services ---
export const getReviews = async (): Promise<Review[]> => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
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
      is_featured: false,
      verified: reviewData.verify_code === 'HOTSTUDIO2024',
      helpful_count: 0
    }]);
    return !error;
  } catch (e) {
    return false;
  }
};

// Fix for ReviewManager.tsx: added updateReviewStatus
export const updateReviewStatus = async (id: string, status: Review['status']) => {
  try {
    const { error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', id);
    return !error;
  } catch (e) {
    console.error('Update review status failed:', e);
    return false;
  }
};

// Fix for ReviewManager.tsx: added toggleReviewFeatured
export const toggleReviewFeatured = async (id: string) => {
  try {
    const { data: review, error: fetchError } = await supabase
      .from('reviews')
      .select('is_featured')
      .eq('id', id)
      .single();
    
    if (fetchError || !review) throw new Error('리뷰를 찾을 수 없습니다.');

    const { error: updateError } = await supabase
      .from('reviews')
      .update({ is_featured: !review.is_featured })
      .eq('id', id);
    
    if (updateError) throw updateError;
    return true;
  } catch (e) {
    console.error('Toggle review featured failed:', e);
    throw e;
  }
};

// --- Site Data ---
export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });
      
    if (error || !data || data.length === 0) throw new Error('No projects');
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
        status: 'completed' as const,
        order_index: 0
      }
    ];
  }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (error || !data) throw new Error('No settings');
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
