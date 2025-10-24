import { motion } from "framer-motion";
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { experiences } from "../../utils/constants";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export default function Experience() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(index)) {
      newExpandedItems.delete(index);
    } else {
      newExpandedItems.add(index);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <div className="px-4 py-20 bg-gray-900/50 backdrop-blur-sm" id="experience">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView && { opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
        <p className="text-gray-400">My professional journey</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {experiences.map((exp, index) => (
          <motion.div
            ref={ref}
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={inView && { opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="mb-12 relative pl-8"
          >
            <div className="absolute left-0 top-0">
              <Briefcase className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/20">
              <h3 className="text-xl font-semibold text-white mb-2">
                {exp.title}
              </h3>
              <p className="text-indigo-400 mb-2">{exp.company}</p>
              <p className="text-gray-500 text-sm mb-4">{exp.period}</p>
              <div className="text-gray-400">
                <p className={expandedItems.has(index) ? "" : "line-clamp-4"}>
                  {exp.description}
                </p>
                {exp.description.length > 200 && (
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="flex items-center gap-1 mt-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
                  >
                    {expandedItems.has(index) ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        See more
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
