import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Download,
  MessageSquare,
  Code2,
  Layers,
  Palette,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Suspense, lazy } from "react";

const AnimatedCanvas = lazy(() => import("../3d/AnimatedCanvas"));

function Hero() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingIcons = [
    {
      Icon: Code2,
      delay: 0,
      x: -140,
      y: -140,
      color: "#818cf8",
      mobileX: -80,
      mobileY: -80,
    },
    {
      Icon: Layers,
      delay: 0.3,
      x: 140,
      y: -140,
      color: "#818cf8",
      mobileX: 80,
      mobileY: -80,
    },
    {
      Icon: Palette,
      delay: 0.6,
      x: -140,
      y: 140,
      color: "#818cf8",
      mobileX: -80,
      mobileY: 80,
    },
    {
      Icon: Terminal,
      delay: 0.9,
      x: 140,
      y: 140,
      color: "#818cf8",
      mobileX: 80,
      mobileY: 80,
    },
  ];

  return (
    <motion.section
      ref={heroRef}
      initial="hidden"
      animate={heroInView ? "visible" : "hidden"}
      variants={container}
      className="px-4 pt-10 md:pt-20 pb-20 md:pb-32 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-between">
        <div className="mt-28 text-center md:text-left">
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-text"
            variants={child}
          >
            Islam Hafez
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl mt-6 text-gray-300 max-w-2xl"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { delay: 0.2 } },
            }}
          >
            Front-end developer crafting beautiful, responsive, and
            user-friendly web experiences.
          </motion.p>
          <motion.div
            className="flex justify-center md:justify-start gap-4 mt-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.4 } },
            }}
          >
            <motion.a
              href="https://github.com/islamhafez0"
              rel="noopener noreferrer"
              aria-label="Github profile"
              title="Islam Hafez's github"
              target="_blank"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/islam-hafez-103902246/"
              target="_blank"
              rel="noopener noreferrer"
              title="Islam Hafez's linkedin"
              aria-label="Linkendin profile"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="mailto:islamhafez806@gmail.com"
              title="Send email to Islam Hafez"
              aria-label="Send email to Islam Hafez"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-6 h-6" />
            </motion.a>
            <motion.a
              download
              href="/Islam_Hafez_Frontend_Developer_Resume.pdf"
              title="Download Islam Hafez's resume"
              aria-label="Islam Hafez's resume"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-6 h-6" />
            </motion.a>
          </motion.div>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center mt-6 w-full md:w-52 justify-center gap-4 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get In Touch
            <MessageSquare className="w-5 h-5" />
          </motion.a>
        </div>
        <div className="relative h-[420px] md:h-[500px] lg:h-[600px]">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 bg-indigo-600/20 rounded-full animate-pulse" />
              </div>
            }
          >
            <AnimatedCanvas />
          </Suspense>

          <div className="absolute inset-0 pointer-events-none">
            {floatingIcons.map(
              ({ Icon, delay, x, y, color, mobileX, mobileY }, index) => (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2 bg-gray-900/90 backdrop-blur-md p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl border border-gray-700/50 shadow-2xl"
                  style={{
                    boxShadow: `0 0 20px ${color}30, 0 0 40px ${color}15`,
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: [0, 360],
                    x: [
                      typeof window !== "undefined" && window.innerWidth < 1024
                        ? mobileX
                        : x,
                      typeof window !== "undefined" && window.innerWidth < 1024
                        ? mobileX + 2
                        : x + 3,
                      typeof window !== "undefined" && window.innerWidth < 1024
                        ? mobileX - 2
                        : x - 3,
                      typeof window !== "undefined" && window.innerWidth < 1024
                        ? mobileX
                        : x,
                    ],
                    y: [
                      typeof window !== "undefined" && window.innerWidth < 1024
                        ? mobileY
                        : y,
                      typeof window !== "undefined" && window.innerWidth < 1024
                        ? mobileY - 2
                        : y - 3,
                      typeof window !== "undefined" && window.innerWidth < 1024
                        ? mobileY + 2
                        : y + 3,
                      typeof window !== "undefined" && window.innerWidth < 1024
                        ? mobileY
                        : y,
                    ],
                  }}
                  transition={{
                    opacity: { delay: delay + 0.8, duration: 0.5 },
                    scale: { delay: delay + 0.8, duration: 0.5 },
                    x: {
                      delay: delay + 1.3,
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    y: {
                      delay: delay + 1.3,
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      delay: delay + 2,
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <motion.a
          className="flex"
          href="#about"
          aria-label="Scroll to the about section"
          title="Scroll to about section"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-8 h-8 mx-auto text-gray-400 hover:text-white" />
        </motion.a>
      </div>
    </motion.section>
  );
}
export default Hero;
