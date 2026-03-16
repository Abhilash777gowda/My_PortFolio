import { motion } from 'framer-motion';
import { User, Cpu, Globe, Sparkles, Code2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-6 flex flex-col items-center justify-center relative bg-gray-50/50 dark:bg-black/20">
      <div className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="text-[#4285F4]">About</span> <span className="text-[#DB4437]">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Main Bio (Span 2) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#18181b] border border-gray-100 dark:border-zinc-800 shadow-xl flex flex-col justify-center hover:border-[#4285F4] transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-4 text-[#4285F4]">
              <User size={24} />
              <h3 className="text-xl font-bold">Who I Am</h3>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm a <span className="font-bold text-gray-900 dark:text-white">Full-Stack Developer</span> & <span className="font-bold text-gray-900 dark:text-white">Music Enthusiast</span> currently pursuing my MCA. I started coding to solve small problems and ended up building complex systems.
              <br /><br />
              My coding philosophy is simple: <span className="italic text-[#0F9D58]">"Make it work, make it right, make it fast."</span>
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#contact" className="px-6 py-2 bg-[#4285F4] text-white rounded-full font-medium hover:bg-[#3367D6] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg">
                <Sparkles size={18} /> Let's Talk
              </a>
            </div>
          </motion.div>

          {/* Card 2: Status/Location */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-3 rounded-3xl bg-white dark:bg-[#18181b] border border-gray-100 dark:border-zinc-800 flex flex-col shadow-lg hover:border-[#DB4437] transition-colors duration-300 relative group overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#EA4335]/5 to-[#FBBC05]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative h-[240px] w-full mb-4 rounded-2xl overflow-hidden bg-gradient-to-tr from-[#EA4335] to-[#FBBC05] flex items-center justify-center border border-gray-100 dark:border-zinc-800 z-10">
              <span className="text-8xl select-none">👨‍💻</span>
              {/* Online indicator */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-[#0F9D58] rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Available</span>
              </div>
            </div>

            <div className="px-4 pb-4 relative z-10 text-center">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Abhilash R</h4>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full inline-flex">
                <Globe size={12} className="text-[#4285F4]" /> 
                Bangalore, India
              </div>
            </div>
          </motion.div>

          {/* Card 3: Tech Stack (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-[#18181b] border border-gray-100 dark:border-zinc-800 relative overflow-hidden group shadow-xl hover:border-[#F4B400] transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4B400]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex items-center gap-3 mb-6 text-gray-900 dark:text-white">
              <Code2 size={24} className="text-[#F4B400]" />
              <h3 className="text-xl font-bold">Tech Arsenal</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {["React.js", "Node.js", "MongoDB", "Express", "TailwindCSS", "Framer Motion", "Git", "Python", "Java"].map((tech, i) => {
                const colors = ["border-[#4285F4]", "border-[#DB4437]", "border-[#F4B400]", "border-[#0F9D58]"];
                const color = colors[i % 4];
                return (
                  <span key={tech} className={`px-4 py-2 bg-gray-50 dark:bg-zinc-900 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 border ${color} border-opacity-30 hover:border-opacity-100 transition-all`}>
                    {tech}
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* Card 4: Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-white dark:bg-[#18181b] border border-gray-100 dark:border-zinc-800 flex flex-col justify-between shadow-lg hover:border-[#0F9D58] transition-colors duration-300"
          >
            <div>
              <div className="flex items-center gap-3 mb-4 text-[#0F9D58]">
                <Cpu size={24} />
                <h3 className="text-xl font-bold">Focus</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Building scalable, accessible, and performant web applications with modern architectures.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
