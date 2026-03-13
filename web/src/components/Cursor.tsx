"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Cursor() {
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  // Dot — snappy
  const dx = useSpring(mx, { stiffness: 900, damping: 60 })
  const dy = useSpring(my, { stiffness: 900, damping: 60 })

  // Ring — lags behind for that fluid Framer feel
  const rx = useSpring(mx, { stiffness: 180, damping: 25 })
  const ry = useSpring(my, { stiffness: 180, damping: 25 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest("a, button, [data-hover]")) setHovering(true)
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest("a, button, [data-hover]")) setHovering(false)
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
    }
  }, [mx, my])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: dx, y: dy, translateX: "-50%", translateY: "-50%" }}
      />

      {/* Ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: hovering ? 2.0 : 1,
          borderColor: hovering
            ? "rgba(200,255,0,0.6)"
            : "rgba(240,240,240,0.35)",
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
    </>
  )
}
