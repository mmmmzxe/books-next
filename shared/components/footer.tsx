import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { ROUTES } from '@/core';

export function Footer() {
  return (
    <footer className="bg-white py-12 border-t-2 border-[#E0E0E0]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-8">
          <div>
            <h3 className="mb-4 font-serif text-2xl font-bold text-[#222222]">
              BOOKSAW
            </h3>
            <p className="text-sm text-[#7A7A7A]">
              © 2026 All rights mmmmzxe.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold text-[#222222]">About Us</h4>
            <ul className="space-y-2 text-sm text-[#7A7A7A]">
              <li><a href="#" className="hover:text-[#222222]">VISION</a></li>
              <li><a href="#" className="hover:text-[#222222]">ARTICLES</a></li>
              <li><a href="#" className="hover:text-[#222222]">CAREERS</a></li>
              <li><a href="#" className="hover:text-[#222222]">SERVICE TERMS</a></li>
              <li><a href="#" className="hover:text-[#222222]">DONATE</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold text-[#222222]">Discover</h4>
            <ul className="space-y-2 text-sm text-[#7A7A7A]">
              <li><a href="#" className="hover:text-[#222222]">HOME</a></li>
              <li><a href={ROUTES.BOOKS_SHOP} className="hover:text-[#222222]">BOOKS</a></li>
              <li><a href="#" className="hover:text-[#222222]">AUTHORS</a></li>
              <li><a href="#" className="hover:text-[#222222]">SUBJECTS</a></li>
              <li><a href="#" className="hover:text-[#222222]">ADVANCED SEARCH</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold text-[#222222]">My Account</h4>
            <ul className="space-y-2 text-sm text-[#7A7A7A]">
              <li><Link href={ROUTES.LOGIN} className="hover:text-[#222222]">SIGN IN</Link></li>
              <li><Link href={ROUTES.PROFILE} className="hover:text-[#222222]">VIEW CART</Link></li>
              <li><Link href={ROUTES.MY_BOOKS} className="hover:text-[#222222]">MY BOOKS</Link></li>
              <li><a href="#" className="hover:text-[#222222]">TRACK MY ORDER</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4 border-t-2 border-[#E0E0E0] pt-8">
          <a href="#" className="text-[#7A7A7A] hover:text-[#222222] transition-colors">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="text-[#7A7A7A] hover:text-[#222222] transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="text-[#7A7A7A] hover:text-[#222222] transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="text-[#7A7A7A] hover:text-[#222222] transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#" className="text-[#7A7A7A] hover:text-[#222222] transition-colors">
            <Youtube className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
