'use client';

import { useHomePage } from '../shared/hooks/use-home-page';
import {
  HeroSection,
  CategoriesSection,
  FeaturedBooksSection,
  BestSellingBookSection,
  PopularBooksSection,
  QuoteSection,
  BooksWithOfferSection,
  NewsletterSection,
  LatestArticlesSection,
  DownloadAppSection,
} from './components';
import Loading from './loading';

export default function HomePage() {
  const {
    email,
    handleNewsletterSubmit,
    handleEmailChange,
    homeData,
    isLoading,
  } = useHomePage();


  if (isLoading) {
    return (
     <Loading/>
    );
  }

  if (!homeData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F9]">
        <p className="text-[#7A7A7A]">Failed to load books</p>
      </div>
    );
  }

  const { featuredBooks, bestSelling, popularBooks, booksWithOffer, articles } = homeData;

  return (
    <div className="min-h-screen bg-[#FAF9F9]">
      <HeroSection />
      <CategoriesSection />
      <FeaturedBooksSection
        books={featuredBooks}
      />
      <BestSellingBookSection book={bestSelling} />
      <PopularBooksSection books={popularBooks} />
      <QuoteSection />
      <BooksWithOfferSection
        books={booksWithOffer}
      />
      <NewsletterSection
        email={email}
        onEmailChange={handleEmailChange}
        onSubmit={handleNewsletterSubmit}
      />
      <LatestArticlesSection articles={articles} />
      <DownloadAppSection />
    </div>
  );
}
