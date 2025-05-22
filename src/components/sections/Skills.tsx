'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/skills'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Навыки и технологии</h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {skills.map((skill) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.name}
                variants={item}
                className="bg-muted border border-muted rounded-2xl p-6 flex flex-col items-center text-center shadow-sm transition duration-300 hover:shadow-lg hover:border-accent group"
                whileHover={{ scale: 1.04 }}
              >
                <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-muted mb-4">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                </div>
                <div className="font-semibold text-lg text-foreground mb-2 truncate">{skill.name}</div>
                <div className="text-sm text-foreground/70 text-wrap">{skill.description}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills 