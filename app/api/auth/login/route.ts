import { NextResponse } from 'next/server';
import { STATIC_CREDENTIALS } from '@/core/config';
import { createSession, setSessionCookie } from '@/core/auth';
import type { User } from '@/core/types';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (
      email === STATIC_CREDENTIALS.email &&
      password === STATIC_CREDENTIALS.password
    ) {
      // Create user object
      const user: User = {
        id: '1',
        email: STATIC_CREDENTIALS.email,
        name: 'Admin User',
      };

      // Create session token
      const token = await createSession(user);

      // Set cookie
      await setSessionCookie(token);

      return NextResponse.json({
        success: true,
        user,
      });
    }

    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  } catch {
    return NextResponse.json(
      { message: 'Authentication failed' },

      { status: 500 }
    );
  }
}
