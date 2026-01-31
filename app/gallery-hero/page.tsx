import Image from 'next/image';
import { Waves } from 'lucide-react';
import { RSVPForm } from '@/components/rsvp-form';
import { DecorativeDivider } from '@/components/decorative-divider';
import { PhotoGallery } from '@/components/photo-gallery';
import fs from 'fs';
import path from 'path';

export default function Home() {
  // Get images from public/gallery
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  let galleryImages: string[] = [];

  try {
    const files = fs.readdirSync(galleryDir);
    galleryImages = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => `/gallery/${file}`);
  } catch (error) {
    console.error('Error reading gallery directory:', error);
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Confetti background - using theme colors */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Confetti dots - blue (primary) and pink (secondary) */}
        {/* Top area */}
        <div className="absolute top-[5%] left-[8%] w-2 h-2 bg-primary/40 rounded-full" />
        <div className="absolute top-[3%] left-[25%] w-1.5 h-1.5 bg-secondary/50 rounded-full" />
        <div className="absolute top-[8%] left-[45%] w-1 h-1 bg-primary/30 rounded-full" />
        <div className="absolute top-[2%] left-[70%] w-2.5 h-2.5 bg-secondary/45 rounded-full" />
        <div className="absolute top-[6%] left-[85%] w-1.5 h-1.5 bg-primary/35 rounded-full" />
        <div className="absolute top-[12%] left-[15%] w-1 h-1 bg-secondary/40 rounded-full" />
        <div className="absolute top-[10%] left-[60%] w-2 h-2 bg-primary/25 rounded-full" />
        <div className="absolute top-[15%] left-[92%] w-1.5 h-1.5 bg-secondary/50 rounded-full" />

        {/* Upper-mid */}
        <div className="absolute top-[20%] left-[3%] w-1.5 h-1.5 bg-primary/40 rounded-full" />
        <div className="absolute top-[25%] left-[30%] w-1 h-1 bg-secondary/30 rounded-full" />
        <div className="absolute top-[22%] left-[78%] w-2 h-2 bg-primary/35 rounded-full" />
        <div className="absolute top-[28%] left-[95%] w-1.5 h-1.5 bg-secondary/45 rounded-full" />

        {/* Mid - sparser */}
        <div className="absolute top-[40%] left-[5%] w-1 h-1 bg-secondary/30 rounded-full" />
        <div className="absolute top-[45%] left-[88%] w-1.5 h-1.5 bg-primary/35 rounded-full" />
        <div className="absolute top-[50%] left-[2%] w-2 h-2 bg-secondary/25 rounded-full" />
        <div className="absolute top-[55%] left-[94%] w-1 h-1 bg-primary/40 rounded-full" />

        {/* Lower */}
        <div className="absolute top-[65%] left-[7%] w-1.5 h-1.5 bg-primary/40 rounded-full" />
        <div className="absolute top-[70%] left-[20%] w-1 h-1 bg-secondary/35 rounded-full" />
        <div className="absolute top-[68%] left-[82%] w-2 h-2 bg-primary/30 rounded-full" />
        <div className="absolute top-[75%] left-[90%] w-1.5 h-1.5 bg-secondary/45 rounded-full" />

        {/* Bottom */}
        <div className="absolute top-[82%] left-[10%] w-2 h-2 bg-secondary/40 rounded-full" />
        <div className="absolute top-[85%] left-[35%] w-1.5 h-1.5 bg-primary/35 rounded-full" />
        <div className="absolute top-[88%] left-[55%] w-1 h-1 bg-secondary/30 rounded-full" />
        <div className="absolute top-[90%] left-[75%] w-2 h-2 bg-primary/40 rounded-full" />
        <div className="absolute top-[92%] left-[15%] w-1.5 h-1.5 bg-secondary/45 rounded-full" />
        <div className="absolute top-[95%] left-[45%] w-1 h-1 bg-primary/30 rounded-full" />
        <div className="absolute top-[93%] left-[88%] w-2 h-2 bg-secondary/35 rounded-full" />
      </div>
      {/* Hero – Event title & Couple names */}
      <section className="relative z-10 pt-12 pb-4 px-4 md:pt-16 md:pb-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Event Title */}
          <div className="text-center space-y-2">
            <p className="text-base text-muted-foreground tracking-wide">
              You&apos;re invited to
            </p>
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-primary tracking-tight">
              Ian & Bay&apos;s
            </h1>
            <p className="text-xl md:text-2xl font-serif text-foreground">
              10th Anniversary Celebration
            </p>
          </div>

          {/* Photo */}
          <div className="flex justify-center px-4">
            <div className="relative w-full max-w-2xl mx-auto">
              {/* Gradient border */}
              <div className="relative w-full aspect-square rounded-[1rem] p-[4px] bg-gradient-to-br from-primary via-secondary to-primary">
                <div className="relative w-full h-full rounded-[1rem] overflow-hidden">
                  {/* Loading skeleton */}
                  <div className="absolute inset-0 image-skeleton rounded-[1rem] z-0" aria-hidden />
                  <Image
                    src="/anniversary-hero.jpg"
                    alt="Ian & Bay"
                    fill
                    className="object-cover object-[center_30%] image-loaded relative z-10"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Date & Location */}
          <div className="text-center space-y-2">
            <p className="text-3xl md:text-4xl font-serif font-bold text-primary">
              November 21, 2026
            </p>
            <p className="flex items-center justify-center gap-1.5 text-lg md:text-xl font-serif text-muted-foreground font-medium">
              <Waves className="size-4 shrink-0 text-primary" aria-hidden />
              Nha Trang, Vietnam
              <Waves className="size-4 shrink-0 text-primary" aria-hidden />
            </p>
          </div>
        </div>
      </section>

      <DecorativeDivider variant="dots" className="py-2" />

      {/* Message Section */}
      <section className="relative z-10 py-4 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-foreground leading-relaxed">
            We&apos;d love for you to celebrate with us. This gathering means a lot—you&apos;ve
            been an important part of our journey, and we want to share this milestone with you.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Shared with you personally — thank you for keeping it private.
          </p>
        </div>
      </section>

      <DecorativeDivider variant="dots" className="py-2" />

      {/* RSVP Section */}
      <section className="relative z-10 py-6 px-4 md:py-8" aria-labelledby="rsvp-heading">
        <div className="max-w-3xl mx-auto">
          <h2 id="rsvp-heading" className="sr-only">RSVP</h2>
          <div className="bg-card rounded-lg p-5 md:p-6 border border-border shadow-sm">
            <div className="mb-8 pb-6 border-b border-border space-y-4">
              <p className="text-xl font-serif text-primary text-center font-medium">
                Confirm your attendance
              </p>
              <p className="text-foreground leading-relaxed text-center">
                We&apos;ll take care of hotel, meals, and airport transportation.<br />
                Kindly let us know by <span className="font-semibold text-primary">March 31, 2026</span>.
              </p>
            </div>

            <RSVPForm />
          </div>
        </div>
      </section>

      <DecorativeDivider variant="wave" className="py-4" />

      {/* Photo Gallery */}
      <PhotoGallery images={galleryImages} />

      <DecorativeDivider variant="dots" className="py-2" />

      {/* Closing */}
      <section className="relative z-10 py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-lg text-foreground">We can&apos;t wait to celebrate with you.</p>
          <p className="text-2xl md:text-3xl font-serif text-primary">
            Ian & Bay
          </p>
        </div>
      </section>
    </main>
  )
}
