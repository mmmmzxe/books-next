'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';
import { ROUTES } from '@/core';
import { BookCard } from '@/shared/ui/book-card';
import { MOCK_BOOKS } from '@/shared/hooks/mock-books';

import { HomeBook } from '@/shared/types/home';

interface FeaturedBooksSectionProps {
  books?: HomeBook[];
}

export function FeaturedBooksSection({
  books = MOCK_BOOKS,
}: FeaturedBooksSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium tracking-wider text-[#7A7A7A]">
            SOME QUALITY ITEMS
          </p>
          <h2 className="font-serif text-4xl font-normal text-[#222222]">
            Featured Books
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href={ROUTES.BOOKS_SHOP}>
            <Button variant="ghost">View All Products →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
