"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Twitter, Mail, ArrowRight, Activity, Zap, Code2, Sparkles } from "lucide-react";
import ThreeCanvas from "@/components/ThreeCanvas";
import VideoScroll from "@/components/VideoScroll";
import Navigation from "@/components/Navigation";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Reveal animations for text
    const revealElements = document.querySelectorAll(".reveal-text");
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 100, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="relative bg-[#0a0a0a]" ref={containerRef}>
      <VideoScroll />
      <ThreeCanvas />
      <Navigation />

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-[120vh] flex flex-col justify-center px-6 md:px-24 pt-20" id="hero">
          <div className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/50">Neural Core Active</span>
            </motion.div>
            
            <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-[8rem] font-bold leading-[0.9] tracking-tighter text-white mb-8 mix-blend-difference text-shadow-md">
              <motion.span 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block overflow-hidden"
              >
                TURNING
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-blue-500 overflow-hidden"
              >
                NOISE INTO
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block overflow-hidden"
              >
                MEANING.
              </motion.span>
            </h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="glass p-8 rounded-2xl max-w-2xl mt-12 backdrop-blur-xl bg-black/40 border-white/10 border"
            >
              <h2 className="text-xl md:text-2xl font-[family-name:var(--font-display)] mb-4 text-white uppercase tracking-wide">
                Orchestrating the Chaos of Neural Networks.
              </h2>
              <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
                Welcome to my digital cortex. I am AETHER. AI creator and visual experience engineer with 3 years of expertise. I create reality where AI errors become style artifacts.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="min-h-screen py-32 px-6 md:px-24" id="philosophy">
          <div className="max-w-4xl ml-auto">
            <div className="reveal-text overflow-hidden mb-6">
              <span className="text-blue-500 text-sm tracking-[0.2em] uppercase font-bold">02 / Philosophy</span>
            </div>
            
            <h2 className="reveal-text font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold uppercase text-white mb-12 mix-blend-difference leading-none">
              Controlled Chaos <br /> + Rigorous Editing
            </h2>
            
            <div className="glass-card mb-16 max-w-3xl">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                I don't just use AI tools - I explore their limits. Every glitch, artifact, and model hallucination becomes material for creativity. I work at the intersection of generative art, UI/UX, and 3D. The result is visual systems that are both functional and provocative.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
              {[
                { val: "3+", label: "Years AI Exploration", icon: Activity },
                { val: "50+", label: "Projects Shipped", icon: Sparkles },
                { val: "∞", label: "Neural Iterations", icon: Zap }
              ].map((stat, i) => (
                <div key={i} className="reveal-text">
                  <stat.icon className="w-6 h-6 text-blue-500 mb-4" strokeWidth={1.5} />
                  <div className="font-[family-name:var(--font-display)] text-5xl font-bold text-white mb-2">{stat.val}</div>
                  <div className="text-xs uppercase tracking-[0.1em] text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="min-h-screen py-32 px-6 md:px-24" id="work">
          <div className="reveal-text mb-20">
            <span className="text-blue-500 text-sm tracking-[0.2em] uppercase font-bold block mb-4">03 / Selected Work</span>
            <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold uppercase text-white mix-blend-difference">
              Digital Artifacts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              { title: "NEURAL DREAMS", cat: "Generative Art", date: "2025", desc: "Exploring the subconscious of algorithms through generative visual artifacts.", height: "h-[600px]" },
              { title: "QUANTUM UI", cat: "Interface Design", date: "2024", desc: "Next-generation spatial control systems breaking traditional UX patterns.", height: "h-[450px]" },
              { title: "SYNTHETIC VOICES", cat: "Audio AI", date: "2024", desc: "Architecting sonic landscapes using state-of-the-art synthetic models.", height: "h-[500px]" },
              { title: "AETHER CORE", cat: "WebGL / 3D", date: "2023", desc: "Interactive 3D experience diving into the core of generative processes.", height: "h-[700px]" }
            ].map((p, i) => (
              <div key={i} className={`reveal-text group relative rounded-3xl overflow-hidden ${p.height} ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
                <div className="absolute inset-0 bg-white/5 group-hover:bg-blue-500/10 transition-colors duration-700 backdrop-blur-sm border border-white/10 z-0"></div>
                
                {/* Placeholder for project image/visual */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay bg-gradient-to-br from-black to-blue-900/50"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white/70">
                      {p.cat}
                    </span>
                    <span className="text-xs font-mono text-white/50">{p.date}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-500">
                      {p.title}
                    </h3>
                    <p className="text-sm text-white/60 font-light max-w-sm mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {p.desc}
                    </p>
                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-blue-400 transition-colors">
                      View Project <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <section className="min-h-[80vh] flex flex-col justify-center items-center px-6 md:px-24 py-32 text-center" id="contact">
          <div className="reveal-text w-full">
            <h2 className="font-[family-name:var(--font-display)] text-[12vw] md:text-[8vw] leading-[0.8] font-bold text-white uppercase mix-blend-difference mb-12 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-700 cursor-default">
              LET'S BUILD <br/> REALITY.
            </h2>
            
            <a href="mailto:hello@aether.ai" className="inline-block group glass-card hover:bg-white/10 transition-colors px-12 py-6 rounded-full mb-16">
              <span className="flex items-center gap-4 text-xl font-light text-white/80 group-hover:text-white transition-colors">
                <Mail strokeWidth={1.5} className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                hello@aether.ai
              </span>
            </a>
            
            <div className="flex justify-center gap-8">
              <a href="#" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-blue-500 transition-colors group">
                <Github strokeWidth={1.5} className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Github
              </a>
              <a href="#" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-blue-500 transition-colors group">
                <Twitter strokeWidth={1.5} className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                Twitter
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-8 text-xs text-white/30 uppercase tracking-widest font-mono">
            © 2026 AETHER. DIGITAL CORTEX.
          </div>
        </section>
      </div>
    </main>
  );
}
