import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Лёгкий параллакс — картинка двигается медленнее контейнера
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.article
      ref={ref}
      data-cursor="card"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative flex flex-col gap-5 cursor-none"
    >
      {/* ── Изображение/Видео ── */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] md:aspect-[16/10]">
        {/* Параллакс-обёртка: 120% высоты чтобы было пространство для сдвига */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover
                grayscale group-hover:grayscale-0
                scale-105 group-hover:scale-100
                transition-all duration-700 ease-out"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover
                grayscale group-hover:grayscale-0
                scale-105 group-hover:scale-100
                transition-all duration-700 ease-out"
            />
          )}
        </motion.div>

        {/* Тёмный оверлей снизу (появляется при наведении) */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/50 via-transparent to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        " />

        {/* Категория — верхний левый угол */}
        <div className="absolute top-4 left-4 z-10">
          <span className="
            font-mono text-[10px] tracking-[0.15em] uppercase
            px-2.5 py-1
            bg-bone/90 text-ink backdrop-blur-sm
            opacity-0 group-hover:opacity-100
            -translate-y-1 group-hover:translate-y-0
            transition-all duration-400
          ">
            {project.category}
          </span>
        </div>

        {/* Год — верхний правый угол */}
        <div className="absolute top-4 right-4 z-10">
          <span className="
            font-mono text-[10px] text-white/60
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
          ">
            {project.year}
          </span>
        </div>
      </div>

      {/* ── Подпись снизу ── */}
      <div className="flex items-start justify-between gap-4 px-0.5">
        {/* Название */}
        <h3 className="
          font-display font-bold uppercase tracking-tight leading-none
          text-xl md:text-2xl text-ink
          group-hover:text-blue-accent
          transition-colors duration-300
        ">
          {project.title}
        </h3>

        {/* Стек технологий */}
        <div className="flex flex-wrap justify-end gap-1.5 shrink-0 pt-0.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                font-mono text-[9px] uppercase tracking-widest
                text-ink/40 border border-ink/12
                px-2 py-0.5
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Тонкая линия-индикатор снизу */}
      <div className="
        h-px bg-ink/8
        origin-left scale-x-0 group-hover:scale-x-100
        transition-transform duration-500 ease-out
      " />
    </motion.article>
  );
};

export default ProjectCard;
