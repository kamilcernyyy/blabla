"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Cursor() {
  const [visible,  setVisible]  = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  /* Dot — tight spring */
  const dx = useSpring(mx, { stiffness: 900, damping: 62 })
  const dy = useSpring(my, { stiffness: 900, damping: 62 })

  /* Ring — fluid lag */
  const rx = useSpring(mx, { stiffness: 160, damping: 22 })
  const ry = useSpring(my, { stiffness: 160, damping: 22 })

  useEffect(() => {
    /* Only run on real pointer devices */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-hover]")) setHovering(true)
    }
    const onOut  = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-hover]")) setHovering(false)
    }

    window.addEventListener("mousemove",  onMove,  { passive: true })
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseover",  onOver)
    document.addEventListener("mouseout",   onOut)

    return () => {
      window.removeEventListener("mousemove",  onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseover",  onOver)
      document.removeEventListener("mouseout",   onOut)
    }
  }, [mx, my, visible])

  /* CSS hides these on touch; this is a JS-level guard too */
  if (typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return null
  }

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x: dx, y: dy,
          translateX: "-50%", translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale:       hovering ? 2.1 : 1,
          borderColor: hovering
            ? "rgba(200,255,0,0.55)"
            : "rgba(240,240,240,0.35)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  )
}
