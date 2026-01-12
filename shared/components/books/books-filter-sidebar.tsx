'use client';

import { BOOK_CATEGORIES } from '@/core';

interface BooksFilterSidebarProps {
  selectedGenres: string[];
  priceRange: [number, number];
  minRating: number;
  onResetFilters: () => void;
  onToggleGenre: (genre: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onRatingChange: (rating: number) => void;
}

export function BooksFilterSidebar({
  selectedGenres,
  priceRange,
  minRating,
  onResetFilters,
  onToggleGenre,
  onPriceChange,
  onRatingChange,
}: BooksFilterSidebarProps) {
  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-8 space-y-6">
        {/* Filters Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#222222]">Filters</h2>
          <button
            onClick={onResetFilters}
            className="text-sm text-[#74642F] hover:underline"
          >
            Clear All
          </button>
        </div>

        {/* Genre Filter */}
        <div>
          <h3 className="mb-3 text-sm font-bold text-[#222222]">Genre</h3>
          <div className="space-y-2">
            {BOOK_CATEGORIES.map((genre) => (
              <label
                key={genre}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => onToggleGenre(genre)}
                  className="h-4 w-4 rounded border-[#D0D0D0] text-[#222222] focus:ring-[#74642F]"
                />
                <span className="text-sm text-[#7A7A7A]">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="mb-3 text-sm font-bold text-[#222222]">Price Range</h3>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
              className="w-full accent-[#222222]"
            />
            <div className="flex items-center justify-between text-sm text-[#7A7A7A]">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Minimum Rating */}
        <div>
          <h3 className="mb-3 text-sm font-bold text-[#222222]">Minimum Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => onRatingChange(rating)}
                  className="h-4 w-4 border-[#D0D0D0] text-[#222222] focus:ring-[#74642F]"
                />
                <div className="flex items-center gap-1">
                  <span className="text-sm text-[#7A7A7A]">{rating}+</span>
                  <svg
                    className="h-4 w-4 fill-[#FFC107] text-[#FFC107]"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
