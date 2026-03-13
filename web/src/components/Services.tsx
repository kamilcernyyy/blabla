"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"

/* ─── Data ─────────────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "Webový design",
    desc: "Navrhuji weby, které dýchají. Od prvního wireframu po živé pixely — každý detail má svůj důvod. Weby, na které se lidé rádi vrací.",
    tags: ["UI/UX", "Prototypování", "Next.js", "Framer"],
    glow: "rgba(200,255,0,0.07)",
    Visual: WebVisual,
  },
  {
    num: "02",
    title: "Grafický design",
    desc: "Vizuální identity, které si lidé pamatují. Logo, typografie, barevný systém — vše navrženo jako celek, který funguje na každém médiu.",
    tags: ["Branding", "Logodesign", "Tisk", "Packaging"],
    glow: "rgba(124,58,237,0.09)",
    Visual: BrandVisual,
  },
  {
    num: "03",
    title: "Motion & animace",
    desc: "Pohyb, který vypráví příběh. Animace UI, motion grafika a interakce, které mění průměrné weby na zážitky.",
    tags: ["Framer Motion", "After Effects", "Lottie", "GSAP"],
    glow: "rgba(14,165,233,0.09)",
    Visual: MotionVisual,
  },
]

/* ─── SVG Illustrations ─────────────────────────────────────── */
function WebVisual() {
  return (
    <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg">
      <rect x="20" y="20" width="380" height="300" rx="12" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
      <rect x="20" y="20" width="380" height="36" rx="12" fill="rgba(255,255,255,0.05)" />
      <rect x="21" y="44" width="378" height="12" fill="rgba(255,255,255,0.05)" />
      <circle cx="40" cy="38" r="4.5" fill="rgba(255,80,80,0.45)" />
      <circle cx="54" cy="38" r="4.5" fill="rgba(255,190,0,0.45)" />
      <circle cx="68" cy="38" r="4.5" fill="rgba(0,200,80,0.45)" />
      <rect x="96" y="30" width="228" height="16" rx="4" fill="rgba(255,255,255,0.04)" />
      <rect x="104" y="35" width="90" height="6" rx="2" fill="rgba(255,255,255,0.14)" />
      <rect x="36" y="68" width="348" height="30" fill="rgba(255,255,255,0.025)" />
      <rect x="48" y="76" width="40" height="8" rx="2" fill="rgba(200,255,0,0.55)" />
      <rect x="268" y="78" width="24" height="5" rx="1" fill="rgba(255,255,255,0.18)" />
      <rect x="300" y="78" width="24" height="5" rx="1" fill="rgba(255,255,255,0.18)" />
      <rect x="330" y="74" width="52" height="12" rx="6" fill="rgba(200,255,0,0.28)" />
      <rect x="48" y="116" width="200" height="17" rx="3" fill="rgba(255,255,255,0.72)" />
      <rect x="48" y="139" width="240" height="17" rx="3" fill="rgba(255,255,255,0.72)" />
      <rect x="48" y="162" width="155" height="17" rx="3" fill="rgba(200,255,0,0.65)" />
      <rect x="48" y="192" width="260" height="5" rx="1" fill="rgba(255,255,255,0.16)" />
      <rect x="48" y="203" width="200" height="5" rx="1" fill="rgba(255,255,255,0.10)" />
      <rect x="48" y="218" width="82" height="22" rx="6" fill="rgba(200,255,0,0.48)" />
      <rect x="138" y="218" width="70" height="22" rx="6" stroke="rgba(255,255,255,0.13)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
      <circle cx="328" cy="184" r="66" stroke="rgba(200,255,0,0.1)"  strokeWidth="1" fill="rgba(200,255,0,0.03)" />
      <circle cx="328" cy="184" r="42" stroke="rgba(200,255,0,0.15)" strokeWidth="1" fill="rgba(200,255,0,0.055)" />
      <circle cx="328" cy="184" r="20" fill="rgba(200,255,0,0.18)" />
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={48 + i*114} y="260" width="100" height="46" rx="6" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <rect x={58 + i*114} y="270" width="50" height="6" rx="2" fill="rgba(255,255,255,0.38)" />
          <rect x={58 + i*114} y="281" width="70" height="4" rx="1" fill="rgba(255,255,255,0.13)" />
          <rect x={58 + i*114} y="289" width="46" height="4" rx="1" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}
    </svg>
  )
}

