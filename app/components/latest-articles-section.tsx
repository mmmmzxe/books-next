"use client";

import Image from 'next/image';
import { Button, Card, CardContent } from '@/shared/ui';
import { Calendar, Clock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  date: string;
  image: string;
}

interface LatestArticlesSectionProps {
  articles: Article[];
}

export function LatestArticlesSection({ articles }: LatestArticlesSectionProps) {
  const router = useRouter();

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium tracking-wider text-[#7A7A7A]">
            READ OUR ARTICLES
          </p>
          <h2 className="font-serif text-4xl font-normal text-[#222222]">
            Latest Articles
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.id} className="cursor-pointer overflow-hidden">
              <div className="relative h-55 w-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-medium text-[#222222] leading-snug">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-[#7A7A7A]">
                  <span>{article.date}</span>
                  <div className="flex gap-2">
                    <button aria-label="Clock"><Clock className="h-4 w-4" /></button>
                    <button aria-label="User"><User className="h-4 w-4" /></button>
                    <button aria-label="Calendar"><Calendar className="h-4 w-4" />  </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button onClick={() => {
            router.push('/articles');
          }} variant="ghost">READ ALL ARTICLES →</Button>
        </div>
      </div>
    </section>
  );
}

