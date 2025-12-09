import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, icon, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-seq-jade/50 tracking-wide font-mono";
  
  const variants = {
    primary: "bg-seq-text text-seq-ink hover:bg-white border border-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    secondary: "bg-transparent text-seq-text border border-seq-border hover:border-seq-jade/50 hover:text-seq-jade",
    ghost: "text-seq-subtext hover:text-seq-text hover:bg-seq-panel"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-1 opacity-70">{icon}</span>}
    </motion.button>
  );
};

export default Button;