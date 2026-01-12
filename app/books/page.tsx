
"use client";

import { useState } from 'react';
import { ErrorState, Button } from '@/shared/ui';
import { BooksFilterSidebar, BooksHeader, BooksGrid } from '@/shared/components/books';
import { useBooksShop } from './use-books-shop';
import { Filter, X } from 'lucide-react';

export default function BooksShopPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    books,
    isLoading,
    isFetching,
    error,
    filters,
    selectedGenres,
    priceRange,
    minRating,
    viewMode,
    handleSort,
    toggleGenre,
    handlePriceChange,
    handleRatingChange,
    toggleViewMode,
    resetFilters,
  } = useBooksShop();

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="mb-6 lg:hidden">
          <Button 
            variant="outline" 
            onClick={() => setIsSidebarOpen(true)}
            className="w-full flex items-center justify-center gap-2"
          >
            <Filter size={18} />
            Filters
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Responsive Overlay on Mobile */}
          <div 
            className={`fixed inset-0 z-100 bg-black/40 transition-opacity duration-300 lg:relative lg:z-0 lg:bg-transparent lg:opacity-100 lg:visible ${
              isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:visible'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <div 
              className={`absolute left-0 top-0 h-full w-[300px] bg-white p-6 transition-transform duration-300 ease-in-out lg:relative lg:h-auto lg:w-64 lg:translate-x-0 lg:bg-transparent lg:p-0 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between lg:hidden">
                <span className="font-serif text-xl">Filters</span>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <BooksFilterSidebar
                selectedGenres={selectedGenres}
                priceRange={priceRange}
                minRating={minRating}
                onResetFilters={resetFilters}
                onToggleGenre={toggleGenre}
                onPriceChange={handlePriceChange}
                onRatingChange={handleRatingChange}
              />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            <BooksHeader
              totalBooks={books.length}
              sortBy={filters.sortBy}
              viewMode={viewMode}
              onSort={handleSort}
              onToggleViewMode={toggleViewMode}
            />

            <div className="relative">
              {(isLoading || isFetching) && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-100 border-t-[#74642F]" />
                </div>
              )}
              <BooksGrid
                books={books}
                viewMode={viewMode}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

