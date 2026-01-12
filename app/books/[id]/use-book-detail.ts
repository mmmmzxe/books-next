"use client";

import { useBook, useDeleteBook, useBooks } from '@/domains/books';
import { useSession } from '@/domains/auth';
import { useCart, useFavorites } from '@/shared/providers';
import { useToast } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/core';
import { Book } from '@/core/types';

export function useBookDetail(bookId: string) {
  const router = useRouter();
  const { data: user } = useSession();
  const { data: book, isLoading, error } = useBook(bookId);
  const { data: relatedData, isLoading: isLoadingRelated } = useBooks({
    category: book?.category,
    pageSize: 4,
  });
  const { mutate: deleteBook } = useDeleteBook();
  const { addToast } = useToast();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleAddToCart = () => {
    if (!book) return;
    addToCart(book);
    addToast('Book added to cart!', 'success');
  };

  const handleToggleFavorite = () => {
    if (!book) return;
    toggleFavorite(book);
    if (isFavorite(book.id)) {
      addToast('Removed from favorites', 'info');
    } else {
      addToast('Added to favorites!', 'success');
    }
  };

  const handleDelete = () => {
    if (!book) return;

    if (user?.id !== book.authorId) {
      addToast('You can only delete your own books', 'error');
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${book.title}"?`
    );

    if (confirmed) {
      deleteBook(book.id, {
        onSuccess: () => {
          addToast('Book deleted successfully', 'success');
          router.push(ROUTES.MY_BOOKS);
        },
        onError: (error) => {
          addToast(error.message || 'Failed to delete book', 'error');
        },
      });
    }
  };

  const handleEdit = () => {
    if (!book) return;
    router.push(`${ROUTES.MY_BOOKS}/${book.id}/edit`);
  };

  const isOwner = user && book && user.id === book.authorId;
  const favorite = book ? isFavorite(book.id) : false;

  return {
    // Data
    book,
    user,
    isLoading,
    error,
    isOwner,
    favorite,
    relatedBooks: relatedData?.books.filter((b: Book) => b.id !== bookId) || [],
    isLoadingRelated,

    // Actions
    handleAddToCart,
    handleToggleFavorite,
    handleDelete,
    handleEdit,
  };
}
