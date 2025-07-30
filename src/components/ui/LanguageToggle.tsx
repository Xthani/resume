'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { motion } from 'framer-motion'

const LanguageToggle = () => {
  const { locale, setLocale, mounted } = useLocale()

  const handleLanguageChange = (newLocale: 'ru' | 'en') => {
    if (!mounted) return
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center space-x-1 bg-muted/10 rounded-lg p-1">
        <div className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted/30 animate-pulse">
          RU
        </div>
        <div className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted/30 animate-pulse">
          EN
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1 bg-muted/10 rounded-lg p-1">
      <motion.button
        onClick={() => handleLanguageChange('ru')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          locale === 'ru'
            ? 'bg-accent text-white'
            : 'text-foreground/70 hover:text-foreground'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        RU
      </motion.button>
      <motion.button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
          locale === 'en'
            ? 'bg-accent text-white'
            : 'text-foreground/70 hover:text-foreground'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </motion.button>
    </div>
  )
}

export default LanguageToggle 