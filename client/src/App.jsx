import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative w-full h-full text-zinc-900 dark:text-zinc-100 selection:bg-[#4285F4] selection:text-white">
      <Navbar />
      <main className="relative z-10 w-full">
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <Chatbot />
    </div>
  );
}

export default App;
