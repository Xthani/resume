'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'

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

// Компонент для отображения иконки проекта
const ProjectIcon = ({ title }: { title: string }) => {
  const getIcon = (projectTitle: string) => {
    switch (projectTitle.toLowerCase()) {
      case 'kassa office':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <path d="M8 12h8v2H8z"/>
            <path d="M8 8h8v2H8z"/>
            <path d="M8 16h4v2H8z"/>
          </svg>
        )
      case 'portfolio':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <path d="M12 6l-3 3 3 3 3-3-3-3z"/>
            <path d="M12 12l-3 3 3 3 3-3-3-3z"/>
          </svg>
        )
      case 'task manager':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <path d="M9 7h6v2H9z"/>
            <path d="M9 11h6v2H9z"/>
            <path d="M9 15h6v2H9z"/>
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        )
    }
  }

  return (
    <div className="text-accent">
      {getIcon(title)}
    </div>
  )
}

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Проекты, в которых я работал</h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project: { title: string; description: string; tech: string[]; role: string; period: string }) => (
            <motion.div
              key={project.title}
              variants={item}
              className="bg-muted border border-muted rounded-xl p-6 shadow-sm transition duration-300 hover:shadow-lg hover:border-accent/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col h-full">
                {/* Иконка проекта в верхней части */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <ProjectIcon title={project.title} />
                  </div>
                  <span className="text-xs text-foreground/60 bg-accent/10 px-2 py-1 rounded-full">
                    {project.period}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-xl text-foreground mb-3">{project.title}</h3>
                  <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{project.description}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-foreground/80 mb-3 font-medium">{project.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
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
    </section>
  )
}

export default Projects 