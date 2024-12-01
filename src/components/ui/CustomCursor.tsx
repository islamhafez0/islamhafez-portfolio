import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const handleMouceMove = (e: MouseEvent) => {
      requestAnimationFrame(() => updateMousePosition(e));
    };
    window.addEventListener("mousemove", handleMouceMove);

    return () => {
      window.removeEventListener("mousemove", handleMouceMove);
    };
  }, [updateMousePosition]);

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-blue-500/50 pointer-events-none z-50 mix-blend-screen"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-purple-500/50 pointer-events-none z-50"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
