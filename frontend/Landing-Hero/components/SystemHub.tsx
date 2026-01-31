import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
}

const SystemHub: React.FC<Props> = ({ progress }) => {
  const rotation = useTransform(progress, [0, 0.7], [0, 15]);
  const opacity = useTransform(progress, [0, 0.1, 0.6], [0, 1, 1]);
  
  return (
    <div className="relative flex items-center justify-center w-[320px] md:w-[600px] h-[320px] md:h-[600px]">
      {/* Precision Core Ambient */}
      <motion.div 
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500 blur-[120px] rounded-full"
      />

      {/* Command Center Unit */}
      <motion.div 
        style={{ rotateX: rotation, opacity }}
        className="relative w-[300px] md:w-[400px] h-[440px] md:h-[540px] bg-[#000000] border border-emerald-500/10 rounded-[3rem] md:rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col p-8 md:p-10"
      >
        {/* Status Line Spacer */}
        <div className="h-12 w-full" />

        {/* Data Matrix */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-6 gap-2 mb-10 px-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.05, 0.2, 0.05] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                className="h-[1px] bg-emerald-500/40 rounded-full"
              />
            ))}
          </div>

          <div className="flex items-center justify-center relative py-8">
             {/* Dynamic Ring */}
             <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-emerald-500/[0.05] flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-dashed border border-emerald-500/20 flex items-center justify-center"
                >
                   <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]" />
                </motion.div>
             </div>
          </div>
        </div>

        {/* Technical Footer */}
        <div className="mt-auto pt-6 border-t border-emerald-500/5 flex items-center justify-between">
           <div className="text-[7px] md:text-[8px] tracking-[0.4em] font-black text-white/10 uppercase italic">GreenChain OS</div>
           <div className="flex gap-1.5">
             <div className="w-1 h-1 rounded-full bg-emerald-500" />
             <div className="w-1 h-1 rounded-full bg-emerald-900" />
             <div className="w-1 h-1 rounded-full bg-emerald-900" />
           </div>
        </div>

        {/* Luxury Light Sweep */}
        <motion.div 
          animate={{ x: [-400, 600] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-emerald-500/[0.03] to-transparent skew-x-12"
        />
      </motion.div>
    </div>
  );
};

export default SystemHub;