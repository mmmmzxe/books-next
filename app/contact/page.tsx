"use client";

import { Button, Input, Textarea } from '@/shared/ui';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <div className="bg-[#111111] py-24 text-white">
        <div className="container mx-auto max-w-5xl px-6 text-center">
          <h1 className="mb-6 font-serif text-5xl font-medium tracking-tight md:text-6xl">Get in Touch</h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            Whether you have a question about our collection, need help with an order, 
            or just want to share your thoughts on a book, we&apos;re here for you.
          </p>
        </div>
      </div>

      <div className="container mx-auto -mt-16 max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-4 lg:order-2">
            <div className="rounded-3xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-neutral-100">
              <h3 className="mb-8 font-serif text-2xl font-medium text-neutral-900">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F3] text-[#74642F]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#74642F]">Email Us</p>
                    <p className="mt-1 text-neutral-600">hello@booksshop.com</p>
                    <p className="text-neutral-500 text-sm">Response within 24h</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F3] text-[#74642F]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#74642F]">Call Us</p>
                    <p className="mt-1 text-neutral-600">+1 (555) 000-0000</p>
                    <p className="text-neutral-500 text-sm">Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5F5F3] text-[#74642F]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-[#74642F]">Visit Us</p>
                    <p className="mt-1 text-neutral-600">123 Bibliophile Lane</p>
                    <p className="text-neutral-500 text-sm">New York, NY 10001</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 border-t border-neutral-100 pt-8">
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <Clock className="h-4 w-4" />
                  <span>Available on Chat: 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 lg:order-1">
            <div className="rounded-3xl bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-neutral-100 h-full">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <Input label="First Name" placeholder="Jane" required />
                  <Input label="Last Name" placeholder="Doe" required />
                </div>
                
                <Input label="Email Address" type="email" placeholder="jane@example.com" required />
                
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-[#74642F]">Subject</label>
                  <select className="flex h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm focus:border-[#74642F] focus:outline-none focus:ring-1 focus:ring-[#74642F]">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Book Requests</option>
                    <option>Partnerships</option>
                  </select>
                </div>

                <Textarea 
                  label="How can we help?" 
                  placeholder="Tell us about what you need..." 
                  rows={6}
                  required
                />

                <Button 
                  type="submit" 
                  className="h-16 w-full rounded-full bg-[#111111] text-lg font-medium text-white hover:bg-neutral-800 transition-all md:w-auto md:px-12"
                >
                  <Send className="mr-3 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Map or Secondary Info Section */}
      <div className="container mx-auto px-6 pb-24">
        <div className="overflow-hidden rounded-3xl bg-neutral-200 h-[400px] relative">
          {/* Placeholder for Map */}
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500 flex-col gap-4">
            <MapPin className="h-12 w-12 stroke-[1px]" />
            <p className="font-serif italic">Interactive Map Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
