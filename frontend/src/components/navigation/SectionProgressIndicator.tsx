import { motion, useScroll, useSpring } from "framer-motion";

export function SectionProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-emerald"
      style={{ scaleX }}
    />
  );
}

