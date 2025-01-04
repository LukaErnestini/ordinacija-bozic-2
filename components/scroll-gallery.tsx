"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollGalleryProps {
  images: string[];
  interval?: number; // Time in ms between auto-scrolls
  className?: string;
}

export default function ScrollGallery({ images, interval = 5000, className = "" }: ScrollGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((current) => (current + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition duration
  }, [images.length, isAnimating]);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((current) => (current - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition duration
  }, [images.length, isAnimating]);

  // Auto-scroll effect
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [goToNext, images.length, interval]);

  if (!images.length) return null;

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {/* Image container */}
      <div
        className="relative aspect-video w-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 500ms ease-in-out"
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{ left: `${index * 100}%` }}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 backdrop-blur-sm p-2 rounded-full transform opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 backdrop-blur-sm p-2 rounded-full transform opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-white w-4" : "bg-white/50 hover:bg-white/70"
                }`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
