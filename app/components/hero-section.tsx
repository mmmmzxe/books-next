'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    id: 1,
    title: 'Life Of The Wild',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend.',
    image: '/images/books/book.png',
    accentColor: '#222222',
  },
  {
    id: 2,
    title: 'Birds of Paradise',
    description:
      "Exploring the vibrant plumage and complex mating dances of the world's most beautiful avian species in their natural habitat.",
    image: '/images/books/book-2.png',
    accentColor: '#74642F',
  },
];

type Slide = (typeof SLIDES)[number];

function useHeroSlider(slides: Slide[] = SLIDES) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      if (newDirection === 1) {
        return prev === slides.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? slides.length - 1 : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return {
    currentSlide,
    direction,
    slide: slides[currentSlide],
    slideVariants,
    paginate,
    goToSlide,
  };
}

export function HeroSection() {
  const { currentSlide, direction, slide, slideVariants, paginate, goToSlide } =
    useHeroSlider();

  return (
    <div className="relative flex min-h-[85vh] flex-col overflow-hidden bg-[#F3F2EC]">
      <section className="relative flex grow items-center">
        <button 
          onClick={() => paginate(-1)}
          className="absolute left-4 md:left-10 z-30 p-4 rounded-full bg-black/5 hover:bg-black/10 text-black transition-all active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => paginate(1)}
          className="absolute right-4 md:right-10 z-30 p-4 rounded-full bg-black/5 text-black hover:bg-black/10 transition-all active:scale-95"
        >
          <ChevronRight size={20} />
        </button>

        <div className="container mx-auto px-6 py-12 md:px-12">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 }
              }}
              className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20"
            >
              {/* Left Column (Text) */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 font-serif text-5xl md:text-[84px] leading-tight font-normal text-[#222222]"
                >
                  {slide.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-10 max-w-sm mx-auto lg:mx-0 text-[#7A7A7A] leading-relaxed text-sm md:text-base"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button 
                    variant="outline" 
                    className="px-10 py-6 border-black/20 text-xs tracking-widest hover:bg-black hover:text-white transition-all rounded-none"
                  >
                    READ MORE →
                  </Button>
                </motion.div>
              </div>

              {/* Right Column (Image + Shape) */}
              <div className="w-full lg:w-1/2 relative flex justify-center items-center">
                {/* Background Shape (Animated Pulse) */}
               
                
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  className="relative shadow-[30px_30px_60px_-15px_rgba(0,0,0,0.3)]"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={400}
                    height={550}
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3 lg:bottom-12 lg:left-[15%] lg:translate-x-0">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'scale-125 bg-[#7A7A7A]'
                  : 'bg-[#D7D5CC] hover:bg-[#7A7A7A]/50'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
