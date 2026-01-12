import { BookCategory } from '../config';

export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  category: BookCategory;
  thumbnail: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
}

export interface CreateBookDto {
  title: string;
  description: string;
  price: number;
  category: BookCategory;
  thumbnail: string;
}

export type UpdateBookDto = Partial<CreateBookDto>;

export interface BooksResponse {
  books: Book[];
  total: number;
  page: number;
  pageSize: number;
}

export interface BookFilters {
  search?: string;
  category?: BookCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc';
  page?: number;
  pageSize?: number;
  authorId?: string;
}
