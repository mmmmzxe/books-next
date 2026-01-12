'use client';

import Image from 'next/image';

const brandImages = [
  { url: 'https://i.postimg.cc/wTYWb2pm/1.png', label: 'Brand 1' },
  { url: 'https://i.postimg.cc/pXM01CH8/2.png', label: 'Brand 2' },
  { url: 'https://i.postimg.cc/Wbc9f8v0/3.png', label: 'Brand 3' },
  { url: 'https://i.postimg.cc/X762DLbd/4.png', label: 'Brand 4' },
  { url: 'https://i.postimg.cc/yYCfrjHm/5.png', label: 'Brand 5' },
];

export function CategoriesSection() {
  return (
    <section className="bg-[#F3F2EC] py-20 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 transition-opacity">
          {brandImages.map((brand, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-1 h-20 w-20">
                <Image
                  src={brand.url}
                  alt={brand.label}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#222222]">
                {brand.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
