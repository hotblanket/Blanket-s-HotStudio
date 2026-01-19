
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  // 환경 변수가 없을 경우 브라우저 에러를 방지하기 위해 기본값 세팅
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  );
};
