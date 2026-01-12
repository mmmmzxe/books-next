"use client";

import { useCart } from '@/shared/providers';
import { Button, Input, Card, CardContent } from '@/shared/ui';
import { ArrowLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/core';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 1500);
  };

  if (cart.length === 0 && !isSubmitting) {
    router.push(ROUTES.CART);
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-12">
          {/* Shipping Content */}
          <div className="lg:col-span-8 space-y-8">
            <section className="rounded-3xl bg-white p-8 shadow-sm border border-neutral-100">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white">
                  <Truck className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-serif font-medium text-[#111111]">Shipping Address</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 text-black ">
                <Input label="First Name" placeholder="Jane" required />
                <Input label="Last Name" placeholder="Doe" required />
                <div className="md:col-span-2">
                  <Input label="Address" placeholder="123 Bookstore St." required />
                </div>
                <Input label="City" placeholder="New York" required />
                <Input label="Postal Code" placeholder="10001" required />
                <div className="md:col-span-2">
                  <Input label="Country" placeholder="United States" required />
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm border border-neutral-100">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-serif font-medium text-[#111111]">Payment Method</h2>
              </div>
              
              <div className="space-y-4 text-black ">
                <div className="flex items-center gap-4 rounded-xl border border-[#111111] p-4 bg-[#F8F8F8]">
                  <input type="radio" checked readOnly className="h-4 w-4 accent-[#111111]" />
                  <div className="flex-1">
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-sm text-neutral-500">Secure payment via Stripe</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-9 rounded bg-neutral-200" />
                    <div className="h-6 w-9 rounded bg-neutral-200" />
                  </div>
                </div>
                
                <div className="grid gap-6 p-4 text-black ">
                  <Input label="Card Number" placeholder="0000 0000 0000 0000" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry Date" placeholder="MM/YY" required />
                    <Input label="CVC" placeholder="123" required />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <Card className="rounded-4xl border-none shadow-lg overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="mb-6 text-xl text-black font-bold">Order Summary</h3>
                  
                  <div className="space-y-4 border-b text-black  border-neutral-100 pb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-neutral-700 max-w-[200px] truncate">
                          {item.title} x {item.quantity}
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="py-6 text-black  space-y-3">
                    <div className="flex justify-between text-neutral-700">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-700">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-neutral-700">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-neutral-100 mb-8">
                    <span className="text-lg text-black font-medium">Total</span>
                    <span className="text-3xl font-serif font-medium text-black ">${total.toFixed(2)}</span>
                  </div>

                  <Button 
                    type="submit" 
                    isLoading={isSubmitting}
                    className="h-16 w-full rounded-full bg-[#111111] text-white hover:bg-neutral-800 text-lg shadow-xl"
                  >
                    Complete Purchase
                  </Button>

                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-400">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Secure SSL Encrypted Checkout</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
