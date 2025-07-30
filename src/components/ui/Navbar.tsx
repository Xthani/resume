'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Плавный скролл по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault()
        const target = document.querySelector((e.currentTarget as HTMLAnchorElement).getAttribute('href')!)
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          })
          // Закрываем мобильное меню при клике на ссылку
          setIsMobileMenuOpen(false)
        }
      })
    })
  }, [])

  const navItems = [
    { href: '#about', label: 'Обо мне' },
    { href: '#skills', label: 'Навыки' },
    { href: '#projects', label: 'Проекты' },
    { href: '#contacts', label: 'Контакты' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors
                       text-foreground focus:outline-none focus:ring-2 focus:ring-accent
                       focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Открыть меню"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-muted/20 bg-background/95 backdrop-blur-sm"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-foreground hover:text-accent hover:bg-muted/10 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar 