'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { projects as projectsRu } from '@/data/projects.ru'
import { projects as projectsEn } from '@/data/projects.en'
import { useLocale } from '@/contexts/LocaleContext'
import { Project } from '@/types/projects'
import ProjectModal from '@/components/ui/ProjectModal'

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

const Projects = () => {
  const { t, locale } = useLocale()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  
  // Выбираем проекты в зависимости от языка
  const projects: Project[] = locale === 'en' ? projectsEn : projectsRu
  
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsProjectModalOpen(false)
    setSelectedProject(null)
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
                  <div className="relative w-full h-48 md:h-56 rounded-lg overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
                    <Image
                      src={project.image}
                      alt={`${project.title} project visualization`}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech: string) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium transition-colors hover:bg-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Кнопка "Подробнее" */}
                  <button
                    onClick={() => handleProjectClick(project)}
                    className="w-full mt-auto bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-accent/90 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
                  >
                    {t('projects.detailsButton')}
                  </button>
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
    </section>
  )
}

export default Projects 