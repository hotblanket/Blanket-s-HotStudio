
export type ProjectStatus = 'in_progress' | 'completed';
export type InquiryStatus = 'new' | 'in_progress' | 'done';
export type ReviewStatus = 'pending' | 'published' | 'hidden';

export interface Project {
  id: string;
  created_at: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail_url: string;
  tech_tags: string[];
  role: string;
  period: string;
  links: { roblox?: string; video?: string; github?: string; };
  status: ProjectStatus;
  order_index: number;
}

export interface Review {
  id: string;
  created_at: string;
  rating: number;
  title: string;
  content: string;
  nickname: string;
  is_anonymous: boolean;
  service_tags: string[];
  request_month?: string;
  status: ReviewStatus;
  is_featured: boolean;
  verified: boolean;
  helpful_count: number;
}

export interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  contact_method: 'email';
  email: string;
  message: string;
  budget_range?: string;
  deadline?: string;
  reference_link?: string;
  status: InquiryStatus;
  user_id?: string;
}

export interface PartnerInquiry {
  id: string;
  created_at: string;
  user_id: string;
  partner_type: '기획' | '개발' | '디자인' | '모델링' | '애니메이션' | '기타';
  intro: string;
  proposal: string;
  portfolio_link?: string;
  contact_time?: string;
  status: 'new' | 'in_progress' | 'done';
  admin_note?: string;
}

export interface SiteSettings {
  id: string;
  site_name: string;
  hero_headline: string;
  hero_subtitle: string;
  accent_color: string;
  updated_at: string;
}
