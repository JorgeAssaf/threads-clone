import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s |${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('antialiased', inter.className)}>
        <ThemeProvider attribute='class' defaultTheme='system'>
          {children}
          <Toaster position='bottom-center' />
        </ThemeProvider>
      </body>
    </html>
  )
}

