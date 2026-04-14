import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const ParticleField = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 12 + Math.random() * 12,
    size: 1 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-accent"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            bottom: -10,
          }}
          animate={{ y: [0, -(window?.innerHeight || 800) - 100], opacity: [0, 0.7, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const GlitchText = ({ children }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${glitch ? "translate-x-0.5" : ""} transition-transform duration-75`}>
      {children}
      {glitch && (
        <span className="absolute inset-0 text-blue-accent translate-x-1 opacity-60 select-none" aria-hidden>
          {children}
        </span>
      )}
    </span>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 overflow-hidden border-b border-ink/10">
      <ParticleField />

      {/* Top status bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between"
        style={{ y, opacity }}
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent animate-pulse" />
          <span className="label-mono">NEURAL_CORE_ACTIVE</span>
        </div>
        <span className="label-mono hidden md:block">EST. 2021 — DIGITAL DIMENSION</span>
      </motion.div>

      {/* Main content */}
      <motion.div style={{ y, opacity }} className="flex-1 flex flex-col justify-center py-16 max-w-7xl mx-auto w-full">
        {/* Role tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="label-mono mb-8 text-blue-accent"
        >
          AI CREATIVE STRATEGIST
        </motion.p>

        {/* Big headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-display font-bold text-6xl md:text-8xl lg:text-[10rem] leading-[0.92] tracking-tight text-ink mb-10 uppercase"
        >
          <GlitchText>ПРЕВРАЩАЮ</GlitchText>
          <br />
          <span className="text-blue-accent">ШУМ В</span>
          <br />
          СМЫСЛ
        </motion.h1>

        {/* Sub text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between border-t border-ink/10 pt-8"
        >
          <p className="text-ink/60 text-base md:text-lg max-w-md leading-relaxed font-light">
            AI-креатор с 3-летним опытом. Экспертиза на стыке кода и визуального
            искусства. Создаю реальность, в которой ошибки ИИ становятся
            артефактами стиля.
          </p>
          <div className="flex items-center gap-4">
            <a href="#work" className="btn-primary group">
              СМОТРЕТЬ РАБОТЫ
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        style={{ opacity }}
        className="flex items-end justify-between"
      >
        <div>
          <p className="label-mono">SYS.LOCATION</p>
          <p className="font-mono text-xs text-ink/40 mt-1">X: 0.52 / Y: 0.88</p>
        </div>
        <div className="text-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <ArrowDown size={16} className="text-ink/30" />
          </motion.div>
        </div>
        <div className="text-right">
          <p className="label-mono">STATUS</p>
          <p className="font-mono text-xs text-blue-accent mt-1">ACTIVE_CORE</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
