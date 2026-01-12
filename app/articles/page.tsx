"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/shared/ui';
import { ARTICLES } from '@/shared/hooks/mock-articles';



export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <header className="container mx-auto max-w-7xl px-6 pt-12 pb-8 md:pt-24 md:pb-16">
        <div className="max-w-3xl">
          <h1 className="mb-6 font-serif text-4xl font-medium tracking-tight text-neutral-900 md:text-7xl">
            Literary <br className="hidden md:block" /> Perspective
          </h1>
          <p className="text-lg leading-relaxed text-neutral-500 md:text-xl">
            Explorations into the world of books, authors, and the culture of reading. 
            Updated weekly by our editorial team.
          </p>
        </div>
      </header>


      {/* Featured Article (Top One) */}
      {ARTICLES[0] && (
        <section className="container mx-auto max-w-7xl px-6 mb-24">
          <Link href={`/articles/${ARTICLES[0].id}`} className="group block overflow-hidden rounded-4xl bg-white shadow-sm transition-all hover:shadow-xl border border-neutral-100">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-square lg:aspect-auto h-full overflow-hidden">
                <Image
                  src={ARTICLES[0].image}
                  alt={ARTICLES[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-16">
                <div className="mb-6 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#74642F]">
                  <span>{ARTICLES[0].category}</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-300" />
                  <span>Featured</span>
                </div>
                <h2 className="mb-6 font-serif text-4xl font-medium leading-tight text-neutral-900 group-hover:text-[#74642F] transition-colors md:text-5xl">
                  {ARTICLES[0].title}
                </h2>
                <p className="mb-10 text-lg leading-relaxed text-neutral-500">
                  {ARTICLES[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-neutral-400">
                    <User className="h-4 w-4" />
                    <span>{ARTICLES[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-neutral-900 uppercase text-xs tracking-widest">
                    Read Story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Articles Grid */}
      <section className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.slice(1).map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <div className="mb-8 relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F5F5F3]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm transition-transform group-hover:scale-110">
                  <ArrowRight className="h-4 w-4 text-black" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#74642F]">
                  <span>{article.category}</span>
                  <span className="h-1 w-1 rounded-full  bg-neutral-300" />
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="font-serif text-2xl font-medium leading-tight text-neutral-900 group-hover:text-[#74642F] transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-neutral-500 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-4 pt-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto max-w-5xl px-6 mt-32">
        <div className="rounded-[3rem] bg-[#111111] p-12 text-center text-white md:p-24">
          <h2 className="mb-6 font-serif text-4xl font-medium md:text-5xl">Stories delivered to you.</h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-neutral-400">
            Subscribe to our newsletter and receive the best literary insights and news directly in your inbox.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="h-16 flex-1 rounded-full border-none bg-neutral-800 px-8 text-white focus:ring-2 focus:ring-[#74642F]"
            />
            <Button className="h-16 rounded-full px-10  text-black ">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
