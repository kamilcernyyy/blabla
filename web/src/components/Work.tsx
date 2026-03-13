"use client"

import { motion } from "framer-motion"

const PROJECTS = [
  {
    id: 1,
    name: "Aether — Brand Identity",
    year: "2024",
    tags: ["Branding", "Print", "Motion"],
    thumb: "thumb-1",
    letter: "Æ",
  },
  {
    id: 2,
    name: "Flux Platform",
    year: "2024",
    tags: ["Web Dev", "UI/UX"],
    thumb: "thumb-2",
    letter: "F",
  },
  {
    id: 3,
    name: "Solstice — Campaign",
    year: "2025",
    tags: ["Art Direction", "Photography", "Web"],
    thumb: "thumb-3",
    letter: "S",
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Work() {
  return (
    <section className="work-section" id="work">
      {/* Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">Recent Projects</h2>
        </div>
        <a href="#" className="view-all">
          View all ↗
        </a>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="work-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {PROJECTS.map((p) => (
          <motion.article key={p.id} className="work-card" variants={card}>
            {/* Thumbnail */}
            <div className={`work-thumb ${p.thumb}`}>
              <div className="work-thumb-inner">{p.letter}</div>
            </div>

            {/* Hover arrow */}
            <div className="work-arrow">↗</div>

            {/* Info overlay */}
            <div className="work-overlay">
              <div className="work-tags">
                {p.tags.map((t) => (
                  <span key={t} className="work-tag">{t}</span>
                ))}
              </div>
              <p className="work-name">{p.name}</p>
              <p className="work-meta">{p.year}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
