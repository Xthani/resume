'use client'

import { motion } from 'framer-motion'
import { contacts } from '@/data/contacts'

const Contacts = () => {
  return (
    <section id="contacts" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Связаться со мной</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-muted rounded-xl p-6 shadow-sm"
          >
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Имя</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 bg-background border border-muted rounded-md text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cta"
                  placeholder="Введите ваше имя"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 bg-background border border-muted rounded-md text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cta"
                  placeholder="Введите ваш email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Сообщение</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 bg-background border border-muted rounded-md text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cta"
                  placeholder="Введите ваше сообщение"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-cta text-white rounded-md hover:bg-cta-hover transition duration-300"
              >
                Отправить
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-muted rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">Контактные ссылки</h3>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${contacts.email}`} className="text-foreground hover:text-accent transition duration-300">
                  Email: {contacts.email}
                </a>
              </li>
              <li>
                <a href={`https://t.me/${contacts.telegram}`} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition duration-300">
                  Telegram: @{contacts.telegram}
                </a>
              </li>
              <li>
                <a href={contacts.github} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition duration-300">
                  GitHub: {contacts.github}
                </a>
              </li>
              <li>
                <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition duration-300">
                  LinkedIn: {contacts.linkedin}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contacts 