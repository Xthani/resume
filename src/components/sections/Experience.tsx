'use client'

import { motion } from 'framer-motion'
import { experience } from '@/data/experience'

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

const Experience = () => {
  const jobs = experience.filter((item) => item.type === 'job')
  const courses = experience.filter((item) => item.type === 'course')

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Опыт и обучение</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">Опыт работы</h3>
            {jobs.map((job) => (
              <motion.div
                key={`${job.org}-${job.period}`}
                variants={item}
                className="border-b border-muted/20 pb-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-foreground">{job.title}</h4>
                    <p className="text-sm text-foreground/70">{job.org}</p>
                  </div>
                  <span className="text-sm text-foreground/70 mt-1 sm:mt-0">{job.period}</span>
                </div>
                <p className="text-sm text-foreground/70">{job.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">Обучение</h3>
            {courses.map((course) => (
              <motion.div
                key={`${course.org}-${course.period}`}
                variants={item}
                className="border-b border-muted/20 pb-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg text-foreground">{course.title}</h4>
                    <p className="text-sm text-foreground/70">{course.org}</p>
                  </div>
                  <span className="text-sm text-foreground/70">{course.period}</span>
                </div>
                <p className="text-sm text-foreground/70">{course.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience 