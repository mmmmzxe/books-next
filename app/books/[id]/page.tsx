
 "use client";

import { Button, LoadingState, ErrorState } from '@/shared/ui';
import { Heart, ShoppingCart, Edit, Trash2, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/core';
import Image from 'next/image';
import { use } from 'react';
import { useBookDetail } from './use-book-detail';
import { Book } from '@/core/types';

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    book,
    isLoading,
    error,
    isOwner,
    favorite,
    relatedBooks,
    isLoadingRelated,
    handleAddToCart,
    handleToggleFavorite,
    handleDelete,
    handleEdit,
  } = useBookDetail(id);

  if (isLoading) return <LoadingState message="Loading masterpiece..." />;
  if (error) return <ErrorState error={error} />;
  if (!book) return <ErrorState error="Book not found" />;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#222222]">
      <main className="pt-4 lg:pt-8">
        <div className="container mx-auto max-w-7xl">
          <div className="pb-4 px-6 lg:px-0">
             <Link 
              href={ROUTES.BOOKS_SHOP}
              className="group flex items-center gap-2 text-sm font-medium text-[#7A7A7A] transition-colors hover:text-[#222222]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Collection
            </Link>
          </div>
          <div className="grid lg:grid-cols-2">

            
            {/* Left Column: Image (Sticky) */}
            <div className="relative bg-[#F0F0F0] lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]">
              <div className="relative h-[50vh] w-full lg:h-full">
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col px-6 py-12 lg:px-20 lg:py-24">
              <div className="mb-auto">
                {/* Author & Meta */}
                <div className="mb-6 flex items-center gap-4 text-sm text-[#7A7A7A]">
                  <span className="font-medium text-[#74642F]">{book.authorName}</span>
                  <span>•</span>
                  <span>{new Date(book.createdAt).getFullYear()}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-[#FFC107] text-[#FFC107]" />
                    <span>4.8</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="mb-8 font-serif text-4xl font-normal leading-tight md:text-5xl lg:text-6xl text-[#111111]">
                  {book.title}
                </h1>

                {/* Price */}
                <div className="mb-10 flex items-baseline gap-4">
                  <span className="font-sans text-3xl font-light text-[#222222]">
                    ${book.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-[#7A7A7A]">USD</span>
                </div>

                {/* Description Text */}
                <div className="mb-12 space-y-6">
                  <p className="text-lg leading-relaxed text-[#555555]">
                    {book.description}
                  </p>
                  <p className="text-base leading-relaxed text-[#7A7A7A]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                  </p>
                </div>

                {/* Dimensions / Details Table */}
                <div className="mb-12 border-t border-[#E5E5E5] pt-8">
                  <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#222222]">Specifications</h3>
                  <div className="grid gap-y-4 text-sm">
                    <div className="grid grid-cols-2 py-2 border-b border-[#F0F0F0]">
                      <span className="text-[#7A7A7A]">Category</span>
                      <span className="font-medium text-[#222222]">{book.category}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-[#F0F0F0]">
                      <span className="text-[#7A7A7A]">Format</span>
                      <span className="font-medium text-[#222222]">Hardcover</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b border-[#F0F0F0]">
                      <span className="text-[#7A7A7A]">Language</span>
                      <span className="font-medium text-[#222222]">English</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Sticky Bottom (Mobile) or Inline (Desktop) */}
              <div className="sticky bottom-0 -mx-6 border-t border-[#E5E5E5] bg-white/90 px-6 py-4 backdrop-blur lg:static lg:mx-0 lg:border-none lg:bg-transparent lg:p-0">
                <div className="flex flex-col gap-4">
                  
                  {/* Primary Actions */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handleAddToCart}
                      className="h-14 flex-1 rounded-none bg-[#111111] text-base font-medium uppercase tracking-wider text-white hover:bg-[#333333] transition-all"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <button
                      onClick={handleToggleFavorite}
                      className={`flex h-14 w-14 items-center justify-center border transition-all ${
                        favorite 
                          ? 'border-red-200 bg-red-50 text-red-500' 
                          : 'border-[#E5E5E5] text-[#222222] hover:border-[#222222]'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Admin Actions */}
                  {isOwner && (
                    <div className="flex gap-4 pt-2">
                       <Button 
                        variant="outline" 
                        onClick={handleEdit}
                        className="flex-1 border-[#E5E5E5] hover:bg-[#FAFAFA] text-[#555555]"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Book
                      </Button>
                      <Button 
                        variant="danger" 
                        onClick={handleDelete}
                        className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-none"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Related Books Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-serif text-3xl font-medium text-[#111111]">You may also like</h2>
            <Link 
              href={ROUTES.BOOKS_SHOP} 
              className="text-xs font-bold uppercase tracking-widest text-[#74642F] hover:text-[#5d4f25]"
            >
              View Full Collection →
            </Link>
          </div>

          {isLoadingRelated ? (
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="space-y-4">
                  <div className="aspect-[3/4] animate-pulse bg-neutral-100 rounded-lg" />
                  <div className="h-4 w-3/4 animate-pulse bg-neutral-100 rounded" />
                </div>
              ))}
            </div>
          ) : relatedBooks.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
              {relatedBooks.map((relatedBook: Book) => (
                <Link 
                  key={relatedBook.id} 
                  href={`/books/${relatedBook.id}`}
                  className="group block"
                >
                  <div className="relative mb-6 aspect-[3/4] overflow-hidden rounded-lg bg-[#F5F5F5]">
                    <Image
                      src={relatedBook.thumbnail}
                      alt={relatedBook.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 500px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-[#222222] line-clamp-1 group-hover:text-[#74642F] transition-colors">
                    {relatedBook.title}
                  </h3>
                  <p className="text-sm text-[#7A7A7A]">${relatedBook.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500 italic">No similar books found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
