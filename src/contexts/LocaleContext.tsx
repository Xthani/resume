'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
import { Locale, LocaleContextType, Translations } from '@/types/locale'

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const translations: Record<Locale, Translations> = {
  ru: ru as Translations,
  en: en as Translations,
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Получаем локаль из URL при загрузке только на клиенте
    const pathname = window.location.pathname
    const localeFromPath = pathname.split('/')[1] as Locale
    if (localeFromPath && (localeFromPath === 'ru' || localeFromPath === 'en')) {
      setLocaleState(localeFromPath)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    if (!mounted) return
    
    setLocaleState(newLocale)
    // Обновляем URL
    const currentPath = window.location.pathname
    const pathWithoutLocale = currentPath.replace(/^\/(ru|en)/, '')
    const newPath = `/${newLocale}${pathWithoutLocale || '/'}`
    window.location.href = newPath
    // Сохраняем в куки
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
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