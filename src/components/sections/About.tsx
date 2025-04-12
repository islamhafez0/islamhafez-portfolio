import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Laptop, Brain, Users } from "lucide-react";

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skills = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Frontend Development",
      description: "HTML, CSS, JavaScript, React.js, Next.js",
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Backend Knowledge",
      description: "Node.js, MongoDB, Express.js",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Problem Solving",
      description: "Data Structures, Algorithms, Performance Optimization",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Git, Agile Methodologies, Communication",
    },
  ];

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="py-20 " id="about">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">About Me</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-16 text-center">
            Frontend Developer skilled in developing dynamic and responsive web
            applications. Results-oriented approach delivering high-quality user
            interfaces to improve UX and provide user engagement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-indigo-600 mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-gray-300">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default About;
