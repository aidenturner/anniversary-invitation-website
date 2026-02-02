'use client';

import * as React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

export function PhotoGallery({
  className,
  images = [],
  withHeader = true,
  variant = 'default',
  title = "Our Journey",
  subtitle = "Top moments from the last 10 years"
}: {
  className?: string;
  images?: string[];
  withHeader?: boolean;
  variant?: 'default' | 'hero';
  title?: string;
  subtitle?: string;
}) {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }) as any,
  ]);

  if (images.length === 0) return null;

  return (
    <div className={cn('w-full', withHeader ? 'py-8 space-y-4' : '', className)}>
      {withHeader && (
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-3xl font-serif text-primary">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
      )}

      <div className="overflow-visible" ref={emblaRef}>
        <div className="flex -ml-0 items-center">
          {images.map((src, index) => (
            <div
              key={index}
              className={cn(
                "min-w-0 px-2",
                variant === 'hero' ? "flex-[0_0_100%]" : "flex-[0_0_85%] md:flex-[0_0_65%]"
              )}
            >
              <div className={cn(
                "relative overflow-hidden shadow-sm border border-border/50 bg-card",
                variant === 'hero' ? "aspect-square rounded-[1rem]" : "aspect-[4/3] rounded-xl"
              )}>
                <Image
                  src={src}
                  alt={`Gallery photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes={variant === 'hero' ? "(max-width: 768px) 100vw, 672px" : "(max-width: 768px) 80vw, 50vw"}
                  priority={index === 0 && variant === 'hero'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
