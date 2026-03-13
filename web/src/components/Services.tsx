"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"

/* ─── Data ───────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "Webový design",
    desc: "Navrhuji weby, které dýchají. Od prvního wireframu po živé pixely — každý detail má svůj důvod. Weby, na které se lidé rádi vrací.",
    tags: ["UI/UX", "Prototypování", "Next.js", "Framer"],
    glow: "rgba(200,255,0,0.08)",
    Visual: WebVisual,
  },
  {
    num: "02",
    title: "Grafický design",
    desc: "Vizuální identity, které si lidé pamatují. Logo, typografie, barevný systém — vše navrženo jako celek, který funguje na každém médiu.",
    tags: ["Branding", "Logodesign", "Tisk", "Packaging"],
    glow: "rgba(124,58,237,0.1)",
    Visual: BrandVisual,
  },
  {
    num: "03",
    title: "Motion & animace",
    desc: "Pohyb, který vypráví příběh. Animace uživatelského rozhraní, motion grafika a interakce, které mění průměrné weby na zážitky.",
    tags: ["Framer Motion", "After Effects", "Lottie", "GSAP"],
    glow: "rgba(14,165,233,0.1)",
    Visual: MotionVisual,
  },
]

/* ─── SVG Visuals ────────────────────────────────────────────── */
function WebVisual() {
  return (
    <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg">
      {/* Browser frame */}
      <rect x="20" y="20" width="380" height="300" rx="12" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
      <rect x="20" y="20" width="380" height="36" rx="12" fill="rgba(255,255,255,0.06)" />
      <rect x="21" y="44" width="378" height="12" fill="rgba(255,255,255,0.06)" />
      <circle cx="40" cy="38" r="5" fill="rgba(255,80,80,0.5)" />
      <circle cx="56" cy="38" r="5" fill="rgba(255,190,0,0.5)" />
      <circle cx="72" cy="38" r="5" fill="rgba(0,200,80,0.5)" />
      <rect x="100" y="30" width="220" height="16" rx="4" fill="rgba(255,255,255,0.05)" />
      <rect x="108" y="35" width="90" height="6" rx="2" fill="rgba(255,255,255,0.15)" />

      {/* Nav */}
      <rect x="36" y="68" width="348" height="30" fill="rgba(255,255,255,0.03)" />
      <rect x="48" y="76" width="40" height="8" rx="2" fill="rgba(200,255,0,0.6)" />
      <rect x="270" y="78" width="24" height="5" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="302" y="78" width="24" height="5" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="334" y="74" width="50" height="12" rx="6" fill="rgba(200,255,0,0.3)" />

      {/* Hero text blocks */}
      <rect x="48" y="114" width="200" height="18" rx="3" fill="rgba(255,255,255,0.75)" />
      <rect x="48" y="138" width="240" height="18" rx="3" fill="rgba(255,255,255,0.75)" />
      <rect x="48" y="162" width="160" height="18" rx="3" fill="rgba(200,255,0,0.7)" />
      <rect x="48" y="192" width="260" height="5" rx="1" fill="rgba(255,255,255,0.18)" />
      <rect x="48" y="202" width="200" height="5" rx="1" fill="rgba(255,255,255,0.12)" />
      <rect x="48" y="218" width="80" height="22" rx="6" fill="rgba(200,255,0,0.5)" />
      <rect x="136" y="218" width="70" height="22" rx="6" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.04)" />

      {/* Right decorative shape */}
      <circle cx="330" cy="185" r="65" stroke="rgba(200,255,0,0.12)" strokeWidth="1" fill="rgba(200,255,0,0.04)" />
      <circle cx="330" cy="185" r="40" stroke="rgba(200,255,0,0.18)" strokeWidth="1" fill="rgba(200,255,0,0.06)" />
      <circle cx="330" cy="185" r="18" fill="rgba(200,255,0,0.2)" />

      {/* Card row */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={48 + i*114} y="258" width="100" height="48" rx="6"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <rect x={58 + i*114} y="268" width="50" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
          <rect x={58 + i*114} y="279" width="70" height="4" rx="1" fill="rgba(255,255,255,0.15)" />
          <rect x={58 + i*114} y="287" width="50" height="4" rx="1" fill="rgba(255,255,255,0.1)" />
        </g>
      ))}
    </svg>
  )
}

