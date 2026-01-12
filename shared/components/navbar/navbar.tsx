'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, User, LogOut, Search, Facebook, Instagram, Linkedin, Twitter, Menu, Heart, X } from 'lucide-react';
import { useSession, useLogout } from '@/domains/auth';
import { useCart, useFavorites } from '@/shared/providers';
import { ROUTES } from '@/core';
import { useState, useEffect, useRef } from 'react';
import { SearchPopup } from './search-popup';


function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {

  const pathname = usePathname();
  const { data: user } = useSession();

  return (
    <>
      <Link href="/" onClick={onLinkClick} className={`${pathname === '/' ? 'text-[#C5A992]' : 'hover:text-black'} transition-colors`}>HOME</Link>
      <Link href={ROUTES.BOOKS_SHOP} onClick={onLinkClick} className={`${pathname === ROUTES.BOOKS_SHOP ? 'text-black' : 'hover:text-black'} transition-colors`}>SHOP</Link>
      <Link href="/about" onClick={onLinkClick} className="hover:text-black transition-colors">ABOUT</Link>
      <Link href="/articles" onClick={onLinkClick} className="hover:text-black transition-colors">ARTICLES</Link>
      {user && (
        <Link href={ROUTES.MY_BOOKS} onClick={onLinkClick} className={`${pathname === ROUTES.MY_BOOKS ? 'text-black' : 'hover:text-black'} transition-colors`}>MY BOOKS</Link>
      )}
      <Link href="/contact" onClick={onLinkClick} className="hover:text-black transition-colors">CONTACT</Link>
    </>
  );
}

export function Navbar() {
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
      document.body.style.overflow = 'unset'; // Cleanup scroll lock
    };
  }, []);

  // Lock scroll when mobile menu or search is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  if (pathname === ROUTES.LOGIN) return null;

  return (
    <header className="w-full bg-[#F3F2EC]">
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      {/* 1. TOP UTILITY BAR - Hidden on extra small screens, icons hidden on mobile */}
      <div className="flex w-full items-center justify-between border-b border-black/5 px-4 md:px-8 py-3 text-[10px] font-medium tracking-[0.2em] text-[#7A7A7A]">
        {/* Social Icons - Desktop Only */}
        <div className="hidden sm:flex gap-4">
          <Facebook size={14} className="cursor-pointer hover:text-black transition-colors" />
          <Instagram size={14} className="cursor-pointer hover:text-black transition-colors" />
          <Linkedin size={14} className="cursor-pointer hover:text-black transition-colors" />
          <Twitter size={14} className="cursor-pointer hover:text-black transition-colors" />
        </div>

        {/* User Actions - Scaled for mobile */}
        <div className="flex w-full sm:w-auto justify-between sm:justify-end items-center gap-4 md:gap-8 uppercase">
          <div className="relative" ref={menuRef}>
            {isLoading ? (
              <div className="flex items-center gap-1 opacity-50">
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800" />
                <span className="hidden xs:inline">Checking...</span>
              </div>
            ) : (
              <button 
                onClick={() => {
                  if (user) {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                  } else {
                    router.push(ROUTES.LOGIN);
                  }
                }}
                className="flex items-center gap-1 hover:text-black transition-colors"
              >
                <User size={14} /> 
                <span className="hidden xs:inline">{user ? user.name : 'ACCOUNT'}</span>
              </button>
            )}

            {/* ... Profile Dropdown ... */}
            {isProfileMenuOpen && (
              <div className="absolute left-0 sm:right-0 mt-4 w-48 z-60 bg-white border border-[#E0E0E0] py-2 shadow-xl text-black tracking-normal normal-case">
                <Link href={ROUTES.PROFILE} className="flex items-center gap-2 px-4 py-2 hover:bg-[#F3F2EC]"><User size={14}/> Profile</Link>
                <button onClick={() => logout()} className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"><LogOut size={14}/> Logout</button>
              </div>
            )}
          </div>

          <Link href={ROUTES.FAVORITES} className="flex items-center gap-1 hover:text-black transition-colors">
            <Heart size={14} className={favorites.length > 0 ? "fill-[#74642F] text-[#74642F]" : ""} />
            <span className="hidden md:inline">WISH LIST</span> ({favorites.length})
          </Link>

          <Link href={ROUTES.CART} className="flex items-center gap-1 hover:text-black transition-colors">
            <ShoppingCart size={14} /> 
            <span className="hidden md:inline">CART</span>({getCartCount()})
          </Link>

          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1 hover:text-black transition-colors"
            aria-label="Open search"
          >
            <Search size={14} />
          </button>
        </div>
      </div>


      {/* 2. MAIN NAVIGATION */}
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-8 py-6 md:py-8">
        <Link href="/" className="font-serif text-2xl md:text-3xl tracking-tighter text-[#222222]">
          BOOKSAW
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] text-[#7A7A7A]">
          <NavLinks />
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-black p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* 3. MOBILE OVERLAY MENU */}
      <div className={`fixed inset-0 z-100 bg-black/40 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div 
          className={`absolute right-0 top-0 h-full w-[280px] bg-white p-8 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between text-black items-center mb-12">
            <span className="font-serif text-xl">MENU</span>
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
          </div>
          <div className="flex flex-col gap-8 text-[12px] font-bold tracking-[0.2em] text-[#7A7A7A]">
            <NavLinks onLinkClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}