function BrandVisual() {
  return (
    <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg">
      <circle cx="210" cy="130" r="86"  stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
      <circle cx="210" cy="130" r="62"  stroke="rgba(124,58,237,0.28)"   strokeWidth="1.5" fill="rgba(124,58,237,0.035)" />
      <path d="M 256,130 A 46,46 0 1,1 210,84" stroke="rgba(255,255,255,0.78)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="210" y1="130" x2="256" y2="130" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="210" cy="130" r="5.5" fill="#c8ff00" />
      {[0,90,180,270].map(deg => {
        const r  = Math.PI * deg / 180
        const x1 = 210 + 64 * Math.cos(r), y1 = 130 + 64 * Math.sin(r)
        const x2 = 210 + 72 * Math.cos(r), y2 = 130 + 72 * Math.sin(r)
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
      })}
      <rect x="158" y="208" width="104" height="12" rx="3" fill="rgba(255,255,255,0.58)" />
      <rect x="176" y="226" width="68"  height="7"  rx="2" fill="rgba(255,255,255,0.18)" />
      {["#1a0533","#7c3aed","#c8ff00","#fff","rgba(255,255,255,0.14)"].map((c, i) => (
        <rect key={i} x={88 + i*52} y="270" width="38" height="38" rx="6" fill={c} stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
      ))}
      <circle cx="78"  cy="78"  r="20" stroke="rgba(124,58,237,0.2)" strokeWidth="1" fill="none" />
      <circle cx="342" cy="282" r="30" stroke="rgba(200,255,0,0.1)"  strokeWidth="1" fill="none" />
    </svg>
  )
}

function MotionVisual() {
  return (
    <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="service-svg">
      <path d="M 58,170 C 58,78 162,58 210,170 C 258,282 362,262 362,170" stroke="rgba(14,165,233,0.18)" strokeWidth="1" fill="none" />
      <path d="M 58,170 C 58,58 182,38 210,170 C 238,302 382,282 382,170" stroke="rgba(14,165,233,0.09)" strokeWidth="1" fill="none" />
      {([[58,170],[134,112],[210,170],[286,228],[362,170]] as [number,number][]).map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="10" fill="rgba(14,165,233,0.12)" stroke="rgba(14,165,233,0.45)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="3.5" fill={i === 2 ? "#c8ff00" : "rgba(14,165,233,0.75)"} />
        </g>
      ))}
      <circle cx="210" cy="170" r="20" fill="rgba(200,255,0,0.07)" />
      <circle cx="210" cy="170" r="36" fill="rgba(200,255,0,0.035)" />
      {[0,1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x="46" y={262 + i*13} width={[60,100,80,120,70,90][i]} height="5" rx="1.5"
            fill={i === 2 ? "rgba(200,255,0,0.48)" : "rgba(255,255,255,0.11)"} />
          {i < 3 && <rect x="42" y={260 + i*13} width="2" height="7" rx="1" fill="rgba(14,165,233,0.38)" />}
        </g>
      ))}
      <path d="M 302,302 C 322,302 332,262 362,262" stroke="rgba(200,255,0,0.48)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="302" cy="302" r="3.5" fill="rgba(200,255,0,0.48)" />
      <circle cx="362" cy="262" r="3.5" fill="rgba(200,255,0,0.78)" />
    </svg>
  )
}

/* ─── Per-segment progress bar ──────────────────────────────── */
function ProgressSeg({
  index,
  scrollYProgress,
}: {
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const n     = SERVICES.length
  const start = index / n
  const end   = (index + 1) / n

  const scaleX = useTransform(scrollYProgress, [start, end], [0, 1])
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.01), start + 0.02, end, Math.min(1, end + 0.3)],
    [0.3, 1, 1, 0.3],
  )

  return (
    <div className="services-progress-seg">
      <motion.div className="services-progress-fill" style={{ scaleX, opacity }} />
    </div>
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
  const y     = useTransform(scrollYProgress, [s, s + 0.12], [44, 0])
  const scale = useTransform(scrollYProgress, [s, s + 0.12], [0.97, 1])

  const { Visual } = service

  return (
    <motion.div
      className="service-panel"
      style={{
        opacity,
        y,
        scale,
        background: `radial-gradient(ellipse 65% 65% at 70% 50%, ${service.glow}, transparent)`,
      }}
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

  return (
    <section ref={ref} className="services-section" id="about">
      <div className="services-sticky">

        {/* Panels */}
        {SERVICES.map((service, i) => (
          <ServicePanel
            key={service.num}
            service={service}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Bottom chapter progress */}
        <div className="services-progress">
          {SERVICES.map((_, i) => (
            <ProgressSeg key={i} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
