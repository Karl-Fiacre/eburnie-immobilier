import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Curseur lumineux suivant la souris avec un délai elastic.
 * Désactivé sur appareils tactiles (pointer: coarse).
 */
const CursorGlow = () => {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handler = (e: MouseEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[500px] w-[500px] rounded-full opacity-60 mix-blend-screen md:block"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, hsl(var(--secondary) / 0.18) 0%, hsl(var(--accent) / 0.08) 35%, transparent 70%)",
        filter: "blur(40px)",
      }}
      aria-hidden="true"
    />
  );
};

export default CursorGlow;
