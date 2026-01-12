import { useSession } from '@/domains/auth';

export function useProfile() {
  const { data: user, isLoading, error } = useSession();

  const getInitial = () => {
    if (!user?.name) return '?';
    return user.name.charAt(0).toUpperCase();
  };

  const hasError = !!error || (!isLoading && !user);
  const errorMessage = error || 'User not found';

  return {
    // Data
    user,
    isLoading,
    error: hasError ? errorMessage : null,
    initial: getInitial(),

    // Computed
    hasUser: !!user,
  };
}
