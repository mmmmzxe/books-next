export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Session {
  user: User;
  expiresAt: number;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}
