"use client"

import { motion } from "framer-motion"

/* ─── SVG Thumbnails ─────────────────────────────────────────── */

/** Card 1 — Brand identity mockup */
const BrandThumb = () => (
  <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    {/* Background */}
    <defs>
      <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#1a0533" />
        <stop offset="55%"  stopColor="#4a00a0" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="card1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
      </linearGradient>
    </defs>
    <rect width="600" height="450" fill="url(#bg1)" />

    {/* ── Logo mark ── */}
    {/* Outer ring */}
    <circle cx="300" cy="155" r="72" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    {/* Main circle stroke */}
    <path d="M 355,155 A 55,55 0 1,1 300,100" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
    {/* Crossbar */}
    <line x1="300" y1="155" x2="355" y2="155" stroke="#c8ff00" strokeWidth="3" strokeLinecap="round" />
    {/* Center dot */}
    <circle cx="300" cy="155" r="5" fill="#c8ff00" />
    {/* Decorative tick marks */}
    <line x1="300" y1="83"  x2="300" y2="91"  stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
    <line x1="300" y1="219" x2="300" y2="227" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
    <line x1="228" y1="155" x2="236" y2="155" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />

    {/* Brand name under mark */}
    <rect x="248" y="240" width="104" height="12" rx="3" fill="rgba(255,255,255,0.7)" />
    <rect x="270" y="260" width="60"  height="7"  rx="2" fill="rgba(255,255,255,0.25)" />

    {/* ── Business cards ── */}
    {/* Card dark */}
    <rect x="68" y="315" width="200" height="112" rx="6" fill="url(#card1)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    <rect x="84" y="334" width="60"  height="7"   rx="2" fill="rgba(255,255,255,0.6)" />
    <rect x="84" y="347" width="40"  height="4"   rx="1" fill="rgba(255,255,255,0.25)" />
    <circle cx="244" cy="364" r="18" fill="none" stroke="rgba(200,255,0,0.5)" strokeWidth="1.5" />
    <line x1="244" y1="355" x2="244" y2="373" stroke="rgba(200,255,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="235" y1="364" x2="253" y2="364" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="84" y="396" width="80"  height="3"   rx="1" fill="rgba(255,255,255,0.15)" />
    <rect x="84" y="404" width="55"  height="3"   rx="1" fill="rgba(255,255,255,0.1)" />

    {/* Card light */}
    <rect x="332" y="315" width="200" height="112" rx="6" fill="rgba(255,255,255,0.93)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    <rect x="348" y="334" width="60"  height="7"   rx="2" fill="#1a0533" />
    <rect x="348" y="347" width="40"  height="4"   rx="1" fill="rgba(100,60,160,0.4)" />
    <circle cx="508" cy="364" r="18" fill="none" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" />
    <line x1="508" y1="355" x2="508" y2="373" stroke="rgba(124,58,237,0.7)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="499" y1="364" x2="517" y2="364" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="348" y="396" width="80"  height="3"   rx="1" fill="rgba(0,0,0,0.12)" />
    <rect x="348" y="404" width="55"  height="3"   rx="1" fill="rgba(0,0,0,0.08)" />

    {/* ── Color palette strip ── */}
    <rect x="68"  y="438" width="40" height="6" rx="1" fill="#1a0533" />
    <rect x="114" y="438" width="40" height="6" rx="1" fill="#7c3aed" />
    <rect x="160" y="438" width="40" height="6" rx="1" fill="#c8ff00" />
    <rect x="206" y="438" width="40" height="6" rx="1" fill="white"   />
    <rect x="252" y="438" width="40" height="6" rx="1" fill="rgba(255,255,255,0.2)" />
  </svg>
)

