'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useLocale } from '@/contexts/LocaleContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t, mounted: localeMounted } = useLocale()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Плавный скролл по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault()
        const target = document.querySelector((e.currentTarget as HTMLAnchorElement).getAttribute('href')!)
        if (target) {
          // Закрываем мобильное меню при клике на ссылку
          setIsMobileMenuOpen(false)
          
          // Добавляем небольшую задержку для скролла, чтобы меню успело закрыться
          setTimeout(() => {
            target.scrollIntoView({
              behavior: 'smooth'
            })
          }, 100)
        }
      })
    })
  }, [mounted])

  // Обработчик клика вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Обработчик скролла для закрытия мобильного меню
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        // Добавляем debounce для обработчика скролла
        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
          setIsMobileMenuOpen(false)
        }, 50)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [isMobileMenuOpen])

  // Не рендерим навигацию пока не загрузится локаль
  if (!mounted || !localeMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-muted/20">
              <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-16">
          <div className="flex items-center space-x-4">
              <div className="w-20 h-4 bg-muted/30 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    )
  }

  const navItems = [
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contacts', label: t('nav.contacts') }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3 md:space-x-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 md:p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors
                       text-foreground focus:outline-none focus:ring-2 focus:ring-accent
                       focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Открыть меню"
              ref={menuButtonRef}
            >
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mounted && (
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden border-t border-muted/20 bg-background/95 backdrop-blur-sm"
                ref={mobileMenuRef}
              >
                <div className="py-4 md:py-4 py-6 space-y-2 md:space-y-2 space-y-3">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 md:px-4 md:py-2 px-6 py-3 text-foreground hover:text-accent hover:bg-muted/10 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </nav>
  )
}

export default Navbar 