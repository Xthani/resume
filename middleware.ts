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

  // Определяем локаль из заголовков, куки или используем дефолтную
  const locale = getLocale(request) ?? defaultLocale

  // Перенаправляем на URL с локалью
  const newPath = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  const newUrl = new URL(newPath, request.url)
  
  // Создаем ответ с перенаправлением и устанавливаем куки
  const response = NextResponse.redirect(newUrl)
  response.cookies.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 год
    httpOnly: false, // Доступно для клиентского JavaScript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
  
  return response
}

function getLocale(request: NextRequest): string | undefined {
  // Сначала проверяем куки (приоритет пользовательского выбора)
  const localeCookie = request.cookies.get('locale')?.value
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie
  }

  // Проверяем заголовок Accept-Language
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang))
    
    if (preferredLocale) return preferredLocale
  }

  return undefined
}

export const config = {
  matcher: [
    // Пропускаем статические файлы и API роуты
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 