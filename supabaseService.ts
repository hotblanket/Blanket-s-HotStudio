import { Project, SiteSettings, Review, Inquiry, PartnerInquiry } from './types';
import { submitInquiryAction } from './app/actions/inquiry';

// Mock DB State
let MOCK_REVIEWS: Review[] = [];
let MOCK_PARTNER_INQUIRIES: PartnerInquiry[] = [];

// --- Auth Services ---
export const getCurrentUser = () => {
  const session = localStorage.getItem('userSession');
  return session ? JSON.parse(session) : null;
};

export const logout = () => {
  localStorage.removeItem('userSession');
  window.location.href = '/#/';
};

// --- Inquiry Services ---
export const submitInquiry = async (inquiryData: any): Promise<boolean> => {
  try {
    const result = await submitInquiryAction(inquiryData);
    return result.success;
  } catch (e) {
    console.error('Failed to submit inquiry through Server Action:', e);
    // Fallback for demo environments where Server Actions might not be fully configured
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  }
};

export const submitPartnerInquiry = async (data: Partial<PartnerInquiry>): Promise<boolean> => {
  const user = getCurrentUser();
  const newInquiry: PartnerInquiry = {
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
    user_id: user?.id || 'anonymous',
    partner_type: data.partner_type || '기타',
    intro: data.intro || '',
    proposal: data.proposal || '',
    portfolio_link: data.portfolio_link,
    contact_time: data.contact_time,
    status: 'new'
  };
  
  MOCK_PARTNER_INQUIRIES = [newInquiry, ...MOCK_PARTNER_INQUIRIES];
  console.log('파트너 문의 저장 완료:', newInquiry);
  return new Promise((resolve) => setTimeout(() => resolve(true), 800));
};

export const getPartnerInquiries = async (): Promise<PartnerInquiry[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PARTNER_INQUIRIES), 400));
};

// --- Review Services ---
export const getReviews = async () => MOCK_REVIEWS;

export const updateReviewStatus = async (id: string, newStatus: Review['status']): Promise<boolean> => {
  MOCK_REVIEWS = MOCK_REVIEWS.map(r => r.id === id ? { ...r, status: newStatus } : r);
  return true;
};

export const toggleReviewFeatured = async (id: string): Promise<boolean> => {
  const review = MOCK_REVIEWS.find(r => r.id === id);
  if (!review) return false;

  const featuredCount = MOCK_REVIEWS.filter(r => r.is_featured && r.status === 'published').length;
  
  if (!review.is_featured && featuredCount >= 3) {
    throw new Error('베스트 리뷰는 최대 3개까지만 지정할 수 있습니다.');
  }
  
  MOCK_REVIEWS = MOCK_REVIEWS.map(r => r.id === id ? { ...r, is_featured: !r.is_featured } : r);
  return true;
};

export const submitReview = async (reviewData: any) => {
  const newReview: Review = {
    id: Math.random().toString(36).substr(2, 9),
    created_at: new Date().toISOString(),
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
  };
  MOCK_REVIEWS = [newReview, ...MOCK_REVIEWS];
  return true;
};

// --- Site Data ---
export const getProjects = async () => [
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

export const getSiteSettings = async () => ({
  id: '1',
  site_name: "Blanket's Hotstudio",
  hero_headline: "로블록스의 한계를 넘는\n프리미엄 시스템 개발",
  hero_subtitle: "안녕하세요 개발자 Blanket 입니다. 단순한 코딩을 넘어 플레이어의 경험을 설계합니다.",
  accent_color: "#8B5CF6",
  updated_at: new Date().toISOString()
});
