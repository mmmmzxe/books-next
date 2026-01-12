
 "use client";
 
 import { Button, BookCard } from '@/shared/ui';
 import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
 import Link from 'next/link';
 import { ROUTES } from '@/core';
 import { useFavoritesPage } from './use-favorites-page';

export default function FavoritesPage() {
  const {
    favorites,
    isEmpty,
    count,
    handleAddAllToCart,
    handleGoBack,
  } = useFavoritesPage();

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
            <Heart className="mb-4 h-24 w-24 text-[#D0D0D0]" />
            <h2 className="mb-2 text-2xl font-bold text-[#222222]">No favorites yet</h2>
            <p className="mb-6 text-[#7A7A7A]">Start adding books you love!</p>
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
            <h1 className="text-3xl font-bold text-[#222222]">My Favorites</h1>
            <p className="mt-1 text-[#7A7A7A]">{count} books in your favorites</p>
          </div>
          <Button onClick={handleAddAllToCart} className="bg-[#74642F] hover:bg-[#5d4f25]">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add All to Cart
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} showActions={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
