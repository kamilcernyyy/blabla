"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from "framer-motion"

const HEADLINE = [
  { text: "Grafický",  accent: false },
  { text: "Designér", accent: true  },
  { text: "& Vývojář", accent: false },
]

/* ─── Per-character smoke particle ───────────────────────────── */
function SmokeChar({
  char,
  index,
  accent,
  mouseX,
  mouseY,
}: {
  char: string
  index: number
  accent: boolean
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const dx  = useMotionValue(0)
  const dy  = useMotionValue(0)
  const op  = useMotionValue(1)

  const sdx    = useSpring(dx, { stiffness: 65, damping: 12 })
  const sdy    = useSpring(dy, { stiffness: 65, damping: 12 })
  const sop    = useSpring(op, { stiffness: 55, damping: 16 })
  const filter = useTransform(sop, [1, 0], ["blur(0px)", "blur(18px)"])

  // Unique dispersion vector per char — golden-ratio spiral, no two chars fly the same way
  const angle0 = useMemo(() => (index * 137.508 * Math.PI) / 180, [index])

  useEffect(() => {
    function update() {
      if (!ref.current) return
      const mx = mouseX.get()
      const my = mouseY.get()

      if (mx < 0) {
        dx.set(0); dy.set(0); op.set(1)
        return
      }

      const rect = ref.current.getBoundingClientRect()
      const cx   = rect.left + rect.width  / 2
      const cy   = rect.top  + rect.height / 2
      const ex   = mx - cx
      const ey   = my - cy
      const dist = Math.sqrt(ex * ex + ey * ey)
      const R    = 160

      if (dist < R) {
        const t   = 1 - dist / R
        const str = t * 110
        // Push away from mouse, each char deflects at its own angle
        const a   = Math.atan2(ey, ex) + Math.PI + Math.sin(angle0) * 0.78
        const mag = 0.55 + Math.abs(Math.cos(angle0 * 1.618)) * 0.9
        dx.set(Math.cos(a) * str * mag)
        dy.set(Math.sin(a) * str * mag)
        op.set(Math.max(0, 0.08 + (dist / R) * 0.92))
      } else {
        dx.set(0); dy.set(0); op.set(1)
      }
    }

    const u1 = mouseX.on("change", update)
    const u2 = mouseY.on("change", update)
    return () => { u1(); u2() }
  }, [mouseX, mouseY, dx, dy, op, angle0])

  if (char === " ")
    return <span style={{ display: "inline-block", width: "0.22em" }} />

  return (
    <motion.span
      ref={ref}
      style={{
        display: "inline-block",
        x: sdx,
        y: sdy,
        opacity: sop,
        filter,
        color: accent ? "var(--accent)" : undefined,
      }}
    >
      {char}
    </motion.span>
  )
}

/* ─── Word: staggered reveal + per-char smoke ───────────────────── */
function SmokeWord({
  text,
  accent,
  charOffset,
  mouseX,
  mouseY,
}: {
  text: string
  accent: boolean
  charOffset: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  return (
    <span className="word-line">
      <motion.span
        className="word-inner"
        variants={{
          hidden: { opacity: 0, y: "14%" },
          show: {
            opacity: 1,
            y: "0%",
            transition: { duration: 0.88, ease: [0.16, 1, 0.3, 1] },
          },
        }}
        style={{ display: "inline-flex" }}
      >
        {text.split("").map((char, i) => (
          <SmokeChar
            key={i}
            char={char}
            index={charOffset + i}
            accent={accent}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </motion.span>
    </span>
  )
}

/* ─── Hero ───────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [hasMouse, setHasMouse] = useState(false)

  useEffect(() => {
    setHasMouse(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  }, [])

  /* Motion values for smoke mouse pos — no React re-render on every mousemove */
  const mouseX = useMotionValue(-1)
  const mouseY = useMotionValue(-1)

  /* Blob parallax mouse pos */
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  /* ── Scroll portal transforms ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const contentY       = useTransform(scrollYProgress, [0, 0.5],   ["0%",  "-8%"])
  const contentScale   = useTransform(scrollYProgress, [0, 0.42],  [1,     0.83])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3],   [1,     0])
  const contentBlur    = useTransform(scrollYProgress, [0, 0.3],   [0,     10])
  const blobScale      = useTransform(scrollYProgress, [0, 0.65],  [1,     5])
  const blobOpacity    = useTransform(scrollYProgress, [0.45, 0.7],[1,     0])
  const overlayOpacity = useTransform(scrollYProgress, [0.12, 0.62],[0,    1])

  /* ── Blob parallax springs ── */
  const cfg = { stiffness: 38, damping: 18 }
  const b1x = useSpring(useTransform(mx, [0, 1], [-26,  26]), cfg)
  const b1y = useSpring(useTransform(my, [0, 1], [-16,  16]), cfg)
  const b2x = useSpring(useTransform(mx, [0, 1], [ 20, -20]), { ...cfg, stiffness: 32 })
  const b2y = useSpring(useTransform(my, [0, 1], [ 12, -12]), { ...cfg, stiffness: 32 })
  const b3x = useSpring(useTransform(mx, [0, 1], [-10,  10]), { ...cfg, stiffness: 26 })
  const b3y = useSpring(useTransform(my, [0, 1], [  8,  -8]), { ...cfg, stiffness: 26 })

  /* Blob parallax listener */
  useEffect(() => {
    if (!hasMouse) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [hasMouse, mx, my])

  /* Smoke headline listener — fires only inside the h1 */
  useEffect(() => {
    if (!hasMouse) return
    const el = headlineRef.current
    if (!el) return
    const onMove  = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    const onLeave = () => { mouseX.set(-1); mouseY.set(-1) }
    el.addEventListener("mousemove",  onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove",  onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [hasMouse, mouseX, mouseY])

  /* Precompute char offsets so each char gets a globally unique seed */
  const charOffsets = useMemo(() => {
    let t = 0
    return HEADLINE.map(({ text }) => { const o = t; t += text.length; return o })
  }, [])

  return (
    <section className="hero" ref={sectionRef}>

      {/* Blobs — portal zoom on scroll */}
      <motion.div className="hero-bg" style={{ scale: blobScale, opacity: blobOpacity }}>
        <motion.div className="blob blob-1" style={hasMouse ? { x: b1x, y: b1y } : {}} />
        <motion.div className="blob blob-2" style={hasMouse ? { x: b2x, y: b2y } : {}} />
        <motion.div className="blob blob-3" style={hasMouse ? { x: b3x, y: b3y } : {}} />
      </motion.div>

      {/* Dark void overlay */}
      <motion.div className="hero-overlay" style={{ opacity: overlayOpacity }} />

      {/* Content — recedes on scroll */}
      <motion.div
        className="hero-content"
        style={{
          y:       contentY,
          scale:   contentScale,
          opacity: contentOpacity,
          filter:  useTransform(contentBlur, v => `blur(${v}px)`),
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

        {/* ── Smoke headline — hover to disperse chars like fog ── */}
        <motion.h1
          ref={headlineRef}
          className="hero-headline"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.13, delayChildren: 0.42 } },
          }}
          initial="hidden"
          animate="show"
        >
          {HEADLINE.map(({ text, accent }, i) => (
            <SmokeWord
              key={text}
              text={text}
              accent={accent}
              charOffset={charOffsets[i]}
              mouseX={mouseX}
              mouseY={mouseY}
            />
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
