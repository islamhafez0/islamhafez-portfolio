export const experiences: {
  title: string;
  company: string;
  period: string;
  description: string;
}[] = [
    {
      title: "Odoo Frontend Developer",
      company: "TaqaTechno",
      period: "October 2024 - Present",
      description:
        "As an Odoo Frontend Developer at TaqaTechno, I work on building full-stack web solutions tailored to our business needs using the Odoo ERP system. I develop custom modules and APIs with Python, and integrate them seamlessly into the frontend using OWL (Odoo Web Library), focusing on dynamic, server-rendered data and performance. I turn Figma designs into pixel-perfect Odoo themes, build fully custom websites, and continuously find creative solutions to improve our development flow. My role bridges the gap between frontend design and backend logic—ensuring everything fits naturally into the Odoo ecosystem while delivering a smooth user experience.",
    },
    {
      title: "Frontend Angular Developer",
      company: "TaqaTechno",
      period: "June 2024 - September 2024",
      description:
        "Worked on two enterprise-grade fintech applications as a contract side project, contributing to system upgrades and building multiple features from scratch. Developed core functionality including sponsored user management, device tracking, wallets and top-ups, and an SMS-based payment system with OTP verification and settlement management. Built and maintained modular Angular 17 applications using NgRx for state management, integrating 60+ RESTful APIs with robust error handling and data flow control. This work required independent ownership of large feature sets, managing complex application state across multiple modules, and delivering secure, production-ready fintech solutions.",
    },
    {
      title: "Frontend Developer Freelancer",
      company: "Self-Employed",
      period: "August 2024 - Present",
      description:
        "As a freelance Frontend Developer, I've had the chance to work on a variety of exciting projects—from building custom WordPress themes completely from scratch to developing advanced full-stack React applications. One of the projects I'm proudest of is a secure quiz app with OTP-protected access and session validation. I've also worked on e-commerce frontends, personal portfolios, and UI-heavy applications using tools like React.js, Next.js, and Firebase. Each project helped me grow—not just in technical skill, but also in understanding how to build clean, responsive, and user-centered interfaces that perform well and feel great to use. I enjoy translating ideas into real, usable products that clients and users love.",
    },
    {
      title: "Frontend React Developer Intern",
      company: "Code Alpha",
      period: "April 2024 - August 2024",
      description:
        "Contributed to the development of responsive, user-friendly web applications using React.js, HTML, and CSS. Worked closely with UI/UX designers to turn wireframes into clean, interactive components. Focused on performance optimization, code reusability, and accessibility best practices. Integrated RESTful APIs and GraphQL endpoints to ensure seamless data flow. Used React Developer Tools and modern debugging practices to identify and fix issues efficiently. Gained valuable experience collaborating remotely within an agile team.",
    },
  ];

export const projects: {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string | null;
  demo: string | null;
}[] = [
    {
      id: 1,
      title: "Relief Center",
      description:
        "Disaster management platform that aggregates real-time data from USGS, NASA, and GDACS, with interactive 3D globe visualization, automated subscriber alerts, OTP-secured authentication, and CRM-integrated relief coordination.",
      tech: ["Odoo 19", "Python", "OWL", "PostgreSQL", "MapTiler SDK", "SCSS"],
      image: "/images/projects/relief_center.png",
      github: null,
      demo: "https://reliefcenter.com/",
    },
    {
      id: 2,
      title: "Emdad",
      description:
        "Humanitarian aid eCommerce platform with advanced product filtering, PWA support, multi-website management, B2B pricing modes, quote request system, and RTL language support across 7 custom Odoo modules.",
      tech: ["Odoo 17", "Python", "OWL", "SCSS", "JavaScript", "PostgreSQL"],
      image: "/images/projects/emdad.png",
      github: null,
      demo: "https://emdadexpress.com/",
    },
    {
      id: 3,
      title: "RAG Chatbot",
      description:
        "Personal assistant AI using RAG architecture. Consumes YAML career data, produces embeddings using Google Gemini, looks up context from Astra DB vector store, and streams responses using Groq's Llama 3.3 with source attribution.",
      tech: ["Next.js", "TypeScript", "Groq AI", "Google Gemini", "Astra DB", "Tailwind CSS"],
      image: "/images/projects/ragchatbot.png",
      github: "https://github.com/islamhafez0/rag-chatbot",
      demo: null,
    },
    {
      id: 4,
      title: "E-commerce Website",
      description:
        "Modern e-commerce platform with shopping cart, Stripe payment integration, real-time inventory management, and CMS-powered product catalog using Sanity.",
      tech: ["Next.js", "TypeScript", "Stripe", "Sanity CMS", "Tailwind CSS"],
      image: "/images/projects/shopper.png",
      github: "https://github.com/islamhafez0/nextjs-commerce",
      demo: "https://ecommerce-website-five-flax.vercel.app/",
    },
    {
      id: 5,
      title: "FluxGen AI",
      description:
        "High-fidelity image generation platform powered by FLUX.1 [dev] model. Features a dynamic creation canvas, real-time prompt enhancement, and multi-aspect ratio support for professional AI art generation.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Replicate API", "Framer Motion"],
      image: "/images/projects/fluxgenai.png",
      github: "https://github.com/islamhafez0/flux-gen-ai",
      demo: null,
    },
  ];

export const skills = [
  "HTML5",
  "CSS3",
  "JavaScript (ES6+)",
  "TypeScript",
  "React.js",
  "Next.js",

  "Tailwind CSS",
  "CSS Modules",
  "Sass/SCSS",
  "Framer Motion",

  "Redux",
  "Context API",
  "React Query",

  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "REST APIs",

  "Odoo ERP",
  "OWL (Odoo Web Library)",
  "Qweb",
  "Python",

  "Git & GitHub",
  "Vite",
  "Webpack",
  "Three.js",
  "React Three Fiber",
  "Axios",

  "Responsive Design",
  "SEO Optimization",
  "Performance Optimization",
  "Accessibility (a11y)",
  "Agile Methodologies",
];
