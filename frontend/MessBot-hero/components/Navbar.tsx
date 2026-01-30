
import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 bg-[#050505]/40 backdrop-blur-md border-b border-white/5">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold tracking-tighter text-white"
      >
        <a href="#">CONSERVE<span className="text-emerald-500">.</span></a>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <a 
          href="#" 
          className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-xl shadow-black/40 block"
        >
          Enroll Now
        </a>
      </motion.div>
    </nav>
  );
};

export default Navbar;
