'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, useLogout } from '@/domains/auth';
import { useCart, useFavorites } from '@/shared/providers';
import { ROUTES } from '@/core';

export function useNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user, isLoading } = useSession();
  const { mutate: logout } = useLogout();
  const { getCartCount } = useCart();
  const { favorites } = useFavorites();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Lock scroll when mobile menu or search is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const toggleProfileMenu = () => {
    if (user) {
      setIsProfileMenuOpen((prev) => !prev);
    } else {
      router.push(ROUTES.LOGIN);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return {
    user,
    isLoading,
    pathname,
    router,
    logout,
    getCartCount,
    favorites,
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
    menuRef,
    toggleProfileMenu,
    closeMobileMenu,
    openMobileMenu,
    openSearch,
    closeSearch,
  };
}
