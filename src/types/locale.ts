export type Locale = 'ru' | 'en'

export interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => Promise<void>
  t: (key: string) => string
  translations: Translations
  mounted: boolean
  isChanging: boolean
}

export interface Translations {
  meta: {
    title: string
    description: string
    keywords: string
    author: string
    siteUrl: string
    siteName: string
    ogDescription: string
    twitterDescription: string
  }
  nav: {
    about: string
    skills: string
    projects: string
    contacts: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
  }
  about: {
    title: string
    description: string
    experience: string
    principles: string
    teaching: string
    languages: {
      title: string
      russian: {
        name: string
        level: string
      }
      english: {
        name: string
        level: string
      }
    }
  }
  skills: {
    title: string
    prevButton: string
    nextButton: string
    slideIndicator: string
  }
  projects: {
    title: string
  }
  experience: {
    title: string
    jobs: {
      title: string
    }
    courses: {
      title: string
    }
  }
  contacts: {
    title: string
    email: string
    telegram: string
    github: string
  }
  footer: {
    developed: string
    repository: string
  }
} 