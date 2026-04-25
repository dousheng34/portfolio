import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

/* ── Данные проектов ── */
const PROJECTS = [
  {
    id: 1,
    title: "Neural Dreams",
    year: "2025",
    category: "Generative Art",
    tags: ["Stable Diffusion", "GLSL", "Python"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Quantum UI",
    year: "2024",
    category: "Interface Design",
    tags: ["React", "Framer Motion", "Figma"],
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Spectral Flow",
    year: "2024",
    category: "Audio Visual",
    tags: ["WebGL", "Web Audio API", "GSAP"],
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Aether Core",
    year: "2023",
    category: "WebGL / 3D",
    tags: ["Three.js", "GLSL", "R3F"],
    image: "https://images.unsplash.com/photo-1635776062127-d323af9a03e9?q=80&w=1600&auto=format&fit=crop",
  },
];

/* ── Section ── */
const PortfolioSection = () => {
  return (
    <section id="work" className="py-32 px-6 md:px-12 bg-bone overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Шапка секции ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 gap-8">

          {/* Левая часть */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-8 h-px bg-blue-accent" />
              <span className="font-mono text-[11px] tracking-[0.22em] text-blue-accent uppercase">
                Selected Works
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                data-cursor="heading"
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold uppercase tracking-tight leading-[0.88] text-ink"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                Избранные<br />
                <span className="text-blue-accent italic">Артефакты</span>
              </motion.h2>
            </div>
          </div>

          {/* Правая часть — описание */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-mono text-[11px] text-ink/35 uppercase tracking-widest
              leading-relaxed md:max-w-[240px] md:text-right"
          >
            От кинематографичных миров до тактильной айдентики. Каждый проект — на стыке кода и визуального искусства.
          </motion.p>
        </div>

        {/* ── Сетка карточек ── */}
        {/* Асимметричная: первая и третья карточки — нормально, вторая и четвёртая — со смещением вниз */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-0">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className={i % 2 === 1 ? "md:mt-36" : "md:mb-36"}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* ── CTA снизу ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 md:mt-32 flex justify-center"
        >
          <button className="group flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-ink/30 uppercase
              group-hover:text-blue-accent transition-colors duration-300">
              Все проекты
            </span>
            {/* Анимированная вертикальная линия */}
            <div className="w-px h-10 bg-ink/15 group-hover:h-16 group-hover:bg-blue-accent
              transition-all duration-500 ease-out" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default PortfolioSection;
