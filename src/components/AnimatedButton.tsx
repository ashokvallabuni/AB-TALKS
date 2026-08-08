import { motion } from 'framer-motion';

export default function AnimatedButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-3xl bg-[#11131A] px-5 py-3 font-semibold text-white shadow-button-glow ring-1 ring-white/10 transition duration-300 hover:ring-cyan-300/50 ${className}`}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
