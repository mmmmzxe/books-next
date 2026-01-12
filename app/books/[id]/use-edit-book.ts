"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBook, useUpdateBook, updateBookSchema, type UpdateBookFormData } from '@/domains/books';
import { useToast } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { BOOK_CATEGORIES } from '@/core';
import { ROUTES } from '@/core';
import { useSession } from '@/domains/auth';
import { useEffect } from 'react';

export function useEditBook(bookId: string) {
  const router = useRouter();
  const { data: user } = useSession();
  const { data: book, isLoading, error } = useBook(bookId);
  const { mutate: updateBook, isPending } = useUpdateBook();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UpdateBookFormData>({
    resolver: zodResolver(updateBookSchema),
  });

  // Populate form when book data loads
  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        description: book.description,
        price: book.price,
        category: book.category,
        thumbnail: book.thumbnail,
      });
    }
  }, [book, reset]);

  const onSubmit = (data: UpdateBookFormData) => {
    updateBook(
      { id: bookId, data },
      {
        onSuccess: () => {
          addToast('Book updated successfully!', 'success');
          router.push(`${ROUTES.BOOKS_SHOP}/${bookId}`);
        },
        onError: (error) => {
          addToast(error.message || 'Failed to update book', 'error');
        },
      }
    );
  };

  const routerBack = () => router.back();
  const isOwner = user && book && user.id === book.authorId;

  return {
    book,
    isLoading: isLoading || (book && !isOwner), 
    isOwner,
    error,
    register,
    handleSubmit,
    errors,
    isPending,
    categories: BOOK_CATEGORIES,
    onSubmit,
    routerBack,
    watch,
  };
}
