import { motion } from "framer-motion";

const GlassCard = ({
  children,
  className = "",
  hover = true,
  glow = false,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`
        bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
        ${hover ? "hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer" : ""}
        ${glow ? "shadow-[0_0_30px_rgba(0,242,254,0.1)] hover:shadow-[0_0_40px_rgba(0,242,254,0.2)]" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
