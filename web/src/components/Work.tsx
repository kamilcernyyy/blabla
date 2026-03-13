"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { BrandThumb, WebThumb, PosterThumb } from "./WorkThumbs"

const PROJECTS = [
  {
    id: 1,
    name: "Nox — Firemní identita",
    year: "2024",
    tags: ["Branding", "Tisk", "Motion"],
    Thumb: BrandThumb,
  },
  {
    id: 2,
    name: "Flux Platforma",
    year: "2024",
    tags: ["Web design", "UI/UX"],
    Thumb: WebThumb,
  },
  {
    id: 3,
    name: "Aurora — Kampaň",
    year: "2025",
    tags: ["Art direction", "Grafika", "Web"],
    Thumb: PosterThumb,
  },
]

/* ─── Responsive hook ────────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    setIsMobile(mq.matches)
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])
  return isMobile
}

/* ─── Horizontal desktop card — tilt + glass shine ──────────── */
function HCard({
  project,
  index,
  scrollYProgress,
}: {
  project: typeof PROJECTS[number]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const cardRef  = useRef<HTMLElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const n        = PROJECTS.length
  const center   = index / (n - 1)
  const half     = 0.45

  const scale   = useTransform(scrollYProgress,
    [Math.max(0, center - half), center, Math.min(1, center + half)],
    [0.88, 1, 0.88])
  const opacity = useTransform(scrollYProgress,
    [Math.max(0, center - half), center - 0.1, center + 0.1, Math.min(1, center + half)],
    [0.3, 1, 1, 0.3])

  // 3D tilt springs
  const rotX  = useMotionValue(0)
  const rotY  = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 28 })
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 28 })

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x    = (e.clientX - rect.left) / rect.width
    const y    = (e.clientY - rect.top)  / rect.height
    rotX.set(-(y - 0.5) * 9)
    rotY.set( (x - 0.5) * 9)
    // Direct DOM update for shine — no React re-render
    if (shineRef.current) {
      shineRef.current.style.background =
        `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12) 0%, transparent 52%)`
    }
  }

  const onMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  const { Thumb } = project

  return (
    <motion.article
      ref={cardRef}
      className="work-card-h"
      style={{ scale, opacity, rotateX: sRotX, rotateY: sRotY, transformPerspective: 900 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div ref={shineRef} className="work-card-shine" />
      <div className="work-thumb-h"><Thumb /></div>
      <div className="work-arrow">↗</div>
      <div className="work-overlay">
        <div className="work-tags">
          {project.tags.map(t => <span key={t} className="work-tag">{t}</span>)}
        </div>
        <p className="work-name">{project.name}</p>
        <p className="work-meta">{project.year}</p>
      </div>
    </motion.article>
  )
}

/* ─── Vertical mobile card ───────────────────────────────────── */
function VCard({ project }: { project: typeof PROJECTS[number] }) {
  const { Thumb } = project
  return (
    <motion.article
      className="work-card-v"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="work-thumb-v"><Thumb /></div>
      <div className="work-overlay">
        <div className="work-tags">
          {project.tags.map(t => <span key={t} className="work-tag">{t}</span>)}
        </div>
        <p className="work-name">{project.name}</p>
        <p className="work-meta">{project.year}</p>
      </div>
    </motion.article>
  )
}

/* ─── Desktop horizontal section ────────────────────────────── */
function HorizontalWork() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["5vw", "-112vw"])

  return (
    <section ref={ref} className="work-section-h" id="work">
      <div className="work-sticky">
        <motion.div
          className="work-label"
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Vybrané práce</span>
          <a href="#" className="view-all">Zobrazit vše ↗</a>
        </motion.div>

        <motion.div className="work-track" style={{ x }}>
          {PROJECTS.map((project, i) => (
            <HCard
              key={project.id}
              project={project}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        <div className="work-progress">
          <motion.div className="work-progress-fill" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  )
}

/* ─── Mobile vertical section ───────────────────────────────── */
function VerticalWork() {
  return (
    <section className="work-section-v" id="work">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span className="section-label">Vybrané práce</span>
        <a href="#" className="view-all">Zobrazit vše ↗</a>
      </div>
      <div className="work-grid-v">
        {PROJECTS.map(p => <VCard key={p.id} project={p} />)}
      </div>
    </section>
  )
}

/* ─── Root — picks layout based on screen size ───────────────── */
export default function Work() {
  const isMobile = useIsMobile()
  return isMobile ? <VerticalWork /> : <HorizontalWork />
}
