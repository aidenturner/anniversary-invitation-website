'use client';

import { useId } from 'react';

export type DividerVariant = 'wave' | 'dots' | 'line' | 'flourish';

const variants: DividerVariant[] = ['wave', 'dots', 'line', 'flourish'];

export function DecorativeDivider({
  variant = 'wave',
  className,
}: {
  variant?: DividerVariant;
  className?: string;
}) {
  const id = useId().replace(/:/g, '');
  const gradientId = `divider-gradient-${id}`;

  return (
    <div className={`flex justify-center ${className ?? ''}`} aria-hidden>
      {variant === 'wave' && (
        <svg
          width="160"
          height="32"
          viewBox="0 0 160 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground/60"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
              <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M8 16 Q48 4, 80 16 T152 16"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )}

      {variant === 'dots' && (
        <svg
          width="120"
          height="24"
          viewBox="0 0 120 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground/70"
        >
          <circle cx="30" cy="12" r="3" fill="var(--color-secondary)" className="opacity-80" />
          <circle cx="60" cy="12" r="4" fill="var(--color-primary)" />
          <circle cx="90" cy="12" r="3" fill="var(--color-secondary)" className="opacity-80" />
        </svg>
      )}

      {variant === 'line' && (
        <svg
          width="160"
          height="24"
          viewBox="0 0 160 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground/50"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <line
            x1="20"
            y1="12"
            x2="140"
            y2="12"
            stroke={`url(#${gradientId})`}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      )}

      {variant === 'flourish' && (
        <svg
          width="140"
          height="28"
          viewBox="0 0 140 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground/60"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.85" />
              <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path
            d="M10 14 Q35 6, 70 14 Q105 22, 130 14"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
}

export { variants as dividerVariants };
