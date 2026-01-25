import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Playfair_Display, Lora } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif-next' })
const lora = Lora({ subsets: ['latin'], variable: '--font-sans-next' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ian-bay-anniversary.vercel.app'

export const metadata: Metadata = {
  title: '10th Anniversary - Ian & Bay',
  description: 'You\'re invited to Ian & Bay\'s 10th Anniversary Celebration. November 21, 2026 · Nha Trang, Vietnam.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: '10th Anniversary - Ian & Bay',
    description: 'You\'re invited to Ian & Bay\'s 10th Anniversary Celebration. November 21, 2026 · Nha Trang, Vietnam.',
    url: '/',
    siteName: 'Ian & Bay',
    images: [{ url: '/anniversary-hero.jpg', width: 384, height: 384, alt: 'Ian & Bay' }],
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '10th Anniversary - Ian & Bay',
    description: 'You\'re invited to Ian & Bay\'s 10th Anniversary Celebration. November 21, 2026 · Nha Trang, Vietnam.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
