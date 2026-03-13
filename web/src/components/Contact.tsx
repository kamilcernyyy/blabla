"use client"

import { motion } from "framer-motion"

const SOCIALS = [
  { label: "Twitter",  href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "GitHub",   href: "#" },
  { label: "LinkedIn", href: "#" },
]

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow" />

      {/* Eyebrow */}
      <motion.p
        className="contact-eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        Get in touch
      </motion.p>

      {/* Headline — word-by-word reveal */}
      <div style={{ overflow: "hidden", marginBottom: "2.5rem" }}>
        <motion.h2
          className="contact-headline"
          initial={{ y: "60%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s build something{" "}
          <em>great</em>.
        </motion.h2>
      </div>

      {/* Email */}
      <motion.a
        href="mailto:hello@studio.com"
        className="contact-email"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ color: "var(--accent)" }}
      >
        hello@studio.com ↗
      </motion.a>

      {/* Socials */}
      <motion.div
        className="contact-socials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {SOCIALS.map(({ label, href }, i) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {i > 0 && <span className="contact-divider" />}
            <a href={href} className="social-link">{label}</a>
          </span>
        ))}
      </motion.div>

      {/* Footer strip */}
      <motion.footer
        className="footer"
        style={{ marginTop: "6rem" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span>© 2025 Studio. All rights reserved.</span>
        <span>Designed & built with ♥</span>
      </motion.footer>
    </section>
  )
}
