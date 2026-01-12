"use client";

import { useFavorites } from '@/shared/providers';
import { useCart } from '@/shared/providers';
import { useToast } from '@/shared/ui';
import { useRouter } from 'next/navigation';

export function useFavoritesPage() {
  const router = useRouter();
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddAllToCart = () => {
    if (favorites.length === 0) return;
    
    favorites.forEach((book) => {
      addToCart(book);
    });
    addToast(`${favorites.length} books added to cart!`, 'success');
  };

  const handleRemoveFavorite = (bookId: string) => {
    removeFromFavorites(bookId);
    addToast('Removed from favorites', 'info');
  };

  const handleGoBack = () => {
    router.back();
  };

  const isEmpty = favorites.length === 0;
  const count = favorites.length;

  return {
    // Data
    favorites,
    isEmpty,
    count,

    // Actions
    handleAddAllToCart,
    handleRemoveFavorite,
    handleGoBack,
  };
}
