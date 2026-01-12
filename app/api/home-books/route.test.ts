import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('GET /api/home-books', () => {
  it('returns home data successfully', async () => {
    const res = await GET(new Request('http://localhost/api/home-books'));
    expect(res.status).toBe(200);
    const data = await res.json();

    expect(Array.isArray(data.featuredBooks)).toBe(true);
    expect(data.bestSelling).toBeDefined();
    expect(Array.isArray(data.popularBooks)).toBe(true);
    expect(Array.isArray(data.booksWithOffer)).toBe(true);
    expect(Array.isArray(data.articles)).toBe(true);
  });
});
