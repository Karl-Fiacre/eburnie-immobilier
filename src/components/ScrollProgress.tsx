import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barre de progression de scroll fluide (top of page).
 * Effet premium qui suit la lecture de la page.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-secondary via-accent to-secondary shadow-[0_0_12px_hsl(var(--secondary)/0.6)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
