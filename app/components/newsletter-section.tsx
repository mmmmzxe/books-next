'use client';

import type React from 'react';
import { Button, Input } from '@/shared/ui';

interface NewsletterSectionProps {
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function NewsletterSection({
  email,
  onEmailChange,
  onSubmit,
}: NewsletterSectionProps) {
  return (
    <section className="relative flex h-100 items-center justify-center overflow-hidden bg-[#F3F2EC] py-24">
      <div className="absolute left-10 top-10 opacity-20">
        <div className="mb-4 h-12 w-12 rounded-full border border-black/10" />
        <div className="h-24 w-24 -ml-4 rounded-full border border-black/10" />
      </div>

      <div className="container mx-auto px-12">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            <h1 className="mb-2 font-serif text-3xl text-[#222222]">
              Subscribe To <br className="hidden lg:block" /> Our Newsletter
            </h1>
            <div className="flex justify-center lg:justify-start">
              <svg
                width="40"
                height="8"
                viewBox="0 0 40 8"
                fill="none"
                className="text-[#C5A992]"
              >
                <path
                  d="M1 5.5C3.5 5.5 5.5 2.5 8 2.5C10.5 2.5 12.5 5.5 15 5.5C17.5 5.5 19.5 2.5 22 2.5C24.5 2.5 26.5 5.5 29 5.5C31.5 5.5 33.5 2.5 36 2.5C38.5 2.5 40.5 5.5 43 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
            <p className="mb-10 max-w-md text-center lg:text-left leading-relaxed text-[#7A7A7A]">
              Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit
              amet, consectetur. Elit adipiscing enim pharetra hac.
            </p>

            <form
              onSubmit={onSubmit}
              className="relative flex max-w-lg items-center gap-4 border-b border-black/20 pb-4"
            >
              <Input
                type="email"
                value={email}
                onChange={onEmailChange}
                placeholder="Enter Your Email Address Here"
                className="border-none bg-transparent px-0 text-[#222222] placeholder:text-[#9E9E9E] placeholder:uppercase placeholder:tracking-widest focus:ring-0"
              />
              <Button
                type="submit"
                variant="ghost"
                className="flex items-center gap-2 px-0 text-xs font-bold tracking-[0.2em] text-[#222222] hover:text-[#74642F]"
              >
                SEND
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-0 opacity-10">
        <svg width="100" height="60" viewBox="0 0 100 60">
          {[0, 15, 30].map((y) => (
            <path
              key={y}
              d={`M0 ${y + 10} Q 25 ${y} 50 ${y + 10} T 100 ${y + 10}`}
              fill="none"
              stroke="black"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
    </section>
  );
}

