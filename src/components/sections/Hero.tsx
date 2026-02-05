import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Mouse Parallax & Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax for corner flashes & light trails
  const offset1X = useTransform(smoothMouseX, [-500, 500], [40, -40]);
  const offset1Y = useTransform(smoothMouseY, [-500, 500], [40, -40]);

  const offset2X = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const offset2Y = useTransform(smoothMouseY, [-500, 500], [-30, 30]);

  // Subtle 3D Tilt for the main content
  const tiltX = useTransform(smoothMouseY, [-500, 500], [4, -4]);
  const tiltY = useTransform(smoothMouseX, [-500, 500], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = clientX - innerWidth / 2;
    const y = clientY - innerHeight / 2;
    mouseX.set(x);
    mouseY.set(y);

    // Set CSS variables for the spotlight mask
    const rect = e.currentTarget.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    (e.currentTarget as HTMLElement).style.setProperty('--mouse-x', `${px}px`);
    (e.currentTarget as HTMLElement).style.setProperty('--mouse-y', `${py}px`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020202] selection:bg-white selection:text-black font-outfit px-6 pt-20"
      id="home"
    >
      {/* Spotlight Reveal Layer */}
      <div className="absolute inset-0 z-[1] pointer-events-none spotlight-reveal transition-opacity duration-500" />

      {/* Interactive Background Elements (Flashes & Trails) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Corner Flashes */}
        <motion.div
          style={{ x: offset1X, y: offset1Y }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-radial-indigo blur-[100px] opacity-60 animate-pulse-slow"
        />
        <motion.div
          style={{ x: offset2X, y: offset1Y }}
          className="absolute -top-1/4 -right-1/4 w-full h-full bg-radial-purple blur-[100px] opacity-60 animate-pulse-slow"
        />

        {/* Fill Glow for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-indigo/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Light Trails (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M -100 800 Q 400 700 1100 200"
            stroke="rgb(var(--brand-indigo))"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.5 } : {}}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{ filter: "blur(6px)", x: offset1X, y: offset1Y }}
          />
          <motion.path
            d="M -100 900 Q 500 850 1100 400"
            stroke="rgb(var(--brand-purple))"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
            style={{ filter: "blur(10px)", x: offset2X, y: offset2Y }}
          />
        </svg>

      </div>

      <motion.div
        style={{ perspective: 1000 }}
        className="relative z-10 w-full flex flex-col items-center"
      >
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-[7.5rem] font-bold text-white leading-[0.85] tracking-tight mb-8"
          >
            Engineering <span className="bg-gradient-text">Human</span>, <br />
            Impact
            <motion.div
              className="relative inline-flex items-center justify-center mt-6 group ml-4"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute -inset-4 bg-brand-indigo/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.span
                initial={{ color: "#fff" }}
                animate={inView ? { color: "#000" } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="relative z-10 px-6 py-2 italic font-light block whitespace-nowrap tracking-tight"
              >
                Islam Hafez.
              </motion.span>
              <motion.span
                initial={{ scaleX: 0, rotate: 0 }}
                animate={inView ? { scaleX: 1, rotate: 0 } : {}}
                transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-white rounded-2xl tag-shadow origin-center"
              />
            </motion.div>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-xl font-light leading-relaxed mb-12 px-4"
          >
            Frontend Architect & Odoo Specialist. Crafting high-performance systems and cinematic user experiences where technical precision meets visual storytelling.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 bg-white text-black font-black rounded-2xl flex items-center gap-4 transition-all overflow-hidden shadow-2xl"
            >
              <span className="relative z-10 tracking-[0.1em]">BROWSE WORK</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-brand-indigo/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.a>

            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/islamhafez0" },
                { icon: Linkedin, href: "https://linkedin.com/in/islam-hafez-103902246/" },
                { icon: Mail, href: "mailto:islamhafez806@gmail.com" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -8, scale: 1.1, color: "#fff" }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-center text-gray-400 hover:border-brand-indigo/50 transition-all shadow-xl"
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
