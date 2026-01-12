'use client';

import Image from 'next/image';

const brandImages = [
  { file: '1.png' },
  { file: '2.png' },
  { file: '3.png' },
  { file: '4.png' },
  { file: '5.png' },
];

function getLabelFromFilename(filename: string) {
  const name = filename.replace(/\.[^/.]+$/, '');
  return `Brand ${name}`;
}

export function CategoriesSection() {
  return (
    <section className="bg-[#F3F2EC] py-20 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 transition-opacity">
          {brandImages.map((brand) => (
            <div key={brand.file} className="flex flex-col items-center">
              <div className="relative mb-1 h-20 w-20">
                <Image
                  src={`/images/brands/${brand.file}`}
                  alt={getLabelFromFilename(brand.file)}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#222222]">
                {getLabelFromFilename(brand.file)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
