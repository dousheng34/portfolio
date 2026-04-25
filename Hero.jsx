import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, Cpu } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

/* ── Animated counter ── */
const Counter = ({ to, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame;
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.floor(p * to));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, to]);

  return <span ref={ref}>{val}{suffix}</span>;
};

/* ── Glitch text ── */
const GlitchText = ({ children, className = "" }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setActive(true);
      setTimeout(() => setActive(false), 180);
    }, 3800 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      {active && (
        <>
          <span
            className="absolute inset-0 text-blue-accent select-none pointer-events-none"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 40%)", transform: "translateX(-3px)" }}
            aria-hidden
          >{children}</span>
          <span
            className="absolute inset-0 text-purple-500 select-none pointer-events-none"
            style={{ clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)", transform: "translateX(3px)" }}
            aria-hidden
          >{children}</span>
        </>
      )}
    </span>
  );
};

/* ── Typed string ── */
const TypedString = ({ strings, speed = 80, pause = 2000 }) => {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    if (!deleting && charIdx <= current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      setDisplayed(current.slice(0, charIdx));
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx > current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx >= 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      setDisplayed(current.slice(0, charIdx));
      return () => clearTimeout(t);
    }
    if (deleting && charIdx < 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % strings.length);
      setCharIdx(0);
    }
  }, [charIdx, deleting, idx, strings, speed, pause]);

  return (
    <span>
      {displayed}
      <span className="animate-[blink_1s_step-end_infinite] border-r-2 border-blue-accent ml-0.5" />
    </span>
  );
};

const Hero = ({ isMobile = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rawY    = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y       = useSpring(rawY, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 overflow-hidden border-b border-ink/10"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <Scene3D isMobile={isMobile} />
      </div>

      {/* Radial vignette — dark for glass droid */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #050510 100%)"
        }}
      />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col min-h-[calc(100vh-6rem)] justify-between">

        {/* ── TOP STATUS BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-accent" />
            </span>
            <span className="label-mono">NEURAL_CORE_ACTIVE</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="label-mono">EST. 2021 — DIGITAL DIMENSION</span>
            <span className="font-mono text-[10px] text-ink/30 uppercase tracking-widest px-2 py-0.5 border border-ink/10">
              <TypedString strings={["AI CREATOR", "VISUAL ENGINEER", "3D ARTIST", "PROMPT ARCHITECT"]} />
            </span>
          </div>
        </motion.div>

        {/* ── MAIN HEADLINE ── */}
        <div className="flex-1 flex flex-col justify-center py-16 max-w-7xl w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="label-mono mb-8 text-blue-accent flex items-center gap-2"
          >
            <Cpu size={12} />
            AI CREATIVE STRATEGIST & VISUAL ENGINEER
          </motion.p>

          <h1 className="font-display font-bold leading-[0.9] tracking-tight text-ink uppercase">
            {[
              { word: "ПРЕВРАЩАЮ", delay: 0.5, glitch: true },
              { word: "ШУМ В",    delay: 0.6, accent: true },
              { word: "СМЫСЛ.",   delay: 0.7, glitch: false },
            ].map(({ word, delay, glitch, accent }) => (
              <motion.span
                key={word}
                className={`block overflow-hidden ${accent ? "text-blue-accent" : ""}`}
                style={{ fontSize: "clamp(3.2rem, 10vw, 9.5rem)" }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {glitch ? <GlitchText>{word}</GlitchText> : word}
              </motion.span>
            ))}
          </h1>

          {/* ── SUB ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between border-t border-ink/10 mt-10 pt-8"
          >
            <p className="text-ink/55 text-base md:text-lg max-w-sm leading-relaxed font-light">
              AI-креатор с 3-летним опытом. На стыке кода и визуального искусства. Ошибки ИИ — материал для стиля.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <a href="#work" className="btn-primary group">
                СМОТРЕТЬ РАБОТЫ
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="btn-outline">
                О МЕТОДЕ
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-end justify-between"
        >
          {/* Stats */}
          <div className="flex gap-8 md:gap-12">
            {[
              { to: 3,  suffix: "+", label: "ГОДА" },
              { to: 50, suffix: "+", label: "ПРОЕКТОВ" },
            ].map(({ to, suffix, label }) => (
              <div key={label}>
                <div className="font-display font-bold text-2xl md:text-3xl text-ink">
                  <Counter to={to} suffix={suffix} />
                </div>
                <div className="label-mono text-[10px]">{label}</div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="label-mono text-[9px]">SCROLL</span>
            <ArrowDown size={14} className="text-ink/30" />
          </motion.div>

          {/* Status */}
          <div className="text-right hidden md:block">
            <p className="label-mono">STATUS</p>
            <p className="font-mono text-xs text-green-600 mt-1">● OPEN TO WORK</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
