import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "./Logo";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ["none", "0 8px 32px rgba(0, 0, 0, 0.2)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      style={{
        backgroundColor: headerBackground,
        boxShadow: headerShadow,
        backdropFilter: "blur(10px)",
      }}
      className="fixed w-full z-50 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 w-full">
          <Logo />
          <div className="hidden md:flex items-center space-x-8">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label={`${isMenuOpen ? "Close" : "Menu"}`}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/95 backdrop-blur-sm"
        >
          <div className="px-4 pt-2 pb-4 space-y-4">
            {["About", "Projects", "Skills", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-white transition-colors"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
