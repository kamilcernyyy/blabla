"use client"

import { useRef } from "react"
import {
  motion,
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

/* ─── Individual card — focus scale as it enters center ──────── */
function WorkCard({
  project,
  index,
  scrollYProgress,
}: {
  project: typeof PROJECTS[number]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const n      = PROJECTS.length
  const center = index / (n - 1)
  const half   = 0.5

  const scale   = useTransform(scrollYProgress, [Math.max(0, center - half), center, Math.min(1, center + half)], [0.88, 1, 0.88])
  const opacity = useTransform(scrollYProgress, [Math.max(0, center - half), center - 0.12, center + 0.12, Math.min(1, center + half)], [0.35, 1, 1, 0.35])

  const { Thumb } = project

  return (
    <motion.article className="work-card-h" style={{ scale, opacity }}>
      <div className="work-thumb-h">
        <Thumb />
      </div>
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

/* ─── Section ────────────────────────────────────────────────── */
export default function Work() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Horizontal pull — drag 3 cards across the viewport
  const x = useTransform(scrollYProgress, [0, 1], ["5vw", "-115vw"])

  return (
    <section ref={ref} className="work-section-h" id="work">
      <div className="work-sticky">

        {/* Section label — fades in from top */}
        <motion.div
          className="work-label"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Vybrané práce</span>
          <a href="#" className="view-all">Zobrazit vše ↗</a>
        </motion.div>

        {/* Horizontal track */}
        <motion.div className="work-track" style={{ x }}>
          {PROJECTS.map((project, i) => (
            <WorkCard
              key={project.id}
              project={project}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="work-progress">
          <motion.div
            className="work-progress-fill"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  )
}
