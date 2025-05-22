'use client'

import { useEffect } from 'react'

const Navbar = () => {
  useEffect(() => {
    // Плавный скролл по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault()
        const target = document.querySelector((e.currentTarget as HTMLAnchorElement).getAttribute('href')!)
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          })
        }
      })
    })
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="#about" className="text-foreground hover:text-accent transition-colors">
              Обо мне
            </a>
            <a href="#skills" className="text-foreground hover:text-accent transition-colors">
              Навыки
            </a>
            <a href="#projects" className="text-foreground hover:text-accent transition-colors">
              Проекты
            </a>
            <a href="#contacts" className="text-foreground hover:text-accent transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 