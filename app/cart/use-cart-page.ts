"use client";

import { useCart } from '@/shared/providers';
import { useRouter } from 'next/navigation';

export function useCartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const handleRemoveItem = (bookId: string) => {
    removeFromCart(bookId);
  };

  const handleUpdateQuantity = (bookId: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(bookId, quantity);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const itemCount = cart.length;
  const isEmpty = cart.length === 0;

  return {
    // Data
    cart,
    isEmpty,
    itemCount,
    subtotal,
    tax,
    total,

    // Actions
    handleRemoveItem,
    handleUpdateQuantity,
    handleClearCart,
    handleGoBack,
    handleCheckout,
  };
}
