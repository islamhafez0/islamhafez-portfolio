import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfigInner = { damping: 28, stiffness: 500 };
  const springConfigOuter = { damping: 20, stiffness: 250 };

  const cursorX = useSpring(mouseX, springConfigInner);
  const cursorY = useSpring(mouseY, springConfigInner);
  const ringX = useSpring(mouseX, springConfigOuter);
  const ringY = useSpring(mouseY, springConfigOuter);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-blue-500/50 pointer-events-none z-50 mix-blend-screen will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-purple-500/50 pointer-events-none z-50 will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};

export default CustomCursor;
