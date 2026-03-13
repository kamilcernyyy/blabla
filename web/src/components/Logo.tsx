export default function Logo() {
  return (
    <span className="logo-wrap">
      {/* Geometric G mark */}
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        {/* Arc — full circle minus top-right gap */}
        <path
          d="M 23,13 A 10,10 0 1,1 13,3"
          stroke="#c8ff00"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Crossbar — center to right */}
        <line
          x1="13" y1="13"
          x2="23" y2="13"
          stroke="#c8ff00"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Inner dot */}
        <circle cx="13" cy="13" r="1.8" fill="#c8ff00" />
      </svg>

      <span className="logo-text">Grafista</span>
    </span>
  )
}
