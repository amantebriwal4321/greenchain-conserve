import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
}

const MessBot: React.FC<Props> = ({ progress }) => {
  // hardware sequence starts at 0.65
  const lidTranslateY = useTransform(progress, [0.75, 0.90], [0, -55]);
  const bodyScale = useTransform(progress, [0.65, 0.85], [0.95, 1]);
  const lightIntensity = useTransform(progress, [0.78, 0.92], [0, 1]);
  const sensorWidth = useTransform(progress, [0.78, 0.92], ["0%", "85%"]);
  
  // Subtle internal part animation
  const coreTranslateY = useTransform(progress, [0.80, 0.95], [10, 0]);

  return (
    <div className="relative w-96 h-[600px] [perspective:2000px] select-none">
      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* Architectural Body Shell */}
        <motion.div 
          style={{ scale: bodyScale }}
          className="relative w-72 h-[480px] bg-[#030303] rounded-[5rem] border border-emerald-500/15 shadow-[0_100px_200px_rgba(0,0,0,1)] flex flex-col items-center justify-between py-20 overflow-hidden"
        >
          {/* Internal Hardware Gradient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(16,185,129,0.1),transparent_65%)]" />
          
          {/* Core Logo Branding Node */}
          <div className="relative z-10 w-14 h-14 rounded-full border border-emerald-500/20 flex items-center justify-center">
            <motion.div 
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_20px_#10b981]" 
            />
          </div>

          {/* Precision Vent / Grill detailing */}
          <motion.div 
            style={{ y: coreTranslateY }}
            className="relative z-10 w-40 flex flex-col gap-3"
          >
             {[1, 2, 3, 4, 5].map(i => (
               <div key={i} className="h-[1.5px] w-full bg-emerald-500/10 rounded-full" />
             ))}
          </motion.div>

          {/* Luxury Structural Sweep */}
          <motion.div 
             animate={{ x: [-600, 700] }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 w-48 h-full bg-gradient-to-r from-transparent via-emerald-500/[0.05] to-transparent skew-x-[25deg]"
          />
        </motion.div>

        {/* Industrial Lid Assembly */}
        <motion.div 
          style={{ y: lidTranslateY }}
          className="absolute -top-10 w-[310px] h-28 bg-gradient-to-b from-[#0a0a0a] to-[#000] rounded-t-[5rem] border-x border-t border-emerald-500/20 z-30 flex items-end justify-center pb-8 shadow-[0_-20px_60px_rgba(0,0,0,0.6)]"
        >
          {/* LiDAR / Sensor Housing */}
          <div className="w-full flex justify-center px-12">
            <div className="w-full h-[2px] bg-emerald-900/20 rounded-full flex justify-center items-center">
              <motion.div 
                style={{ opacity: lightIntensity, width: sensorWidth }}
                className="h-full bg-emerald-500 shadow-[0_0_20px_#10b981]"
              />
            </div>
          </div>
          
          {/* Top Bevel Detail */}
          <div className="absolute top-4 w-20 h-[1px] bg-emerald-500/10" />
        </motion.div>

        {/* Underbody Environmental Pulse */}
        <motion.div 
          animate={{ opacity: [0.02, 0.06, 0.02], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -bottom-24 w-72 h-20 bg-emerald-500 blur-[60px] rounded-full"
        />
      </div>

      {/* Floating Tactical Data Lines */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: i * 3,
            ease: "easeInOut"
          }}
          className="absolute w-[1px] h-32 bg-gradient-to-b from-emerald-500/30 to-transparent"
          style={{
            top: '30%',
            left: '50%',
            transform: `rotate(${angle}deg) translate(280px)`
          }}
        />
      ))}
    </div>
  );
};

export default MessBot;