function BrandVisual() {
  return (
    <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg">
      {/* Center logo mark */}
      <circle cx="210" cy="130" r="85" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <circle cx="210" cy="130" r="60" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" fill="rgba(124,58,237,0.04)" />
      {/* G mark */}
      <path d="M 255,130 A 45,45 0 1,1 210,85" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
      <line x1="210" y1="130" x2="255" y2="130" stroke="#c8ff00" strokeWidth="3" strokeLinecap="round" />
      <circle cx="210" cy="130" r="6" fill="#c8ff00" />
      {/* Tick marks */}
      {[0,90,180,270].map(deg => {
        const r = Math.PI * deg / 180
        const x1 = 210 + 62 * Math.cos(r), y1 = 130 + 62 * Math.sin(r)
        const x2 = 210 + 70 * Math.cos(r), y2 = 130 + 70 * Math.sin(r)
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      })}

      {/* Wordmark placeholder */}
      <rect x="158" y="210" width="104" height="12" rx="3" fill="rgba(255,255,255,0.6)" />
      <rect x="176" y="228" width="68" height="7" rx="2" fill="rgba(255,255,255,0.2)" />

      {/* Color swatches */}
      {[["#1a0533","#7c3aed","#c8ff00","#fff","rgba(255,255,255,0.15)"]].map((cols) =>
        cols.map((c, i) => (
          <rect key={i} x={90 + i*52} y="270" width="38" height="38" rx="6"
            fill={c} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        ))
      )}

      {/* Decorative rings */}
      <circle cx="80"  cy="80"  r="20" stroke="rgba(124,58,237,0.2)" strokeWidth="1" fill="none" />
      <circle cx="340" cy="280" r="30" stroke="rgba(200,255,0,0.1)"  strokeWidth="1" fill="none" />
    </svg>
  )
}

function MotionVisual() {
  return (
    <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg">
      {/* Motion path arcs */}
      <path d="M 60,170 C 60,80 160,60 210,170 C 260,280 360,260 360,170" stroke="rgba(14,165,233,0.2)" strokeWidth="1" fill="none" />
      <path d="M 60,170 C 60,60 180,40 210,170 C 240,300 380,280 380,170" stroke="rgba(14,165,233,0.1)" strokeWidth="1" fill="none" />

      {/* Nodes on path */}
      {[
        [60, 170], [135, 112], [210, 170], [285, 228], [360, 170]
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="10" fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.5)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="4" fill={i === 2 ? "#c8ff00" : "rgba(14,165,233,0.8)"} />
        </g>
      ))}

      {/* Active node glow */}
      <circle cx="210" cy="170" r="20" fill="rgba(200,255,0,0.08)" />
      <circle cx="210" cy="170" r="35" fill="rgba(200,255,0,0.04)" />

      {/* Code lines */}
      {[0,1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x="48" y={260 + i*13} width={[60,100,80,120,70,90][i]} height="5" rx="1.5"
            fill={i === 2 ? "rgba(200,255,0,0.5)" : "rgba(255,255,255,0.12)"} />
          {i < 3 && <rect x="44" y={258 + i*13} width="2" height="7" rx="1" fill="rgba(14,165,233,0.4)" />}
        </g>
      ))}

      {/* Easing curve */}
      <path d="M 300,300 C 320,300 330,260 360,260" stroke="rgba(200,255,0,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="300" cy="300" r="4" fill="rgba(200,255,0,0.5)" />
      <circle cx="360" cy="260" r="4" fill="rgba(200,255,0,0.8)" />
      <text x="300" y="322" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace">ease-out-expo</text>
    </svg>
  )
}

/* ─── Panel ──────────────────────────────────────────────────── */
function ServicePanel({
  service,
  index,
  scrollYProgress,
}: {
  service: typeof SERVICES[number]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const n   = SERVICES.length
  const seg = 1 / n
  const s   = index * seg
  const e   = s + seg

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, s - 0.01), s + 0.1, e - 0.1, Math.min(1, e + 0.01)],
    [0, 1, 1, 0],
  )
  const y = useTransform(scrollYProgress, [s, s + 0.12], [40, 0])
  const scale = useTransform(scrollYProgress, [s, s + 0.12], [0.97, 1])
  const { Visual } = service

  return (
    <motion.div
      className="service-panel"
      style={{ opacity, y, scale, background: `radial-gradient(ellipse 60% 60% at 70% 50%, ${service.glow}, transparent)` }}
    >
      <div className="service-content">
        <span className="service-num">{service.num}</span>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.desc}</p>
        <div className="service-tags">
          {service.tags.map(t => <span key={t} className="service-tag">{t}</span>)}
        </div>
      </div>
      <div className="service-visual">
        <Visual />
      </div>
    </motion.div>
  )
}

/* ─── Section ────────────────────────────────────────────────── */
export default function Services() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  /* Dot indicator position */
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  return (
    <section ref={ref} className="services-section" id="about">
      <div className="services-sticky">

        {/* Progress dots */}
        <div className="services-dots">
          {SERVICES.map((_, i) => (
            <div key={i} className="services-dot-wrap">
              <div className="services-dot" />
            </div>
          ))}
          <motion.div className="services-dot-active" style={{ y: dotY }} />
        </div>

        {/* Panels */}
        {SERVICES.map((service, i) => (
          <ServicePanel
            key={service.num}
            service={service}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
