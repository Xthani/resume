'use client'

import { motion } from 'framer-motion'
import { contacts } from '@/data/contacts'
import { useLocale } from '@/contexts/LocaleContext'

const Contacts = () => {
  const { t } = useLocale()
  
  return (
    <section id="contacts" className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">{t('contacts.title')}</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 max-w-lg mx-auto"
          >
            <motion.a
              href={`mailto:${contacts.email}`}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-muted/5 hover:bg-muted/10 transition-all duration-300 cursor-pointer group"
            >
              <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span className="text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                {t('contacts.email')}
              </span>
            </motion.a>

            <motion.a
              href={`https://t.me/${contacts.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-muted/5 hover:bg-muted/10 transition-all duration-300 cursor-pointer group"
            >
              <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.27-.48.74-.74 2.87-1.25 4.79-2.08 5.76-2.5 2.76-1.19 3.34-1.4 3.73-1.4.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <span className="text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                {t('contacts.telegram')}
              </span>
            </motion.a>

            <motion.a
              href={contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-muted/5 hover:bg-muted/10 transition-all duration-300 cursor-pointer group"
            >
              <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
              </svg>
              <span className="text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                {t('contacts.github')}
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contacts 