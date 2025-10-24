import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
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

  useEffect(() => {
    const sections = ["about", "experience", "projects", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    const handleScrollPosition = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        if (aboutTop > window.innerHeight / 2) {
          setActiveSection("");
        }
      }
    };

    window.addEventListener("scroll", handleScrollPosition);
    handleScrollPosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollPosition);
    };
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
          <div className="hidden md:flex items-center space-x-6">
            {["About", "Experience", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors ${
                  activeSection === item.toLowerCase()
                    ? "text-white font-medium scale-110 transition-all duration-100"
                    : "text-gray-300 hover:text-white"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-3">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={`${isMenuOpen ? "Close" : "Menu"}`}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
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
            {["About", "Experience", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block transition-colors ${
                  activeSection === item.toLowerCase()
                    ? "text-white font-semibold border-l-2 border-indigo-500 pl-2"
                    : "text-gray-300 hover:text-white"
                }`}
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
