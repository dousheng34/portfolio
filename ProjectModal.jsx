import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { useEffect } from "react";

const categoryColors = {
  design: "from-neon-pink to-neon-purple",
  "3d": "from-neon-purple to-neon-blue",
  animation: "from-neon-blue to-neon-pink",
  development: "from-neon-blue to-neon-purple",
};

const ProjectModal = ({ project, onClose }) => {
  // Lock scroll
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const gradient = project ? categoryColors[project.category] || "from-neon-blue to-neon-purple" : "";

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-dark-900/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              className="glass max-w-3xl w-full max-h-[88vh] overflow-auto rounded-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image / header */}
              <div className={`relative aspect-video bg-gradient-to-br ${gradient} overflow-hidden rounded-t-2xl`}>
                <div className="absolute inset-0 bg-dark-800/70" />

                {/* Decorative elements */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br ${gradient} opacity-30 blur-3xl`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/15 text-8xl font-display font-bold select-none">
                    {project.title.charAt(0)}
                  </span>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark-900/90 to-transparent">
                  <h3 className="text-3xl font-display font-bold text-white">
                    {project.title}
                  </h3>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2.5 glass rounded-full hover:bg-white/20 transition-colors duration-200 text-white/70 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Description */}
                <p className="text-white/70 text-lg leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div>
                  <h4 className="text-white/40 text-xs uppercase tracking-widest mb-3 font-medium">
                    Технологии
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white text-sm font-medium shadow-lg`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2 border-t border-white/5">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-dark-900 font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all duration-300 hover:scale-105">
                    <ExternalLink size={15} />
                    Live Demo
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/15 text-white/80 font-semibold text-sm hover:border-neon-blue/30 hover:bg-white/10 transition-all duration-300">
                    <Github size={15} />
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
