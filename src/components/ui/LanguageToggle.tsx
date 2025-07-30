'use client'

import { useLocale } from '@/contexts/LocaleContext'
import { motion } from 'framer-motion'

const LanguageToggle = () => {
  const { locale, setLocale, mounted, isChanging } = useLocale()

  const handleLanguageChange = async (newLocale: 'ru' | 'en') => {
    if (!mounted || isChanging) return
    if (newLocale !== locale) {
      await setLocale(newLocale)
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2 bg-muted/10 rounded-lg p-2 md:p-1 h-12 md:h-9">
        <div className="px-4 py-2 md:px-3 md:py-1.5 text-sm font-medium rounded-md bg-muted/30 animate-pulse">
          RU
        </div>
        <div className="px-4 py-2 md:px-3 md:py-1.5 text-sm font-medium rounded-md bg-muted/30 animate-pulse">
          EN
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 bg-muted/10 rounded-lg p-2 md:p-1 h-12 md:h-9">
      <motion.button
        onClick={() => handleLanguageChange('ru')}
        disabled={isChanging}
        className={`px-4 py-2 md:px-3 md:py-1.5 text-sm font-medium rounded-md transition-colors ${
          isChanging 
            ? 'opacity-50 cursor-not-allowed' 
            : 'cursor-pointer'
        } ${
          locale === 'ru'
            ? 'bg-accent text-white'
            : 'text-foreground/70 hover:text-foreground'
        }`}
        whileHover={!isChanging ? { scale: 1.05 } : {}}
        whileTap={!isChanging ? { scale: 0.95 } : {}}
      >
        {isChanging && locale === 'ru' ? (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 md:w-3 md:h-3 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>RU</span>
          </div>
        ) : (
          'RU'
        )}
      </motion.button>
      <motion.button
        onClick={() => handleLanguageChange('en')}
        disabled={isChanging}
        className={`px-4 py-2 md:px-3 md:py-1.5 text-sm font-medium rounded-md transition-colors ${
          isChanging 
            ? 'opacity-50 cursor-not-allowed' 
            : 'cursor-pointer'
        } ${
          locale === 'en'
            ? 'bg-accent text-white'
            : 'text-foreground/70 hover:text-foreground'
        }`}
        whileHover={!isChanging ? { scale: 1.05 } : {}}
        whileTap={!isChanging ? { scale: 0.95 } : {}}
      >
        {isChanging && locale === 'en' ? (
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 md:w-3 md:h-3 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>EN</span>
          </div>
        ) : (
          'EN'
        )}
      </motion.button>
    </div>
  )
}

export default LanguageToggle 