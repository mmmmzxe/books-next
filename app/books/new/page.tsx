"use client";

import { Button, Input, Textarea, Select } from '@/shared/ui';
import { PlusCircle, ArrowLeft, BookOpen, Globe, Tag, DollarSign } from 'lucide-react';
import { useNewBook } from './use-new-book';
import Image from 'next/image';

export default function NewBookPage() {
  const { register, handleSubmit, errors, isPending, categories, onSubmit, routerBack, watch } = useNewBook();
  
  // Watch fields for real-time visual feedback
  const titlePreview = watch('title');
  const descriptionPreview = watch('description');
  const thumbnailPreview = watch('thumbnail');

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={routerBack}
            className="flex items-center text-sm font-medium text-neutral-500 hover:text-black"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Creation Mode</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Left Side: Editorial Form */}
          <div className="lg:col-span-7">
            <header className="mb-10">
              <h1 className="text-4xl font-serif font-medium text-neutral-900">List a New Work</h1>
              <p className="mt-2 text-neutral-500">Fill in the details below to add your book to the collection.</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Section 1: Identity */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.1em] text-[#74642F]">
                  <BookOpen className="h-4 w-4" />
                  Book Identity
                </div>
                <Input
                  {...register('title')}
                  label="Title"
                  placeholder="The Midnight Library"
                  error={errors.title?.message}
                />
                <Textarea
                  {...register('description')}
                  label="Synopsis"
                  placeholder="Describe the soul of this book..."
                  rows={6}
                  error={errors.description?.message}
                />
              </section>

              {/* Section 2: Logistics */}
              <section className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.1em] text-[#74642F]">
                    <Tag className="h-4 w-4" />
                    Classification
                  </div>
                  <Select
                    {...register('category')}
                    label="Genre"
                    options={[{ value: '', label: 'Select Genre' }, ...categories.map((cat) => ({ value: cat, label: cat }))]}
                    error={errors.category?.message}
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.1em] text-[#74642F]">
                    <DollarSign className="h-4 w-4" />
                    Pricing
                  </div>
                  <Input
                    {...register('price', { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    label="Price (USD)"
                    placeholder="0.00"
                    error={errors.price?.message}
                  />
                </div>
              </section>

              {/* Section 3: Media */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.1em] text-[#74642F]">
                  <Globe className="h-4 w-4" />
                  Cover Imagery
                </div>
                <Input
                  {...register('thumbnail')}
                  label="Cover Image URL"
                  placeholder="https://..."
                  error={errors.thumbnail?.message}
                />
              </section>

              {/* Form Actions */}
              <div className="sticky bottom-0 z-10 flex items-center gap-4 border-t border-neutral-100 bg-white/95 py-4 backdrop-blur lg:static lg:border-none lg:bg-transparent lg:py-0">
                <Button 
                  type="submit" 
                  isLoading={isPending}
                  className="h-14 flex-1 rounded-full bg-[#111111] text-white hover:bg-[#333333] shadow-lg"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Publish Book
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={routerBack}
                  className="h-14 px-8 rounded-full text-neutral-500 hover:bg-neutral-100"
                >
                  Discard
                </Button>
              </div>
            </form>
          </div>

          {/* Right Side: Visual Preview Card */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-32">
              <div className="group relative mx-auto max-w-[320px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                <div className="aspect-[3/4] bg-neutral-100 relative">
                  {thumbnailPreview ? (
                     <Image
                      src={thumbnailPreview}
                      alt="Preview"
                      fill
                      className="object-cover transition-opacity duration-500"
                      unoptimized // Allow external URLs without configuration
                      onError={() => {}} 
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-12 text-center text-neutral-300">
                      <BookOpen className="mb-4 h-12 w-12 stroke-[1px]" />
                      <p className="text-sm italic font-serif">Your cover art will appear here once you provide a URL.</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-2 text-lg font-bold text-neutral-900 line-clamp-1">
                    {titlePreview || 'Book Title'}
                  </div>
                  <div className="text-sm text-neutral-500 line-clamp-2">
                    {descriptionPreview || 'Provide a synopsis to see it here...'}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
                <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-tighter">Listing Checklist</h4>
                <ul className="mt-4 space-y-3 text-sm text-neutral-500">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Use a high-quality cover image
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Set a descriptive title
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Choose the right category
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}