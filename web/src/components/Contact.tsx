"use client"

import { motion } from "framer-motion"

const SOCIALS = [
  { label: "Twitter",  href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "GitHub",   href: "#" },
  { label: "LinkedIn", href: "#" },
]

const LINE1 = ["Pojďme", "vytvořit"]
const LINE2 = ["něco",   "skvělého."]

function WordFlip({
  word,
  delay,
  accent = false,
}: {
  word: string
  delay: number
  accent?: boolean
}) {
  return (
    <span className="contact-word-wrap">
      <motion.span
        className={`contact-word${accent ? " accent-word" : ""}`}
        initial={{ rotateX: 88, y: 28, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ duration: 0.6 }}
      >
        Spojte se se mnou
      </motion.p>

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

      <motion.a
        href="mailto:ahoj@grafista.cz"
        className="contact-email"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        ahoj@grafista.cz ↗
      </motion.a>

      <motion.div
        className="contact-socials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        {SOCIALS.map(({ label, href }, i) => (
          <div key={label} className="social-item">
            {i > 0 && <span className="contact-divider" aria-hidden="true" />}
            <a href={href} className="social-link">{label}</a>
          </div>
        ))}
      </motion.div>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ marginTop: "5rem" }}
      >
        <span>© 2025 Grafista. Všechna práva vyhrazena.</span>
        <span>Navrženo & vytvořeno s láskou</span>
      </motion.footer>
    </section>
  )
}
