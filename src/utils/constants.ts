export const experiences: {
  title: string;
  company: string;
  period: string;
  description: string;
}[] = [
  {
    title: "Frontend Developer Internship",
    company: "CodeAlpha Company",
    period: "APRIL 2024 – AUGUST 2024",
    description:
      "Developed user-friendly web applications using React.js, focusing on reusable components and performance optimization.",
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
      "A feature-rich YouTube clone with video playback, feed, and beautiful ui",
    tech: ["React", "TypeScript", "YouTube API", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/youtube-clone",
    demo: "https://islamhafez-youtubeclone.vercel.app/",
  },
  {
    title: "Web Crawler",
    description: "Python-based web crawler for data extraction and analysis.",
    tech: ["Python", "Scrapy", "Flask", "Books to scrap"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/web-crawler",
    demo: "https://books-to-scrap.vercel.app/books",
  },
  {
    title: "GitHub Viewer",
    description:
      "GitHub profile and repository explorer using GitHub REST API.",
    tech: ["React", "Typescript", "GitHub API v3"],
    image:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/github-finder",
    demo: "https://islamhafez-githubbrowser.vercel.app/",
  },
  {
    title: "Blog Platform",
    description:
      "Full-stack blog platform with authentication and rich text editing.",
    tech: ["React", "TypeScript", "Firebase", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/blog-post-platform",
    demo: "https://blog-post-d18a6.web.app/",
  },
  {
    title: "Gemini Clone",
    description:
      "A clone of Google's Gemini AI interface with chat functionality.",
    tech: ["React", "AI Integration", "Generative Ai", "Firebase Auth"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/gemini-clone",
    demo: "https://gemini-clone-9c740.web.app/",
  },
  {
    title: "E-commerce Website",
    description:
      "E-commerce platform with cart, payment, and real-time inventory.",
    tech: ["Next js", "TypeScript", "Stripe", "Sanity"],
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/islamhafez0/nextjs-commerce",
    demo: "https://ecommerce-website-five-flax.vercel.app/",
  },
];

export const testimonials: {
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}[] = [
  {
    name: "Sarah Johnson",
    role: "Project Manager",
    company: "TechCorp",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
    text: "Eslam is an exceptional frontend developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
  },
  {
    name: "Michael Chen",
    role: "Senior Developer",
    company: "WebSolutions",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
    text: "Working with Eslam was a great experience. His expertise in React and modern web technologies helped us deliver our project ahead of schedule.",
  },
  {
    name: "Emma Davis",
    role: "UI/UX Designer",
    company: "DesignHub",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
    text: "Eslam has an excellent eye for design implementation. He perfectly translated our designs into responsive, pixel-perfect websites.",
  },
];
