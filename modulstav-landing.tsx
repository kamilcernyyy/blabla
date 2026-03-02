import React from 'react';
import { Motion, spring } from 'framer-motion';
import './styles.css'; // Import your styles here

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
      <h1>Welcome to Modulstav</h1>
      <p>Your modular house solution!</p>
    </section>
  );
};

const ModuleSnap = () => {
  return (
    <section className="module-snap">
      <h2>Module Snap</h2>
      {/* 3D Canvas component would go here */}
    </section>
  );
};

const Materials = () => {
  return (
    <section className="materials">
      <h2>Our Materials</h2>
      {/* Material details would go here */}
    </section>
  );
};

export default LandingPage;