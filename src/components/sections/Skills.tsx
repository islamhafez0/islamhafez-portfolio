import { motion } from "framer-motion";
export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "Next.js",
  "Firebase",
  "API Integration",
  "CSS Frameworks",
  "CSS Preprocessors",
  "Responsive Design",
  "Redux",
  "Context API",
  "TypeScript",
  "Jest",
  "Node.js",
  "MongoDB",
  "Express.js",
  "odoo",
  "Python",
  "PostgreSQL",
  "Qweb",
  "OWL",
  "Git",
  "SEO",
  "Performance Optimization",
  "Team Collaboration",
  "Time Management",
];
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Skills = () => {
  return (
    <section className="px-4 py-20 bg-gray-900/50 backdrop-blur-sm" id="skills">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-white mb-4">Skills</h2>
        <p className="text-gray-400">Craftsmanship</p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        viewport={{ once: true }}
        initial="hidden"
        whileInView="show"
        className="flex flex-wrap gap-3 justify-center max-w-6xl mx-auto px-0 lg:px-8"
      >
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            variants={skillVariants}
            tabIndex={0}
            className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-sm
                      transform hover:!scale-110 transition-all duration-300
                      hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
