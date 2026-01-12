'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Book as BookIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { ROUTES } from '@/core';
import type { Book } from '@/core/types';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/books?search=${encodeURIComponent(query)}&pageSize=5`);
        const data = await res.json();
        setResults(data.books || []);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-150 flex flex-col bg-white">
      {/* Search Header */}
      <div className="flex h-20 items-center justify-between border-b border-neutral-100 px-6 md:px-12">
        <div className="flex flex-1 items-center gap-4">
          <Search size={24} className="text-black" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for books by title..."
            className="w-full bg-transparent font-serif text-black text-2xl outline-none placeholder:text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
          />
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 hover:bg-neutral-100 transition-colors"
        >
          <X size={24} className="text-black" />
        </button>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12">
        <div className="mx-auto max-w-3xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#74642F]">
                Results found ({results.length})
              </p>
              <div className="divide-y divide-neutral-100">
                {results.map((book) => (
                  <Link
                    key={book.id}
                    href={`${ROUTES.BOOKS_SHOP}/${book.id}`}
                    onClick={onClose}
                    className="group flex items-center gap-6 py-4 transition-colors hover:bg-neutral-50"
                  >
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded bg-neutral-100 shadow-sm">
                      {book.thumbnail ? (
                        <Image
                          src={book.thumbnail}
                          alt={book.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <BookIcon size={20} className="text-neutral-300" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium text-neutral-900 group-hover:text-[#74642F]">
                        {book.title}
                      </h4>
                      <p className="text-sm text-neutral-500">{book.authorName}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : query.trim() ? (
            <div className="py-12 text-center">
              <p className="text-lg text-neutral-400">No books found for &quot;{query}&quot;</p>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-300">
                Start typing to search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
