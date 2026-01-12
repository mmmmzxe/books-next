import { describe, it, expect } from 'vitest';
import { loginSchema, updateProfileSchema } from '@/domains/auth';

describe('Auth Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        email: 'admin@books.com',
        password: 'admin123',
      };

      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'admin123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const invalidData = {
        email: 'admin@books.com',
        password: '123',
      };

      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('updateProfileSchema', () => {
    it('should validate correct profile data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const result = updateProfileSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject short name', () => {
      const invalidData = {
        name: 'J',
        email: 'john@example.com',
      };

      const result = updateProfileSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
