
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ProgressDockProps {
  progress: MotionValue<number>;
}

const ProgressDock: React.FC<ProgressDockProps> = ({ progress }) => {
  const percent = useTransform(progress, [0, 1], [0, 100]);
  const botX = useTransform(progress, [0, 1], ["0%", "100%"]);
  const dockOpacity = useTransform(progress, [0.02, 0.05], [0, 1]);

  return (
    <motion.div 
      style={{ opacity: dockOpacity }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-xl"
    >
      <div className="relative h-14 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full px-10 flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="absolute left-10 right-10 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
           <motion.div 
             style={{ width: botX }}
             className="h-full bg-gradient-to-r from-emerald-500/20 to-emerald-500 shadow-[0_0_10px_#10b981]"
           />
        </div>

        <div className="absolute left-10 right-10 h-full flex items-center">
          <motion.div 
            style={{ left: botX }}
            className="absolute -translate-x-1/2 flex flex-col items-center"
          >
             <div className="w-9 h-9 bg-[#F5F5F7] rounded-full shadow-2xl border border-white/60 flex items-center justify-center -mt-1">
                <div className="w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center">
                   <motion.div 
                     animate={{ 
                       scale: [1, 1.3, 1],
                       opacity: [0.6, 1, 0.6] 
                     }}
                     transition={{ duration: 1.5, repeat: Infinity }}
                     className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" 
                   />
                </div>
             </div>
             
             <div className="absolute -top-10 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-[8px] font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                  <motion.span>{useTransform(percent, p => Math.round(p))}</motion.span>% OPTIMIZED
                </span>
             </div>
          </motion.div>
        </div>

        <div className="absolute -bottom-6 left-6 opacity-30">
           <span className="text-[7px] font-bold uppercase tracking-widest text-white">Entry</span>
        </div>
        <div className="absolute -bottom-6 right-6 opacity-30">
           <span className="text-[7px] font-bold uppercase tracking-widest text-emerald-500">Autonomous</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressDock;
