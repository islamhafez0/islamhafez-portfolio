import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.a
      href="#"
      tabIndex={0}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="relative font-bold text-2xl"
    >
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        E
      </span>
      <span className="absolute -top-1 left-2 text-blue-500/20">E</span>
      <span className="absolute -top-0.5 left-1 text-purple-500/20">E</span>
      <span className="ml-1">slam</span>
    </motion.a>
  );
};

export default Logo;
