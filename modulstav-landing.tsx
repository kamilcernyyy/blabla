"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { ArrowRight, ChevronDown, Zap, Leaf, Award } from "lucide-react";
import * as THREE from "three";

// ─── Grainy Film SVG Filter ──────────────────────────────────────────────────
const GrainFilter: React.FC = () => (
  <svg
    style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0 }}
    aria-hidden="true"
  >
    <defs>
      <filter id="grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
        <feComposite in="blended" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
  </svg>
);

// ─── Custom Cursor ────────────────────────────────────────────────────────────
const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: pos.x,
        top: pos.y,
        width: 300,
        height: 300,
        background:
          "radial-gradient(circle, rgba(212,163,115,0.12) 0%, rgba(212,163,115,0.04) 40%, transparent 70%)",
      }}
      animate={{ left: pos.x, top: pos.y }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    />
  );
};

// ─── 3D Wireframe House ───────────────────────────────────────────────────────
interface WireframeHouseProps {
  mouseX: number;
  mouseY: number;
}

const WireframeHouse: React.FC<WireframeHouseProps> = ({ mouseX, mouseY }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15 + mouseX * 0.4;
    groupRef.current.rotation.x = -0.15 + mouseY * 0.3;
  });

  const edgeMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#d4a373" }),
    []
  );

  // Body box
  const bodyGeometry = useMemo(() => new THREE.BoxGeometry(2, 1.2, 1.4), []);
  const bodyEdges = useMemo(() => new THREE.EdgesGeometry(bodyGeometry), [bodyGeometry]);

  // Roof (pyramid shape via ConeGeometry)
  const roofGeometry = useMemo(() => new THREE.ConeGeometry(1.35, 0.8, 4), []);
  const roofEdges = useMemo(() => new THREE.EdgesGeometry(roofGeometry), [roofGeometry]);

  // Window frames (small boxes)
  const winGeometry = useMemo(() => new THREE.BoxGeometry(0.3, 0.3, 0.05), []);
  const winEdges = useMemo(() => new THREE.EdgesGeometry(winGeometry), [winGeometry]);

  // Door frame
  const doorGeometry = useMemo(() => new THREE.BoxGeometry(0.3, 0.5, 0.05), []);
  const doorEdges = useMemo(() => new THREE.EdgesGeometry(doorGeometry), [doorGeometry]);

  const accentMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#f5f5f5" }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Body */}
      <lineSegments geometry={bodyEdges} material={edgeMaterial} />

      {/* Roof */}
      <lineSegments
        geometry={roofEdges}
        material={edgeMaterial}
        position={[0, 1.0, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />

      {/* Windows */}
      <lineSegments
        geometry={winEdges}
        material={accentMaterial}
        position={[-0.5, 0.1, 0.71]}
      />
      <lineSegments
        geometry={winEdges}
        material={accentMaterial}
        position={[0.5, 0.1, 0.71]}
      />

      {/* Door */}
      <lineSegments
        geometry={doorEdges}
        material={accentMaterial}
        position={[0, -0.35, 0.71]}
      />
    </group>
  );
};

const ThreeScene: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <WireframeHouse mouseX={mouse.x} mouseY={mouse.y} />
    </Canvas>
  );
};

// ─── Letter Reveal ────────────────────────────────────────────────────────────
const LetterReveal: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-4 ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: wi * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// ─── Magnetic Button ──────────────────────────────────────────────────────────
const MagneticButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }, [x, y]);

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-full border border-[#d4a373]/40 bg-[#d4a373]/10 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-[#d4a373] backdrop-blur-sm transition-colors hover:bg-[#d4a373] hover:text-[#0a0a0a]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
};

// ─── Tilt Card ────────────────────────────────────────────────────────────────
interface TiltCardProps {
  title: string;
  description: string;
  index: number;
  icon: React.ReactNode;
}

const TiltCard: React.FC<TiltCardProps> = ({ title, description, index, icon }) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotateX = useSpring(rotateX, { stiffness: 300, damping: 25 });
  const sRotateY = useSpring(rotateY, { stiffness: 300, damping: 25 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    rotateX.set((-cy / rect.height) * 20);
    rotateY.set((cx / rect.width) * 20);
  }, [rotateX, rotateY]);

  const onMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      style={{ rotateX: sRotateX, rotateY: sRotateY, transformPerspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#d4a373]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4a373]/20 text-[#d4a373]">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-[#f5f5f5]">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[#4a4a4a]">{description}</p>
      </div>
    </motion.div>
  );
};

