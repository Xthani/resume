'use client'

import {motion} from 'framer-motion'
import { GlobeIcon } from '@radix-ui/react-icons'
import { useLocale } from '@/contexts/LocaleContext'

const About = () => {
  const { t } = useLocale()
    return (
        <section id="about"
                 className="min-h-screen flex items-center justify-center px-4 py-16 bg-background scroll-mt-16">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.2}}
                    className="flex flex-col items-center text-center space-y-8"
                >
                    {/* Текст */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.4}}
                        className="space-y-6 max-w-2xl"
                    >
                       <h2 className="text-3xl md:text-4xl font-bold text-foreground">
    {t('about.title')}
</h2>
<div className="space-y-4 text-lg text-foreground/80">
    <p className="text-lg text-foreground/70 text-balance">
        {t('about.description')}
    </p>
    <p className="text-lg text-foreground/70 text-balance">
        {t('about.experience')}
    </p>
    <p className="text-lg text-foreground/70 text-balance">
        {t('about.principles')}
    </p>
    <p className="text-lg text-foreground/70 text-balance">
        {t('about.teaching')}
    </p>
</div>

                    </motion.div>

                    {/* Языки */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.6}}
                        className="space-y-6 max-w-2xl"
                    >
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <GlobeIcon className="w-6 h-6 text-accent" />
                            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                                {t('about.languages.title')}
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                            <motion.div
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5, delay: 0.8}}
                                className="bg-muted/10 border border-muted/20 rounded-xl p-4 text-center hover:border-accent transition-colors duration-300"
                            >
                                <div className="font-semibold text-lg text-foreground mb-1">
                                    {t('about.languages.russian.name')}
                                </div>
                                <div className="text-sm text-foreground/70">
                                    {t('about.languages.russian.level')}
                                </div>
                            </motion.div>
                            
                            <motion.div
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5, delay: 0.9}}
                                className="bg-muted/10 border border-muted/20 rounded-xl p-4 text-center hover:border-accent transition-colors duration-300"
                            >
                                <div className="font-semibold text-lg text-foreground mb-1">
                                    {t('about.languages.english.name')}
                                </div>
                                <div className="text-sm text-foreground/70">
                                    {t('about.languages.english.level')}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default About 