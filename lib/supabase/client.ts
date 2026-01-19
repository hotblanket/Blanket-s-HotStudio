
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  if (typeof window === 'undefined') return '';
  // @ts-ignore
  return window.process?.env?.[key] || (import.meta as any).env?.[key] || '';
};

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL') || getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_ANON_KEY');

const createMockSupabase = () => {
  console.warn("⚠️ Supabase 설정이 없어 데모 모드로 동작합니다.");
  return {
    isMock: true,
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: { email: 'admin@demo.com' } }, error: null }),
      signOut: async () => ({ error: null })
    },
    from: (table: string) => ({
      select: () => ({
        order: () => ({
          single: async () => ({ data: null, error: null }),
          then: (res: any) => res({ data: [], error: null })
        }),
        then: (res: any) => res({ data: [], error: null })
      }),
      insert: async () => ({ error: null }),
      update: () => ({ eq: async () => ({ error: null }) })
    })
  } as any;
};

export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    return createMockSupabase();
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
