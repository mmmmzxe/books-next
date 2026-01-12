'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Book } from '@/core/types';

interface FavoritesContextType {
  favorites: Book[];
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  toggleFavorite: (book: Book) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        // eslint-disable-next-line
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, isInitialized]);

  const addToFavorites = (book: Book) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((fav) => fav.id === book.id);
      if (exists) return prevFavorites;
      return [...prevFavorites, book];
    });
  };

  const removeFromFavorites = (bookId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((book) => book.id !== bookId)
    );
  };

  const isFavorite = (bookId: string) => {
    return favorites.some((book) => book.id === bookId);
  };

  const toggleFavorite = (book: Book) => {
    if (isFavorite(book.id)) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
