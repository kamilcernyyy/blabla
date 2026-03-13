import Cursor   from "@/components/Cursor"
import Navbar   from "@/components/Navbar"
import Hero     from "@/components/Hero"
import Marquee  from "@/components/Marquee"
import Services from "@/components/Services"
import Work     from "@/components/Work"
import Contact  from "@/components/Contact"

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Contact />
      </main>
    </>
  )
}
