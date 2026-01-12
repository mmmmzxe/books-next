export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  sessionCookieName: 'books-shop-session',
  sessionSecret: process.env.SESSION_SECRET || 'books-shop-secret-key-change-in-production',
} as const;
