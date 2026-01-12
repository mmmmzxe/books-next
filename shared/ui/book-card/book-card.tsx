'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Edit, Trash2, Eye, Star } from 'lucide-react';
import { Card, CardContent } from '../card/card';
import { Button } from '../button/button';
import { useCart, useFavorites } from '@/shared/providers';
import { useToast } from '../toast/toast';
import type { Book } from '@/core/types';
import type { HomeBook } from '@/shared/types/home';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

interface BookCardProps {
  book: Book | HomeBook;
  showActions?: boolean;
  onDelete?: (id: string) => void;
  onAddToCart?: (book: Book | HomeBook) => void;
  onToggleFavorite?: (book: Book | HomeBook) => void;
  isFavorite?: boolean;
}

export function BookCard({ 
  book, 
  showActions = false, 
  onDelete,
  onAddToCart,
  onToggleFavorite,
  isFavorite: isFavoriteProp,
}: BookCardProps) {
  const { addToCart } = useCart();
  const { isFavorite: isFav, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const [openConfirm, setOpenConfirm] = useState(false);

  const activeIsFavorite = isFavoriteProp !== undefined ? isFavoriteProp : isFav(book.id);

  const reviewCount = useMemo(() => {
    // Deterministic "random" number based on ID for purity
    const seed = book.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (seed % 15000) + 5000;
  }, [book.id]);


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(book);
    } else {
      addToCart(book as Book);
      addToast('Book added to cart!', 'success');
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(book);
    } else {
      toggleFavorite(book as Book);
      if (activeIsFavorite) {
        addToast('Removed from favorites', 'info');
      } else {
        addToast('Added to favorites!', 'success');
      }
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-shadow hover:shadow-lg">
      {/* Category Badge */}
      <div className="absolute left-3 top-3 z-10 rounded bg-white px-3 py-1 text-xs font-medium text-[#222222] shadow-sm">
        {book.category}
      </div>

{showActions ? (
    <div className="flex-1">
                <button
               
                 
                  onClick={() => setOpenConfirm(true)}
                  className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center text-red-300 rounded-full bg-white shadow-sm transition-all hover:scale-110"
                >
                  <Trash2 className="h-4 w-4" />
                
                </button>
              </div>
):
<button
        onClick={handleToggleFavorite}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:scale-110"
      >
        <Heart
          className={`h-5 w-5 ${activeIsFavorite ? 'fill-red-500 text-red-500' : 'text-[#7A7A7A]'}`}
        />
      </button>
}
      {/* Favorite Icon */}
      

      <CardContent className="p-0">
        {/* Book Image */}
        <Link href={`/books/${book.id}`}>
          <div className="relative h-80 w-full overflow-hidden bg-[#F5F5F5]">
            <Image
              src={book.thumbnail}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </Link>

        {/* Book Details */}
        <div className="p-4">
          <Link href={`/books/${book.id}`}>
            <h3 className="mb-2 text-center text-base font-semibold text-[#222222] line-clamp-1 hover:text-[#74642F] transition-colors">
              {book.title}
            </h3>
          </Link>
          
          <p className="mb-3 text-center text-sm text-[#7A7A7A]">
            by {book.authorName}
          </p>

          {/* Rating */}
          <div className="mb-3 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${star <= Math.round(book.rating || 0) ? 'fill-[#FFC107] text-[#FFC107]' : 'fill-[#E0E0E0] text-[#E0E0E0]'}`}
              />
            ))}
            <span className="ml-2 text-xs text-[#7A7A7A]">
              {book.rating?.toFixed(1) || '0.0'} ({reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="mb-4 flex flex-col items-center">
            {(book as HomeBook).oldPrice && (
              <span className="text-sm text-[#7A7A7A] line-through">
                ${(book as HomeBook).oldPrice?.toFixed(2)}
              </span>
            )}
            <p className="text-xl font-semibold text-[#222222]">
              ${book.price.toFixed(2)}
            </p>
            {(book as HomeBook).discount && (
              <span className="mt-1 inline-block rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
                {(book as HomeBook).discount}
              </span>
            )}
          </div>

          {/* Actions */}
          {showActions ? (
            <div className="flex gap-2">
              <Link href={`/books/${book.id}`} className="flex-1">
                <button className="w-full text-black flex items-center justify-center gap-2 border-[#D0D0D0] hover:border-[#222222] hover:bg-transparent">
                  <Eye className="h-4 w-4" />
                
                </button>
              </Link>
              <Link href={`/books/${book.id}/edit`} className="flex-1">
                <button className="w-full text-black flex items-center justify-center gap-2 border-[#D0D0D0] hover:border-[#222222] hover:bg-transparent">
                  <Edit className="h-4 w-4" />
               
                </button>
              </Link>
            
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="w-full bg-[#111111] hover:bg-[#222222]"
              size="sm"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
      <ConfirmDialog
        open={openConfirm}
        title="Delete Book"
        description={`Are you sure you want to delete "${book.title}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          setOpenConfirm(false);
          onDelete?.(book.id);
        }}
        onCancel={() => setOpenConfirm(false)}
      />
    </Card>
  );
}
