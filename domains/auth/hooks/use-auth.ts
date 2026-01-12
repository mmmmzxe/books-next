"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services';
import type { LoginFormData } from '../schemas';
import { ROUTES } from '@/core';

export const AUTH_QUERY_KEYS = {
  session: ['auth', 'session'] as const,
};

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginFormData) => authService.login(credentials),
    onSuccess: (response) => {
      if (response.success && response.user) {
        queryClient.setQueryData(AUTH_QUERY_KEYS.session, response.user);
        router.push(ROUTES.BOOKS_SHOP);
      }
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.session, null);
      router.push(ROUTES.LOGIN);
    },
  });
}

export function useSession() {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.session,
    queryFn: () => authService.getSession(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; email: string }) =>
      authService.updateProfile(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.session, updatedUser);
    },
  });
}
