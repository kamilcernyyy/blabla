"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Logo from "./Logo"

const LINKS = [
  { href: "#work",    label: "Práce"   },
  { href: "#about",   label: "O mně"   },
  { href: "#contact", label: "Kontakt" },
]

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)")
    const h  = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false) }
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.nav
        className="nav"
        style={{ background: scrolled ? "rgba(8,8,8,0.9)" : "rgba(8,8,8,0.55)" }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <Link href="/" className="logo-wrap" onClick={close} aria-label="Grafista">
          <Logo />
          <span className="logo-text">Grafista</span>
        </Link>

        {/* Desktop nav */}
        <ul className="nav-links" role="list">
          {LINKS.map(({ href, label }, i) => (
            <motion.li
              key={href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i + 0.4, duration: 0.5 }}
            >
              <a href={href} className="nav-link">{label}</a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <motion.a
          href="#contact"
          className="nav-cta"
          style={{ display: open ? "none" : undefined }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          K dispozici ↗
        </motion.a>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={open}
        >
          <span className={`ham-line${open ? " open" : ""}`} />
          <span className={`ham-line${open ? " open" : ""}`} />
        </button>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="mobile-menu-links">
              {LINKS.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  className="mobile-menu-link"
                  onClick={close}
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{    y: 24, opacity: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            <motion.a
              href="#contact"
              className="btn btn-primary"
              style={{ marginTop: "2.5rem", alignSelf: "flex-start" }}
              onClick={close}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              K dispozici ↗
            </motion.a>

            <motion.p
              className="mobile-menu-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              © 2025 Grafista
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
