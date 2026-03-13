import Cursor  from "@/components/Cursor"
import Navbar  from "@/components/Navbar"
import Hero    from "@/components/Hero"
import Marquee from "@/components/Marquee"
import Work    from "@/components/Work"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Contact />
      </main>
    </>
  )
}
