import { z } from 'zod';
import { BOOK_CATEGORIES } from '@/core';

const thumbnailSchema = z
  .string()
  .min(1, 'Please provide a thumbnail')
  .refine(
    (value) => {
      if (!value) return false;

      if (value.startsWith('/images/books/')) {
        return true;
      }

      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    { message: 'Please provide a valid image URL or path' },
  );

export const createBookSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  category: z.enum(BOOK_CATEGORIES, { message: 'Please select a valid category' }),
  thumbnail: thumbnailSchema,
  rating: z.number().min(0).max(5).optional(),
});

export type CreateBookFormData = z.infer<typeof createBookSchema>;

export const updateBookSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  price: z.number().positive('Price must be greater than 0').optional(),
  category: z.enum(BOOK_CATEGORIES, { message: 'Please select a valid category' }).optional(),
  thumbnail: thumbnailSchema.optional(),
  rating: z.number().min(0).max(5).optional(),
});

export type UpdateBookFormData = z.infer<typeof updateBookSchema>;
