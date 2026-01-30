import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
}

const MessBot: React.FC<Props> = ({ progress }) => {
  // hardware sequence starts at 0.70
  const lidTranslateY = useTransform(progress, [0.82, 0.92], [0, -45]);
  const lightIntensity = useTransform(progress, [0.85, 0.92], [0.05, 1]);
  const sensorWidth = useTransform(progress, [0.85, 0.92], ["0%", "80%"]);

  return (
    <div className="relative w-80 h-[520px] [perspective:1500px] select-none">
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Main Body - Premium Architectural Black */}
        <div className="relative w-64 h-[440px] bg-[#050505] rounded-[4.5rem] border border-emerald-500/10 shadow-[0_80px_160px_rgba(0,0,0,1)] flex flex-col items-center justify-between py-16 overflow-hidden">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.08),transparent_70%)]" />
          
          {/* Subtle Logo Detail */}
          <div className="w-12 h-12 rounded-full border border-emerald-500/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
          </div>

          {/* Technical Grid Pattern on Body */}
          <div className="w-32 flex flex-col gap-2">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-[1px] w-full bg-emerald-500/5 rounded-full" />
             ))}
          </div>

          {/* Luxury Internal Scanning Reflection */}
          <motion.div 
             animate={{ x: [-500, 600] }}
             transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 w-40 h-full bg-gradient-to-r from-transparent via-emerald-500/[0.04] to-transparent skew-x-[20deg]"
          />
        </div>

        {/* Precision Lid Unit */}
        <motion.div 
          style={{ y: lidTranslateY }}
          className="absolute -top-8 w-[280px] h-24 bg-gradient-to-b from-[#0f0f0f] to-[#000] rounded-t-[4.5rem] border-x border-t border-emerald-500/15 z-30 flex items-end justify-center pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
        >
          {/* Active Status Sensor */}
          <div className="w-full flex justify-center px-10">
            <motion.div 
              style={{ opacity: lightIntensity, width: sensorWidth }}
              className="h-[1px] bg-emerald-500 shadow-[0_0_15px_#10b981]"
            />
          </div>
        </motion.div>

        {/* Emerald Ground Pulse */}
        <motion.div 
          animate={{ opacity: [0.01, 0.04, 0.01] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -bottom-20 w-64 h-16 bg-emerald-500 blur-[50px] rounded-full"
        />
      </div>

      {/* Floating UI Coordinate Lines */}
      {[0, 180].map((angle, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut"
          }}
          className="absolute w-[1px] h-24 bg-gradient-to-b from-emerald-500/20 to-transparent"
          style={{
            top: '35%',
            left: '50%',
            transform: `rotate(${angle}deg) translate(240px)`
          }}
        />
      ))}
    </div>
  );
};

export default MessBot;