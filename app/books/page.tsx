import { Metadata } from 'next';
import { BooksShopContent } from './books-shop-content';

export const metadata: Metadata = {
  title: "Shop Books",
  description: "Browse our expansive library of books. Filter by category, price, and title to find exactly what you're looking for.",
};

export default function BooksShopPage() {
  return <BooksShopContent />;
}

