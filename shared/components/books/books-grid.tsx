'use client';

import { BookCard } from '@/shared/ui';
import type { Book } from '@/core/types';

interface BooksGridProps {
  books: Book[];
  viewMode: 'grid' | 'list';
  showActions?: boolean;
  onDelete?: (bookId: string) => void;
}

export function BooksGrid({
  books,
  viewMode,
  showActions,
  onDelete,
}: BooksGridProps) {
  if (viewMode === 'grid') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            showActions={showActions}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <div key={book.id} className="w-full">
          <BookCard
            book={book}
            showActions={showActions}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}
