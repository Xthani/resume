'use client'

import { motion } from 'framer-motion'
import { RocketIcon, Pencil2Icon, CodeIcon, CheckCircledIcon } from '@radix-ui/react-icons'

const steps = [
  {
    title: 'Анализ требований',
    description: 'Внимательно изучаю задачи, цели и ограничения проекта, чтобы предложить оптимальное решение.',
    icon: Pencil2Icon,
  },
  {
    title: 'Проектирование и верстка',
    description: 'Создаю прототипы, макеты и адаптивную верстку, чтобы интерфейс был удобным и современным.',
    icon: RocketIcon,
  },
  {
    title: 'Разработка и тестирование',
    description: 'Пишу чистый, поддерживаемый код, покрываю функционал тестами и провожу ручное тестирование.',
    icon: CodeIcon,
  },
  {
    title: 'Деплой и поддержка',
    description: 'Публикую проект, настраиваю CI/CD и обеспечиваю поддержку и развитие продукта.',
    icon: CheckCircledIcon,
  },
]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const Approach = () => {
  return (
    <section id="approach" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Как я работаю</h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-4"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                variants={item}
                className="flex flex-col items-center bg-muted border border-muted rounded-xl p-6 gap-4 shadow-sm transition duration-300 w-full md:w-1/4 min-w-[220px]"
                whileHover={{ scale: 1.03 }}
              >
                <Icon className="w-10 h-10 text-accent mb-2" />
                <div className="font-semibold text-lg text-foreground mb-1 text-center">{step.title}</div>
                <div className="text-sm text-foreground/70 text-center">{step.description}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Approach 