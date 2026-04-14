import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const menuItems = ["Work", "About", "Contact"];

const MobileMenu = ({ isOpen, onClose }) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-40 md:hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-dark-900/97 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Grid bg decoration */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Neon glow decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl" />

          <div className="relative h-full flex flex-col p-8">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-16">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                PORTFOLIO.
              </span>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center gap-2">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                  className="group flex items-center gap-4 py-4 border-b border-white/5 text-4xl font-display font-semibold text-white/70 hover:text-white transition-colors"
                >
                  <span className="text-sm text-neon-blue/60 font-mono font-normal w-8">
                    0{i + 1}
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    {item}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pb-4"
            >
              <a
                href="#contact"
                onClick={onClose}
                className="block w-full text-center py-4 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple text-dark-900 font-bold text-lg hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-shadow duration-300"
              >
                Связаться со мной
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
