
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// --- Mock Supabase Implementation for Demo Mode ---
const createMockSupabase = () => {
  console.warn("⚠️ Supabase 환경 변수가 없습니다. '데모 모드(localStorage)'로 동작합니다.");

  const mockDb: Record<string, any[]> = {
    projects: [
      {
        id: '1',
        title: '고급 인벤토리 시스템',
        tagline: 'RPG 전용 다용도 인벤토리',
        description: '드래그 앤 드롭 시스템 통합 및 최적화된 Luau 스크립트.',
        thumbnail_url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800',
        tech_tags: ['Luau', 'UI', 'DataStore'],
        role: 'Lead Dev',
        period: '3 Days',
        links: { roblox: '#' },
        status: 'completed',
        order_index: 0,
        created_at: new Date().toISOString()
      }
    ],
    site_settings: [{
      id: '1',
      site_name: "Blanket's Hotstudio",
      hero_headline: "로블록스의 한계를 넘는\n프리미엄 시스템 개발",
      hero_subtitle: "안녕하세요 개발자 Blanket 입니다. 단순한 코딩을 넘어 플레이어의 경험을 설계합니다.",
      accent_color: "#8B5CF6",
      updated_at: new Date().toISOString()
    }],
    profiles: []
  };

  const getStorage = (key: string) => JSON.parse(localStorage.getItem(`mock_${key}`) || '[]');
  const setStorage = (key: string, val: any[]) => localStorage.setItem(`mock_${key}`, JSON.stringify(val));

  return {
    isMock: true,
    auth: {
      getUser: async () => {
        const user = JSON.parse(localStorage.getItem('mock_user') || 'null');
        return { data: { user }, error: null };
      },
      onAuthStateChange: (cb: any) => {
        const user = JSON.parse(localStorage.getItem('mock_user') || 'null');
        cb('SIGNED_IN', { user });
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
      signInWithPassword: async ({ email }: any) => {
        const user = { id: 'mock-id', email, role: 'authenticated' };
        localStorage.setItem('mock_user', JSON.stringify(user));
        // 관리자 모드 시뮬레이션
        if (email.includes('admin')) {
          const profiles = getStorage('profiles');
          if (!profiles.find((p: any) => p.id === 'mock-id')) {
            profiles.push({ id: 'mock-id', role: 'admin', display_name: 'Admin' });
            setStorage('profiles', profiles);
          }
        }
        return { data: { user }, error: null };
      },
      signUp: async ({ email }: any) => {
        const user = { id: 'mock-id', email, role: 'authenticated' };
        localStorage.setItem('mock_user', JSON.stringify(user));
        return { data: { user }, error: null };
      },
      signOut: async () => {
        localStorage.removeItem('mock_user');
        return { error: null };
      }
    },
    from: (table: string) => ({
      select: (query: string = '*') => ({
        order: () => ({
          single: async () => ({ data: mockDb[table]?.[0] || null, error: null }),
          then: (resolve: any) => resolve({ data: getStorage(table).length ? getStorage(table) : (mockDb[table] || []), error: null })
        }),
        eq: (col: string, val: any) => ({
          single: async () => {
            const data = getStorage(table).find((item: any) => item[col] === val) || mockDb[table]?.find((item: any) => item[col] === val);
            return { data, error: null };
          }
        }),
        then: (resolve: any) => resolve({ data: getStorage(table).length ? getStorage(table) : (mockDb[table] || []), error: null })
      }),
      insert: async (val: any) => {
        const data = getStorage(table);
        data.push({ id: Math.random().toString(), created_at: new Date().toISOString(), ...val[0] });
        setStorage(table, data);
        return { error: null };
      },
      update: (val: any) => ({
        eq: async (col: string, id: any) => {
          const data = getStorage(table);
          const idx = data.findIndex((item: any) => item[col] === id);
          if (idx !== -1) data[idx] = { ...data[idx], ...val };
          setStorage(table, data);
          return { error: null };
        }
      })
    })
  } as any;
};

export const createClient = () => {
  const getEnv = (key: string): string => {
    try {
      const meta = import.meta as any;
      if (typeof meta !== 'undefined' && meta.env && meta.env[key]) return meta.env[key];
      if (typeof process !== 'undefined' && process.env && (process.env as any)[key]) return (process.env as any)[key];
      if (typeof window !== 'undefined' && (window as any).process?.env?.[key]) return (window as any).process.env[key];
    } catch (e) {}
    return '';
  };

  const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL') || getEnv('VITE_SUPABASE_URL');
  const supabaseAnonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    return createMockSupabase();
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
