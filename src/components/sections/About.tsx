'use client'

import {motion} from 'framer-motion'
import { GlobeIcon } from '@radix-ui/react-icons'

const About = () => {
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
    Обо мне
</h2>
<div className="space-y-4 text-lg text-foreground/80">
    <p className="text-lg text-foreground/70 text-balance">
        Меня зовут Станислав. Я фронтенд-разработчик с более чем 5-летним коммерческим опытом, специализируюсь на создании веб-интерфейсов с использованием React, TypeScript и Redux.
    </p>
    <p className="text-lg text-foreground/70 text-balance">
        Участвовал в разработке крупных ERP, B2B и аналитических систем, включая проекты для ресторанного бизнеса, металлургии и госучреждений. Работал как в командах, так и самостоятельно.
    </p>
    <p className="text-lg text-foreground/70 text-balance">
        Следую принципам чистого кода, уделяю внимание UX и производительности интерфейса. Использую FSD, адаптивную вёрстку, современные UI-библиотеки и библиотечную архитектуру.
    </p>
    <p className="text-lg text-foreground/70 text-balance">
        Также имею опыт преподавания и менторства начинающих разработчиков.
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
                                Языки
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                            <motion.div
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5, delay: 0.8}}
                                className="bg-muted border border-muted rounded-xl p-4 text-center hover:border-accent transition-colors duration-300"
                            >
                                <div className="font-semibold text-lg text-foreground mb-1">
                                    Русский
                                </div>
                                <div className="text-sm text-foreground/70">
                                    Родной язык
                                </div>
                            </motion.div>
                            
                            <motion.div
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.5, delay: 0.9}}
                                className="bg-muted border border-muted rounded-xl p-4 text-center hover:border-accent transition-colors duration-300"
                            >
                                <div className="font-semibold text-lg text-foreground mb-1">
                                    Английский
                                </div>
                                <div className="text-sm text-foreground/70">
                                    B1 (Intermediate)
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