import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter, Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { icon: <Github size={18} />, href: 'https://github.com/abhilash777gowda' },
        { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/abhilash-r1' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${isScrolled ? 'pt-2' : ''}`}
            >
                <div
                    className={`
                        w-full max-w-5xl rounded-full border transition-all duration-300
                        ${isScrolled
                            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-gray-200 dark:border-white/10 shadow-lg dark:shadow-blue-900/20 py-3 px-6'
                            : 'bg-white/50 dark:bg-black/50 backdrop-blur-md border-transparent py-4 px-8'
                        }
                        flex justify-between items-center
                    `}
                >
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#4285F4] to-[#DB4437] flex items-center justify-center text-white font-bold text-lg transform group-hover:rotate-12 transition-transform shadow-md">
                            A
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                            Abhi.
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center bg-gray-100/50 dark:bg-white/5 rounded-full px-1 p-1 border border-gray-200 dark:border-white/5">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-[#4285F4] dark:hover:bg-[#4285F4] transition-all duration-300 relative group"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex gap-2 pr-4 border-r border-gray-200 dark:border-gray-800">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-[#DB4437] dark:hover:bg-[#DB4437] transition-all"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-[#F4B400] hover:scale-110 transition-transform shadow-sm"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-[#F4B400]"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            className="p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-3xl pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl font-bold text-gray-900 dark:text-white hover:text-[#4285F4] dark:hover:text-[#4285F4] tracking-tight transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}

                            <div className="pt-8 flex gap-6 border-t border-gray-100 dark:border-gray-900">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-[#DB4437] dark:hover:text-white transition-colors"
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
