'use client'

import Image from 'next/image'
import Modal from './Modal'

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
  const handleBackdropClick = () => {
    onClose()
    if (onBackdropClick) {
      onBackdropClick()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} onBackdropClick={handleBackdropClick} className="p-2 md:p-4" zIndex={60}>
      <div className="relative w-full h-full flex items-center justify-center min-h-[60vh]">
        <div className="relative w-full h-full flex items-center justify-center">
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
        </div>
      </div>
    </Modal>
  )
}

export default ImageModal 