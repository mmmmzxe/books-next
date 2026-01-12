"use client";


import { Button, useToast } from '@/shared/ui';
import { CheckCircle2, ShoppingBag, ArrowRight, Download, Package } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/core';

export default function OrderSuccessPage() {
  const router = useRouter();
  const { addToast } = useToast();
  // Generate random order ID
  // Fixed order ID for mock success page (to maintain purity)
  const orderId = "BS-827364";



  const handleTrackOrder = () => {
    addToast('Redirecting to your orders...', 'info');
    setTimeout(() => {
      router.push(ROUTES.MY_BOOKS);
    }, 1000);
  };

  const handleDownloadInvoice = () => {
    addToast('Your invoice is being prepared for download.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-20">
      <div className="container mx-auto max-w-2xl px-6 text-center">
        <div className="mb-10 inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        
        <h1 className="mb-4 font-serif text-5xl font-medium text-[#111111]">Thank You!</h1>
        <p className="mb-12 text-lg text-neutral-500">
          Your order <span className="font-bold text-[#111111]">{orderId}</span> has been successfully placed. 
          We&apos;ve sent a confirmation email to your primary address.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href={ROUTES.BOOKS_SHOP}>
            <Button className="h-14 w-full rounded-full bg-[#111111] text-white hover:bg-neutral-800 shadow-lg">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop More
            </Button>
          </Link>
       
          <Button 
            variant="outline" 
            onClick={handleDownloadInvoice}
            className="h-14 w-full rounded-full border-neutral-200 text-neutral-500!"
          >
            <Download className="mr-2 h-4 w-4" />
            Invoice
          </Button>
        </div>

        <div className="mt-16 rounded-3xl border border-neutral-100 bg-white p-8 text-left shadow-sm">
          <h3 className="mb-4 font-bold text-neutral-900">What&apos;s next?</h3>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li className="flex gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 font-bold text-[10px]">1</div>
              <p>Our team is carefully preparing your collection for shipment.</p>
            </li>
            <li className="flex gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 font-bold text-[10px]">2</div>
              <p>You&apos;ll receive another email with tracking details once it&apos;s on the way.</p>
            </li>
            <li className="flex gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 font-bold text-[10px]">3</div>
              <p>Estimated delivery is in 3-5 business days.</p>
            </li>
          </ul>
          
          <div className="mt-8 border-t border-neutral-50 pt-6 flex justify-center">
            <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#74642F] hover:text-[#5d4f25]">
              Return Home <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