// ─── Material Card ────────────────────────────────────────────────────────────
interface MaterialCardProps {
  title: string;
  specs: string[];
  gradient: string;
  index: number;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  title,
  specs,
  gradient,
  index,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer overflow-hidden rounded-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="relative h-72 w-full overflow-hidden"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: gradient }}
      >
        {/* Simulated wood grain texture via CSS */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(92deg, transparent 0px, transparent 4px, rgba(255,255,255,0.03) 4px, rgba(255,255,255,0.03) 5px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
        <div className="absolute bottom-6 left-6 text-[#f5f5f5]">
          <p className="text-xs uppercase tracking-widest text-[#d4a373]">
            Materiál
          </p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight">{title}</h3>
        </div>
      </motion.div>

      {/* Floating 3D tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute right-4 top-4 z-20 rounded-xl border border-[#d4a373]/30 bg-[#0a0a0a]/80 p-4 backdrop-blur-md"
            initial={{ opacity: 0, y: -10, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ transformPerspective: 600 }}
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#d4a373]">
              Tech Specs
            </p>
            {specs.map((spec, i) => (
              <p key={i} className="flex items-center gap-2 text-xs text-[#f5f5f5]/80">
                <span className="h-1 w-1 rounded-full bg-[#d4a373]" />
                {spec}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Module Snap ──────────────────────────────────────────────────────────────
const ModuleSnapSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [-120, 0, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, 0]);
  const snap = useTransform(scrollYProgress, [0.45, 0.55], [8, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d4a373]">
          Modulární systém
        </p>
        <h2 className="text-4xl font-black uppercase tracking-tighter text-[#f5f5f5] md:text-6xl">
          Snap Together
        </h2>
      </motion.div>

      <div className="flex items-center justify-center gap-0">
        {/* Left module */}
        <motion.div
          style={{
            x: leftX,
            rotateY: -5,
            transformPerspective: 800,
            marginRight: snap,
          }}
          className="relative h-48 w-40 rounded-l-2xl border border-[#d4a373]/40 bg-gradient-to-br from-[#d4a373]/20 to-[#4a4a4a]/20 backdrop-blur-sm md:h-64 md:w-56"
        >
          <div className="absolute inset-4 flex flex-col justify-end">
            <div className="mb-2 h-1 w-8 rounded-full bg-[#d4a373]/60" />
            <div className="h-1 w-12 rounded-full bg-[#d4a373]/40" />
            <div className="mt-1 h-1 w-6 rounded-full bg-[#d4a373]/20" />
          </div>
          <div className="absolute right-0 top-1/2 h-8 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#d4a373]/60" />
          <p className="absolute left-4 top-4 text-xs font-bold uppercase tracking-widest text-[#d4a373]">
            Modul A
          </p>
        </motion.div>

        {/* Right module */}
        <motion.div
          style={{
            x: rightX,
            rotateY: 5,
            transformPerspective: 800,
            marginLeft: snap,
          }}
          className="relative h-48 w-40 rounded-r-2xl border border-[#f5f5f5]/20 bg-gradient-to-br from-[#4a4a4a]/30 to-[#d4a373]/10 backdrop-blur-sm md:h-64 md:w-56"
        >
          <div className="absolute inset-4 flex flex-col justify-start">
            <div className="mb-2 h-1 w-8 rounded-full bg-[#f5f5f5]/40" />
            <div className="h-1 w-12 rounded-full bg-[#f5f5f5]/30" />
          </div>
          <div className="absolute left-0 top-1/2 h-8 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a373]/60 bg-[#0a0a0a]" />
          <p className="absolute right-4 top-4 text-xs font-bold uppercase tracking-widest text-[#f5f5f5]/60">
            Modul B
          </p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 max-w-md text-center text-sm leading-relaxed text-[#4a4a4a]"
      >
        Každý modul je navržen tak, aby dokonale zapadl do celku — technicky i
        esteticky.
      </motion.p>
    </section>
  );
};

// ─── Navigation ───────────────────────────────────────────────────────────────
const Navigation: React.FC = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  return (
    <motion.header
      className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled
          ? "w-[90vw] max-w-4xl rounded-2xl border border-white/10 bg-[#0a0a0a]/70 px-6 py-3 backdrop-blur-xl"
          : "w-[95vw] max-w-5xl rounded-none border-transparent bg-transparent px-6 py-4"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="flex items-center justify-between">
        <span className="text-xl font-black uppercase tracking-[0.15em] text-[#f5f5f5]">
          Modul<span className="text-[#d4a373]">stav</span>
        </span>

        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-widest text-[#f5f5f5]/60 md:flex">
          {["Moduly", "Materiály", "Reference", "O nás"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition-colors hover:text-[#d4a373]"
            >
              {item}
            </a>
          ))}
        </div>

        <MagneticButton>
          Poptávka <ArrowRight className="ml-1 inline h-3 w-3" />
        </MagneticButton>
      </nav>
    </motion.header>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ filter: "url(#grain)" }}
    >
      {/* 3D Canvas background */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>

      {/* Background grid */}
      <div
        className="absolute inset-0 z-[1] opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,163,115,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,163,115,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content layer */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-[2] flex flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#d4a373]"
        >
          Prémiové modulární domy
        </motion.p>

        <h1 className="mb-6 text-[clamp(3.5rem,12vw,9rem)] font-black uppercase leading-none tracking-[-0.04em] text-[#f5f5f5]">
          <LetterReveal text="MODULÁRNÍ" />
          <br />
          <LetterReveal text="SVOBODA" className="text-[#d4a373]" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-10 max-w-lg text-base leading-relaxed text-[#f5f5f5]/50"
        >
          Stavíme budoucnost — modul po modulu. Prémiové dřevostavby s energetickou
          třídou A a tradiční tesařskou řemeslnou prací.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            Prozkoumat moduly <ArrowRight className="ml-2 inline h-4 w-4" />
          </MagneticButton>
          <button className="text-xs uppercase tracking-widest text-[#f5f5f5]/40 transition-colors hover:text-[#f5f5f5]">
            Zobrazit reference
          </button>
        </motion.div>
      </motion.div>

      {/* Foreground glassmorphic floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-24 right-8 z-[3] hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:block"
      >
        <p className="mb-1 text-xs uppercase tracking-widest text-[#d4a373]">
          Energie
        </p>
        <p className="text-2xl font-black text-[#f5f5f5]">Třída A</p>
        <p className="text-xs text-[#4a4a4a]">Nízkoenergetický standard</p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2 text-[#f5f5f5]/30"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
};

// ─── Modular Grid ─────────────────────────────────────────────────────────────
const modules = [
  {
    title: "Studio 30",
    description:
      "Kompaktní modul 30 m² — ideální jako zahradní studio, home office nebo chatka.",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Residence 80",
    description:
      "Plnohodnotný bytový modul 80 m² s obývacím pokojem, kuchyní a ložnicí.",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "Villa 150",
    description:
      "Prémiová vila 150 m² s možností vertikálního rozšíření o druhé patro.",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    title: "Eco Passive",
    description:
      "Pasivní standard s TZB systémy, rekuperací a fotovoltaikou v ceně.",
    icon: <Leaf className="h-5 w-5" />,
  },
];

const ModularGrid: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section ref={ref} id="moduly" className="relative px-6 py-32">
      <motion.div style={{ y }} className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d4a373]">
            Naše nabídka
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#f5f5f5] md:text-6xl">
            Moduly
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((mod, i) => (
            <TiltCard key={mod.title} {...mod} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ─── Materials Section ────────────────────────────────────────────────────────
const materialsData = [
  {
    title: "Masivní dřevo",
    gradient: "linear-gradient(135deg, #6b4226 0%, #a0673a 50%, #d4a373 100%)",
    specs: ["Energetická třída A", "Tesařské spoje", "FSC certifikát", "Třída odolnosti D24"],
  },
  {
    title: "Přírodní kámen",
    gradient: "linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #6a6a6a 100%)",
    specs: ["Přírodní původ", "Mrazuvzdorný", "Tloušťka 3 cm", "Povrch honed"],
  },
  {
    title: "Ocelová konstrukce",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #2d3561 50%, #4a5580 100%)",
    specs: ["Žárový zinek", "Statický výpočet", "EN 1090", "Životnost 50+ let"],
  },
];

const MaterialsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} id="materiály" className="relative px-6 py-32">
      <motion.div style={{ y }} className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d4a373]">
            Kvalita v každém detailu
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#f5f5f5] md:text-6xl">
            Materiály
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {materialsData.map((mat, i) => (
            <MaterialCard key={mat.title} {...mat} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer className="border-t border-white/5 px-6 py-12">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
      <span className="text-xl font-black uppercase tracking-[0.15em] text-[#f5f5f5]">
        Modul<span className="text-[#d4a373]">stav</span>
      </span>
      <p className="text-xs text-[#4a4a4a]">
        © {new Date().getFullYear()} Modulstav. Všechna práva vyhrazena.
      </p>
      <div className="flex gap-6 text-xs uppercase tracking-widest text-[#4a4a4a]">
        <a href="#" className="transition-colors hover:text-[#d4a373]">
          GDPR
        </a>
        <a href="#" className="transition-colors hover:text-[#d4a373]">
          Kontakt
        </a>
      </div>
    </div>
  </footer>
);

// ─── Root Landing Page ────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.color = "#f5f5f5";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div
      className="relative min-h-screen bg-[#0a0a0a] font-sans text-[#f5f5f5]"
      style={{ filter: "url(#grain)" }}
    >
      <GrainFilter />
      <CustomCursor />
      <Navigation />

      <AnimatePresence>
        <main>
          <HeroSection />
          <ModularGrid />
          <ModuleSnapSection />
          <MaterialsSection />
          <Footer />
        </main>
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;