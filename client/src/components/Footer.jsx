import { Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-[#09090b] border-t border-gray-200 dark:border-zinc-800 mt-20 pt-16 pb-8 overflow-hidden">
      {/* Decorative Gradient Blob - Replaced with Google Colors */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#4285F4]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 relative z-10">
        {/* Brand */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold">
            <span className="text-[#4285F4]">A</span>
            <span className="text-[#DB4437]">b</span>
            <span className="text-[#F4B400]">h</span>
            <span className="text-[#0F9D58]">i</span>
            <span className="text-[#4285F4]">.</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
            Building digital experiences that blend creativity with engineering perfection. Let's create something amazing together.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            {['About', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-[#4285F4] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#4285F4] transition-colors" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials & Connect */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h4>
          <div className="flex gap-4">
            {[
              { icon: <Github size={20} />, href: 'https://github.com/abhilash777gowda' },
              { icon: <ExternalLink size={20} />, href: 'https://linkedin.com' },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:text-white hover:bg-[#4285F4] hover:border-[#4285F4] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 dark:border-zinc-800 text-center">
        <p className="text-gray-500 dark:text-gray-500 text-sm flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Abhilash. Made with <span className="text-[#DB4437] animate-pulse">❤</span> & React.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
