import { Metadata } from 'next';
import { HomePageContent } from './home-page-content';

export const metadata: Metadata = {
  title: "Premium Books Collection",
  description: "Discover our curated collection of best-selling books across Technology, Business, and more. Free shipping on all orders.",
};

export default function HomePage() {
  return <HomePageContent />;
}
