 "use client";
 
 import { Button, Card, CardContent, ConfirmDialog } from '@/shared/ui';
 import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
 import Image from 'next/image';
 import Link from 'next/link';
 import { ROUTES } from '@/core';
import { useCartPage } from './use-cart-page';
import { useState } from 'react';

export default function CartPage() {
  const [isClearCartDialogOpen, setIsClearCartDialogOpen] = useState(false);
  const {
    cart,
    isEmpty,
    itemCount,
    subtotal,
    tax,
    total,
    handleRemoveItem,
    handleUpdateQuantity,
    handleClearCart,
    handleGoBack,
    handleCheckout,
  } = useCartPage();

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex min-h-100 flex-col items-center justify-center">
            <ShoppingBag className="mb-4 h-24 w-24 text-[#D0D0D0]" />
            <h2 className="mb-2 text-2xl font-bold text-[#222222]">Your cart is empty</h2>
            <p className="mb-6 text-[#7A7A7A]">Add some books to get started!</p>
            <Link href={ROUTES.BOOKS_SHOP}>
              <Button>Browse Books</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#222222]">Shopping Cart</h1>
            <p className="mt-1 text-[#7A7A7A]">{itemCount} items in your cart</p>
          </div>
          <Button variant="outline" onClick={() => setIsClearCartDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        <ConfirmDialog
          open={isClearCartDialogOpen}
          onCancel={() => setIsClearCartDialogOpen(false)}
          onConfirm={() => {
            handleClearCart();
            setIsClearCartDialogOpen(false);
          }}
          title="Clear Cart"
          description="Are you sure you want to remove all items from your cart? This action cannot be undone."
          confirmText="Clear Everything"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Book Image */}
                    <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-[#F5F5F5]">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Book Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link href={`/books/${item.id}`}>
                          <h3 className="mb-1 text-lg font-semibold text-[#222222] hover:text-[#74642F] transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="mb-2 text-sm text-[#7A7A7A]">
                          by {item.authorName}
                        </p>
                        <span className="inline-block rounded-full bg-[#E5E3DA] px-3 py-1 text-xs font-medium text-[#74642F]">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium text-[#222222]">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-4">
                          <p className="text-xl font-bold text-[#222222]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold text-[#222222]">Order Summary</h2>
                
                <div className="space-y-3 border-b border-[#E0E0E0] pb-4">
                  <div className="flex justify-between text-[#7A7A7A]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#7A7A7A]">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-[#7A7A7A]">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="my-4 flex justify-between text-xl font-bold text-[#222222]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full bg-[#74642F] hover:bg-[#5d4f25]" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>

                <Link href={ROUTES.BOOKS_SHOP}>
                  <Button variant="ghost" className="mt-3 w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
