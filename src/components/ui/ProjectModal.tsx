'use client'

import Image from 'next/image'
import {useState} from 'react'
import Modal from './Modal'
import ImageModal from './ImageModal'
import {Project} from '@/types/projects'
import {useLocale} from '@/contexts/LocaleContext'

interface ProjectModalProps {
    project: Project | null
    isOpen: boolean
    onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({project, isOpen, onClose}) => {
    const {locale} = useLocale()
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)

    if (!project) return null

    // Локализованные тексты
    const texts = {
        description: locale === 'en' ? 'Description' : 'Описание',
        role: locale === 'en' ? 'Role' : 'Роль',
        details: locale === 'en' ? 'Project Details' : 'Детали проекта',
        technologies: locale === 'en' ? 'Technologies Used' : 'Использованные технологии',
        viewImage: locale === 'en' ? 'View full image' : 'Увеличить изображение',
    }

    const handleImageClick = () => {
        setIsImageModalOpen(true)
    }

    const closeImageModal = () => {
        setIsImageModalOpen(false)
    }

    const handleProjectModalClose = () => {
        // Закрываем обе модалки при закрытии ProjectModal
        setIsImageModalOpen(false)
        onClose()
    }

    const handleImageModalBackdropClick = () => {
        // Закрываем обе модалки при клике вне ImageModal
        setIsImageModalOpen(false)
        onClose()
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleProjectModalClose} className="p-6 md:p-8 overflow-y-auto">
                <div className="space-y-6">
                    {/* Заголовок */}
                    <div className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            {project.title}
                        </h2>
                        <p className="text-sm text-foreground/60">{project.period}</p>
                    </div>

                    {/* Изображение проекта */}
                    <div className="relative">
                        <div
                            className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 cursor-pointer group hidden md:block"
                            onClick={handleImageClick}
                        >
                            <Image
                                src={project.image}
                                alt={`${project.title} project visualization`}
                                fill
                                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div
                                className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Изображение для мобильной версии (без клика) */}
                        <div
                            className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 md:hidden"
                            onClick={handleImageClick}>
                            <Image
                                src={project.image}
                                alt={`${project.title} project visualization`}
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Кнопка для мобильной версии */}
                            <button
                                onClick={handleImageClick}
                                className="absolute bottom-2 right-2 bg-accent/90 hover:bg-accent text-accent-foreground p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
                                aria-label={texts.viewImage}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Основная информация */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{texts.description}</h3>
                            <p className="text-foreground/80 leading-relaxed">{project.description}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{texts.role}</h3>
                            <p className="text-foreground/80">{project.role}</p>
                        </div>

                        {/* Детальная информация */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{texts.details}</h3>
                            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                                {project.details}
                            </p>
                        </div>

                        {/* Технологии */}
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-3">{texts.technologies}</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                                    >
                    {tech}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Модальное окно изображения */}
            <ImageModal
                imageSrc={project.image}
                imageAlt={`${project.title} project visualization`}
                isOpen={isImageModalOpen}
                onClose={closeImageModal}
                onBackdropClick={handleImageModalBackdropClick}
            />
        </>
    )
}

export default ProjectModal 