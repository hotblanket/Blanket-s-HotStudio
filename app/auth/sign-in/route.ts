
import { createClient } from '../../../lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const returnTo = String(formData.get('returnTo') || '/');

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}&returnTo=${returnTo}`, request.url),
      { status: 303 }
    );
  }

  return NextResponse.redirect(new URL(returnTo, request.url), { status: 303 });
}
