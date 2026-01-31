
import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
}

const MessBot: React.FC<Props> = ({ progress }) => {
  const lidTranslateY = useTransform(progress, [0.85, 0.95], [0, -40]);
  const lightIntensity = useTransform(progress, [0.88, 0.95], [0.1, 0.6]);

  return (
    <div className="relative w-80 h-[520px] [perspective:1200px] select-none">
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Main Body - Premium Sateen Black */}
        <div className="relative w-64 h-[420px] bg-gradient-to-b from-[#0a0a0a] to-[#000] rounded-[4rem] border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,1)] flex flex-col items-center justify-between py-14 overflow-hidden">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.03),transparent_60%)]" />
          
          {/* Subtle Logo Detail */}
          <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 shadow-[0_0_10px_white]" />
          </div>

          {/* Precision Detail Grid */}
          <div className="w-32 h-8 grid grid-cols-4 gap-1.5 px-3">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="h-[2px] w-full bg-white/[0.05] rounded-full" />
             ))}
          </div>

          {/* Internal Reflection */}
          <motion.div 
             animate={{ x: [-400, 500] }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[15deg]"
          />
        </div>

        {/* Precision Lid Unit */}
        <motion.div 
          style={{ y: lidTranslateY }}
          className="absolute -top-6 w-[270px] h-20 bg-gradient-to-b from-[#111] to-[#050505] rounded-t-[4rem] border-x border-t border-white/10 z-30 flex items-end justify-center pb-5 shadow-2xl"
        >
          {/* Sophisticated Sensor Bar */}
          <motion.div 
            style={{ opacity: lightIntensity }}
            className="w-48 h-[1px] bg-white blur-[4px]"
          />
          <motion.div 
            style={{ opacity: lightIntensity }}
            className="absolute bottom-6 w-32 h-[0.5px] bg-white/40"
          />
        </motion.div>

        {/* Ambient Ground Shadow */}
        <div className="absolute -bottom-16 w-56 h-12 bg-white/[0.02] blur-[40px] rounded-full" />
      </div>

      {/* Luxury Floating UI Points */}
      {[0, 180].map((angle, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent"
          style={{
            top: '40%',
            left: '50%',
            transform: `rotate(${angle}deg) translate(220px)`
          }}
        />
      ))}
    </div>
  );
};

export default MessBot;
