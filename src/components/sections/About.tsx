import { useEffect, useRef, useState } from "react";
import { motion, animate, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code2,
  Gauge,
  GitBranch,
  Rocket,
  Trophy,
  ShieldCheck,
  Wrench,
  Sparkles,
  Calendar,
  FolderGit2,
  Layers,
  Building2,
  Layout,
  Database,
  Server,
  Cloud,
  Cpu,
} from "lucide-react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface Skill {
  name: string;
  level: number;
  icon: IconType;
  hint: string;
}

interface Achievement {
  label: string;
  value: string;
  desc?: string;
  icon: IconType;
}

interface Highlight {
  title: string;
  period: string;
  description: string;
  icon: IconType;
}

const skills: Skill[] = [
  {
    name: "React.js",
    level: 95,
    icon: Code2,
    hint: "Hooks, Context, Performance",
  },
  {
    name: "TypeScript",
    level: 90,
    icon: Gauge,
    hint: "Type-safe, Scalable Code",
  },
  { name: "Next.js", level: 88, icon: Rocket, hint: "SSR, SSG, App Router" },
  {
    name: "Tailwind CSS",
    level: 94,
    icon: Layout,
    hint: "Responsive, Utility-first",
  },
  { name: "Odoo & OWL", level: 85, icon: Server, hint: "ERP, Custom Modules" },
  { name: "Node.js", level: 80, icon: Database, hint: "Express, REST APIs" },
  {
    name: "UI Engineering",
    level: 94,
    icon: Gauge,
    hint: "shadcn/ui, a11y, theming",
  },
  {
    name: "Cloud & DevOps",
    level: 78,
    icon: Cloud,
    hint: "Vercel, AWS, CI/CD",
  },
  {
    name: "Performance",
    level: 90,
    icon: Cpu,
    hint: "LCP, CLS, TBT, RUM, performance budgets",
  },
];

const achievements: Achievement[] = [
  {
    label: "Years Experience",
    value: "2+",
    desc: "Professional development",
    icon: Calendar,
  },
  {
    label: "Projects Delivered",
    value: "15+",
    desc: "Web apps & enterprise solutions",
    icon: FolderGit2,
  },
  {
    label: "Technologies",
    value: "25+",
    desc: "Frontend & backend stack",
    icon: Layers,
  },
  {
    label: "Companies",
    value: "3",
    desc: "Including enterprise clients",
    icon: Building2,
  },
];

// const highlights: Highlight[] = [
//   {
//     title: "Odoo Frontend Developer",
//     period: "Oct 2024 — Present",
//     description:
//       "Building full-stack web solutions using Odoo ERP, developing custom modules with Python, and creating pixel-perfect themes with OWL (Odoo Web Library) for dynamic, server-rendered applications.",
//     icon: Wrench,
//   },
//   {
//     title: "Frontend Angular Developer",
//     period: "Jun — Sep 2024",
//     description:
//       "Delivered large-scale Angular 17 features across two enterprise fintech platforms, including wallets, top-ups, and SMS-based payments with OTP verification, integrating 60+ RESTful APIs with NgRx-managed state.",
//     icon: Rocket,
//   },
//   {
//     title: "Frontend React Developer Intern",
//     period: "Apr — Aug 2024",
//     description:
//       "Developed responsive web applications using React.js, collaborated with UI/UX designers on component development, and focused on performance optimization and accessibility best practices.",
//     icon: GitBranch,
//   },
// ];

