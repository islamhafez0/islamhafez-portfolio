import { Github, Globe } from "lucide-react";
import { Project } from "../../types";

export const ProjectCardActions = ({ project }: { project: Project }) => (
  <div className="flex gap-4 mt-6">
    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10 group"
      >
        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>
    )}
    {project.demo && (
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 transition-colors font-medium text-sm group"
      >
        Preview{" "}
        <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
      </a>
    )}
  </div>
);
