'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Book } from '@/core/types';
import { BOOK_CATEGORIES, type BookCategory } from '@/core/config';

export type BookCardBook = {
  id: string;
  title: string;
  authorName?: string;
  price: number;
  thumbnail: string;
  category?: string;
  description?: string;
  rating?: number;
  oldPrice?: number;
};

interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (book: Book | BookCardBook) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        // eslint-disable-next-line
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, isInitialized]);

  const addToCart = (book: Book | BookCardBook) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === book.id);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Convert BookCardBook to Book for cart storage
      const category = book.category && (BOOK_CATEGORIES as readonly string[]).includes(book.category) 
        ? book.category 
        : BOOK_CATEGORIES[0];

      const cartBook: Book = 'authorId' in book ? book : {
        ...book,
        authorId: 'unknown',
        authorName: book.authorName || 'Unknown Author',
        category: category as BookCategory, // Cast is safe because we checked inclusion or used default
        description: book.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return [...prevCart, { ...cartBook, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
