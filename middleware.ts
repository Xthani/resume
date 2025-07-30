import { NextRequest, NextResponse } from 'next/server'

const locales = ['ru', 'en']
const defaultLocale = 'ru'

export function middleware(request: NextRequest) {
  // Получаем путь из URL
  const pathname = request.nextUrl.pathname

  // Проверяем, есть ли уже локаль в пути
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Определяем локаль из заголовков или используем дефолтную
  const locale = getLocale(request) ?? defaultLocale

  // Перенаправляем на URL с локалью
  const newPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  const newUrl = new URL(newPath, request.url)
  return NextResponse.redirect(newUrl)
}

function getLocale(request: NextRequest): string | undefined {
  // Проверяем заголовок Accept-Language
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang))
    
    if (preferredLocale) return preferredLocale
  }

  // Проверяем куки
  const localeCookie = request.cookies.get('locale')?.value
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie
  }

  return undefined
}

export const config = {
  matcher: [
    // Пропускаем статические файлы и API роуты
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 