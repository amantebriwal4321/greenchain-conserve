
import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold tracking-tighter text-white"
      >
        CONSERVE<span className="text-emerald-500">.</span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/5">
          Enroll Now
        </button>
      </motion.div>
    </nav>
  );
};

export default Navbar;
