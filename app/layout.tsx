import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, JetBrains_Mono } from 'next/font/google'
import { portfolio } from '@/lib/portfolio-config'
import { withBasePath } from '@/lib/site-path'
import { THEME_STORAGE_KEY, themeNames } from '@/lib/themes'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

const title = `${portfolio.name} — ${portfolio.role}`
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : undefined)
const siteUrl = configuredSiteUrl ? new URL(configuredSiteUrl) : undefined

export const metadata: Metadata = {
  title,
  description: `${portfolio.tagline} ${portfolio.availability.open ? portfolio.availability.message : ''}`.trim(),
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  authors: [{ name: portfolio.name, url: siteUrl?.href ?? portfolio.website }],
  keywords: [portfolio.name, portfolio.role, 'portfolio', ...portfolio.skills.flatMap((s) => s.items).slice(0, 10)],
  openGraph: {
    title,
    description: portfolio.tagline,
    type: 'profile',
    ...(siteUrl ? { url: siteUrl.href } : {}),
    images: [{ url: withBasePath('/opengraph-image'), width: 1200, height: 630, alt: `${portfolio.name} portfolio` }],
  },
  twitter: { card: 'summary_large_image', title, description: portfolio.tagline, images: [withBasePath('/opengraph-image')] },
  generator: 'v0.app',
  icons: {
    icon: [
      { url: withBasePath('/icon-light-32x32.png'), media: '(prefers-color-scheme: light)' },
      { url: withBasePath('/icon-dark-32x32.png'), media: '(prefers-color-scheme: dark)' },
      { url: withBasePath('/icon.svg'), type: 'image/svg+xml' },
    ],
    apple: withBasePath('/apple-icon.png'),
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0f17',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const themeScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var v=${JSON.stringify(themeNames)};document.documentElement.dataset.theme=v.indexOf(t)>-1?t:'${portfolio.defaultTheme}'}catch(e){}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme={portfolio.defaultTheme}
      className={`${geist.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
