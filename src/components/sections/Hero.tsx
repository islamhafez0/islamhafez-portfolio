import { Suspense } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Download,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import { Grid } from "@react-three/drei";

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

  return (
    <motion.section
      ref={heroRef}
      initial="hidden"
      animate={heroInView ? "visible" : "hidden"}
      variants={container}
      className="px-4 pt-10 md:pt-20 pb-20 md:pb-32 max-w-6xl mx-auto"
    >
      <div className="absolute inset-0 z-[1] bg-black">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ preserveDrawingBuffer: true, antialias: false }}
            frameloop="always"
          >
            <color attach="background" args={["#000000"]} />
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 5]} intensity={1} color="#00ffff" />
            <Grid
              position={[0, -2, 0]}
              args={[20, 20]}
              cellSize={0.5}
              cellThickness={0.5}
              cellColor="#a855f7"
              sectionSize={2}
              sectionThickness={1}
              sectionColor="#6366f1"
              fadeDistance={20}
              fadeStrength={1}
              infiniteGrid
            />
          </Canvas>
        </Suspense>
      </div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-between">
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
        {/* <div className="relative h-[420px] md:h-[500px] lg:h-[600px]"></div> */}
      </div>
      <div className="flex justify-center mt-16">
        <motion.a
          className="flex"
          href="#about"
          aria-label="Scroll to the about section"
          title="Scroll to about section"
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