/** Card 2 — Web / UI platform mockup */
const WebThumb = () => (
  <svg viewBox="0 0 450 600" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#001f3f" />
        <stop offset="55%"  stopColor="#0369a1" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
    <rect width="450" height="600" fill="url(#bg2)" />

    {/* ── Browser chrome ── */}
    <rect x="30" y="30" width="390" height="540" rx="10" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    {/* Title bar */}
    <rect x="30" y="30" width="390" height="38" rx="10" fill="rgba(255,255,255,0.08)" />
    <rect x="31" y="48" width="388" height="20" fill="rgba(255,255,255,0.08)" />
    {/* Traffic lights */}
    <circle cx="54" cy="49" r="5" fill="#ff5f57" />
    <circle cx="70" cy="49" r="5" fill="#ffbd2e" />
    <circle cx="86" cy="49" r="5" fill="#28c840" />
    {/* URL bar */}
    <rect x="108" y="41" width="246" height="16" rx="4" fill="rgba(255,255,255,0.07)" />
    <rect x="116" y="46" width="80"  height="6"  rx="2" fill="rgba(255,255,255,0.2)" />

    {/* ── Site nav inside browser ── */}
    <rect x="30" y="68" width="390" height="42" fill="rgba(255,255,255,0.04)" />
    <rect x="50" y="80" width="48" height="8" rx="2" fill="rgba(255,255,255,0.6)" />
    <rect x="260" y="82" width="28" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
    <rect x="296" y="82" width="28" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
    <rect x="332" y="78" width="70" height="12" rx="6" fill="rgba(14,165,233,0.6)" />

    {/* ── Hero block ── */}
    <rect x="50"  y="128" width="180" height="14" rx="3" fill="rgba(255,255,255,0.75)" />
    <rect x="50"  y="148" width="220" height="14" rx="3" fill="rgba(255,255,255,0.75)" />
    <rect x="50"  y="168" width="140" height="14" rx="3" fill="#0ea5e9" opacity="0.8" />
    <rect x="50"  y="196" width="260" height="5"  rx="1" fill="rgba(255,255,255,0.2)" />
    <rect x="50"  y="206" width="200" height="5"  rx="1" fill="rgba(255,255,255,0.15)" />
    <rect x="50"  y="220" width="80"  height="24" rx="6" fill="#0ea5e9" />
    <rect x="140" y="220" width="80"  height="24" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

    {/* Hero visual / abstract shape */}
    <circle cx="350" cy="190" r="70" fill="none" stroke="rgba(14,165,233,0.25)" strokeWidth="1" />
    <circle cx="350" cy="190" r="50" fill="none" stroke="rgba(14,165,233,0.15)" strokeWidth="1" />
    <circle cx="350" cy="190" r="30" fill="rgba(14,165,233,0.15)" />
    <circle cx="350" cy="190" r="12" fill="rgba(14,165,233,0.5)" />

    {/* ── Stats row ── */}
    <rect x="50" y="264" width="330" height="1" fill="rgba(255,255,255,0.06)" />
    {[0, 1, 2].map(i => (
      <g key={i}>
        <rect x={50 + i * 115} y="276" width="96" height="54" rx="6"
          fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x={62 + i * 115} y="288" width="36" height="10" rx="2" fill="rgba(14,165,233,0.7)" />
        <rect x={62 + i * 115} y="304" width="60" height="4"  rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x={62 + i * 115} y="312" width="44" height="4"  rx="1" fill="rgba(255,255,255,0.12)" />
      </g>
    ))}

    {/* ── Cards row ── */}
    <rect x="50" y="348" width="330" height="1" fill="rgba(255,255,255,0.06)" />
    {[0, 1].map(i => (
      <g key={i}>
        <rect x={50 + i * 168} y="360" width="152" height="96" rx="6"
          fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x={62 + i * 168} y="374" width="80" height="8"  rx="2" fill="rgba(255,255,255,0.5)" />
        <rect x={62 + i * 168} y="388" width="120" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x={62 + i * 168} y="396" width="96"  height="4" rx="1" fill="rgba(255,255,255,0.12)" />
        <rect x={62 + i * 168} y="408" width="60"  height="18" rx="4" fill="rgba(14,165,233,0.4)" />
        <rect x={128 + i * 168} y="408" width="36" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
      </g>
    ))}

    {/* ── Footer ── */}
    <rect x="30" y="538" width="390" height="32" fill="rgba(255,255,255,0.03)" />
    <rect x="50" y="548" width="60" height="5" rx="1" fill="rgba(255,255,255,0.2)" />
    <rect x="340" y="548" width="60" height="5" rx="1" fill="rgba(255,255,255,0.1)" />
  </svg>
)

