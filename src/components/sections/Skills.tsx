'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { skills as skillsRu } from '@/data/skills.ru'
import { skills as skillsEn } from '@/data/skills.en'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useLocale } from '@/contexts/LocaleContext'

const Skills = () => {
  const { t, locale } = useLocale()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Выбираем навыки в зависимости от языка
  const skills = locale === 'en' ? skillsEn : skillsRu

  // Количество элементов на слайде в зависимости от размера экрана
  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return 8
    const width = window.innerWidth
    if (width < 640) return 2 // mobile: 1x2 (по одной карточке в ряду)
    if (width < 1024) return 6 // tablet: 3x2
    return 8 // desktop: 4x2
  }

  const [itemsPerSlide, setItemsPerSlide] = useState(8) // Начальное значение для SSR
  const totalSlides = Math.ceil(skills.length / itemsPerSlide)

  // Инициализация после монтирования компонента
  useEffect(() => {
    setIsMounted(true)
    setItemsPerSlide(getItemsPerSlide())
  }, [])

  // Обработчик изменения размера окна
  useEffect(() => {
    if (!isMounted) return

    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMounted])

  // Автоскролл
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
      return
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }
  }, [isAutoPlaying, totalSlides])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentSlide(index)
  }

  // Получение элементов для текущего слайда
  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerSlide
    return skills.slice(startIndex, startIndex + itemsPerSlide)
  }

  const currentItems = getCurrentItems()

  // Не рендерим компонент до монтирования на клиенте
  if (!isMounted) {
    return (
      <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">{t('skills.title')}</h2>
          <div className="flex justify-center">
            <div className="animate-pulse bg-muted rounded-2xl p-6 w-full max-w-md">
              <div className="h-4 bg-muted/50 rounded mb-4"></div>
              <div className="h-4 bg-muted/50 rounded mb-4"></div>
              <div className="h-4 bg-muted/50 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">{t('skills.title')}</h2>
        
        {/* Слайдер */}
        <div className="relative">
          {/* Стрелка влево */}
          {totalSlides > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-6 bottom-6 z-10 bg-background/80 backdrop-blur-sm border border-muted/20 hover:bg-muted/10 transition-colors flex items-center justify-center w-12 rounded-2xl cursor-pointer"
              aria-label={t('skills.prevButton')}
            >
              <ChevronLeftIcon className="w-6 h-6 text-foreground" />
            </button>
          )}

          {/* Контейнер слайдов */}
          <div className={`overflow-hidden ${totalSlides > 1 ? 'mx-16' : ''}`}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-6"
            >
              {currentItems.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={`${skill.name}-${currentSlide}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted/10 border border-muted/20 rounded-2xl p-6 md:p-6 flex flex-col items-center text-center shadow-sm transition duration-300 hover:shadow-lg hover:border-accent group min-h-[140px] sm:min-h-[120px]"
                    whileHover={{ scale: 1.04 }}
                  >
                    <div className="w-12 h-12 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-muted/20 mb-3 md:mb-4">
                      <Icon className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent" />
                    </div>
                    <div className="font-semibold text-base md:text-lg text-foreground mb-2 md:mb-2 w-full">
                      {skill.name}
                    </div>
                    <div className="text-sm md:text-sm text-foreground/70 leading-relaxed px-1">
                      {skill.description}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Стрелка вправо */}
          {totalSlides > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-6 bottom-6 z-10 bg-background/80 backdrop-blur-sm border border-muted/20 hover:bg-muted/10 transition-colors flex items-center justify-center w-12 rounded-2xl cursor-pointer"
              aria-label={t('skills.nextButton')}
            >
              <ChevronRightIcon className="w-6 h-6 text-foreground" />
            </button>
          )}
        </div>

        {/* Индикаторы слайдов */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-accent w-6'
                    : 'bg-muted hover:bg-foreground/30'
                }`}
                aria-label={`${t('skills.slideIndicator')} ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills 