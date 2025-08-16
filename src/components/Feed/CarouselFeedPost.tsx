"use client";

import { ImageFile } from "@/lib/types";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type CarouselFeedPostProps = {
  imageUrl: ImageFile[];
};

const CarouselFeedPost = ({ imageUrl }: CarouselFeedPostProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {imageUrl.map((img, i) => (
              <div key={img.id} className="relative min-w-0 flex-[0_0_100%]">
                <Image
                  src={img.url}
                  alt="post"
                  height={300}
                  width={400}
                  priority={i === 0}
                  className="container mt-4 rounded-md border"
                />
              </div>
            ))}
          </div>
        </div>
        {imageUrl.length > 1 && (
          <div className="absolute top-6 right-2 z-10 rounded bg-black/50 p-1 text-sm text-white">
            {selectedIndex + 1} / {imageUrl.length}
          </div>
        )}
      </div>
    </>
  );
};

export default CarouselFeedPost;
