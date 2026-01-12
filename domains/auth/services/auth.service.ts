import { apiClient, API_ROUTES, type User, type AuthResponse } from '@/core';
import type { LoginFormData } from '../schemas';

export class AuthService {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_ROUTES.AUTH_LOGIN, credentials);
  }

  async logout(): Promise<void> {
    await apiClient.post<void>(API_ROUTES.AUTH_LOGOUT);
  }

  async getSession(): Promise<User | null> {
    try {
      const response = await apiClient.get<{ user: User | null }>(
        API_ROUTES.AUTH_SESSION
      );
      return response.user;
    } catch {
      return null;
    }
  }

  async updateProfile(data: { name: string; email: string }): Promise<User> {
    return apiClient.put<User>(API_ROUTES.USER, data);
  }
}

export const authService = new AuthService();
