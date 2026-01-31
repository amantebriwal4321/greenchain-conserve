import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface AmbientBackgroundProps {
  progress: MotionValue<number>;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ progress }) => {
  // Map scroll progress to background shifts
  const bgOpacity = useTransform(progress, [0, 0.1, 0.9, 1], [0.4, 0.8, 0.8, 1]);
  const orbY1 = useTransform(progress, [0, 1], ['0%', '20%']);
  const orbY2 = useTransform(progress, [0, 1], ['0%', '-30%']);
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 0.9]);
  
  const color1 = useTransform(progress, [0, 0.5, 1], ["#1a1a1a", "#0f0f0f", "#000000"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        style={{ backgroundColor: color1, opacity: bgOpacity }}
      />
      
      {/* Abstract Floating Mass (Blurry Orbs) */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-neutral-800/20 blur-[120px]"
        style={{ y: orbY1, scale }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neutral-900/40 blur-[100px]"
        style={{ y: orbY2, scale: 1.1 }}
      />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default AmbientBackground;
