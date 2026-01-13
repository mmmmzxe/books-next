import { describe, it, expect } from 'vitest';
import { createBookSchema, updateBookSchema } from '@/domains/books';
import { MOCK_BOOKS } from '@/shared/hooks/mock-books';

describe('Book Schemas', () => {
  describe('createBookSchema', () => {
    const moreBooks = [
      {
        title: 'The Pragmatic Programmer',
        description: 'Your Journey to Mastery',
        price: 39.99,
        category: 'Technology',
        thumbnail: 'https://i.postimg.cc/2636YCFZ/book12.png',
        rating: 4.8,
      },
      {
        title: 'Atomic Habits',
        description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
        price: 25.5,
        category: 'Self-Help',
        thumbnail: 'https://i.postimg.cc/MTXTwzbR/book14.png',
        rating: 4.7,
      },
      {
        title: 'Deep Work',
        description: 'Rules for Focused Success in a Distracted World',
        price: 30.0,
        category: 'Productivity',
        thumbnail: 'https://i.postimg.cc/nzMzxnYB/book15-1.png',
        rating: 4.6,
      },
      {
        title: 'The Lean Startup',
        description: 'How Today’s Entrepreneurs Use Continuous Innovation',
        price: 28.75,
        category: 'Business',
        thumbnail: 'https://i.postimg.cc/bJdJPqHQ/book16-1.png',
        rating: 4.5,
      },
      {
        title: 'Zero to One',
        description: 'Notes on Startups, or How to Build the Future',
        price: 22.99,
        category: 'Business',
        thumbnail: 'https://i.postimg.cc/W16t6W1T/book3-4-2.png',
        rating: 4.4,
      },
      {
        title: 'Educated',
        description: 'A Memoir about growing up in a survivalist family',
        price: 19.99,
        category: 'Biography',
        thumbnail: 'https://i.postimg.cc/mrmDKPMz/book3-4.png',
        rating: 4.3,
      },
      {
        title: 'Sapiens',
        description: 'A Brief History of Humankind',
        price: 35.0,
        category: 'History',
        thumbnail: 'https://i.postimg.cc/JhpnSsJH/book4-4.png',
        rating: 4.9,
      },
      {
        title: 'The Alchemist',
        description: 'A Fable About Following Your Dream',
        price: 18.5,
        category: 'Fiction',
        thumbnail: 'https://i.postimg.cc/XJXJWncY/book5-4.png',
        rating: 4.2,
      },
      {
        title: 'Thinking, Fast and Slow',
        description: 'Explores Two Modes of Thought',
        price: 27.0,
        category: 'Psychology',
        thumbnail: 'https://i.postimg.cc/qRgRrpXq/book6-1.png',
        rating: 4.6,
      },
      {
        title: 'Start With Why',
        description: 'How Great Leaders Inspire Everyone to Take Action',
        price: 24.99,
        category: 'Business',
        thumbnail: 'https://i.postimg.cc/XJXJWncX/book7-1.png',
        rating: 4.5,
      },
      {
        title: 'Grit',
        description: 'The Power of Passion and Perseverance',
        price: 21.5,
        category: 'Self-Help',
        thumbnail: 'https://i.postimg.cc/Kz4zbmr1/book8-1.png',
        rating: 4.3,
      },
      {
        title: 'Drive',
        description: 'The Surprising Truth About What Motivates Us',
        price: 23.0,
        category: 'Business',
        thumbnail: 'https://i.postimg.cc/G292RbJ8/book9-1.png',
        rating: 4.4,
      },
    ];

    moreBooks.forEach((data, idx) => {
      it(`validates sample book #${idx + 1}`, () => {
        const result = createBookSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    // Validate a set of thumbnail filenames
    const bookImages = [
      'https://i.postimg.cc/V656wzBf/book.png',
      'https://i.postimg.cc/0NVQhzmy/book-2.png',
      'https://i.postimg.cc/G292RbJs/book11.png',
      'https://i.postimg.cc/2636YCFZ/book12.png',
      'https://i.postimg.cc/1t4tSycF/book13-1.png',
      'https://i.postimg.cc/MTXTwzbR/book14.png',
      'https://i.postimg.cc/nzMzxnYB/book15-1.png',
      'https://i.postimg.cc/bJdJPqHQ/book16-1.png',
      'https://i.postimg.cc/W16t6W1T/book3-4-2.png',
      'https://i.postimg.cc/mrmDKPMz/book3-4.png',
      'https://i.postimg.cc/JhpnSsJH/book4-4.png',
      'https://i.postimg.cc/XJXJWncY/book5-4.png',
      'https://i.postimg.cc/qRgRrpXq/book6-1.png',
      'https://i.postimg.cc/XJXJWncX/book7-1.png',
      'https://i.postimg.cc/Kz4zbmr1/book8-1.png',
      'https://i.postimg.cc/G292RbJ8/book9-1.png',
    ];

    bookImages.forEach((img, idx) => {
      it(`validates book data for image ${img}`, () => {
        const validData = {
          title: `Book ${idx + 1}`,
          description: `Description for Book ${idx + 1}`,
          price: 10 + idx,
          category: 'Technology',
          thumbnail: img,
        };
        const result = createBookSchema.safeParse(validData);
        expect(result.success).toBe(true);
      });
    });

    // Validate first few entries from MOCK_BOOKS
    MOCK_BOOKS.slice(0, 3).forEach((b, idx) => {
      it(`validates MOCK_BOOKS entry #${idx + 1}`, () => {
        const result = createBookSchema.safeParse({
          title: b.title,
          description: b.description ?? 'Description',
          price: b.price ?? 10,
          category: b.category ?? 'Technology',
          thumbnail: b.thumbnail ?? '/images/books/book.png',
        });
        expect(result.success).toBe(true);
      });
    });

    it('should validate correct book data', () => {
      const validData = {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship',
        price: 45.99,
        category: 'Technology',
        thumbnail: '/images/books/book.png',
      };

      const result = createBookSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid category', () => {
      const invalidData = {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship',
        price: 45.99,
        category: 'InvalidCategory',
        thumbnail: '/images/books/book-2.png',
      };

      const result = createBookSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject negative price', () => {
      const invalidData = {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship',
        price: -10,
        category: 'Technology',
        thumbnail: '/images/books/book11.png',
      };

      const result = createBookSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid thumbnail URL', () => {
      const invalidData = {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship',
        price: 45.99,
        category: 'Technology',
        thumbnail: 'book13 1.png', // not a valid URL or path
      };

      const result = createBookSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
        const bookImages = [
          'book.png',
          'book-2.png',
          'book11.png',
          'book12.png',
          'book13 1.png',
          'book14.png',
          'book15 1.png',
          'book16 1.png',
          'book3 4-2.png',
          'book3 4.png',
          'book4 4.png',
          'book5 4.png',
          'book6 1.png',
          'book7 1.png',
          'book8 1.png',
          'book9 1.png',
        ];

        bookImages.forEach((img, idx) => {
          it(`should validate book data for image ${img}`, () => {
            const validData = {
              title: `Book ${idx + 1}`,
              description: `Description for Book ${idx + 1}`,
              price: 10 + idx,
              category: 'Technology',
              thumbnail: `/images/books/${img}`,
            };
            const result = createBookSchema.safeParse(validData);
            expect(result.success).toBe(true);
          });
        });
    it('should validate correct book data', () => {
      const validData = {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship',
        price: 45.99,
        category: 'Technology',
        thumbnail: '/images/books/book.png',
      };

      const result = createBookSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid category', () => {
      const invalidData = {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship',
        price: 45.99,
        category: 'InvalidCategory',
        thumbnail: '/images/books/book-2.png',
      };

      const result = createBookSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject negative price', () => {
      const invalidData = {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship',
        price: -10,
        category: 'Technology',
        thumbnail: '/images/books/book11.png',
      };

      const result = createBookSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid thumbnail URL', () => {
      const invalidData = {
        title: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship',
        price: 45.99,
        category: 'Technology',
        thumbnail: 'book13 1.png', // not a valid URL or path
      };

      const result = createBookSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept numeric-like strings for price', () => {
      const validData = {
        title: 'Numeric Price',
        description: 'Testing string price',
        price: '29.99',
        category: 'Technology',
        thumbnail: '/images/books/book.png',
      };

      const result = createBookSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('updateBookSchema', () => {
    it('should validate partial book data', () => {
      const validData = {
        title: 'Updated Title',
      };

      const result = updateBookSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept empty strings and string numbers for optional fields', () => {
      const validData1 = {
        title: '', // empty -> treated as undefined
        price: '', // empty -> treated as undefined
      };

      const validData2 = {
        price: '39.50', // string -> number
      };

      expect(updateBookSchema.safeParse(validData1).success).toBe(true);
      expect(updateBookSchema.safeParse(validData2).success).toBe(true);
    });
  });

