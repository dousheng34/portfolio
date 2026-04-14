import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const categoryColors = {
  design: "from-neon-pink to-neon-purple",
  "3d": "from-neon-purple to-neon-blue",
  animation: "from-neon-blue to-neon-pink",
  development: "from-neon-blue to-neon-purple",
};

const categoryLabels = {
  design: "Дизайн",
  "3d": "3D",
  animation: "Анимация",
  development: "Разработка",
};

const ProjectCard = ({ project, onClick }) => {
  const gradient = categoryColors[project.category] || "from-neon-blue to-neon-purple";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="glass-card cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      {/* Image area */}
      <div className="aspect-video relative overflow-hidden rounded-t-2xl">
        {/* Gradient placeholder */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
        />

        {/* Dark base */}
        <div className="w-full h-full bg-dark-800 flex items-center justify-center relative">
          {/* Decorative circles */}
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-30 blur-xl absolute`} />
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} opacity-20`} />

          {/* Center icon text */}
          <span className="absolute text-white/20 text-xs font-mono tracking-wider uppercase">
            {project.category}
          </span>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10"
        >
          <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
            <ExternalLink size={14} />
            <span>Открыть проект</span>
          </div>
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-20">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${gradient} shadow-lg`}
          >
            {categoryLabels[project.category]}
          </span>
        </div>

        {/* Tag on hover */}
        <motion.div
          className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="glass px-2.5 py-1 text-xs text-white/80 rounded-full">
            {project.tags[0]}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-display font-semibold mb-1.5 group-hover:text-neon-blue transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/40 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
