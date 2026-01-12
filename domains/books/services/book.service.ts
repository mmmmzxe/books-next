import { apiClient, API_ROUTES } from '@/core';
import type {
  Book,
  BooksResponse,
  BookFilters,
  CreateBookDto,
  UpdateBookDto,
} from '@/core/types';

export class BookService {
  async getBooks(filters?: BookFilters): Promise<BooksResponse> {
    const params = new URLSearchParams();

    if (filters?.search) params.set('search', filters.search);
    if (filters?.category) params.set('category', filters.category);
    if (filters?.minPrice !== undefined) params.set('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice !== undefined) params.set('maxPrice', filters.maxPrice.toString());
    if (filters?.minRating !== undefined) params.set('minRating', filters.minRating.toString());
    if (filters?.sortBy) params.set('sortBy', filters.sortBy);
    if (filters?.page) params.set('page', filters.page.toString());
    if (filters?.pageSize) params.set('pageSize', filters.pageSize.toString());
    if (filters?.authorId) params.set('authorId', filters.authorId);

    const queryString = params.toString();
    const endpoint = queryString
      ? `${API_ROUTES.BOOKS}?${queryString}`
      : API_ROUTES.BOOKS;

    return apiClient.get<BooksResponse>(endpoint);
  }

  async getBookById(id: string): Promise<Book> {
    return apiClient.get<Book>(`${API_ROUTES.BOOKS}/${id}`);
  }

  async createBook(data: CreateBookDto): Promise<Book> {
    return apiClient.post<Book>(API_ROUTES.BOOKS, data);
  }

  async updateBook(id: string, data: UpdateBookDto): Promise<Book> {
    return apiClient.put<Book>(`${API_ROUTES.BOOKS}/${id}`, data);
  }

  async deleteBook(id: string): Promise<void> {
    return apiClient.delete<void>(`${API_ROUTES.BOOKS}/${id}`);
  }
}

export const bookService = new BookService();
