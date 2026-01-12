export const BOOK_CATEGORIES = [
  'Technology',
  'Business',
  'Self-Help',
  'Productivity',
  'Science',
  'History',
  'Fantasy',
  'Biography',
  'Fiction',
  'Psychology',
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];

export const STATIC_CREDENTIALS = {
  email: 'admin@books.com',
  password: 'admin123',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  BOOKS_SHOP: '/books',
  MY_BOOKS: '/my-books',
  NEW_BOOK: '/books/new',
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/edit',
  CART: '/cart',
  FAVORITES: '/favorites',
} as const;

export const API_ROUTES = {
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_SESSION: '/api/auth/session',
  BOOKS: '/api/books',
  USER: '/api/user',
} as const;
