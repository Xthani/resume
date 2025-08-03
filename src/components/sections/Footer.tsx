'use client'

import { useLocale } from '@/contexts/LocaleContext'

const Footer = () => {
  const { t } = useLocale()
  
  return (
    <footer id="footer" className="border-t border-muted py-6 text-center">
      <p className="text-sm text-muted">
        {t('footer.developed')}
      </p>
      <a
        href="https://github.com/yourname/resume"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted hover:text-accent transition duration-300"
      >
        {t('footer.repository')}
      </a>
      <p className="text-sm text-muted mt-2">
        © {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer 