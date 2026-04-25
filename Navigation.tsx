"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Briefcase, Mail, Box } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-full px-4 md:w-auto"
    >
      <div className={`glass px-6 py-3 rounded-[24px] flex items-center gap-6 md:gap-10 transition-all duration-500 ${scrolled ? 'bg-black/80' : 'bg-black/40'}`}>
        <a href="#hero" className="flex flex-col items-center gap-1 group">
          <Box className="w-5 h-5 text-white/50 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
          <span className="text-[10px] uppercase font-mono text-white/50 group-hover:text-white transition-colors">Core</span>
        </a>
        <a href="#philosophy" className="flex flex-col items-center gap-1 group">
          <User className="w-5 h-5 text-white/50 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
          <span className="text-[10px] uppercase font-mono text-white/50 group-hover:text-white transition-colors">About</span>
        </a>
        <a href="#work" className="flex flex-col items-center gap-1 group">
          <Briefcase className="w-5 h-5 text-white/50 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
          <span className="text-[10px] uppercase font-mono text-white/50 group-hover:text-white transition-colors">Work</span>
        </a>
        <a href="#contact" className="flex flex-col items-center gap-1 group">
          <Mail className="w-5 h-5 text-white/50 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
          <span className="text-[10px] uppercase font-mono text-white/50 group-hover:text-white transition-colors">Ping</span>
        </a>
      </div>
    </motion.div>
  );
}
