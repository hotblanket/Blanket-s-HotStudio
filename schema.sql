-- 파트너 문의 테이블 생성
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

-- 커미션 의뢰(문의) 테이블 생성
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

-- RLS 설정 (partner_inquiries)
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own partner inquiries" 
ON partner_inquiries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Logged in users can submit partner inquiries" 
ON partner_inquiries FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins have full access to partner inquiries" 
ON partner_inquiries FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- RLS 설정 (inquiries)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiries" 
ON inquiries FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view own inquiries" 
ON inquiries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins have full access to inquiries" 
ON inquiries FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
