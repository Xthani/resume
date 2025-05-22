'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Проекты</h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projects.map((project: { title: string; description: string; tech: string[]; role: string; github: string; demo: string; image: string }) => (
            <motion.div
              key={project.title}
              variants={item}
              className="min-w-[280px] bg-muted border border-muted rounded-xl p-4 shadow-sm transition duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              {project.image && (
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Скриншот проекта ${project.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className="font-semibold text-xl text-foreground mb-2">{project.title}</h3>
              <p className="text-sm text-foreground/70 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech: string) => (
                  <span key={tech} className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-sm text-foreground/70 mb-4">{project.role}</p>
              <div className="flex gap-4 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none text-sm"
                >
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent/80 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none text-sm"
                >
                  Demo
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 