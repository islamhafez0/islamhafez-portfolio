export const experiences: {
  title: string;
  company: string;
  period: string;
  description: string;
}[] = [
  {
    title: "Odoo Frontend Developer",
    company: "Pearl Pixels",
    period: "October 2024 - Present",
    description:
      "As an Odoo Frontend Developer at Pearl Pixels, I work on building full-stack web solutions tailored to our business needs using the Odoo ERP system. I develop custom modules and APIs with Python, and integrate them seamlessly into the frontend using OWL (Odoo Web Library), focusing on dynamic, server-rendered data and performance. I turn Figma designs into pixel-perfect Odoo themes, build fully custom websites, and continuously find creative solutions to improve our development flow. My role bridges the gap between frontend design and backend logic—ensuring everything fits naturally into the Odoo ecosystem while delivering a smooth user experience.",
  },
  // {
  //   title: "Frontend Angular Developer",
  //   company: "Taqat for Technology - Pearl Pixels",
  //   period: "June 2024 - September 2024",
  //   description:
  //     "Worked on two enterprise fintech applications as a contract side project, making 88 commits and contributing over 29,000 lines of Angular code through system updates and building new features from scratch. Developed key features including a sponsored user management system, device tracking capabilities, wallet and top-up functionality, and an SMS payment system with OTP verification and settlement management. Built new modules using Angular 17 with NgRx for state management, integrated over 60 RESTful APIs across both applications, and implemented comprehensive error handling and data flow management. This experience strengthened my ability to work independently on large-scale applications, manage complex state across multiple modules, and deliver production-ready fintech solutions.",
  // },
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
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
}[] = [
  {
    title: "YouTube Clone",
    description:
      "A feature-rich YouTube clone with video playback, dynamic feed, and responsive UI. Built custom video player with advanced controls and implemented infinite scroll for seamless browsing.",
    tech: ["React", "TypeScript", "YouTube API", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/youtube-clone",
    demo: "https://islamhafez-youtubeclone.vercel.app/",
  },
  {
    title: "Web Crawler",
    description:
      "Python-based web crawler for automated data extraction and analysis. Features intelligent scraping with rate limiting, data cleaning, and RESTful API for accessing scraped content.",
    tech: ["Python", "Scrapy", "Flask", "Books to scrap"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/web-crawler",
    demo: "https://books-to-scrap.vercel.app/books",
  },
  {
    title: "GitHub Viewer",
    description:
      "Advanced GitHub profile and repository explorer with search, filtering, and detailed analytics. Features user profile cards, repository statistics, and language breakdowns.",
    tech: ["React", "TypeScript", "GitHub API v3", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/github-finder",
    demo: "https://islamhafez-githubbrowser.vercel.app/",
  },
  {
    title: "Blog Platform",
    description:
      "Full-stack blog platform with Firebase authentication, rich text editing, and real-time updates. Features user profiles, comment system, and post categorization.",
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/blog-post-platform",
    demo: "https://blog-post-d18a6.web.app/",
  },
  {
    title: "Gemini Clone",
    description:
      "AI-powered chat interface replicating Google's Gemini with conversation history, multi-turn dialogues, and Firebase authentication. Features markdown rendering and code syntax highlighting.",
    tech: ["React", "Gemini AI API", "Firebase Auth", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/gemini-clone",
    demo: "https://gemini-clone-9c740.web.app/",
  },
  {
    title: "E-commerce Website",
    description:
      "Modern e-commerce platform with shopping cart, Stripe payment integration, real-time inventory management, and CMS-powered product catalog using Sanity.",
    tech: ["Next.js", "TypeScript", "Stripe", "Sanity CMS", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/nextjs-commerce",
    demo: "https://ecommerce-website-five-flax.vercel.app/",
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
