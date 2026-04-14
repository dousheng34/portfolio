import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const projects = [
  {
    id: 1,
    year: "2025",
    title: "NEURAL DREAMS",
    category: "GENERATIVE ART",
    description:
      "Серия генеративных работ, созданных на стыке кода и случайности. Stable Diffusion + кастомные GLSL-шейдеры формируют уникальные визуальные миры, где каждый артефакт ИИ становится частью нарратива.",
    tags: ["STABLE DIFFUSION", "GLSL", "PYTHON", "COMFYUI"],
    accent: "#1a5cff",
  },
  {
    id: 2,
    year: "2024",
    title: "QUANTUM UI",
    category: "INTERFACE DESIGN",
    description:
      "Дизайн-система для B2B SaaS-платформы с фокусом на dense information architecture. Тёмная тема, кастомные charts, микроанимации на Framer Motion.",
    tags: ["FIGMA", "REACT", "FRAMER MOTION", "DESIGN SYSTEM"],
    accent: "#ff2a9d",
  },
  {
    id: 3,
    year: "2024",
    title: "SYNTHETIC VOICES",
    category: "AUDIO AI",
    description:
      "Эксперименты с генерацией аудио через ИИ — музыкальные текстуры, voice cloning, синтез ambient-пространств. Визуализация звука в реальном времени на WebGL.",
    tags: ["ELEVEN LABS", "WEBGL", "AUDIO API", "PYTHON"],
    accent: "#b224ef",
  },
  {
    id: 4,
    year: "2023",
    title: "AETHER CORE",
    category: "WEBGL / 3D",
    description:
      "Интерактивный 3D-опыт, построенный на Three.js и GLSL. Процедурные геометрии реагируют на звук и движение мыши. Полностью в браузере, без плагинов.",
    tags: ["THREE.JS", "GLSL", "WEBGL", "GSAP"],
    accent: "#00c4ff",
  },
];

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-50 bg-bone border border-ink/15 max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 w-full" style={{ background: project.accent }} />
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="label-mono text-blue-accent mb-2">
                    {project.category} — {project.year}
                  </p>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-ink uppercase tracking-tight">
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-ink/5 transition-colors -mr-2 -mt-2"
                  aria-label="Close"
                >
                  <X size={20} className="text-ink/50" />
                </button>
              </div>

              <div
                className="w-full aspect-video mb-8 flex items-center justify-center border border-ink/10"
                style={{ background: `${project.accent}12` }}
              >
                <span
                  className="font-display font-bold text-7xl tracking-tight"
                  style={{ color: project.accent, opacity: 0.18 }}
                >
                  {project.title.charAt(0)}
                </span>
              </div>

              <p className="text-ink/65 text-base leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-ink/10">
                <button className="btn-primary">
                  LIVE DEMO <ArrowUpRight size={13} />
                </button>
                <button className="btn-outline">VIEW SOURCE</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProjectRow = ({ project, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.4, delay: index * 0.07 }}
    onClick={() => onClick(project)}
    className="group flex items-center gap-4 md:gap-8 py-6 md:py-7 border-b border-ink/10 cursor-pointer hover:bg-ink/[0.025] transition-colors px-2 -mx-2"
  >
    <span className="font-mono text-xs text-ink/25 w-10 shrink-0">{project.year}</span>
    <span className="font-mono text-xs text-blue-accent w-6 shrink-0">
      {String(index + 1).padStart(2, "0")}
    </span>
    <h3 className="font-display font-bold text-xl md:text-3xl text-ink flex-1 group-hover:text-blue-accent transition-colors duration-200 uppercase tracking-tight">
      {project.title}
    </h3>
    <span className="hidden md:block font-mono text-xs text-ink/35 tracking-widest uppercase shrink-0">
      {project.category}
    </span>
    <ArrowUpRight
      size={18}
      className="text-ink/15 group-hover:text-blue-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
    />
  </motion.div>
);

const PortfolioSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="work" className="py-24 px-6 md:px-12 border-b border-ink/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-number mb-4"
            >
              01 / SELECTED ARTIFACTS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold text-4xl md:text-6xl text-ink uppercase tracking-tight leading-none"
            >
              ИЗБРАННЫЕ
              <br />
              <span className="text-blue-accent">АРТЕФАКТЫ</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs text-ink/30 md:max-w-xs md:text-right leading-relaxed uppercase tracking-wide"
          >
            От кинематографичных миров до тактильной айдентики. Каждый проект — это исследование возможностей нейросетей.
          </motion.p>
        </div>

        <div className="border-t border-ink/10">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onClick={setSelected}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default PortfolioSection;
