import { NextResponse } from 'next/server';
import { signToken, validateAdminCredentials } from '@/lib/auth';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }
    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const token = await signToken({ username, role: 'admin' });
    const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
    response.cookies.set('nexora_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
    });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
