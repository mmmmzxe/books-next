import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/shared/ui';
import { ROUTES } from '@/core';
import { MOCK_BOOKS } from '@/shared/hooks/mock-books';

import { HomeBook } from '@/shared/types/home';

interface BestSellingBookSectionProps {
  book?: HomeBook;
}

export function BestSellingBookSection({ book = MOCK_BOOKS[0] }: BestSellingBookSectionProps) {
  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/3">
            <div className="h-64 sm:h-80 md:h-100 relative w-full">
              <Image
                src={book.thumbnail}
                alt={book.title}
                fill
                className="object-contain rounded-md"
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3 text-center lg:text-left">

            <p className="mb-2 text-sm font-medium tracking-wider text-[#7A7A7A]">
              BY {book.authorName?.toUpperCase()}
            </p>
            <h2 className="mb-6 font-serif text-4xl font-normal text-[#222222]">
              Best Selling Book
            </h2>
            <div className="mb-1 flex items-baseline gap-3">
              <h3 className="text-xl font-medium text-[#222222]">
                {book.title}
              </h3>
            </div>
            <p className="mb-6 max-w-xl text-[#7A7A7A] leading-relaxed">
              {book.description}
            </p>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-3xl font-bold text-[#74642F]">
                $ {book.price.toFixed(2)}
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-[#74642F]">★</span>
                ))}
              </div>
            </div>
            <Link href={ROUTES.BOOKS_SHOP}>
              <Button>SHOP IT NOW →</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
