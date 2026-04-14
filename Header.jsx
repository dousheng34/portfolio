import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "bg-bone/95 backdrop-blur-sm border-b border-ink/8" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="font-display font-bold text-xl tracking-tight text-ink hover:text-blue-accent transition-colors">
          AETHER.
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-xs tracking-widest text-ink/50 hover:text-ink transition-colors duration-200 uppercase"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-mono text-xs tracking-widest px-5 py-2.5 bg-ink text-bone hover:bg-blue-accent transition-colors duration-200 uppercase"
          >
            HIRE ME
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          id="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-ink"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-ink"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-ink"
          />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bone flex flex-col pt-24 px-8 pb-12 md:hidden"
          >
            <div className="divider mb-10" />
            <nav className="flex flex-col gap-0">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="font-display font-bold text-5xl text-ink border-b border-ink/10 py-6 hover:text-blue-accent transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto">
              <p className="label-mono mb-2">STATUS</p>
              <p className="font-mono text-xs text-blue-accent">AVAILABLE FOR FREELANCE & FULL-TIME</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
