"use client"

import { motion } from "framer-motion"

const links = [
  { label: "Work",     href: "#work"    },
  { label: "About",    href: "#about"   },
  { label: "Contact",  href: "#contact" },
]

export default function Navbar() {
  return (
    <motion.nav
      className="nav"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1,  y:   0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <motion.a
        href="/"
        className="nav-logo"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        Studio<span>.</span>
      </motion.a>

      {/* Links */}
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

      {/* CTA pill */}
      <motion.a
        href="#contact"
        className="nav-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Available ↗
      </motion.a>
    </motion.nav>
  )
}
