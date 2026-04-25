import { motion } from "framer-motion";

const variants = {
  primary: "bg-gradient-to-r from-neon-blue to-neon-purple text-dark-900 hover:shadow-[0_0_24px_rgba(0,242,254,0.4)]",
  secondary: "glass border border-white/20 text-white hover:border-neon-blue/40 hover:bg-white/10",
  ghost: "text-white/70 hover:text-white hover:bg-white/5",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-full",
  md: "px-6 py-3 text-base rounded-full",
  lg: "px-8 py-4 text-lg rounded-full",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  ...props
}) => {
  const base = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={base}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={base}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
