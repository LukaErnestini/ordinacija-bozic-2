import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Image from "next/image";

type SlideImage = {
  src: string;
  alt: string;
  tinaField?: any;
};

type PropType = {
  slides: SlideImage[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );

  return (
    <section className="w-full">
      <div className="overflow-hidden rounded-2xl shadow-xl" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom -ml-4">
          {slides.map((slide, index) => (
            <div 
              className="flex-none min-w-0 pl-4 transform-gpu translate-z-0" 
              key={index}
              style={{ flexBasis: "100%" }}
            >
              <div className="relative h-64 lg:h-80 overflow-hidden select-none bg-neutral-100">
                <Image
                  data-tina-field={slide.tinaField}
                  className="w-full h-full object-cover"
                  src={slide.src}
                  alt={slide.alt}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fill
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? "bg-primary shadow-lg scale-110" 
                  : "bg-neutral hover:bg-secondary"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
