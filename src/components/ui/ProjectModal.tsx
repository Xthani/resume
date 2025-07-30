'use client'

import Image from 'next/image'
import Modal from './Modal'
import { Project } from '@/types/projects'
import { useLocale } from '@/contexts/LocaleContext'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { locale } = useLocale()

  if (!project) return null

  // Локализованные тексты
  const texts = {
    description: locale === 'en' ? 'Description' : 'Описание',
    role: locale === 'en' ? 'Role' : 'Роль',
    details: locale === 'en' ? 'Project Details' : 'Детали проекта',
    technologies: locale === 'en' ? 'Technologies Used' : 'Использованные технологии',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-6 md:p-8">
      <div className="space-y-6">
        {/* Заголовок */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {project.title}
          </h2>
          <p className="text-sm text-foreground/60">{project.period}</p>
        </div>

        {/* Изображение проекта */}
        <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
          <Image
            src={project.image}
            alt={`${project.title} project visualization`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
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
  )
}

export default ProjectModal 