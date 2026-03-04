import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { OrganizationSchema, WebSiteSchema } from '@/lib/structured-data'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'Cutiespatooties Outfits | Fashion For Every Moment',
    template: '%s | Cutiespatooties Outfits',
  },
  description: 'Discover everyday outfits designed to make you feel effortlessly you. Celebrate love & comfort with Cutiespatooties premium fashion collection.',
  keywords: ['fashion', 'outfits', 'clothing', 'everyday wear', 'comfort fashion', 'women fashion', 'cute outfits'],
  authors: [{ name: 'Cutiespatooties' }],
  creator: 'Cutiespatooties',
  publisher: 'Cutiespatooties',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cutiespatooties.com',
    title: 'Cutiespatooties Outfits | Fashion For Every Moment',
    description: 'Discover everyday outfits designed to make you feel effortlessly you.',
    siteName: 'Cutiespatooties Outfits',
    images: [
      {
        url: 'https://cutiespatooties.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cutiespatooties Fashion Outfits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cutiespatooties Outfits',
    description: 'Discover everyday outfits designed to make you feel effortlessly you.',
    images: ['https://cutiespatooties.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://cutiespatooties.com',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
        <meta name="theme-color" content="#F5E6E0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://cutiespatooties.com" />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-valentine-cream text-valentine-charcoal antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

