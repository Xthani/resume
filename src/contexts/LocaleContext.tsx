'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { Locale, LocaleContextType, Translations } from '@/types/locale'

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const translations: Record<Locale, Translations> = {
  ru: ru as Translations,
  en: en as Translations,
}

// Функция для получения куки на клиенте
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru')
  const [mounted, setMounted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    // Получаем локаль из URL при загрузке только на клиенте
    const pathSegments = pathname.split('/')
    const localeFromPath = pathSegments[1] as Locale
    
    if (localeFromPath && (localeFromPath === 'ru' || localeFromPath === 'en')) {
      setLocaleState(localeFromPath)
    } else {
      // Если локаль не в URL, проверяем куки
      const localeFromCookie = getCookie('locale') as Locale
      if (localeFromCookie && (localeFromCookie === 'ru' || localeFromCookie === 'en')) {
        setLocaleState(localeFromCookie)
      }
    }
  }, [pathname])

  const setLocale = async (newLocale: Locale) => {
    if (!mounted || isChanging) return
    
    setIsChanging(true)
    setLocaleState(newLocale)
    
    // Обновляем URL без перезагрузки страницы
    const pathWithoutLocale = pathname.replace(/^\/(ru|en)/, '')
    const newPath = `/${newLocale}${pathWithoutLocale || '/'}`
    
    try {
      // Используем router.push для программной навигации без перезагрузки
      await router.push(newPath)
      
      // Сохраняем в куки с теми же параметрами, что и в middleware
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; samesite=lax${process.env.NODE_ENV === 'production' ? '; secure' : ''}`
    } catch (error) {
      console.error('Error changing locale:', error)
    } finally {
      setIsChanging(false)
    }
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: unknown = translations[locale]
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key // Возвращаем ключ, если перевод не найден
      }
    }
    return typeof value === 'string' ? value : key
  }

  const value: LocaleContextType = {
    locale,
    setLocale,
    t,
    translations: translations[locale],
    mounted,
    isChanging,
  }

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
} 