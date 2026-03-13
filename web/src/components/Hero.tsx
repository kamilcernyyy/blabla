"use client"

import { useEffect, useRef } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion"

const headlineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.45 },
  },
}

const wordVariant = {
  hidden: { y: "108%", rotate: 2 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const contentY       = useTransform(scrollYProgress, [0, 1],    ["0%", "18%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const b1x = useSpring(useTransform(mx, [0, 1], [-28, 28]), { stiffness: 40, damping: 18 })
  const b1y = useSpring(useTransform(my, [0, 1], [-18, 18]), { stiffness: 40, damping: 18 })
  const b2x = useSpring(useTransform(mx, [0, 1], [22, -22]), { stiffness: 35, damping: 18 })
  const b2y = useSpring(useTransform(my, [0, 1], [14, -14]), { stiffness: 35, damping: 18 })
  const b3x = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 28, damping: 18 })
  const b3y = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 28, damping: 18 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my])

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-bg">
        <motion.div className="blob blob-1" style={{ x: b1x, y: b1y }} />
        <motion.div className="blob blob-2" style={{ x: b2x, y: b2y }} />
        <motion.div className="blob blob-3" style={{ x: b3x, y: b3y }} />
      </div>

      <motion.div
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Badge */}
        <motion.div
          className="badge"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="badge-dot" />
          K dispozici pro spolupráci — 2025
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero-headline"
          variants={headlineContainer}
          initial="hidden"
          animate="show"
        >
          {[
            { text: "Grafický",    accent: false },
            { text: "Designér",   accent: true  },
            { text: "& Vývojář",  accent: false },
          ].map(({ text, accent }) => (
            <span key={text} className="word-line">
              <motion.span
                className={`word-inner${accent ? " accent-word" : ""}`}
                variants={wordVariant}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Tvořím digitální zážitky na rozhraní estetiky a funkce.
          Čistá grafika. Plynulé interakce. Skutečné výsledky.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="#work"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Zobrazit práce →
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn-ghost"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Napište mi
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <motion.div
          className="scroll-bar"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span>Scrolluj</span>
      </motion.div>
    </section>
  )
}
