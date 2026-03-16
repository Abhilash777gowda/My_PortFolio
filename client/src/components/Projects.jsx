import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { projects } from '../constants/projects';

const Projects = () => {
  const borderColors = {
    blue: "hover:border-[#4285F4]",
    red: "hover:border-[#DB4437]",
    yellow: "hover:border-[#F4B400]",
    green: "hover:border-[#0F9D58]"
  };
  const iconColors = {
    blue: "text-[#4285F4]",
    red: "text-[#DB4437]",
    yellow: "text-[#F4B400]",
    green: "text-[#0F9D58]"
  };

  return (
    <section id="projects" className="min-h-screen py-20 px-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-12 border-b-4 border-[#4285F4] pb-2 text-gray-900 dark:text-white">
        <span className="text-[#4285F4]">Pro</span>
        <span className="text-[#DB4437]">je</span>
        <span className="text-[#F4B400]">cts</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full px-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-white dark:bg-[#18181b] border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 group shadow-lg flex flex-col ${borderColors[project.color]}`}
          >
            {/* Project Header / Image */}
            <div className={`h-48 bg-gray-100 dark:bg-zinc-900 relative flex items-center justify-center overflow-hidden`}>
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`${project.image ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                <Code2 size={48} className={`${iconColors[project.color]} opacity-80 group-hover:scale-110 transition-transform duration-500`} />
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-xs font-bold ${iconColors[project.color]} uppercase tracking-wider mb-1 block`}>
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                    {project.title}
                  </h3>
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold rounded-full border border-gray-200 dark:border-zinc-700">
                  {project.year}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              <div className="mt-auto space-y-4">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-50 dark:bg-zinc-900 text-xs font-medium text-gray-600 dark:text-gray-400 rounded-md border border-gray-200 dark:border-zinc-700">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#1a1a1a] dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    <Github size={16} /> Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <ExternalLink size={16} /> Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
