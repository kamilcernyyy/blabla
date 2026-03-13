"use client"

import { motion } from "framer-motion"

const SOCIALS = [
  { label: "Twitter",  href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "GitHub",   href: "#" },
  { label: "LinkedIn", href: "#" },
]

/* Split headline into individually animated words */
const LINE1 = ["Pojďme", "vytvořit"]
const LINE2 = ["něco", "skvělého."]

function WordFlip({ word, delay, accent = false }: { word: string; delay: number; accent?: boolean }) {
  return (
    <span className="contact-word-wrap">
      <motion.span
        className={`contact-word${accent ? " accent-word" : ""}`}
        initial={{ rotateX: 90, y: 24, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}
      </motion.span>
    </span>
  )
}

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow" />

      <motion.p
        className="contact-eyebrow"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        Spojte se se mnou
      </motion.p>

      {/* 3D perspective headline — each word flips in */}
      <h2 className="contact-headline contact-headline-3d">
        <div className="contact-line">
          {LINE1.map((word, i) => (
            <WordFlip key={word} word={word} delay={i * 0.1} />
          ))}
        </div>
        <div className="contact-line">
          {LINE2.map((word, i) => (
            <WordFlip
              key={word}
              word={word}
              delay={LINE1.length * 0.1 + i * 0.1}
              accent={word === "skvělého."}
            />
          ))}
        </div>
      </h2>

      {/* Email */}
      <motion.a
        href="mailto:ahoj@grafista.cz"
        className="contact-email"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ color: "var(--accent)" }}
      >
        ahoj@grafista.cz ↗
      </motion.a>

      {/* Socials */}
      <motion.div
        className="contact-socials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        {SOCIALS.map(({ label, href }, i) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {i > 0 && <span className="contact-divider" />}
            <a href={href} className="social-link">{label}</a>
          </span>
        ))}
      </motion.div>

      <motion.footer
        className="footer"
        style={{ marginTop: "6rem" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span>© 2025 Grafista. Všechna práva vyhrazena.</span>
        <span>Navrženo & vytvořeno s ♥</span>
      </motion.footer>
    </section>
  )
}
