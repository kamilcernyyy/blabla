import React from 'react';
import { motion } from 'framer-motion';
import './styles.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <ModuleSnap />
      <Materials />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="hero">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to Modulstav
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Your modular house solution!
      </motion.p>
      <motion.a
        href="#module-snap"
        className="cta-button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Explore Modules
      </motion.a>
    </section>
  );
};

const modules = [
  { id: 1, name: 'Living Room', area: '30 m²', icon: '🛋️' },
  { id: 2, name: 'Bedroom', area: '20 m²', icon: '🛏️' },
  { id: 3, name: 'Kitchen', area: '15 m²', icon: '🍳' },
  { id: 4, name: 'Bathroom', area: '8 m²', icon: '🚿' },
  { id: 5, name: 'Home Office', area: '12 m²', icon: '💻' },
  { id: 6, name: 'Storage', area: '6 m²', icon: '📦' },
];

const ModuleSnap = () => {
  return (
    <section className="module-snap" id="module-snap">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Module Snap
      </motion.h2>
      <p className="section-subtitle">
        Snap together your perfect home from our pre-designed modules.
      </p>
      <div className="modules-grid">
        {modules.map((mod, index) => (
          <motion.div
            key={mod.id}
            className="module-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="module-icon">{mod.icon}</span>
            <h3>{mod.name}</h3>
            <p>{mod.area}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const materials = [
  {
    name: 'Cross-Laminated Timber (CLT)',
    description: 'Sustainable, strong, and lightweight structural panels.',
    tag: 'Structural',
  },
  {
    name: 'Mineral Wool Insulation',
    description: 'Excellent thermal and acoustic insulation properties.',
    tag: 'Insulation',
  },
  {
    name: 'Fiber Cement Cladding',
    description: 'Durable, low-maintenance exterior finish available in many colors.',
    tag: 'Exterior',
  },
  {
    name: 'Triple-Glazed Windows',
    description: 'High energy-efficiency windows that minimize heat loss.',
    tag: 'Windows',
  },
  {
    name: 'Recycled Steel Frame',
    description: 'High-strength connections made from recycled steel.',
    tag: 'Structural',
  },
  {
    name: 'Low-VOC Interior Finishes',
    description: 'Healthy, eco-friendly paints and coatings for interiors.',
    tag: 'Interior',
  },
];

const Materials = () => {
  return (
    <section className="materials">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Our Materials
      </motion.h2>
      <p className="section-subtitle">
        We use only sustainable, certified materials in every module.
      </p>
      <div className="materials-list">
        {materials.map((mat, index) => (
          <motion.div
            key={mat.name}
            className="material-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <span className="material-tag">{mat.tag}</span>
            <h3>{mat.name}</h3>
            <p>{mat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LandingPage;