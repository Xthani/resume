'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import Modal from './Modal'
import { useLocale } from '@/contexts/LocaleContext'

interface ImageModalProps {
  imageSrc: string
  imageAlt: string
  isOpen: boolean
  onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ imageSrc, imageAlt, isOpen, onClose }) => {
  const [scale, setScale] = useState(1)
  const { locale } = useLocale()

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 0.5))
  }

  const handleReset = () => {
    setScale(1)
  }

  // Локализованные тексты
  const texts = {
    zoomIn: locale === 'en' ? 'Zoom in' : 'Увеличить',
    zoomOut: locale === 'en' ? 'Zoom out' : 'Уменьшить',
    reset: locale === 'en' ? 'Reset zoom' : 'Сбросить масштаб',
    mobileHint: locale === 'en' ? 'Use gestures to zoom' : 'Используйте жесты для масштабирования',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-2 md:p-4">
      <div className="relative w-full h-full flex items-center justify-center">
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
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ scale }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
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