
-- 1. 프로필 테이블 생성
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  display_name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 파트너 문의 테이블 생성
CREATE TABLE IF NOT EXISTS partner_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  partner_type TEXT NOT NULL,
  intro TEXT NOT NULL,
  proposal TEXT NOT NULL,
  portfolio_link TEXT,
  contact_time TEXT,
  status TEXT DEFAULT 'new',
  admin_note TEXT
);

-- 3. 커미션 의뢰(문의) 테이블 생성
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  contact_method TEXT DEFAULT 'email',
  contact_value TEXT NOT NULL,
  message TEXT NOT NULL,
  budget_range TEXT,
  deadline TEXT,
  reference_link TEXT,
  status TEXT DEFAULT 'new',
  admin_note TEXT,
  user_id UUID REFERENCES auth.users(id)
);

-- 4. 리뷰 테이블 생성
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  nickname TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT FALSE,
  service_tags TEXT[],
  status TEXT DEFAULT 'published',
  is_featured BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0
);

-- 5. RLS 설정 (기본)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 6. 트리거: 회원가입 시 자동으로 profiles에 레코드 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'display_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. 관리자 권한 체크용 헬퍼 함수
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. 정책 설정 예시 (관리자 전용 접근)
CREATE POLICY "Admins can do everything on inquiries" ON inquiries FOR ALL TO authenticated USING (is_admin());
CREATE POLICY "Users can insert inquiries" ON inquiries FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Users can view own inquiries" ON inquiries FOR SELECT TO authenticated USING (auth.uid() = user_id);
