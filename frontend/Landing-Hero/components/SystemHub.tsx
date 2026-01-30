
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
}

const SystemHub: React.FC<Props> = ({ progress }) => {
  const rotation = useTransform(progress, [0, 0.7], [0, 25]);
  
  return (
    <div className="relative flex items-center justify-center w-[600px] h-[600px]">
      {/* High-End Ambient Lighting */}
      <motion.div 
        animate={{ opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-white blur-[150px] rounded-full"
      />

      {/* The Monolithic System Hub */}
      <motion.div 
        style={{ rotateX: rotation }}
        className="relative w-[400px] h-[540px] bg-[#050505] border border-white/10 rounded-[4rem] shadow-[0_50px_150px_rgba(0,0,0,1)] overflow-hidden flex flex-col p-10"
      >
        {/* Upper Brand Section */}
        <div className="flex justify-between items-start mb-16">
           <div className="flex flex-col gap-1.5">
              <span className="text-[9px] text-white/30 font-bold uppercase tracking-[0.5em]">Central Command</span>
              <h4 className="text-xl font-light tracking-[0.2em] text-white uppercase">GreenChain</h4>
           </div>
           <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
        </div>

        {/* Minimalist Data Visualization */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="relative h-[2px] w-full bg-white/[0.03] overflow-hidden mb-12">
             <motion.div 
               animate={{ x: ['-100%', '100%'] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
             />
          </div>

          <div className="flex items-center justify-center relative py-12">
             {/* Main Core Ring */}
             <div className="w-32 h-32 rounded-full border border-white/[0.05] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-white/[0.1] flex items-center justify-center">
                   <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
                </div>
             </div>
             
             {/* Scanning Lines */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>

          <div className="relative h-[2px] w-full bg-white/[0.03] overflow-hidden mt-12">
             <motion.div 
               animate={{ x: ['100%', '-100%'] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
             />
          </div>
        </div>

        {/* Footer Technical Detail */}
        <div className="mt-auto flex items-center justify-between opacity-20">
           <div className="text-[8px] tracking-[0.3em] font-bold uppercase">System ID: GC-900X</div>
           <div className="w-12 h-[1px] bg-white" />
        </div>

        {/* Surface light sweep */}
        <motion.div 
          animate={{ x: [-400, 600] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 w-40 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12"
        />
      </motion.div>

      {/* Architectural Accents */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[650px] h-[650px] border border-white/[0.03] rounded-full"
      />
    </div>
  );
};

export default SystemHub;
