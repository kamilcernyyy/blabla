"use client"

const ITEMS = [
  "Grafický design",
  "Webový vývoj",
  "UI / UX design",
  "Motion design",
  "Firemní identita",
  "Kreativní vedení",
  "Typografie",
  "Tvorba webu",
]

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
