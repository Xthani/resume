import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Frontend Developer Resume — [Ваше имя]',
  description: 'Лендинг-резюме фронтенд-разработчика с примерами проектов, навыками и контактами.',
  keywords: ['frontend', 'resume', 'react', 'typescript', 'разработчик', 'портфолио'],
  authors: [{ name: '[Ваше имя]', url: 'https://ваш-сайт.ру' }],
  creator: '[Ваше имя]',
  openGraph: {
    title: 'Frontend Developer Resume — [Ваше имя]',
    description: 'Сайт-визитка с воронкой продаж для HR и заказчиков',
    url: 'https://ваш-сайт.ру',
    siteName: 'Frontend Resume',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Frontend Developer Resume — [Ваше имя]" />
        <meta name="twitter:description" content="Лендинг с навыками, проектами и контактами" />
        <meta name="twitter:image" content="/preview.png" />
      </head>
      <body className={`${inter.className} bg-background text-foreground transition-colors`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
