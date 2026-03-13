"use client"

const ITEMS = [
  "Graphic Design",
  "Web Development",
  "UI / UX",
  "Motion Design",
  "Brand Identity",
  "Creative Direction",
  "Typography",
  "Interaction Design",
]

/* Duplicate for seamless loop */
const ALL = [...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track" aria-hidden>
        <div className="marquee-inner">
          {ALL.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
