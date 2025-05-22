'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Аватар */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative w-64 h-64 mx-auto md:mx-0"
          >
            <div className="absolute inset-0 bg-accent/20 rounded-2xl transform rotate-3" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-accent/30">
              <Image
                src="https://placehold.co/400x400/10b981/ffffff?text=Dev"
                alt="Фотография разработчика"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Обо мне
            </h2>
            <div className="space-y-4 text-lg text-foreground/80">
              <p className="text-lg text-foreground/70 max-w-md text-balance text-wrap">
                Меня зовут [имя], я фронтенд-разработчик с опытом создания интерфейсов на React, TypeScript и Redux.
              </p>
              <p className="text-lg text-foreground/70 max-w-md text-balance text-wrap">
                Мне важна чистота кода, удобство пользователя и скорость работы интерфейсов.
              </p>
              <p className="text-lg text-foreground/70 max-w-md text-balance text-wrap">
                Работаю как с готовыми UI-системами, так и с кастомными решениями.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 