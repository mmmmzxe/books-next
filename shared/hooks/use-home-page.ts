import { useState, useEffect } from 'react';
import { useCart, useFavorites } from '@/shared/providers';
import { useToast } from '@/shared/ui';
import type { Book} from '@/core/types';
import { BookCategory } from '@/core';

import { HomeBook } from '@/shared/types/home';

import { Article } from './mock-articles';

interface HomeData {
  featuredBooks: HomeBook[];
  bestSelling: HomeBook;
  popularBooks: HomeBook[];
  booksWithOffer: HomeBook[];
  articles: Article[];
}


export function useHomePage() {
  const [email, setEmail] = useState('');
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  useEffect(() => {
    fetch('/api/home-books')
      .then((res) => res.json())
      .then((data) => {
        setHomeData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch home books:', error);
        addToast('Failed to load books', 'error');
        setIsLoading(false);
      });
  }, [addToast]);

  const toBook = (homeBook: HomeBook): Book => ({
    id: homeBook.id,
    title: homeBook.title,
    description: homeBook.description || '',
    price: homeBook.price,
    category: (homeBook.category as BookCategory) || 'Fiction',
    thumbnail: homeBook.thumbnail,
    authorId: homeBook.authorId || 'unknown',
    authorName: homeBook.authorName || 'Unknown',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 0,
  });

  const handleAddToCart = (book: HomeBook) => {
    addToCart(toBook(book));
    addToast('Book added to cart!', 'success');
  };

  const handleToggleFavorite = (book: HomeBook) => {
    const convertedBook = toBook(book);
    toggleFavorite(convertedBook);
    if (isFavorite(book.id)) {
      addToast('Removed from favorites', 'info');
    } else {
      addToast('Added to favorites!', 'success');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      addToast('Please enter your email', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast('Please enter a valid email', 'error');
      return;
    }

    // Future implementation: send to newsletter service
    addToast('Thanks for subscribing!', 'success');
    setEmail('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return {
    // State
    email,
    isFavorite,
    homeData,
    isLoading,

    // Actions
    handleAddToCart,
    handleToggleFavorite,
    handleNewsletterSubmit,
    handleEmailChange,
    setEmail,
  };
}