const About = () => {
  const shouldReduce = useReducedMotion();
  const yearsRef = useRef<HTMLDivElement | null>(null);
  const [yearsInViewRef, yearsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const [yearsCount, setYearsCount] = useState(0);

  // Combine refs
  const setYearsRefs = (node: HTMLDivElement | null) => {
    yearsRef.current = node;
    yearsInViewRef(node);
  };

  useEffect(() => {
    if (!yearsInView) return;
    if (shouldReduce) {
      setYearsCount(2);
      return;
    }
    const controls = animate(0, 2, {
      duration: 1.4,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setYearsCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [yearsInView, shouldReduce]);

  return (
    <section aria-labelledby="about-heading" className="py-20" id="about">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <HeaderBlock />

        {/* Professional Story */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8"
          role="region"
          aria-label="Professional story and experience"
        >
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-3">
                Professional Story
              </h3>
              <p className="text-base leading-relaxed text-gray-300">
                I'm a Frontend Developer and Odoo Developer passionate about
                building dynamic, responsive web applications that deliver
                exceptional user experiences. With expertise in React.js,{" "}
                TypeScript, and Next.js, I combine strong technical fundamentals
                with a results-oriented approach to create high-quality user
                interfaces that improve UX and drive user engagement.
              </p>

              <ul className="mt-4 sm:mt-6 grid gap-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <Sparkles
                    className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Delivering pixel-perfect, responsive designs with modern CSS
                    frameworks and UI libraries.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck
                    className="w-4 h-4 text-green-400 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Writing clean, maintainable code with TypeScript for
                    type-safe, scalable applications.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Gauge
                    className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Optimizing performance with lazy loading, code splitting,
                    and efficient state management.
                  </span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <div
                ref={setYearsRefs}
                className="relative overflow-hidden rounded-lg border border-gray-700/50 bg-gray-800/80 p-5 sm:p-6"
              >
                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="flex items-end gap-3"
                >
                  <div className="flex items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 w-10 h-10">
                    <Trophy className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="leading-none">
                    <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                      {yearsCount}
                      <span className="text-indigo-400">+</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      Years of experience
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-indigo-500/40 via-purple-500/60 to-pink-500/50" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {achievements.map((a, i) => (
                  <MetricChip
                    key={a.label + i}
                    label={a.label}
                    value={a.value}
                    icon={a.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <SkillsGrid skills={skills} />

        {/* Experience Highlights */}
        {/* <HighlightsList highlights={highlights} /> */}
      </div>
    </section>
  );
};

function HeaderBlock() {
  const shouldReduce = useReducedMotion();
  return (
    <div className="relative">
      <motion.h2
        id="about-heading"
        initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
        whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: shouldReduce ? 0 : 0.05,
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white"
      >
        About Me
      </motion.h2>
    </div>
  );
}

function MetricChip({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: IconType;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-gray-700/50 bg-gray-800/70 p-3 transition-colors hover:border-indigo-500/50"
      role="figure"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-indigo-600/20 text-indigo-400 p-1.5">
          <Icon className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <div className="text-sm font-medium text-white">{value}</div>
          <div className="text-xs text-gray-400">{label}</div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
    </div>
  );
}

function SkillsGrid({ skills }: { skills: Skill[] }) {
  const shouldReduce = useReducedMotion();
  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
          Core Skills
        </h3>
      </div>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name + idx}
            initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{
              delay: shouldReduce ? 0 : idx * 0.04,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative grid place-items-center rounded-lg border border-gray-700/50 bg-gray-800/80 w-10 h-10 text-indigo-400">
            <Icon className="w-5 h-5" aria-hidden="true" />
            <span className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div>
            <div className="font-medium text-white">{skill.name}</div>
            <div className="text-xs text-gray-400">{skill.hint}</div>
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-800/80 text-gray-300 text-xs border border-gray-700/50">
          {skill.level}%
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Proficiency</span>
          <span className="text-gray-300">{skill.level}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-700/50 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-inset ring-transparent transition-shadow duration-300 group-hover:ring-1 group-hover:ring-indigo-500/20" />
    </div>
  );
}

// function HighlightsList({ highlights }: { highlights: Highlight[] }) {
//   const shouldReduce = useReducedMotion();
//   return (
//     <div className="w-full">
//       <div className="mb-4 sm:mb-6">
//         <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
//           Experience Highlights
//         </h3>
//       </div>
//       <div className="space-y-4">
//         {highlights.map((h, i) => {
//           const Icon = h.icon;
//           return (
//             <motion.div
//               key={h.title + i}
//               initial={shouldReduce ? undefined : { opacity: 0, y: 10 }}
//               whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-20% 0px" }}
//               transition={{
//                 delay: shouldReduce ? 0 : i * 0.04,
//                 duration: 0.45,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="grid gap-4 rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 sm:grid-cols-[auto_1fr_auto] hover:border-indigo-500/50 transition-colors"
//               role="article"
//               aria-labelledby={`highlight-${i}-title`}
//             >
//               <div className="flex items-center">
//                 <div className="grid w-10 h-10 place-items-center rounded-lg bg-gray-800/80 border border-gray-700/50 text-indigo-400">
//                   <Icon className="w-5 h-5" aria-hidden="true" />
//                 </div>
//               </div>
//               <div>
//                 <div
//                   id={`highlight-${i}-title`}
//                   className="font-medium text-white"
//                 >
//                   {h.title}
//                 </div>
//                 <div className="mt-1 text-sm text-gray-300 leading-relaxed">
//                   {h.description}
//                 </div>
//               </div>
//               <div className="flex items-start justify-end sm:justify-start">
//                 <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-800/80 text-gray-300 text-xs border border-gray-700/50">
//                   {h.period}
//                 </span>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

export default About;
