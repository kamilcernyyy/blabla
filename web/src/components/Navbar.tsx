"use client"

import { motion } from "framer-motion"
import Logo from "./Logo"

const links = [
  { label: "Práce",    href: "#work"    },
  { label: "O mně",   href: "#about"   },
  { label: "Kontakt", href: "#contact" },
]

export default function Navbar() {
  return (
    <motion.nav
      className="nav"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1,  y:   0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.a
        href="/"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        <Logo />
      </motion.a>

      <ul className="nav-links">
        {links.map(({ label, href }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 * i + 0.35, duration: 0.5 }}
          >
            <a href={href} className="nav-link">{label}</a>
          </motion.li>
        ))}
      </ul>

      <motion.a
        href="#contact"
        className="nav-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        K dispozici ↗
      </motion.a>
    </motion.nav>
  )
}
