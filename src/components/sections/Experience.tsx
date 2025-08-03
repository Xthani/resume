'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/contexts/LocaleContext'
import { experience as experienceRu } from '@/data/experience.ru'
import { experience as experienceEn } from '@/data/experience.en'

type ExperienceItem = {
  type: 'job' | 'course';
  title: string;
  org: string;
  period?: string;
  description: string;
}

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

function castExperience(arr: unknown[]): ExperienceItem[] {
  return arr.filter((item): item is ExperienceItem => {
    if (typeof item !== 'object' || item === null) return false;
    const obj = item as Record<string, unknown>;
    return (
      'type' in obj &&
      (obj.type === 'job' || obj.type === 'course') &&
      typeof obj.title === 'string' &&
      typeof obj.org === 'string' &&
      (obj.period === undefined || typeof obj.period === 'string') &&
      typeof obj.description === 'string'
    );
  });
}

const Experience = () => {
  const { t, locale } = useLocale()
  const experience: ExperienceItem[] = castExperience(locale === 'en' ? experienceEn : experienceRu)
  const jobs = experience.filter((item) => item.type === 'job')
  const courses = experience.filter((item) => item.type === 'course')

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">{t('experience.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">{t('experience.jobs.title')}</h3>
            {jobs.map((job) => (
              <motion.div
                key={`${job.org}-${job.org}`}
                variants={item}
                className="border-b border-muted/20 pb-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-foreground">{job.title}</h4>
                    <p className="text-sm text-foreground/70">{job.org}</p>
                  </div>
                  {job.period && <span className="text-sm text-foreground/70 mt-1 sm:mt-0">{job.period}</span>}
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
            <h3 className="text-2xl font-semibold text-foreground mb-6">{t('experience.courses.title')}</h3>
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
                  {course.period && <span className="text-sm text-foreground/70">{course.period}</span>}
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