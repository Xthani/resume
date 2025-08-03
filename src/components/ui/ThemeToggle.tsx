'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { motion } from 'framer-motion'
import ClientOnly from './ClientOnly'

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
              <div className="p-3 md:p-2 rounded-lg bg-muted/10 w-12 h-12 md:w-9 md:h-9 flex items-center justify-center">
          <div className="w-6 h-6 md:w-5 md:h-5 bg-muted/30 rounded animate-pulse" />
        </div>
    )
  }

  return (
    <ClientOnly
      fallback={
        <div className="p-3 md:p-2 rounded-lg bg-muted/10 w-12 h-12 md:w-9 md:h-9 flex items-center justify-center">
          <div className="w-6 h-6 md:w-5 md:h-5 bg-muted/30 rounded animate-pulse" />
        </div>
      }
    >
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 md:p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer
                 text-foreground focus:outline-none focus:ring-2 focus:ring-accent
                 focus:ring-offset-2 focus:ring-offset-background"
        aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 md:w-5 md:h-5"
        >
          {theme === 'dark' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 md:w-5 md:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M3 12a9 9 0 1018 0 9 9 0 00-18 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 md:w-5 md:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </ClientOnly>
  )
}

export default ThemeToggle 