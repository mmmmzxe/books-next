import { useState, useEffect } from 'react';
import { useBooks } from '@/domains/books';
import type { BookFilters } from '@/core/types';
import { useFavorites } from '@/shared/providers';

export function useBooksShop() {
  const [filters, setFilters] = useState<BookFilters>({
    search: '',
    sortBy: undefined,
    category: undefined,
    page: 1,
    pageSize: 12,
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [minRating, setMinRating] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Debounced filters to prevent excessive API calls
  const [debouncedFilters, setDebouncedFilters] = useState({
    priceRange,
    minRating,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters({ priceRange, minRating });
    }, 400);

    return () => clearTimeout(timer);
  }, [priceRange, minRating]);

  const { isFavorite } = useFavorites();

  const { data, isLoading, isFetching, error } = useBooks({
    ...filters,
    minPrice: debouncedFilters.priceRange[0],
    maxPrice: debouncedFilters.priceRange[1],
    minRating: debouncedFilters.minRating,
  });

  const handleSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleSort = (sortBy: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sortBy as BookFilters['sortBy'],
    }));
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => {
      const newGenres = prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre];
      
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: newGenres.length > 0 ? (newGenres[0] as BookFilters['category']) : undefined,
        page: 1,
      }));
      
      return newGenres;
    });
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      sortBy: undefined,
      category: undefined,
      page: 1,
      pageSize: 12,
    });
    setSelectedGenres([]);
    setPriceRange([0, 50]);
    setMinRating(0);
  };

  const books = data?.books || [];

  return {
    books,
    totalPages: data ? Math.ceil(data.total / data.pageSize) : 1,
    currentPage: filters.page || 1,
    isLoading,
    isFetching,
    error,
    filters,
    selectedGenres,
    priceRange,
    minRating,
    viewMode,
    isFavorite,
    handleSearch,
    handleSort,
    toggleGenre,
    handlePriceChange,
    handleRatingChange,
    toggleViewMode,
    resetFilters,
    setFilters,
  };
}
