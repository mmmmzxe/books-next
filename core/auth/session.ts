import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { env } from '../config';
import type { Session, User } from '../types';

const secretKey = new TextEncoder().encode(env.sessionSecret);

export async function createSession(user: User): Promise<string> {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

  const token = await new SignJWT({ user, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secretKey);

  return token;
}

export async function verifySession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as Session;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(env.sessionCookieName)?.value;

  if (!token) {
    return null;
  }

  return verifySession(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(env.sessionCookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(env.sessionCookieName);
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}
