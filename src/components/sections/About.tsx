'use client'

import {motion} from 'framer-motion'

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
                </motion.div>
            </div>
        </section>
    )
}

export default About 