/** Card 3 — Editorial / poster campaign */
const PosterThumb = () => (
  <svg viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#1a0a00" />
        <stop offset="55%"  stopColor="#92400e" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(251,191,36,0.35)" />
        <stop offset="100%" stopColor="rgba(251,191,36,0)" />
      </linearGradient>
    </defs>
    <rect width="900" height="280" fill="url(#bg3)" />

    {/* Decorative circles */}
    <circle cx="730" cy="140" r="180" fill="none" stroke="rgba(251,191,36,0.12)" strokeWidth="1" />
    <circle cx="730" cy="140" r="130" fill="none" stroke="rgba(251,191,36,0.1)" strokeWidth="1" />
    <circle cx="730" cy="140" r="80"  fill="url(#circleGrad)" />
    <circle cx="730" cy="140" r="40"  fill="rgba(251,191,36,0.3)" />

    {/* Grid lines */}
    <line x1="60"  y1="0"   x2="60"  y2="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    <line x1="440" y1="0"   x2="440" y2="280" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    <line x1="0"   y1="70"  x2="900" y2="70"  stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
    <line x1="0"   y1="210" x2="900" y2="210" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

    {/* Year tag */}
    <rect x="60" y="40" width="52" height="16" rx="2" fill="rgba(251,191,36,0.2)" />
    <rect x="66" y="46" width="40" height="5"  rx="1" fill="rgba(251,191,36,0.7)" />

    {/* Main headline — large blocks simulating big type */}
    <rect x="60"  y="72"  width="340" height="52" rx="3" fill="rgba(255,255,255,0.88)" />
    <rect x="60"  y="132" width="260" height="52" rx="3" fill="rgba(251,191,36,0.9)" />
    <rect x="60"  y="192" width="300" height="36" rx="3" fill="rgba(255,255,255,0.15)" />

    {/* Sub lines */}
    <rect x="60"  y="238" width="160" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
    <rect x="60"  y="248" width="100" height="4" rx="1" fill="rgba(255,255,255,0.15)" />

    {/* Separator line */}
    <line x1="60" y1="230" x2="440" y2="230" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

    {/* Right side - issue / date info */}
    <rect x="460" y="40"  width="70" height="4" rx="1" fill="rgba(255,255,255,0.2)" />
    <rect x="460" y="50"  width="50" height="4" rx="1" fill="rgba(255,255,255,0.1)" />
    <rect x="460" y="230" width="80" height="4" rx="1" fill="rgba(251,191,36,0.5)" />
    <rect x="460" y="240" width="55" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
    <rect x="460" y="250" width="40" height="4" rx="1" fill="rgba(255,255,255,0.1)" />
  </svg>
)

/* ─── Data ───────────────────────────────────────────────────── */
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

/* ─── Animation ──────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

/* ─── Component ──────────────────────────────────────────────── */
export default function Work() {
  return (
    <section className="work-section" id="work">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <p className="section-label">Vybrané práce</p>
          <h2 className="section-title">Nedávné projekty</h2>
        </div>
        <a href="#" className="view-all">Zobrazit vše ↗</a>
      </motion.div>

      <motion.div
        className="work-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {PROJECTS.map(({ id, name, year, tags, Thumb }) => (
          <motion.article key={id} className="work-card" variants={card}>
            <div className="work-thumb">
              <Thumb />
            </div>
            <div className="work-arrow">↗</div>
            <div className="work-overlay">
              <div className="work-tags">
                {tags.map(t => <span key={t} className="work-tag">{t}</span>)}
              </div>
              <p className="work-name">{name}</p>
              <p className="work-meta">{year}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
