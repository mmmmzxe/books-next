import { NextResponse } from 'next/server';
import { requireAuth } from '@/core/auth';
import type { Book, CreateBookDto } from '@/core/types';
import { MOCK_BOOKS } from '@/shared/hooks/mock-books';
import { BOOK_CATEGORIES, type BookCategory } from '@/core/config';

// Standardized mock books storage (in production, use a database)
const books: Book[] = MOCK_BOOKS.map((b) => ({
  id: b.id ?? Date.now().toString(),
  title: b.title,
  description: b.description || '',
  price: b.price || 0,
  category: (b.category && (BOOK_CATEGORIES as readonly string[]).includes(b.category)) ? b.category as BookCategory : BOOK_CATEGORIES[0],
  thumbnail: b.thumbnail,
  rating: b.rating || 0,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorId: (b as any).authorId || '1',
  authorName: b.authorName || 'Admin User',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export async function GET(request: Request) {
  try {
    // Public endpoint for searching books

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');
    const minRating = parseFloat(searchParams.get('minRating') || '0');
    const sortBy = searchParams.get('sortBy') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');
    const authorId = searchParams.get('authorId') || '';

    // Filter books
    let filteredBooks = [...books];

    if (search) {
      filteredBooks = filteredBooks.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredBooks = filteredBooks.filter((book) => book.category === category);
    }

    if (authorId) {
      filteredBooks = filteredBooks.filter((book) => book.authorId === authorId);
    }

    if (minRating > 0) {
      filteredBooks = filteredBooks.filter((book) => (book.rating || 0) >= minRating);
    }

    filteredBooks = filteredBooks.filter(
      (book) => book.price >= minPrice && book.price <= maxPrice
    );

    // Sort books
    if (sortBy === 'title-asc') {
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'price-asc') {
      filteredBooks.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filteredBooks.sort((a, b) => b.price - a.price);
    }

    // Paginate
    const total = filteredBooks.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    return NextResponse.json({
      books: paginatedBooks,
      total,
      page,
      pageSize,
    });
  } catch {
    return NextResponse.json({ message: 'Failed to fetch books' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const session = await requireAuth();
    const data: CreateBookDto = await request.json();

    const newBook: Book = {
      id: Date.now().toString(),
      ...data,
      authorId: session.user.id,
      authorName: session.user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    books.push(newBook);

    return NextResponse.json(newBook, { status: 201 });
  } catch {

    return NextResponse.json(
      { message: 'Failed to create book' },
      { status: 500 }
    );
  }
}

