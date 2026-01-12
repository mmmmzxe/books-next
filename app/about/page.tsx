'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#222222]">
      <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
        
        {/* Header Section */}
        <div className="mb-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#7A7A7A]">
            ARTICLE • OCTOBER 2022
          </p>
          <h1 className="font-serif text-4xl font-normal leading-tight md:text-5xl lg:text-6xl text-[#222222]">
            During the golden hour.
          </h1>
        </div>

        {/* First Content Block */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start mb-24 transition-all duration-700 ease-in-out">
          {/* Text Content */}
          <div className="space-y-8 pt-4">
            <p className="text-lg leading-relaxed text-[#555555]">
              On this conceptual jewelry website, this is an article discussing whom this brand is currently collaborating with. I chose to introduce this element as part of both the aesthetic makeup and the &quot;official&quot; quality of Apollonian, whose extras are inspired by Tiffany &amp; Co.&apos;s Stories and Cartier&apos;s Discover sections.
            </p>
            <p className="text-base leading-relaxed text-[#7A7A7A]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin sed libero enim sed. Dignissim enim sit amet venenatis urna cursus. Odio aenean sed adipiscing diam donec. Ut consequat semper viverra nam libero justo laoreet sit amet. Est lorem ipsum dolor sit amet consectetur adipiscing. Tempor orci dapibus ultrices in iaculis nunc. <span className="text-[#D4A373] cursor-pointer hover:underline">Tristique sollicitudin nibh sit amet commodo nulla.</span>
            </p>
            <p className="text-base leading-relaxed text-[#7A7A7A]">
              At ultrices mi tempus imperdiet nulla malesuada. Varius duis at consectetur lorem donec. Cursus euismod quis viverra nibh cras pulvinar. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Nibh tortor id aliquet lectus proin nibh. Aenean sed adipiscing diam donec adipiscing. Eros in cursus turpis massa tincidunt dui. Sed odio morbi quis commodo. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Tempor id eu nisl nunc mi ipsum faucibus vitae. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam.
            </p>
          </div>

          {/* Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F0F0F0]">
            <Image
              src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=2070&auto=format&fit=crop"
              alt="Woman wearing gold earrings"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Quote Section */}
        <div className="mb-24 flex justify-center">
          <div className="max-w-2xl text-center">
            <blockquote className="mb-4 font-serif text-2xl italic leading-relaxed text-[#222222] md:text-3xl">
              &quot;This is a quote by the collaborator discussed in this article.&quot;
            </blockquote>
            <cite className="block text-sm font-medium not-italic text-[#7A7A7A]">
              — John Fern on his plans for the brand
            </cite>
          </div>
        </div>

        {/* Second Content Block */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start transition-all duration-700 ease-in-out">
          {/* Image (Left on desktop) */}
          <div className="order-2 lg:order-1 relative aspect-[3/4] w-full overflow-hidden bg-[#F0F0F0]">
            <Image
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop"
              alt="Open book with flowers and gold jewelry"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-8 pt-4">
            <p className="text-base leading-relaxed text-[#7A7A7A]">
              Cursus euismod quis viverra nibh. Feugiat in ante metus dictum at tempor commodo. Purus non enim praesent elementum facilisis leo. Ipsum dolor sit amet consectetur adipiscing. Duis at consectetur lorem donec massa sapien. <span className="text-[#D4A373] cursor-pointer hover:underline">Quam vulputate dignissim suspendisse in est ante in nibh mauris.</span> Sit amet est placerat in egestas erat imperdiet. Maecenas volutpat blandit aliquam etiam erat.
            </p>
            <p className="text-base leading-relaxed text-[#7A7A7A]">
              Morbi tempus iaculis urna id. Quam elementum pulvinar etiam non quam lacus. Lacus vestibulum sed arcu non odio euismod.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
