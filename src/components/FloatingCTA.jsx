import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React from 'react';

const FloatingCTA = () => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <Link to="/launch-project">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all">
          <span>Start Building</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>
    </motion.div>
  );
};

export default FloatingCTA;

