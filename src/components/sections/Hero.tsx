'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocale } from '@/contexts/LocaleContext'

const Hero = () => {
  const { t, mounted } = useLocale()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !mounted) return
    
    // Плавный скролл для кнопки CTA
    const handleContactClick = (e: Event) => {
      e.preventDefault()
      const target = document.querySelector('#contacts')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const contactButton = document.querySelector('#contact-button')
    if (contactButton) {
      contactButton.addEventListener('click', handleContactClick)
    }

    return () => {
      if (contactButton) {
        contactButton.removeEventListener('click', handleContactClick)
      }
    }
  }, [isMounted, mounted])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-6 md:space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.button
            id="contact-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-background/80 backdrop-blur-sm border border-muted/20 hover:bg-muted/10 transition-colors duration-300 cursor-pointer
                     text-foreground text-lg font-medium rounded-full
                     focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                     focus:ring-offset-background"
          >
            {t('hero.cta')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 