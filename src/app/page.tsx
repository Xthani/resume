import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Approach from '@/components/sections/Approach'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Testimonials from '@/components/sections/Testimonials'
import Contacts from '@/components/sections/Contacts'
import Footer from '@/components/sections/Footer'

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Skills />
            <Approach />
            <Projects />
            <Experience />
            <Testimonials />
            <Contacts />
            <Footer />
        </>
    );
}
