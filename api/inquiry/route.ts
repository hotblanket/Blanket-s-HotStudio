/* 
DEPRECATED: This API route has been replaced by the Server Action at /app/actions/inquiry.ts
It is kept here for reference or backward compatibility during the transition.
*/

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ 
    success: false, 
    error: 'This API route is deprecated. Please use the Server Action instead.' 
  }, { status: 410 });
}
