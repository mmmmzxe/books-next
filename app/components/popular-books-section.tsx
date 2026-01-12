"use client";

import { useState } from 'react';
import { BookCard } from '@/shared/ui';
import { BOOK_CATEGORIES } from '@/core';
import { MOCK_BOOKS } from '@/shared/hooks/mock-books';

import { HomeBook } from '@/shared/types/home';

interface PopularBooksSectionProps {
  books?: HomeBook[];
}

export function PopularBooksSection({ books = MOCK_BOOKS }: PopularBooksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All Genre');

  const tabs = ['All Genre', ...BOOK_CATEGORIES];

  const filtered = (() => {
    let list = books;
    if (activeCategory !== 'All Genre') {
      list = list.filter((b) => b.category === activeCategory);
    }
    return list;
  })();

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium tracking-wider text-[#7A7A7A]">
            READ BY USERS
          </p>
          <h2 className="font-serif text-4xl font-normal text-[#222222]">
            Popular Books
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex justify-start md:justify-center gap-8 border-b-2 border-[#E0E0E0] min-w-max md:w-full">
            {tabs.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  setActiveCategory(genre);
                }}
                className={`pb-3 text-sm font-medium whitespace-nowrap ${
                  genre === activeCategory ? 'border-b-2 border-[#222222] text-[#222222]' : 'text-[#7A7A7A]'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
