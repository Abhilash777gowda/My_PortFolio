import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';

function TypewriterEffect({ words }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText.length === word.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="inline-block min-w-[200px] text-left">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <ThreeScene />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-8xl font-bold mb-4"
      >
        <span className="text-[#4285F4]">A</span>
        <span className="text-[#DB4437]">b</span>
        <span className="text-[#F4B400]">h</span>
        <span className="text-[#4285F4]">i</span>
        <span className="text-[#0F9D58]">.</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500 dark:from-white dark:to-gray-400 ml-4">
          Portfolio
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-2xl h-12"
      >
        I am a <span className="font-bold text-[#4285F4]">
          <TypewriterEffect words={["Full Stack Developer", "UI/UX Designer", "Creative Thinker", "Problem Solver"]} />
        </span>
      </motion.p>
    </section>
  );
};

export default Hero;
