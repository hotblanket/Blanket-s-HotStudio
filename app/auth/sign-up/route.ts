
import { createClient } from '../../../lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${new URL(request.url).origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url),
      { status: 303 }
    );
  }

  return NextResponse.redirect(
    new URL('/login?message=회원가입이 완료되었습니다. 이메일을 확인하거나 로그인해주세요.', request.url),
    { status: 303 }
  );
}
