'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { projects as projectsRu } from '@/data/projects.ru'
import { projects as projectsEn } from '@/data/projects.en'
import { useLocale } from '@/contexts/LocaleContext'
import { Project } from '@/types/projects'
import ProjectModal from '@/components/ui/ProjectModal'
import ImageModal from '@/components/ui/ImageModal'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

// Компонент для отображения изображения проекта
const ProjectImage = ({ 
  image, 
  title, 
  onImageClick 
}: { 
  image: string
  title: string
  onImageClick: () => void
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onImageClick()
  }

  return (
    <div 
      className="relative w-full h-48 md:h-56 rounded-lg overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 cursor-pointer group"
      onClick={handleClick}
    >
      <Image
        src={image}
        alt={`${title} project visualization`}
        fill
        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const { t, locale } = useLocale()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  
  // Выбираем проекты в зависимости от языка
  const projects: Project[] = locale === 'en' ? projectsEn : projectsRu
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  const handleImageClick = (image: string, title: string) => {
    setSelectedImage({ src: image, alt: `${title} project visualization` })
    setIsImageModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsProjectModalOpen(false)
    setSelectedProject(null)
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
    setSelectedImage(null)
  }
  
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">{t('projects.title')}</h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project: Project) => (
            <motion.div
              key={project.title}
              variants={item}
              className="bg-muted/10 border border-muted/20 rounded-xl p-6 shadow-sm transition duration-300 hover:shadow-lg hover:border-accent/20 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex flex-col h-full">
                {/* Изображение проекта */}
                <div className="mb-4">
                  <ProjectImage 
                    image={project.image} 
                    title={project.title}
                    onImageClick={() => handleImageClick(project.image, project.title)}
                  />
                </div>
                
                {/* Период проекта */}
                <div className="flex justify-end mb-4">
                  <span className="text-xs text-foreground/60 bg-accent/10 px-3 py-1 rounded-full">
                    {project.period}
                  </span>
                </div>
                
                {/* Заголовок и описание */}
                <div className="mb-4 flex-1">
                  <h3 className="font-semibold text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                {/* Роль и технологии */}
                <div className="mt-auto">
                  <p className="text-sm text-foreground/80 mb-3 font-medium">{project.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium transition-colors hover:bg-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Модальное окно проекта */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
      />

      {/* Модальное окно изображения */}
      {selectedImage && (
        <ImageModal
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          isOpen={isImageModalOpen}
          onClose={closeImageModal}
        />
      )}
    </section>
  )
}

export default Projects 