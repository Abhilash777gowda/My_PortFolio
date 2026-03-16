import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Failed to connect to server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 flex items-center justify-center bg-gray-50/50 dark:bg-black/20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#4285F4]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#DB4437]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        {/* Left Col: Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Let's <span className="text-[#4285F4]">Connect</span>
              <span className="text-[#DB4437]">.</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Have a project in mind or just want to chat? I'm always open to discussing new ideas, opportunities, and cutting-edge technologies.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#E8F0FE] dark:bg-[#4285F4]/20 flex items-center justify-center text-[#4285F4] group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</h4>
                <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-[#4285F4] transition-colors">
                  abhilashgowda052003@gmail.com
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#FCE8E6] dark:bg-[#DB4437]/20 flex items-center justify-center text-[#DB4437] group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</h4>
                <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-[#DB4437] transition-colors">
                  Bangalore, India
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-zinc-800">
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {[
                { icon: <Github size={20} />, color: "hover:bg-[#24292e]", border: "hover:border-[#24292e]", href: "https://github.com/abhilash777gowda" },
                { icon: <ExternalLink size={20} />, color: "hover:bg-[#0077b5]", border: "hover:border-[#0077b5]", href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white ${social.color} ${social.border} transition-all duration-300 shadow-sm hover:shadow-lg`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Col: Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#18181b] p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-2xl relative"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4285F4] dark:focus:ring-[#4285F4] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#4285F4] dark:focus:ring-[#4285F4] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Project Inquiry"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#F4B400] dark:focus:ring-[#F4B400] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#0F9D58] dark:focus:ring-[#0F9D58] transition-all resize-none"
              />
            </div>

            {formStatus.message && (
              <div className={`p-3 rounded-lg text-sm font-medium ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {formStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#4285F4] hover:bg-[#3367D6] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
