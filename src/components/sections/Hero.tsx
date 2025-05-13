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
const Hero = () => {
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
          <>
            {" "}
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
                href="mailto:Islamhafez044@gmail.com"
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
          </>
        </div>
        <motion.div
          className="relative h-auto lg:h-[500px] lg:block mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="absolute inset-0 z-10" />
          <img
            src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6757e1e6a347d3d02d3580bb_CHARACTERS%20FULL.webp"
            // src="https://sdmntprwestus2.oaiusercontent.com/files/00000000-3908-61f8-90ec-efa9b3c587a6/raw?se=2025-05-13T22%3A03%3A58Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=30ec2761-8f41-44db-b282-7a0f8809659b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-13T20%3A34%3A33Z&ske=2025-05-14T20%3A34%3A33Z&sks=b&skv=2024-08-04&sig=tP2hoPIPCfnt2OdwaaM7tW9H9so0ZBidFqCskYwYQ8o%3D"
            alt="3D Character Illustration"
            className="w-full h-full object-contain object-center animate-transform"
          />
        </motion.div>
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
};
export default Hero;
