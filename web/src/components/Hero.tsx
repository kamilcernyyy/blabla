"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion"

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } },
}

const wordVariant = {
  hidden: { y: "108%", rotate: 1.5 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const HEADLINE = [
  { text: "Grafický",  accent: false },
  { text: "Designér", accent: true  },
  { text: "& Vývojář",accent: false },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasMouse, setHasMouse] = useState(false)

  /* Detect real pointer (mouse, not touch) */
  useEffect(() => {
    setHasMouse(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  }, [])

  /* ── Scroll-driven portal transforms ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const contentY       = useTransform(scrollYProgress, [0, 0.5],  ["0%",    "-8%"])
  const contentScale   = useTransform(scrollYProgress, [0, 0.42], [1,       0.83])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3],  [1,       0])
  const contentBlur    = useTransform(scrollYProgress, [0, 0.3],  [0,       10])
  const blobScale      = useTransform(scrollYProgress, [0, 0.65], [1,       5])
  const blobOpacity    = useTransform(scrollYProgress, [0.45, 0.7],[1,      0])
  const overlayOpacity = useTransform(scrollYProgress, [0.12, 0.62],[0,     1])

  /* ── Mouse parallax (desktop only) ── */
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const springCfg = { stiffness: 38, damping: 18 }
  const b1x = useSpring(useTransform(mx, [0, 1], [-26, 26]), springCfg)
  const b1y = useSpring(useTransform(my, [0, 1], [-16, 16]), springCfg)
  const b2x = useSpring(useTransform(mx, [0, 1], [ 20,-20]), { ...springCfg, stiffness: 32 })
  const b2y = useSpring(useTransform(my, [0, 1], [ 12,-12]), { ...springCfg, stiffness: 32 })
  const b3x = useSpring(useTransform(mx, [0, 1], [-10, 10]), { ...springCfg, stiffness: 26 })
  const b3y = useSpring(useTransform(my, [0, 1], [  8, -8]), { ...springCfg, stiffness: 26 })

  useEffect(() => {
    if (!hasMouse) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [hasMouse, mx, my])

  return (
    <section className="hero" ref={sectionRef}>

      {/* ── Blobs — portal zoom ── */}
      <motion.div
        className="hero-bg"
        style={{ scale: blobScale, opacity: blobOpacity }}
      >
        <motion.div className="blob blob-1" style={hasMouse ? { x: b1x, y: b1y } : {}} />
        <motion.div className="blob blob-2" style={hasMouse ? { x: b2x, y: b2y } : {}} />
        <motion.div className="blob blob-3" style={hasMouse ? { x: b3x, y: b3y } : {}} />
      </motion.div>

      {/* ── Void overlay ── */}
      <motion.div className="hero-overlay" style={{ opacity: overlayOpacity }} />

      {/* ── Content ── */}
      <motion.div
        className="hero-content"
        style={{
          y: contentY,
          scale: contentScale,
          opacity: contentOpacity,
          filter: useTransform(contentBlur, v => `blur(${v}px)`),
        }}
      >
        <motion.div
          className="badge"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1,  y:  0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="badge-dot" />
          K dispozici pro spolupráci — 2025
        </motion.div>

        <motion.h1
          className="hero-headline"
          variants={headlineContainer}
          initial="hidden"
          animate="show"
        >
          {HEADLINE.map(({ text, accent }) => (
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

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1,  y:  0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Tvořím digitální zážitky na rozhraní estetiky a funkce.
          Čistá grafika. Plynulé interakce. Skutečné výsledky.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1,  y:  0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a href="#work"    className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>Zobrazit práce →</motion.a>
          <motion.a href="#contact" className="btn btn-ghost"   whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>Napište mi</motion.a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator (hidden on mobile via CSS) ── */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
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
