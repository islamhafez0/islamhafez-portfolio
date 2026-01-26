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
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Grid,
  MeshDistortMaterial,
  OrbitControls,
  Sphere,
} from "@react-three/drei";

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
      <div className="absolute inset-0 z-[1] bg-black">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ preserveDrawingBuffer: true, antialias: false }}
          frameloop="always"
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 5]} intensity={1} color="#00ffff" />
          {/* <HologramTorus />
          <ScanLines /> */}
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
          <Environment preset="night" />
        </Canvas>
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
        <div className="relative h-[420px] md:h-[500px] lg:h-[600px]">
          <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.3}
              enablePan={false}
              enableRotate={false}
            />
          </Canvas>

          <div className="absolute inset-0 pointer-events-none">
            {floatingIcons.map(
              ({ Icon, delay, x, y, color, mobileX, mobileY }, index) => (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2 bg-gray-900/90 backdrop-blur-md p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl border border-gray-700/50 shadow-2xl"
                  style={{
                    boxShadow: `0 0 20px ${color}30, 0 0 40px ${color}15`,
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
              ),
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

const AnimatedSphere = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isTablet =
    typeof window !== "undefined" &&
    window.innerWidth >= 768 &&
    window.innerWidth < 1024;
  const scale = isMobile ? 2.2 : isTablet ? 2.4 : 2.5;

  return (
    <Sphere args={[1, 64, 128]} scale={scale}>
      <MeshDistortMaterial
        color="#6366f1"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.2}
      />
    </Sphere>
  );
};

// function HologramTorus() {
//   const torusRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (torusRef.current) {
//       torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
//       torusRef.current.rotation.y = state.clock.elapsedTime * 0.5;
//     }
//   });

//   return (
//     <group>
//       <mesh ref={torusRef}>
//         <torusGeometry args={[1.5, 0.5, 32, 100]} />
//         <MeshTransmissionMaterial
//           backside
//           samples={16}
//           resolution={512}
//           transmission={1}
//           roughness={0}
//           thickness={1}
//           ior={1.5}
//           chromaticAberration={1}
//           anisotropy={1}
//           color="#00ffff"
//           emissive="#00ffff"
//           emissiveIntensity={0.2}
//         />
//       </mesh>

//       {/* Orbital rings */}
//       {[...Array(3)].map((_, i) => (
//         <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}>
//           <torusGeometry args={[2 + i * 0.5, 0.02, 16, 100]} />
//           <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// function ScanLines() {
//   const ref = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (ref.current) {
//       ref.current.position.y = (state.clock.elapsedTime % 2) * 5 - 2.5;
//     }
//   });

//   return (
//     <mesh ref={ref}>
//       <planeGeometry args={[20, 0.1]} />
//       <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
//     </mesh>
//   );
// }
