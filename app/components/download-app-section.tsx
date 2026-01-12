import Image from 'next/image';

export function DownloadAppSection() {
  return (
    <section className="bg-[#F3F2EC] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/3">
            <div className="relative h-80 sm:h-100 lg:h-125 w-full mx-auto">
              <Image
                src="/images/app/app.png"
                alt="Mobile App"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h2 className="mb-4 font-serif text-3xl md:text-4xl font-normal text-[#222222]">
              Download Our App Now !
            </h2>
            <p className="mb-8 max-w-xl mx-auto lg:mx-0 text-[#7A7A7A] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
              feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus
              ut magna velit eleifend. Amet, quis urna, a eu.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">

              <div className="relative h-12 w-40 cursor-pointer">
               <Image 
                 src="/images/app/googleplay.png" 
                 alt="Google Play Store" 
                 fill
                 className="object-contain"
               />
              </div>
              <div className="relative h-12 w-40 cursor-pointer">
                <Image 
                  src="/images/app/appstore.png" 
                  alt="Apple App Store" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
