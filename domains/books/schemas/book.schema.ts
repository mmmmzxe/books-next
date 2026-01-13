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
  price: z.preprocess((val) => {
    if (typeof val === 'string') return Number(val);
    return val;
  }, z.number().positive('Price must be greater than 0')),
  category: z.enum(BOOK_CATEGORIES, { message: 'Please select a valid category' }),
  thumbnail: thumbnailSchema,
  rating: z.preprocess((val) => {
    if (val === undefined || val === null || val === '') return undefined;
    if (typeof val === 'string') return Number(val);
    return val;
  }, z.number().min(0).max(5).optional()),
});

export type CreateBookFormData = z.infer<typeof createBookSchema>;

export const updateBookSchema = z.object({
  title: z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() === '') return undefined;
    return val;
  }, z.string().min(2, 'Title must be at least 2 characters').optional()),
  description: z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() === '') return undefined;
    return val;
  }, z.string().min(10, 'Description must be at least 10 characters').optional()),
  price: z.preprocess((val) => {
    if (val === '' || val === undefined || val === null) return undefined;
    if (typeof val === 'string') return Number(val);
    return val;
  }, z.number().positive('Price must be greater than 0').optional()),
  category: z.preprocess((val) => {
    if (val === '' || val === undefined || val === null) return undefined;
    return val;
  }, z.enum(BOOK_CATEGORIES, { message: 'Please select a valid category' }).optional()),
  thumbnail: z.preprocess((val) => {
    if (typeof val === 'string' && val.trim() === '') return undefined;
    return val;
  }, thumbnailSchema.optional()),
  rating: z.preprocess((val) => {
    if (val === '' || val === undefined || val === null) return undefined;
    if (typeof val === 'string') return Number(val);
    return val;
  }, z.number().min(0).max(5).optional()),
});

export type UpdateBookFormData = z.infer<typeof updateBookSchema>;
