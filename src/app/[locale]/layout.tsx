import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/ui/Navbar'
import '../globals.css'
import type { Translations } from '@/types/locale'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale as 'ru' | 'en';
  const translations = lang === 'en' ? await import('@/locales/en.json') : await import('@/locales/ru.json')
  const t = translations.default as Translations

  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: t.meta.author, url: t.meta.siteUrl }],
    creator: t.meta.author,
    openGraph: {
      title: t.meta.title,
      description: t.meta.ogDescription,
      url: t.meta.siteUrl,
      siteName: t.meta.siteName,
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.twitterDescription,
    },
  }
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale as 'ru' | 'en';

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-background text-foreground transition-colors`}>
        <LocaleProvider>
          <ThemeProvider>
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  )
} 