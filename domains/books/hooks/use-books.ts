"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { bookService } from '../services';
import type { BookFilters, CreateBookDto, UpdateBookDto } from '@/core/types';
import { ROUTES } from '@/core';

export const BOOK_QUERY_KEYS = {
  all: ['books'] as const,
  lists: () => [...BOOK_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: BookFilters) => [...BOOK_QUERY_KEYS.lists(), filters] as const,
  details: () => [...BOOK_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...BOOK_QUERY_KEYS.details(), id] as const,
};

export function useBooks(filters?: BookFilters) {
  return useQuery({
    queryKey: BOOK_QUERY_KEYS.list(filters),
    queryFn: () => bookService.getBooks(filters),
  });
}

export function useBook(id: string) {
  return useQuery({
    queryKey: BOOK_QUERY_KEYS.detail(id),
    queryFn: () => bookService.getBookById(id),
    enabled: !!id,
  });
}

export function useCreateBook() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookDto) => bookService.createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEYS.lists() });
      router.push(ROUTES.MY_BOOKS);
    },
  });
}

export function useUpdateBook() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookDto }) =>
      bookService.updateBook(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({
        queryKey: BOOK_QUERY_KEYS.detail(variables.id),
      });
      router.back();
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookService.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEYS.lists() });
    },
  });
}
