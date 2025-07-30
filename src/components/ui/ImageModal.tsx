'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import Modal from './Modal'
import { useLocale } from '@/contexts/LocaleContext'

interface ImageModalProps {
  imageSrc: string
  imageAlt: string
  isOpen: boolean
  onClose: () => void
  onBackdropClick?: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  imageSrc, 
  imageAlt, 
  isOpen, 
  onClose, 
  onBackdropClick 
}) => {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { locale } = useLocale()
  const imageRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 0.5))
  }

  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleBackdropClick = () => {
    onClose()
    if (onBackdropClick) {
      onBackdropClick()
    }
  }

  // Сброс состояния при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      setScale(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [isOpen])

  // Обработка жестов для мобильных устройств
  useEffect(() => {
    if (!isOpen || !imageRef.current) return

    let startDistance = 0
    let startScale = 1
    let startX = 0
    let startY = 0
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Двупальцевый жест для масштабирования
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        )
        startDistance = distance
        startScale = scale
      } else if (e.touches.length === 1) {
        // Однопальцевый жест для перемещения
        startX = e.touches[0].clientX - position.x
        startY = e.touches[0].clientY - position.y
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      
      if (e.touches.length === 2) {
        // Масштабирование
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        )
        const newScale = Math.max(0.5, Math.min(3, startScale * (distance / startDistance)))
        setScale(newScale)
      } else if (e.touches.length === 1 && scale > 1) {
        // Перемещение только при масштабировании
        const newX = e.touches[0].clientX - startX
        const newY = e.touches[0].clientY - startY
        setPosition({ x: newX, y: newY })
      }
    }

    // Обработка мыши для десктопа
    const handleMouseDown = (e: MouseEvent) => {
      if (scale > 1) {
        isDragging = true
        startX = e.clientX - position.x
        startY = e.clientY - position.y
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && scale > 1) {
        const newX = e.clientX - startX
        const newY = e.clientY - startY
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    const element = imageRef.current
    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('mousedown', handleMouseDown)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseup', handleMouseUp)
    element.addEventListener('mouseleave', handleMouseUp)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('mousedown', handleMouseDown)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseup', handleMouseUp)
      element.removeEventListener('mouseleave', handleMouseUp)
    }
  }, [isOpen, scale, position])

  // Локализованные тексты
  const texts = {
    zoomIn: locale === 'en' ? 'Zoom in' : 'Увеличить',
    zoomOut: locale === 'en' ? 'Zoom out' : 'Уменьшить',
    reset: locale === 'en' ? 'Reset zoom' : 'Сбросить масштаб',
    mobileHint: locale === 'en' ? 'Use gestures to zoom' : 'Используйте жесты для масштабирования',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} onBackdropClick={handleBackdropClick} className="p-2 md:p-4" zIndex={60}>
      <div className="relative w-full h-full flex items-center justify-center min-h-[60vh]">
        {/* Элементы управления */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-full bg-muted/20 hover:bg-muted/40 transition-colors text-foreground/60 hover:text-foreground"
            aria-label={texts.zoomIn}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-full bg-muted/20 hover:bg-muted/40 transition-colors text-foreground/60 hover:text-foreground"
            aria-label={texts.zoomOut}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10h3" />
            </svg>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-full bg-muted/20 hover:bg-muted/40 transition-colors text-foreground/60 hover:text-foreground"
            aria-label={texts.reset}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Изображение */}
        <div 
          ref={imageRef}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
        >
          <motion.div
            style={{ 
              scale,
              x: position.x,
              y: position.y
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full h-full flex items-center justify-center ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
          >
            <div className="relative w-full h-full max-w-full max-h-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                className="object-contain w-full h-full max-w-full max-h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Подсказка для мобильных устройств */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          <p className="text-xs text-foreground/60 bg-background/80 px-3 py-1 rounded-full">
            {texts.mobileHint}
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default ImageModal 