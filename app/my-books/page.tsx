"use client";

import { useState } from 'react';
import { Button, LoadingState, ErrorState } from '@/shared/ui';
import { BooksFilterSidebar, BooksHeader, BooksGrid, PaginationControls } from '@/shared/components/books';
import Link from 'next/link';
import { ROUTES } from '@/core';
import { useMyBooks } from './use-my-books';
import { Filter, X } from 'lucide-react';

export default function MyBooksPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    books,
    totalPages,
    currentPage,
    isLoading,
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
    handleDeleteBook,
    resetFilters,
    setFilters,
  } = useMyBooks();

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (isLoading) return <LoadingState message="Loading your books..." />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#222222]">My Books</h1>
            <p className="mt-1 text-[#7A7A7A]">
              Manage your books collection ({books.length || 0})
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              Filters
            </Button>
            <Link href={ROUTES.NEW_BOOK}>
              <Button className="w-full bg-[#74642F] hover:bg-[#5d4f25]">
                + Add New Book
              </Button>
            </Link>
          </div>
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

            {books.length === 0 ? (
              <div className="flex min-h-100 flex-col items-center justify-center">
                <p className="mb-4 text-[#7A7A7A]">
                  You haven&apos;t created any books yet
                </p>
                <Link href={ROUTES.NEW_BOOK}>
                  <Button>Create Your First Book</Button>
                </Link>
              </div>
            ) : (
              <>
                <BooksGrid
                  books={books}
                  viewMode={viewMode}
                  showActions={true}
                  onDelete={handleDeleteBook}
                />

                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

