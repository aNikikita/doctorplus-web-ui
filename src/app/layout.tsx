import './globals.css'
import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/config'
import { QueryProvider } from '@/components/providers/query-provider'

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: 'website',
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
