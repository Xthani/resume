'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { skills as skillsRu } from '@/data/skills.ru'
import { skills as skillsEn } from '@/data/skills.en'
import { useLocale } from '@/contexts/LocaleContext'

const Skills = () => {
  const { t, locale, mounted: localeMounted } = useLocale()
  const [isMounted, setIsMounted] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Выбираем навыки в зависимости от языка
  const skills = locale === 'en' ? skillsEn : skillsRu

  // Инициализация после монтирования компонента
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Обработчик скролла для прогресс-бара
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer
      const maxScroll = scrollWidth - clientWidth
      
      // Проверяем, есть ли возможность скролла
      if (maxScroll <= 0) {
        setScrollProgress(0)
        return
      }
      
      const progress = scrollLeft / maxScroll
      const clampedProgress = Math.max(0, Math.min(1, progress))
      setScrollProgress(clampedProgress)
    }

    // Вызываем сразу для установки начального значения
    handleScroll()
    
    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [isMounted, localeMounted])

  // Не рендерим компонент до монтирования на клиенте
  if (!isMounted || !localeMounted) {
    return (
      <section id="skills" className="py-16 bg-background scroll-mt-16">
        <div className="container mx-auto max-w-6xl px-4">
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
    <section id="skills" className="py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center"
        >
          {t('skills.title')}
        </motion.h2>
        
        {/* Контейнер с горизонтальным скроллом */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide pb-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              height: '400px' // Увеличена высота для больших карточек в мобильной версии
            }}
          >
            {/* Контейнер для 2 рядов */}
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Первый ряд */}
              <div className="flex gap-4 md:gap-6">
                {skills.slice(0, Math.ceil(skills.length / 2)).map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <div
                      key={`${skill.name}-${index}`}
                      className="bg-muted/10 border border-muted/20 rounded-2xl p-4 md:p-4 lg:p-6 flex flex-col items-center justify-center text-center shadow-sm transition duration-300 hover:shadow-lg hover:border-accent group flex-shrink-0 w-40 h-40 md:w-36 md:h-36 lg:w-40 lg:h-40"
                    >
                      <div className="w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-muted/20 mb-3 md:mb-3 lg:mb-4 flex-shrink-0">
                        <Icon className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-accent" />
                      </div>
                      <div className="font-semibold text-sm md:text-sm lg:text-base text-foreground w-full flex-shrink-0 leading-tight break-words px-1">
                        {skill.name}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Второй ряд */}
              <div className="flex gap-4 md:gap-6">
                {skills.slice(Math.ceil(skills.length / 2)).map((skill, index) => {
                  const Icon = skill.icon
                  return (
                    <div
                      key={`${skill.name}-${index + Math.ceil(skills.length / 2)}`}
                      className="bg-muted/10 border border-muted/20 rounded-2xl p-4 md:p-4 lg:p-6 flex flex-col items-center justify-center text-center shadow-sm transition duration-300 hover:shadow-lg hover:border-accent group flex-shrink-0 w-40 h-40 md:w-36 md:h-36 lg:w-40 lg:h-40"
                    >
                      <div className="w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-muted/20 mb-3 md:mb-3 lg:mb-4 flex-shrink-0">
                        <Icon className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-accent" />
                      </div>
                      <div className="font-semibold text-sm md:text-sm lg:text-base text-foreground w-full flex-shrink-0 leading-tight break-words px-1">
                        {skill.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Прогресс-бар скролла */}
          <div className="w-full h-1 bg-muted/20 rounded-full mt-6 overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.max(0, Math.min(100, scrollProgress * 100))}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills 