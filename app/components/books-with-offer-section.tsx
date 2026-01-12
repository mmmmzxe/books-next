'use client';

import Link from 'next/link';
import { Button } from '@/shared/ui';
import { ROUTES } from '@/core';
import { BookCard } from '@/shared/ui';

import { HomeBook } from '@/shared/types/home';

interface BooksWithOfferSectionProps {
  books: HomeBook[];
}

export function BooksWithOfferSection({
  books,
}: BooksWithOfferSectionProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-4xl font-normal text-[#222222]">
            Books With Offer
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
