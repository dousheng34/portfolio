import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Twitter, Github, Linkedin, Send } from "lucide-react";

// ─── ABOUT / PHILOSOPHY ────────────────────────────────────────────────────

const stack = [
  "STABLE DIFFUSION / COMFYUI",
  "MIDJOURNEY / RUNWAY GEN-3",
  "THREE.JS / WEBGL / GLSL",
  "PYTHON / AUTOMATION",
];

const achievements = [
  { value: "3+", label: "YEARS AI EXPLORATION" },
  { value: "50+", label: "PROJECTS SHIPPED" },
  { value: "∞", label: "NEURAL ITERATIONS" },
];

const expertise = [
  "CREATIVE DIRECTION",
  "NEURAL BRANDING",
  "INTERACTIVE 3D",
  "GENERATIVE SYSTEMS",
];

export const AboutSection = () => (
  <section id="about" className="py-24 px-6 md:px-12 border-b border-ink/10">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-number mb-4"
          >
            02 / PHILOSOPHY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-4xl md:text-5xl text-ink uppercase tracking-tight leading-tight mb-8"
          >
            ГДЕ МАШИННОЕ
            <br />
            ЗРЕНИЕ ВСТРЕЧАЕТ{" "}
            <span className="text-blue-accent">ВКУС</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-ink/60 text-base leading-relaxed mb-6"
          >
            Я не просто использую ИИ-инструменты — я исследую их пределы. Каждый
            сбой, артефакт, галлюцинация модели становится материалом для
            творчества. Мой подход: контролируемый хаос + жёсткая редактура.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-ink/60 text-base leading-relaxed"
          >
            Работаю на стыке generative art, UI/UX и 3D. Результат — визуальные
            системы, которые одновременно функциональны и провокационны.
          </motion.p>

          {/* Achievements */}
          <div className="flex gap-10 mt-12 pt-10 border-t border-ink/10">
            {achievements.map((a) => (
              <div key={a.label}>
                <div className="font-display font-bold text-3xl text-ink mb-1">{a.value}</div>
                <div className="label-mono text-[10px]">{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-10">
          {/* Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="label-mono mb-5">TECH STACK</p>
            <div className="space-y-0">
              {stack.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 py-3.5 border-b border-ink/8 group"
                >
                  <span className="font-mono text-xs text-blue-accent">→</span>
                  <span className="font-mono text-sm text-ink/70 group-hover:text-ink transition-colors uppercase tracking-wide">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="label-mono mb-5">EXPERTISE</p>
            <div className="flex flex-wrap gap-2">
              {expertise.map((e) => (
                <span key={e} className="tag hover:bg-blue-accent hover:text-bone hover:border-blue-accent transition-colors cursor-default">
                  {e}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Terminal badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-ink text-bone p-5 font-mono text-xs leading-6"
          >
            <p className="text-blue-accent mb-1">$ neural_interface --version</p>
            <p className="text-gray-mid">NEURAL_INTERFACE_V4.2</p>
            <p className="text-gray-mid">STATUS: <span className="text-green-400">OPERATIONAL</span></p>
            <p className="text-gray-mid mt-1">CREATIVITY_CORES: <span className="text-blue-accent">∞</span></p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);


// ─── CONTACT ───────────────────────────────────────────────────────────────

const socials = [
  { icon: Twitter, label: "TWITTER", href: "#" },
  { icon: Github, label: "GITHUB", href: "#" },
  { icon: Linkedin, label: "LINKEDIN", href: "#" },
  { icon: Send, label: "TELEGRAM", href: "#" },
];

export const ContactSection = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 border-b border-ink/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-number mb-4"
            >
              03 / CONTACT
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold text-4xl md:text-5xl text-ink uppercase tracking-tight leading-tight mb-8"
            >
              ОТКРЫТ К{" "}
              <span className="text-blue-accent">КОЛЛАБОРАЦИЯМ</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mb-10"
            >
              <a
                href="mailto:hello@aether.ai"
                className="flex items-center gap-3 group"
              >
                <Mail size={14} className="text-blue-accent shrink-0" />
                <span className="font-mono text-sm text-ink/60 group-hover:text-ink transition-colors">
                  hello@aether.ai
                </span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-blue-accent shrink-0" />
                <span className="font-mono text-xs text-ink/40 uppercase tracking-wider">
                  BASED IN DIGITAL DIMENSION
                </span>
              </div>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="label-mono text-green-600">AVAILABLE FOR FREELANCE & FULL-TIME</span>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="flex gap-4 flex-wrap"
            >
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 font-mono text-xs text-ink/40 hover:text-blue-accent transition-colors uppercase tracking-wider"
                >
                  <Icon size={13} />
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {[
              { id: "name", label: "ИМЯ", placeholder: "Иван Иванов", type: "text" },
              { id: "email", label: "EMAIL", placeholder: "ivan@company.io", type: "email" },
            ].map((field) => (
              <div key={field.id}>
                <label className="label-mono block mb-2" htmlFor={field.id}>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border border-ink/15 px-4 py-3 font-mono text-sm text-ink placeholder-ink/25 focus:outline-none focus:border-blue-accent transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="label-mono block mb-2" htmlFor="message">
                СООБЩЕНИЕ
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Расскажите о проекте..."
                className="w-full bg-transparent border border-ink/15 px-4 py-3 font-mono text-sm text-ink placeholder-ink/25 focus:outline-none focus:border-blue-accent transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-4 font-display font-semibold text-sm uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 ${
                sent
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-ink text-bone hover:bg-blue-accent"
              }`}
            >
              {sent ? "✓ ОТПРАВЛЕНО" : <>ОТПРАВИТЬ <ArrowRight size={14} /></>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

// ─── FOOTER ────────────────────────────────────────────────────────────────

export const Footer = () => (
  <footer className="py-8 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-display font-bold text-lg tracking-tight text-ink">AETHER.</span>
      <p className="label-mono text-[10px]">
        © {new Date().getFullYear()} AETHER PORTFOLIO. ALL RIGHTS RESERVED.
      </p>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-accent animate-pulse" />
        <span className="label-mono text-[10px] text-blue-accent">NEURAL_CORE_ACTIVE</span>
      </div>
    </div>
  </footer>
);
