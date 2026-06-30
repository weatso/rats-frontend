import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = ({ onBackToHome, isDarkMode, toggleTheme }) => {
  return (
    <div className={`min-h-screen py-20 px-6 md:px-12 flex flex-col items-center justify-center ${isDarkMode ? 'bg-brand-black text-white' : 'bg-brand-white text-brand-black'}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-5xl md:text-7xl font-display font-medium uppercase tracking-tightest mb-8">
          The <span className="text-brand-pink">Story</span> of RATS
        </h1>
        
        <div className="space-y-6 text-lg md:text-xl font-light opacity-80 leading-relaxed text-left">
          <p>
            RATS Game started with a simple vision: to elevate the gaming experience from a solitary pastime to a premium, shared lifestyle. We observed that gamers often settle for subpar hardware in crowded, uninspiring environments.
          </p>
          <p>
            We decided to change that. By combining top-tier consoles like the PS5 and PS4 Pro with luxurious, private spaces, we created sanctuaries where you can truly immerse yourself in your favorite digital worlds.
          </p>
          <p>
            Whether you're looking for an intense competitive arena to challenge your friends, or a quiet, comfortable corner to get lost in a single-player narrative, RATS Game is built for you. We don't just offer hardware; we offer an <span className="font-medium text-brand-blue">experience</span>.
          </p>
        </div>

        <button
          onClick={onBackToHome}
          className="mt-16 group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-brand-pink transition-colors mx-auto"
        >
          <svg className="group-hover:-translate-x-2 transition-transform rotate-180" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 4.5L15.75 9L11.25 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.25 9H15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default AboutPage;
