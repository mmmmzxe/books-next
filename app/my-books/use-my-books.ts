import { useState } from 'react';
import { useBooks, useDeleteBook } from '@/domains/books';
import { useSession } from '@/domains/auth';
import { useToast } from '@/shared/ui';
import type { BookFilters } from '@/core/types';

export function useMyBooks() {
  const { data: user } = useSession();
  const [filters, setFilters] = useState<BookFilters>({
    search: '',
    sortBy: undefined,
    category: undefined,
    page: 1,
    pageSize: 12,
    authorId: user?.id,
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [minRating, setMinRating] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, isLoading, error } = useBooks({
    ...filters,
    authorId: user?.id,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  });
  const { mutate: deleteBook } = useDeleteBook();
  const { addToast } = useToast();

  const handleSort = (sortBy: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sortBy as BookFilters['sortBy'],
      page: 1,
    }));
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => {
      const newGenres = prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre];

      setFilters((prevFilters) => ({
        ...prevFilters,
        category:
          newGenres.length > 0
            ? (newGenres[0] as BookFilters['category'])
            : undefined,
        page: 1,
      }));

      return newGenres;
    });
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    setFilters((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const handleDeleteBook = (bookId: string) => {
    const book = data?.books.find((b) => b.id === bookId);
    const bookTitle = book?.title || 'this book';

    const confirmed = window.confirm(
      `Are you sure you want to delete "${bookTitle}"?`,
    );

    if (confirmed) {
      deleteBook(bookId, {
        onSuccess: () => {
          addToast('Book deleted successfully', 'success');
        },
        onError: (error) => {
          addToast(error.message || 'Failed to delete book', 'error');
        },
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      sortBy: undefined,
      category: undefined,
      page: 1,
      pageSize: 12,
      authorId: user?.id,
    });
    setSelectedGenres([]);
    setPriceRange([0, 50]);
    setMinRating(0);
  };

  const booksFromApi = data?.books || [];
  const books =
    minRating > 0
      ? booksFromApi.filter((book) => (book.rating || 0) >= minRating)
      : booksFromApi;

  return {
    books,
    totalPages: data ? Math.ceil(data.total / data.pageSize) : 1,
    currentPage: filters.page || 1,
    isLoading,
    error,
    user,
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
  };
}
