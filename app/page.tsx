import { RSVPForm } from '@/components/rsvp-form';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 px-4 md:pt-12 md:pb-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Image Placeholder */}
          <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden border border-secondary/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-secondary/10" />
            <svg
              className="w-24 h-24 text-muted-foreground opacity-30 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Content Below Image */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-lg text-accent font-medium tracking-wide">Ian & Bay</p>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary">
                10 Years
              </h1>
              <p className="text-xl text-primary font-serif">Anniversary</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Save the Date</p>
              <p className="text-3xl md:text-4xl font-serif font-bold text-primary">
                November 21, 2025
              </p>
              <p className="text-lg text-muted-foreground">
                Nha Trang, Vietnam
              </p>
            </div>

            <p className="text-foreground leading-relaxed pt-2">
              We'd love for you to celebrate with us. This gathering means a lot to us—you've been an important part of our journey, and we want to share this milestone with you.
            </p>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-12 px-4 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-lg p-8 md:p-10 border border-secondary/30 shadow-sm">
            {/* Privacy Notice - Integrated */}
            <div className="mb-8 pb-6 border-b border-secondary/30">
              <p className="text-sm text-center text-foreground">
                This is a personal invitation for you. Please keep this link private and don't share it with others.
              </p>
            </div>

            {/* Form Intro */}
            <div className="mb-8 pb-8 border-b border-secondary/30 space-y-2">
              <p className="text-foreground leading-relaxed">
                We'd love to know if you can join us on <span className="font-semibold">November 21, 2025</span>. Hotel, meals, and airport transport are all covered. Please confirm by <span className="font-semibold">March 31</span>.
              </p>
            </div>

            <RSVPForm />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-lg text-foreground">
            We can't wait to celebrate with you.
          </p>
        </div>
      </section>
    </main>
  );
}
