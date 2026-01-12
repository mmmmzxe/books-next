import { NextResponse } from 'next/server';
import { MOCK_BOOKS } from '@/shared/hooks/mock-books';
import { ARTICLES } from '@/shared/hooks/mock-articles';

export async function GET() {
  try {
    const featuredBooks = MOCK_BOOKS.filter((b) => b.isFeatured).slice(0, 4);
    const bestSelling = MOCK_BOOKS.find((b) => b.isPopular) || MOCK_BOOKS[0];
    const popularBooks = MOCK_BOOKS.filter((b) => b.isPopular).slice(0, 8);
    const booksWithOffer = MOCK_BOOKS.filter((b) => b.hasOffer).slice(0, 4);

    return NextResponse.json(
      {
        featuredBooks,
        bestSelling,
        popularBooks,
        booksWithOffer,
        articles: ARTICLES,
      },
      { status: 200 }
    );

  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

